import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProjectVisual } from "@/components/sections/ProjectVisual";
import { projects, getProjectBySlug } from "@/lib/projects";
import { swedishProjectCopy } from "@/lib/projects-sv";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export const metadata: Metadata = { title: "Projekt" };

export default async function SwedishProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProjectBySlug((await params).slug);
  if (!project) notFound();
  const copy = swedishProjectCopy[project.slug];

  return (
    <>
      <Header locale="sv" />
      <main id="main-content">
        <PageHeader label={copy.category} title={copy.title} description={copy.description}>
          {!project.verified && (
            <span className="inline-flex rounded-[10px_3px_10px_10px] border border-accent/30 bg-accent/10 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-accent">
              Redaktionellt utkast · verifiering krävs
            </span>
          )}
        </PageHeader>

        <section className="section py-12 lg:py-20">
          <div className="section-inner">
            <figure className="media-frame light-gate relative aspect-[21/9] overflow-hidden border border-border-subtle">
              <ProjectVisual project={project} label={copy.title} priority sizes="100vw" />
              {!project.verified && (
                <figcaption className="absolute bottom-4 left-4 z-10 bg-[#070807]/75 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em]">
                  Redaktionell platshållarbild
                </figcaption>
              )}
            </figure>

            <div className="mt-20 grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <p className="eyebrow text-accent">{project.verified ? "Projektet" : "Projektbeskrivning"}</p>
                <h2 className="mt-8 text-[clamp(2.5rem,4.5vw,4.8rem)] font-[470] leading-[1.02] tracking-[-0.045em]">
                  {project.verified ? "Detaljerna bakom leveransen." : "Ett projektutkast för vidare utveckling."}
                </h2>
              </div>
              <div className="max-w-[620px] lg:col-span-5 lg:col-start-8 lg:pt-12">
                <p className="text-xl leading-[1.75] text-text-secondary">{copy.longDescription}</p>
                {project.sourceUrl && (
                  <a
                    href={project.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 inline-flex border-b border-accent pb-1 font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted transition-colors duration-[700ms] hover:text-text-primary"
                  >
                    Projektfakta: {project.sourceLabel ?? "Ocean Outdoor"}
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer locale="sv" />
    </>
  );
}
