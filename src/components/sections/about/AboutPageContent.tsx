"use client";

import { Target, Compass, Users, ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/effects/Reveal";
import { StaggerReveal, StaggerItem } from "@/components/effects/StaggerReveal";
import { Locale, localizedHref } from "@/lib/i18n";

const copy = {
  en: {
    label: "About",
    title: "We are IMvision.",
    description:
      "We design, engineer, install, and maintain professional LED systems across Europe.",
    introHead: "Technology, design, and scale — delivered with confidence.",
    introBody: [
      "With our head office in Jönköping and a warehouse and office in the Stockholm area, we serve clients across the Nordics and Europe. Our team combines deep technical expertise with a sharp eye for design, ensuring every installation is as reliable as it is impressive.",
      "From a single retail screen to a city-scale digital facade, we bring the same level of care, precision, and ambition to every project.",
    ],
    stats: [
      { value: "15+", label: "Years of experience" },
      { value: "500+", label: "Projects delivered" },
      { value: "98%", label: "Client satisfaction" },
      { value: "24/7", label: "Support available" },
    ],
    valuesTitle: "What drives us",
    values: [
      {
        icon: Target,
        title: "Precision",
        description:
          "Every pixel, every measurement, every connection matters. We engineer to exacting standards.",
      },
      {
        icon: Compass,
        title: "Innovation",
        description:
          "We continuously explore new display technologies, control systems, and design approaches.",
      },
      {
        icon: Users,
        title: "Partnership",
        description:
          "We work alongside our clients, from the first sketch to years of ongoing support.",
      },
    ],
    ctaTitle: "Let's build something extraordinary",
    ctaBody:
      "Whether you are exploring LED for the first time or scaling an existing network, we would love to hear from you.",
    ctaButton: "Get in Touch",
  },
  sv: {
    label: "Om oss",
    title: "Vi är IMvision.",
    description:
      "Mer än en LED-leverantör. Vi designar, projekterar, installerar och underhåller avancerade displaylösningar i Sverige och Europa.",
    introHead: "Teknik, design och skala — levererat med trygghet.",
    introBody: [
      "Med huvudkontor i Jönköping och lager och kontor i Stockholmsområdet arbetar vi med kunder i Norden och övriga Europa. Teamet förenar teknisk kompetens med en stark känsla för form, så att varje installation är lika driftsäker som imponerande.",
      "Från en enskild butiksskärm till en digital fasad i stadsskalan möter varje projekt samma omsorg, precision och ambition.",
    ],
    stats: [
      { value: "15+", label: "Års erfarenhet" },
      { value: "500+", label: "Projekt levererade" },
      { value: "98%", label: "Kundnöjdhet" },
      { value: "24/7", label: "Support tillgänglig" },
    ],
    valuesTitle: "Det som driver oss",
    values: [
      {
        icon: Target,
        title: "Precision",
        description:
          "Varje pixel, mått och anslutning spelar roll. Vi projekterar med noggrannhet från första beslut.",
      },
      {
        icon: Compass,
        title: "Innovation",
        description:
          "Vi utforskar kontinuerligt ny displayteknik, styrning och metoder för arkitektonisk integration.",
      },
      {
        icon: Users,
        title: "Partnerskap",
        description:
          "Vi arbetar tillsammans med våra kunder från första skiss till långsiktig support.",
      },
    ],
    ctaTitle: "Låt oss bygga något extraordinärt",
    ctaBody:
      "Oavsett om ni utforskar LED för första gången eller skalar upp ett befintligt nätverk vill vi gärna höra från er.",
    ctaButton: "Kontakta oss",
  },
};

export function AboutPageContent({ locale = "en" }: { locale?: Locale }) {
  const t = copy[locale];

  return (
    <>
      <Header locale={locale} />
      <main id="main-content">
        <PageHeader label={t.label} title={t.title} description={t.description} />

        <section className="section section-space">
          <div className="section-inner">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <Reveal>
                <h2 className="max-w-[15ch] text-4xl font-[470] leading-[1.08] tracking-[-0.04em] text-text-primary sm:text-5xl lg:text-6xl">
                  {t.introHead}
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="space-y-5">
                  {t.introBody.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 40)}
                      className="max-w-[600px] text-lg leading-[1.75] text-text-secondary"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section border-y border-border-subtle bg-bg-elevated py-24 md:py-32 lg:py-36">
          <div className="section-inner">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {t.stats.map((stat, index) => (
                <Reveal key={stat.label} delay={index * 0.1}>
                  <div className="text-center">
                    <div className="font-mono text-4xl font-medium text-text-primary sm:text-5xl">
                      {stat.value}
                    </div>
                    <p className="mt-2 text-sm uppercase tracking-wider text-text-secondary">
                      {stat.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-space">
          <div className="section-inner">
            <div className="mb-16 max-w-3xl">
              <Reveal>
                <h2 className="text-4xl font-[470] tracking-[-0.04em] text-text-primary sm:text-5xl">
                  {t.valuesTitle}
                </h2>
              </Reveal>
            </div>

            <StaggerReveal className="grid gap-6 md:grid-cols-3">
              {t.values.map((value) => (
                <StaggerItem key={value.title}>
                  <div className="premium-card h-full bg-bg-elevated p-8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <value.icon size={26} strokeWidth={1.5} />
                    </div>
                    <h3 className="mt-8 text-xl font-medium text-text-primary">{value.title}</h3>
                    <p className="mt-3 text-text-secondary">{value.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerReveal>
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
      </main>
      <Footer locale={locale} />
    </>
  );
}
