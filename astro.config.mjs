// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  env: {
    schema: {
      API_TOKEN: envField.string({ context: 'server', access: 'secret' }),
      PUBLIC_TRENDING_MOVIES: envField.string({ context: 'server', access: 'public' }),
      PUBLIC_CATEGORIES_MOVIES: envField.string({ context: 'server', access: 'public' }),
      PUBLIC_DISCOVER_MOVIES: envField.string({ context: 'server', access: 'public' }),
      PUBLIC_SEARCH_MOVIES: envField.string({ context: 'server', access: 'public' }),
      PUBLIC_DETAILS_MOVIE: envField.string({ context: 'server', access: 'public' })
    }
  },

  experimental: {
    svg: {
      mode: 'sprite'
    }
  },

  adapter: vercel()
});