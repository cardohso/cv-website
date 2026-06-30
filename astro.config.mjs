// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // TODO: set this to your production URL (used for canonical links / sitemap).
  // For Vercel this is your *.vercel.app domain or a custom domain.
  site: 'https://joaocardoso.dev',

  // --- GitHub Pages note -------------------------------------------------
  // If you deploy to GitHub Pages as a *project* site (username.github.io/cv-website),
  // uncomment and set `base` to your repo name. Leave it commented for Vercel
  // or for a user/custom domain.
  // base: '/cv-website',
  // -----------------------------------------------------------------------

  // i18n is pre-wired with a single locale today. To add European Portuguese
  // later, add 'pt' to `locales` and create the matching dictionary in
  // src/i18n/. See src/i18n/index.ts for details.
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
