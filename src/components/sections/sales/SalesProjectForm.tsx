"use client";

import { Reveal } from "@/components/effects/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { SalesSectionProps } from "./types";

export function SalesProjectForm({ locale, content }: SalesSectionProps) {
  const { projectForm } = content;

  return (
    <section className="section section-space bg-bg-elevated">
      <div className="section-inner">
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow text-accent">{projectForm.eyebrow}</p>
            <h2 className="heading-section mt-7 text-text-primary">{projectForm.title}</h2>
            <p className="mt-6 text-lg leading-relaxed text-text-secondary">{projectForm.body}</p>
          </Reveal>
          <Reveal delay={0.12} className="lg:col-span-7 lg:col-start-6">
            <div className="light-gate border border-border-subtle bg-bg-surface/95 p-7 backdrop-blur-sm sm:p-10 lg:p-12">
              <ContactForm locale={locale} compact defaultCategory="buy" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
