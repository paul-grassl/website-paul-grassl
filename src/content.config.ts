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
      de: z.object({
        location: z.string(),
        type: z.string(),
        period: z.string(),
        exhibitionViews: z.string(),
      }),
      image: image(),
      slug: z.string(),
      images: z
        .array(
          z.object({
            src: image(),
            orientation: z.enum(["landscape", "portrait"]).default("landscape"),
          })
        )
        .optional(),
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
      de: z.object({
        title: z.string().optional(),
        technique: z.string(),
        size: z.string(),
      }),
      year: z.union([z.number().int(), z.string().regex(/^\d{4}(?:-\d{4})?$/)]),
      slug: z.string(),
      isSeries: z.boolean().default(false),
      // For single works, use this image
      image: image().optional(),
      orientation: z.enum(["landscape", "portrait"]).default("landscape"),
      // For series, use this array
      images: z
        .array(
          z.object({
            src: image(),
            orientation: z.enum(["landscape", "portrait"]).default("landscape"),
            specificTitle: z.string().optional(), // For individual pieces in series like "Work 1"
            specificTitleDe: z.string().optional(),
          })
        )
        .optional(),
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
  schema: ({ image }) =>
    z.object({
      // For current exhibition
      title: z.string().optional(),
      location: z.string().optional(),
      locationUrl: z.string().optional(),
      type: z.string().optional(),
      opening: z.string().optional(),
      additionalInfo: z.string().optional(),
      period: z.string().optional(),
      // For landing image
      image: image().optional(),
      caption: z.string().optional(),
      alt: z.string().optional(),
      de: z
        .object({
          location: z.string().optional(),
          type: z.string().optional(),
          opening: z.string().optional(),
          additionalInfo: z.string().optional(),
          period: z.string().optional(),
          caption: z.string().optional(),
          alt: z.string().optional(),
        })
        .optional(),
    }),
});

export const collections = { exhibitions, works, about, current };
