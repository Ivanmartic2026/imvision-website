"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Locale, localizedHref } from "@/lib/i18n";

/* ------------------------------------------------------------------ */
/* Proof band — the one evidence row on the home page.                 */
/*                                                                     */
/* Rules baked into this component:                                    */
/*  • Every figure is a property of a delivered, verified project and   */
/*    is read from the project dataset — nothing is invented here.      */
/*  • No self-assessed scores (satisfaction %, years, project counts)   */
/*    until the owner has confirmed them with a source. See             */
/*    docs/claims-register.md.                                         */
/*  • No project cards: the archive/slider already shows the projects,  */
/*    so this band carries the numbers and the client names only.       */
/* ------------------------------------------------------------------ */

interface ProofFact {
  value: string;
  label: string;
}

const facts: Record<Locale, ProofFact[]> = {
  sv: [
    { value: "525 m²", label: "The Icon, Westfield Mall of Scandinavia" },
    { value: "40 m²", label: "The Curve, Westfield Täby Centrum" },
    { value: "Ca 160 platser", label: "Kappahl, butiksnätverk i sex länder" },
  ],
  en: [
    { value: "525 m²", label: "The Icon, Westfield Mall of Scandinavia" },
    { value: "40 m²", label: "The Curve, Westfield Täby Centrum" },
    { value: "~160 locations", label: "Kappahl, in-store network in six countries" },
  ],
};

const clients =
  "The Icon · The Halo · The Curve · The Geminis · Kappahl · SAS · Boland City · Nordstan";

export function ProofSection({ locale = "en" }: { locale?: Locale }) {
  return (
    <section className="section section-space bg-background" aria-labelledby="proof-title">
      <div className="section-inner">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionLabel>{locale === "sv" ? "Bevis" : "Proof"}</SectionLabel>
            <h2 id="proof-title" className="heading-section mt-8 max-w-[16ch]">
              {locale === "sv"
                ? "Levererat. Installerat. I drift."
                : "Delivered. Installed. In operation."}
            </h2>
            <p className="body mt-6 max-w-md text-text-secondary">
              {locale === "sv"
                ? "Måtten nedan är hämtade från projekt vi levererat och installerar. Fler finns i projektarkivet."
                : "The figures below come from projects we delivered and installed. More of them live in the project archive."}
            </p>
            <Link
              href={localizedHref(locale, "/projects/")}
              prefetch={false}
              className="tap group mt-8 gap-2 border-b border-accent text-sm font-semibold text-text-primary"
            >
              {locale === "sv" ? "Se alla projekt" : "See all projects"}
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          <div className="lg:col-span-7">
            <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-[24px_8px_24px_24px] border border-border-subtle bg-border-subtle sm:grid-cols-3">
              {facts[locale].map((fact) => (
                <div key={fact.label} className="bg-bg-elevated px-6 py-8 sm:px-7 lg:py-10">
                  <dd className="font-[var(--font-heading)] text-3xl font-semibold leading-none tracking-[-0.03em] text-text-primary sm:text-4xl">
                    {fact.value}
                  </dd>
                  <dt className="mt-3 text-sm leading-relaxed text-text-secondary">
                    {fact.label}
                  </dt>
                </div>
              ))}
            </dl>
            <p className="mt-8 border-t border-border-subtle pt-6 text-sm leading-relaxed text-text-muted">
              {locale === "sv" ? "Bland våra projekt: " : "Among our projects: "}
              <span className="text-text-secondary">{clients}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
