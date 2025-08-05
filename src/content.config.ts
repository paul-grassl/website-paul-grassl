import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { SITE } from "@/config";

export const BLOG_PATH = "src/data/blog";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: `./${BLOG_PATH}` }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      hideEditPost: z.boolean().optional(),
      timezone: z.string().optional(),
    }),
});

const exhibitions = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: `./src/data/exhibitions` }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      location: z.string(),
      period: z.string(),
      image: z.string(),
      slug: z.string(),
      images: z.array(
        z.object({
          src: z.string(),
          orientation: z.enum(["landscape", "portrait"]).default("landscape")
        })
      ).optional(),
    }),
});

export const collections = { blog, exhibitions };
