import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'https://gift-selector-tsm.herokuapp.com/api/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      // '/socket.io': {
      //   target: 'ws://gift-selector-tsm.herokuapp.com',
      //   ws: true
      // }
    }
  }
})
