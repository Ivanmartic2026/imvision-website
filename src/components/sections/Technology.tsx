"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Locale } from "@/lib/i18n";

const capabilities = [
  ["Engineering", "Projektering"],
  ["Construction", "Konstruktion"],
  ["Installation", "Installation"],
  ["Programming", "Programmering"],
  ["Service", "Service"],
  ["Support", "Support"],
  ["Operations", "Drift"],
];

export function Technology({ locale = "en" }: { locale?: Locale }) {
  return (
    <section id="technology" className="theme-light section section-space bg-background text-text-primary" aria-labelledby="technology-title">
      <div className="section-inner">
        <div className="light-gate relative overflow-hidden border border-border-subtle bg-[#111516] px-6 py-10 text-[#f2f0e9] sm:px-10 lg:px-16 lg:py-20">
          <div className="absolute inset-x-0 top-0 h-px photon-seam" />
          <div className="absolute right-0 top-0 h-full w-1/2 opacity-[0.12] image-grid-overlay" aria-hidden="true" />

          <div className="relative grid gap-14 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <SectionLabel>{locale === "sv" ? "Varför IM Vision" : "Why IM Vision"}</SectionLabel>
              <h2 id="technology-title" className="heading-section mt-6">
                {locale === "sv" ? "Från idé till färdig drift" : "From idea to reliable operation"}
              </h2>
              <p className="mt-6 text-lg text-[#a9b0ad] sm:text-xl">
                {locale === "sv" ? "Vi tar ansvar för hela leveransen." : "We take responsibility for the complete delivery."}
              </p>
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <ul className="grid gap-px overflow-hidden rounded-[20px_6px_20px_20px] border border-white/10 bg-white/10 sm:grid-cols-2">
                {capabilities.map(([titleEn, titleSv], index) => (
                  <motion.li
                    key={titleEn}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, delay: index * 0.08, ease: [0.22, 0.61, 0.36, 1] }}
                    className="flex min-h-20 items-center gap-4 bg-[#111412] p-5 lg:min-h-24 lg:p-6"
                  >
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[#91a9a1]/35 text-[#91a9a1]">
                      <Check size={14} strokeWidth={2} />
                    </span>
                    <span className="text-base font-medium tracking-[-0.02em] sm:text-lg">{locale === "sv" ? titleSv : titleEn}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
