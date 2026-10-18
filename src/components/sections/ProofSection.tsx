"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { ProjectVisual } from "@/components/sections/ProjectVisual";
import { projects, type Project } from "@/lib/projects";
import { swedishProjectCopy } from "@/lib/projects-sv";
import { Locale, localizedHref } from "@/lib/i18n";

/* ------------------------------------------------------------------ */
/* NOTE: All figures and project names in this section are sourced     */
/* from published files in the repository — no invented data.          */
/*                                                                     */
/* Stats:    src/components/sections/about/AboutPageContent.tsx        */
/* Projects: src/lib/projects.ts (filtered verified=true)              */
/* Localised copy: src/lib/projects-sv.ts                              */
/* ------------------------------------------------------------------ */

/* Filtered dataset: only projects with verified=true.                */
/* See src/lib/projects.ts line 48 for the field definition.           */
const verified = projects.filter((p) => p.verified === true);

/* ------------------------------------------------------------------ */
/* Stats — key figures.                                                */
/* These are the same four stats that appear in the About page.        */
/* Source: src/components/sections/about/AboutPageContent.tsx           */
/* ------------------------------------------------------------------ */

interface Stat {
  value: string;
  label: string;
}

/* Localised spec-pill values — only rendered when the project has data */
/* in the matching field. (Source: src/lib/projects.ts Project.specs) */

/* ------------------------------------------------------------------ */
/* Helper: apply Swedish copy to a project.                            */
/* Pattern borrowed from ProjectDetailPage.localizeRelatedProject.     */
/* Source: src/lib/projects-sv.ts (swedishProjectCopy)                 */
/* ------------------------------------------------------------------ */
function localizeProject(locale: Locale, project: Project): Project {
  if (locale === "en") return project;
  const sv = swedishProjectCopy[project.slug];
  if (!sv) return project;
  return {
    ...project,
    title: sv.title,
    category: sv.category,
    description: sv.description,
    specs: {
      ...project.specs,
      ...(sv.specsType ? { type: sv.specsType } : {}),
      ...(sv.specsSize ? { size: sv.specsSize } : {}),
      ...(sv.location ? { location: sv.location } : {}),
    },
  };
}

/* ------------------------------------------------------------------ */
/* Selected projects — 3 verified entries with strongest data:          */
/*  1. The Icon      — 525 m², largest commercial DOOH in Nordics       */
/*     (src/lib/projects.ts, verified=true, image exists)              */
/*  2. Boland City   — Full specs (size, pixel pitch, brightness)       */
/*     (src/lib/projects.ts, verified=true, image exists)              */
/*  3. Kappahl       — Multi-market deployment (160 locations,         */
/*     220 touchpoints across 6 markets)                               */
/*     (src/lib/projects.ts, verified=true, image exists)              */
/* ------------------------------------------------------------------ */

