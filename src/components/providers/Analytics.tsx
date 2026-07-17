"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

/**
 * GDPR-friendly Google Analytics 4.
 *
 * - Nothing loads and no banner shows until NEXT_PUBLIC_GA_ID is set (so there
 *   are zero tracking cookies by default).
 * - GA4 is loaded ONLY after the visitor explicitly accepts (opt-in), stored in
 *   localStorage. Decline keeps analytics off.
 * - IP anonymisation is on.
 *
 * To activate: set NEXT_PUBLIC_GA_ID = "G-XXXXXXX" in Vercel env and redeploy.
 */

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const STORAGE_KEY = "im-cookie-consent";

type Consent = "granted" | "denied" | null;

export function Analytics() {
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);
  const [locale, setLocale] = useState<"en" | "sv">("en");

  // Reading localStorage / window during render is not allowed in SSR, and a
  // lazy initializer would create a hydration mismatch, so this one-off sync
  // on mount is the safest place to restore the saved consent decision.
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "granted" || stored === "denied") setConsent(stored);
    setLocale(window.location.pathname.split("/")[1] === "sv" ? "sv" : "en");
    setReady(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const decide = (value: "granted" | "denied") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* storage blocked — session-only choice */
    }
    setConsent(value);
  };

  if (!GA_ID) return null; // no analytics configured → no cookies, no banner

  const t =
    locale === "sv"
      ? {
          text: "Vi använder analyscookies för att förstå hur sajten används. Du kan tacka nej.",
          accept: "Acceptera",
          decline: "Neka",
          label: "Cookie-samtycke",
        }
      : {
          text: "We use analytics cookies to understand how the site is used. You can decline.",
          accept: "Accept",
          decline: "Decline",
          label: "Cookie consent",
        };

  return (
    <>
      {consent === "granted" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      )}

      {ready && consent === null && (
        <div
          role="region"
          aria-label={t.label}
          className="fixed inset-x-3 bottom-3 z-[90] mx-auto max-w-xl rounded-[16px_6px_16px_16px] border border-border-strong bg-[#0b0d0c]/95 p-4 shadow-[0_24px_70px_rgba(0,0,0,.5)] backdrop-blur-xl sm:inset-x-auto sm:right-5 sm:bottom-5 sm:p-5"
        >
          <p className="text-sm leading-relaxed text-text-secondary">{t.text}</p>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => decide("granted")}
              className="rounded-[10px_3px_10px_10px] bg-[#91a9a1] px-4 py-2 text-sm font-medium text-[#070807] transition-colors hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {t.accept}
            </button>
            <button
              type="button"
              onClick={() => decide("denied")}
              className="rounded-[10px_3px_10px_10px] border border-border-strong px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-white/[.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {t.decline}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
