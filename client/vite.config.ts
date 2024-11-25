import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    // Reduce memory usage during the build process
    chunkSizeWarningLimit: 500, // Increase the chunk size limit if needed
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
    // Enable minification for smaller build size
    minify: 'esbuild', // Vite uses esbuild for minification
  },
});
