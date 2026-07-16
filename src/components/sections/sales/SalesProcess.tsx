"use client";

import { Reveal } from "@/components/effects/Reveal";
import { StaggerReveal, StaggerItem } from "@/components/effects/StaggerReveal";
import { SalesSectionProps } from "./types";

export function SalesProcess({ content }: SalesSectionProps) {
  const { process } = content;

  return (
    <section id="process" className="section section-space overflow-hidden bg-bg-elevated">
      <div className="section-inner grid gap-14 lg:grid-cols-12 lg:items-start">
        <div className="lg:sticky lg:top-28 lg:col-span-5">
          <Reveal>
            <p className="eyebrow text-accent">{process.eyebrow}</p>
            <h2 className="heading-section mt-7 text-text-primary">{process.title}</h2>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-text-secondary">{process.intro}</p>
          </Reveal>
        </div>
        <StaggerReveal className="border-t border-border-subtle lg:col-span-6 lg:col-start-7" stagger={0.12}>
          {process.steps.map((step) => (
            <StaggerItem key={step.number}>
              <article className="grid gap-4 border-b border-border-subtle py-7 sm:grid-cols-[4rem_1fr_1.5fr] sm:gap-7">
                <span className="font-mono text-xs text-accent">{step.number}</span>
                <h3 className="text-xl font-medium tracking-[-0.025em] text-text-primary">{step.title}</h3>
                <p className="leading-relaxed text-text-secondary">{step.description}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
