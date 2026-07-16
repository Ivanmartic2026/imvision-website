"use client";

import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/effects/Reveal";
import { Button } from "@/components/ui/Button";
import { localizedHref } from "@/lib/i18n";
import { SalesSectionProps } from "./types";

export function SalesFinalCta({ locale, content }: SalesSectionProps) {
  const { finalCta } = content;

  return (
    <section className="section section-space bg-background">
      <div className="section-inner">
        <div className="light-gate relative overflow-hidden border border-border-subtle bg-bg-elevated/90 p-8 backdrop-blur-sm sm:p-12 lg:p-20">
          <div className="photon-seam absolute left-0 right-0 top-0 h-px" />
          <div
            aria-hidden
            className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-accent/10 blur-[100px]"
          />
          <div
            aria-hidden
            className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-accent-warm/8 blur-[100px]"
          />

          <Reveal>
            <p className="eyebrow text-accent">{finalCta.eyebrow}</p>
            <h2 className="heading-section mt-7 text-text-primary">{finalCta.title}</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="relative mt-7 max-w-2xl text-lg leading-relaxed text-text-secondary sm:text-xl">
              {finalCta.body}
            </p>
          </Reveal>
          <Reveal delay={0.2} className="relative mt-9">
            <span className="relative inline-flex">
              <span className="absolute inset-0 rounded-[16px_6px_16px_16px] bg-accent/25 blur-2xl transition-opacity duration-700" />
              <Button href={localizedHref(locale, "/contact/")} size="large" icon={<ArrowRight size={18} />}>
                {finalCta.primaryCta}
              </Button>
            </span>
          </Reveal>
          <Reveal delay={0.28}>
            <div className="relative mt-8 flex flex-col gap-2 text-sm text-text-secondary sm:flex-row sm:gap-8">
              <a
                href={`tel:${finalCta.phone.replace(/\s/g, "")}`}
                className="transition-colors duration-300 hover:text-text-primary"
              >
                {finalCta.phone}
              </a>
              <a
                href={`mailto:${finalCta.email}`}
                className="transition-colors duration-300 hover:text-text-primary"
              >
                {finalCta.email}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
