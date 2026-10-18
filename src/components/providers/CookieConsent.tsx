"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/Button";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import { Locale, localizedHref } from "@/lib/i18n";
import { CONSENT_KEY, CONSENT_REOPEN, CONSENT_CHANGED, pushEvent } from "@/lib/analytics";
import { AnalyticsEvent } from "@/lib/analytics";
import { X } from "lucide-react";
import Link from "next/link";

/** Högsta bredd för bannern – följer projektets max-w-xl-konvention. */
const MAX_WIDTH = "max-w-xl";

/* ---------- Huvudkomponent ---------- */

/**
 * `locale` kommer från rotlayouten via Analytics. Den fick tidigare inte gissas
 * ur `window.location.pathname` i en effekt: då renderades bannern på engelska
 * på /sv/ och bytte språk först efter hydrering, vilket syns som en blinkning.
 */
export function CookieConsent({ locale = "en" }: { locale?: Locale }) {
  // Steg 1 = kompakt, Steg 2 = anpassa
  const [step, setStep] = useState(1);
  // Har användaren valt "Acceptera alla"? (granted = analys påslagen)
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  // Visas bannern? (null = inget val ännu)
  // Läser localStorage efter montering så ingen hydration-mismatch uppstår.
  const [consent, setConsent] = useState<string | null>(null);

  useEffect(() => {
    const stored =
      typeof localStorage !== "undefined"
        ? localStorage.getItem(CONSENT_KEY)
        : null;
    if (stored === "granted" || stored === "denied") {
      setConsent(stored);
    }

    // Öppna banner igen – bryt ut för återvisning.
    const handleReopen = () => {
      // Läs nuvarande analys-inställning så att steg 2 kan vara förifylld.
      setAnalyticsEnabled(localStorage.getItem(CONSENT_KEY) === "granted");
      setConsent(null);
      setStep(2); // anpassa-vyn förvaldas vid återöppning
    };
    window.addEventListener(CONSENT_REOPEN, handleReopen);
    return () => window.removeEventListener(CONSENT_REOPEN, handleReopen);
  }, []);

  // Flytta fokus till utfälld panel när steg 2 öppnas.
  const step2Ref = useRef<HTMLDivElement>(null);
  const [prevStep, setPrevStep] = useState(1);

  useEffect(() => {
    if (step === 2 && prevStep === 1) {
      step2Ref.current?.focus();
    }
    setPrevStep(step);
  }, [step, prevStep]);

  // Escape stänger steg 2 och går tillbaka till steg 1.
  const handleEscape = useCallback(() => {
    if (step === 2) setStep(1);
  }, [step]);

  // Animation – mjuk in-glidning, respektera preferens.
  const reduceMotion = useReducedMotion();

  // "Acceptera alla" / "Endast nödvändiga".
  const decide = (value: "granted" | "denied") => {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {
      /* storage blockerat — val gäller sessionen */
    }
    // Uppdatera Consent Mode v2 via gtag.
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: value === "granted" ? "granted" : "denied",
      });
    }
    // Händelse för GA4 (om gtag finns).
    pushEvent(AnalyticsEvent.pageView, {});
    // Notera andra komponenter om samtycket ändrades.
    window.dispatchEvent(new Event(CONSENT_CHANGED));
    setConsent(value);
  };

  // "Spara val" – samma logik som decide men behåller steg 2-öppning.
  const saveChoices = () => {
    decide(analyticsEnabled ? "granted" : "denied");
  };

  if (consent !== null) return null; // inget val → visa inte bannern

  const t =
    locale === "sv"
      ? {
          title: "Cookie-inställningar",
          step1Title: "Vi använder cookies",
          step1Text:
            "Vi använder analyscookies för att förstå hur sajten används. " +
            "Inga cookies sätts förrän du accepterat, och ingen personlig information skickas.",
          accept: "Acceptera alla",
          necessary: "Endast nödvändiga",
          customise: "Anpassa",
          privacy: "Integritetspolicy",
          essential: "Nödvändiga",
          essentialDesc:
            "Krävs för att sajten ska fungera. Kan inte stängas av.",
          analysis: "Analys",
          analysisDesc:
            "Hjälper oss att förstå hur besökare använder sajten.",
          save: "Spara val",
          back: "Tillbaka",
        }
      : {
          title: "Cookie Settings",
          step1Title: "We use cookies",
          step1Text:
            "We use analytics cookies to understand how the site is used. " +
            "No cookies are set until you accept, and no personal data is sent.",
          accept: "Accept all",
          necessary: "Necessary only",
          customise: "Customise",
          privacy: "Privacy Policy",
          essential: "Essential",
          essentialDesc:
            "Required for the site to function. Can't be turned off.",
          analysis: "Analytics",
          analysisDesc:
            "Helps us understand how visitors use the site.",
          save: "Save choices",
          back: "Back",
        };

  return (
    <>
      {/* Exit-animation när bannern försvinner (samtycke givet). */}
      <AnimatePresence>
        {consent === null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-x-0 bottom-0 z-[90]"
            role="dialog"
            aria-modal="false"
            aria-label={step === 2 ? t.title : t.step1Title}
          >
            <motion.div
              className={`${MAX_WIDTH} mx-auto mb-3 sm:absolute sm:right-5 sm:bottom-5 sm:mb-0`}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 30,
                duration: reduceMotion ? 0 : 0.35,
              }}
            >
              {/* Stäng-knapp (synlig i steg 2) */}
              <div className="relative rounded-[16px_6px_16px_16px] border border-border-strong bg-[#0b0d0c]/95 shadow-[0_24px_70px_rgba(0,0,0,.5)] backdrop-blur-xl">
                {step === 2 && (
                  <button
                    type="button"
                    onClick={handleEscape}
                    aria-label={locale === "sv" ? "Stäng cookie-inställningar" : "Close cookie settings"}
                    className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-[10px_3px_10px_10px] text-text-secondary transition-colors hover:bg-white/[.06] hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <X size={16} />
                  </button>
                )}

                <div className="p-4 sm:p-5">
                  {/* Rubrik – skärmläsare + visuellt diskret */}
                  <p className="mb-3 text-sm font-semibold text-text-primary">
                    {step === 2 ? t.title : t.step1Title}
                  </p>

                  {step === 1 ? <Step1 /> : <Step2 />}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  /* ---------- Steg 1: Kompakt ---------- */
  function Step1() {
    return (
      <>
        <p className="text-sm leading-relaxed text-text-secondary">
          {t.step1Text}
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            <Button type="button" size="sm" onClick={() => decide("granted")}>
              {t.accept}
            </Button>
            <Button type="button" size="sm" variant="secondary" onClick={() => decide("denied")}>
              {t.necessary}
            </Button>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="tap font-medium text-text-muted transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label={t.customise}
            >
              {t.customise}
            </button>
            <span aria-hidden="true" className="text-border-strong">·</span>
            <Link
              href={localizedHref(locale, "/privacy/")}
              prefetch={false}
              className="tap font-medium text-text-muted transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {t.privacy}
            </Link>
          </div>
        </div>
      </>
    );
  }

  /* ---------- Steg 2: Anpassa ---------- */
  function Step2() {
    return (
      <motion.div
        ref={step2Ref}
        tabIndex={-1}
        className="space-y-4"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.25, ease: [0.22, 0.61, 0.36, 1] }}
      >
        <div className="space-y-3">
          {/* Nödvändiga — påslagen och inaktiverad */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-primary">
                {t.essential}
              </p>
              <p className="text-xs text-text-muted">
                {t.essentialDesc}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked
                disabled
                aria-label={t.essential}
                className="h-4 w-4 cursor-not-allowed rounded-[4px] border-border-strong bg-bg-surface text-accent accent-accent opacity-70"
              />
            </div>
          </div>

          {/* Analys — toggle */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-primary">
                {t.analysis}
              </p>
              <p className="text-xs text-text-muted">
                {t.analysisDesc}
              </p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={analyticsEnabled}
                onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                aria-label={t.analysis}
              />
              <span className="block h-[22px] w-[40px] rounded-full border border-border-strong bg-bg-surface transition-colors peer-checked:border-accent peer-checked:bg-accent peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background" />
              <span
                className="pointer-events-none absolute left-[3px] top-[3px] h-[16px] w-[16px] rounded-full bg-text-secondary transition-transform peer-checked:translate-x-[18px] peer-checked:bg-text-primary"
              />
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="text-sm font-medium text-text-muted transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label={t.back}
          >
            ← {t.back}
          </button>
          <button
            type="button"
            onClick={saveChoices}
            className="inline-flex min-h-11 items-center justify-center rounded-[10px_3px_10px_10px] bg-accent px-4 py-2.5 text-sm font-medium leading-tight text-[#070807] transition-colors hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {t.save}
          </button>
        </div>
      </motion.div>
    );
  }
}
