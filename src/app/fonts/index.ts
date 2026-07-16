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

export const headingFont = Manrope({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  // Load a slightly wider weight range so headings can be sharper.
  weight: ["400", "500", "600", "700"],
});

export const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

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
