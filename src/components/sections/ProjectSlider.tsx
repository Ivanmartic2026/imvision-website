"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Locale, localizedHref } from "@/lib/i18n";
import { projects, Project } from "@/lib/projects";
import { swedishProjectCopy } from "@/lib/projects-sv";

const SLIDER_PROJECTS = [
  "the-icon",
  "the-halo",
  "the-curve",
  "kappahl",
  "sas-nordic-lounges",
  "nordstan-facade",
];

const LG_QUERY = "(min-width: 1024px)";

function localizeProject(project: Project, locale: Locale): Project {
  if (locale === "en") return project;
  const copy = swedishProjectCopy[project.slug];
  if (!copy) return project;
  return {
    ...project,
    title: copy.title,
    category: copy.category,
    description: copy.description,
    longDescription: copy.longDescription,
  };
}

interface ProjectSliderProps {
  locale?: Locale;
}

export function ProjectSlider({ locale = "en" }: ProjectSliderProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const nativeTrackRef = useRef<HTMLDivElement>(null);

  const [isLg, setIsLg] = useState(false);
  const [scrollDistance, setScrollDistance] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = SLIDER_PROJECTS.map((slug) => {
    const project = projects.find((p) => p.slug === slug);
    if (!project) return null;
    return localizeProject(project, locale);
  }).filter(Boolean) as Project[];

  // Detect desktop breakpoint.
  useEffect(() => {
    const mq = window.matchMedia(LG_QUERY);
    const update = () => setIsLg(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Measure how far the pinned track needs to travel on desktop.
  const measureScrollDistance = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const distance = track.scrollWidth - track.offsetWidth;
    setScrollDistance(Math.max(distance, 0));
  }, []);

  useEffect(() => {
    measureScrollDistance();
    window.addEventListener("resize", measureScrollDistance);
    return () => window.removeEventListener("resize", measureScrollDistance);
  }, [measureScrollDistance, isLg]);

  // Pinned horizontal scroll progress on desktop.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const rawX = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);
  const x = useSpring(rawX, { stiffness: 80, damping: 24, restDelta: 0.5 });
  const progressValue = useMotionValue(0);
  const smoothProgress = useSpring(progressValue, { stiffness: 80, damping: 24 });
  const progressWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    if (!isLg) return;
    return scrollYProgress.on("change", (v) => {
      progressValue.set(scrollDistance > 0 ? v : 0);
    });
  }, [scrollYProgress, progressValue, scrollDistance, isLg]);

  // Native horizontal scroll state for mobile.
  const checkNativeScroll = useCallback(() => {
    const el = nativeTrackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
    const cardWidth = el.firstElementChild?.clientWidth || 1;
    const gap = 24;
    const index = Math.round(el.scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.min(Math.max(index, 0), slides.length - 1));
  }, [slides.length]);

  // Active index follows pinned scroll progress on desktop.
  useEffect(() => {
    if (!isLg) return;
    return scrollYProgress.on("change", (v) => {
      const index = Math.round(v * (slides.length - 1));
      setActiveIndex(Math.min(Math.max(index, 0), slides.length - 1));
    });
  }, [scrollYProgress, slides.length, isLg]);

  useEffect(() => {
    const el = nativeTrackRef.current;
    if (!el) return;
    checkNativeScroll();
    el.addEventListener("scroll", checkNativeScroll, { passive: true });
    window.addEventListener("resize", checkNativeScroll);
    return () => {
      el.removeEventListener("scroll", checkNativeScroll);
      window.removeEventListener("resize", checkNativeScroll);
    };
  }, [checkNativeScroll]);

  const scrollNativeBy = (direction: number) => {
    const el = nativeTrackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    if (!card) return;
    const gap = 24;
    el.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: "smooth" });
  };

  const renderCard = (project: Project, index: number, isPinned: boolean) => (
    <motion.article
      key={project.slug}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, delay: index * 0.08, ease: [0.22, 0.61, 0.36, 1] }}
      className={`group relative flex-shrink-0 ${
        isPinned
          ? "w-[76vw] lg:w-[38vw] xl:w-[32vw]"
          : "w-[85vw] snap-start md:w-[45vw] lg:w-[calc(33.333%-1rem)]"
      }`}
    >
      <Link
        href={localizedHref(locale, `/projects/${project.slug}/`)}
        className="light-gate block h-full overflow-hidden border border-border-subtle bg-bg-elevated/60 backdrop-blur-sm transition-all duration-[700ms] ease-[cubic-bezier(.22,.61,.36,1)] hover:-translate-y-1.5 hover:border-accent/30 hover:bg-bg-elevated hover:shadow-[0_28px_80px_rgba(0,0,0,.22),0_0_40px_rgba(145,169,161,.08)]"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={project.image}
            alt={project.visualLabel || project.title}
            fill
            sizes={
              isPinned
                ? "(max-width: 1024px) 76vw, (max-width: 1280px) 38vw, 32vw"
                : "(max-width: 768px) 85vw, (max-width: 1024px) 45vw, 33vw"
            }
            className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.22,.61,.36,1)] group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070807]/60 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-px photon-seam" />
          <span className="absolute left-4 top-4 rounded-[10px_3px_10px_10px] bg-[#070807]/75 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#f2f0e9] backdrop-blur-md">
            {project.location}
          </span>
          <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#070807]/60 text-text-primary opacity-0 backdrop-blur-md transition-all duration-500 group-hover:opacity-100">
            <ArrowUpRight size={18} className="-rotate-45 transition-transform duration-500 group-hover:rotate-0" />
          </div>
        </div>
        <div className="p-6">
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-accent-dim transition-colors duration-500 group-hover:text-accent">
            {project.category}
          </span>
          <h3 className="mt-2 text-xl font-medium tracking-[-0.025em] text-text-primary lg:text-2xl">
            {project.title}
          </h3>
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-text-secondary">
            {project.description}
          </p>
        </div>
      </Link>
    </motion.article>
  );

  return (
    <section
      ref={sectionRef}
      id="projekt-slider"
      className="relative bg-background lg:h-screen"
      style={{ height: isLg ? `calc(100vh + ${scrollDistance}px)` : "auto" }}
      aria-labelledby="project-slider-title"
    >
      <div className="section-inner sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-16 lg:py-24">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-4xl">
            <SectionLabel>{locale === "sv" ? "Utvalda projekt" : "Selected projects"}</SectionLabel>
            <h2 id="project-slider-title" className="heading-section mt-6 max-w-[16ch]">
              {locale === "sv" ? "Arbeten som syns." : "Work that gets seen."}
            </h2>
          </div>

          <div className="flex items-center justify-between gap-4 lg:justify-start">
            <Link
              href={localizedHref(locale, "/projects/")}
              className="group inline-flex items-center gap-2 self-start border-b border-accent pb-1 text-sm font-semibold text-text-primary lg:self-auto"
            >
              {locale === "sv" ? "Utforska alla projekt" : "Explore all projects"}
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => scrollNativeBy(-1)}
                disabled={!canScrollLeft}
                aria-label={locale === "sv" ? "Föregående projekt" : "Previous project"}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border-subtle bg-bg-elevated/60 text-text-primary backdrop-blur-sm transition-all duration-300 hover:border-accent/40 hover:bg-bg-elevated hover:text-accent disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => scrollNativeBy(1)}
                disabled={!canScrollRight}
                aria-label={locale === "sv" ? "Nästa projekt" : "Next project"}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border-subtle bg-bg-elevated/60 text-text-primary backdrop-blur-sm transition-all duration-300 hover:border-accent/40 hover:bg-bg-elevated hover:text-accent disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="relative mt-10 lg:mt-14">
          {/* Mobile / tablet: native horizontal scroll */}
          <div
            ref={nativeTrackRef}
            className="scrollbar-hide -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 lg:hidden"
          >
            {slides.map((project, index) => renderCard(project, index, false))}
          </div>

          {/* Desktop: pinned horizontal scroll track */}
          <motion.div
            ref={trackRef}
            className="hidden gap-6 lg:flex"
            style={{ x }}
          >
            {slides.map((project, index) => renderCard(project, index, true))}
          </motion.div>

          <div className="mt-8 flex items-center justify-between gap-8 lg:mt-10">
            <div className="relative h-[2px] max-w-xs flex-1 overflow-hidden rounded-full bg-border-subtle">
              <motion.div
                className="absolute left-0 top-0 h-full bg-accent"
                style={{ width: progressWidth }}
              />
            </div>
            <div className="font-mono text-xs uppercase tracking-[0.12em] text-text-muted">
              <span className="text-text-primary">{String(activeIndex + 1).padStart(2, "0")}</span>
              {" / "}
              {String(slides.length).padStart(2, "0")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
