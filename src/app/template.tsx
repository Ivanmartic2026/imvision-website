"use client";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/**
 * Route-level template. The previous full-page fade has been removed so content
 * is visible immediately on first paint (better LCP, SEO, and no-JS support).
 * Only the subtle film-grain overlay remains.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[150] opacity-[0.018] mix-blend-soft-light"
        style={{ backgroundImage: GRAIN, backgroundSize: "140px 140px" }}
      />
      {children}
    </>
  );
}
