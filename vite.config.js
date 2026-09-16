import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Jammming/',
  plugins: [react()],
  server: {
    host: true,
  },
})