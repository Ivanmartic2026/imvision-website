import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Ruler,
  Sun,
  Layers,
  Monitor,
  Wrench,
  ArrowUpRight,
} from "lucide-react";
import type { ProjectRole } from "@/lib/projects";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { projects, Project, getProjectBySlug } from "@/lib/projects";
import { swedishProjectCopy } from "@/lib/projects-sv";
import { ProjectVisual } from "@/components/sections/ProjectVisual";
import { ProjectGallery } from "@/components/sections/ProjectGallery";
import { JsonLd } from "@/components/seo/JsonLd";
import { Locale, localizedHref } from "@/lib/i18n";
import { projectLd } from "@/lib/seo";

export interface ProjectCopy {
  title: string;
  category: string;
  description: string;
  longDescription: string;
  /** Localised wording for the fact block; each falls back to the English string. */
  specsType?: string;
  location?: string;
  specsSize?: string;
  caseStudy?: Project["caseStudy"];
}

interface ProjectDetailPageProps {
  locale: Locale;
  project: Project;
  copy: ProjectCopy;
}

const labels = {
  en: {
    badgeDraft: "Editorial draft · verification required",
    imagePlaceholder: "Editorial placeholder image",
    challengeEyebrow: "The challenge",
    challengeHeading: "One space. Many visual modes.",
    responseEyebrow: "IM / Response",
    deliveryEyebrow: "IM / Delivery logic",
    outcomeEyebrow: "Intended outcome",
    galleryHeading: "Photo gallery",
    aboutHeading: "About the project",
    projectFacts: "Project facts",
    defaultSourceLabel: "Ocean Outdoor",
    resultsHeading: "Results",
    detailsTitleVerified: "Project details",
    detailsTitleDraft: "Draft specification",
    relatedHeading: "Related projects",
    relatedServicesHeading: "Related services",
    backLink: "Back to all projects",
    discussButton: "Discuss a similar project",
    homeCrumb: "Home",
    projectsCrumb: "Projects",
    projectDescriptionEyebrow: "Project",
    projectDescriptionHeadingVerified: "The details behind the delivery.",
    projectDescriptionHeadingDraft: "A project draft for further development.",
  },
  sv: {
    badgeDraft: "Redaktionellt utkast · verifiering krävs",
    imagePlaceholder: "Redaktionell platshållarbild",
    challengeEyebrow: "Utmaningen",
    challengeHeading: "Ett rum. Många visuella lägen.",
    responseEyebrow: "IM / Svar",
    deliveryEyebrow: "IM / Leveranslogik",
    outcomeEyebrow: "Förväntat resultat",
    galleryHeading: "Bildspel",
    aboutHeading: "Om projektet",
    projectFacts: "Projektfakta",
    defaultSourceLabel: "Ocean Outdoor",
    resultsHeading: "Resultat",
    detailsTitleVerified: "Projektdetaljer",
    detailsTitleDraft: "Utkast till specifikation",
    relatedHeading: "Relaterade projekt",
    relatedServicesHeading: "Relaterade tjänster",
    backLink: "Tillbaka till alla projekt",
    discussButton: "Diskutera ett liknande projekt",
    homeCrumb: "Hem",
    projectsCrumb: "Projekt",
    projectDescriptionEyebrow: "Projektet",
    projectDescriptionHeadingVerified: "Detaljerna bakom leveransen.",
    projectDescriptionHeadingDraft: "Ett projektutkast för vidare utveckling.",
  },
};

function localizeRelatedProject(locale: Locale, project: Project) {
  if (locale === "en") return project;
  const relatedCopy = swedishProjectCopy[project.slug];
  if (!relatedCopy) return project;
  return { ...project, title: relatedCopy.title, category: relatedCopy.category };
}

