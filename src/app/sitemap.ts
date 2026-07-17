import { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { localeUrl } from "@/lib/seo";

export const dynamic = "force-static";

type ChangeFreq = "weekly" | "monthly";

// One <url> entry per language, each carrying the hreflang alternate set so
// Google links the EN/SV versions. Only indexable pages are listed.
function localizedEntries(path: string, priority: number, changeFrequency: ChangeFreq) {
  const enUrl = localeUrl("en", path);
  const svUrl = localeUrl("sv", path);
  const languages = { en: enUrl, sv: svUrl };
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

  // Exclude unverified drafts — those pages are noindex, so listing them in the
  // sitemap would be a conflicting signal (Search Console "Submitted URL marked noindex").
  const projectEntries = projects
    .filter((project) => project.verified === true)
    .flatMap((project) => localizedEntries(`/projects/${project.slug}/`, 0.6, "monthly"));

  return [...staticEntries, ...projectEntries];
}
