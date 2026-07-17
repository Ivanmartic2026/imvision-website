"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { getEnglishPath, getSwedishPath, Locale } from "@/lib/i18n";

const STORAGE_KEY = "imv-locale";

function getStoredLocale(): Locale | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "sv") return stored;
  return null;
}

export function LanguagePrompt() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(() => getStoredLocale() === null);
  const [exiting, setExiting] = useState(false);
  const englishRef = useRef<HTMLButtonElement>(null);

  const handleSelect = useCallback(
    (selected: Locale, persist = true) => {
      if (persist && typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, selected);
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

  useEffect(() => {
    if (visible && englishRef.current) {
      englishRef.current.focus();
    }
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        // Escape defaults to current locale without persisting a choice.
        handleSelect(pathname.startsWith("/sv") ? "sv" : "en", false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible, pathname, handleSelect]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Choose your language"
          initial={{ opacity: 0 }}
          animate={{ opacity: exiting ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.22, 0.61, 0.36, 1] }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#070807]/82 p-6 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: exiting ? 0 : 1, y: exiting ? -12 : 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.22, 0.61, 0.36, 1] }}
            className="w-full max-w-md border border-white/[.08] bg-[#0a0c0b]/95 p-10 text-center shadow-2xl sm:p-14"
          >
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-text-muted">
              IM Vision
            </p>
            <h2 className="mt-8 text-[clamp(1.75rem,5vw,2.25rem)] font-[470] leading-[1.1] tracking-[-0.03em] text-text-primary">
              Choose your language
            </h2>

            <div className="mt-10 flex flex-col items-center gap-5 sm:mt-12">
              <button
                ref={englishRef}
                type="button"
                onClick={() => handleSelect("en")}
                className="group relative py-3 text-2xl font-medium tracking-[-0.02em] text-text-secondary transition-colors duration-300 hover:text-text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/60 sm:text-3xl"
              >
                English
                <span className="absolute bottom-2 left-0 h-px w-0 bg-accent transition-[width] duration-500 ease-[cubic-bezier(.22,.61,.36,1)] group-hover:w-full" />
              </button>

              <button
                type="button"
                onClick={() => handleSelect("sv")}
                className="group relative py-3 text-2xl font-medium tracking-[-0.02em] text-text-secondary transition-colors duration-300 hover:text-text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/60 sm:text-3xl"
              >
                Svenska
                <span className="absolute bottom-2 left-0 h-px w-0 bg-accent transition-[width] duration-500 ease-[cubic-bezier(.22,.61,.36,1)] group-hover:w-full" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
