"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Locale } from "@/lib/i18n";

const process = [
  {
    number: "01",
    title: "Analysis",
    titleSv: "Analys",
    description:
      "We review the site, how it will be used and the conditions it imposes. You get a documented basis to decide on.",
    descriptionSv:
      "Vi går igenom platsen, användningen och förutsättningarna. Ni får ett underlag att besluta på.",
    image: "/images/photon-material/event-rental.jpg",
    imageLabel: "Spatial study",
    imageLabelSv: "Platsanalys",
  },
  {
    number: "02",
    title: "Design and engineering",
    titleSv: "Design och projektering",
    description:
      "We define the screen geometry and plan power, signal, cooling, mounting and safety.",
    descriptionSv:
      "Vi bestämmer skärmens utformning och planerar kraft, signal, kyla, infästning och säkerhet.",
    image: "/images/photon-material/engineering-calibration.jpg",
    imageLabel: "Engineering detail",
    imageLabelSv: "Teknisk detalj",
  },
  {
    number: "03",
    title: "Delivery and installation",
    titleSv: "Leverans och installation",
    description:
      "We deliver, mount, commission and calibrate the complete system.",
    descriptionSv: "Vi levererar, monterar, driftsätter och kalibrerar hela systemet.",
    image: "/images/photon-material/architectural-facade.jpg",
    imageLabel: "Architectural integration",
    imageLabelSv: "Arkitektonisk integration",
  },
  {
    number: "04",
    title: "Service and operation",
    titleSv: "Service och drift",
    description:
      "You get documentation, training and a service agreement with preventive maintenance and support.",
    descriptionSv:
      "Ni får dokumentation, utbildning och serviceavtal med förebyggande underhåll och support.",
    image: "/images/photon-material/permanent-retail.jpg",
    imageLabel: "Operational environment",
    imageLabelSv: "Driftsmiljö",
  },
];

export function StoryTimeline({ locale = "en" }: { locale?: Locale }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="section section-space overflow-hidden bg-background"
      aria-labelledby="process-title"
    >
      <div className="section-inner">
        <div className="border-t border-border-subtle pt-8">
          <div className="max-w-5xl">
            <SectionLabel>{locale === "sv" ? "Processen" : "The process"}</SectionLabel>
            <h2 id="process-title" className="mt-8 max-w-4xl text-[clamp(2.9rem,4.6vw,5.5rem)] font-[470] leading-[1.02] tracking-[-0.045em]">
              {locale === "sv" ? "Så arbetar vi" : "How we work"}
            </h2>
          </div>
        </div>

        {/* Scroll progress indicator */}
        <div className="relative mt-12 lg:mt-16">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-border-subtle lg:left-6 lg:block xl:left-8">
            <motion.div
              className="absolute left-0 top-0 w-full bg-accent"
              style={{ height: progressHeight }}
            />
          </div>

          <div className="space-y-16 lg:space-y-24">
            {process.map((step, index) => {
              const imageFirst = index % 2 === 1;

              return (
                <article key={step.number} className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-16">
                  <motion.div
                    initial={{ y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.85, ease: [0.22, 0.61, 0.36, 1] }}
                    className={`lg:col-span-5 ${imageFirst ? "lg:col-start-8 lg:order-2" : "lg:col-start-1"}`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">IM / {step.number}</span>
                      <span className="h-px flex-1 bg-border-subtle" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted">0{process.length}</span>
                    </div>
                    <h3 className="mt-6 text-[clamp(2rem,3.2vw,4rem)] font-[470] leading-[1.04] tracking-[-0.042em] text-text-primary lg:mt-8">
                      {locale === "sv" ? step.titleSv : step.title}
                    </h3>
                    <p className="mt-4 text-lg leading-relaxed text-text-secondary lg:mt-6">
                      {locale === "sv" ? step.descriptionSv : step.description}
                    </p>
                  </motion.div>

                  <motion.figure
                    initial={{ clipPath: imageFirst ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)" }}
                    whileInView={{ clipPath: "inset(0 0 0 0)" }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 1, ease: [0.22, 0.61, 0.36, 1] }}
                    className={`media-frame light-gate relative aspect-[16/10] overflow-hidden border border-border-subtle lg:col-span-6 ${
                      imageFirst ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-7"
                    }`}
                    style={{ position: "relative" }}
                  >
                    <motion.div
                      initial={{ scale: 1.045 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: "-10%" }}
                      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0"
                      style={{ position: "absolute" }}
                    >
                      <Image
                        src={step.image}
                        alt={
                          locale === "sv"
                            ? `Konceptvisualisering för ${step.titleSv.toLowerCase()}`
                            : `Concept visualization for ${step.title.toLowerCase()}`
                        }
                        fill
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        className="object-cover"
                      />
                    </motion.div>
                    <div className="image-grid-overlay absolute inset-0 opacity-20" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-[#070807]/85 to-transparent p-5 pt-24 sm:p-6 sm:pt-28">
                      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#f2f0e9]">
                        IM / {locale === "sv" ? step.imageLabelSv : step.imageLabel}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#a9b0ad]">
                        {locale === "sv" ? "Konceptvisualisering" : "Concept visualisation"}
                      </span>
                    </div>
                    <div className="absolute inset-x-0 top-0 h-px photon-seam" />
                  </motion.figure>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
