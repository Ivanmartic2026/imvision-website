"use client";

import { cn } from "@/lib/utils";
import { TextareaHTMLAttributes, forwardRef } from "react";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "min-h-[140px] w-full resize-y rounded-2xl border bg-bg-surface px-5 py-4 text-text-primary outline-none transition-all duration-[500ms] ease-[cubic-bezier(.22,.61,.36,1)] placeholder:text-text-muted",
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

Textarea.displayName = "Textarea";
