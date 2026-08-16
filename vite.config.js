import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        arcftkpm: resolve(__dirname, 'arcftkpm-lab.html'),
      },
    },
  },
});
