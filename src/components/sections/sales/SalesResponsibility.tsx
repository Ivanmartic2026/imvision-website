"use client";

import { Reveal } from "@/components/effects/Reveal";
import { StaggerReveal, StaggerItem } from "@/components/effects/StaggerReveal";
import { SalesSectionProps } from "./types";

export function SalesResponsibility({ content }: SalesSectionProps) {
  const { responsibility } = content;

  return (
    <section className="theme-light section section-space bg-background">
      <div className="section-inner">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-accent-dim">{responsibility.eyebrow}</p>
            <h2 className="heading-section mt-7 text-text-primary">{responsibility.title}</h2>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <StaggerReveal className="border-t border-border-subtle" stagger={0.1}>
              {responsibility.bullets.map((bullet, index) => (
                <StaggerItem key={index}>
                  <div className="flex items-center gap-4 border-b border-border-subtle py-5">
                    <span className="font-mono text-xs text-accent">{String(index + 1).padStart(2, "0")}</span>
                    <span className="text-lg font-medium text-text-primary">{bullet}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerReveal>
            <Reveal delay={0.2}>
              <p className="mt-8 text-lg leading-relaxed text-text-secondary">{responsibility.closing}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
