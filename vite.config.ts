/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import {configDefaults} from "vitest/config"


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage:{
      reporter: ['text', 'json', 'html'],
      exclude:[
        ...configDefaults.exclude,
        '**\/*.config.*/**',
        '**\/*.cjs/**',
        '**\/vite-env.d.ts/**',
        '**\/spinner.tsx/**'
      ]
    },
  }
});
