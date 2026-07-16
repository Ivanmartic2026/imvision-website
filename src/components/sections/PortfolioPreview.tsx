"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Locale, localizedHref } from "@/lib/i18n";

const environments = [
  {
    label: "Architecture / Exterior",
    labelSv: "Arkitektur / Exteriör",
    title: "Media that respects the building.",
    titleSv: "Media i samspel med arkitekturen.",
    description: "Facade and transparent-display concepts planned as part of the envelope, sightlines, and surrounding light.",
    descriptionSv: "Fasad- och transparenta displaykoncept planerade som en del av klimatskal, siktlinjer och omgivande ljus.",
    image: "/images/photon-material/architectural-facade.jpg",
    alt: "Concept visualization of a transparent LED media facade integrated into a Nordic office building",
  },
  {
    label: "Retail / Experience",
    labelSv: "Butik / Upplevelse",
    title: "Spaces people remember.",
    titleSv: "Rum människor minns.",
    description: "Display environments that support the product, the architecture, and the movement of people through the room.",
    descriptionSv: "Displaymiljöer som stödjer produkten, arkitekturen och människors rörelse genom rummet.",
    image: "/images/photon-material/permanent-retail.jpg",
    alt: "Concept visualization of an LED feature wall in a premium retail environment",
  },
];

export function PortfolioPreview({ locale = "en" }: { locale?: Locale }) {
  return (
    <section className="section section-space bg-background" aria-labelledby="portfolio-title">
      <div className="section-inner">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-4xl">
            <SectionLabel>{locale === "sv" ? "Utvalda miljöer" : "Selected environments"}</SectionLabel>
            <h2 id="portfolio-title" className="heading-section mt-8 max-w-[15ch]">
              {locale === "sv" ? "Skärmen är bara en del av upplevelsen." : "The screen is only one part of the experience."}
            </h2>
          </div>
          <Link href={localizedHref(locale, "/projects/")} className="group inline-flex items-center gap-2 self-start border-b border-accent pb-1 text-sm font-semibold text-text-primary lg:self-auto">
            {locale === "sv" ? "Visa projektarkivet" : "View project archive"}
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="mt-16 grid gap-7 lg:mt-24 lg:grid-cols-2">
          {environments.map((item, index) => (
            <motion.figure
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 0.61, 0.36, 1] }}
              className="group"
            >
              <div
                className="media-frame light-gate relative aspect-[4/3] overflow-hidden border border-border-subtle"
                style={{ position: "relative" }}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.22,.61,.36,1)] group-hover:scale-[1.018]"
                />
                <div className="absolute inset-x-0 bottom-0 h-px photon-seam" />
                <span className="absolute left-4 top-4 rounded-[10px_3px_10px_10px] bg-[#070807]/75 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#f2f0e9] backdrop-blur-md">
                  {locale === "sv" ? "Visuell riktning / Koncept" : "Visual direction / Concept"}
                </span>
              </div>
              <figcaption className="pt-6">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent">{locale === "sv" ? item.labelSv : item.label}</span>
                  <h3 className="mt-4 text-2xl font-medium tracking-[-0.025em] text-text-primary">{locale === "sv" ? item.titleSv : item.title}</h3>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
