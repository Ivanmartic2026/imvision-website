"use client";

import Link from "next/link";
import { BookOpen, Download, MessageCircle, ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/effects/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { Locale, localizedHref } from "@/lib/i18n";
import { faqLd } from "@/lib/seo";

const copy = {
  en: {
    label: "Support",
    title: "We're here when you need us.",
    description:
      "Find answers, documentation, and support options for your IM Vision LED installation.",
    resourcesTitle: "Support resources",
    resources: [
      {
        icon: BookOpen,
        title: "Documentation",
        description: "Manuals, installation guides and specifications for your installation — request them from the service desk.",
        href: "mailto:support@imvision.se?subject=Documentation%20request",
        cta: "Request documentation",
      },
      {
        icon: Download,
        title: "Software and firmware",
        description: "Control software, firmware and configuration tools are released per installation.",
        href: "mailto:support@imvision.se?subject=Software%20and%20firmware%20request",
        cta: "Request software",
      },
      {
        icon: MessageCircle,
        title: "Report an issue",
        description: "Describe the fault or the question and we reply within 24 hours.",
        href: "/contact/?topic=service",
        cta: "Report an issue",
      },
    ],
    faqTitle: "Frequently asked questions",
    faqs: [
      {
        question: "How do I request emergency support?",
        answer:
          "Call 010 330 46 36 or email support@imvision.se and we reply within 24 hours. Service-agreement clients get priority on-site response.",
      },
      {
        question: "What is covered under a service agreement?",
        answer:
          "Depending on the agreement, coverage includes preventive maintenance, remote monitoring, spare module management, software updates and agreed response levels.",
      },
      {
        question: "Can IM Vision monitor my displays remotely?",
        answer:
          "Yes. Connected displays can be monitored for health, temperature, signal status and brightness, so we can act before an issue reaches your audience.",
      },
      {
        question: "How long do LED displays typically last?",
        answer:
          "With proper maintenance, indoor LED displays can operate 80,000–100,000 hours. Outdoor displays typically have shorter lifespans depending on environmental exposure.",
      },
      {
        question: "Do you offer training for our team?",
        answer:
          "Yes. We provide operator training, content management guidance, and basic troubleshooting as part of most installations and service plans.",
      },
    ],
    ctaTitle: "Still need help?",
    ctaBody:
      "Our support team is available around the clock for service and technical questions.",
    ctaCall: "Call Support",
    ctaContact: "Report an issue",
  },
  sv: {
    label: "Support",
    title: "Vi finns här när ni behöver oss.",
    description:
      "Hitta svar, dokumentation och supportalternativ för er IM Vision LED-installation.",
    resourcesTitle: "Supportresurser",
    resources: [
      {
        icon: BookOpen,
        title: "Dokumentation",
        description: "Manualer, installationsguider och specifikationer för er installation — begär dem från service desk.",
        href: "mailto:support@imvision.se?subject=Dokumentation",
        cta: "Begär dokumentation",
      },
      {
        icon: Download,
        title: "Mjukvara och firmware",
        description: "Styrprogramvara, firmware och konfigurationsverktyg släpps per installation.",
        href: "mailto:support@imvision.se?subject=Mjukvara%20och%20firmware",
        cta: "Begär mjukvara",
      },
      {
        icon: MessageCircle,
        title: "Anmäl ärende",
        description: "Beskriv felet eller frågan så återkommer vi inom 24 timmar.",
        href: "/contact/?topic=service",
        cta: "Anmäl ärende",
      },
    ],
    faqTitle: "Vanliga frågor",
    faqs: [
      {
        question: "Hur beställer jag akut support?",
        answer:
          "Ring 010 330 46 36 eller mejla support@imvision.se så återkommer vi inom 24 timmar. Kunder med serviceavtal får prioriterad utryckning.",
      },
      {
        question: "Vad ingår i ett serviceavtal?",
        answer:
          "Beroende på avtal ingår förebyggande underhåll, fjärrövervakning, reservdelsprogram, mjukvaruuppdateringar och avtalade responstider.",
      },
      {
        question: "Kan IM Vision övervaka våra skärmar på distans?",
        answer:
          "Ja. Anslutna skärmar kan övervakas avseende hälsa, temperatur, signalstatus och ljusstyrka, så att vi kan agera innan en avvikelse når er publik.",
      },
      {
        question: "Hur länge håller LED-skärmar?",
        answer:
          "Vid rätt underhåll kan inomhusdisplayer arbeta 80 000–100 000 timmar. Utomhusdisplayer har kortare livslängd beroende på miljöpåverkan.",
      },
      {
        question: "Erbjuder ni utbildning för vår personal?",
        answer:
          "Ja. Vi erbjuder operatörsutbildning, vägledning för innehållshantering och grundläggande felsökning som en del av de flesta installationer och serviceavtal.",
      },
    ],
    ctaTitle: "Behöver du fortfarande hjälp?",
    ctaBody: "Vårt supportteam svarar inom 24 timmar på servicefrågor och tekniska frågor.",
    ctaCall: "Ring support",
    ctaContact: "Anmäl ärende",
  },
};

export function SupportPageContent({ locale = "en" }: { locale?: Locale }) {
  const t = copy[locale];

  return (
    <>
      <JsonLd data={faqLd(t.faqs)} />
      <Header locale={locale} />
      <main id="main-content">
        <PageHeader label={t.label} title={t.title} description={t.description} />

        <section className="section section-space" aria-labelledby="support-resources">
          <div className="section-inner">
            <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <h2 id="support-resources" className="h2-sub">
                {t.resourcesTitle}
              </h2>
              <Link
                href={localizedHref(locale, "/service/")}
                className="tap gap-2 text-sm font-medium text-text-secondary underline decoration-accent/60 underline-offset-4 transition-colors hover:text-text-primary"
              >
                {locale === "sv" ? "Läs om serviceavtal och underhåll" : "Service agreements and maintenance"}
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {t.resources.map((resource, index) => (
                <Reveal key={resource.title} delay={index * 0.1}>
                  <div className="premium-card flex h-full flex-col bg-bg-elevated p-8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <resource.icon size={26} strokeWidth={1.5} />
                    </div>
                    <h3 className="mt-8 text-xl font-medium text-text-primary">{resource.title}</h3>
                    <p className="mt-3 text-text-secondary">{resource.description}</p>
                    {resource.href && (
                      <a
                        href={
                          resource.href.startsWith("/")
                            ? localizedHref(locale, resource.href.replace("?topic=service", "")) + "?topic=service"
                            : resource.href
                        }
                        className="tap mt-auto gap-2 pt-6 text-sm font-semibold text-text-primary underline decoration-accent underline-offset-4 transition-colors hover:text-accent-soft"
                      >
                        {resource.cta}
                      </a>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-space bg-bg-elevated">
          <div className="section-inner">
            <div className="mb-12 max-w-3xl">
              <Reveal>
                <h2 className="heading-section">
                  {t.faqTitle}
                </h2>
              </Reveal>
            </div>

            <div className="mx-auto max-w-4xl space-y-4">
              {t.faqs.map((faq, index) => (
                <Reveal key={faq.question} delay={index * 0.05}>
                  <details className="group rounded-[24px] border border-border-subtle bg-background p-7 transition-colors duration-[700ms] open:border-accent/30">
                    <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-medium text-text-primary">
                      {faq.question}
                      <span className="ml-4 transition-transform group-open:rotate-180">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          className="text-accent"
                        >
                          <path
                            d="M4 6L8 10L12 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </summary>
                    <p className="mt-4 text-text-secondary">{faq.answer}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-space">
          <div className="section-inner">
            <div className="light-gate border border-border-subtle bg-[radial-gradient(circle_at_50%_0%,rgba(145,169,161,0.08),transparent_50%)] p-10 text-center lg:p-20">
              <Reveal>
                <h2 className="heading-section">
                  {t.ctaTitle}
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">{t.ctaBody}</p>
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button href="tel:+46103304636" variant="secondary" size="large">
                    {t.ctaCall}
                  </Button>
                  <Button
                    href={localizedHref(locale, "/contact/?topic=service")}
                    size="large"
                    icon={<ArrowRight size={18} />}
                  >
                    {t.ctaContact}
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
