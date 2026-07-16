"use client";

import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "min-h-14 w-full rounded-2xl border bg-bg-surface px-5 py-4 text-text-primary outline-none transition-all duration-[500ms] ease-[cubic-bezier(.22,.61,.36,1)] placeholder:text-text-muted",
          "focus:border-accent/70 focus:bg-bg-surface focus:px-6 focus:py-5 focus:shadow-[0_0_0_4px_rgba(145,169,161,.08)]",
          error
            ? "border-red-400/70 focus:border-red-400/70 focus:shadow-[0_0_0_4px_rgba(248,113,113,.08)]"
            : "border-border-strong",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
