export type Locale = "en" | "sv";

export function localizedHref(locale: Locale, href: string) {
  if (locale === "en" || !href.startsWith("/")) return href;
  if (href === "/") return "/sv/";
  return `/sv${href}`;
}

/**
 * Swedish routes with no English twin. Stripping "/sv" from these yields a URL
 * that 404s, so the language switcher points at the English home instead.
 * Keep in sync with src/app/(sv)/sv/** — any sv page without a matching (en)
 * page belongs here.
 */
const SV_ONLY_PATHS = new Set(["/sv/servicevillkor/"]);

/** Convert any current pathname to its English equivalent. */
export function getEnglishPath(pathname: string): string {
  if (pathname === "/sv/") return "/";
  // Tolerate a missing trailing slash so the lookup can't be bypassed.
  if (SV_ONLY_PATHS.has(pathname) || SV_ONLY_PATHS.has(`${pathname}/`)) return "/";
  if (pathname.startsWith("/sv/")) return pathname.slice(3) || "/";
  return pathname;
}

/** Convert any current pathname to its Swedish equivalent. */
export function getSwedishPath(pathname: string): string {
  if (pathname === "/") return "/sv/";
  if (pathname.startsWith("/sv/")) return pathname;
  return `/sv${pathname}`;
}
