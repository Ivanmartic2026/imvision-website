"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CONTACT } from "@/lib/seo";
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
      className="theme-dark relative mb-16 min-h-svh overflow-hidden bg-[#070807] lg:mb-24 lg:min-h-[900px]"
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
          alt={
            locale === "sv"
              ? "Konceptvisualisering av en monumental LED-vägg i ett mörkt arkitektoniskt upplevelsecenter"
              : "Concept visualization of a monumental LED wall integrated into a dark architectural experience centre"
          }
          fill
          loading="eager"
          fetchPriority="high"
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
              {/* The two block-spans are a visual line break only. The literal
                  space between them keeps textContent (screen readers, copy,
                  search snippets) at "LED som formar upplevelsen." instead of
                  the run-together "formarupplevelsen". */}
              <span className="block">
                {locale === "sv" ? "LED som formar" : "Light, built"}
              </span>{" "}
              <span className="block">
                {locale === "sv" ? "upplevelsen." : "into space."}
              </span>
            </h1>

            <p className="mt-5 max-w-3xl text-[clamp(1.35rem,3.6vw,1.85rem)] font-medium leading-snug tracking-[-0.025em] text-accent-soft sm:mt-7">
              {locale === "sv"
                ? "Från fasad till scen – i samma system."
                : "From facade to stage — one system."}
            </p>

            <p className="body mt-4 max-w-2xl font-normal text-text-secondary sm:mt-5">
              {locale === "sv"
                ? "Köp eller hyr — installerat, servat och driftat av oss, i Norden och Europa."
                : "Buy or rent — installed, serviced and operated by us, across the Nordics and Europe."}
            </p>

            {/* One primary CTA. The Buy/Rent choice lives in its own section
                further down the page (and in the header), so the hero does not
                repeat it as two large cards — that duplicated the section and
                pushed the proof, projects and process below the fold. */}
            <div className="mt-9 flex flex-col items-start gap-4 sm:mt-11 sm:flex-row sm:items-center sm:gap-6">
              <Button
                href={localizedHref(locale, "/contact/") + "#contact-form"}
                size="large"
                icon={<ArrowRight size={18} />}
                className="w-full sm:w-auto"
              >
                {locale === "sv" ? "Få offert" : "Get a quote"}
              </Button>
              <Link
                href={localizedHref(locale, "/projects/")}
                prefetch={false}
                className="tap gap-2 border-b border-accent text-sm font-semibold text-text-primary transition-colors hover:text-accent-soft"
              >
                {locale === "sv" ? "Se projekt" : "See projects"}
                <ArrowUpRight size={16} />
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-1 text-sm text-text-secondary">
              <Link
                href={localizedHref(locale, "/sales/")}
                prefetch={false}
                className="tap transition-colors hover:text-text-primary"
              >
                {locale === "sv" ? "Köpa LED" : "Buy LED"}
              </Link>
              <Link
                href={localizedHref(locale, "/rental/")}
                prefetch={false}
                className="tap transition-colors hover:text-text-primary"
              >
                {locale === "sv" ? "Hyra LED" : "Rent LED"}
              </Link>
              <a
                href={`tel:${CONTACT.phoneE164}`}
                className="tap transition-colors hover:text-text-primary"
              >
                {locale === "sv" ? `Ring ${CONTACT.phone}` : `Call ${CONTACT.phone}`}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
