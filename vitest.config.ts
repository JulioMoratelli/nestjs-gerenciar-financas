/// <reference types="vitest" />
// import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/clientes.controller.spec.ts'],
    globals: true,
    alias: {
      '@src': './src',
      '@test': './.spec.ts',
    },
    root: './',
  },
  resolve: {
    alias: {
      '@src': './src',
      '@test': './test',
    },
  },
  // plugins: [swc.vite()],
});
