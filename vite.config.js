import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/', // ✅ Isko single slash '/' hona chahiye
  plugins: [
    react(),
    tailwindcss(),
  ],
})