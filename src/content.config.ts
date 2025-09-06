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
      displaySize: z.enum(["small", "medium", "large"]).default("medium"), // Size category for display
    }),
});

const about = defineCollection({
  loader: glob({ pattern: "**/*.md", base: `./src/data/about` }),
  schema: z.object({
    title: z.string().default("About"),
  }),
});

const current = defineCollection({
  loader: glob({ pattern: "**/*.md", base: `./src/data/current` }),
  schema: z.object({
    // For current exhibition
    title: z.string().optional(),
    location: z.string().optional(),
    locationUrl: z.string().optional(),
    type: z.string().optional(),
    period: z.string().optional(),
    // For landing image
    image: z.string().optional(),
    caption: z.string().optional(),
    alt: z.string().optional(),
  }),
});

export const collections = { exhibitions, works, about, current };
