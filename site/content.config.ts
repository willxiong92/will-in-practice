import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const practice = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    domain: z.enum(['ai', 'fde', 'trade_ops', 'global_platform', 'indie_site']),
    topics: z.array(z.string()),
    content_type: z.enum(['article', 'guide', 'playbook', 'case', 'template', 'checklist']),
    audience: z.array(z.string()),
    maturity: z.string(),
    visibility: z.enum(['private', 'team', 'public']),
    publication_status: z
      .enum(['review_required', 'approved', 'published', 'rejected', 'stale', 'archived'])
      .default('review_required'),
    summary: z.string(),
    source_id: z.string(),
    source_project: z.string(),
    reviewed_at: z.coerce.date(),
    updated_at: z.coerce.date(),
  }),
});

export const collections = { practice };