export function ProjectDetailPage({ locale, project, copy }: ProjectDetailPageProps) {
  const t = labels[locale];
  const caseStudy = copy.caseStudy ?? project.caseStudy;

  // The component owns the wording so the same structured fact reads naturally in
  // both languages, rather than being translated twice in the data.
  const roleLabels: Record<"en" | "sv", Record<ProjectRole, string>> = {
    en: {
      designed: "Designed",
      engineered: "Engineered",
      delivered: "Delivered",
      installed: "Installed",
      serviced: "Serviced",
      operated: "Operated",
      monitored: "Monitored",
    },
    sv: {
      designed: "Formgivet",
      engineered: "Konstruerat",
      delivered: "Levererat",
      installed: "Installerat",
      serviced: "Servat",
      operated: "Driftat",
      monitored: "Övervakat",
    },
  };
  const roleText = project.role?.length
    ? project.role.map((r) => roleLabels[locale][r]).join(" · ")
    : null;

  // Related services are derived from the verified role, not from the fact that a
  // project exists. Where no role is documented — the six Ocean Outdoor sites — the
  // block is absent rather than implying IM Vision delivered a service it may not have.
  const serviceLinks = (() => {
    if (!project.role?.length) return [];
    const wants = new Set<"sales" | "service">();
    for (const r of project.role) {
      if (r === "designed" || r === "engineered" || r === "delivered" || r === "installed")
        wants.add("sales");
      if (r === "serviced" || r === "operated" || r === "monitored") wants.add("service");
    }
    const labelsByLocale = {
      en: { sales: "Permanent installations", service: "Service & operations" },
      sv: { sales: "Permanenta installationer", service: "Service och drift" },
    } as const;
    return [...wants].map((k) => ({
      href: localizedHref(locale, k === "sales" ? "/sales/" : "/service/"),
      label: labelsByLocale[locale][k],
    }));
  })();

  // The body should only say what the hero hasn't. Two patterns occur in the data:
  // longDescription identical to description (four English entries), and
  // longDescription opening with the description verbatim and then continuing
  // (the Swedish Nordstan entry). Strip the repeated opening and render what's left.
  const bodyText = (() => {
    const body = copy.longDescription.trim();
    const lead = copy.description.trim();
    if (!body || body === lead) return null;
    const rest = body.startsWith(lead) ? body.slice(lead.length).trim() : body;
    return rest || null;
  })();

  // Was `.slice(0, 2)`, so every project page showed the first two entries in the
  // array — The Icon and The Halo — regardless of what the page was about. Score by
  // what the projects actually have in common instead.
  const venue = project.category.split("—")[0].trim().toLowerCase();
  const city = project.location.split(",")[0].trim().toLowerCase();
  const relatedProjects = projects
    .filter((p) => p.slug !== project.slug && p.verified === true)
    .map((p) => {
      const sharedTags = p.tags.filter((t) => project.tags.includes(t)).length;
      const sameVenue = p.category.split("—")[0].trim().toLowerCase() === venue ? 3 : 0;
      const sameCity = p.location.split(",")[0].trim().toLowerCase() === city ? 2 : 0;
      const sameType = p.specs.type && project.specs.type
        && p.specs.type.split("·")[0].trim() === project.specs.type.split("·")[0].trim() ? 2 : 0;
      return { p, score: sharedTags + sameVenue + sameCity + sameType };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map(({ p }) => localizeRelatedProject(locale, p));

  return (
    <>
      <JsonLd
        data={projectLd(locale, {
          slug: project.slug,
          title: copy.title,
          description: copy.description,
          image: project.image,
          category: copy.category,
          // Localised so the structured data states the same thing the page shows —
          // the fact block is Swedish on /sv/, and the schema now follows it.
          location: copy.location || project.location,
          imageCredit: project.imageCredit,
          sourceUrl: project.sourceUrl,
          specs: {
            ...project.specs,
            ...(copy.specsType ? { type: copy.specsType } : {}),
            ...(copy.specsSize ? { size: copy.specsSize } : {}),
          },
          ...(roleText ? { role: roleText } : {}),
          tags: project.tags,
        })}
      />
      <Header locale={locale} />
      <main id="main-content">
        <PageHeader
          label={copy.category}
          title={copy.title}
          description={copy.description}
        >
          {!project.verified && (
            <span className="inline-flex rounded-[10px_3px_10px_10px] border border-accent/30 bg-accent/10 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-accent">
              {t.badgeDraft}
            </span>
          )}
        </PageHeader>

        <section className="section py-12 lg:py-20">
          <div className="section-inner">
            <figure
              className="media-frame light-gate relative aspect-[21/9] w-full overflow-hidden border border-border-subtle"
              style={{ position: "relative" }}
            >
              <ProjectVisual project={project} label={copy.title} priority sizes="100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
              {!project.verified && (
                <figcaption className="absolute bottom-4 left-4 rounded-[10px_3px_10px_10px] bg-[#070807]/75 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#f2f0e9] backdrop-blur-md">
                  {t.imagePlaceholder}
                </figcaption>
              )}
            </figure>

            {project.gallery && project.gallery.length > 0 && (
              <div className="mt-16">
                <ProjectGallery images={project.gallery} label={t.galleryHeading} />
              </div>
            )}

            {caseStudy && (
              <div className="mt-20">
                <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                  <div className="lg:col-span-5">
                    <p className="eyebrow text-accent">{t.challengeEyebrow}</p>
                    <h2 className="mt-7 text-[clamp(2.5rem,4.8vw,4.8rem)] font-medium leading-[0.98] tracking-[-0.045em] text-text-primary">
                      {t.challengeHeading}
                    </h2>
                  </div>
                  <div className="lg:col-span-5 lg:col-start-8 lg:pt-12">
                    <p className="text-xl leading-relaxed text-text-secondary">
                      {caseStudy.challenge}
                    </p>
                  </div>
                </div>

                <div className="mt-20 grid gap-px overflow-hidden rounded-[24px_6px_24px_24px] border border-border-subtle bg-border-subtle lg:grid-cols-2">
                  <article className="bg-bg-elevated p-8 sm:p-10 lg:p-14">
                    <span className="font-mono text-xs text-accent">{t.responseEyebrow}</span>
                    <p className="mt-10 text-2xl leading-relaxed tracking-[-0.025em] text-text-primary">
                      {caseStudy.response}
                    </p>
                  </article>
                  <article className="bg-bg-elevated p-8 sm:p-10 lg:p-14">
                    <span className="font-mono text-xs text-accent">{t.deliveryEyebrow}</span>
                    <ol className="mt-8 divide-y divide-border-subtle border-y border-border-subtle">
                      {caseStudy.delivery.map((item, index) => (
                        <li
                          key={item}
                          className="grid grid-cols-[2.5rem_1fr] gap-4 py-4 text-text-secondary"
                        >
                          <span className="font-mono text-xs text-accent">0{index + 1}</span>
                          {item}
                        </li>
                      ))}
                    </ol>
                  </article>
                </div>

                <div className="mt-6 border-l border-accent py-5 pl-6 sm:pl-8">
                  <p className="eyebrow text-accent">{t.outcomeEyebrow}</p>
                  <p className="mt-5 max-w-5xl text-[clamp(1.8rem,3.6vw,3.5rem)] font-medium leading-[1.08] tracking-[-0.04em] text-text-primary">
                    {caseStudy.outcome}
                  </p>
                </div>
              </div>
            )}

            <div className="mt-12 grid gap-12 lg:grid-cols-3">
              <div className="lg:col-span-2">
                {/* On three English projects (nordstan-facade, taby-centrum,
                    ocean-outdoor-operations) longDescription is byte-identical to
                    the hero description, so the body is suppressed rather than printing the
                    same sentence twice. The heading has to be suppressed with it — otherwise
                    those pages render "About the project" with nothing beneath it. The whole
                    block is data-driven and returns the moment real copy is written. */}
                {!caseStudy && (bodyText || project.sourceUrl) && (
                  <>
                    <h2 className="text-3xl font-medium tracking-[-0.035em] text-text-primary sm:text-4xl">
                      {t.aboutHeading}
                    </h2>
                    {bodyText && (
                      <p className="mt-4 text-lg leading-relaxed text-text-secondary">
                        {bodyText}
                      </p>
                    )}
                    {project.sourceUrl && (
                      <a
                        href={project.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-7 inline-flex border-b border-accent pb-1 font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted transition-colors duration-[700ms] hover:text-text-primary"
                      >
                        {t.projectFacts}: {project.sourceLabel ?? t.defaultSourceLabel}
                      </a>
                    )}
                  </>
                )}

                {project.verified && project.results && (
                  <div className="mt-8 rounded-[24px] border border-accent/20 bg-accent/5 p-6">
                    <p className="text-lg font-medium text-text-primary">{t.resultsHeading}</p>
                    <p className="mt-2 text-text-secondary">{project.results}</p>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="light-gate border border-border-subtle bg-bg-elevated p-7">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
                    {project.verified ? t.detailsTitleVerified : t.detailsTitleDraft}
                  </h3>
                  <ul className="mt-4 space-y-4">
                    <li className="flex items-center gap-3 text-text-secondary">
                      <MapPin size={18} className="text-accent" />
                      {copy.location || project.location}
                    </li>
                    {project.year && (
                      <li className="flex items-center gap-3 text-text-secondary">
                        <Calendar size={18} className="text-accent" />
                        {project.year}
                      </li>
                    )}
                    {/* specs.type is set on every project and was already being emitted as
                        an additionalProperty in the JSON-LD, but never shown on the page —
                        structured data describing something the user cannot see. It is the
                        one field that states what kind of installation this actually is
                        ("Curved outdoor LED", "Monitoring & operations", "Double-sided DOOH"),
                        so it earns a place above the dimensions. */}
                    {(copy.specsType || project.specs.type) && (
                      <li className="flex items-center gap-3 text-text-secondary">
                        <Monitor size={18} className="text-accent" />
                        {copy.specsType || project.specs.type}
                      </li>
                    )}
                    {/* What IM Vision actually did. Rendered only where the project's
                        own copy states it — six of the thirteen say nothing about who
                        engineered or installed them, and the row is simply absent there
                        rather than filled with a guess. */}
                    {roleText && (
                      <li className="flex items-center gap-3 text-text-secondary">
                        <Wrench size={18} className="text-accent" />
                        {roleText}
                      </li>
                    )}
                    {project.specs.size && (
                      <li className="flex items-center gap-3 text-text-secondary">
                        <Ruler size={18} className="text-accent" />
                        {copy.specsSize || project.specs.size}
                      </li>
                    )}
                    {project.specs.brightness && (
                      <li className="flex items-center gap-3 text-text-secondary">
                        <Sun size={18} className="text-accent" />
                        {project.specs.brightness}
                      </li>
                    )}
                    {project.specs.pixelPitch && (
                      <li className="flex items-center gap-3 text-text-secondary">
                        <Layers size={18} className="text-accent" />
                        {project.specs.pixelPitch} pixel pitch
                      </li>
                    )}
                  </ul>
                </div>

                {serviceLinks.length > 0 && (
                  <div className="light-gate border border-border-subtle bg-bg-elevated p-7">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
                      {t.relatedServicesHeading}
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {serviceLinks.map((l) => (
                        <li key={l.href}>
                          <Link
                            href={l.href}
                            prefetch={false}
                            className="inline-flex items-center gap-2 text-text-secondary transition-colors hover:text-text-primary"
                          >
                            <ArrowUpRight size={16} className="text-accent" />
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Button href={localizedHref(locale, "/contact/")} className="w-full">
                  {t.discussButton}
                </Button>
              </div>
            </div>

            {relatedProjects.length > 0 && (
              <div className="mt-24">
                <h2 className="text-3xl font-medium tracking-[-0.035em] text-text-primary">
                  {t.relatedHeading}
                </h2>
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  {relatedProjects.map((related) => (
                    <Link
                      key={related.slug}
                      href={localizedHref(locale, `/projects/${related.slug}/`)}
                      className="media-frame group premium-card relative aspect-[16/10] overflow-hidden"
                    >
                      <ProjectVisual
                        project={related}
                        label={related.title}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                      <div className="absolute inset-0 flex flex-col justify-end p-6">
                        <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                          {related.category}
                        </span>
                        <h3 className="mt-2 text-xl font-medium text-text-primary">
                          {related.title}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-16">
              <Link
                href={localizedHref(locale, "/projects/")}
                className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-accent"
              >
                <ArrowLeft size={16} /> {t.backLink}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}

export { getProjectBySlug, swedishProjectCopy };
