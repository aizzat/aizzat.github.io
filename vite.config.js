import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        arcftkpm: resolve(import.meta.dirname, 'arcftkpm-lab.html'),
        paris: resolve(import.meta.dirname, 'paris-motor-show.html'),
        parisRecap: resolve(import.meta.dirname, 'paris-motor-show-2026-recap.html'),
      },
    },
  },
});
