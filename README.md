# Paul Graßl – Website - Dokumentation

## Quick Start

- Installation: `pnpm install`
- Entwicklung: `pnpm run dev`
- Build: `pnpm run build`

## Technischer Stack

- Astro 5 (SSG), View Transitions
- Tailwind CSS (+ Typography)
- Astro Content Collections (Markdown in `src/data`)
- Optimierte Bilder via `astro:assets`

## Projektstruktur (wichtigste Pfade)

- `src/pages/`
  - `index.astro`: Startseite
  - `works.astro`: Jahresübersicht aller Arbeiten
  - `exhibitions.astro`: Ausstellungsübersicht
  - `exhibitions/[slug].astro`: Ausstellungsdetails
  - `contact.astro`: Kontaktseite
  - `impressum.astro`, `datenschutz.astro`: Rechtliches
- `src/data/` (Content als Markdown, wird über `src/content.config.ts` geladen)
  - `works/YYYY/*.md`: Arbeiten (einzelt oder Serie)
  - `exhibitions/*.md`: Ausstellungen
  - `current/*.md`: Aktuelle Ausstellung / Landing-Bild
  - Hinweis: `about`-Collection ist konfiguriert, aber derzeit leer. Inhalt kommt aus `src/pages/about.md`.
- `src/assets/`
  - `workImages/YYYY/...`: Von Astro optimierte Bilder zu Arbeiten
  - `exhibitionImages/...`: Von Astro optimierte Ausstellungsbilder
  - `landingpageImages/...`: Bilder für die Startseite
  - `personalImages/...`: Persönliche Bilder, z. B. das Studioporträt
- `public/favicon/`: Favicons & `site.webmanifest` (unverändert durch Astro)
- `src/components/`: u.a. `Header.astro`, `Footer.astro`, `Hr.astro`
- `src/layouts/`: `Layout.astro`, `AboutLayout.astro`
- `src/styles/`: `global.css`, `typography.css`

## Inhalte pflegen

### Neue Arbeit hinzufügen

1. Bilddatei(en) nach `src/assets/workImages/YYYY/` kopieren.
   - Namensschema: `PG_YYYY_HöheXBreite_titel.jpg` (Maße = Höhe × Breite in cm)
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
# EINE EINZELNE ARBEIT:
# image: "../../../assets/workImages/YYYY/dateiname.jpg"
# orientation: "portrait" | "landscape"
# ODER: SERIE (Slideshow)
images:
  - src: "../../../assets/workImages/YYYY/datei1.jpg"
    orientation: "portrait"
    specificTitle: "optional, z.B. 1/6"
  - src: "../../../assets/workImages/YYYY/datei2.jpg"
    orientation: "portrait"
---
```

Hinweise:

- Einzelarbeit: `image`, `orientation` verwenden (kein `images`-Array). `isSeries` muss **nicht** gesetzt werden (Default: `false`).
- Serie: `images`-Array verwenden und `isSeries: true` setzen (Pflicht!). Beispiel siehe `src/data/works/2025/work_2025_akiya_series.md`.
- Sortierung im Jahr über `order`.

Die Seite `works.astro` generiert sich automatisch neu.

### Neue Ausstellung hinzufügen

1. Bilder nach `src/assets/exhibitionImages/<ordner>/` kopieren (ein Hauptbild + optional weitere).
2. Markdown-Datei unter `src/data/exhibitions/exhib_YYYY.md` erstellen:

```md
---
title: "Titel"
location: "Ort"
type: "Solo show | Group show ..."
period: "March 7 – March 13, 2025" # wird nach Startdatum sortiert
image: "../../assets/exhibitionImages/<ordner>/hauptbild.jpg" # Hauptbild für Übersicht
slug: "sprechender-slug"
images:
  - src: "../../assets/exhibitionImages/<ordner>/bild1.jpg"
    orientation: "landscape"
  - src: "../../assets/exhibitionImages/<ordner>/bild2.jpg"
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
- Landing-Bilder unter `src/assets/` speichern und in `landing-image.md` relativ referenzieren. Bilder aus `src/assets/workImages/` können ebenfalls verwendet werden.

Verfügbare Felder in `current-exhibition-*.md`:

```md
---
title: "Titel der Ausstellung"
location: "Galerie / Ort"
locationUrl: "https://..." # optional, verlinkt den Ort
type: "Solo show | Group show ..."
opening: "March 7, 2026, 7pm" # optional, Vernissage-Datum
additionalInfo: "Midissage: March 14, 3-6pm" # optional, weitere Termin-/Hinweiszeile
period: "March 7 – March 28, 2026"
---
```

### About-Seite

- Inhalt aktuell in `src/pages/about.md` pflegen (nicht in `src/data/about`).
- Das Studioporträt liegt unter `src/assets/personalImages/` und wird in `src/layouts/AboutLayout.astro` eingebunden.

## Styling & Farben

- Farben/Themes in `src/styles/global.css` (`--accent`, `--foreground`, etc.).
- Typografie-Overrides in `src/styles/typography.css`.
- Linien (Header/Footer) über `src/components/Hr.astro`.

## Slideshow (Works)

- Mobile: Klickflächen + Swipe (links/rechts)
- Desktop: Pfeil-Buttons und Pfeiltasten (←/→) für Keyboard-Navigation
- Reihenfolge der Werke kann global über das Frontmatter-Feld `order` gesteuert werden

### Image-Loading-Strategie (Stand: August 2026)

Die Ladelogik ist bewusst optimiert und sollte bei Änderungen in README dokumentiert werden:

- Inhaltsbilder liegen unter `src/assets/` und werden beim statischen Build als responsive WebP-Varianten erzeugt.
- Das erste relevante Bild einer Seite erhält `priority`; weitere Bilder werden nativ vom Browser lazy geladen.
- Astro schreibt Bildmaße in das HTML. Ein neutraler Hintergrund zeigt sofort die reservierte Bildfläche und verhindert Layout-Sprünge; Blur-Platzhalter werden nicht verwendet.
- Works-Slideshows reservieren eine feste Bühne. Wenn eine Serie bis auf 800 px an den Viewport herankommt, werden aktuelles, nächstes und vorheriges Bild gemeinsam vorbereitet; weitere Slides folgen mit niedriger Priorität.
- `src/components/OptimizedImage.astro` bündelt die gemeinsamen Einstellungen für Startseite, Ausstellungen und About. `ArtworkImage.astro` enthält die Works-spezifischen Bildgrößen.

## Favicons

- Liegen in `public/favicon/`. Manifest: `public/favicon/site.webmanifest`.

## Troubleshooting

- **Geänderter Inhalt (Markdown/Frontmatter) wird im Dev-Server nicht übernommen:** Astro Content-Cache leeren: `rm -rf .astro node_modules/.vite`, dann Dev-Server neu starten. Betrifft alle Collections (`works`, `current`, `exhibitions`).
- Stale-Asset-Fehler (ENOENT, z. B. gelöschte Icons): gleicher Fix – `rm -rf .astro node_modules/.vite`, dann Dev-Server neu starten.
- View-Transitions/Init-Probleme: Die Slideshow wird bei `astro:page-load` initialisiert; bestehende Observer und Event-Listener werden vor einer erneuten Initialisierung bereinigt.

## Deployment (Hinweis)

- Geeignet für statisches Hosting (z. B. Netlify). Rechtstexte: `impressum.astro` und `datenschutz.astro` aktuell halten.
