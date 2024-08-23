import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/backend':{
          target: 'http://localhost:3000',
          secure: false,
      }
    },
    // '/api': {
    //     target: 'https://api-gate2.movieglu.com',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //   },
  },
  plugins: [react()],
})
