/**
 * Mät-hjälpare för GA4 (Consent Mode v2).
 *
 * GA4 laddas alltid, men med Consent Mode satt till `denied` som standard – inga
 * analytics-cookies sätts före samtycke (Google skickar då endast anonyma,
 * cookielösa signaler). Se `components/providers/Analytics.tsx`.
 *
 * ID läses från `NEXT_PUBLIC_GA_ID` (satt i Vercel) och faller annars tillbaka
 * på IMvisions produktions-ID.
 *
 * Skicka ALDRIG personlig information hit (namn, e-post, telefon, fritext).
 */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-19WKG4GBH4";
export const analyticsEnabled = /^G-[A-Z0-9]+$/i.test(GA_ID);

/** localStorage-nyckel för samtycke (kompatibel med tidigare versioner). */
export const CONSENT_KEY = "im-cookie-consent";
/** Event för att öppna samtyckesbannern igen (t.ex. från sidfoten). */
export const CONSENT_REOPEN = "im:open-consent";

/** Stabila eventnamn enligt GA4:s rekommendationer (snake_case). */
export const AnalyticsEvent = {
  pageView: "page_view",
  generateLead: "generate_lead",
  formStart: "form_start",
  formSubmit: "form_submit",
  phoneClick: "phone_click",
  emailClick: "email_click",
  outboundClick: "outbound_click",
  fileDownload: "file_download",
  scroll: "scroll",
  ctaClick: "cta_click",
  quoteRequest: "quote_request",
  bookService: "book_service",
} as const;

export type AnalyticsEventName =
  (typeof AnalyticsEvent)[keyof typeof AnalyticsEvent];

type Params = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function isDebug(): boolean {
  if (typeof window === "undefined") return false;
  if (process.env.NODE_ENV !== "production") return true;
  try {
    return new URLSearchParams(window.location.search).has("debug");
  } catch {
    return false;
  }
}

/**
 * Skicka ett event till GA4. `params` får endast innehålla icke-personlig
 * metadata. No-op om gtag inte finns (t.ex. innan skriptet laddats).
 */
export function pushEvent(event: AnalyticsEventName, params: Params = {}): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") {
    window.gtag("event", event, params);
  }
  if (isDebug()) console.debug("[analytics]", event, params);
}
