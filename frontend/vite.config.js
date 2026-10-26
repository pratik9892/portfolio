import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Dormant (ADR-0011): forwards /api to a local Express server if one is ever added.
    proxy: { '/api': 'http://localhost:4000' },
  },
})
