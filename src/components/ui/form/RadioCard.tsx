"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface RadioCardProps {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
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
}: RadioCardProps) {
  return (
    <label
      className={cn(
        "group relative flex cursor-pointer flex-col gap-2.5 rounded-2xl border p-5 transition-all duration-300 ease-[cubic-bezier(.22,.61,.36,1)]",
        checked
          ? "border-accent bg-accent/[0.06]"
          : "border-border-subtle bg-bg-surface hover:border-border-strong hover:bg-bg-elevated",
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
      <span className="flex items-center gap-3">
        <span className={cn("transition-colors duration-300", checked ? "text-accent" : "text-text-secondary group-hover:text-accent")}>
          {icon}
        </span>
        <span className="text-base font-semibold text-text-primary">{title}</span>
      </span>
      <span className="text-sm leading-relaxed text-text-secondary">{description}</span>
    </label>
  );
}
