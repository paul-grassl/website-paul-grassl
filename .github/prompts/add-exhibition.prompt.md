---
description: "Adds a new exhibition to the exhibitions data, processes exhibition images, and updates the CV/about page."
---

# Task

You are tasked with creating a new exhibition entry. The user will provide details such as the title, location, year, period, type of exhibition (solo, group, etc.), and photos of the exhibition.

# Rules & Process

1. If needed, rename exhibition photos to the convention `exhib_[YYYY]_[camelCaseTitle]_[index].jpg` (1-based index) in `src/assets/exhibitionImages/[YYYY]_[camelCaseTitle]/` before mapping them into frontmatter.
2. If needed, resize exhibition photos to 1920x1440 for landscape or 1440x1920 for portrait (use `sips`), then verify dimensions.
3. Use the provided information to create a new Markdown file in `src/data/exhibitions/` following the naming convention `exhib_[YYYY]_[camelCaseTitle].md`.
4. Generate the Frontmatter properly. It must include:
   - `title`: the properly formatted exhibition title.
   - `location`: e.g., "Gallery Name, City, Country" (use full country name, not abbreviations).
   - `type`: e.g., "Solo show", "Group show", etc. If it is a two-person show, include the other artist ("Two-person show with Name").
   - `period`: e.g., "June 30 – July 30, 2026".
   - `slug`: formatted as `kebab-case-title`.
   - `exhibitionViews`: the photographer name(s) (if provided). Use comma-separated names; if Paul Graßl contributed, list him last.
   - `image`: the path to the main preview image.
   - `images`: an array mapping all images in `src/assets/exhibitionImages/[YYYY]_[camelCaseTitle]/`. Each entry needs a path relative to the Markdown file (for example, `../../assets/exhibitionImages/...`) and an `orientation` ("landscape" or "portrait").
5. Update `src/pages/about.md` with the new exhibition entry in the "Exhibitions" section. Insert it in chronologically descending order (newest first).

# Instructions

- If the exhibition images are not yet uploaded, remind the user to drop them into `src/assets/exhibitionImages/[YYYY]_[camelCaseTitle]/` first, so you can map them in the Markdown file.
- Perform all file creations and edits automatically.
