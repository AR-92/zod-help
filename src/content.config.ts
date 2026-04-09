import { defineCollection, z } from 'astro:content';

const docs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    category: z.string(),
    order: z.number().default(0),
    prevLink: z.string().optional(),
    nextLink: z.string().optional(),
    prevTitle: z.string().optional(),
    nextTitle: z.string().optional(),
  }),
});

export const collections = { docs };
