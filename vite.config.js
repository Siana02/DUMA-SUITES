import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { imagetools } from 'vite-imagetools'

const THIRTY_DAYS_IN_SECONDS = 60 * 60 * 24 * 30

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
      manifestFilename: 'site.webmanifest',
      includeAssets: [
        'favicon.ico',
        'favicon-16x16.png',
        'favicon-32x32.png',
        'apple-touch-icon.png',
        'android-chrome-192x192.png',
        'android-chrome-512x512.png',
        'pwa-192x192.png',
        'pwa-512x512.png',
        'safari-pinned-tab.svg',
        'robots.txt',
        'sitemap.xml',
      ],
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },
          {
            urlPattern: /\/locales\/.*\.json$/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'locale-content',
              networkTimeoutSeconds: 3,
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 7,
              },
            },
          },
          {
            urlPattern: /\/assets\/.*\.(?:avif|gif|jpe?g|png|svg|webp)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'app-images',
              expiration: {
                maxEntries: 120,
                maxAgeSeconds: THIRTY_DAYS_IN_SECONDS,
              },
            },
          },
        ],
      },
      manifest: {
        name: 'Duma Suites',
        short_name: 'Duma Suites',
        description: 'Luxury Coastal Living in Watamu',
        id: '/',
        theme_color: '#c9a96e',
        background_color: '#f7f1e5',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        categories: ['travel', 'lifestyle', 'hospitality'],
        shortcuts: [
          {
            name: 'Explore Suites',
            short_name: 'Suites',
            url: '/suites',
          },
          {
            name: 'Gallery',
            short_name: 'Gallery',
            url: '/gallery',
          },
          {
            name: 'Contact Concierge',
            short_name: 'Contact',
            url: '/contact',
          },
        ],
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
})
