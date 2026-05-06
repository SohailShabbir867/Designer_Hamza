import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Plugin to preload the hero image (LCP element)
function preloadHeroImage() {
  return {
    name: 'preload-hero-image',
    transformIndexHtml(html, ctx) {
      // Find the hashed profile.webp filename in the bundle
      const bundle = ctx.bundle || {}
      const profileAsset = Object.keys(bundle).find(k => k.includes('profile') && k.endsWith('.webp'))
      if (profileAsset) {
        // Inject a preload link right after <meta charset>
        return html.replace(
          '<meta charset="UTF-8" />',
          `<meta charset="UTF-8" />\n    <link rel="preload" as="image" type="image/webp" href="/${profileAsset}" fetchpriority="high" />`
        )
      }
      return html
    },
    enforce: 'post',
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), preloadHeroImage()],
  base: '/',
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
      '/uploads': 'http://localhost:5000',
    },
  },
  build: {
    // Split vendor chunks for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-icons': ['lucide-react', 'react-icons'],
        },
      },
    },
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Target modern browsers for smaller bundles
    target: 'es2020',
    // Increase chunk warning limit
    chunkSizeWarningLimit: 600,
  },
})
