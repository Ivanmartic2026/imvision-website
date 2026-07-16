"use client";

import { cn } from "@/lib/utils";
import { SelectHTMLAttributes, forwardRef, ReactNode } from "react";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  children: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            "min-h-14 w-full appearance-none rounded-2xl border bg-bg-surface px-5 py-4 pr-12 text-text-primary outline-none transition-all duration-[500ms] ease-[cubic-bezier(.22,.61,.36,1)]",
            "focus:border-accent/70 focus:bg-bg-surface focus:px-6 focus:py-5 focus:shadow-[0_0_0_4px_rgba(145,169,161,.08)]",
            error
              ? "border-red-400/70 focus:border-red-400/70 focus:shadow-[0_0_0_4px_rgba(248,113,113,.08)]"
              : "border-border-strong",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-text-muted">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
            <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    );
  }
);

Select.displayName = "Select";
