"use client";

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
        description: "Access user manuals, installation guides, and specifications.",
      },
      {
        icon: Download,
        title: "Software Downloads",
        description: "Download control software, firmware, and configuration tools.",
      },
      {
        icon: MessageCircle,
        title: "Open a Ticket",
        description: "Describe your issue and our support team will respond quickly.",
      },
    ],
    faqTitle: "Frequently asked questions",
    faqs: [
      {
        question: "How do I request emergency support?",
        answer:
          "Call our 24/7 support line at +46 8 505 204 80 or email support@imvision.se. Enterprise clients receive priority on-site dispatch.",
      },
      {
        question: "What is covered under a service agreement?",
        answer:
          "Depending on your tier, coverage includes preventive maintenance, remote monitoring, spare module management, software updates, and guaranteed response times.",
      },
      {
        question: "Can IM Vision monitor my displays remotely?",
        answer:
          "Yes. Cloud-connected displays can be monitored 24/7 for health, temperature, signal status, and brightness performance.",
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
    ctaContact: "Contact Us",
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
        description: "Manualer, installationsguider och specifikationer för levererade system.",
      },
      {
        icon: Download,
        title: "Mjukvarunedladdningar",
        description: "Ladda ned styrmjukvara, firmware och konfigurationsverktyg.",
      },
      {
        icon: MessageCircle,
        title: "Beskriv ärendet",
        description: "Beskriv problemet så svarar vårt supportteam så snabbt som möjligt.",
      },
    ],
    faqTitle: "Vanliga frågor",
    faqs: [
      {
        question: "Hur beställer jag akut support?",
        answer:
          "Ring vår supportlinje dygnet runt på +46 8 505 204 80 eller mejla support@imvision.se. Enterprise-kunder får prioriterad utryckning.",
      },
      {
        question: "Vad ingår i ett serviceavtal?",
        answer:
          "Beroende på nivå ingår förebyggande underhåll, fjärrövervakning, reservdelsprogram, mjukvaruuppdateringar och garanterade responstider.",
      },
      {
        question: "Kan IM Vision övervaka våra skärmar på distans?",
        answer:
          "Ja. Molnanlutna skärmar kan övervakas dygnet runt avseende hälsa, temperatur, signalstatus och ljusstyrka.",
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
    ctaBody: "Vårt supportteam finns tillgängligt dygnet runt för service och tekniska frågor.",
    ctaCall: "Ring support",
    ctaContact: "Kontakta oss",
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
            <h2 id="support-resources" className="sr-only">
              {t.resourcesTitle}
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {t.resources.map((resource, index) => (
                <Reveal key={resource.title} delay={index * 0.1}>
                  <div className="premium-card h-full bg-bg-elevated p-8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <resource.icon size={26} strokeWidth={1.5} />
                    </div>
                    <h3 className="mt-8 text-xl font-medium text-text-primary">{resource.title}</h3>
                    <p className="mt-3 text-text-secondary">{resource.description}</p>
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
                <h2 className="text-4xl font-[470] tracking-[-0.04em] text-text-primary sm:text-5xl">
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
                <h2 className="text-4xl font-[470] tracking-[-0.04em] text-text-primary sm:text-5xl">
                  {t.ctaTitle}
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">{t.ctaBody}</p>
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button href="tel:+46850520480" variant="secondary" size="large">
                    {t.ctaCall}
                  </Button>
                  <Button
                    href={localizedHref(locale, "/contact/")}
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
