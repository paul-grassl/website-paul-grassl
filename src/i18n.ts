export const DEFAULT_LOCALE = "en";

export type Locale = "en" | "de";

export const UI = {
  en: {
    nav: {
      works: "Works",
      exhibitions: "Exhibitions",
      about: "About",
      contact: "Contact",
    },
    pages: {
      currentCalendar: "Current Calendar",
      works: "Works",
      exhibitions: "Exhibitions",
      about: "About",
      contact: "Contact",
    },
    meta: {
      home: "Artist website",
      works: "Artwork by Paul Graßl",
      exhibitions: "Exhibitions by Paul Graßl",
      contact: "Get in touch with Paul Graßl",
      exhibitionPrefix: "Exhibition",
    },
    accessibility: {
      skipToContent: "Skip to content",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      switchLanguage: "View the German version",
      previousImage: "Previous image",
      nextImage: "Next image",
      aboutPhoto: "Paul Graßl in his studio",
      currentArtwork: "Current artwork by Paul Graßl",
      exhibitionView: "exhibition view",
      toggleTheme: "Toggle light and dark mode",
    },
    exhibitionViews: "Exhibition views",
  },
  de: {
    nav: {
      works: "Arbeiten",
      exhibitions: "Ausstellungen",
      about: "Vita",
      contact: "Kontakt",
    },
    pages: {
      currentCalendar: "Aktuelle Termine",
      works: "Arbeiten",
      exhibitions: "Ausstellungen",
      about: "Vita",
      contact: "Kontakt",
    },
    meta: {
      home: "Website des Künstlers Paul Graßl",
      works: "Arbeiten von Paul Graßl",
      exhibitions: "Ausstellungen von Paul Graßl",
      contact: "Kontakt zu Paul Graßl",
      exhibitionPrefix: "Ausstellung",
    },
    accessibility: {
      skipToContent: "Zum Inhalt springen",
      openMenu: "Menü öffnen",
      closeMenu: "Menü schließen",
      switchLanguage: "Englische Version anzeigen",
      previousImage: "Vorheriges Bild",
      nextImage: "Nächstes Bild",
      aboutPhoto: "Paul Graßl in seinem Atelier",
      currentArtwork: "Aktuelles Werk von Paul Graßl",
      exhibitionView: "Ausstellungsansicht",
      toggleTheme: "Hellen und dunklen Modus umschalten",
    },
    exhibitionViews: "Ausstellungsansichten",
  },
} as const;

export function getLocaleFromPathname(pathname: string): Locale {
  return pathname === "/de" || pathname.startsWith("/de/") ? "de" : "en";
}

export function stripLocaleFromPathname(pathname: string): string {
  if (pathname === "/de" || pathname === "/de/") return "/";
  if (pathname.startsWith("/de/")) return pathname.slice(3) || "/";
  return pathname || "/";
}

export function getLocalizedPath(pathname: string, locale: Locale): string {
  const pathWithoutLocale = stripLocaleFromPathname(pathname);
  const normalizedPath = pathWithoutLocale.startsWith("/")
    ? pathWithoutLocale
    : `/${pathWithoutLocale}`;

  if (locale === "de") {
    return normalizedPath === "/" ? "/de/" : `/de${normalizedPath}`;
  }

  return normalizedPath;
}
