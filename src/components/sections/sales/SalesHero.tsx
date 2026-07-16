"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { localizedHref } from "@/lib/i18n";
import { SalesSectionProps } from "./types";

export function SalesHero({ locale, content }: SalesSectionProps) {
  const { hero } = content;
  const sectionRef = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const imageX = useTransform(smoothX, [-0.5, 0.5], ["1.5%", "-1.5%"]);
  const imageY = useTransform(smoothY, [-0.5, 0.5], ["1.5%", "-1.5%"]);
  const contentX = useTransform(smoothX, [-0.5, 0.5], ["-0.75%", "0.75%"]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    section.addEventListener("mousemove", handleMouseMove);
    return () => section.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      <Header locale={locale} />
      <section
        ref={sectionRef}
        className="relative flex min-h-[92svh] items-end overflow-hidden bg-background pb-10 pt-28 sm:pb-14 lg:pb-16"
      >
        {/* Floating gradient blobs */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute -left-[20%] top-[10%] h-[60vw] max-h-[800px] w-[60vw] max-w-[800px] rounded-full bg-accent/8 blur-[120px]"
            style={{ x: useTransform(smoothX, [-0.5, 0.5], ["5%", "-5%"]), y: useTransform(smoothY, [-0.5, 0.5], ["5%", "-5%"]) }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="absolute -right-[15%] bottom-[20%] h-[50vw] max-h-[700px] w-[50vw] max-w-[700px] rounded-full bg-accent-warm/6 blur-[100px]"
            style={{ x: useTransform(smoothX, [-0.5, 0.5], ["-4%", "4%"]), y: useTransform(smoothY, [-0.5, 0.5], ["-4%", "4%"]) }}
          />
        </div>

        <motion.div
          initial={{ scale: 1.08, opacity: 0.85 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 0.61, 0.36, 1] }}
          className="absolute inset-0 will-change-transform"
          style={{ x: imageX, y: imageY }}
        >
          <Image
            src={hero.image}
            alt={hero.imageAlt}
            fill
            loading="eager"
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
        </motion.div>
        <div className="media-grade absolute inset-0" />
        <div className="image-grid-overlay absolute inset-0 opacity-35" />

        <motion.div
          className="section relative z-10 w-full"
          style={{ x: contentX }}
        >
          <div className="section-inner">
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
              className="eyebrow text-accent"
            >
              {hero.eyebrow}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
              className="mt-7 max-w-6xl text-balance text-[clamp(3.5rem,8.4vw,8.5rem)] font-[470] leading-[0.92] tracking-[-0.055em] text-text-primary"
            >
              {hero.title}
            </motion.h1>
            <div className="mt-8 grid gap-8 border-t border-white/20 pt-7 lg:grid-cols-12 lg:items-end">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.48, ease: [0.22, 0.61, 0.36, 1] }}
                className="max-w-xl text-lg leading-relaxed text-[#d0d5d2] sm:text-xl lg:col-span-6"
              >
                {hero.subhead}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.58, ease: [0.22, 0.61, 0.36, 1] }}
                className="flex flex-col gap-3 sm:flex-row lg:col-span-6 lg:justify-end"
              >
                <span className="relative inline-flex">
                  <span className="absolute inset-0 rounded-[16px_6px_16px_16px] bg-accent/20 blur-xl transition-opacity duration-700" />
                  <Button href={localizedHref(locale, "/contact/")} size="large" icon={<ArrowRight size={18} />}>
                    {hero.primaryCta}
                  </Button>
                </span>
                <Button href="#process" variant="secondary" size="large" icon={<ArrowDown size={18} />}>
                  {hero.secondaryCta}
                </Button>
              </motion.div>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
              className="mt-6 font-mono text-[0.625rem] uppercase tracking-[0.13em] text-white/55"
            >
              {hero.caption}
            </motion.p>
          </div>
        </motion.div>
      </section>
    </>
  );
}
