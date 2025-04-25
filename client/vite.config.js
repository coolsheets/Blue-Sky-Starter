import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://10.44.22.83:3000', // Proxy API requests to the backend
    },
    host: '0.0.0.0',
    port: 5173,
  },
});
