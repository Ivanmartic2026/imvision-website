"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Check } from "lucide-react";

interface RadioCardProps {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
  /** Extra classes for the description line (e.g. hide it on small screens). */
  descriptionClassName?: string;
  /** Show a check mark when selected, so the state is not carried by colour alone. */
  showCheck?: boolean;
}

export function RadioCard({
  name,
  value,
  checked,
  onChange,
  icon,
  title,
  description,
  className,
  descriptionClassName,
  showCheck = false,
}: RadioCardProps) {
  return (
    <label
      className={cn(
        "group relative flex cursor-pointer flex-col gap-2.5 rounded-[12px_4px_12px_12px] border p-5 transition-all duration-300 ease-[cubic-bezier(.22,.61,.36,1)]",
        checked
          ? "border-accent bg-accent/[0.10]"
          : "border-[var(--btn-border)] bg-bg-surface hover:border-accent/70 hover:bg-bg-elevated",
        // Keyboard focus lands on the visually hidden radio — mirror it on the card.
        "has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-inset has-[input:focus-visible]:ring-accent",
        className
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      <span
        className={cn(
          "absolute inset-x-0 bottom-0 h-0.5 rounded-full transition-transform duration-300",
          checked ? "scale-x-100 bg-accent" : "scale-x-0 bg-accent/50 group-hover:scale-x-50"
        )}
        aria-hidden="true"
      />
      {showCheck && (
        <span
          aria-hidden="true"
          className={cn(
            "absolute right-3.5 top-3.5 grid h-5 w-5 place-items-center rounded-full border transition-colors duration-300",
            checked ? "border-accent bg-accent text-[#070807]" : "border-border-strong text-transparent"
          )}
        >
          <Check size={12} strokeWidth={3.2} />
        </span>
      )}
      <span className="flex items-center gap-3">
        <span className={cn("transition-colors duration-300", checked ? "text-accent" : "text-text-secondary group-hover:text-accent")}>
          {icon}
        </span>
        <span className="pr-6 text-base font-semibold text-text-primary">{title}</span>
      </span>
      <span className={cn("text-sm leading-relaxed text-text-secondary", descriptionClassName)}>{description}</span>
    </label>
  );
}
