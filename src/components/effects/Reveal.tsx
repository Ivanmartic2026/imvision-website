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
      opacity: 0,
      y: initial.y,
      x: initial.x,
    },
    visible: {
      opacity: 1,
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
