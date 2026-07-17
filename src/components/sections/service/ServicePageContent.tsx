"use client";

import { Headphones, Settings, ShieldCheck, Zap, ArrowRight, CheckCircle } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { ServiceForm } from "@/components/sections/ServiceForm";
import { Reveal } from "@/components/effects/Reveal";
import { StaggerReveal, StaggerItem } from "@/components/effects/StaggerReveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { Locale, localizedHref } from "@/lib/i18n";
import { serviceLd } from "@/lib/seo";

const copy = {
  en: {
    label: "Service",
    title: "We stay with you after install.",
    description: "Monitoring, maintenance, and long-term support for reliable operation.",
    servicesTitle: "What our service covers",
    services: [
      {
        icon: Headphones,
        title: "24/7 Support",
        description:
          "Our support team is always available to diagnose issues and coordinate rapid response.",
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
          "Guaranteed response times, spare module programs, and uptime commitments.",
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
          "24/7 phone support",
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
          "Uptime SLA guarantees",
          "On-site spare inventory",
          "Custom training program",
        ],
      },
    ],
    ctaTitle: "Protect your investment",
    ctaBody:
      "Talk to our service team about a maintenance plan tailored to your installation.",
    ctaButton: "Talk to a Service Specialist",
    serviceName: "LED Service & Support",
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
          "Tydliga responstider, reservdelsprogram och drifttidsåtaganden anpassade efter er installation.",
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
          "Telefonsupport dygnet runt",
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
          "Drifttidsgarantier",
          "Reservdelslager på plats",
          "Anpassat utbildningsprogram",
        ],
      },
    ],
    ctaTitle: "Skydda investeringen",
    ctaBody: "Prata med vårt serviceteam om en underhållsplan anpassad efter er installation.",
    ctaButton: "Prata med serviceteamet",
    serviceName: "LED-service och support",
    serviceDescription:
      "Installation, övervakning, underhåll och långsiktig support för LED-system — prioriterad respons från teamet som byggde er installation.",
    serviceType: "LED-service",
  },
};

export function ServicePageContent({ locale = "en" }: { locale?: Locale }) {
  const t = copy[locale];

  return (
    <>
      <Header locale={locale} />
      <main id="main-content">
        <PageHeader label={t.label} title={t.title} description={t.description} />

        <section className="section section-space" aria-labelledby="service-capabilities">
          <div className="section-inner">
            <h2 id="service-capabilities" className="sr-only">
              {t.servicesTitle}
            </h2>
            <StaggerReveal className="grid gap-6 md:grid-cols-2">
              {t.services.map((service) => (
                <StaggerItem key={service.title}>
                  <div className="premium-card h-full bg-bg-elevated p-8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent">
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

        <section className="section section-space bg-bg-elevated">
          <div className="section-inner">
            <div className="mb-16 max-w-3xl">
              <Reveal>
                <h2 className="text-4xl font-[470] leading-[1.08] tracking-[-0.04em] text-text-primary sm:text-5xl">
                  {t.tiersTitle}
                </h2>
              </Reveal>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {t.tiers.map((tier, index) => (
                <Reveal key={tier.name} delay={index * 0.1}>
                  <div className="premium-card h-full bg-background p-8">
                    <h3 className="text-xl font-medium text-text-primary">{tier.name}</h3>
                    <p className="mt-2 font-mono text-2xl font-medium text-accent">{tier.price}</p>
                    <ul className="mt-6 space-y-3">
                      {tier.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-3 text-sm text-text-secondary"
                        >
                          <CheckCircle size={18} className="mt-0.5 shrink-0 text-accent" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-space">
          <div className="section-inner">
            <div className="light-gate border border-border-subtle bg-[radial-gradient(circle_at_50%_0%,rgba(145,169,161,0.08),transparent_50%)] p-10 text-center lg:p-20">
              <Reveal>
                <h2 className="text-4xl font-[470] tracking-[-0.04em] text-text-primary sm:text-5xl">
                  {t.ctaTitle}
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">{t.ctaBody}</p>
                <div className="mt-8 flex justify-center">
                  <Button
                    href={localizedHref(locale, "/contact/")}
                    size="large"
                    icon={<ArrowRight size={18} />}
                  >
                    {t.ctaButton}
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <ServiceForm locale={locale} />
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
