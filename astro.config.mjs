import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://metaory.github.io',
  base: '/jsonresume-theme-roundy/',
  integrations: [],
  trailingSlash: 'always',
  vite: {
    resolve: {
      alias: {
        '@': '/src',
        '@components': '/src/components',
        '@ui': '/src/components/ui',
        '@theme': '/src/components/theme',
        '@resume': '/src/components/resume',
        '@meta': '/src/components/meta',
        '@layouts': '/src/layouts',
        '@lib': '/src/lib',
        '@styles': '/src/styles',
        '@data': '/src/data',
        '@pkg': '/package.json'
      }
    }
  }
});