const SELECTED_SLUGS = ["the-icon", "boland-city", "kappahl"] as const;

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function ProofSection({ locale = "en" }: { locale?: Locale }) {
  return (
    <section
      className="section section-space bg-background"
      aria-labelledby="proof-title"
    >
      <div className="section-inner">
        {/* ------- Eyebrow + Heading ------- */}
        <div className="max-w-4xl">
          <SectionLabel>
            {locale === "sv" ? "Verifierade projekt" : "Verified projects"}
          </SectionLabel>
          <h2
            id="proof-title"
            className="heading-section mt-8 max-w-[15ch]"
          >
            {locale === "sv"
              ? "Påståenden bygger på levererade projekt."
              : "Claims backed by delivered projects."}
          </h2>
        </div>

        {/* ------- Stats ------- */}
        <StatsRow locale={locale} />

        {/* ------- Featured projects ------- */}
        <div className="mt-16 grid gap-7 lg:mt-24 lg:grid-cols-3">
          {SELECTED_SLUGS.map((slug, index) => {
            const base = projects.find((p) => p.slug === slug)!;
            const project = localizeProject(locale, base);
            return <ProjectCard key={slug} project={project} index={index} locale={locale} />;
          })}
        </div>

        {/* ------- Environment row ------- */}
        <EnvironmentRow locale={locale} />

        {/* ------- CTA ------- */}
        <FinalCta locale={locale} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 1. Stats Row  (data from AboutPageContent, src/.../AboutPageContent.tsx) */
/* ------------------------------------------------------------------ */

function StatsRow({ locale }: { locale: Locale }) {
  const stats: Stat[] =
    locale === "sv"
      ? [
          { value: "15+", label: "Års erfarenhet" },
          { value: "500+", label: "Projekt levererade" },
          { value: "98%", label: "Kundnöjdhet" },
          { value: "24/7", label: "Support tillgänglig" },
        ]
      : [
          { value: "15+", label: "Years of experience" },
          { value: "500+", label: "Projects delivered" },
          { value: "98%", label: "Client satisfaction" },
          { value: "24/7", label: "Support available" },
        ];

  return (
    <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, delay: i * 0.08 }}
        >
          <div className="text-center">
            <div className="font-mono text-4xl font-medium text-text-primary sm:text-5xl">
              {stat.value}
            </div>
            <p className="mt-2 text-sm uppercase tracking-wider text-text-secondary">
              {stat.label}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Project Card  (image + spec pills + detail link)                 */
/* ------------------------------------------------------------------ */

function ProjectCard({
  project,
  index,
  locale,
}: {
  project: Project;
  index: number;
  locale: Locale;
}) {
  /* Only render spec pills that exist on this project. */
  const specs: string[] = [];

  if (project.specs.size) specs.push(project.specs.size);
  if (project.specs.type) specs.push(project.specs.type);
  if (project.specs.pixelPitch) specs.push(project.specs.pixelPitch);
  if (project.specs.brightness) specs.push(project.specs.brightness);

  return (
    <motion.article
      className="group premium-card relative flex flex-col overflow-hidden border border-border-subtle bg-bg-elevated transition-all duration-[700ms] ease-[cubic-bezier(.22,.61,.36,1)] hover:-translate-y-1.5 hover:border-accent/25 hover:shadow-[0_28px_80px_rgba(0,0,0,.18)]"
      initial={{ y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      {/* ProjectVisual rather than a raw <img>: it routes through next/image so
          the card gets the responsive srcset and AVIF/WebP pipeline, renders
          the loading skeleton, and owns the imageCredit badge. A raw <img>
          bypassed all of that and shipped the full-size JPEG. */}
      <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-border-subtle">
        <ProjectVisual
          project={project}
          label={project.title}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6 lg:p-7">
        {/* Eyebrow — category / location */}
        <span className="eyebrow text-accent">
          {project.category}
        </span>

        {/* Title */}
        <h3 className="mt-3 text-2xl font-medium leading-[1.15] tracking-[-0.025em] text-text-primary sm:text-3xl">
          {project.title}
        </h3>

        {/* Description — limit to 3 lines */}
        <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">
          {project.description}
        </p>

        {/* Spec pills — only render non-empty specs */}
        {specs.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {specs.map((spec) => (
              <div
                key={spec}
                className="rounded-full border border-border-subtle bg-bg-surface px-3 py-1.5"
              >
                <span className="text-xs font-medium text-text-secondary">
                  {spec}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Link to detail page */}
        <span className="mt-auto pt-6 font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted transition-colors duration-500 group-hover:text-accent">
          {locale === "sv" ? "Visa projekt" : "View project"}
        </span>
      </div>

      {/* Link wraps the entire card */}
      <Link
        href={localizedHref(locale, `/projects/${project.slug}/`)}
        className="absolute inset-0"
        prefetch={false}
      />
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Environment Row  (all verified project names & locations)        */
/* Source: src/lib/projects.ts (verified=true projects)                */
/* ------------------------------------------------------------------ */

function EnvironmentRow({ locale }: { locale: Locale }) {
  /* All verified project names + locations — data-driven. */
  const items: { name: string; location: string }[] = verified.map((p) => ({
    name: p.title,
    location: p.location,
  }));

  return (
    <div className="mt-16 border-t border-border-subtle pt-10">
      <h4 className="eyebrow text-accent">
        {locale === "sv"
          ? "Miljöer vi har byggt för"
          : "Environments we have built for"}
      </h4>
      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
        {items.map((item) => (
          <span
            key={item.name}
            className="text-sm leading-relaxed text-text-secondary"
          >
            {item.name}{" "}
            <span className="text-text-muted">
              · {item.location}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Final CTA  (link to full archive)                                */
/* ------------------------------------------------------------------ */

function FinalCta({ locale }: { locale: Locale }) {
  return (
    <div className="mt-12 border border-border-subtle bg-bg-elevated px-7 py-10 text-center lg:px-10 lg:py-14">
      <motion.h3
        className="text-2xl font-medium tracking-[-0.025em] text-text-primary sm:text-3xl"
        initial={{ y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
      >
        {locale === "sv"
          ? "Utforska alla projekt"
          : "Explore all projects"}
      </motion.h3>
      <p className="mx-auto mt-3 max-w-xl text-text-secondary">
        {locale === "sv"
          ? "Se hela portföljen av verifierade LED-projekt."
          : "View the full portfolio of verified LED projects."}
      </p>
      <div className="mt-6 flex justify-center">
        <Button
          href={localizedHref(locale, "/projects/")}
          variant="secondary"
          icon={<ArrowUpRight size={18} />}
        >
          {locale === "sv" ? "Gå till arkivet" : "View archive"}
        </Button>
      </div>
    </div>
  );
}

