"use client";

import { CONSENT_REOPEN } from "@/lib/analytics";
import type { Locale } from "@/lib/i18n";

/** Öppnar samtyckesbannern igen så besökaren kan ändra sitt val. */
export function CookieSettingsLink({ locale = "en" }: { locale?: Locale }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(CONSENT_REOPEN))}
      className="tap min-w-11 justify-center transition-colors hover:text-text-primary"
    >
      {locale === "sv" ? "Cookie-inställningar" : "Cookie settings"}
    </button>
  );
}
