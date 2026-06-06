---
description: "Scans for new artwork images and generates their Markdown files in bulk."
---

# Task
Detect new images in a given year's folder from `public/assets/workImages/[YYYY]/` and create the corresponding Markdown files in `src/data/works/[YYYY]/`.

# Rules & Process
1. List all `.jpg` images in `public/assets/workImages/[YYYY]/`.
2. List all `.md` files in `src/data/works/[YYYY]/`.
3. Compare the two lists to find which artworks do not have an `.md` file yet.
   - Use a combination of `titel`, `size`, and `technique` to match them. Strip out suffixes like `_frontal1`, `_detail1`.
4. Group images by their combination of `titel`, `size`, and `technique` to ensure uniqueness. For example, if you find `PG_2026_100x100_OoC_Test_frontal1.jpg` and `PG_2026_100x100_OoC_Test_sideLeft.jpg`, they belong to the same artwork. However, `PG_2026_50x50_SoP_Test.jpg` is a different artwork because of the different size and technique, despite having the same title.
5. Sort grouped images by their suffix in this specific slideshow order:
   1. `frontal1`
   2. `frontal2`
   3. `frontal3`
   4. `sideLeft`
   5. `sideRight`
   6. `detail1`
   7. `detail2`
6. For each new artwork, extract the data:
   - **Year**: `YYYY`
   - **Size**: from `HöheXBreite` (convert commas to dots, format `[Height] x [Width] cm`)
   - **Technique**: Expand `OoC` -> "Oil on canvas", `OnL` -> "Oil on linen", `SoP` -> "Silkscreen on paper".
   - **Title**: Format the `titel` part to make it human-readable. Agents are smart enough to decode URL-friendly strings back to real titles. For example: `dont-be-evil` -> "Don't be evil" or `4-13-4_AkiyaSerie` -> "4-13-4 (Akiya Serie)".
   - **Orientation**: Height > Width -> `portrait`, Width > Height -> `landscape`.
7. Determine global `order`:
   - Check the works overview and ask the user where this new artwork should be positioned globally among all works. Assign the correct numeric `order` frontmatter accordingly.
8. Create a single `.md` file `work_[YYYY]_[titel_slug].md` in `src/data/works/[YYYY]/`.


# Output Format (Frontmatter)
If there is a single image without a suffix, use `image`:
```markdown
---
title: "[Extracted Title]"
technique: "[Expanded Technique]"
size: "[Height] x [Width] cm"
year: [YYYY]
slug: "[titel_slug]-[YYYY]"
isSeries: false
image: "/assets/workImages/[YYYY]/[filename]"
orientation: "[landscape | portrait]"
order: 1
---
```

If there are multiple images grouped for the same artwork, you MUST use the `images` array in strict sorted order and you MUST set `isSeries: true`:
```markdown
---
title: "[Extracted Title]"
technique: "[Expanded Technique]"
size: "[Height] x [Width] cm"
year: [YYYY]
slug: "[titel_slug]-[YYYY]"
isSeries: true
order: 1
images:
  - src: "/assets/workImages/[YYYY]/[filename_frontal1]"
    orientation: "[landscape | portrait]"
  - src: "/assets/workImages/[YYYY]/[filename_sideLeft]"
    orientation: "[landscape | portrait]"
---
```
Create the files automatically.