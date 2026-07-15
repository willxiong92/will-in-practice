import { defineConfig } from 'astro/config';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';

export default defineConfig({
  srcDir: './site',
  publicDir: './public',
  output: 'static',
  site: isGitHubPages ? 'https://willxiong92.github.io' : 'https://willinpractice.com',
  base: isGitHubPages ? '/will-in-practice' : '/',
  trailingSlash: 'never',
});
