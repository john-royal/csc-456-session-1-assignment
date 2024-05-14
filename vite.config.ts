///<reference types="vitest" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import {configDefaults} from "vitest/config";
import tsConfigPaths from "vite-tsconfig-paths";


export default defineConfig({
  plugins: [react(), tsConfigPaths()],
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
        '**\/spinner.tsx/**',
        '**\/_index.tsx/**'
      ]
    },
  }
});