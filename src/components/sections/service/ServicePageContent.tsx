"use client";

import { useState } from "react";
import Link from "next/link";
import { Headphones, Settings, ShieldCheck, Zap, ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/sections/ContactForm";
import { Reveal } from "@/components/effects/Reveal";
import { StaggerReveal, StaggerItem } from "@/components/effects/StaggerReveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { Locale } from "@/lib/i18n";
import { serviceLd } from "@/lib/seo";
import { localizedHref } from "@/lib/i18n";

const copy = {
  en: {
    label: "Service",
    title: "We stay with you after install.",
    description: "Monitoring, maintenance, and long-term support for reliable operation.",
    servicesTitle: "What our service covers",
    services: [
      {
        icon: Headphones,
        title: "Service desk",
        description:
          "One team to diagnose the issue, dispatch a technician and keep you updated until the screen is back.",
      },
      {
        icon: Settings,
        title: "Preventive Maintenance",
        description:
          "Scheduled inspections, cleaning, and calibration extend the life of your display.",
      },
      {
        icon: ShieldCheck,
        title: "SLA Coverage",
        description:
          "Agreed service levels, spare module programs and a maintenance plan for your installation.",
      },
      {
        icon: Zap,
        title: "Remote Monitoring",
        description:
          "Cloud-connected diagnostics alert us to issues before they affect your audience.",
      },
    ],
    tiersTitle: "Service levels designed for your needs",
    tiers: [
      {
        name: "Essential",
        price: "Custom",
        features: [
          "Business-hours support",
          "Remote diagnostics",
          "Annual health check",
          "Discounted spare parts",
        ],
      },
      {
        name: "Professional",
        price: "Custom",
        features: [
          "Priority phone support",
          "Remote monitoring",
          "Quarterly maintenance",
          "Priority on-site response",
        ],
      },
      {
        name: "Enterprise",
        price: "Custom",
        features: [
          "Dedicated account manager",
          "Agreed uptime and response levels",
          "On-site spare inventory",
          "Custom training program",
        ],
      },
    ],
    ctaTitle: "Protect your investment",
    ctaBody:
      "Talk to our service team about a maintenance plan tailored to your installation.",
    ctaButton: "Get a service quote",
    serviceName: "LED service and support",
    serviceDescription:
      "Installation, monitoring, maintenance and long-term support for LED displays — priority response from the team that built your system.",
    serviceType: "LED service",
  },
  sv: {
    label: "Service",
    title: "Vårt ansvar slutar inte vid installationen.",
    description:
      "Från driftsättning och övervakning till underhåll och långsiktig support — för att systemet ska fungera optimalt över tid.",
    servicesTitle: "Vad vår service omfattar",
    services: [
      {
        icon: Headphones,
        title: "Teknisk support",
        description:
          "Vår supportorganisation finns tillgänglig för att diagnosticera problem och samordna snabb respons.",
      },
      {
        icon: Settings,
        title: "Förebyggande underhåll",
        description:
          "Planerad inspektion, rengöring och kalibrering förlänger displayens livslängd.",
      },
      {
        icon: ShieldCheck,
        title: "Serviceavtal",
        description:
          "Avtalade servicenivåer, reservdelsprogram och en underhållsplan för er installation.",
      },
      {
        icon: Zap,
        title: "Fjärrövervakning",
        description:
          "Ansluten diagnostik varnar oss om avvikelser innan de påverkar er publik.",
      },
    ],
    tiersTitle: "Servicenivåer anpassade efter era behov",
    tiers: [
      {
        name: "Essential",
        price: "Enligt överenskommelse",
        features: [
          "Support under kontorstid",
          "Fjärrdiagnostik",
          "Årlig hälsokontroll",
          "Rabatterade reservdelar",
        ],
      },
      {
        name: "Professional",
        price: "Enligt överenskommelse",
        features: [
          "Prioriterad telefonsupport",
          "Fjärrövervakning",
          "Kvartalsvis underhåll",
          "Prioriterad respons på plats",
        ],
      },
      {
        name: "Enterprise",
        price: "Enligt överenskommelse",
        features: [
          "Dedikerad kundansvarig",
          "Avtalade drift- och responstider",
          "Reservdelslager på plats",
          "Anpassat utbildningsprogram",
        ],
      },
    ],
    ctaTitle: "Skydda investeringen",
    ctaBody: "Prata med vårt serviceteam om en underhållsplan anpassad efter er installation.",
    ctaButton: "Få serviceoffert",
    serviceName: "LED-service och support",
    serviceDescription:
      "Installation, övervakning, underhåll och långsiktig support för LED-system — prioriterad respons från teamet som byggde er installation.",
    serviceType: "LED-service",
  },
};

export function ServicePageContent({ locale = "en" }: { locale?: Locale }) {
  const t = copy[locale];
  const [ticketOpen, setTicketOpen] = useState(false);

  const ticket = {
    heading: locale === "sv" ? "Anmäl ett serviceärende" : "Report a service ticket",
    body:
      locale === "sv"
        ? "Har ni ett tekniskt problem eller behöver ni support på en installation? Anmäl ärendet så återkommer vi inom 24 timmar."
        : "Have a technical issue or need support on an installation? Report it and we reply within 24 hours.",
    button: locale === "sv" ? "Anmäl serviceärende" : "Report a service ticket",
  };

  return (
    <>
      <Header locale={locale} />
      <main id="main-content">
        <PageHeader label={t.label} title={t.title} description={t.description} />

        {/* Service ticket — first thing on the page. A single clear CTA that
            reveals the (category-locked) service enquiry form on click. */}
        <section
          id="service-enquiry"
          className="theme-light section bg-background scroll-mt-24 !pt-12 !pb-16 md:!pt-16 lg:!pt-20"
        >
          <div className="section-inner">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="h2-sub">
                {ticket.heading}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-text-secondary">{ticket.body}</p>
              {!ticketOpen ? (
                <div className="mt-8 flex flex-col items-center gap-4">
                  <Button
                    type="button"
                    onClick={() => setTicketOpen(true)}
                    size="large"
                    icon={<ArrowRight size={18} />}
                  >
                    {ticket.button}
                  </Button>
                  {/* Service = agreements and maintenance; Support = tickets,
                      documentation and FAQs. The two pages must point at each
                      other so nobody lands on the wrong one. */}
                  <Link
                    href={localizedHref(locale, "/support/")}
                    className="tap gap-2 text-sm font-medium text-text-secondary underline decoration-accent/60 underline-offset-4 transition-colors hover:text-text-primary"
                  >
                    {locale === "sv"
                      ? "Söker ni dokumentation eller vanliga frågor? Gå till Support"
                      : "Looking for documentation or FAQs? Go to Support"}
                  </Link>
                </div>
              ) : (
                <div className="mt-10 text-left">
                  <ContactForm locale={locale} compact hideSelector defaultCategory="service" />
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="section section-space" aria-labelledby="service-capabilities">
          <div className="section-inner">
            <h2 id="service-capabilities" className="sr-only">
              {t.servicesTitle}
            </h2>
            <StaggerReveal className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {t.services.map((service) => (
                <StaggerItem key={service.title}>
                  <div className="premium-card h-full bg-bg-elevated p-8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-[12px_4px_12px_12px] bg-accent/10 text-accent">
                      <service.icon size={26} strokeWidth={1.5} />
                    </div>
                    <h3 className="mt-8 text-xl font-medium text-text-primary">{service.title}</h3>
                    <p className="mt-3 text-text-secondary">{service.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
      <JsonLd
        data={serviceLd(locale, {
          name: t.serviceName,
          description: t.serviceDescription,
          serviceType: t.serviceType,
        })}
      />
    </>
  );
}
