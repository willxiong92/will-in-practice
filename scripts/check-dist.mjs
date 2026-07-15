#!/usr/bin/env node
/**
 * Fail if production dist contains non-public practice pages or sensitive leaks.
 * Assumes production build (PUBLIC_CONTENT_PREVIEW=false).
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const contentDir = path.join(root, 'content');

if (!fs.existsSync(dist)) {
  console.error('dist/ missing; run production build first');
  process.exit(1);
}

function walk(dir, pred = () => true) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) out.push(...walk(p, pred));
    else if (pred(p)) out.push(p);
  }
  return out;
}

function parseFrontmatter(raw) {
  if (!raw.startsWith('---')) return {};
  const end = raw.indexOf('\n---', 3);
  if (end === -1) return {};
  const block = raw.slice(4, end);
  const data = {};
  for (const line of block.split('\n')) {
    const i = line.indexOf(':');
    if (i === -1) continue;
    data[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^['\"]|['\"]$/g, '');
  }
  return data;
}

const mdFiles = walk(contentDir, (p) => p.endsWith('.md'));
const blocked = [];
const allowedSlugs = new Set();

for (const file of mdFiles) {
  const raw = fs.readFileSync(file, 'utf8');
  const data = parseFrontmatter(raw);
  const ok =
    data.visibility === 'public' &&
    (data.publication_status === 'approved' || data.publication_status === 'published');
  if (ok && data.slug) allowedSlugs.add(data.slug);
  else if (data.slug) blocked.push(data.slug);
}

const errors = [];
for (const slug of blocked) {
  const practicePath = path.join(dist, 'practice', slug, 'index.html');
  if (fs.existsSync(practicePath)) {
    errors.push(`non-public slug present in dist: practice/${slug}/`);
  }
}

// Sensitive patterns in HTML
const htmlFiles = walk(dist, (p) => p.endsWith('.html'));
const leakRe = [
  /\/Users\/[A-Za-z0-9._-]+/g,
  /PUBLIC_CONTENT_PREVIEW[\"']?\s*[:=]\s*[\"']?true/gi,
  /内部预览：当前为草稿环境/g,
];

for (const file of htmlFiles) {
  const text = fs.readFileSync(file, 'utf8');
  for (const re of leakRe) {
    if (re.test(text)) {
      errors.push(`leak pattern ${re} in ${path.relative(root, file)}`);
    }
    re.lastIndex = 0;
  }
}

// Ensure at least one practice page exists when we have allowed content
if (allowedSlugs.size > 0) {
  const practiceDir = path.join(dist, 'practice');
  if (!fs.existsSync(practiceDir)) {
    errors.push('dist/practice missing despite approved content');
  }
}

console.log(`Dist gate: ${allowedSlugs.size} public slugs expected; scanned ${htmlFiles.length} html files.`);

if (errors.length) {
  console.error('\nDist gate FAILED:');
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log('Dist gate passed.');
