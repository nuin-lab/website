import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const articles = defineCollection({
  // Load Markdown files in the `src/content/articles/` directory.
  loader: glob({ base: './src/content/articles', pattern: '**/*.md' }),
  // Type-check frontmatter using a schema
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      // Transform string to Date object
      publishedAt: z.coerce.date().optional(),
      revisedAt: z.coerce.date().optional(), // 名称はmicroCMSから - https://help.microcms.io/ja/knowledge/how-to-setup-date
      img: z.url(),
      tags: z.array(z.string()).nonempty(),
    }),
});

export const collections = { articles };
