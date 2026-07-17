import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProjectVisual } from "@/components/sections/ProjectVisual";
import { projects } from "@/lib/projects";
import { swedishProjectCopy } from "@/lib/projects-sv";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  locale: "sv",
  path: "/projects/",
  title: "Projekt",
  description: "Utvalda LED-installationer, produkter och driftuppdrag från IM Vision i hela Europa.",
});

export default function SwedishProjectsPage() {
  return (
    <>
      <Header locale="sv" />
      <main id="main-content">
        <PageHeader
          label="Installationer"
          title="Byggda för att fortsätta synas."
          description="Utvalda installationer, produkter och driftuppdrag."
        />

        <section className="section section-space">
          <div className="section-inner border-y border-border-subtle">
            {projects.map((project, index) => {
              const copy = swedishProjectCopy[project.slug];

              return (
                <Link
                  key={project.slug}
                  href={`/sv/projects/${project.slug}/`}
                  className="group grid min-h-[520px] border-b border-border-subtle bg-bg-elevated last:border-b-0 lg:grid-cols-2"
                >
                  <div className={`media-frame relative aspect-[16/10] overflow-hidden lg:aspect-auto ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <ProjectVisual project={project} label={copy.title} />
                    <div className="absolute inset-0 hidden bg-gradient-to-r from-transparent to-bg-elevated/90 lg:block" />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-elevated via-transparent to-transparent lg:hidden" />
                  </div>

                  <div className={`flex flex-col justify-center p-8 sm:p-12 lg:p-16 xl:p-20 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                      {copy.category}
                    </span>
                    <h2 className="mt-7 max-w-[13ch] text-[clamp(2.5rem,4.4vw,4.8rem)] font-[470] leading-[1.02] tracking-[-0.045em] text-text-primary">
                      {copy.title}
                    </h2>
                    <p className="mt-7 max-w-[600px] text-base leading-[1.75] text-text-secondary sm:text-lg">
                      {copy.longDescription}
                    </p>
                    <span className="mt-10 inline-flex w-fit items-center gap-2 border-b-2 border-accent pb-1 text-sm font-medium uppercase tracking-[0.08em] text-text-primary">
                      Upptäck
                      <ArrowUpRight size={15} className="transition-transform duration-[700ms] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
      <Footer locale="sv" />
    </>
  );
}
