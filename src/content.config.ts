import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const exhibitions = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: `./src/data/exhibitions` }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      location: z.string(),
      type: z.string(),
      period: z.string(),
      image: z.string(),
      slug: z.string(),
      images: z.array(
        z.object({
          src: z.string(),
          orientation: z.enum(["landscape", "portrait"]).default("landscape")
        })
      ).optional(),
      exhibitionViews: z.string().optional(),
    }),
});

const works = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: `./src/data/works` }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      technique: z.string(),
      size: z.string(),
      year: z.number(),
      slug: z.string(),
      isSeries: z.boolean().default(false),
      // For single works, use this image
      image: z.string().optional(),
      orientation: z.enum(["landscape", "portrait"]).default("landscape"),
      // For series, use this array
      images: z.array(
        z.object({
          src: z.string(),
          orientation: z.enum(["landscape", "portrait"]).default("landscape"),
          specificTitle: z.string().optional() // For individual pieces in series like "Work 1"
        })
      ).optional(),
      order: z.number().optional(), // For sorting works within a year
    }),
});

export const collections = { exhibitions, works };
