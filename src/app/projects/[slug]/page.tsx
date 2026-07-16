import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Ruler,
  Sun,
  Layers,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { projects, getProjectBySlug } from "@/lib/projects";
import { ProjectVisual } from "@/components/sections/ProjectVisual";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbLd, localeUrl } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.description,
    alternates: {
      canonical: `/projects/${slug}/`,
      languages: {
        en: `/projects/${slug}/`,
        sv: `/sv/projects/${slug}/`,
        "x-default": `/projects/${slug}/`,
      },
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const relatedProjects = projects
    .filter((p) => p.slug !== project.slug)
    .slice(0, 2);

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", url: localeUrl("en", "/") },
          { name: "Projects", url: localeUrl("en", "/projects/") },
          { name: project.title, url: localeUrl("en", `/projects/${project.slug}/`) },
        ])}
      />
      <Header />
      <main id="main-content">
        <PageHeader
          label={project.category}
          title={project.title}
          description={project.description}
        >
          {!project.verified && (
            <span className="inline-flex rounded-[10px_3px_10px_10px] border border-accent/30 bg-accent/10 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-accent">
              Editorial draft · verification required
            </span>
          )}
        </PageHeader>

        <section className="section py-12 lg:py-20">
          <div className="section-inner">
            <figure className="media-frame light-gate relative aspect-[21/9] w-full overflow-hidden border border-border-subtle" style={{ position: "relative" }}>
              <ProjectVisual project={project} label={project.title} priority sizes="100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
              {!project.verified && (
                <figcaption className="absolute bottom-4 left-4 rounded-[10px_3px_10px_10px] bg-[#070807]/75 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#f2f0e9] backdrop-blur-md">
                  Editorial placeholder image
                </figcaption>
              )}
            </figure>

            {project.caseStudy && (
              <div className="mt-20">
                <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                  <div className="lg:col-span-5">
                    <p className="eyebrow text-accent">The challenge</p>
                    <h2 className="mt-7 text-[clamp(2.5rem,4.8vw,4.8rem)] font-medium leading-[0.98] tracking-[-0.045em] text-text-primary">
                      One space. Many visual modes.
                    </h2>
                  </div>
                  <div className="lg:col-span-5 lg:col-start-8 lg:pt-12">
                    <p className="text-xl leading-relaxed text-text-secondary">
                      {project.caseStudy.challenge}
                    </p>
                  </div>
                </div>

                <div className="mt-20 grid gap-px overflow-hidden rounded-[24px_6px_24px_24px] border border-border-subtle bg-border-subtle lg:grid-cols-2">
                  <article className="bg-bg-elevated p-8 sm:p-10 lg:p-14">
                    <span className="font-mono text-xs text-accent">IM / Response</span>
                    <p className="mt-10 text-2xl leading-relaxed tracking-[-0.025em] text-text-primary">
                      {project.caseStudy.response}
                    </p>
                  </article>
                  <article className="bg-bg-elevated p-8 sm:p-10 lg:p-14">
                    <span className="font-mono text-xs text-accent">IM / Delivery logic</span>
                    <ol className="mt-8 divide-y divide-border-subtle border-y border-border-subtle">
                      {project.caseStudy.delivery.map((item, index) => (
                        <li key={item} className="grid grid-cols-[2.5rem_1fr] gap-4 py-4 text-text-secondary">
                          <span className="font-mono text-xs text-accent">0{index + 1}</span>
                          {item}
                        </li>
                      ))}
                    </ol>
                  </article>
                </div>

                <div className="mt-6 border-l border-accent py-5 pl-6 sm:pl-8">
                  <p className="eyebrow text-accent">Intended outcome</p>
                  <p className="mt-5 max-w-5xl text-[clamp(1.8rem,3.6vw,3.5rem)] font-medium leading-[1.08] tracking-[-0.04em] text-text-primary">
                    {project.caseStudy.outcome}
                  </p>
                </div>
              </div>
            )}

            <div className="mt-12 grid gap-12 lg:grid-cols-3">
              <div className="lg:col-span-2">
                {!project.caseStudy && (
                  <>
                    <h2 className="text-3xl font-medium tracking-[-0.035em] text-text-primary sm:text-4xl">About the project</h2>
                    <p className="mt-4 text-lg leading-relaxed text-text-secondary">{project.longDescription}</p>
                    {project.sourceUrl && (
                      <a
                        href={project.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-7 inline-flex border-b border-accent pb-1 font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted transition-colors duration-[700ms] hover:text-text-primary"
                      >
                        Project facts: {project.sourceLabel ?? "Ocean Outdoor"}
                      </a>
                    )}
                  </>
                )}

                {project.verified && project.results && (
                  <div className="mt-8 rounded-[24px] border border-accent/20 bg-accent/5 p-6">
                    <p className="text-lg font-medium text-text-primary">
                      Results
                    </p>
                    <p className="mt-2 text-text-secondary">{project.results}</p>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="light-gate border border-border-subtle bg-bg-elevated p-7">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
                    {project.verified ? "Project details" : "Draft specification"}
                  </h3>
                  <ul className="mt-4 space-y-4">
                    <li className="flex items-center gap-3 text-text-secondary">
                      <MapPin size={18} className="text-accent" />
                      {project.location}
                    </li>
                    {project.year && (
                      <li className="flex items-center gap-3 text-text-secondary">
                        <Calendar size={18} className="text-accent" />
                        {project.year}
                      </li>
                    )}
                    {project.specs.size && (
                      <li className="flex items-center gap-3 text-text-secondary">
                        <Ruler size={18} className="text-accent" />
                        {project.specs.size}
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

                <Button href="/contact/" className="w-full">
                  Discuss a similar project
                </Button>
              </div>
            </div>

            {relatedProjects.length > 0 && (
              <div className="mt-24">
                <h2 className="text-3xl font-medium tracking-[-0.035em] text-text-primary">
                  Related projects
                </h2>
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  {relatedProjects.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/projects/${related.slug}/`}
                      className="media-frame group premium-card relative aspect-[16/10] overflow-hidden"
                    >
                      <ProjectVisual project={related} label={related.title} sizes="(max-width: 768px) 100vw, 50vw" />
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
                href="/projects/"
                className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-accent"
              >
                <ArrowLeft size={16} /> Back to all projects
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
