/*
 * Copyright 2026 nuin
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

import { isUuid } from './utils/uuid';

// Schemas
import { ArticleFrontmatterSchema } from './lib/schemas/article.schema';

const articles = defineCollection({
  // Load Markdown files in the `src/content/articles/` directory.
  loader: glob({
    base: './src/content/articles',
    pattern: '**/*.md',
    generateId: ({ base, entry, data }) => {
      const fileName = entry.replace('.md', '');
      const publishedAt = ArticleFrontmatterSchema.parse(data).publishedAt;

      if (publishedAt) {
        if (isUuid(fileName)) {
          throw Error(`ファイル名がUUIDになっています [${base + entry}]`);
        }

        // console.log(publishedAt.getTime().toString(36));
        // console.log(Math.floor(publishedAt.getTime() / 1000).toString(36));
        // console.log(Number(fileName.replaceAll('-', '')).toString(36));
        // console.log(Number(fileName.split('-').reverse().join('')).toString(36));

        return Number(fileName.replaceAll('-', '')).toString(36);
      } else {
        return fileName;
      }
    },
  }),
  // Type-check frontmatter using a schema
  schema: () => ArticleFrontmatterSchema,
});

export const collections = { articles };
