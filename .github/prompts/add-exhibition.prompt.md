---
description: "Adds a new exhibition to the exhibitions data, processes exhibition images, and updates the CV/about page."
---

# Task
You are tasked with creating a new exhibition entry. The user will provide details such as the title, location, year, period, type of exhibition (solo, group, etc.), and photos of the exhibition.

# Rules & Process
1. Use the provided information to create a new Markdown file in `src/data/exhibitions/` following the naming convention `exhib_[YYYY]_[camelCaseTitle].md`.
2. Generate the Frontmatter properly. It must include:
   - `title`: the properly formatted exhibition title.
   - `location`: e.g., "Gallery Name, City, Country".
   - `type`: e.g., "Solo show", "Group show", etc.
   - `period`: e.g., "June 30 – July 30, 2026".
   - `slug`: formatted as `kebab-case-title`.
   - `exhibitionViews`: the name of the photographer (if provided).
   - `image`: the path to the main preview image.
   - `images`: an array mapping all images in `public/assets/exhibitionImages/[YYYY]_[camelCaseTitle]/`. Each entry needs a `src` string and an `orientation` ("landscape" or "portrait").
3. Update `src/pages/about.md` with the new exhibition entry in the "Exhibitions" section. Insert it in chronologically descending order (newest first).

# Instructions
- If the exhibition images are not yet uploaded, remind the user to drop them into `public/assets/exhibitionImages/[YYYY]_[camelCaseTitle]/` first, so you can map them in the Markdown file.
- Perform all file creations and edits automatically.