import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * Deploy targets
 * - Cloudflare Pages (default / production): base `/`
 * - GitHub Pages (fallback): base `/will-in-practice/`
 *
 * PUBLIC_SITE_URL is the public origin (no trailing slash).
 * Production CF project is fixed: will-in-practice.pages.dev
 * Override with env when needed (Preview URLs, custom domain later).
 */
const isGitHubPages = process.env.GITHUB_PAGES === 'true' || process.env.DEPLOY_TARGET === 'github';

const CF_ORIGIN = 'https://will-in-practice.pages.dev';
const GITHUB_ORIGIN = 'https://willxiong92.github.io';
const GITHUB_BASE = '/will-in-practice';

const explicit = process.env.PUBLIC_SITE_URL?.replace(/\/$/, '');

// Origin only. GitHub Pages project sites keep path in `base`, not in `site`.
const site = explicit || (isGitHubPages ? GITHUB_ORIGIN : CF_ORIGIN);
const base = isGitHubPages ? `${GITHUB_BASE}/` : '/';

export default defineConfig({
  srcDir: './site',
  publicDir: './public',
  output: 'static',
  site,
  base,
  trailingSlash: 'never',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
});
