import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // react(): JSX/TSX transform + Fast Refresh (hot reload that keeps component state)
  // tailwindcss(): scans our source files for class names and generates only the CSS we use
  plugins: [react(), tailwindcss()],
})
