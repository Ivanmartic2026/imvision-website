"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import { ContactCategory } from "./types";

interface ContactSuccessStateProps {
  locale: "en" | "sv";
  category: ContactCategory;
}

export function ContactSuccessState({ locale, category }: ContactSuccessStateProps) {
  const categoryTitles: Record<ContactCategory, string> = {
    buy: locale === "sv" ? "Köpa LED" : "Buy LED",
    rental: locale === "sv" ? "Hyra LED" : "Rent LED",
    service: locale === "sv" ? "Service & support" : "Service & support",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
      role="status"
      className="rounded-3xl border border-accent/25 bg-accent/10 p-8 text-text-secondary"
    >
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-white">
          <Check size={24} />
        </span>
        <div>
          <p className="text-xl font-semibold text-text-primary">
            {locale === "sv" ? "Tack, vi har tagit emot din förfrågan." : "Thank you, we have received your enquiry."}
          </p>
          <p className="mt-2 leading-relaxed">
            {locale === "sv"
              ? "En person från rätt avdelning återkommer så snart som möjligt, normalt samma arbetsdag."
              : "Someone from the right team will get back to you as soon as possible, usually the same business day."}
          </p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-lg bg-bg-surface px-3 py-1.5 text-sm text-text-secondary">
            <span className="text-text-muted">{locale === "sv" ? "Ärende:" : "Case:"}</span>
            <span className="font-medium text-text-primary">{categoryTitles[category]}</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
