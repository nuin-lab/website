import { z } from 'astro/zod';

export const ArticleFrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  // Transform string to Date object
  publishedAt: z.coerce.date().optional(),
  revisedAt: z.coerce.date().optional(), // 名称はmicroCMSから - https://help.microcms.io/ja/knowledge/how-to-setup-date
  img: z.url(),
  tags: z.array(z.string()).nonempty(),
});
