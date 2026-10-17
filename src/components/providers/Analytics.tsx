"use client";

import Script from "next/script";
import {
  analyticsEnabled,
  CONSENT_KEY,
  GA_ID,
} from "@/lib/analytics";
import { AnalyticsTracker } from "@/components/providers/AnalyticsTracker";
import { CookieConsent } from "@/components/providers/CookieConsent";
import { Locale } from "@/lib/i18n";

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
 * - Bannern (CookieConsent) hanterar användarinteraktionen och öppnas igen via
 *   CONSENT_REOPEN-eventet (t.ex. från CookieSettingsLink i sidfoten).
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

/**
 * Samtyckesbanner med två steg:
 *  - Steg 1: snabbval "Acceptera alla" / "Endast nödvändiga"
 *  - Steg 2: individuell toggle för analys (öppnas automatiskt vid återöppning)
 *
 * Huvudkomponenten (Analytics) lämnar över all presentation och interaktion
 * till CookieConsent och koncentrerar sig på script-taggarna.
 *
 * `locale` träds ner från rotlayouten i stället för att gissas ur URL:en i en
 * effekt: annars serveras bannern på engelska på /sv/ och byter språk först
 * efter hydrering, vilket syns som en språkblinkning.
 */

export function Analytics({ locale = "en" }: { locale?: Locale }) {
  if (!analyticsEnabled) return null; // ogiltigt/avstängt GA-ID → ingen mätning

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

      {/* Samtyckesbanner – renderas bara när inget val finns (consent === null). */}
      <CookieConsent locale={locale} />
    </>
  );
}
