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
    // Process every image asset at maximum quality before it ships to the browser.
    // JPEG/PNG use lossless or near-lossless settings; WebP/AVIF use fully lossless mode.
    ViteImageOptimizer({
      test: /\.(jpe?g|png|gif|tiff?|webp|avif|svg)$/i,
      includePublic: true,
      logStats: true,
      jpeg: {
        // Near-lossless JPEG — quality 100 + 4:4:4 chroma for maximum detail
        quality: 100,
        progressive: true,
        chromaSubsampling: '4:4:4',
      },
      jpg: {
        quality: 100,
        progressive: true,
        chromaSubsampling: '4:4:4',
      },
      png: {
        // Lossless PNG compression (level 1 = fastest lossless)
        quality: 100,
        compressionLevel: 1,
      },
      webp: {
        // Fully lossless WebP — quality is ignored when lossless is true
        lossless: true,
      },
      avif: {
        // Lossless AVIF — quality is ignored when losslessCompression is true
        losslessCompression: true,
      },
      svg: {
        // Preserve all SVG details
        plugins: [{ name: 'preset-default', params: { overrides: { removeViewBox: false } } }],
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
