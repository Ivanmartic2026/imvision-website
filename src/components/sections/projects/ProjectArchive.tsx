"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Chip } from "@/components/ui/Chip";
import { ProjectVisual } from "@/components/sections/ProjectVisual";
import { projects, type Project } from "@/lib/projects";
import { swedishProjectCopy } from "@/lib/projects-sv";
import { Locale, localizedHref } from "@/lib/i18n";

/**
 * Project archive.
 *
 * Filters are derived from the tags and the `role` field that the project data
 * already carries — no invented categories, and no filter that would claim a
 * role IM Vision has not published for a project. `kindLabel` therefore returns
 * null when nothing supports a label, and the card simply omits it.
 */

type FilterKey = "all" | "dooh" | "retail" | "facade" | "operations";

const FILTERS: { key: FilterKey; sv: string; en: string; match?: (p: Project) => boolean }[] = [
  { key: "all", sv: "Alla", en: "All" },
  { key: "dooh", sv: "DOOH", en: "DOOH", match: (p) => p.tags.includes("DOOH") },
  { key: "retail", sv: "Butik", en: "Retail", match: (p) => p.tags.includes("Retail") },
  { key: "facade", sv: "Fasad", en: "Facade", match: (p) => p.tags.some((t) => t === "Façade" || t === "Curved LED") },
  {
    key: "operations",
    sv: "Drift och service",
    en: "Operations and service",
    match: (p) => p.tags.some((t) => ["Operations", "Service", "Monitoring"].includes(t)),
  },
];

function kindLabel(project: Project, locale: Locale): string | null {
  if (project.tags.includes("Rollout")) return locale === "sv" ? "Utrullning" : "Rollout";
  const role = project.role ?? [];
  if (role.some((r) => ["serviced", "operated", "monitored"].includes(r))) {
    return locale === "sv" ? "Drift" : "Operation";
  }
  if (role.some((r) => ["delivered", "installed", "engineered", "designed"].includes(r))) {
    return locale === "sv" ? "Installation" : "Installation";
  }
  return null;
}

export function ProjectArchive({ locale = "en" }: { locale?: Locale }) {
  const [filter, setFilter] = useState<FilterKey>("all");

  const verified = useMemo(() => projects.filter((p) => p.verified === true), []);
  const visible = useMemo(() => {
    const active = FILTERS.find((f) => f.key === filter);
    if (!active?.match) return verified;
    return verified.filter(active.match);
  }, [filter, verified]);

  return (
    <section className="section section-space">
      <div className="section-inner">
        <div className="flex flex-col gap-6 border-b border-border-subtle pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="heading-section max-w-[18ch]">
              {locale === "sv" ? "Alla projekt" : "All projects"}
            </h2>
            <p aria-live="polite" className="mt-3 font-mono text-xs uppercase tracking-[0.12em] text-text-muted">
              {locale === "sv"
                ? `${visible.length} av ${verified.length} projekt`
                : `${visible.length} of ${verified.length} projects`}
            </p>
          </div>

          <div role="group" aria-label={locale === "sv" ? "Filtrera projekt" : "Filter projects"} className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <Chip key={f.key} selected={filter === f.key} onClick={() => setFilter(f.key)}>
                {f[locale]}
              </Chip>
            ))}
          </div>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((project) => {
            const copy = swedishProjectCopy[project.slug];
            const title = locale === "sv" ? copy?.title ?? project.title : project.title;
            const description = locale === "sv" ? copy?.longDescription ?? project.longDescription : project.longDescription;
            const kind = kindLabel(project, locale);
            const size = locale === "sv" ? copy?.specsSize ?? project.specs.size : project.specs.size;
            const location = locale === "sv" ? copy?.location ?? project.location : project.location;

            return (
              <li key={project.slug} className="group relative">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[24px_8px_24px_24px] border border-border-subtle">
                  <ProjectVisual
                    project={project}
                    label={title}
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070807]/70 via-transparent to-transparent" />
                  {kind && (
                    <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-[#070807]/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[#f2f0e9] backdrop-blur-md">
                      {kind}
                    </span>
                  )}
                </div>

                <h3 className="mt-6 text-2xl font-medium leading-[1.15] tracking-[-0.025em] text-text-primary">
                  {/* The link text is the project name — never a repeated
                      "Discover" — so screen readers and search engines get a
                      unique destination per link. */}
                  <Link
                    href={localizedHref(locale, `/projects/${project.slug}/`)}
                    prefetch={false}
                    className="tap gap-2 transition-colors hover:text-accent-soft"
                  >
                    {title}
                    <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </h3>

                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-text-secondary">{description}</p>

                <dl className="mt-5 grid grid-cols-1 gap-1 border-t border-border-subtle pt-4 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="sr-only">{locale === "sv" ? "Plats" : "Location"}</dt>
                    <dd className="text-text-secondary">{location}</dd>
                  </div>
                  {size && (
                    <div>
                      <dt className="sr-only">{locale === "sv" ? "Storlek" : "Size"}</dt>
                      <dd className="text-text-secondary">{size}</dd>
                    </div>
                  )}
                  {project.year && (
                    <div>
                      <dt className="sr-only">{locale === "sv" ? "År" : "Year"}</dt>
                      <dd className="text-text-muted">{project.year}</dd>
                    </div>
                  )}
                </dl>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
