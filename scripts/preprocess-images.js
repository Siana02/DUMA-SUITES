/**
 * scripts/preprocess-images.js
 *
 * Pre-build AI upscaling + enhancement pipeline.
 * Run this BEFORE `npm run build` to push every hero image through:
 *
 *   src/assets/raw/*.{jpg,jpeg,png}
 *       │
 *       ▼  Step 1 — Real-ESRGAN (AI upscale ×4 or ×8)
 *       │           Requires the binary — see SETUP below.
 *       │           Falls back to sharp-only if binary not found.
 *       │
 *       ▼  Step 2 — sharp: resize to max 3 840 px (4 K ceiling)
 *       │           + mild unsharp-mask to recover JPEG softness
 *       │
 *       ▼  Step 3 — 2 MB compression guard
 *       │           If JPEG still > 2 MB, quality is stepped down
 *       │           until the file fits.
 *       │
 *       ▼  Step 4 — WebP copy written alongside the JPEG
 *                   (vite-imagetools also converts at build time, but
 *                   having a pre-converted WebP lets you inspect the
 *                   quality before committing.)
 *       │
 *       └──► src/assets/*.{jpg,webp}   ← vite-imagetools picks these up
 *
 * ── SETUP ────────────────────────────────────────────────────────────────────
 *
 * 1. Download Real-ESRGAN for your platform from:
 *      https://github.com/xinntao/Real-ESRGAN/releases
 *    Look for: realesrgan-ncnn-vulkan-<version>-<platform>.zip
 *
 * 2. Extract and place the binary + model files in ONE of:
 *      • Anywhere in your system PATH (so `realesrgan-ncnn-vulkan` works)
 *      • ./bin/realesrgan-ncnn-vulkan  (project-local, relative to repo root)
 *      • ./tools/realesrgan-ncnn-vulkan
 *
 * 3. Place original (low-res) source images in:
 *      src/assets/raw/
 *
 * 4. Run:
 *      npm run preprocess          # default 4× scale
 *      npm run preprocess -- --scale=8   # two 4× passes → 8× total
 *
 * The script then emits enhanced JPEG + WebP files to src/assets/ which
 * vite-imagetools will resize to 640 w and 1 920 w WebP at build time.
 *
 * ── MODELS ───────────────────────────────────────────────────────────────────
 *
 * For photographic hotel/architecture images (this project):
 *   realesrgan-x4plus          ← best for real photos  ✓ recommended
 *
 * Avoid:
 *   realesrgan-x4plus-anime    ← tuned for animation/illustration
 *
 * ── SCALE GUIDE ──────────────────────────────────────────────────────────────
 *
 * Source (1 200 × 1 600) → after 4× → 4 800 × 6 400
 *                         → after 8× → 9 600 × 12 800 (then capped to 4 K)
 *
 * Both are then resized by this script to a max dimension of 3 840 px before
 * vite-imagetools further resizes them to 640 w and 1 920 w at build time.
 * The AI pass is valuable because the upscaled 4 K intermediate retains far
 * more detail when downsampled than the original 1 200 px source would.
 */

import path      from 'path'
import fs        from 'fs'
import os        from 'os'
import { execSync, spawnSync } from 'child_process'
import { fileURLToPath } from 'url'

const { default: sharp } = await import('sharp')

const __dirname  = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT  = path.resolve(__dirname, '..')
const RAW_DIR    = path.resolve(REPO_ROOT, 'src/assets/raw')
const OUTPUT_DIR = path.resolve(REPO_ROOT, 'src/assets')

const IMAGE_EXTS     = new Set(['.jpg', '.jpeg', '.png', '.tiff', '.tif'])
const MAX_SIZE_BYTES = 2 * 1024 * 1024   // 2 MB
const MAX_DIM        = 3840              // cap upscaled intermediates to 4 K

// ── CLI args ─────────────────────────────────────────────────────────────────
const args  = process.argv.slice(2)
const scaleArg = args.find(a => a.startsWith('--scale='))
const SCALE = scaleArg
  ? parseInt(scaleArg.split('=')[1], 10)
  : parseInt(process.env.ESRGAN_SCALE ?? '4', 10)

