import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('firebase')) return 'firebase-vendor';
          if (id.includes('react-router')) return 'router';
          if (id.includes('bootstrap') || id.includes('framer-motion') || id.includes('react-toastify')) return 'ui';
          if (id.includes('react-dom') || id.includes('react')) return 'react-vendor';
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
})
