import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Phase 2: forward API calls to the local Express server during development.
    proxy: { '/api': 'http://localhost:4000' },
  },
})
