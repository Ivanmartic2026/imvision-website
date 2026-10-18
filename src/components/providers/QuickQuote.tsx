"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ArrowRight, Check, Loader2, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";
import { CONTACT } from "@/lib/seo";
import { AnalyticsEvent, pushEvent } from "@/lib/analytics";
import { ContactForm } from "@/components/sections/ContactForm";
import type { ContactCategory } from "@/components/sections/contact/types";

/**
 * Quick enquiry — the primary conversion path behind every "Få offert" button.
 *
 * Why a panel: sending someone to another page and asking them to click again
 * before they can type is the single biggest drop-off in the old flow. The
 * panel opens on the current page, puts the cursor in the first field and
 * needs three inputs and one extra click to submit.
 *
 * Without JS the trigger renders as a plain link to /contact/#contact-form
 * (progressive enhancement, see `QuoteCta`), so the CTA never dead-ends.
 */

type Category = Extract<ContactCategory, "buy" | "rental" | "service">;

interface OpenOptions {
  source: string;
  category?: Category;
}

interface QuickQuoteContextValue {
  open: (options: OpenOptions) => void;
}

const QuickQuoteContext = createContext<QuickQuoteContextValue | null>(null);

export function useQuickQuote() {
  return useContext(QuickQuoteContext);
}

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;
const PHONE_RE = /^\+?[0-9 ()\-.]{6,}$/;

const copy = {
  sv: {
    title: "Få offert",
    subtitle: "Tre fält. Vi svarar inom 24 timmar.",
    contact: "E-post eller telefon",
    contactPlaceholder: "namn@foretag.se eller 070-123 45 67",
    contactError: "Ange en e-postadress eller ett telefonnummer.",
    about: "Vad gäller det?",
    aboutPlaceholder: "t.ex. LED-skärm i entrén, ca 6 m², inflytt i mars",
    aboutError: "Skriv en rad om vad det gäller.",
    name: "Namn",
    optional: "(valfritt)",
    chips: { buy: "Köpa", rental: "Hyra", service: "Service" } as Record<Category, string>,
    submit: "Skicka förfrågan",
    sending: "Skickar…",
    close: "Stäng",
    consent: "Uppgifterna används bara för att besvara er förfrågan.",
    privacy: "Integritetspolicy",
    successTitle: "Tack — förfrågan är skickad.",
    successBody: "Vi svarar inom 24 timmar.",
    ref: "Ärendenummer",
    addDetails: "Lägg till företag, telefon eller bilaga",
    callUs: "Brådskande? Ring",
    errorTitle: "Förfrågan kunde inte skickas.",
    errorBody: "Försök igen, eller kontakta oss direkt:",
  },
  en: {
    title: "Get a quote",
    subtitle: "Three fields. We reply within 24 hours.",
    contact: "Email or phone",
    contactPlaceholder: "name@company.com or +46 70 123 45 67",
    contactError: "Enter an email address or a phone number.",
    about: "What is it about?",
    aboutPlaceholder: "e.g. LED screen in the entrance, approx. 6 m², opening in March",
    aboutError: "Add a line about what you need.",
    name: "Name",
    optional: "(optional)",
    chips: { buy: "Buy", rental: "Rent", service: "Service" } as Record<Category, string>,
    submit: "Send enquiry",
    sending: "Sending…",
    close: "Close",
    consent: "We only use these details to answer your enquiry.",
    privacy: "Privacy policy",
    successTitle: "Thank you — your enquiry is sent.",
    successBody: "We reply within 24 hours.",
    ref: "Reference",
    addDetails: "Add company, phone or attachment",
    callUs: "Urgent? Call",
    errorTitle: "Your enquiry could not be sent.",
    errorBody: "Try again, or contact us directly:",
  },
};

