"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Locale, localizedHref } from "@/lib/i18n";

const services = [
  {
    number: "01",
    title: "Permanent installations",
    titleSv: "Permanent LED",
    description: "For façades, retail, offices, showrooms, and public environments.",
    descriptionSv: "För fasader, butiker, kontor, showrooms och offentliga miljöer.",
    tags: ["Architectural LED systems", "Transparent LED", "Retail", "Corporate", "DOOH", "Digital signage"],
    tagsSv: ["Arkitektoniska LED-system", "Transparent LED", "Retail", "Corporate", "DOOH", "Digital signage"],
    image: "/images/photon-material/permanent-retail.jpg",
    alt: "Concept visualization of an architectural LED wall integrated into a premium retail interior",
    href: "/sales/",
    cta: "Explore permanent solutions",
    ctaSv: "Utforska permanenta lösningar",
  },
  {
    number: "02",
    title: "Rental & Event",
    titleSv: "Rental & Event",
    description: "For temporary installations where quality, dependable delivery, and support are essential.",
    descriptionSv: "För tillfälliga installationer där kvalitet, leveranssäkerhet och support är avgörande.",
    tags: ["Concerts", "Exhibitions", "Sports", "Corporate events", "TV production", "Product launches"],
    tagsSv: ["Konserter", "Mässor", "Sport", "Företagsevent", "TV-produktion", "Produktlanseringar"],
    image: "/images/photon-material/event-rental.jpg",
    alt: "Concept visualization of a large LED stage at a premium product launch",
    href: "/rental/",
    cta: "Explore event solutions",
    ctaSv: "Utforska event-lösningar",
  },
];

export function ServicesPreview({ locale = "en" }: { locale?: Locale }) {
  return (
    <section id="services" className="theme-light section bg-background pb-[6.25rem] text-text-primary md:pb-[8.75rem] lg:pb-[12.5rem]" aria-labelledby="services-title">
      <div className="section-inner">
        <div className="max-w-5xl">
          <SectionLabel>{locale === "sv" ? "Våra lösningar" : "Our solutions"}</SectionLabel>
          <h2 id="services-title" className="heading-section mt-8 max-w-[13ch]">
            {locale === "sv" ? "Äg den eller hyr den — vi sköter resten." : "Own it or rent it — we handle the rest."}
          </h2>
        </div>

        <div className="mt-16 grid gap-6 lg:mt-24 lg:grid-cols-2">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: index * 0.08, ease: [0.22, 0.61, 0.36, 1] }}
              className="group premium-card light-gate overflow-hidden bg-bg-surface transition-all duration-[700ms] ease-[cubic-bezier(.22,.61,.36,1)] hover:-translate-y-1.5 hover:border-accent/25 hover:shadow-[0_28px_80px_rgba(0,0,0,.18)]"
            >
              <Link href={localizedHref(locale, service.href)} className="flex h-full flex-col">
                <div
                  className="media-frame relative aspect-[4/3] overflow-hidden bg-bg-elevated"
                  style={{ position: "relative" }}
                >
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.22,.61,.36,1)] group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-px photon-seam" />
                  <span className="absolute left-4 top-4 rounded-[10px_3px_10px_10px] bg-[#070807]/75 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#f2f0e9] backdrop-blur-md">
                    {locale === "sv" ? "Konceptbild" : "Concept visual"} / {service.number}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7 lg:p-9">
                  <div className="flex items-start justify-between gap-6">
                    <h3 className="text-2xl font-medium leading-[1.15] tracking-[-0.025em] sm:text-3xl">{locale === "sv" ? service.titleSv : service.title}</h3>
                    <ArrowUpRight size={20} className="mt-1 shrink-0 text-text-muted transition-transform duration-[700ms] ease-[cubic-bezier(.22,.61,.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-text-primary" />
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-text-secondary sm:text-base">{locale === "sv" ? service.descriptionSv : service.description}</p>
                  <ul className="mt-6 flex flex-wrap gap-2" aria-label={locale === "sv" ? `Områden inom ${service.titleSv}` : `${service.title} areas`}>
                    {(locale === "sv" ? service.tagsSv : service.tags).map((tag) => (
                      <li key={tag} className="rounded-full border border-border-subtle px-3 py-1.5 text-xs text-text-secondary">
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto pt-8 font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted transition-colors duration-500 group-hover:text-accent">
                    {locale === "sv" ? service.ctaSv : service.cta}
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
