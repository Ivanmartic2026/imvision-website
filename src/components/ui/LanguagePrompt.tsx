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
  const cardRef = useRef<HTMLDivElement>(null);
  const englishRef = useRef<HTMLButtonElement>(null);

  // Delay the entrance slightly so the hero is perceived first.
  useEffect(() => {
    const stored = getStoredLocale();
    if (stored) return;
    const timer = setTimeout(() => setVisible(true), reduceMotion ? 0 : 200);
    return () => clearTimeout(timer);
  }, [reduceMotion]);

  useEffect(() => {
    if (visible && englishRef.current) {
      englishRef.current.focus();
    }
  }, [visible]);

  const handleSelect = useCallback(
    (selected: Locale, persist = true) => {
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
      }, reduceMotion ? 0 : 380);
    },
    [pathname, reduceMotion]
  );

  const handleDismiss = useCallback(() => {
    // Default to the current page locale without persisting a strong preference.
    const currentLocale: Locale = pathname.startsWith("/sv") ? "sv" : "en";
    handleSelect(currentLocale, true);
  }, [handleSelect, pathname]);

  useEffect(() => {
    if (!visible) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleDismiss();
    };

    const onClick = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        handleDismiss();
      }
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onClick);
    };
  }, [visible, handleDismiss]);

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Transparent overlay keeps the hero fully visible while capturing
              outside clicks and keyboard focus for accessibility. */}
          <motion.div
            role="presentation"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.45 }}
            className="fixed inset-0 z-[190]"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="Choose your language"
            className="fixed inset-0 z-[200] pointer-events-none"
          >
            <motion.div
              ref={cardRef}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{
                opacity: exiting ? 0 : 1,
                y: exiting ? -12 : 0,
                scale: exiting ? 0.98 : 1,
              }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{
                duration: reduceMotion ? 0 : 0.7,
                ease: [0.22, 0.61, 0.36, 1],
              }}
              className="pointer-events-auto absolute bottom-6 left-1/2 w-full max-w-[280px] -translate-x-1/2 border border-white/[0.08] bg-[#070807]/42 p-7 shadow-2xl backdrop-blur-xl sm:bottom-8 sm:right-8 sm:left-auto sm:translate-x-0 rounded-[32px_8px_32px_32px]"
            >
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-text-muted">
                IM Vision
              </p>

              <p className="mt-4 text-[13px] font-[450] leading-snug tracking-[-0.01em] text-text-secondary">
                Experience in
              </p>

              <div className="mt-3 flex items-center gap-4 text-[15px] font-medium tracking-[-0.01em]">
                <button
                  ref={englishRef}
                  type="button"
                  onClick={() => handleSelect("en")}
                  className="group relative py-1 text-text-secondary transition-colors duration-300 hover:text-text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/60"
                >
                  English
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-[width] duration-[450ms] ease-[cubic-bezier(.22,.61,.36,1)] group-hover:w-full" />
                </button>

                <span aria-hidden className="h-3 w-px bg-white/10" />

                <button
                  type="button"
                  onClick={() => handleSelect("sv")}
                  className="group relative py-1 text-text-secondary transition-colors duration-300 hover:text-text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/60"
                >
                  Svenska
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-[width] duration-[450ms] ease-[cubic-bezier(.22,.61,.36,1)] group-hover:w-full" />
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
