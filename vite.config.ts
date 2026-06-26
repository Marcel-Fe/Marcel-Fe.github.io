import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// base bleibt '/', wenn das Repo "<username>.github.io" heisst (Hosting an der Wurzel).
// Fuer ein Projekt-Repo ("kart-pets") muesste base auf '/kart-pets/' geaendert
// und alle Asset-Pfade ueber import.meta.env.BASE_URL geleitet werden.
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'KART PETS',
        short_name: 'KART PETS',
        description: 'Cartoon-Kart-Racer mit sammelbaren Renn-Tieren.',
        lang: 'de',
        theme_color: '#0a1030',
        background_color: '#0a1030',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'maskable-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Auch 3D-Modelle offline cachen; Bundle/GLB sind groesser als der Default (2 MB).
        globPatterns: ['**/*.{js,css,html,png,svg,glb,woff2}'],
        maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
      },
    }),
  ],
  server: { host: true },
})
