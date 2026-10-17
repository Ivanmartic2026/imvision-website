"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { Locale, getEnglishPath, getSwedishPath } from "@/lib/i18n";

interface LanguageSwitcherProps {
  locale: Locale;
  className?: string;
}

/** Three staggered dots that read as "loading" without a spinner asset. */
function SwitchingDots() {
  return (
    <span className="inline-flex gap-[2px]" aria-hidden="true">
      {[0, 0.15, 0.3].map((delay) => (
        <motion.span
          key={delay}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 0.6, repeat: Infinity, delay }}
        >
          .
        </motion.span>
      ))}
    </span>
  );
}

/**
 * Active-language pill.
 *
 * It has to be rendered INSIDE the active link — not as a sibling — because
 * `layoutId` animates between two mounted instances by measuring their boxes.
 * A single sibling element would be an empty flex child with zero width, so it
 * would animate between nothing and nothing.
 *
 * `prefetch={false}` is kept for consistency with the rest of the site; see the
 * note in Header.tsx.
 */
function ActivePill({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <motion.span
      layoutId="lang-pill-bg"
      initial={false}
      transition={{
        duration: reduceMotion ? 0 : 0.35,
        ease: [0.22, 0.61, 0.36, 1],
      }}
      aria-hidden="true"
      className="absolute inset-0 rounded-[10px_3px_10px_10px] bg-text-primary/[0.08]"
    />
  );
}

export function LanguageSwitcher({ locale, className }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [isSwitching, setIsSwitching] = useState(false);

  const enPath = getEnglishPath(pathname);
  const svPath = getSwedishPath(pathname);

  // A language switch is a full page load, so without feedback the control
  // appears dead for as long as the next document takes to arrive.
  const handleSwitchClick = () => setIsSwitching(true);

  // Safety net: if navigation does not happen (offline, blocked popup, user
  // cancelled), the indicator must not stay stuck on.
  useEffect(() => {
    if (!isSwitching) return;
    const timer = setTimeout(() => setIsSwitching(false), 2500);
    return () => clearTimeout(timer);
  }, [isSwitching]);

  const linkClass = (isActive: boolean) =>
    cn(
      "group relative inline-flex min-h-11 items-center rounded-[10px_3px_10px_10px] px-3 transition-colors duration-300 hover:text-text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/60",
      isActive ? "font-semibold text-text-primary" : "text-text-secondary"
    );

  return (
    <nav
      aria-label={locale === "sv" ? "Välj språk" : "Choose language"}
      className={className}
    >
      <div className="relative flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.14em]">
        <Link
          href={enPath}
          prefetch={false}
          lang="en"
          hrefLang="en"
          aria-label="English"
          aria-current={locale === "en" ? "true" : undefined}
          onClick={handleSwitchClick}
          className={linkClass(locale === "en")}
        >
          {locale === "en" && <ActivePill reduceMotion={reduceMotion} />}
          <span className="relative">
            {isSwitching && locale === "sv" ? (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                EN
                <SwitchingDots />
              </motion.span>
            ) : (
              "EN"
            )}
          </span>
        </Link>

        <Link
          href={svPath}
          prefetch={false}
          lang="sv"
          hrefLang="sv"
          aria-label="Svenska"
          aria-current={locale === "sv" ? "true" : undefined}
          onClick={handleSwitchClick}
          className={linkClass(locale === "sv")}
        >
          {locale === "sv" && <ActivePill reduceMotion={reduceMotion} />}
          <span className="relative">
            {isSwitching && locale === "en" ? (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                SV
                <SwitchingDots />
              </motion.span>
            ) : (
              "SV"
            )}
          </span>
        </Link>
      </div>
    </nav>
  );
}
