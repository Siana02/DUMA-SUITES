import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import axios from 'axios'
import * as cheerio from 'cheerio'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.resolve(__dirname, '..')
const SRC_DIR = path.join(REPO_ROOT, 'src')
const APP_FILE = path.join(SRC_DIR, 'App.jsx')
const SUITE_ROUTES_FILE = path.join(SRC_DIR, 'constants', 'suiteRoutes.js')
const MAX_CRAWL_PAGES = 200
const REQUEST_TIMEOUT_MS = 8000

const BASE_URL = process.argv.find((arg) => arg.startsWith('--base-url='))?.split('=')[1]
  || process.env.BASE_URL
  || 'http://localhost:4173'

const KNOWN_STATIC_ROUTES = new Set([
  '/',
  '/gallery',
  '/house-rules',
  '/about',
  '/blog',
  '/blog/top-5-activities-watamu',
  '/blog/coastal-swahili-dishes',
  '/contact',
  '/privacy-policy',
  '/terms-of-service',
  '/cookies',
])

function walkFiles(dir, fileList = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const absPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walkFiles(absPath, fileList)
      continue
    }
    if (/\.(jsx?|tsx?)$/.test(entry.name)) {
      fileList.push(absPath)
    }
  }
  return fileList
}

function countLine(content, index) {
  return content.slice(0, index).split('\n').length
}

function parseSuiteRouteConstants() {
  const content = fs.readFileSync(SUITE_ROUTES_FILE, 'utf8')
  const constants = new Map([['ALL_SUITES_ROUTE', '/suites']])
  const routeRegex = /([A-Z]+):\s*'([^']+)'/g
  let match = routeRegex.exec(content)
  while (match) {
    constants.set(`SUITE_ROUTES.${match[1]}`, match[2])
    match = routeRegex.exec(content)
  }
  return constants
}

function resolveRouteToken(token, constants) {
  const trimmed = token.trim()
  if ((trimmed.startsWith("'") && trimmed.endsWith("'")) || (trimmed.startsWith('"') && trimmed.endsWith('"'))) {
    return trimmed.slice(1, -1)
  }
  if (trimmed === 'ALL_SUITES_ROUTE') return constants.get('ALL_SUITES_ROUTE') || null
  if (trimmed.startsWith('SUITE_ROUTES.')) return constants.get(trimmed) || null
  return null
}

function parseAppRoutes(constants) {
  const content = fs.readFileSync(APP_FILE, 'utf8')
  const routes = new Set(KNOWN_STATIC_ROUTES)

  const literalRegex = /<Route\s+path=['"]([^'"]+)['"]/g
  let literal = literalRegex.exec(content)
  while (literal) {
    routes.add(literal[1])
    literal = literalRegex.exec(content)
  }

  const exprRegex = /<Route\s+path=\{([^}]+)\}/g
  let expr = exprRegex.exec(content)
  while (expr) {
    const resolved = resolveRouteToken(expr[1], constants)
    if (resolved) routes.add(resolved)
    expr = exprRegex.exec(content)
  }

  return routes
}

function parseHomeSectionIds() {
  const sectionIds = new Set()
  const files = walkFiles(SRC_DIR)
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8')
    const idRegex = /\sid=['"]([^'"]+)['"]/g
    let match = idRegex.exec(content)
    while (match) {
      sectionIds.add(match[1])
      match = idRegex.exec(content)
    }
  }
  return sectionIds
}

function parseLinksWithCheerio(filePath, content, constants) {
  const relativeFile = path.relative(REPO_ROOT, filePath)
  const records = []
  const tagRegex = /<(?:a|Link)\b[\s\S]*?>/g
  let tag = tagRegex.exec(content)

  while (tag) {
    const originalTag = tag[0]
    const sourceLine = countLine(content, tag.index)
    const normalizedTag = originalTag
      .replace(/^<Link\b/, '<a data-component="Link"')
      .replace(/\sto=\s*/g, ' href=')
    const $ = cheerio.load(normalizedTag, null, false)
    const href = $('a').attr('href')?.trim()
    if (href && isStaticLinkCandidate(href)) {
      records.push({
        source: `${relativeFile}:${sourceLine}`,
        rawLink: href,
        context: 'anchor/link-tag',
      })
    }

    const attrExpression = originalTag.match(/\b(?:href|to)\s*=\s*\{([^}]+)\}/)
    if (attrExpression) {
      const resolved = resolveRouteToken(attrExpression[1], constants)
      if (resolved) {
        records.push({
          source: `${relativeFile}:${sourceLine}`,
          rawLink: resolved,
          context: 'anchor/link-expression',
        })
      }
    }

    tag = tagRegex.exec(content)
  }

  const patternConfigs = [
    { regex: /\bhref\s*:\s*['"]([^'"]+)['"]/g, context: 'object-href' },
    { regex: /\bhref\s*:\s*(ALL_SUITES_ROUTE|SUITE_ROUTES\.[A-Z_]+)/g, context: 'object-href' },
    { regex: /\bto\s*:\s*['"]([^'"]+)['"]/g, context: 'object-to' },
    { regex: /\bnavigate\(\s*['"]([^'"]+)['"]\s*\)/g, context: 'navigate-call' },
    { regex: /\bnavigate\(\s*(ALL_SUITES_ROUTE|SUITE_ROUTES\.[A-Z_]+)\s*\)/g, context: 'navigate-call' },
  ]

  for (const { regex, context } of patternConfigs) {
    let match = regex.exec(content)
    while (match) {
      const rawValue = match[1]
      const resolved = resolveRouteToken(rawValue, constants) || rawValue
      if (isStaticLinkCandidate(resolved)) {
        records.push({
          source: `${relativeFile}:${countLine(content, match.index)}`,
          rawLink: resolved,
          context,
        })
      }
      match = regex.exec(content)
    }
  }

  return dedupeRecords(records)
}

