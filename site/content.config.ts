import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const taskEnum = z.enum(['learn', 'diagnose', 'execute', 'review', 'reuse']);

const practice = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    domain: z.enum(['ai', 'fde', 'trade_ops', 'global_platform', 'indie_site']),
    topics: z.array(z.string()),
    content_type: z.enum(['article', 'guide', 'playbook', 'case', 'template', 'checklist']),
    audience: z.array(z.string()),
    task: z.array(taskEnum).optional().default([]),
    maturity: z.string(),
    visibility: z.enum(['private', 'team', 'public']),
    publication_status: z
      .enum(['review_required', 'approved', 'published', 'rejected', 'stale', 'archived'])
      .default('review_required'),
    summary: z.string(),
    source_id: z.string(),
    source_project: z.string(),
    reviewed_at: z.coerce.date(),
    /** Required for approved|published + public (enforced in scripts/check-content.mjs). */
    reviewed_by: z.string().optional(),
    updated_at: z.coerce.date(),
  }),
});

export const collections = { practice };
