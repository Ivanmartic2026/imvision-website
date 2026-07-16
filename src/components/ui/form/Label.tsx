"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface LabelProps {
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
  className?: string;
}

export function Label({ htmlFor, children, required, className }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "mb-2 block text-sm font-medium text-text-primary transition-colors duration-300",
        className
      )}
    >
      {children}
      {required && <span className="ml-1 text-accent" aria-hidden="true">*</span>}
    </label>
  );
}