function normalizeInternalLink(rawLink, basePath = '/') {
  if (!rawLink) return null
  const value = rawLink.trim()
  if (
    !value
    || value.startsWith('mailto:')
    || value.startsWith('tel:')
    || value.startsWith('javascript:')
    || value.startsWith('data:')
    || value.startsWith('vbscript:')
  ) {
    return null
  }

  if (value.startsWith('http://') || value.startsWith('https://')) {
    try {
      const parsed = new URL(value)
      const base = new URL(BASE_URL)
      if (parsed.host !== base.host) return null
      return `${parsed.pathname || '/'}${parsed.hash || ''}`
    } catch {
      return null
    }
  }

  if (value.startsWith('#')) return value
  if (value.startsWith('/')) return value

  try {
    const absolute = new URL(value, `${new URL(BASE_URL).origin}${basePath}`)
    return `${absolute.pathname || '/'}${absolute.hash || ''}`
  } catch {
    return null
  }
}

function isStaticLinkCandidate(value) {
  if (!value) return false
  if (value.includes('{') || value.includes('}') || value.includes('%7B') || value.includes('%7D')) return false
  if (value.includes('${') || value.includes('`') || value.includes('(') || value.includes(')')) return false
  return value.startsWith('/')
    || value.startsWith('#')
    || value.startsWith('http://')
    || value.startsWith('https://')
    || value.startsWith('mailto:')
    || value.startsWith('tel:')
}

function dedupeRecords(records) {
  const seen = new Set()
  return records.filter((record) => {
    const key = `${record.source}|${record.rawLink}|${record.context}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function splitPathAndHash(target) {
  const hashIndex = target.indexOf('#')
  if (hashIndex === -1) return { pathOnly: target, hashOnly: '' }
  const pathOnly = target.slice(0, hashIndex) || '/'
  return { pathOnly, hashOnly: target.slice(hashIndex + 1) }
}

function levenshteinDistance(a, b) {
  const rows = a.length + 1
  const cols = b.length + 1
  const dp = Array.from({ length: rows }, () => Array(cols).fill(0))
  for (let row = 0; row < rows; row += 1) dp[row][0] = row
  for (let col = 0; col < cols; col += 1) dp[0][col] = col
  for (let row = 1; row < rows; row += 1) {
    for (let col = 1; col < cols; col += 1) {
      const cost = a[row - 1] === b[col - 1] ? 0 : 1
      dp[row][col] = Math.min(
        dp[row - 1][col] + 1,
        dp[row][col - 1] + 1,
        dp[row - 1][col - 1] + cost
      )
    }
  }
  return dp[a.length][b.length]
}

function closestRoute(pathOnly, validRoutes) {
  let best = null
  let bestScore = Number.POSITIVE_INFINITY
  for (const route of validRoutes) {
    const score = levenshteinDistance(pathOnly, route)
    if (score < bestScore) {
      bestScore = score
      best = route
    }
  }
  return best
}

function validateInternalLinks(records, validRoutes, homeSectionIds) {
  const issues = []
  const suitesRoutes = [...validRoutes].filter((route) => route.startsWith('/suites/'))

  for (const record of records) {
    const normalized = normalizeInternalLink(record.rawLink)
    if (!normalized) continue
    if (normalized.startsWith('#')) {
      const hashOnly = normalized.slice(1)
      if (hashOnly && !homeSectionIds.has(hashOnly)) {
        const sectionHint = [...homeSectionIds].slice(0, 6).map((id) => `#${id}`).join(', ')
        issues.push({
          type: 'misdirected navigation path',
          source: record.source,
          target: normalized,
          expectedDestination: 'existing section on current page',
          suggestedFix: sectionHint
            ? `Use an existing section id such as ${sectionHint}`
            : 'Point to an existing section id',
          context: record.context,
        })
      }
      continue
    }

    const { pathOnly, hashOnly } = splitPathAndHash(normalized)
    const hasValidPath = validRoutes.has(pathOnly)
    const suiteSlugIssue = pathOnly.startsWith('/suites/') && !hasValidPath

    if (!hasValidPath) {
      const expectedRoute = suiteSlugIssue
        ? closestRoute(pathOnly, suitesRoutes.length ? suitesRoutes : [...validRoutes])
        : closestRoute(pathOnly, [...validRoutes])

      issues.push({
        type: suiteSlugIssue ? 'incorrect suite slug' : 'broken route',
        source: record.source,
        target: normalized,
        expectedDestination: expectedRoute || 'valid internal route',
        suggestedFix: expectedRoute
          ? `Update link to "${expectedRoute}"`
          : 'Update link to an existing internal route',
        context: record.context,
      })
      continue
    }

    if (hashOnly && pathOnly === '/' && !homeSectionIds.has(hashOnly)) {
      const sectionHint = [...homeSectionIds].slice(0, 6).map((id) => `#${id}`).join(', ')
      issues.push({
        type: 'misdirected navigation path',
        source: record.source,
        target: normalized,
        expectedDestination: 'existing section on "/"',
        suggestedFix: sectionHint
          ? `Use an existing section id such as ${sectionHint}`
          : 'Point to an existing section id on the home page',
        context: record.context,
      })
    }
  }

  return issues
}

