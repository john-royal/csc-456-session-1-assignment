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
        '**\/*public*/**',
        '**\/*.cjs/**',
        '**\/vite-env.d.ts/**',
        '**\/spinner.tsx**',
        '**\/playwright-report/**',
        '**\/_index.tsx/**',
        '**\/ui.ts**',
        '**\/routes/**',
        '**\/chat/**',
        '**\/loading.tsx/**',
        '**\/image-upload-button.tsx /**',
        '**\/main.tsx /**',
        '**\/layout.tsx**',
        '**\/conversation.ts**',
        '**\/auth.ts**',
        '**\/sonner.tsx**',
        '**\/card.tsx**',
        '**\/dialog.tsx**',
        '**\/input.tsx**',
        '**\/alert.tsx**',
        '**\/fom.tsx**',
        '**\/edit-profile-dialog.tsx**',
        '**\/new-petsitter-dialog.tsx**',
        '**\/new-post-dialog.tsx**',
        '**\/common/**',
        '**\/like.ts**'
      ]
    },
  }
});