"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Reveal } from "@/components/effects/Reveal";
import { SalesSectionProps } from "./types";

export function SalesArchitecturalIntegration({ content }: SalesSectionProps) {
  const { architecturalIntegration } = content;

  return (
    <section className="theme-light section section-space bg-background">
      <div className="section-inner">
        <div className="light-gate overflow-hidden border border-border-subtle bg-bg-elevated/95 backdrop-blur-sm transition-all duration-700 ease-[cubic-bezier(.22,.61,.36,1)] hover:border-accent/20 hover:shadow-[0_28px_80px_rgba(0,0,0,.14)]">          <div className="grid lg:grid-cols-2">
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0 0 0)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.2, ease: [0.22, 0.61, 0.36, 1] }}
              className="relative min-h-[420px] overflow-hidden lg:min-h-[520px]"
            >
              <motion.div
                initial={{ scale: 1.06 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.6, ease: [0.22, 0.61, 0.36, 1] }}
                className="absolute inset-0 will-change-transform"
              >
                <Image
                  src={architecturalIntegration.image}
                  alt={architecturalIntegration.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </motion.div>
              <span className="absolute left-5 top-5 rounded-[10px_3px_10px_10px] bg-[#070807]/75 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#f2f0e9] backdrop-blur-md">
                {architecturalIntegration.imageBadge}
              </span>
            </motion.div>
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14 xl:p-16">
              <Reveal>
                <p className="eyebrow text-accent-dim">{architecturalIntegration.eyebrow}</p>
                <h2 className="heading-section mt-7 text-text-primary">{architecturalIntegration.title}</h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-7 text-lg leading-relaxed text-text-secondary">
                  {architecturalIntegration.body}
                </p>
              </Reveal>
            </div>
          </div>
          <div className="h-px photon-seam" />
        </div>
      </div>
    </section>
  );
}
