"use client";

import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/effects/Reveal";
import { Button } from "@/components/ui/Button";
import { localizedHref } from "@/lib/i18n";
import { SalesSectionProps } from "./types";

export function SalesService({ locale, content }: SalesSectionProps) {
  const { service } = content;

  return (
    <section className="theme-light section section-space bg-background">
      <div className="section-inner">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="eyebrow text-accent-dim">{service.eyebrow}</p>
            <h2 className="heading-section mt-7 text-text-primary">{service.title}</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-text-secondary sm:text-xl">
              {service.body}
            </p>
          </Reveal>
          <Reveal delay={0.2} className="mt-9">
            <Button href={localizedHref(locale, "/service/")} size="large" icon={<ArrowRight size={18} />}>
              {service.cta}
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
