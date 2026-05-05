import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    // Optimize chunk sizes
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) return 'framer'
            if (id.includes('zustand')) return 'zustand'
            if (id.includes('react') || id.includes('react-dom')) return 'vendor'
          }
        },
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
})
