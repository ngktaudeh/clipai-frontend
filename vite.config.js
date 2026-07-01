import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/clipai-frontend/',
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
  },
});
