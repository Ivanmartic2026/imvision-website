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
      // Swedish fault-report page from the old site. Search Console (3 months to
      // 2026-07-27): 9 clicks, 196 impressions, average position 3.1 — all of it
      // landing on a 404.
      ["/felanmalan", "/sv/support/"],
    ];

    // English-language legacy URLs. These were missed when the Swedish list above
    // was written, and Search Console shows they are still the site's single
    // largest source of wasted search visibility. Figures below are 3-month
    // page-level data (2026-04-28 – 2026-07-27) read from the Resultat report;
    // every one of these paths returns 404 today, and Google's index report lists
    // them under "Hittades inte (404)" with a failed validation attempt.
    const legacyEn: Array<[string, string]> = [
      ["/contact-us", "/contact/"], //          21 clicks, 594 impressions, pos 6.3
      ["/service-and-support", "/support/"], // 11 clicks, 326 impressions, pos 7.5
      ["/installation", "/service/"], //         5 clicks, 298 impressions, pos 4.5
      ["/inspiration", "/projects/"], //         2 clicks, 366 impressions, pos 6.3
      ["/our-projects", "/projects/"], //        0 clicks, 166 impressions, pos 7.4
      ["/rentals", "/rental/"], //               0 clicks,  27 impressions, pos 3.1
      ["/file/rental-agreement.pdf", "/rental/"], //     13 impressions, pos 11.3
      ["/rental-conditions", "/rental/"], //              2 impressions, pos 8.5
      ["/cookies", "/privacy/"], //                       5 impressions, pos 3.4
      ["/work-with-us", "/contact/"], //                  2 impressions, pos 9.5
      ["/term", "/terms/"], //                            2 impressions, pos 3.0
      ["/services", "/service/"], //                      1 impression,  pos 22.0
      // Not a real page: Google turned a bare "support@imvision.se" string on the
      // old site into a relative URL and has had it in the index since 2026-05-16.
      // It is the only URL left in the "Hittades inte (404)" group that still 404s,
      // and it blocks the group's validation from passing. A 404 would be defensible,
      // but sending it to the support page costs nothing and clears the report.
      ["/support@imvision.se", "/support/"],
    ];

    // Deliberately NOT redirected: /login (3 clicks, 487 impressions), /register
    // (14) and /forgot-password (2). They point at a customer portal this
    // marketing site does not have. Sending portal traffic to a marketing page
    // would be a soft 404 and worse UX than the current 404 — the destination is
    // a business decision (admin.imvision.se?), tracked in SEO-ACTION-PLAN.md.

    // Emit both slash and no-slash variants (trailingSlash: true is on).
    const legacyRedirects = [...legacy, ...legacyEn].flatMap(([source, destination]) => [
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
