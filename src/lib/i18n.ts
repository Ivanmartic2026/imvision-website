export type Locale = "en" | "sv";

export function localizedHref(locale: Locale, href: string) {
  if (locale === "en" || !href.startsWith("/")) return href;
  if (href === "/") return "/sv/";
  return `/sv${href}`;
}
