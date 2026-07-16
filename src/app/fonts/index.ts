import { IBM_Plex_Mono, Manrope } from "next/font/google";
// import localFont from "next/font/local";

/**
 * FONT ARCHITECTURE
 *
 * The site uses two CSS variables for typography:
 *   --font-heading  → large headlines, display text
 *   --font-body     → body copy, UI text
 *
 * Both currently point to Manrope. To swap in a licensed premium font
 * (e.g. Söhne, Suisse International, Neue Haas Grotesk), update the
 * definitions below or switch to `next/font/local` with purchased WOFF2
 * files placed in this folder (`src/app/fonts/`).
 */

/**
 * Manrope is a variable font. Loading it once (no pinned `weight`) ships a
 * single WOFF2 covering the full 200–800 axis instead of two instances × four
 * static weights. Both roles (--font-heading, --font-body) resolve to it, so
 * headings and body share one download. `adjustFontFallback` keeps CLS at 0.
 */
const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const bodyFont = manrope;
export const headingFont = manrope;

export const monoFont = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

/*
 * EXAMPLE: self-hosted premium font swap (uncomment after purchasing license).
 *
 * 1. Place WOFF2 files in this directory, e.g.:
 *    src/app/fonts/Sohne-Buch.woff2
 *    src/app/fonts/Sohne-Halbfett.woff2
 *
 * 2. Uncomment the import and blocks below.
 *
 * 3. Remove the Manrope imports above if they are no longer needed.
 *
 * const soehne = localFont({
 *   variable: "--font-heading",
 *   src: [
 *     { path: "./Sohne-Buch.woff2", weight: "400", style: "normal" },
 *     { path: "./Sohne-Halbfett.woff2", weight: "600", style: "normal" },
 *   ],
 *   display: "swap",
 * });
 *
 * export const headingFont = soehne;
 * export const bodyFont = soehne;
 */
