"use client";

import Image from "next/image";
import { Store, Focus, Building2 } from "lucide-react";
import { Reveal } from "@/components/effects/Reveal";
import { StaggerReveal, StaggerItem } from "@/components/effects/StaggerReveal";
import { SalesSectionProps } from "./types";

const icons = [Store, Focus, Building2];

export function SalesUseCases({ content }: SalesSectionProps) {
  const { useCases } = content;

  return (
    <section id="sales-scope" className="theme-light section section-space bg-background">
      <div className="section-inner">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow text-accent-dim">{useCases.eyebrow}</p>
            <h2 className="heading-section mt-7 text-text-primary">{useCases.title}</h2>
          </Reveal>
          <Reveal delay={0.12} className="lg:col-span-5 lg:col-start-8 lg:pt-10">
            <p className="text-lg leading-relaxed text-text-secondary sm:text-xl">{useCases.body}</p>
          </Reveal>
        </div>

        <StaggerReveal className="mt-16 lg:mt-24" stagger={0.12}>
          {useCases.items.map((item, index) => {
            const isEven = index % 2 === 0;
            const Icon = icons[index];
            return (
              <StaggerItem key={item.number}>
                <article className="group grid border-t border-border-subtle py-12 transition-colors duration-700 ease-[cubic-bezier(.22,.61,.36,1)] hover:bg-white/[.015] lg:grid-cols-12 lg:gap-16 lg:py-20">
                  <div
                    className={`relative aspect-[4/3] overflow-hidden rounded-[24px_8px_24px_24px] border border-transparent transition-all duration-700 ease-[cubic-bezier(.22,.61,.36,1)] group-hover:-translate-y-1 group-hover:border-border-subtle group-hover:shadow-[0_28px_80px_rgba(0,0,0,.12)] lg:col-span-6 ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(.22,.61,.36,1)] group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-black/[0.04]" />
                  </div>
                  <div
                    className={`flex flex-col justify-center pt-8 lg:col-span-5 lg:pt-0 ${
                      isEven ? "lg:order-2 lg:col-start-8" : "lg:order-1"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <Icon size={24} strokeWidth={1.4} className="text-accent-dim transition-colors duration-500 group-hover:text-accent" />
                      <span className="font-mono text-xs text-text-muted">{item.number}</span>
                    </div>
                    <h3 className="mt-6 text-2xl font-medium tracking-[-0.035em] text-text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-4 leading-relaxed text-text-secondary">{item.description}</p>
                    <div className="mt-8 h-px w-10 bg-accent-dim transition-[width] duration-[800ms] ease-[cubic-bezier(.22,.61,.36,1)] group-hover:w-full" />
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerReveal>
      </div>
    </section>
  );
}
