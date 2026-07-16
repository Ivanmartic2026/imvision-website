"use client";

import { motion } from "motion/react";
import { Monitor, CalendarDays, Wrench, ChevronRight } from "lucide-react";
import { ContactCategory } from "./types";

interface ContactTypeSelectorProps {
  locale: "en" | "sv";
  selected: ContactCategory | null;
  onSelect: (category: ContactCategory) => void;
}

const categories: { value: ContactCategory; icon: typeof Monitor }[] = [
  { value: "buy", icon: Monitor },
  { value: "rental", icon: CalendarDays },
  { value: "service", icon: Wrench },
];

export function ContactTypeSelector({ locale, selected, onSelect }: ContactTypeSelectorProps) {
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
      title: locale === "sv" ? "Service & support" : "Service & support",
      description: locale === "sv" ? "Support, felsökning och reparation." : "Support, troubleshooting and repair.",
    },
  };

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {categories.map(({ value, icon: Icon }) => {
        const isSelected = selected === value;
        return (
          <motion.button
            key={value}
            type="button"
            onClick={() => onSelect(value)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.985 }}
            transition={{ duration: 0.18, ease: [0.22, 0.61, 0.36, 1] }}
            className={`group relative flex flex-col items-start gap-4 rounded-2xl border p-5 text-left transition-colors duration-200 sm:p-6 ${
              isSelected
                ? "border-accent bg-accent/[0.04]"
                : "border-border-subtle bg-bg-surface hover:border-border-strong hover:bg-bg-elevated"
            }`}
            aria-pressed={isSelected}
          >
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-colors duration-200 ${
                isSelected
                  ? "border-accent bg-accent text-white"
                  : "border-border-subtle bg-bg-elevated text-accent group-hover:border-accent/30"
              }`}
            >
              <Icon size={20} strokeWidth={1.5} />
            </span>
            <div className="flex-1">
              <p className="text-base font-semibold text-text-primary">{labels[value].title}</p>
              <p className="mt-1 text-sm leading-relaxed text-text-secondary">{labels[value].description}</p>
            </div>
            <ChevronRight
              size={16}
              className={`mt-1 transition-all duration-200 ${
                isSelected ? "translate-x-1 text-accent" : "text-text-muted group-hover:translate-x-1 group-hover:text-accent"
              }`}
            />
          </motion.button>
        );
      })}
    </div>
  );
}