export function QuickQuoteProvider({
  locale = "en",
  children,
}: {
  locale?: Locale;
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState("unknown");
  const [category, setCategory] = useState<Category>("buy");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [ref, setRef] = useState<string | null>(null);
  const [showFull, setShowFull] = useState(false);
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<{ contact?: string; message?: string }>({});
  const [isSending, setIsSending] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const id = useId();
  const t = copy[locale];

  const open = useCallback((options: OpenOptions) => {
    openerRef.current = document.activeElement as HTMLElement | null;
    setSource(options.source);
    if (options.category) setCategory(options.category);
    setStatus("idle");
    setShowFull(false);
    setIsOpen(true);
    pushEvent(AnalyticsEvent.ctaClick, { source: options.source, cta: "quote" });
    pushEvent(AnalyticsEvent.quoteRequest, { source: options.source });
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setStatus("idle");
    setShowFull(false);
    setErrors({});
    // Return focus to whatever opened the panel, not to <body>.
    openerRef.current?.focus?.();
  }, []);

  // Escape + focus trap + scroll lock. The page underneath must not scroll
  // away while the panel is open, and the scroll position must survive.
  useEffect(() => {
    if (!isOpen) return;
    const panel = panelRef.current;
    const focusables = () =>
      Array.from(
        panel?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([type="hidden"]), textarea, select, [tabindex]:not([tabindex="-1"])'
        ) ?? []
      ).filter((el) => el.offsetParent !== null);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    // Focus the first field once the panel has painted. Retried once: when the
    // panel is opened from the mobile menu, that menu's own cleanup returns
    // focus to the hamburger a moment later, which would otherwise win.
    const focusFirst = () => {
      const field = firstFieldRef.current;
      if (!field) return;
      if (panelRef.current?.contains(document.activeElement) && document.activeElement !== document.body) return;
      field.focus({ preventScroll: true });
    };
    focusFirst();
    const focusTimer = window.setTimeout(focusFirst, 90);
    const focusRetry = window.setTimeout(focusFirst, 260);
    return () => {
      window.clearTimeout(focusTimer);
      window.clearTimeout(focusRetry);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  const value = useMemo<QuickQuoteContextValue>(() => ({ open }), [open]);

  const validate = () => {
    const next: { contact?: string; message?: string } = {};
    const trimmed = contact.trim();
    if (!trimmed || (!EMAIL_RE.test(trimmed) && !PHONE_RE.test(trimmed))) {
      next.contact = t.contactError;
    }
    if (message.trim().length < 2) next.message = t.aboutError;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSending || !validate()) return;
    setIsSending(true);
    setStatus("idle");

    const trimmed = contact.trim();
    const isEmail = EMAIL_RE.test(trimmed);
    const pageContext = `${window.location.pathname} · ${document.title}`;

    const body = new FormData();
    body.set("kind", "quick");
    body.set("category", t.chips[category]);
    body.set("categoryKey", category);
    body.set("message", message.trim());
    body.set("name", name.trim() || (isEmail ? trimmed.split("@")[0] : "Snabbförfrågan"));
    if (isEmail) body.set("email", trimmed);
    else body.set("phone", trimmed);
    body.set("source", `${source} — ${pageContext}`);
    body.set("honeypot", "");

    try {
      const res = await fetch("/api/contact/", { method: "POST", body });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; ref?: string };
      if (!res.ok || !json.ok) throw new Error(`HTTP ${res.status}`);
      setRef(json.ref ?? null);
      setStatus("success");
      pushEvent(AnalyticsEvent.formSubmit, { form_id: "quick_quote", source });
      setContact("");
      setMessage("");
      setName("");
    } catch {
      // Never fake a confirmation: the user gets a real error plus a way out.
      setStatus("error");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <QuickQuoteContext.Provider value={value}>
      {children}

      {isOpen && (
        <div className="fixed inset-0 z-[120] flex justify-end" role="presentation">
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={close}
            className="absolute inset-0 h-full w-full cursor-default bg-[#070807]/72 backdrop-blur-sm motion-safe:animate-[fadeIn_.2s_ease-out]"
          />
          <div
            ref={panelRef}
            data-testid="quick-quote"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${id}-title`}
            className={cn(
              "relative flex h-full w-full flex-col overflow-y-auto border-l border-border-strong bg-[#0b0d0c] shadow-[-24px_0_80px_rgba(0,0,0,.5)]",
              "sm:max-w-[520px] motion-safe:animate-[slideIn_.28s_cubic-bezier(.22,1,.36,1)]",
              "max-sm:mt-auto max-sm:h-auto max-sm:max-h-[92svh] max-sm:rounded-t-[20px] max-sm:border-l-0 max-sm:border-t motion-safe:max-sm:animate-[sheetUp_.28s_cubic-bezier(.22,1,.36,1)]"
            )}
          >
            <div className="flex items-start justify-between gap-4 px-6 pt-6 sm:px-8 sm:pt-8">
              <div>
                <p className="eyebrow text-accent">
                  {locale === "sv" ? "Snabbförfrågan" : "Quick enquiry"}
                </p>
                <h2 id={`${id}-title`} className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-text-primary">
                  {status === "success" ? t.successTitle : t.title}
                </h2>
                {status !== "success" && (
                  <p className="mt-2 text-sm text-text-secondary">{t.subtitle}</p>
                )}
              </div>
              <button
                type="button"
                onClick={close}
                aria-label={t.close}
                className="tap-icon -mr-2 -mt-1 shrink-0 rounded-[12px_4px_12px_12px] border border-border-subtle text-text-secondary transition-colors hover:border-border-strong hover:text-text-primary"
              >
                <X size={18} />
              </button>
            </div>

            <div className="px-6 pb-8 pt-6 sm:px-8">
              {status === "success" ? (
                <div role="status" className="space-y-6">
                  <div className="flex items-start gap-4 rounded-[16px_6px_16px_16px] border border-accent/30 bg-accent/[0.07] p-5">
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent text-[#070807]">
                      <Check size={16} strokeWidth={3} />
                    </span>
                    <div>
                      <p className="font-medium text-text-primary">{t.successBody}</p>
                      {ref && (
                        <p className="mt-1 font-mono text-xs uppercase tracking-[0.1em] text-text-muted">
                          {t.ref}: {ref}
                        </p>
                      )}
                    </div>
                  </div>

                  {showFull ? (
                    <ContactForm
                      locale={locale}
                      compact
                      hideSelector
                      defaultCategory={category}
                      variant="panel"
                      id={`${id}-full`}
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowFull(true)}
                      className="tap text-sm font-semibold text-text-primary underline decoration-accent underline-offset-4"
                    >
                      {t.addDetails}
                    </button>
                  )}
                </div>
              ) : (
                <form onSubmit={submit} noValidate className="space-y-5">
                  <div>
                    <label htmlFor={`${id}-contact`} className="mb-2 block text-sm font-medium text-text-primary">
                      {t.contact}
                    </label>
                    <input
                      ref={firstFieldRef}
                      id={`${id}-contact`}
                      name="contact"
                      type="text"
                      inputMode="text"
                      autoComplete="email"
                      placeholder={t.contactPlaceholder}
                      value={contact}
                      onChange={(event) => setContact(event.target.value)}
                      aria-invalid={errors.contact ? true : undefined}
                      aria-describedby={errors.contact ? `${id}-contact-error` : undefined}
                      className={cn(
                        "min-h-12 w-full min-w-0 rounded-[12px_4px_12px_12px] border bg-[#111412] px-4 text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-accent",
                        errors.contact ? "border-red-400/70" : "border-border-strong"
                      )}
                    />
                    {errors.contact && (
                      <p id={`${id}-contact-error`} className="mt-2 text-sm text-red-300">
                        {errors.contact}
                      </p>
                    )}
                  </div>

                  <fieldset>
                    <legend className="mb-2 block text-sm font-medium text-text-primary">{t.about}</legend>
                    <div className="mb-3 flex flex-wrap gap-2">
                      {(Object.keys(t.chips) as Category[]).map((key) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setCategory(key)}
                          aria-pressed={category === key}
                          className={cn(
                            "min-h-11 rounded-full border px-4 text-sm font-medium transition-colors",
                            category === key
                              ? "border-accent bg-accent/15 text-text-primary"
                              : "border-border-strong text-text-secondary hover:border-text-secondary hover:text-text-primary"
                          )}
                        >
                          {t.chips[key]}
                        </button>
                      ))}
                    </div>
                    <textarea
                      id={`${id}-message`}
                      name="message"
                      rows={3}
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      placeholder={t.aboutPlaceholder}
                      aria-invalid={errors.message ? true : undefined}
                      aria-describedby={errors.message ? `${id}-message-error` : undefined}
                      className={cn(
                        "min-h-24 w-full min-w-0 resize-y rounded-[12px_4px_12px_12px] border bg-[#111412] px-4 py-3 text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-accent",
                        errors.message ? "border-red-400/70" : "border-border-strong"
                      )}
                    />
                    {errors.message && (
                      <p id={`${id}-message-error`} className="mt-2 text-sm text-red-300">
                        {errors.message}
                      </p>
                    )}
                  </fieldset>

                  <div>
                    <label htmlFor={`${id}-name`} className="mb-2 block text-sm font-medium text-text-primary">
                      {t.name} <span className="font-normal text-text-muted">{t.optional}</span>
                    </label>
                    <input
                      id={`${id}-name`}
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      className="min-h-12 w-full min-w-0 rounded-[12px_4px_12px_12px] border border-border-strong bg-[#111412] px-4 text-text-primary outline-none transition-colors focus:border-accent"
                    />
                  </div>

                  {status === "error" && (
                    <div role="alert" className="rounded-[12px_4px_12px_12px] border border-red-400/40 bg-red-400/10 p-4 text-sm text-text-primary">
                      <p className="font-medium">{t.errorTitle}</p>
                      <p className="mt-1 text-text-secondary">{t.errorBody}</p>
                      <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                        <a href={`tel:${CONTACT.phoneE164}`} className="tap font-medium text-accent-soft underline underline-offset-4">
                          {CONTACT.phone}
                        </a>
                        <a href={`mailto:${CONTACT.email}`} className="tap font-medium text-accent-soft underline underline-offset-4">
                          {CONTACT.email}
                        </a>
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSending}
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[12px_4px_12px_12px] border border-accent bg-[#91a9a1] px-5 font-semibold text-[#070807] transition-[background-color,transform] hover:bg-accent-soft active:scale-[.99] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSending ? (
                      <>
                        <Loader2 size={17} className="animate-spin" />
                        {t.sending}
                      </>
                    ) : (
                      <>
                        {t.submit}
                        <ArrowRight size={17} />
                      </>
                    )}
                  </button>

                  <p className="text-xs leading-relaxed text-text-muted">
                    {t.consent}{" "}
                    <a
                      href={locale === "sv" ? "/sv/privacy/" : "/privacy/"}
                      className="underline decoration-border-strong underline-offset-2 hover:text-text-secondary"
                    >
                      {t.privacy}
                    </a>
                    .
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </QuickQuoteContext.Provider>
  );
}

/**
 * The primary CTA. Renders a real link to the full form so the page still works
 * without JavaScript; with JS the click opens the panel instead of navigating.
 */
export function QuoteCta({
  locale = "en",
  source,
  category,
  className,
  children,
  variant = "primary",
  icon,
  onClick,
}: {
  locale?: Locale;
  source: string;
  category?: Category;
  className?: string;
  children?: ReactNode;
  variant?: "primary" | "link";
  icon?: ReactNode;
  /** Side effect before the panel opens (e.g. closing the mobile menu). */
  onClick?: () => void;
}) {
  const quick = useQuickQuote();
  const pathname = usePathname();
  // On the contact page the full form is already on screen — there the CTA
  // scrolls to it instead of opening a panel on top of it.
  const onContactPage = !!pathname && /(^|\/)contact\/?$/.test(pathname);
  const base =
    variant === "primary"
      ? "inline-flex min-h-12 items-center justify-center gap-2 rounded-[16px_6px_16px_16px] border border-accent bg-[#91a9a1] px-6 font-medium text-[#070807] shadow-[0_12px_34px_rgba(0,0,0,.16)] transition-[background-color,box-shadow,transform] duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-0.5 hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[.985]"
      : "inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-text-primary underline decoration-accent underline-offset-4 transition-colors hover:text-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  const label = children ?? (locale === "sv" ? "Få offert" : "Get a quote");
  const href = locale === "sv" ? "/sv/contact/#contact-form" : "/contact/#contact-form";

  return (
    <a
      href={href}
      onClick={(event) => {
        // Without a provider (or with JS disabled) the link simply navigates.
        console.log("[quote-cta] click", { hasCtx: !!quick, onContactPage, href });
        onClick?.();
        if (!quick || onContactPage) return;
        event.preventDefault();
        quick.open({ source, category });
      }}
      className={cn(base, className)}
      data-quick={quick ? "yes" : "no"}
    >
      {label}
      {icon}
    </a>
  );
}
