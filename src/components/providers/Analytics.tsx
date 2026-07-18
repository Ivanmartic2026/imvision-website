"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import {
  analyticsEnabled,
  CONSENT_KEY,
  CONSENT_REOPEN,
  GA_ID,
} from "@/lib/analytics";
import { AnalyticsTracker } from "@/components/providers/AnalyticsTracker";

/**
 * GDPR-anpassad GA4 med Google Consent Mode v2.
 *
 * - Consent Mode sätter alla annons-/analystyper till `denied` som standard,
 *   så INGA analytics-cookies sätts före samtycke (Google skickar då bara
 *   anonyma, cookielösa signaler).
 * - GA4 laddas alltid men respekterar samtyckesläget. Vid "Acceptera" höjs
 *   `analytics_storage` till `granted`; annonssamtycken förblir `denied`
 *   (sajten använder inga annonser).
 * - Valet sparas i localStorage (`im-cookie-consent`) och återställs innan GA4
 *   laddas, så återkommande besökare får rätt läge direkt.
 * - Bannern kan öppnas igen (t.ex. via sidfoten) för att ändra samtycket.
 */

// Körs synkront vid parse, dvs. innan gtag.js (afterInteractive) laddas – så att
// standardläget "denied" alltid är satt först. Återställer även sparat samtycke.
const CONSENT_DEFAULT = `
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
window.gtag=gtag;
gtag('consent','default',{
  ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',
  analytics_storage:'denied',functionality_storage:'granted',
  security_storage:'granted',wait_for_update:500
});
gtag('set','ads_data_redaction',true);
gtag('set','url_passthrough',true);
try{if(localStorage.getItem('${CONSENT_KEY}')==='granted'){
  gtag('consent','update',{analytics_storage:'granted'});
}}catch(e){}
`;

type Consent = "granted" | "denied" | null;

export function Analytics() {
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);
  const [locale, setLocale] = useState<"en" | "sv">("en");

  // Läser localStorage/window först efter montering (undviker hydration-mismatch).
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- engångssynk av sparat samtycke vid montering */
    const stored =
      typeof localStorage !== "undefined"
        ? localStorage.getItem(CONSENT_KEY)
        : null;
    if (stored === "granted" || stored === "denied") setConsent(stored);
    setLocale(window.location.pathname.split("/")[1] === "sv" ? "sv" : "en");
    setReady(true);
    /* eslint-enable react-hooks/set-state-in-effect */

    const reopen = () => setConsent(null);
    window.addEventListener(CONSENT_REOPEN, reopen);
    return () => window.removeEventListener(CONSENT_REOPEN, reopen);
  }, []);

  const decide = (value: "granted" | "denied") => {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {
      /* storage blockerat — val gäller sessionen */
    }
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: value === "granted" ? "granted" : "denied",
      });
    }
    setConsent(value);
  };

  if (!analyticsEnabled) return null; // ogiltigt/avstängt GA-ID → ingen mätning

  const t =
    locale === "sv"
      ? {
          text: "Vi använder analyscookies för att förstå hur sajten används. Inga cookies sätts förrän du accepterat, och ingen personlig information skickas.",
          accept: "Acceptera",
          decline: "Neka",
          label: "Cookie-samtycke",
        }
      : {
          text: "We use analytics cookies to understand how the site is used. No cookies are set until you accept, and no personal data is sent.",
          accept: "Accept",
          decline: "Decline",
          label: "Cookie consent",
        };

  return (
    <>
      {/* 1. Consent Mode v2 – standard denied, körs före gtag.js */}
      <Script id="consent-default" dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULT }} />

      {/* 2. GA4 laddas alltid men respekterar samtyckesläget */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true,debug_mode:(location.hostname==='localhost'||new URLSearchParams(location.search).has('debug'))});`}
      </Script>

      {/* Klient-mätning: sidvisningar vid navigering, klick, scroll */}
      <AnalyticsTracker />

      {/* Samtyckesbanner (visas tills ett val gjorts) */}
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
