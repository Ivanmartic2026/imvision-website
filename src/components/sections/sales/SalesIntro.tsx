"use client";

import { Reveal } from "@/components/effects/Reveal";
import { SalesSectionProps } from "./types";

export function SalesIntro({ content }: SalesSectionProps) {
  const { intro } = content;

  return (
    <section className="theme-light section section-space bg-background">
      <div className="section-inner">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow text-accent-dim">{intro.eyebrow}</p>
            <h2 className="heading-section mt-7 text-text-primary">{intro.title}</h2>
          </Reveal>
          <Reveal delay={0.12} className="lg:col-span-5 lg:col-start-8 lg:pt-10">
            <p className="text-lg leading-relaxed text-text-secondary sm:text-xl">{intro.body}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
