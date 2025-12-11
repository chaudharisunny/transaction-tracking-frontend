import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['poppins', 'sans-serif'],
      },
    },
  },
  plugins: [react(),tailwindcss()],
  build: {
    chunkSizeWarningLimit: 1600, // increase limit (default is 500kb)
  }
})

