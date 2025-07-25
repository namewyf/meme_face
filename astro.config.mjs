// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://memeface.com', // 替换为你的实际域名
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  }
});