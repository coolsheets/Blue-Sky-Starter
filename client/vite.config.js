import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';


export default defineConfig({
  plugins: [
    react(),
    visualizer({
      // open: true, // Automatically open the report in the browser
  }),
  ],
  server: {
    proxy: {
      "/api": "http://localhost:3000",
      "/users": "http://localhost:3000",

      // "/api": "http://127.0.0.1:3000",
      // "/users": "http://127.0.0.1:3000",
      // '/superheroes': 'http://localhost:3000',
      // '/cities': 'http://localhost:3000',
    },
    host: "0.0.0.0",
    port: 5173,
  },
  build: {
    outDir: "../server/public",
    emptyOutDir: true,
  },
  optimizeDeps: {
    exclude: ['some-large-package'], // Exclude unnecessary packages
  },
});
