import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    // Allow everything crawlable; keep the POST-only API route out of the crawl
    // (it 405s on GET — no crawl value). All content pages stay open to AI
    // crawlers (GPTBot, PerplexityBot, etc.) and traditional bots alike.
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: "https://imvision.se/sitemap.xml",
    host: "https://imvision.se",
  };
}
