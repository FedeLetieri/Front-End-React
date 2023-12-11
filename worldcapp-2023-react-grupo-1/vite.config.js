/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    setupFiles: ["./setupTests.js"], // es importante definirlo en un archivo aparte para que se ejecute en otro contexto
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'json', 'html', 'json-summary'],
    },
  }
})