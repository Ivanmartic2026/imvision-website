"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Locale, localizedHref } from "@/lib/i18n";

export function Hero({ locale = "en" }: { locale?: Locale }) {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.055]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6, 0.9], [1, 0.85, 0]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative mb-16 min-h-svh overflow-hidden bg-[#070807] lg:mb-24 lg:min-h-[900px]"
      aria-labelledby="hero-title"
    >
      <motion.div
        className="absolute inset-x-0"
        style={reduceMotion
          ? { top: "-8%", height: "116%" }
          : { top: "-8%", height: "116%", y: imageY, scale: imageScale }}
      >
        <Image
          src="/images/photon-material/hero-experience-centre.jpg"
          alt="Concept visualization of a monumental LED wall integrated into a dark architectural experience centre"
          fill
          loading="eager"
          sizes="100vw"
          className="object-cover object-[62%_center]"
          priority
        />
      </motion.div>
      <div className="media-grade absolute inset-0" />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(7,8,7,.72)_0%,transparent_55%)]"
        aria-hidden="true"
      />
      <div className="image-grid-overlay absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#070807] to-transparent" />

      <div className="section relative z-[5] flex min-h-svh items-start pb-16 pt-36 sm:pb-20 sm:pt-40 lg:min-h-[900px] lg:items-center lg:pb-24 lg:pt-32">
        <div className="section-inner w-full">
          <motion.div
            className="max-w-[1120px]"
            style={reduceMotion ? undefined : { opacity: contentOpacity }}
          >
            <h1
              id="hero-title"
              className="max-w-[980px] text-balance font-[var(--font-heading)] text-[clamp(2.85rem,12vw,5.25rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-text-primary sm:text-[clamp(3.4rem,7.5vw,6rem)]"
            >
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  {locale === "sv" ? "LED som formar" : "Light, built"}
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  {locale === "sv" ? "upplevelsen." : "into space."}
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
              className="mt-5 max-w-3xl text-[clamp(1.35rem,3.6vw,1.85rem)] font-medium leading-snug tracking-[-0.025em] text-accent-soft sm:mt-7"
            >
              {locale === "sv"
                ? "Från fasad till scen – i samma system."
                : "From facade to stage — one system."}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.72, ease: [0.22, 0.61, 0.36, 1] }}
              className="body mt-4 max-w-2xl font-normal text-text-secondary sm:mt-5"
            >
              {locale === "sv"
                ? "Ett system. Hela vägen – från design till drift, i hela Europa."
                : "One system. All the way — from design to operation, across Europe."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.84, ease: [0.22, 0.61, 0.36, 1] }}
              className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2"
            >
              {[
                {
                  title: locale === "sv" ? "Köpa LED" : "Buy LED",
                  description:
                    locale === "sv"
                      ? "En lösning som håller i 10 år, inte 10 månader."
                      : "A solution built to last years, not months.",
                  href: "/sales/",
                  accent: "green",
                },
                {
                  title: locale === "sv" ? "Hyra LED" : "Rent LED",
                  description:
                    locale === "sv"
                      ? "Rätt skärm, på plats, i tid – varje gång."
                      : "The right screen, on site, on time — every time.",
                  href: "/rental/",
                  accent: "warm",
                },
              ].map((choice) => {
                const isGreen = choice.accent === "green";
                return (
                  <Link
                    key={choice.title}
                    href={localizedHref(locale, choice.href)}
                    className={`
                      group relative flex min-h-[160px] flex-col justify-end overflow-hidden rounded-[24px_8px_24px_24px] border p-6 backdrop-blur-xl transition-all duration-[800ms] ease-[cubic-bezier(.22,.61,.36,1)] hover:-translate-y-1.5 sm:min-h-[200px] sm:p-8
                      ${
                        isGreen
                          ? "border-accent/40 bg-[#0b0d0c]/92 shadow-[0_24px_70px_rgba(0,0,0,.24)] hover:border-accent hover:bg-[#111412]/96 hover:shadow-[0_36px_96px_rgba(0,0,0,.38),0_0_50px_var(--accent-glow)]"
                          : "border-accent-warm/25 bg-[#0b0d0c]/78 hover:border-accent-warm/55 hover:bg-[#111412]/88 hover:shadow-[0_36px_96px_rgba(0,0,0,.34),0_0_40px_rgba(184,161,132,.10)]"
                      }
                    `}
                  >
                    <div
                      className={`pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-[800ms] group-hover:opacity-100 ${
                        isGreen
                          ? "bg-[radial-gradient(circle_at_85%_15%,rgba(145,169,161,.12),transparent_34%)]"
                          : "bg-[radial-gradient(circle_at_85%_15%,rgba(184,161,132,.10),transparent_34%)]"
                      }`}
                    />
                    <h2 className="relative max-w-[12ch] font-[var(--font-heading)] text-3xl font-semibold leading-[1.08] tracking-[-0.03em] text-text-primary sm:text-4xl">
                      {choice.title}
                    </h2>
                    <p className="relative mt-3 max-w-[31rem] pr-10 text-sm leading-[1.65] text-text-secondary sm:mt-4 sm:text-base">
                      {choice.description}
                    </p>
                    <ArrowUpRight
                      size={22}
                      className={`
                        absolute bottom-6 right-6 transition-[color,transform] duration-[700ms] ease-[cubic-bezier(.22,.61,.36,1)] group-hover:translate-x-1 group-hover:-translate-y-1
                        ${isGreen ? "text-text-muted group-hover:text-accent" : "text-text-muted group-hover:text-accent-warm"}
                        sm:bottom-8 sm:right-8
                      `}
                    />
                  </Link>
                );
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1, ease: [0.22, 0.61, 0.36, 1] }}
              className="mt-5"
            >
              <Link
                href={localizedHref(locale, "/contact/")}
                className="group inline-flex items-center gap-2 text-sm font-medium text-text-primary transition-colors hover:text-accent-soft"
              >
                {locale === "sv" ? "Osäker på vad ni behöver? Prata med oss" : "Not sure what you need? Talk to us"}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
