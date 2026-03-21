import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

// Schemas
import { ArticleFrontmatterSchema } from './lib/schemas/article.schema';

const articles = defineCollection({
  // Load Markdown files in the `src/content/articles/` directory.
  loader: glob({ base: './src/content/articles', pattern: '**/*.md' }),
  // Type-check frontmatter using a schema
  schema: () => ArticleFrontmatterSchema,
});

export const collections = { articles };
