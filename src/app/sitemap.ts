import { MetadataRoute } from "next";
import { projects } from "@/lib/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://imvision.se";

  const routes = [
    "",
    "projects/",
    "sales/",
    "rental/",
    "service/",
    "about/",
    "contact/",
    "support/",
  ].map((route) => ({
    url: `${baseUrl}/${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const swedishRoutes = [
    "sv/",
    "sv/projects/",
    "sv/sales/",
    "sv/rental/",
    "sv/service/",
    "sv/about/",
    "sv/contact/",
    "sv/support/",
  ].map((route) => ({
    url: `${baseUrl}/${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "sv/" ? 1 : 0.8,
  }));

  const swedishProjectRoutes = projects.map((project) => ({
    url: `${baseUrl}/sv/projects/${project.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...projectRoutes, ...swedishRoutes, ...swedishProjectRoutes];
}
