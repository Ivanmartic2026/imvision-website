"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/effects/Reveal";
import { StaggerReveal, StaggerItem } from "@/components/effects/StaggerReveal";
import { Button } from "@/components/ui/Button";
import { localizedHref } from "@/lib/i18n";
import { getFeaturedProjects } from "@/lib/content/sales";
import { SalesSectionProps } from "./types";

export function SalesFeaturedProjects({ locale, content }: SalesSectionProps) {
  const { featuredProjects } = content;
  const projects = getFeaturedProjects(locale, featuredProjects.projects);

  return (
    <section id="utvalda-installationer" className="section section-space bg-background">
      <div className="section-inner">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow text-accent">{featuredProjects.eyebrow}</p>
            <h2 className="heading-section mt-7 text-text-primary">{featuredProjects.title}</h2>
          </Reveal>
          <Reveal delay={0.12} className="lg:col-span-5 lg:col-start-8 lg:pt-10">
            <p className="text-lg leading-relaxed text-text-secondary">{featuredProjects.body}</p>
          </Reveal>
        </div>

        <StaggerReveal className="mt-16 grid gap-6 md:grid-cols-2 lg:mt-24 lg:grid-cols-3" stagger={0.12}>
          {projects.map((project) => (
            <StaggerItem key={project.slug}>
              <a
                href={localizedHref(locale, `/projects/${project.slug}/`)}
                className="group light-gate block overflow-hidden border border-border-subtle bg-bg-elevated/80 backdrop-blur-sm transition-all duration-[700ms] ease-[cubic-bezier(.22,.61,.36,1)] hover:-translate-y-1.5 hover:border-accent/30 hover:bg-bg-elevated hover:shadow-[0_28px_80px_rgba(0,0,0,.22),0_0_40px_rgba(145,169,161,.08)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.visualLabel || project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[700ms] ease-[cubic-bezier(.22,.61,.36,1)] group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-black/[0.04]" />
                </div>
                <div className="p-6">
                  <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-accent-dim transition-colors duration-500 group-hover:text-accent">
                    {project.category}
                  </span>
                  <h3 className="mt-2 text-xl font-medium tracking-[-0.025em] text-text-primary">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">{project.description}</p>
                </div>
              </a>
            </StaggerItem>
          ))}
        </StaggerReveal>

        <Reveal delay={0.2} className="mt-12 flex justify-center lg:mt-16">
          <Button href={localizedHref(locale, "/projects/")} variant="secondary" icon={<ArrowRight size={18} />}>
            {featuredProjects.cta}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
