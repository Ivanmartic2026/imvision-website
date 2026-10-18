import { ReactNode } from "react";
import { Phone, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Locale } from "@/lib/i18n";
import { CONTACT } from "@/lib/seo";

interface ContactHeroProps {
  locale?: Locale;
  /** Small mono label above the headline. */
  label: string;
  title: string;
  description: string;
  /** The form panel, rendered in the right column on desktop and below the copy on mobile. */
  children: ReactNode;
}

/**
 * Split hero for the contact page: the copy answers "why and who", the right
 * column is the form itself. Deliberately static (no entrance animation) so the
 * h1 paints immediately as the LCP element and the form is usable before — and
 * without — hydration.
 */
export function ContactHero({ locale = "en", label, title, description, children }: ContactHeroProps) {
  const isSv = locale === "sv";
  const words = title.trim().split(" ");
  const last = words.length > 1 ? words.pop()! : "";
  const head = words.join(" ");

  const bullets = isSv
    ? ["Svar inom 24 timmar", "Installation, drift och service i Norden och Europa"]
    : ["Reply within 24 hours", "Installation, operation and service across the Nordics and Europe"];

  return (
    <section className="relative w-full overflow-hidden bg-background pb-10 pt-[84px] md:pt-[88px] lg:pb-12 lg:pt-[84px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_2%,rgba(145,169,161,0.12),transparent_46%)]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "linear-gradient(to bottom, transparent, #000 60%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, #000 60%, transparent)",
        }}
      />
      <div className="section relative z-10 w-full">
        <div className="section-inner max-w-6xl">
          <div className="grid grid-cols-1 items-start gap-9 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
            <div className="min-w-0 lg:pt-3">
              <span className="mb-6 inline-flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-accent">
                <span className="h-px w-8 bg-accent" />
                {label}
              </span>
              <h1 className="max-w-[18ch] text-balance text-[clamp(2.45rem,4.4vw,3.6rem)] font-[470] leading-[1.02] tracking-[-0.04em] text-text-primary">
                {head}
                {last && (
                  <>
                    {" "}
                    <span className="text-accent-soft">{last}</span>
                  </>
                )}
              </h1>
              <p className="mt-6 max-w-[46ch] text-base leading-[1.75] text-text-secondary sm:text-lg">
                {description}
              </p>
              <ul className="mt-7 space-y-2.5">
                {bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5 text-sm text-text-secondary">
                    <Check size={16} strokeWidth={2.2} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                    {bullet}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-border-subtle pt-6">
                <Button href={`tel:${CONTACT.phoneE164}`} variant="secondary" size="small">
                  <Phone size={15} strokeWidth={1.75} aria-hidden="true" />
                  {isSv ? "Ring" : "Call"} {CONTACT.phone}
                </Button>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="inline-flex min-h-11 items-center text-sm text-text-secondary underline decoration-border-strong underline-offset-4 transition-colors hover:text-accent-soft"
                >
                  {CONTACT.email}
                </a>
              </div>
            </div>
            <div className="min-w-0">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
