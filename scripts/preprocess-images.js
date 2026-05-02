/**
 * scripts/preprocess-images.js
 *
 * Preprocessing step — runs BEFORE the Vite build.
 *
 * What it does
 * ────────────
 * 1. Reads source images from `src/assets/raw/` (original, unprocessed files).
 * 2. Applies a mild unsharp-mask pass via `sharp` to recover perceived sharpness
 *    that JPEG compression often destroys.  This is a software-only approximation;
 *    for maximum quality you should replace this step with a Real-ESRGAN (or GFPGAN)
 *    AI upscaler — see the README for instructions.
 * 3. Writes the processed files to `src/assets/` — the directory vite-imagetools
 *    reads when it generates responsive WebP / AVIF variants at build time.
 *
 * Usage
 * ─────
 *   npm run preprocess          # standalone
 *   npm run build               # runs preprocess automatically via the "prebuild" hook
 *
 * AI upscaling (optional, offline)
 * ─────────────────────────────────
 * For genuinely low-resolution source images, run Real-ESRGAN on `src/assets/raw/`
 * before this script:
 *
 *   # Install Real-ESRGAN: https://github.com/xinntao/Real-ESRGAN
 *   ./realesrgan-ncnn-vulkan \
 *     -i src/assets/raw \
 *     -o src/assets/raw \
 *     -n realesrgan-x4plus-anime \
 *     -s 4
 *
 * Then run `npm run preprocess` as usual.  The AI-upscaled files in `raw/` will be
 * sharpened and written to `src/assets/` for Vite to pick up.
 *
 * Compression guard (2 MB)
 * ─────────────────────────
 * After sharpening, if a processed file still exceeds 2 MB, the script automatically
 * re-compresses it at progressively lower JPEG quality until it fits.
 */

import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

// sharp is a devDependency — resolve it from the project root to handle monorepo layouts.
const { default: sharp } = await import('sharp')

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const RAW_DIR    = path.resolve(__dirname, '../src/assets/raw')
const OUTPUT_DIR = path.resolve(__dirname, '../src/assets')

// Extensions handled by this script.
const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.tif'])

// Maximum output file size in bytes (2 MB).
const MAX_SIZE_BYTES = 2 * 1024 * 1024

// Sharpening parameters — mild pass to recover JPEG softness without introducing halos.
const SHARPEN_OPTS = { sigma: 1.0, m1: 0.5, m2: 0.5, x1: 2, y2: 10, y3: 20 }

async function recompressToLimit(sharpInstance, ext, outputPath) {
  // Walk JPEG quality down in steps until the file fits inside MAX_SIZE_BYTES.
  const qualities = [85, 75, 65, 55]
  for (const q of qualities) {
    let buf
    if (ext === '.png') {
      buf = await sharpInstance.clone().png({ quality: q, compressionLevel: 9 }).toBuffer()
    } else {
      buf = await sharpInstance.clone().jpeg({ quality: q, progressive: true, chromaSubsampling: '4:4:4' }).toBuffer()
    }
    if (buf.length <= MAX_SIZE_BYTES) {
      fs.writeFileSync(outputPath, buf)
      return { size: buf.length, quality: q }
    }
  }
  // Last resort — write at minimum quality.
  const buf = await sharpInstance.clone().jpeg({ quality: 50, progressive: true }).toBuffer()
  fs.writeFileSync(outputPath, buf)
  return { size: buf.length, quality: 50 }
}

async function processImage(inputPath, outputPath) {
  const ext = path.extname(inputPath).toLowerCase()

  const instance = sharp(inputPath).sharpen(SHARPEN_OPTS)

  // Write at high quality first.
  await instance.clone().jpeg({ quality: 90, progressive: true, chromaSubsampling: '4:4:4' }).toFile(outputPath)

  const { size } = fs.statSync(outputPath)
  if (size > MAX_SIZE_BYTES) {
    console.log(`  ⚠  ${path.basename(outputPath)} is ${(size / 1024 / 1024).toFixed(1)} MB — re-compressing…`)
    const result = await recompressToLimit(instance, ext, outputPath)
    console.log(`     → compressed to ${(result.size / 1024 / 1024).toFixed(1)} MB at quality ${result.quality}`)
  }
}

async function run() {
  if (!fs.existsSync(RAW_DIR)) {
    console.log('No src/assets/raw/ directory found — skipping preprocessing.')
    console.log('To use this script: place original images in src/assets/raw/ and re-run.')
    return
  }

  const files = fs.readdirSync(RAW_DIR).filter(f => IMAGE_EXTS.has(path.extname(f).toLowerCase()))

  if (files.length === 0) {
    console.log('src/assets/raw/ is empty — nothing to preprocess.')
    return
  }

  console.log(`Preprocessing ${files.length} image(s)…\n`)

  for (const file of files) {
    const inputPath  = path.join(RAW_DIR, file)
    const outputPath = path.join(OUTPUT_DIR, file)

    process.stdout.write(`  ${file} … `)
    try {
      await processImage(inputPath, outputPath)
      const kb = Math.round(fs.statSync(outputPath).size / 1024)
      console.log(`done (${kb} KB)`)
    } catch (err) {
      console.log(`FAILED — ${err.message}`)
    }
  }

  console.log('\nPreprocessing complete.')
}

run()
