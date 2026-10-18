import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Locale, localizedHref } from "@/lib/i18n";
import { SOCIAL_LINKS, CONTACT, STOCKHOLM_LOCATION } from "@/lib/seo";
import { SOCIAL_ICONS } from "@/components/ui/social-icons";
import { CookieSettingsLink } from "@/components/providers/CookieSettingsLink";

const footerGroups: Array<{
  title: Record<Locale, string>;
  links: Array<[Record<Locale, string>, string]>;
}> = [
  {
    title: { en: "Solutions", sv: "Lösningar" },
    links: [
      [{ en: "Buy LED", sv: "Köpa LED" }, "/sales/"],
      [{ en: "Rent LED", sv: "Hyra LED" }, "/rental/"],
      [{ en: "Service & support", sv: "Service och support" }, "/service/"],
    ],
  },
  {
    title: { en: "Explore", sv: "Utforska" },
    links: [
      [{ en: "Projects", sv: "Projekt" }, "/projects/"],
      [{ en: "Support", sv: "Support" }, "/support/"],
      [{ en: "About IM Vision", sv: "Om IM Vision" }, "/about/"],
      [{ en: "Contact", sv: "Kontakt" }, "/contact/"],
    ],
  },
];

export function Footer({ locale = "en" }: { locale?: Locale }) {
  return (
    <footer className="theme-dark border-t border-border-subtle bg-[#070807]">
      <div className="section py-16 lg:py-24">
        <div className="section-inner">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Link href={localizedHref(locale, "/")} prefetch={false} className="tap -ml-1 w-fit px-1" aria-label={locale === "sv" ? "IM Vision – till startsidan" : "IM Vision – back to home"}>
                <Image src="/logo.png" alt="IM Vision" width={150} height={41} className="h-7 w-auto" />
              </Link>
              <p className="mt-7 max-w-md text-lg leading-relaxed text-text-secondary">
                {locale === "sv"
                  ? "IM Vision utvecklar, levererar och installerar professionella LED-lösningar för permanenta installationer och event i Norden och Europa. Med egen projektering, installation och service säkerställer vi kvalitet genom hela projektets livscykel."
                  : "IM Vision develops, supplies, and installs professional LED solutions for permanent installations and events throughout the Nordics and Europe. With in-house engineering, installation, and service, we ensure quality throughout the project lifecycle."}
              </p>
              <Link
                href={localizedHref(locale, "/contact/")}
                prefetch={false}
                className="tap group mt-8 gap-2 border-b border-accent text-sm font-semibold text-text-primary"
              >
                {locale === "sv" ? "Få offert" : "Get a quote"}
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            {footerGroups.map((group) => (
              <nav key={group.title.en} aria-label={group.title[locale]} className="lg:col-span-2">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">
                  {group.title[locale]}
                </p>
                <ul className="mt-5 space-y-3">
                  {group.links.map(([label, href]) => (
                    <li key={label.en}>
                      <Link href={localizedHref(locale, href)} prefetch={false} className="tap text-sm text-text-secondary transition-colors hover:text-text-primary">
                        {label[locale]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <nav aria-label={locale === "sv" ? "Kontakt" : "Contact"} className="lg:col-span-2">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">
                {locale === "sv" ? "Kontakt" : "Contact"}
              </p>
              <div className="mt-5 space-y-3 text-sm text-text-secondary">
                <a href="mailto:info@imvision.se" className="tap-block transition-colors hover:text-text-primary">info@imvision.se</a>
                <a href="tel:+46103304636" className="tap-block transition-colors hover:text-text-primary">010 330 46 36</a>
                {[
                  { label: locale === "sv" ? "Huvudkontor" : "Head office", street: CONTACT.street, line2: `${CONTACT.postalCode} ${CONTACT.locality}` },
                  { label: locale === "sv" ? "Lager & kontor" : "Warehouse & office", street: STOCKHOLM_LOCATION.street, line2: `${STOCKHOLM_LOCATION.postalCode} ${STOCKHOLM_LOCATION.locality}` },
                ].map((office) => (
                  <a
                    key={office.street}
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${office.street}, ${office.line2}, Sweden`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 flex-col justify-center leading-snug transition-colors hover:text-text-primary"
                  >
                    <span className="block text-[11px] uppercase tracking-[0.12em] text-text-muted">{office.label}</span>
                    {office.street}, {office.line2}
                  </a>
                ))}
                <div className="flex items-center gap-4 pt-2">
                  {SOCIAL_LINKS.map(({ platform, url }) => {
                    const Icon = SOCIAL_ICONS[platform];
                    return (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={
                          locale === "sv"
                            ? `Följ IM Vision på ${platform}`
                            : `Follow IM Vision on ${platform}`
                        }
                        className="inline-flex h-11 w-11 items-center justify-center rounded-[12px_4px_12px_12px] text-text-muted transition-colors hover:text-accent"
                      >
                        <Icon />
                      </a>
                    );
                  })}
                </div>
              </div>
            </nav>
          </div>

          <div className="mt-16 flex flex-col gap-4 border-t border-border-subtle pt-6 text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between">
            {/* Legal identity — owner-confirmed values live in lib/seo.ts. */}
            <p>
              © {new Date().getFullYear()} {CONTACT.legalName} · {locale === "sv" ? "Org.nr" : "Reg. no."}{" "}
              {CONTACT.orgNumber}. {locale === "sv" ? "Alla rättigheter förbehållna." : "All rights reserved."}
            </p>
            {/* Wraps: the Swedish labels are long and the row gained a fourth item
                (Servicevillkor). Without flex-wrap the row overflowed the mobile
                viewport by ~47px on every /sv/ page. */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Link href={localizedHref(locale, "/privacy/")} prefetch={false} className="tap min-w-11 justify-center transition-colors hover:text-text-primary">
                {locale === "sv" ? "Integritetspolicy" : "Privacy"}
              </Link>
              <span aria-hidden className="text-border-subtle">|</span>
              <Link href={localizedHref(locale, "/terms/")} prefetch={false} className="tap min-w-11 justify-center transition-colors hover:text-text-primary">
                {locale === "sv" ? "Användarvillkor" : "Terms"}
              </Link>
              {/* Swedish-only legal document — no English twin exists, so the link is
                  rendered for sv only. It was previously unreachable: 200 OK but zero
                  internal links and absent from the sitemap. */}
              {locale === "sv" && (
                <>
                  <span aria-hidden className="text-border-subtle">|</span>
                  <Link href="/sv/servicevillkor/" prefetch={false} className="tap min-w-11 justify-center transition-colors hover:text-text-primary">
                    Servicevillkor
                  </Link>
                </>
              )}
              <span aria-hidden className="text-border-subtle">|</span>
              <CookieSettingsLink locale={locale} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
