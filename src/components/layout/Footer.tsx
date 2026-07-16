import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Locale, localizedHref } from "@/lib/i18n";

const footerGroups: Array<{
  title: Record<Locale, string>;
  links: Array<[Record<Locale, string>, string]>;
}> = [
  {
    title: { en: "Solutions", sv: "Lösningar" },
    links: [
      [{ en: "Buy LED", sv: "Köpa LED" }, "/sales/"],
      [{ en: "Rent LED", sv: "Hyra LED" }, "/rental/"],
      [{ en: "Service & support", sv: "Service & support" }, "/service/"],
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
    <footer className="border-t border-border-subtle bg-[#070807]">
      <div className="section py-16 lg:py-24">
        <div className="section-inner">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Image src="/logo.png" alt="IM Vision" width={150} height={41} className="h-7 w-auto" />
              <p className="mt-7 max-w-md text-lg leading-relaxed text-text-secondary">
                {locale === "sv"
                  ? "IM Vision utvecklar, levererar och installerar professionella LED-lösningar för permanenta installationer och event i hela Europa. Med egen projektering, installation och service säkerställer vi kvalitet genom hela projektets livscykel."
                  : "IM Vision develops, supplies, and installs professional LED solutions for permanent installations and events throughout Europe. With in-house engineering, installation, and service, we ensure quality throughout the project lifecycle."}
              </p>
              <Link
                href={localizedHref(locale, "/contact/")}
                className="group mt-8 inline-flex items-center gap-2 border-b border-accent pb-1 text-sm font-semibold text-text-primary"
              >
                {locale === "sv" ? "Starta ett projekt" : "Start a project"}
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            {footerGroups.map((group) => (
              <div key={group.title.en} className="lg:col-span-2">
                <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">
                  {group.title[locale]}
                </h2>
                <ul className="mt-5 space-y-3">
                  {group.links.map(([label, href]) => (
                    <li key={label.en}>
                      <Link href={localizedHref(locale, href)} className="text-sm text-text-secondary transition-colors hover:text-text-primary">
                        {label[locale]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="lg:col-span-2">
              <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">
                {locale === "sv" ? "Kontakt" : "Contact"}
              </h2>
              <div className="mt-5 space-y-3 text-sm text-text-secondary">
                <a href="mailto:sales@imvision.se" className="block transition-colors hover:text-text-primary">sales@imvision.se</a>
                <a href="tel:+46850520480" className="block transition-colors hover:text-text-primary">+46 8 505 204 80</a>
                <p>Spånga, {locale === "sv" ? "Sverige" : "Sweden"}</p>
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-col gap-4 border-t border-border-subtle pt-6 text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} IM Vision. {locale === "sv" ? "Alla rättigheter förbehållna." : "All rights reserved."}</p>
            <p className="font-mono uppercase tracking-[0.12em]">
              {locale === "sv" ? "Ljus, form och teknik i ett system." : "Architectural light, visibly engineered."}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
