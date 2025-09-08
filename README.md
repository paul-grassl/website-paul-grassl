# Paul Graßl – Website - Dokumentation

## Quick Start
- Installation: `npm install`
- Entwicklung: `npm run dev`
- Build: `npm run build`

## Technischer Stack
- Astro 5 (SSG), View Transitions
- Tailwind CSS (+ Typography)
- Astro Content Collections (Markdown in `src/data`)
- Optimierte Bilder via `astro:assets`

## Projektstruktur (wichtigste Pfade)
- `src/pages/`
  - `index.astro`: Startseite
  - `works.astro`: Jahresübersicht aller Arbeiten
  - `works/[year].astro`: Seite mit allen Arbeiten eines Jahres (inkl. Slideshow)
  - `exhibitions.astro`: Ausstellungsübersicht
  - `exhibitions/[slug].astro`: Ausstellungsdetails
  - `contact.astro`: Kontaktseite
  - `impressum.astro`, `datenschutz.astro`: Rechtliches
- `src/data/` (Content als Markdown, wird über `src/content.config.ts` geladen)
  - `works/YYYY/*.md`: Arbeiten (einzelt oder Serie)
  - `exhibitions/*.md`: Ausstellungen
  - `current/*.md`: Aktuelle Ausstellung / Landing-Bild
  - Hinweis: `about`-Collection ist konfiguriert, aber derzeit leer. Inhalt kommt aus `src/pages/about.md`.
- `public/assets/`
  - `workImages/YYYY/...`: Bilder zu Arbeiten
  - `exhibitionImages/...`: Bilder zu Ausstellungen
  - `favicon/...`: Favicons & `site.webmanifest`
- `src/components/`: u.a. `Header.astro`, `Footer.astro`, `Hr.astro`
- `src/layouts/`: `Layout.astro`, `AboutLayout.astro`
- `src/styles/`: `global.css`, `typography.css`

## Inhalte pflegen

### Neue Arbeit hinzufügen
1. Bilddatei(en) nach `public/assets/workImages/YYYY/` kopieren.
2. Markdown-Datei erstellen unter `src/data/works/YYYY/work_YYYY.md`:

```md
---
title: "Titel der Arbeit"
technique: "Technik"
size: "Maße"
year: YYYY
slug: "sprechender-slug-YYYY"
# Reihenfolge innerhalb des Jahres (optional, Zahl aufsteigend)
order: 1
# Anzeigegröße: "small" | "medium" | "large" (optional, default: medium)
displaySize: "medium"
# EINE EINZELNE ARBEIT:
# image: "/assets/workImages/YYYY/dateiname.jpg"
# orientation: "portrait" | "landscape"
# ODER: SERIE (Slideshow)
images:
  - src: "/assets/workImages/YYYY/datei1.jpg"
    orientation: "portrait"
    specificTitle: "optional, z.B. 1/6"
  - src: "/assets/workImages/YYYY/datei2.jpg"
    orientation: "portrait"
---
```

Hinweise:
- Einzelarbeit: `image`, `orientation` verwenden (kein `images`-Array).
- Serie: `images`-Array verwenden und `isSeries: true` setzen. Beispiel siehe `src/data/works/2025/work_2025_akiya_series.md`.
- Sortierung im Jahr über `order`.
- Darstellung beeinflusst durch `displaySize` (small/medium/large).

Die Seiten `works.astro` und `works/[year].astro` generieren sich automatisch neu.

### Neue Ausstellung hinzufügen
1. Bilder nach `public/assets/exhibitionImages/<ordner>/` kopieren (ein Hauptbild + optional weitere).
2. Markdown-Datei unter `src/data/exhibitions/exhib_YYYY.md` erstellen:

```md
---
title: "Titel"
location: "Ort"
type: "Solo show | Group show ..."
period: "March 7 – March 13, 2025"  # wird nach Startdatum sortiert
image: "/assets/exhibitionImages/<ordner>/hauptbild.jpg"  # Hauptbild für Übersicht
slug: "sprechender-slug"
images:
  - src: "/assets/exhibitionImages/<ordner>/bild1.jpg"
    orientation: "landscape"
  - src: "/assets/exhibitionImages/<ordner>/bild2.jpg"
    orientation: "portrait"
exhibitionViews: "optional, Credits"
---
```

Hinweise:
- Die Übersicht `exhibitions.astro` sortiert automatisch nach dem Beginn aus `period`.
- Detailseite unter `/exhibitions/[slug]`.

### Aktuelle Ausstellung / Landing-Bild
- Dateien in `src/data/current/` bearbeiten:
  - `current-exhibition-*.md` (Daten zur aktuellen Ausstellung)
  - `landing-image.md` (Startseitenbild)

### About-Seite
- Inhalt aktuell in `src/pages/about.md` pflegen (nicht in `src/data/about`).

## Styling & Farben
- Farben/Themes in `src/styles/global.css` (`--accent`, `--foreground`, etc.).
- Typografie-Overrides in `src/styles/typography.css`.
- Linien (Header/Footer) über `src/components/Hr.astro`.

## Slideshow (Works)
- Mobile: Klickflächen + Swipe (links/rechts)
- Debounce gegen zu schnelles Klicken
- Tastatur: Enter/Space auf Navigationsflächen
- Reihenfolge/Größe über Frontmatter (`order`, `displaySize`)

## Favicons
- Liegen in `public/favicon/`. Manifest: `public/favicon/site.webmanifest`.

## Troubleshooting
- Stale-Asset-Fehler (ENOENT, z. B. gelöschte Icons): Vite-Cache leeren
  - Ordner löschen: `node_modules/.vite` und `.astro`, dann Dev-Server neu starten
- View-Transitions/Init-Probleme: Slideshow init wird bereits robust mehrfach getriggert (`astro:after-swap`, `astro:page-load`, `DOMContentLoaded`, `load`).

## Deployment (Hinweis)
- Geeignet für statisches Hosting (z. B. Netlify). Rechtstexte: `impressum.astro` und `datenschutz.astro` aktuell halten.
