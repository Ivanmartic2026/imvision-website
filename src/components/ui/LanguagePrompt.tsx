"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { getEnglishPath, getSwedishPath, Locale } from "@/lib/i18n";

const STORAGE_KEY = "imv-locale";

function getStoredLocale(): Locale | null {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "sv") return stored;
  return null;
}

export function LanguagePrompt() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [activeLocale, setActiveLocale] = useState<Locale>(pathname.startsWith("/sv") ? "sv" : "en");
  const toolbarRef = useRef<HTMLDivElement>(null);

  // Reveal after the hero has had a moment to breathe.
  useEffect(() => {
    const stored = getStoredLocale();
    if (stored) return;
    const timer = setTimeout(() => setVisible(true), reduceMotion ? 0 : 700);
    return () => clearTimeout(timer);
  }, [reduceMotion]);

  useEffect(() => {
    if (visible && toolbarRef.current) {
      const firstButton = toolbarRef.current.querySelector("button");
      if (firstButton instanceof HTMLElement) firstButton.focus();
    }
  }, [visible]);

  const handleSelect = useCallback(
    (selected: Locale, persist = true) => {
      setActiveLocale(selected);

      if (persist && typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, selected);
      }

      const target = selected === "sv" ? getSwedishPath(pathname) : getEnglishPath(pathname);

      if (target === pathname) {
        setVisible(false);
        return;
      }

      setExiting(true);
      setTimeout(() => {
        window.location.href = target;
      }, reduceMotion ? 0 : 450);
    },
    [pathname, reduceMotion]
  );

  const handleDismiss = useCallback(() => {
    handleSelect(activeLocale, true);
  }, [handleSelect, activeLocale]);

  useEffect(() => {
    if (!visible) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleDismiss();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible, handleDismiss]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={toolbarRef}
          role="dialog"
          aria-modal="true"
          aria-label="Choose your language"
          initial={{ y: "100%" }}
          animate={{ y: exiting ? "100%" : "0%" }}
          exit={{ y: "100%" }}
          transition={{
            duration: reduceMotion ? 0 : 0.65,
            ease: [0.22, 0.61, 0.36, 1],
          }}
          className="fixed bottom-0 left-0 right-0 z-[200] border-t border-white/[0.06] bg-[#070807]/35 backdrop-blur-md"
        >
          <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 sm:px-8 lg:px-12 xl:px-16">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted">
              IM Vision
            </p>

            <div className="relative flex items-center gap-5 font-mono text-[11px] uppercase tracking-[0.14em]">
              <button
                type="button"
                onClick={() => handleSelect("en")}
                aria-label="English"
                aria-current={activeLocale === "en" ? "true" : undefined}
                className="group relative py-1.5 text-text-secondary transition-colors duration-300 hover:text-text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/60"
              >
                <span className={activeLocale === "en" ? "text-text-primary" : undefined}>EN</span>
                {activeLocale === "en" && (
                  <motion.span
                    layoutId="prompt-lang-underline"
                    initial={false}
                    transition={{
                      duration: reduceMotion ? 0 : 0.35,
                      ease: [0.22, 0.61, 0.36, 1],
                    }}
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-current"
                  />
                )}
              </button>

              <span aria-hidden className="text-white/10">
                —
              </span>

              <button
                type="button"
                onClick={() => handleSelect("sv")}
                aria-label="Svenska"
                aria-current={activeLocale === "sv" ? "true" : undefined}
                className="group relative py-1.5 text-text-secondary transition-colors duration-300 hover:text-text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/60"
              >
                <span className={activeLocale === "sv" ? "text-text-primary" : undefined}>SV</span>
                {activeLocale === "sv" && (
                  <motion.span
                    layoutId="prompt-lang-underline"
                    initial={false}
                    transition={{
                      duration: reduceMotion ? 0 : 0.35,
                      ease: [0.22, 0.61, 0.36, 1],
                    }}
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-current"
                  />
                )}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
