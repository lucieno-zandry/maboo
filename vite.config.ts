import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    watch: { usePolling: true },
    host: true,
    strictPort: true,
    port: 5173, // Replace with any desired port
    proxy: {
      '/api': {
        target: 'https://maboo.mg',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
        headers: {
          'Origin': 'https://maboo.mg',
          'Referer': 'https://maboo.mg/'
        }
      },
      '/socket': {
        target: 'wss://maboo.mg',
        ws: true,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/socket/, '/socket'),
        headers: {
          'Origin': 'https://maboo.mg',
          'Referer': 'https://maboo.mg/'
        }
      }
    },
  },
});
