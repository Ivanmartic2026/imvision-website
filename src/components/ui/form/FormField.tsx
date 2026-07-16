"use client";

import { ReactNode } from "react";
import { Label } from "./Label";
import { ErrorMessage } from "./ErrorMessage";

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
  description?: string;
  className?: string;
}

export function FormField({ id, label, required, error, children, description, className }: FormFieldProps) {
  return (
    <div className={className}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      {description && <p className="mb-2 text-xs text-text-muted">{description}</p>}
      {children}
      <ErrorMessage id={`${id}-error`} message={error} />
    </div>
  );
}
