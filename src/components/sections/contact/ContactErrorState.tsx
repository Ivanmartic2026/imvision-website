"use client";

import { motion } from "motion/react";
import { AlertCircle } from "lucide-react";

interface ContactErrorStateProps {
  locale: "en" | "sv";
  recipient: string;
  onRetry: () => void;
}

export function ContactErrorState({ locale, recipient, onRetry }: ContactErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
      role="alert"
      className="rounded-3xl border border-red-400/30 bg-red-400/10 p-8 text-text-secondary"
    >
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-400/20 text-red-500">
          <AlertCircle size={24} />
        </span>
        <div>
          <p className="text-lg font-semibold text-text-primary">
            {locale === "sv" ? "Det gick inte att skicka förfrågan just nu." : "We couldn't send your enquiry right now."}
          </p>
          <p className="mt-2 leading-relaxed">
            {locale === "sv" ? "Försök igen eller kontakta oss på" : "Please try again or contact us at"}{" "}
            <a href={`mailto:${recipient}`} className="font-medium text-accent underline underline-offset-4 hover:text-accent-dim">
              {recipient}
            </a>
            .
          </p>
          <button
            type="button"
            onClick={onRetry}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-bg-surface px-4 py-2.5 text-sm font-medium text-text-primary transition-colors hover:bg-bg-elevated"
          >
            {locale === "sv" ? "Försök igen" : "Try again"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
