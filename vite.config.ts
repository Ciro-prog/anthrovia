import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Permite CMS_URL en Vercel (además del prefijo VITE_ habitual)
  envPrefix: ['VITE_', 'CMS_'],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api/webhook': {
        target: 'https://n8n.pampaservers.com/webhook',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/webhook/, ''),
      }
    }
  }
})
