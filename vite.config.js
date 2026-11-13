import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 3000,
    host: '172.25.148.29',
    strictPort: true,
    open: true,
  },
  preview: {
    port: 3000,
    host: '172.25.148.29',
    strictPort: true,
    open: true,
  }
})
