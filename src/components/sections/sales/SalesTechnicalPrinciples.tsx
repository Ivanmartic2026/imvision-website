"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ScanLine, SunMedium, Building2, Wrench } from "lucide-react";
import { Reveal } from "@/components/effects/Reveal";
import { StaggerReveal, StaggerItem } from "@/components/effects/StaggerReveal";
import { SalesSectionProps } from "./types";

export function SalesTechnicalPrinciples({ content }: SalesSectionProps) {
  const { technicalPrinciples } = content;

  return (
    <section className="section section-space bg-bg-elevated">
      <div className="section-inner">
        <div className="light-gate overflow-hidden border border-border-subtle bg-bg-surface/95 backdrop-blur-sm transition-all duration-700 ease-[cubic-bezier(.22,.61,.36,1)] hover:border-accent/20 hover:shadow-[0_28px_80px_rgba(0,0,0,.22)]">          <div className="grid lg:grid-cols-2">
            <motion.div
              initial={{ clipPath: "inset(0 0 0 100%)" }}
              whileInView={{ clipPath: "inset(0 0 0 0)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.2, ease: [0.22, 0.61, 0.36, 1] }}
              className="relative min-h-[420px] overflow-hidden lg:min-h-[520px] lg:order-2"
            >
              <motion.div
                initial={{ scale: 1.06 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.6, ease: [0.22, 0.61, 0.36, 1] }}
                className="absolute inset-0 will-change-transform"
              >
                <Image
                  src={technicalPrinciples.image}
                  alt={technicalPrinciples.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:order-1 lg:p-14 xl:p-16">
              <Reveal>
                <p className="eyebrow text-accent-dim">{technicalPrinciples.eyebrow}</p>
                <h2 className="heading-section mt-7 text-text-primary">{technicalPrinciples.title}</h2>
              </Reveal>
              <StaggerReveal className="mt-10 divide-y divide-border-subtle border-y border-border-subtle" stagger={0.08}>
                {technicalPrinciples.principles.map((item, index) => {
                  const Icon = [ScanLine, SunMedium, Building2, Wrench][index];
                  return (
                  <StaggerItem key={item.label}>
                    <div className="grid gap-4 py-5 sm:grid-cols-[auto_1fr]">
                      <Icon size={20} strokeWidth={1.5} className="text-accent-dim" />
                      <div>
                        <span className="font-medium text-text-primary">{item.label}</span>
                        <p className="mt-1 text-sm leading-relaxed text-text-secondary">{item.description}</p>
                      </div>
                    </div>
                  </StaggerItem>
                );
                })}
              </StaggerReveal>
            </div>
          </div>
          <div className="h-px photon-seam" />
        </div>
      </div>
    </section>
  );
}
