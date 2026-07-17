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
  const [visible, setVisible] = useState(() => getStoredLocale() === null);
  const [exiting, setExiting] = useState(false);
  const [activeLocale, setActiveLocale] = useState<Locale>(pathname.startsWith("/sv") ? "sv" : "en");
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [visible]);

  useEffect(() => {
    if (visible && panelRef.current) {
      const firstButton = panelRef.current.querySelector("button");
      if (firstButton instanceof HTMLElement) firstButton.focus();
    }
  }, [visible]);

  const handleSelect = useCallback(
    (selected: Locale) => {
      setActiveLocale(selected);

      if (typeof window !== "undefined") {
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
      }, reduceMotion ? 0 : 650);
    },
    [pathname, reduceMotion]
  );

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Choose your language"
          initial={{ opacity: 0 }}
          animate={{ opacity: exiting ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.22, 0.61, 0.36, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#070807]/88 px-6 backdrop-blur-xl"
        >
          <div className="flex max-w-2xl flex-col items-center text-center">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : 0.15, ease: [0.22, 0.61, 0.36, 1] }}
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted"
            >
              IM Vision
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.9, delay: reduceMotion ? 0 : 0.3, ease: [0.22, 0.61, 0.36, 1] }}
              className="mt-4 font-serif text-4xl font-light tracking-tight text-text-primary sm:text-5xl md:text-6xl"
            >
              Select your language
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : 0.45, ease: [0.22, 0.61, 0.36, 1] }}
              className="mt-4 max-w-md text-sm font-light leading-relaxed text-text-secondary"
            >
              Välj språk för att fortsätta. Choose a language to enter the site.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.85, delay: reduceMotion ? 0 : 0.6, ease: [0.22, 0.61, 0.36, 1] }}
              className="mt-10 flex items-center gap-6 font-mono text-xs uppercase tracking-[0.18em] sm:gap-10 sm:text-sm"
            >
              <button
                type="button"
                onClick={() => handleSelect("en")}
                aria-label="English"
                aria-current={activeLocale === "en" ? "true" : undefined}
                className="group relative px-6 py-3 text-text-secondary transition-colors duration-300 hover:text-text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/60 sm:px-8 sm:py-4"
              >
                <span className={activeLocale === "en" ? "text-text-primary" : undefined}>English</span>
                {activeLocale === "en" && (
                  <motion.span
                    layoutId="prompt-lang-underline"
                    initial={false}
                    transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.22, 0.61, 0.36, 1] }}
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-current"
                  />
                )}
              </button>

              <span aria-hidden className="h-8 w-px bg-white/10" />

              <button
                type="button"
                onClick={() => handleSelect("sv")}
                aria-label="Svenska"
                aria-current={activeLocale === "sv" ? "true" : undefined}
                className="group relative px-6 py-3 text-text-secondary transition-colors duration-300 hover:text-text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/60 sm:px-8 sm:py-4"
              >
                <span className={activeLocale === "sv" ? "text-text-primary" : undefined}>Svenska</span>
                {activeLocale === "sv" && (
                  <motion.span
                    layoutId="prompt-lang-underline"
                    initial={false}
                    transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.22, 0.61, 0.36, 1] }}
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-current"
                  />
                )}
              </button>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 1, delay: reduceMotion ? 0 : 1, ease: [0.22, 0.61, 0.36, 1] }}
            className="absolute bottom-8 font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted/60"
          >
            Architecture · Visuals · Technology
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
