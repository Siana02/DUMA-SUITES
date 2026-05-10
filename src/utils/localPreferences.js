const COOKIE_CONSENT_KEY = 'duma-cookie-consent'
const PWA_INSTALL_KEY = 'duma-pwa-install-state'

function isBrowser() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

function readJson(key) {
  if (!isBrowser()) return null

  try {
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function writeJson(key, value) {
  if (!isBrowser()) return value

  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Ignore persistence failures in restricted browsing modes.
  }

  return value
}

export function getCookiePreference() {
  const stored = readJson(COOKIE_CONSENT_KEY)

  if (!stored || typeof stored !== 'object') {
    return { choice: null, hasInteracted: false, updatedAt: null }
  }

  const choice = typeof stored.choice === 'string' ? stored.choice : null

  return {
    choice,
    hasInteracted: Boolean(choice),
    updatedAt: typeof stored.updatedAt === 'number' ? stored.updatedAt : stored.ts || null,
  }
}

export function setCookiePreference(choice) {
  return writeJson(COOKIE_CONSENT_KEY, {
    version: 1,
    choice,
    hasInteracted: true,
    updatedAt: Date.now(),
  })
}

export function getPwaInstallPreference() {
  const stored = readJson(PWA_INSTALL_KEY)

  if (!stored || typeof stored !== 'object') {
    return { installed: false, dismissedUntil: 0 }
  }

  return {
    installed: Boolean(stored.installed),
    dismissedUntil: Number.isFinite(stored.dismissedUntil) ? stored.dismissedUntil : 0,
  }
}

export function setPwaInstallPreference(patch) {
  const current = getPwaInstallPreference()
  return writeJson(PWA_INSTALL_KEY, { ...current, ...patch })
}

export function isStandaloneDisplayMode() {
  if (typeof window === 'undefined') return false

  return (
    window.matchMedia?.('(display-mode: standalone)').matches ||
    window.navigator.standalone === true
  )
}
