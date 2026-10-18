"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}

/**
 * Staggered scroll-reveal. See the note in Reveal.tsx: neither the group nor the
 * items animate opacity, because Framer writes the `initial` state into the
 * server HTML and `opacity: 0` there hides content whenever React never
 * hydrates. Position-only means the content stays readable in every case.
 */
export function StaggerReveal({
  children,
  className,
  stagger = 0.1,
  delay = 0,
}: StaggerRevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { y: 24 },
        visible: {
          y: 0,
          transition: { duration: 0.75, ease: [0.22, 0.61, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
