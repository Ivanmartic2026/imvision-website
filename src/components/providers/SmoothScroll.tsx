"use client";

import { useEffect, ReactNode } from "react";
import Lenis from "lenis";
import { MotionConfig } from "motion/react";

interface SmoothScrollProps {
  children: ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const photonEase = (t: number) => 1 - Math.pow(1 - t, 3.6);
    const lenis = new Lenis({
      autoRaf: true,
      autoToggle: true,
      duration: 1.15,
      easing: photonEase,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.82,
      touchMultiplier: 1,
      overscroll: true,
      stopInertiaOnNavigate: true,
      anchors: {
        offset: -80,
        duration: 1.2,
        easing: photonEase,
      },
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  // reducedMotion="user" makes every Framer Motion animation respect
  // prefers-reduced-motion (transforms/opacity are skipped to their end state).
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