async function crawlSite(baseUrl) {
  const discovered = []
  const visited = new Set()
  const queue = ['/']

  while (queue.length > 0 && visited.size < MAX_CRAWL_PAGES) {
    const currentPath = queue.shift()
    if (visited.has(currentPath)) continue
    visited.add(currentPath)

    try {
      const targetUrl = new URL(currentPath, baseUrl).toString()
      const response = await axios.get(targetUrl, { timeout: REQUEST_TIMEOUT_MS, validateStatus: () => true })
      if (response.status >= 400) {
        discovered.push({
          source: `runtime:${currentPath}`,
          rawLink: currentPath,
          context: `http-status:${response.status}`,
        })
        continue
      }

      const $ = cheerio.load(String(response.data))
      $('a[href]').each((_, el) => {
        const href = $(el).attr('href')
        if (!href) return
        const normalized = normalizeInternalLink(href, currentPath)
        if (!normalized) return
        discovered.push({
          source: `runtime:${currentPath}`,
          rawLink: normalized,
          context: 'runtime-anchor',
        })
        const { pathOnly } = splitPathAndHash(normalized)
        if (!visited.has(pathOnly)) queue.push(pathOnly)
      })
    } catch (error) {
      const message = error?.message || 'Unknown crawl error'
      console.warn(`⚠ Runtime crawl warning on ${currentPath}: ${message}`)
      continue
    }
  }

  return discovered
}

function printReport({ validRoutes, homeSectionIds, sourceLinks, runtimeLinks, issues }) {
  console.log('\n====== LINK INTEGRITY AUDIT ======')
  console.log(`Base URL: ${BASE_URL}`)
  console.log(`Internal routes known: ${validRoutes.size}`)
  console.log(`Home sections known: ${homeSectionIds.size}`)
  console.log(`Source links checked: ${sourceLinks.length}`)
  console.log(`Runtime links checked: ${runtimeLinks.length}`)
  console.log(`Broken/misdirected links found: ${issues.length}`)

  if (!issues.length) {
    console.log('\n✅ No broken internal links detected by this audit.')
    return
  }

  console.log('\n====== BROKEN LINKS REPORT ======')
  issues.forEach((issue, index) => {
    console.log(`\n${index + 1}. ❌ ${issue.type.toUpperCase()}`)
    console.log(`   Source page: ${issue.source}`)
    console.log(`   Broken link: ${issue.target}`)
    console.log(`   Expected destination: ${issue.expectedDestination}`)
    console.log(`   Suggested fix: ${issue.suggestedFix}`)
    console.log(`   Link context: ${issue.context}`)
  })
}

async function runAudit() {
  const routeConstants = parseSuiteRouteConstants()
  const validRoutes = parseAppRoutes(routeConstants)
  const homeSectionIds = parseHomeSectionIds()

  const sourceFiles = walkFiles(SRC_DIR)
  const sourceLinks = sourceFiles.flatMap((filePath) => {
    const content = fs.readFileSync(filePath, 'utf8')
    return parseLinksWithCheerio(filePath, content, routeConstants)
  })

  const runtimeLinks = await crawlSite(BASE_URL)
  const allLinks = [...sourceLinks, ...runtimeLinks]
  const issues = validateInternalLinks(allLinks, validRoutes, homeSectionIds)

  printReport({ validRoutes, homeSectionIds, sourceLinks, runtimeLinks, issues })
  process.exitCode = issues.length ? 1 : 0
}

runAudit().catch((error) => {
  console.error('\nLink audit failed:', error.message)
  process.exitCode = 1
})
