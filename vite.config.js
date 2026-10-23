import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,          // do not ship source maps to production
    assetsInlineLimit: 0,      // no data: URIs -> keeps the CSP strict
    target: 'es2020',
  },
})
