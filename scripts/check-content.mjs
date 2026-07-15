#!/usr/bin/env node
/**
 * Content gate for production publishing.
 * Fails when frontmatter is invalid, sensitive patterns appear,
 * or absolute local paths leak into markdown bodies.
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const contentDir = path.join(root, 'content');

const REQUIRED = [
  'title',
  'slug',
  'domain',
  'topics',
  'content_type',
  'audience',
  'maturity',
  'visibility',
  'publication_status',
  'summary',
  'source_id',
  'source_project',
  'reviewed_at',
  'updated_at',
];

const DOMAINS = new Set(['ai', 'fde', 'trade_ops', 'global_platform', 'indie_site']);
const TYPES = new Set(['article', 'guide', 'playbook', 'case', 'template', 'checklist']);
const VIS = new Set(['private', 'team', 'public']);
const STATUS = new Set(['review_required', 'approved', 'published', 'rejected', 'stale', 'archived']);
const TASKS = new Set(['learn', 'diagnose', 'execute', 'review', 'reuse']);

// Patterns that must not appear in publishable bodies
const SENSITIVE = [
  { name: 'macos-home-path', re: /\/Users\/[A-Za-z0-9._-]+/g },
  { name: 'windows-abs-path', re: /[A-Za-z]:\\(?:Users|Windows|Program Files)/g },
  { name: 'unix-home-path', re: /\/home\/[A-Za-z0-9._-]+/g },
  { name: 'private-token-ish', re: /\b(sk-[A-Za-z0-9]{16,}|api[_-]?key\s*[:=]\s*['\"][^'\"]+['\"])/gi },
  { name: 'password-assignment', re: /\bpassword\s*[:=]\s*['\"][^'\"]+['\"]/gi },
  { name: 'internal-wiki-abs', re: /\/Documents\/OKKI\/WIKI/g },
];

function walk(dir) {
  const out = [];
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) out.push(...walk(p));
    else if (name.endsWith('.md')) out.push(p);
  }
  return out;
}

function parseFrontmatter(raw) {
  const normalized = raw.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');
  if (!normalized.startsWith('---\n') && normalized !== '---') return null;
  const end = normalized.indexOf('\n---\n', 3);
  if (end === -1) return null;
  const block = normalized.slice(4, end);
  const body = normalized.slice(end + 5);
  const data = {};
  for (const line of block.split('\n')) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const i = line.indexOf(':');
    if (i === -1) continue;
    const key = line.slice(0, i).trim();
    let val = line.slice(i + 1).trim();
    if (val.startsWith('[') && val.endsWith(']')) {
      val = val
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^['\"]|['\"]$/g, ''))
        .filter(Boolean);
    } else {
      val = val.replace(/^['\"]|['\"]$/g, '');
    }
    data[key] = val;
  }
  return { data, body };
}

const files = walk(contentDir);
const errors = [];
const warnings = [];
let publicApproved = 0;

for (const file of files) {
  const rel = path.relative(root, file);
  const raw = fs.readFileSync(file, 'utf8');
  const parsed = parseFrontmatter(raw);
  if (!parsed) {
    errors.push(`${rel}: missing YAML frontmatter`);
    continue;
  }
  const { data, body } = parsed;
  for (const key of REQUIRED) {
    if (data[key] === undefined || data[key] === '') {
      errors.push(`${rel}: missing required field \`${key}\``);
    }
  }
  if (data.domain && !DOMAINS.has(data.domain)) {
    errors.push(`${rel}: invalid domain \`${data.domain}\``);
  }
  if (data.content_type && !TYPES.has(data.content_type)) {
    errors.push(`${rel}: invalid content_type \`${data.content_type}\``);
  }
  if (data.visibility && !VIS.has(data.visibility)) {
    errors.push(`${rel}: invalid visibility \`${data.visibility}\``);
  }
  if (data.publication_status && !STATUS.has(data.publication_status)) {
    errors.push(`${rel}: invalid publication_status \`${data.publication_status}\``);
  }
  if (data.task) {
    const tasks = Array.isArray(data.task) ? data.task : [data.task];
    for (const t of tasks) {
      if (!TASKS.has(t)) errors.push(`${rel}: invalid task \`${t}\``);
    }
  }

  const isPublicApproved =
    data.visibility === 'public' &&
    (data.publication_status === 'approved' || data.publication_status === 'published');

  if (isPublicApproved) {
    publicApproved += 1;
    for (const rule of SENSITIVE) {
      const hits = body.match(rule.re);
      if (hits?.length) {
        errors.push(`${rel}: sensitive pattern \`${rule.name}\` found (${hits.length} hit(s))`);
      }
    }
    // Frontmatter source_ref may mention wiki paths; bodies must not.
    if (/\/Users\//.test(JSON.stringify(data))) {
      warnings.push(`${rel}: absolute path in frontmatter (prefer relative source_id only)`);
    }
  }
}

if (publicApproved < 1) {
  errors.push('no approved+public content found; production site would be empty of practice pages');
}

console.log(`Checked ${files.length} content files; ${publicApproved} approved+public.`);

if (warnings.length) {
  console.warn('\nWarnings:');
  for (const w of warnings) console.warn(`  - ${w}`);
}

if (errors.length) {
  console.error('\nContent gate FAILED:');
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log('Content gate passed.');
