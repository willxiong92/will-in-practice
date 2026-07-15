import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * Deploy targets
 * - Cloudflare Pages (default): base `/`
 * - GitHub Pages: base `/will-in-practice/`
 *
 * PUBLIC_SITE_URL is the public origin (no trailing slash):
 * - Cloudflare: https://<project>.pages.dev   (set by Will after project creation)
 * - GitHub:     https://willxiong92.github.io  (repo is under /will-in-practice/)
 *
 * Never hardcode a fictional *.pages.dev hostname.
 */
const isGitHubPages = process.env.GITHUB_PAGES === 'true' || process.env.DEPLOY_TARGET === 'github';

const GITHUB_ORIGIN = 'https://willxiong92.github.io';
const GITHUB_BASE = '/will-in-practice';

const explicit = process.env.PUBLIC_SITE_URL?.replace(/\/$/, '');

// Origin only. GitHub Pages project sites keep path in `base`, not in `site`.
const site = explicit || GITHUB_ORIGIN;
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
