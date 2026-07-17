export type Locale = "en" | "sv";

export function localizedHref(locale: Locale, href: string) {
  if (locale === "en" || !href.startsWith("/")) return href;
  if (href === "/") return "/sv/";
  return `/sv${href}`;
}

/** Convert any current pathname to its English equivalent. */
export function getEnglishPath(pathname: string): string {
  if (pathname === "/sv/") return "/";
  if (pathname.startsWith("/sv/")) return pathname.slice(3) || "/";
  return pathname;
}

/** Convert any current pathname to its Swedish equivalent. */
export function getSwedishPath(pathname: string): string {
  if (pathname === "/") return "/sv/";
  if (pathname.startsWith("/sv/")) return pathname;
  return `/sv${pathname}`;
}
