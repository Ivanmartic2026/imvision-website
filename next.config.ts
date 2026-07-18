import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Server runtime (Vercel) — NOT static export — so App Router API routes
  // (e.g. /api/contact) run server-side. Do not re-add `output: "export"`.
  images: {
    // Server runtime (Vercel) optimizes images on demand — emit modern formats
    // (AVIF first, WebP fallback) with responsive srcset. Do NOT re-add
    // `unoptimized: true` (that was a static-export artifact and ships full-size JPGs).
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
  trailingSlash: true,

  // All 3xx redirects live here (single source of truth). Host-based matching
  // (www → apex) is the documented next.config mechanism; the equivalent
  // `has: host` rule in vercel.json did NOT fire on this deployment.
  async redirects() {
    const toRental = "/sv/rental/";
    const toSales = "/sv/sales/";
    const toProjects = "/sv/projects/";

    // Legacy WordPress (www.imvision.se) URLs that were indexed by Google →
    // 308 to the closest new page so ranking/link-equity carries over.
    const legacy: Array<[string, string]> = [
      ["/kontakt", "/sv/contact/"],
      ["/om", "/sv/about/"],
      ["/kop", toSales],
      ["/produkt-kategori/ledskarm/utomhus-led-skarm", toSales],
      ["/produkt/im-vision-all-in-one-solution-cob-162-p1-87", toSales],
      ["/produkt/samsung-the-wall-all-in-one-246", toSales],
      ["/hyr", toRental],
      ["/uthyrning", toRental],
      ["/hyr-led-skarmar", toRental],
      ["/hyra-storbildsskarm-i-helsingborg", toRental],
      ["/kundcase", toProjects],
      ["/stc-habo", toProjects],
      ["/goteborgs-opera", toProjects],
      ["/MQ5", toProjects],
    ];

    // Emit both slash and no-slash variants (trailingSlash: true is on).
    const legacyRedirects = legacy.flatMap(([source, destination]) => [
      { source, destination, permanent: true },
      { source: `${source}/`, destination, permanent: true },
    ]);

    return [
      // Canonical host: www → apex (keep first).
      {
        source: "/:path*",
        has: [{ type: "host" as const, value: "www.imvision.se" }],
        destination: "https://imvision.se/:path*",
        permanent: true,
      },
      ...legacyRedirects,
    ];
  },
};

export default nextConfig;