if (![2, 4, 8].includes(SCALE)) {
  console.error('Error: --scale must be 2, 4, or 8.')
  process.exit(1)
}

// ── Real-ESRGAN binary detection ─────────────────────────────────────────────
const WIN = os.platform() === 'win32'
const BIN_NAME = WIN ? 'realesrgan-ncnn-vulkan.exe' : 'realesrgan-ncnn-vulkan'

function findRealESRGAN() {
  const candidates = [
    BIN_NAME,
    path.join(REPO_ROOT, 'bin', BIN_NAME),
    path.join(REPO_ROOT, 'tools', BIN_NAME),
    path.join(REPO_ROOT, BIN_NAME),
  ]
  for (const candidate of candidates) {
    try {
      // Probe: attempt --help (some builds exit non-zero but still run)
      const result = spawnSync(candidate, ['--help'], {
        timeout: 8000,
        stdio: 'pipe',
      })
      // Accept if the binary ran at all (exit 0, non-zero, or output to stderr)
      if (result.pid && result.error == null) return candidate
    } catch { /* skip */ }
  }
  return null
}

// ── Run Real-ESRGAN ───────────────────────────────────────────────────────────
/**
 * Upscale `inputPath` to `outputPath` using Real-ESRGAN.
 * For ×8: runs two consecutive ×4 passes through a temp file.
 * Always produces a PNG (Real-ESRGAN's native output format).
 */
function runRealESRGAN(binary, inputPath, outputPath, scale) {
  const model = 'realesrgan-x4plus'

  if (scale <= 4) {
    // Single pass
    execSync(
      `"${binary}" -i "${inputPath}" -o "${outputPath}" -s ${scale} -n ${model}`,
      { timeout: 600_000, stdio: 'pipe' }
    )
  } else {
    // ×8 = two ×4 passes
    const tmp = path.join(os.tmpdir(), `esrgan_pass1_${Date.now()}.png`)
    try {
      execSync(
        `"${binary}" -i "${inputPath}" -o "${tmp}" -s 4 -n ${model}`,
        { timeout: 600_000, stdio: 'pipe' }
      )
      execSync(
        `"${binary}" -i "${tmp}" -o "${outputPath}" -s ${scale / 4} -n ${model}`,
        { timeout: 600_000, stdio: 'pipe' }
      )
    } finally {
      if (fs.existsSync(tmp)) fs.unlinkSync(tmp)
    }
  }
}

// ── Post-upscale: resize + sharpen ───────────────────────────────────────────
/**
 * Resize the (potentially enormous) upscaled image to MAX_DIM on its longest
 * edge, apply a mild unsharp-mask, and write a high-quality JPEG.
 * Returns the size of the written file in bytes.
 */
async function resizeAndSharpen(inputPath, outputPath) {
  const meta   = await sharp(inputPath).metadata()
  const maxDim = Math.max(meta.width ?? 0, meta.height ?? 0)

  let pipeline = sharp(inputPath)

  if (maxDim > MAX_DIM) {
    pipeline = pipeline.resize({
      width:  meta.width  >= meta.height ? MAX_DIM : undefined,
      height: meta.height >  meta.width  ? MAX_DIM : undefined,
      fit: 'inside',
      withoutEnlargement: false,
    })
  }

  await pipeline
    .sharpen({ sigma: 0.8, m1: 0.4, m2: 0.4 })
    .jpeg({ quality: 92, progressive: true, chromaSubsampling: '4:4:4' })
    .toFile(outputPath)

  return fs.statSync(outputPath).size
}

// ── sharp-only sharpening (fallback, no upscale) ──────────────────────────────
async function sharpenOnly(inputPath, outputPath) {
  await sharp(inputPath)
    .sharpen({ sigma: 1.0, m1: 0.5, m2: 0.5 })
    .jpeg({ quality: 90, progressive: true, chromaSubsampling: '4:4:4' })
    .toFile(outputPath)
  return fs.statSync(outputPath).size
}

