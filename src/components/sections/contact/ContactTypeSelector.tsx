"use client";

import { Monitor, CalendarDays, Wrench } from "lucide-react";
import { RadioCard } from "@/components/ui/form";
import { ContactCategory } from "./types";

interface ContactTypeSelectorProps {
  locale: "en" | "sv";
  /** Currently selected category, or null before the user has chosen one. */
  selected: ContactCategory | null;
  onSelect: (category: ContactCategory) => void;
  /** Group name shared by the radios — keep unique per form instance. */
  name?: string;
}

const categories: { value: ContactCategory; icon: typeof Monitor }[] = [
  { value: "buy", icon: Monitor },
  { value: "rental", icon: CalendarDays },
  { value: "service", icon: Wrench },
];

/**
 * Category picker rendered as a real radio group (fieldset + legend + native
 * radios) instead of toggle buttons: it is a single choice, so screen readers
 * and arrow-key navigation should behave like one. Selection is shown by border,
 * tint **and** a check mark — never colour alone.
 */
export function ContactTypeSelector({ locale, selected, onSelect, name = "contact-category" }: ContactTypeSelectorProps) {
  const labels: Record<ContactCategory, { title: string; description: string }> = {
    buy: {
      title: locale === "sv" ? "Köpa LED" : "Buy LED",
      description: locale === "sv" ? "Permanenta installationer." : "Permanent installations.",
    },
    rental: {
      title: locale === "sv" ? "Hyra LED" : "Rent LED",
      description:
        locale === "sv" ? "Event, mässor och tillfälliga installationer." : "Events, fairs and temporary installations.",
    },
    service: {
      title: locale === "sv" ? "Service och support" : "Service & support",
      description: locale === "sv" ? "Support och reparation." : "Support and repair.",
    },
  };

  return (
    <fieldset className="min-w-0">
      <legend className="mb-3 text-sm font-medium text-text-secondary">
        {locale === "sv" ? "Vad gäller det?" : "What is it about?"}
      </legend>
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
        {categories.map(({ value, icon: Icon }) => (
          <RadioCard
            key={value}
            name={name}
            value={value}
            checked={selected === value}
            onChange={() => onSelect(value)}
            icon={<Icon size={18} strokeWidth={1.6} />}
            title={labels[value].title}
            description={labels[value].description}
            descriptionClassName="hidden sm:block"
            showCheck
          />
        ))}
      </div>
    </fieldset>
  );
}
