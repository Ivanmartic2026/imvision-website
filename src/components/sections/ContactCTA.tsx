"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Locale, localizedHref } from "@/lib/i18n";

export function ContactCTA({ locale = "en" }: { locale?: Locale }) {
  return (
    <section id="contact" className="theme-light section section-space bg-background text-text-primary" aria-labelledby="contact-title">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
        className="section-inner"
      >
        <div className="light-gate relative overflow-hidden border border-border-subtle bg-bg-surface px-7 py-12 sm:px-12 lg:px-20 lg:py-24">
          <div className="absolute inset-x-0 top-0 h-px photon-seam" />
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <SectionLabel>{locale === "sv" ? "Nästa steg" : "Next step"}</SectionLabel>
              <h2 id="contact-title" className="display-lg mt-8 max-w-5xl">
                {locale === "sv" ? "Ett projekt börjar här." : "A project starts here."}
              </h2>
            </div>
            <div className="lg:col-span-4 lg:flex lg:justify-end">
              <div>
                <Button href={localizedHref(locale, "/contact/")} size="large" icon={<ArrowRight size={18} />}>
                  {locale === "sv" ? "Starta ett projekt" : "Start a project"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
