"use client";

import { useState, useId } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { JsonLd } from "@/components/seo/JsonLd";
import { Locale, localizedHref } from "@/lib/i18n";
import { faqLd } from "@/lib/seo";
import { getFaqForLocale } from "@/lib/content/faq";

export function FaqSection({ locale = "en" }: { locale?: Locale }) {
  const [openIndex, setOpenIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  // Called once at the top level, then suffixed per item. Calling useId()
  // inside the .map() below would break the Rules of Hooks: hooks must not run
  // in loops or callbacks, even when today's list happens to be static.
  const baseId = useId();
  const faqs = getFaqForLocale();

  // Build the JSON-LD payload from the current locale's FAQ items.
  // Each item is a simple { question, answer } shape that faqLd expects.
  const faqLdItems = faqs.map((faq) => ({
    question: faq.question[locale],
    answer: faq.answer[locale],
  }));

  return (
    <section className="section section-space bg-background" aria-labelledby="faq-title">
      <JsonLd data={faqLd(faqLdItems)} />
      <div className="section-inner">
        <div className="max-w-4xl">
          <SectionLabel>
            {locale === "sv" ? "Vanliga frågor" : "Common questions"}
          </SectionLabel>
          <h2 id="faq-title" className="heading-section mt-8">
            {locale === "sv"
              ? "Frågor om LED och installation"
              : "Questions about LED and installation"}
          </h2>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          {faqs.map((faq, index) => {
            // Stable per-item IDs so the aria wiring never drifts between renders.
            const id = `${baseId}-${index}`;
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question[locale]}
                className="rounded-[24px_8px_24px_24px] border border-border-subtle bg-bg-elevated transition-colors duration-[700ms] hover:border-border-strong"
              >
                {/* Trigger button — fully keyboard accessible out of the box. */}
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`${id}-panel`}
                  id={id}
                  onClick={() =>
                    setOpenIndex(isOpen ? -1 : index)
                  }
                  className="flex w-full items-center justify-between gap-4 px-7 py-6 text-left text-lg font-medium text-text-primary transition-colors hover:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  <span>{faq.question[locale]}</span>
                  <span
                    className={`shrink-0 transition-transform duration-300 ease-[cubic-bezier(.22,.61,.36,1)] ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronDown size={20} className="text-accent" />
                  </span>
                </button>

                {/* Answer panel — animated height, role="region" for accessibility. */}
                <motion.div
                  id={`${id}-panel`}
                  role="region"
                  aria-labelledby={id}
                  initial={{ height: 0, opacity: 0 }}
                  animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.35, ease: [0.22, 0.61, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-7 pb-6 text-text-secondary">
                    {faq.answer[locale]}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Closing CTA */}
        <p className="mx-auto mt-10 max-w-2xl text-center text-text-secondary">
          {locale === "sv" ? (
            <>
              Hittar du inte svaret?{" "}
              <Link
                href={localizedHref(locale, "/contact/")}
                prefetch={false}
                className="font-semibold text-accent transition-colors hover:underline focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                Kontakta oss
              </Link>
              .
            </>
          ) : (
            <>
              Still have questions?{" "}
              <Link
                href={localizedHref(locale, "/contact/")}
                prefetch={false}
                className="font-semibold text-accent transition-colors hover:underline focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                Contact us
              </Link>
              .
            </>
          )}
        </p>
      </div>
    </section>
  );
}
