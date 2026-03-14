// @ts-check
import { defineConfig } from 'astro/config';

/**
 * Targets browsers per Browserslist (Chrome >= 139, Edge >= 139, Firefox >= 140, Safari >= 18.5, iOS >= 18.5)
 * @see [Browserslist](https://browsersl.ist/#q=Chrome+%3E%3D+139%2C+Edge+%3E%3D+139%2C+Firefox+%3E%3D+140%2C+Safari+%3E%3D+18.5%2C+iOS+%3E%3D+18.5)
 */
const buildTarget = ['chrome139', 'edge139', 'firefox140', 'ios18.5', 'safari18.5'];

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  vite: {
    build: {
      target: buildTarget,
    },
  },
});
