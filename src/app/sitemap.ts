import { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { localeUrl } from "@/lib/seo";

export const dynamic = "force-static";

type ChangeFreq = "weekly" | "monthly" | "yearly";

// One <url> entry per language, each carrying the hreflang alternate set so
// Google links the EN/SV versions. Only indexable pages are listed.
function localizedEntries(path: string, priority: number, changeFrequency: ChangeFreq) {
  const enUrl = localeUrl("en", path);
  const svUrl = localeUrl("sv", path);
  // x-default points at the EN URL — matches the <link rel="alternate"> set that
  // pageMeta() emits in each page's <head>, so the two hreflang signals agree.
  const languages = { en: enUrl, sv: svUrl, "x-default": enUrl };
  const lastModified = new Date();
  return [
    { url: enUrl, lastModified, changeFrequency, priority, alternates: { languages } },
    { url: svUrl, lastModified, changeFrequency, priority, alternates: { languages } },
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths: Array<[string, number]> = [
    ["/", 1],
    ["/sales/", 0.9],
    ["/rental/", 0.9],
    ["/service/", 0.8],
    ["/projects/", 0.8],
    ["/about/", 0.7],
    ["/contact/", 0.7],
    ["/support/", 0.6],
  ];

  const staticEntries = staticPaths.flatMap(([path, priority]) =>
    localizedEntries(path, priority, "weekly")
  );

  // Legal pages are indexable and linked from the footer, so they belong in the
  // sitemap — leaving them out made them discoverable by crawl only. Low priority
  // and "yearly" because they change rarely and must not compete with commercial pages.
  const legalEntries = (["/privacy/", "/terms/"] as const).flatMap((path) =>
    localizedEntries(path, 0.2, "yearly")
  );

  // Swedish-only legal document (no English twin). Mirrors the hreflang set that
  // sv/servicevillkor/page.tsx declares for itself (sv + x-default → the sv URL),
  // so the sitemap and the <head> alternates agree. Without this entry the page
  // was an orphan: 200 OK, but zero internal links and absent from the sitemap.
  const svOnlyUrl = localeUrl("sv", "/servicevillkor/");
  const svOnlyEntries = [
    {
      url: svOnlyUrl,
      lastModified: new Date(),
      changeFrequency: "yearly" as ChangeFreq,
      priority: 0.2,
      alternates: { languages: { sv: svOnlyUrl, "x-default": svOnlyUrl } },
    },
  ];

  // Exclude unverified drafts — those pages are noindex, so listing them in the
  // sitemap would be a conflicting signal (Search Console "Submitted URL marked noindex").
  const projectEntries = projects
    .filter((project) => project.verified === true)
    .flatMap((project) => localizedEntries(`/projects/${project.slug}/`, 0.6, "monthly"));

  return [...staticEntries, ...projectEntries, ...legalEntries, ...svOnlyEntries];
}
