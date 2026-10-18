"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { CONTACT } from "@/lib/seo";
import { Button } from "@/components/ui/Button";

/**
 * Rental mini-enquiry: date, place and approximate size — the three things
 * needed to quote a rental without a phone call. It posts to the same
 * /api/contact endpoint as every other form (categoryKey=rental), so the
 * enquiry lands in the same Flow inbox.
 */
const copy = {
  sv: {
    eyebrow: "Snabbförfrågan för uthyrning",
    title: "Datum, plats och storlek. Mer behöver vi inte för att börja.",
    date: "Datum eller period",
    place: "Plats",
    size: "Ungefärlig storlek",
    sizePlaceholder: "t.ex. 6 × 3 m",
    contact: "E-post eller telefon",
    submit: "Skicka förfrågan",
    sending: "Skickar…",
    success: "Tack — vi återkommer inom 24 timmar med ett hyresförslag.",
    error: "Förfrågan kunde inte skickas. Ring eller mejla oss i stället:",
    required: "Fyll i datum, plats och storlek.",
    contactRequired: "Ange e-post eller telefon så vi kan svara.",
  },
  en: {
    eyebrow: "Rental enquiry",
    title: "Date, place and size. That is all we need to start.",
    date: "Date or period",
    place: "Place",
    size: "Approximate size",
    sizePlaceholder: "e.g. 6 × 3 m",
    contact: "Email or phone",
    submit: "Send enquiry",
    sending: "Sending…",
    success: "Thank you — we come back within 24 hours with a rental proposal.",
    error: "The enquiry could not be sent. Call or email us instead:",
    required: "Fill in date, place and size.",
    contactRequired: "Add an email or phone number so we can reply.",
  },
};

export function RentalQuickForm({ locale = "en" }: { locale?: Locale }) {
  const t = copy[locale];
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");
  const [size, setSize] = useState("");
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;
    if (!date.trim() || !place.trim() || !size.trim()) {
      setError(t.required);
      return;
    }
    if (!contact.trim()) {
      setError(t.contactRequired);
      return;
    }
    setError(null);
    setStatus("sending");

    const isEmail = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(contact.trim());
    const body = new FormData();
    body.set("kind", "quick");
    body.set("category", locale === "sv" ? "Hyra" : "Rent");
    body.set("categoryKey", "rental");
    body.set("message", `Datum: ${date}. Plats: ${place}. Storlek: ${size}.`);
    body.set("eventDate", date);
    body.set("location", place);
    body.set("name", locale === "sv" ? "Snabbförfrågan uthyrning" : "Rental quick enquiry");
    if (isEmail) body.set("email", contact.trim());
    else body.set("phone", contact.trim());
    body.set("source", `rental_mini_form — ${window.location.pathname}`);
    body.set("honeypot", "");

    try {
      const res = await fetch("/api/contact/", { method: "POST", body });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean };
      if (!res.ok || !json.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
      setDate("");
      setPlace("");
      setSize("");
      setContact("");
    } catch {
      setStatus("error");
    }
  };

  const field = "min-h-12 w-full min-w-0 rounded-[12px_4px_12px_12px] border border-border-strong bg-[#111412] px-4 text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-accent";

  return (
    <section className="section section-space bg-bg-elevated" aria-labelledby="rental-quick-title">
      <div className="section-inner">
        <div className="light-gate border border-border-subtle bg-bg-surface p-8 sm:p-12 lg:p-16">
          <p className="eyebrow text-accent">{t.eyebrow}</p>
          <h2 id="rental-quick-title" className="heading-section mt-6 max-w-[24ch]">
            {t.title}
          </h2>

          {status === "success" ? (
            <p role="status" className="mt-8 flex items-start gap-3 text-lg text-text-primary">
              <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-[#070807]">
                <Check size={14} strokeWidth={3} />
              </span>
              {t.success}
            </p>
          ) : (
            <form onSubmit={submit} noValidate className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label htmlFor="rental-date" className="mb-2 block text-sm font-medium text-text-primary">
                  {t.date}
                </label>
                <input id="rental-date" name="date" value={date} onChange={(e) => setDate(e.target.value)} className={field} placeholder="2026-05-14" />
              </div>
              <div>
                <label htmlFor="rental-place" className="mb-2 block text-sm font-medium text-text-primary">
                  {t.place}
                </label>
                <input id="rental-place" name="place" value={place} onChange={(e) => setPlace(e.target.value)} className={field} placeholder={locale === "sv" ? "Stockholm" : "Stockholm"} />
              </div>
              <div>
                <label htmlFor="rental-size" className="mb-2 block text-sm font-medium text-text-primary">
                  {t.size}
                </label>
                <input id="rental-size" name="size" value={size} onChange={(e) => setSize(e.target.value)} className={field} placeholder={t.sizePlaceholder} />
              </div>
              <div>
                <label htmlFor="rental-contact" className="mb-2 block text-sm font-medium text-text-primary">
                  {t.contact}
                </label>
                <input id="rental-contact" name="contact" value={contact} onChange={(e) => setContact(e.target.value)} className={field} autoComplete="email" />
              </div>

              {error && (
                <p role="alert" className="text-sm text-red-300 sm:col-span-2 lg:col-span-4">
                  {error}
                </p>
              )}
              {status === "error" && (
                <p role="alert" className="text-sm text-text-secondary sm:col-span-2 lg:col-span-4">
                  {t.error}{" "}
                  <a href={`tel:${CONTACT.phoneE164}`} className="tap font-medium text-accent-soft underline underline-offset-4">
                    {CONTACT.phone}
                  </a>{" "}
                  ·{" "}
                  <a href={`mailto:${CONTACT.email}`} className="tap font-medium text-accent-soft underline underline-offset-4">
                    {CONTACT.email}
                  </a>
                </p>
              )}

              <div className="sm:col-span-2 lg:col-span-4">
                <Button
                  type="submit"
                  size="md"
                  loading={status === "sending"}
                  disabled={status === "sending"}
                  icon={<ArrowRight size={17} />}
                >
                  {status === "sending" ? t.sending : t.submit}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
