"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { Phone, ArrowRight } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { QuoteCta } from "@/components/providers/QuickQuote";
import { Button } from "@/components/ui/Button";
import { CONTACT } from "@/lib/seo";
import { AnalyticsEvent, pushEvent, CONSENT_KEY } from "@/lib/analytics";

// Mobile-only persistent conversion bar. Desktop keeps its "Få offert" CTA in
// the header (always visible), so this stays out of the way on large screens.
export function StickyCTA({ locale = "en" }: { locale?: Locale }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  // The contact page is the destination, so the bar used to be hidden there —
  // but the form sits well below the first mobile screen, so now it appears
  // only once the form itself has scrolled out of view.
  const onContact = Boolean(pathname && pathname.includes("/contact"));

  useEffect(() => {
    const consentDecided = () => {
      try {
        return localStorage.getItem(CONSENT_KEY) !== null;
      } catch {
        return true;
      }
    };

    if (onContact) {
      const form = document.getElementById("contact-form");
      // No form on this page variant: stay hidden (the initial state).
      if (!form) return;
      const observer = new IntersectionObserver(
        ([entry]) => setVisible(!entry.isIntersecting && consentDecided()),
        { rootMargin: "-72px 0px -15% 0px" }
      );
      observer.observe(form);
      return () => observer.disconnect();
    }

    const evaluate = () => {
      // Stay hidden until the cookie consent banner (bottom, z-90) is dismissed.
      const scrolledEnough = window.scrollY > 480;
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 200;
      setVisible(consentDecided() && scrolledEnough && !nearBottom);
    };
    evaluate();
    window.addEventListener("scroll", evaluate, { passive: true });
    window.addEventListener("resize", evaluate);
    return () => {
      window.removeEventListener("scroll", evaluate);
      window.removeEventListener("resize", evaluate);
    };
  }, [onContact]);

  const quoteLabel = onContact
    ? locale === "sv"
      ? "Skicka förfrågan"
      : "Send enquiry"
    : locale === "sv"
      ? "Få offert"
      : "Get a quote";
  const callLabel = locale === "sv" ? "Ring" : "Call";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 96, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 96, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
          className="theme-dark fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-[#070807]/90 px-4 pt-3 backdrop-blur-xl lg:hidden"
          style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
        >
          <div className="mx-auto flex max-w-xl items-stretch gap-3">
            <Button
              href={`tel:${CONTACT.phoneE164}`}
              variant="secondary"
              size="lg"
              onClick={() => pushEvent(AnalyticsEvent.phoneClick, { source: "sticky_cta" })}
              icon={<Phone size={17} className="text-accent" strokeWidth={2} />}
              className="flex-1"
            >
              {callLabel}
            </Button>
            <QuoteCta
              locale={locale}
              source="sticky_cta"
              size="lg"
              className="flex-1"
              icon={<ArrowRight size={17} strokeWidth={2} />}
            >
              {quoteLabel}
            </QuoteCta>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
