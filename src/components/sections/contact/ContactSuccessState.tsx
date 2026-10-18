"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Check, Ticket, Copy, CopyCheck } from "lucide-react";
import { ContactCategory } from "./types";
import { NextSteps } from "./NextSteps";

interface ContactSuccessStateProps {
  locale: "en" | "sv";
  category: ContactCategory;
  /** Flow reference: "IM-0042" (support) or "PRJ-0003" (sales). */
  flowRef?: string;
}

export function ContactSuccessState({ locale, category, flowRef }: ContactSuccessStateProps) {
  const prefersReducedMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const categoryTitles: Record<ContactCategory, string> = {
    buy: locale === "sv" ? "Köpa LED" : "Buy LED",
    rental: locale === "sv" ? "Hyra LED" : "Rent LED",
    service: locale === "sv" ? "Service & support" : "Service & support",
  };

  const isService = category === "service";

  /* ───────── Flow reference label ───────── */

  const refLabel = flowRef
    ? isService
      ? locale === "sv"
        ? `Ärendenummer ${flowRef}`
        : `Ticket ${flowRef}`
      : locale === "sv"
        ? `Projektnummer ${flowRef}`
        : `Project ${flowRef}`
    : undefined;

  /* ───────── Copy handler (graceful fallback) ───────── */

  function handleCopy() {
    if (!flowRef) return;
    const didCopy = (() => {
      try {
        if (typeof navigator?.clipboard?.writeText === "function") {
          navigator.clipboard.writeText(flowRef);
          return true;
        }
      } catch {
        /* clipboard denied or unavailable — fall through */
      }
      return false;
    })();
    if (didCopy) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  /* ───────── Animate duration (respect reduced-motion preference) ───────── */

  const duration = prefersReducedMotion ? 0 : 0.4;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, ease: [0.22, 0.61, 0.36, 1] }}
      role="status"
      aria-live="polite"
      className="rounded-3xl border border-accent/25 bg-accent/10 p-8 text-text-secondary"
    >
      <div className="flex items-start gap-4">
        {/* Checkmark badge */}
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-white">
          <Check size={24} />
        </span>

        <div className="flex-1">
          <p className="text-xl font-semibold text-text-primary">
            {locale === "sv" ? "Tack, vi har tagit emot din förfrågan." : "Thank you, we have received your enquiry."}
          </p>
          <p className="mt-2 leading-relaxed">
            {locale === "sv"
              ? "En person från rätt avdelning återkommer inom 24 timmar."
              : "Someone from the right team will get back to you within 24 hours."}
          </p>

          {/* ───────── Flow reference (only when present) ───────── */}

          {flowRef && refLabel && (
            <div className="mt-4 flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-[12px_4px_12px_12px] border border-border-subtle bg-bg-surface px-4 py-2">
                <Ticket size={16} className="shrink-0 text-accent" />
                {/* Large monospace reference number */}
                <span
                  className="select-all text-lg font-mono font-semibold tracking-wide text-text-primary"
                  aria-label={refLabel}
                >
                  {flowRef}
                </span>
              </div>

              {/* Copy button — only rendered when flowRef is present */}
              <button
                type="button"
                onClick={handleCopy}
                disabled={copied}
                className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[8px_4px_8px_8px] border border-border-subtle bg-bg-surface text-text-secondary transition-colors hover:bg-bg-elevated hover:text-text-primary focus-visible:ring-2 focus-visible:ring-accent"
                aria-label={
                  copied
                    ? locale === "sv"
                      ? "Kopierat till urklipp"
                      : "Copied to clipboard"
                    : locale === "sv"
                      ? "Kopiera ärendenummer"
                      : "Copy case number"
                }
              >
                {copied ? <CopyCheck size={16} className="text-accent" /> : <Copy size={16} />}
              </button>
            </div>
          )}

          {/* Save reference hint (only when flowRef exists) */}
          {flowRef && refLabel && (
            <p className="mt-2 text-xs text-text-muted">
              {locale === "sv"
                ? `Spara ${refLabel.toLowerCase()} för framtida kontakt. Ange numret vid alla återkommande meddelanden.`
                : `Save ${refLabel.toLowerCase()} for future reference. Quote this number in all follow-up messages.`}
            </p>
          )}

          {/* Category badge */}
          <div className="mt-4 inline-flex items-center gap-2 rounded-[12px_4px_12px_12px] bg-bg-surface px-3 py-1.5 text-sm text-text-secondary">
            <span className="text-text-muted">{locale === "sv" ? "Ärende:" : "Case:"}</span>
            <span className="font-medium text-text-primary">{categoryTitles[category]}</span>
          </div>
        </div>
      </div>

      {/* ───────── Next steps (always shown after success) ───────── */}

      <NextSteps locale={locale} category={category} />
    </motion.div>
  );
}
