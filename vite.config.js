import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.svg", "**/*.jpg", "**/*.jpeg", "**/*.png", "**/*.gif", "**/*.webp", "**/*.woff", "**/*.woff2", "**/*.OTF"],
})




// server: {
//   proxy: {
//     '/api/v1/': {
//       target: 'https://adminbackend-lyyx.onrender.com',
//       changeOrigin: true,
//       secure: false,
//       rewrite: (path) => path.replace(/^\/api/, ''),
//     },
//   },
// },