// ── 2 MB compression guard ────────────────────────────────────────────────────
async function recompressToLimit(inputPath, outputPath) {
  const steps = [85, 75, 65, 55, 50]
  for (const q of steps) {
    const buf = await sharp(inputPath)
      .jpeg({ quality: q, progressive: true })
      .toBuffer()
    if (buf.length <= MAX_SIZE_BYTES) {
      fs.writeFileSync(outputPath, buf)
      return { size: buf.length, quality: q }
    }
  }
  // Last resort
  const buf = await sharp(inputPath).jpeg({ quality: 45 }).toBuffer()
  fs.writeFileSync(outputPath, buf)
  return { size: buf.length, quality: 45 }
}

// ── Step 4: write WebP copy ───────────────────────────────────────────────────
async function writeWebP(jpegPath) {
  const webpPath = jpegPath.replace(/\.(jpe?g)$/i, '.webp')
  await sharp(jpegPath)
    .webp({ quality: 90 })
    .toFile(webpPath)
  return webpPath
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function run() {
  if (!fs.existsSync(RAW_DIR)) {
    console.log('ℹ  No src/assets/raw/ directory found — skipping preprocessing.')
    console.log('   To use this script: place original images in src/assets/raw/ and re-run.')
    return
  }

  const files = fs.readdirSync(RAW_DIR)
    .filter(f => IMAGE_EXTS.has(path.extname(f).toLowerCase()))

  if (files.length === 0) {
    console.log('ℹ  src/assets/raw/ is empty — nothing to preprocess.')
    return
  }

  const binary = findRealESRGAN()

  if (binary) {
    console.log(`✓ Real-ESRGAN found: ${binary}`)
    console.log(`  Scale: ×${SCALE}  |  Model: realesrgan-x4plus\n`)
  } else {
    console.warn('⚠  Real-ESRGAN binary not found.')
    console.warn('   Falling back to sharp-only sharpening (no AI upscale).')
    console.warn('   See scripts/preprocess-images.js → SETUP for install instructions.\n')
  }

  console.log(`Processing ${files.length} image(s) from src/assets/raw/ …\n`)

  for (const file of files) {
    const inputPath  = path.join(RAW_DIR, file)
    const ext        = path.extname(file)
    const baseName   = path.basename(file, ext)
    const outputPath = path.join(OUTPUT_DIR, baseName + '.jpg')

    process.stdout.write(`  ${file}`)

    try {
      let fileSize

      if (binary) {
        // ── AI path ───────────────────────────────────────────────────────────
        const tmpPng = path.join(os.tmpdir(), `esrgan_out_${Date.now()}.png`)
        try {
          process.stdout.write(' → upscaling …')
          runRealESRGAN(binary, inputPath, tmpPng, SCALE)

          process.stdout.write(' → resizing + sharpening …')
          fileSize = await resizeAndSharpen(tmpPng, outputPath)
        } finally {
          if (fs.existsSync(tmpPng)) fs.unlinkSync(tmpPng)
        }
      } else {
        // ── Fallback path ─────────────────────────────────────────────────────
        fileSize = await sharpenOnly(inputPath, outputPath)
      }

      // 2 MB guard
      if (fileSize > MAX_SIZE_BYTES) {
        const mb = (fileSize / 1024 / 1024).toFixed(1)
        process.stdout.write(` ⚠ ${mb} MB — re-compressing …`)
        const result = await recompressToLimit(outputPath, outputPath)
        const mb2 = (result.size / 1024 / 1024).toFixed(1)
        process.stdout.write(` → ${mb2} MB @q${result.quality}`)
        fileSize = result.size
      }

      // WebP copy
      const webpPath = await writeWebP(outputPath)
      const webpKb   = Math.round(fs.statSync(webpPath).size / 1024)
      const jpegKb   = Math.round(fileSize / 1024)

      console.log(` ✓  JPEG ${jpegKb} KB | WebP ${webpKb} KB → ${path.basename(outputPath)}`)

    } catch (err) {
      console.log(` ✗  FAILED — ${err.message}`)
    }
  }

  console.log('\n✨ Preprocessing complete.')
  console.log('   Run `npm run build` to convert the enhanced images to responsive WebP variants.')
}

run()
