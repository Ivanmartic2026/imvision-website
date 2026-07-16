"use client";

import { motion } from "motion/react";

interface PageHeaderProps {
  label?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function PageHeader({ label, title, description, children }: PageHeaderProps) {
  const words = title.trim().split(" ");
  const last = words.length > 1 ? words.pop() : "";
  const head = words.join(" ");

  return (
    <section className="relative flex min-h-[62vh] w-full items-end overflow-hidden bg-background pb-24 pt-36 lg:min-h-[72vh] lg:pb-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_20%,rgba(145,169,161,0.10),transparent_40%)]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "linear-gradient(to bottom, transparent, #000 60%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, #000 60%, transparent)",
        }}
      />
      <div className="section relative z-10 w-full">
        <div className="section-inner max-w-6xl">
          {label && (
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
              className="mb-7 inline-flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-accent"
            >
              <span className="h-px w-8 bg-accent" />
              {label}
            </motion.span>
          )}
          <motion.h1
            // Visible from first paint (no opacity gate) so it stays the LCP
            // element and survives even if hydration is slow; the slide is a
            // pure enhancement.
            initial={{ y: 22 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 0.61, 0.36, 1] }}
            className="max-w-[13ch] text-balance text-[clamp(3.1rem,7.2vw,7.1rem)] font-[470] leading-[0.98] tracking-[-0.048em] text-text-primary"
          >
            {head}
            {last && (
              <>
                {" "}
                <span className="text-accent-soft">{last}</span>
              </>
            )}
          </motion.h1>
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
              className="mt-9 max-w-[620px] text-lg leading-[1.75] text-text-secondary sm:text-xl"
            >
              {description}
            </motion.p>
          )}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
              className="mt-8"
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
