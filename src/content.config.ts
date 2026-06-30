import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Case studies / writeups, authored as Markdown in
 * `src/content/case-studies/`. Each file's filename (without extension)
 * becomes its URL slug, e.g.
 *   llm-as-a-judge-evaluation-pipeline.md
 *   -> /case-studies/llm-as-a-judge-evaluation-pipeline
 */
const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/case-studies' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    role: z.string().optional(),
    stack: z.array(z.string()).default([]),
    status: z.string().optional(),
    publishDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { caseStudies };
