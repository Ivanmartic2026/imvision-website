"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "small" | "large";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  icon?: ReactNode;
  magnetic?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

export function Button({
  children,
  href,
  variant = "primary",
  size = "default",
  className,
  onClick,
  type = "button",
  icon,
  magnetic = false,
  loading = false,
  disabled = false,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const baseStyles =
    "group/btn relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-[16px_6px_16px_16px] font-medium tracking-[-0.01em] transition-[background-color,border-color,color,transform,box-shadow] duration-[700ms] ease-[cubic-bezier(.22,.61,.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-3 focus-visible:ring-offset-background active:scale-[.985]";

  const variants = {
    // bg pinned to the light sage (not --accent) so dark button text keeps ≥4.5:1
    // even on .theme-light bands, where --accent is intentionally darkened for text.
    primary:
      "border border-accent bg-[#91a9a1] text-[#070807] shadow-[0_12px_34px_rgba(0,0,0,.16)] hover:-translate-y-0.5 hover:border-accent-soft hover:bg-accent-soft hover:shadow-[0_18px_46px_rgba(0,0,0,.24)] hover:shadow-[0_0_40px_rgba(145,169,161,.18)]",
    secondary:
      "border border-border-strong bg-transparent text-text-primary hover:border-text-primary hover:bg-text-primary hover:text-background",
    ghost: "border border-transparent text-text-primary hover:bg-white/[.04]",
  };

  const sizes = {
    small: "h-11 px-5 text-sm",
    default: "h-13 px-6 text-[0.9375rem]",
    large: "h-15 px-7 text-base",
  };

  const classes = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    isDisabled && "pointer-events-none opacity-60",
    className
  );

  const inner = (
    <span className="relative z-10 inline-flex items-center gap-2 [&>svg]:transition-transform [&>svg]:duration-[700ms] [&>svg]:ease-[cubic-bezier(.22,.61,.36,1)] group-hover/btn:[&>svg]:translate-x-[3px]">
      {children}
      {loading ? <Loader2 size={18} className="animate-spin" /> : icon}
    </span>
  );

  let element: ReactNode;

  if (href) {
    const isExternal =
      href.startsWith("http") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("#");

    element = isExternal ? (
      <a href={href} className={classes} onClick={onClick} aria-disabled={isDisabled}>
        {inner}
      </a>
    ) : (
      <Link href={href} className={classes} onClick={onClick} aria-disabled={isDisabled}>
        {inner}
      </Link>
    );
  } else {
    element = (
      <button type={type} onClick={onClick} className={classes} disabled={isDisabled}>
        {inner}
      </button>
    );
  }

  void magnetic;
  return element;
}
