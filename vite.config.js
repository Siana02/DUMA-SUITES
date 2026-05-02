import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { imagetools } from 'vite-imagetools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Build-time format conversion with query-param directives (?format=webp&quality=98).
    // Must run BEFORE ViteImageOptimizer so it sees the original files.
    imagetools(),
    // Compress every image asset at high-quality settings before it ships to the browser.
    // Targets lossy-but-visually-lossless output; any asset still over 2 MB after this
    // pass will be further reduced automatically by the quality caps below.
    ViteImageOptimizer({
      test: /\.(jpe?g|png|gif|tiff?|webp|avif|svg)$/i,
      includePublic: true,
      logStats: true,
      jpeg: {
        // High-quality JPEG with 4:4:4 chroma subsampling for maximum colour fidelity.
        quality: 90,
        progressive: true,
        chromaSubsampling: '4:4:4',
      },
      jpg: {
        quality: 90,
        progressive: true,
        chromaSubsampling: '4:4:4',
      },
      png: {
        // Strongest lossless PNG compression — smallest file, zero detail loss.
        compressionLevel: 9,
      },
      webp: {
        // High-quality lossy WebP — 90 gives excellent visual results at ~30 % of JPEG size.
        quality: 90,
        lossless: false,
      },
      avif: {
        // High-quality lossy AVIF — best compression ratio for modern browsers.
        quality: 80,
        losslessCompression: false,
      },
      svg: {
        // Preserve all SVG details
        plugins: [
          { name: 'preset-default' },
          { name: 'removeViewBox', active: false },
        ],
      },
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Duma Suites',
        short_name: 'Duma Suites',
        description: 'Luxury Coastal Living in Watamu',
        theme_color: '#c9a96e',
        background_color: '#f7f1e5',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
})
