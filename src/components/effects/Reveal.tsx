"use client";

import { motion, Variants } from "motion/react";
import { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  once?: boolean;
}

/**
 * Scroll-reveal wrapper.
 *
 * The hidden state animates POSITION ONLY — never opacity. That is deliberate:
 * Framer writes the `initial` state into the server HTML, so an `opacity: 0`
 * starting point made every wrapped block invisible until React hydrated. When
 * hydration did not happen (a blocked chunk, a JS error, a client with JS off,
 * a crawler that does not execute scripts) the page rendered as a blank sheet
 * with only the header visible — 45 such blocks on the homepage alone.
 *
 * Moving opacity out of the equation means the worst case degrades to "content
 * is visible but slightly offset" instead of "content is gone". The slide
 * animation itself is unchanged.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.8,
  once = true,
}: RevealProps) {
  const directions = {
    up: { y: 22, x: 0 },
    down: { y: -22, x: 0 },
    left: { y: 0, x: -22 },
    right: { y: 0, x: 22 },
    none: { y: 0, x: 0 },
  };

  const initial = directions[direction];

  const variants: Variants = {
    hidden: {
      y: initial.y,
      x: initial.x,
    },
    visible: {
      y: 0,
      x: 0,
      transition: {
        duration,
        delay,
        ease: [0.22, 0.61, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
