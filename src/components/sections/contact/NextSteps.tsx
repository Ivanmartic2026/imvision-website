"use client";

import { Clock, Phone, Mail, CheckCircle } from "lucide-react";
import { ContactCategory } from "./types";

interface NextStepsProps {
  locale: "en" | "sv";
  category: ContactCategory;
}

/**
 * Stegvis "Vad händer nu?"-tidslinje med punktlista och direktkontakt.
 * Anpassar innehåll efter kategori (service vs buy/rental).
 */
export function NextSteps({ locale, category }: NextStepsProps) {
  const isService = category === "service";

  /* ───────── Step definitions ───────── */

  const steps = isService
    ? [
        {
          step: "01",
          title: locale === "sv" ? "Ärendet är registrerat" : "Case is registered",
          desc: locale === "sv"
            ? "Ditt ärende finns nu hos vår supportavdelning med all information du har angett."
            : "Your case is now with our support team with all the information you provided.",
        },
        {
          step: "02",
          title: locale === "sv" ? "Tekniker bedömer felet" : "Technician assesses the issue",
          desc: locale === "sv"
            ? "En tekniker granskar beskrivningen och avgör vilken åtgärd som krävs."
            : "A technician reviews the description and determines what action is needed.",
        },
        {
          step: "03",
          title: locale === "sv" ? "Åtgärd och återkoppling" : "Action and follow-up",
          desc: locale === "sv"
            ? "Du får återkoppling med förslag på åtgärd, tidsplan och eventuella reservdelar."
            : "You'll receive a response with proposed action, timeline, and any spare parts required.",
        },
      ]
    : [
        {
          step: "01",
          title: locale === "sv" ? "Vi läser din förfrågan" : "We review your enquiry",
          desc: locale === "sv"
            ? "Vi går igenom dina uppgifter och bedömer vad som behövs."
            : "We review your details and assess what is needed.",
        },
        {
          step: "02",
          title: locale === "sv" ? "Rätt person hör av sig" : "The right person reaches out",
          desc: locale === "sv"
            ? "En säljare med rätt kompetens kontaktar dig för att stämma av behov och förutsättningar."
            : "A salesperson with the right expertise contacts you to confirm requirements and conditions.",
        },
        {
          step: "03",
          title: locale === "sv" ? "Förslag och offert" : "Proposal and quotation",
          desc: locale === "sv"
            ? "Du får ett förslag på lösning med offert — vid behov bokar vi platsbesök."
            : "You'll receive a proposed solution with a quotation — if needed, we schedule a site visit.",
        },
      ];

  /* ───────── What we need from you ───────── */

  const needs = isService
    ? [
        locale === "sv" ? "Installationens namn och plats (t.ex. \"Mall of Scandinavia, sal 3\")" : "Installation name and location (e.g. \"Mall of Scandinavia, hall 3\")",
        locale === "sv" ? "Vad som visas på skärmen just nu (svart skärm, felkod, färgfel o.s.v.)" : "What is shown on the screen right now (black screen, error code, colour fault, etc.)",
        locale === "sv" ? "När felet började och om det gäller hela eller delar av skärmen" : "When the issue started and whether it affects the whole or part of the screen",
        locale === "sv" ? "Eventuella foton eller en kort video av felet" : "Any photos or a short video of the fault",
      ]
    : [
        locale === "sv" ? "Platsen / fastigheten där skärmen ska placeras (indoor/outdoor)" : "The location / building where the screen will be placed (indoor/outdoor)",
        locale === "sv" ? "Önskad storlek och placering, eller bifogade ritningar" : "Desired size and placement, or attached drawings",
        locale === "sv" ? "Tidsplan — när behöver skärmen vara igång?" : "Timeline — when do you need the screen up and running?",
        locale === "sv" ? "Om ni har foton på platsen eller begagnat material" : "If you have photos of the site or any used equipment",
      ];

  /* ───────── Contact details ───────── */

  const phone = "010 330 46 36";
  const email = isService ? "service@imvision.se" : "info@imvision.se";

  /* ───────── Emergency line for service ───────── */

  const emergency = isService
    ? locale === "sv"
      ? "Akut driftstopp? Ring oss direkt på"
      : "Critical downtime? Call us directly at"
    : null;

  return (
    <div className="mt-8 space-y-6">
      {/* Timeline */}
      <div className="space-y-0">
        {steps.map((s, i) => (
          <div
            key={i}
            className={`flex items-start gap-4 border-l-2 pl-5 ${
              i < steps.length - 1 ? "border-border-subtle" : "border-accent"
            }`}
          >
            {/* Step number */}
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[12px_4px_12px_12px] bg-accent/10 text-sm font-semibold text-accent">
              {s.step}
            </span>

            {/* Content */}
            <div className="flex-1 pt-1">
              <p className="text-sm font-semibold text-text-primary">{s.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-text-secondary">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Time estimate */}
      <div className="flex items-center gap-2 rounded-[12px_4px_12px_12px] bg-accent/10 px-4 py-2.5">
        <Clock size={16} className="shrink-0 text-accent" />
        <span className="text-sm font-medium text-text-secondary">
          {locale === "sv" ? "Normalt samma arbetsdag — vi återkommer veckodagar 08:00–17:00" : "Usually the same business day — we reply on weekdays 08:00–17:00"}
        </span>
      </div>

      {/* Emergency line (service only) */}
      {emergency && (
        <p className="text-sm font-medium text-text-secondary">
          {emergency}{" "}
          <a href="tel:+46103304636" className="font-semibold text-accent underline underline-offset-4 hover:text-accent-dim">
            {phone}
          </a>
          .
        </p>
      )}

      {/* What we need from you */}
      <div className="rounded-[16px_6px_16px_16px] border border-border-subtle bg-bg-surface p-5">
        <p className="text-sm font-semibold text-text-primary">
          {isService
            ? locale === "sv"
              ? "Vad vi behöver från dig"
              : "What we need from you"
            : locale === "sv"
              ? "Förbered detta för att snabba på ärendet"
              : "Prepare this to speed things up"}
        </p>
        <ul className="mt-3 space-y-2">
          {needs.map((n, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
              <CheckCircle size={16} className="mt-0.5 shrink-0 text-accent/70" />
              <span>{n}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Direct contact */}
      <div className="flex flex-col gap-2 rounded-[16px_6px_16px_16px] border border-border-subtle bg-bg-surface px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
        <div className="flex items-center gap-6 text-sm text-text-secondary">
          <a
            href={`tel:+46103304636`}
            className="inline-flex min-h-11 items-center gap-1.5 font-medium text-text-primary underline underline-offset-4 transition-colors hover:text-accent focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Phone size={14} />
            {phone}
          </a>
          <a
            href={`mailto:${email}`}
            className="inline-flex min-h-11 items-center gap-1.5 font-medium text-text-primary underline underline-offset-4 transition-colors hover:text-accent focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Mail size={14} />
            {email}
          </a>
        </div>
      </div>
    </div>
  );
}
