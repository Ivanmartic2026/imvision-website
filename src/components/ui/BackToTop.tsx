"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUp } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { scrollToTop } from "@/lib/scroll";
import {
  analyticsEnabled,
  CONSENT_KEY,
  AnalyticsEvent,
  pushEvent,
} from "@/lib/analytics";

/**
 * Floating "back to top" affordance for the long pages (project archive, sales,
 * about). Three deliberate constraints:
 *
 * - It appears only after ~1.5 screens, so short pages never grow a redundant
 *   control that competes with the hero.
 * - It waits for the cookie banner to be dismissed. Both sit bottom-right and
 *   the banner is z-90, so without the gate the button would sit underneath it
 *   and look broken. `analyticsEnabled === false` means no banner exists at all.
 * - On mobile it clears the StickyCTA bar (~76px tall) so the two never overlap.
 */
export function BackToTop({ locale = "en" }: { locale?: Locale }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!analyticsEnabled) {
      // No consent banner is rendered, so only the scroll threshold matters.
      const onScroll = () =>
        setVisible(window.scrollY > window.innerHeight * 1.5);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    const evaluate = () => {
      let consentDecided = false;
      try {
        consentDecided = localStorage.getItem(CONSENT_KEY) !== null;
      } catch {
        consentDecided = true;
      }
      setVisible(consentDecided && window.scrollY > window.innerHeight * 1.5);
    };

    evaluate();
    window.addEventListener("scroll", evaluate, { passive: true });
    // The banner can be dismissed at any scroll position, which would otherwise
    // leave the button hidden until the next scroll event. A click or keypress
    // is what dismisses it, and window bubble handlers run after React's own
    // onClick, so the stored consent is already written when we re-evaluate.
    window.addEventListener("click", evaluate);
    window.addEventListener("keydown", evaluate);
    window.addEventListener("storage", evaluate);
    return () => {
      window.removeEventListener("scroll", evaluate);
      window.removeEventListener("click", evaluate);
      window.removeEventListener("keydown", evaluate);
      window.removeEventListener("storage", evaluate);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => {
            pushEvent(AnalyticsEvent.ctaClick, { source: "back_to_top" });
            scrollToTop();
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
          aria-label={locale === "sv" ? "Till toppen av sidan" : "Back to top"}
          className="fixed right-4 bottom-[92px] z-40 grid h-11 w-11 place-items-center rounded-[14px_5px_14px_14px] border border-border-strong bg-[#0b0d0c]/88 text-text-primary backdrop-blur-xl transition-colors duration-500 hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:right-8 lg:bottom-8 lg:h-12 lg:w-12"
        >
          <ArrowUp size={18} strokeWidth={1.75} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
