"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

/**
 * The single button system for the site.
 *
 * Rules (see docs/DESIGN-BUTTONS.md):
 *  • One shape: 12 px / 4 px asymmetric radius — the same cut on every button,
 *    everywhere. Cards keep their larger 24/8 radius, so shape signals scale.
 *  • One height per size: 44 / 48 / 52 px. Nothing interactive is below 44 px.
 *  • One label weight: semibold. Hierarchy comes from fill and border, not from
 *    three different font weights and four different radii.
 *  • Four variants only: primary, secondary, ghost, link.
 *  • The primary button is always the same sage fill with dark text, and it is
 *    allowed once per view.
 *
 * Do not hand-roll button styles in a component — pass `variant`/`size` here.
 * Form submits, the quick-enquiry panel, the header CTA, the sticky bar and the
 * filter chips all route through this file (or through `Chip` for pills).
 */
export type ButtonVariant = "primary" | "secondary" | "ghost" | "link";
export type ButtonSize = "sm" | "md" | "lg";
/** Legacy size names kept so existing call sites stay valid. */
type LegacySize = "small" | "default" | "large";
const SIZE_ALIAS: Record<string, ButtonSize> = {
  sm: "sm",
  md: "md",
  lg: "lg",
  small: "sm",
  default: "md",
  large: "lg",
};

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize | LegacySize;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  type?: "button" | "submit" | "reset";
  icon?: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  /** @deprecated no-op; kept so existing call sites keep type-checking. */
  magnetic?: boolean;
}

const base =
  "group/btn relative inline-flex select-none items-center justify-center gap-2 rounded-[12px_4px_12px_12px] font-semibold leading-none tracking-[-0.01em] transition-[background-color,border-color,color,box-shadow,transform] duration-300 ease-[cubic-bezier(.22,1,.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-55";

const variants: Record<ButtonVariant, string> = {
  // Filled sage with dark label. bg is pinned to the literal sage (not --accent)
  // so the dark label keeps 8:1 even inside .theme-light bands, where --accent
  // is intentionally darkened for text use.
  primary:
    "border border-[#91a9a1] bg-[#91a9a1] text-[#070807] shadow-[0_10px_28px_rgba(0,0,0,.22)] hover:-translate-y-px hover:border-accent-soft hover:bg-accent-soft hover:shadow-[0_14px_34px_rgba(0,0,0,.28)] active:translate-y-0 active:scale-[.99]",
  // Clear outline: a visible border in both themes (see --btn-border), fills
  // with a sage tint on hover instead of flipping to a light background.
  secondary:
    "border-[1.5px] border-[var(--btn-border)] bg-transparent text-text-primary hover:border-accent hover:bg-accent/12 active:scale-[.99]",
  ghost:
    "border-[1.5px] border-transparent bg-transparent text-text-primary hover:border-[var(--btn-border)] hover:bg-white/[.05] active:scale-[.99]",
  link:
    "tap border-0 bg-transparent px-0 text-text-primary underline decoration-accent decoration-[1.5px] underline-offset-4 hover:text-accent-soft",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-11 px-4 text-[13px]",
  md: "min-h-12 px-5 text-sm",
  lg: "min-h-13 px-7 text-base",
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  onClick,
  type = "button",
  icon,
  loading = false,
  disabled = false,
  fullWidth = false,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const resolvedSize = SIZE_ALIAS[size] ?? "md";

  const classes = cn(
    base,
    variants[variant],
    sizes[resolvedSize],
    variant === "link" && "min-h-11",
    fullWidth && "w-full",
    isDisabled && "pointer-events-none opacity-55",
    className
  );

  const inner = (
    <span className="relative z-10 inline-flex items-center gap-2 [&>svg]:shrink-0 [&>svg]:transition-transform [&>svg]:duration-300 group-hover/btn:[&>svg]:translate-x-[3px]">
      {children}
      {loading ? <Loader2 size={17} className="animate-spin" aria-hidden /> : icon}
    </span>
  );

  if (href) {
    const isExternal =
      href.startsWith("http") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("#");

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (isDisabled) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    };

    return isExternal ? (
      <a
        href={href}
        className={classes}
        onClick={handleClick}
        aria-disabled={isDisabled || undefined}
      >
        {inner}
      </a>
    ) : (
      <Link
        href={href}
        className={classes}
        onClick={handleClick}
        aria-disabled={isDisabled || undefined}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={isDisabled}>
      {inner}
    </button>
  );
}
