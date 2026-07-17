"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { Locale, getEnglishPath, getSwedishPath } from "@/lib/i18n";

interface LanguageSwitcherProps {
  locale: Locale;
  className?: string;
}

export function LanguageSwitcher({ locale, className }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const enPath = getEnglishPath(pathname);
  const svPath = getSwedishPath(pathname);

  return (
    <nav
      aria-label={locale === "sv" ? "Välj språk" : "Choose language"}
      className={className}
    >
      <div className="relative flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.14em]">
        <Link
          href={enPath}
          prefetch={false}
          lang="en"
          hrefLang="en"
          aria-label="English"
          aria-current={locale === "en" ? "true" : undefined}
          className="group relative py-1.5 text-text-secondary transition-colors duration-300 hover:text-text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/60"
        >
          <span className={locale === "en" ? "text-text-primary" : undefined}>EN</span>
          {locale === "en" && (
            <motion.span
              layoutId="lang-underline"
              initial={false}
              transition={{
                duration: reduceMotion ? 0 : 0.35,
                ease: [0.22, 0.61, 0.36, 1],
              }}
              className="absolute -bottom-0.5 left-0 right-0 h-px bg-current"
            />
          )}
        </Link>

        <Link
          href={svPath}
          prefetch={false}
          lang="sv"
          hrefLang="sv"
          aria-label="Svenska"
          aria-current={locale === "sv" ? "true" : undefined}
          className="group relative py-1.5 text-text-secondary transition-colors duration-300 hover:text-text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/60"
        >
          <span className={locale === "sv" ? "text-text-primary" : undefined}>SV</span>
          {locale === "sv" && (
            <motion.span
              layoutId="lang-underline"
              initial={false}
              transition={{
                duration: reduceMotion ? 0 : 0.35,
                ease: [0.22, 0.61, 0.36, 1],
              }}
              className="absolute -bottom-0.5 left-0 right-0 h-px bg-current"
            />
          )}
        </Link>
      </div>
    </nav>
  );
}
