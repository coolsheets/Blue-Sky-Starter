import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
      '/users': 'http://localhost:3000',
      // '/superheroes': 'http://localhost:3000',
      // '/cities': 'http://localhost:3000',
    },
    host: '0.0.0.0',
    port: 5173,
  },
	build: {
		outDir: '../server/public',
		emptyOutDir: true,		
	}
});
