"use client";

import { useEffect } from "react";
import { AnalyticsEvent, analyticsEnabled, pushEvent } from "@/lib/analytics";

/**
 * Klick-mätning för det som GA4:s enhanced measurement INTE täcker:
 *   - phone_click  (tel:-länkar)
 *   - email_click  (mailto:-länkar)
 *   - cta_click    (länkar/knappar med data-cta)
 *
 * page_view (även SPA), scroll, file_download och utgående klick hanteras av
 * GA4 enhanced measurement och dupliceras därför inte här.
 *
 * Ingen personlig information skickas – endast länk-URL:er/etiketter.
 */
export function AnalyticsTracker() {
  useEffect(() => {
    if (!analyticsEnabled) return;

    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const anchor = target?.closest("a, button") as HTMLElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href") ?? "";
      const cta = anchor.getAttribute("data-cta");

      if (href.startsWith("tel:")) {
        pushEvent(AnalyticsEvent.phoneClick, { link_url: href });
      } else if (href.startsWith("mailto:")) {
        pushEvent(AnalyticsEvent.emailClick, { link_url: href });
      }

      if (cta) {
        pushEvent(AnalyticsEvent.ctaClick, {
          cta_label: cta,
          page_path: window.location.pathname,
        });
      }
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
