/// <reference types="vitest/config" />
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { webdriverio } from '@vitest/browser-webdriverio'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  css: { preprocessorOptions: { scss: {} } },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    include: ['@/file_system/bin/*.ts'],
  },
  test: {
    browser: {
      enabled: true,
      provider: webdriverio(),
      // https://vitest.dev/config/browser/webdriverio
      instances: [{ browser: 'firefox' }],
    },
  },
})
