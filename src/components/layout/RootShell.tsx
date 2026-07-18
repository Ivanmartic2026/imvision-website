import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { LanguageGate } from "@/components/providers/LanguageGate";
import { Analytics } from "@/components/providers/Analytics";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteGraphLd } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/**
 * Shared body content for both per-locale root layouts: subtle film-grain
 * overlay, a localized skip link, smooth-scroll + providers, and the site-wide
 * JSON-LD graph. The two root layouts differ only in <html lang>.
 */
export function RootShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[150] opacity-[0.018] mix-blend-soft-light"
        style={{ backgroundImage: GRAIN, backgroundSize: "140px 140px" }}
      />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[12px_4px_12px_12px] focus:bg-accent focus:px-4 focus:py-3 focus:text-background"
      >
        {locale === "sv" ? "Hoppa till huvudinnehållet" : "Skip to main content"}
      </a>
      <SmoothScroll>{children}</SmoothScroll>
      <LanguageGate />
      <Analytics />
      <JsonLd data={siteGraphLd()} />
    </>
  );
}
