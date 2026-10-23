import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Relative base so the build works under GitHub Pages' /koffe/ path.
  base: './',
  plugins: [react()],
})
