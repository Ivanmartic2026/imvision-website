"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Filter / choice chip.
 *
 * One pill style for every "pick one of these" control: project filters, the
 * enquiry-type chips in the quick panel, and any future segmented control.
 * Selection is never colour-only — the active chip also carries a check mark
 * and a heavier label, so it survives colour-blindness and greyscale print.
 */
export function Chip({
  children,
  selected = false,
  onClick,
  className,
  ariaPressed,
  showCheck = true,
}: {
  children: ReactNode;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
  ariaPressed?: boolean;
  showCheck?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={ariaPressed ?? selected}
      className={cn(
        "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm transition-colors duration-200",
        selected
          ? "border-accent bg-accent/18 font-semibold text-text-primary"
          : "border-[var(--btn-border)] font-medium text-text-secondary hover:border-accent/70 hover:bg-accent/8 hover:text-text-primary",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      {showCheck && selected && <Check size={14} strokeWidth={3} className="text-accent" aria-hidden />}
      {children}
    </button>
  );
}
