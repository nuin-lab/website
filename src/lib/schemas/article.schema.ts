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

import { reference } from 'astro:content';
import { z } from 'astro/zod';

export const ArticleFrontmatterSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  // Transform string to Date object
  publishedAt: z.coerce.date().optional(),
  revisedAt: z.coerce.date().optional(), // 名称はmicroCMSから - https://help.microcms.io/ja/knowledge/how-to-setup-date
  img: z.url().nonempty(),
  tags: z.array(reference('tags')).nonempty(),
  featured: z.number().min(1).max(5).optional(),
});
