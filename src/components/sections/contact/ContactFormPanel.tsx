"use client";

import { useSearchParams } from "next/navigation";
import { Locale } from "@/lib/i18n";
import { ContactForm } from "@/components/sections/ContactForm";

type Topic = "buy" | "rental" | "service";

function isTopic(value: string | null): value is Topic {
  return value === "buy" || value === "rental" || value === "service";
}

interface ContactFormPanelProps {
  locale?: Locale;
  fallbackCategory?: Topic;
}

/**
 * Reads `?topic=` so a visitor arriving from /support/ or /service/ lands with
 * the right category preselected (the enquiry then reaches the correct mailbox
 * instead of info@).
 *
 * `useSearchParams` opts this subtree into client rendering, which is why the
 * contact pages wrap it in <Suspense> — that keeps /contact/ statically
 * prerendered instead of turning the whole route dynamic.
 */
export function ContactFormPanel({ locale = "en", fallbackCategory = "buy" }: ContactFormPanelProps) {
  const topic = useSearchParams().get("topic");
  const category = isTopic(topic) ? topic : fallbackCategory;

  return (
    <ContactForm
      key={category}
      locale={locale}
      variant="panel"
      defaultCategory={category}
    />
  );
}
