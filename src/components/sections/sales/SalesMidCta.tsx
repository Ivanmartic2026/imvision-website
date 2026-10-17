"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Locale, localizedHref } from "@/lib/i18n";

interface SalesMidCtaProps {
  locale?: Locale;
  variant: "sales" | "rental";
}

export function SalesMidCta({ locale = "en", variant }: SalesMidCtaProps) {
  const prefersReducedMotion = useReducedMotion();

  // Bilingual copy for sales and rental mid-page CTA.
  const texts: Record<string, Record<string, { heading: string; body: string; phone: string }>> = {
    en: {
      sales: {
        heading: "Ready to size up your project?",
        body: "Send us your requirements and we'll get back to you with a proposal and quote — usually the same working day.",
        phone: "+46 10 330 46 36",
      },
      rental: {
        heading: "Got a date in sight?",
        body: "Tell us your date, venue and screen size and we'll propose a complete rental package — usually the same working day.",
        phone: "+46 10 330 46 36",
      },
    },
    sv: {
      sales: {
        heading: "Redo att räkna på ert projekt?",
        body: "Skicka era förutsättningar så återkommer vi med förslag och offert — normalt samma arbetsdag.",
        phone: "010 330 46 36",
      },
      rental: {
        heading: "Har ni ett datum i sikte?",
        body: "Berätta datum, plats och skärmstorlek så föreslår vi ett komplett hyrespaket — normalt samma arbetsdag.",
        phone: "010 330 46 36",
      },
    },
  };

  const t = texts[locale]?.[variant] ?? texts["en"][variant];
  const phoneE164 = "+46103304636";
  const contactHref = localizedHref(locale, "/contact/");

  return (
    <section className="section section-space bg-background">
      <div className="section-inner">
        <motion.div
          className="light-gate relative overflow-hidden border border-border-subtle bg-bg-elevated/90 p-6 backdrop-blur-sm sm:p-8 lg:p-12"
          initial={prefersReducedMotion ? undefined : { y: 16 }}
          whileInView={prefersReducedMotion ? undefined : { y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
        >
          {/* Top accent line */}
          <div className="absolute inset-x-0 top-0 h-px photon-seam" />
          <div
            aria-hidden
            className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-accent/8 blur-[60px]"
          />

          <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-16">
            <div className="lg:col-span-7">
              <p className="eyebrow text-accent">{t.heading}</p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
                {t.body}
              </p>
            </div>

            <div className="lg:col-span-5 lg:flex lg:flex-col lg:justify-center lg:items-end">
              <div className="flex flex-col items-end gap-4">
                <span className="relative inline-flex">
                  <span className="absolute inset-0 rounded-[12px_4px_12px_12px] bg-accent/15 blur-xl" />
                  <Button
                    href={contactHref}
                    size="default"
                    icon={<ArrowRight size={14} />}
                  >
                    {variant === "sales"
                      ? locale === "sv"
                        ? "Begär offert"
                        : "Request a quote"
                      : locale === "sv"
                        ? "Boka via kontakt"
                        : "Book via contact"}
                  </Button>
                </span>
                <a
                  href={`tel:${phoneE164}`}
                  className="text-sm text-text-muted transition-colors duration-300 hover:text-text-primary"
                >
                  {t.phone}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
