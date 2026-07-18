import { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import { projects } from "@/lib/projects";
import { ProjectVisual } from "@/components/sections/ProjectVisual";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta, pageBreadcrumbLd } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  locale: "en",
  path: "/projects/",
  title: "Projects",
  description:
    "Explore selected IM Vision LED installations — retail displays, architectural facades, event screens and digital-out-of-home delivered across Europe.",
});

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHeader
          label="Installations"
          title="Built to stay visible."
          description="Selected installations, products, and operational partnerships."
        />

        <section className="section section-space">
          <div className="section-inner">
            <div className="border-y border-border-subtle">
              {projects.map((project, index) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}/`}
                  className="group grid min-h-[520px] border-b border-border-subtle bg-bg-elevated last:border-b-0 lg:grid-cols-2"
                >
                  <div className={`media-frame relative aspect-[16/10] overflow-hidden lg:aspect-auto ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <ProjectVisual project={project} label={project.title} />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-bg-elevated/90 hidden lg:block" />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-elevated via-transparent to-transparent lg:hidden" />
                  </div>

                  <div className={`flex flex-col justify-center p-8 sm:p-12 lg:p-16 xl:p-20 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                      {project.category}
                    </span>
                    <h2 className="mt-7 max-w-[13ch] text-[clamp(2.5rem,4.4vw,4.8rem)] font-[470] leading-[1.02] tracking-[-0.045em] text-text-primary">
                      {project.title}
                    </h2>
                    <p className="mt-7 max-w-[600px] text-base leading-[1.75] text-text-secondary sm:text-lg">
                      {project.longDescription}
                    </p>
                    <span className="mt-10 inline-flex w-fit items-center gap-2 border-b-2 border-accent pb-1 text-sm font-medium uppercase tracking-[0.08em] text-text-primary">
                      Discover <ArrowUpRight size={15} className="transition-transform duration-[700ms] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <JsonLd data={pageBreadcrumbLd("en", "/projects/", "Projects")} />
    </>
  );
}
