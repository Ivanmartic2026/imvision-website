"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, ArrowRight } from "lucide-react";
import { Locale, localizedHref } from "@/lib/i18n";
import { CONTACT } from "@/lib/seo";
import { AnalyticsEvent, pushEvent, CONSENT_KEY } from "@/lib/analytics";

// Mobile-only persistent conversion bar. Desktop keeps its "Få offert" CTA in
// the header (always visible), so this stays out of the way on large screens.
export function StickyCTA({ locale = "en" }: { locale?: Locale }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  // The contact page already is the destination — don't nag there.
  const onContact = Boolean(pathname && pathname.includes("/contact"));

  useEffect(() => {
    const evaluate = () => {
      if (onContact) {
        setVisible(false);
        return;
      }
      // Stay hidden until the cookie consent banner (bottom, z-90) is dismissed.
      let consentDecided = true;
      try {
        consentDecided = localStorage.getItem(CONSENT_KEY) !== null;
      } catch {
        consentDecided = true;
      }
      const scrolledEnough = window.scrollY > 480;
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 200;
      setVisible(consentDecided && scrolledEnough && !nearBottom);
    };
    evaluate();
    if (onContact) return;
    window.addEventListener("scroll", evaluate, { passive: true });
    window.addEventListener("resize", evaluate);
    return () => {
      window.removeEventListener("scroll", evaluate);
      window.removeEventListener("resize", evaluate);
    };
  }, [onContact]);

  const quoteLabel = locale === "sv" ? "Få offert" : "Get a quote";
  const callLabel = locale === "sv" ? "Ring" : "Call";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 96, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 96, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-[#070807]/90 px-4 pt-3 backdrop-blur-xl lg:hidden"
          style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
        >
          <div className="mx-auto flex max-w-xl items-stretch gap-3">
            <a
              href={`tel:${CONTACT.phoneE164}`}
              onClick={() => pushEvent(AnalyticsEvent.phoneClick, { source: "sticky_cta" })}
              aria-label={locale === "sv" ? `Ring oss på ${CONTACT.phone}` : `Call us on ${CONTACT.phone}`}
              className="flex min-h-[52px] items-center justify-center gap-2 rounded-[14px_5px_14px_14px] border border-accent/40 bg-accent/10 px-5 text-[15px] font-medium text-text-primary transition-transform active:scale-[.98]"
            >
              <Phone size={17} className="text-accent" strokeWidth={1.75} />
              {callLabel}
            </a>
            <Link
              href={localizedHref(locale, "/contact/")}
              prefetch={false}
              onClick={() => {
                pushEvent(AnalyticsEvent.ctaClick, { source: "sticky_cta", cta: "quote" });
                pushEvent(AnalyticsEvent.quoteRequest, { source: "sticky_cta" });
              }}
              className="flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-[14px_5px_14px_14px] border border-accent bg-accent px-5 text-[15px] font-semibold text-[#070807] shadow-[0_10px_30px_rgba(0,0,0,.28)] transition-transform active:scale-[.98]"
            >
              {quoteLabel}
              <ArrowRight size={17} strokeWidth={2} />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
