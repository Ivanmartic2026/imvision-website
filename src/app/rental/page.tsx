import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  CalendarRange,
  Radio,
  ShieldCheck,
  Sparkles,
  Truck,
  Wrench,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/effects/Reveal";
import { StaggerReveal, StaggerItem } from "@/components/effects/StaggerReveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta, pageBreadcrumbLd, serviceLd } from "@/lib/seo";

const capabilities = [
  {
    icon: CalendarRange,
    number: "01",
    title: "Built around the moment",
    description:
      "From focused brand activations to multi-day productions, the LED system is specified around your format, audience, and schedule.",
  },
  {
    icon: Truck,
    number: "02",
    title: "One technical partner",
    description:
      "Planning, logistics, rigging coordination, installation, calibration, and dismantling are managed as one delivery.",
  },
  {
    icon: Radio,
    number: "03",
    title: "Live confidence",
    description:
      "On-site technicians protect image quality and system performance from first signal to final frame.",
  },
];

const timeline = [
  {
    step: "Brief",
    detail: "Purpose, venue, audience, content, and production schedule.",
  },
  {
    step: "Engineer",
    detail: "Screen geometry, viewing distance, rigging, power, and signal flow.",
  },
  {
    step: "Prepare",
    detail: "Equipment testing, content checks, logistics, and crew planning.",
  },
  {
    step: "Deliver",
    detail: "Installation, calibration, live support, and controlled dismantling.",
  },
];

const deliveryScope = [
  { icon: Wrench, label: "Technical design" },
  { icon: Truck, label: "Logistics & installation" },
  { icon: Sparkles, label: "Pixel-perfect calibration" },
  { icon: ShieldCheck, label: "On-site operation" },
];

export const metadata: Metadata = pageMeta({
  locale: "en",
  path: "/rental/",
  title: "LED Rental for Events",
  description:
    "Event-grade LED screens delivered, installed, run and de-rigged by IM Vision's own crew — for launches, exhibitions and activations across Europe.",
});

export default function RentalPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="relative flex min-h-[92svh] items-end overflow-hidden bg-background pb-10 pt-28 sm:pb-14 lg:pb-16">
          <Image
            src="/images/photon-material/event-rental.jpg"
            alt="Immersive LED environment prepared for a premium live event"
            fill
            loading="eager"
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="media-grade absolute inset-0" />
          <div className="image-grid-overlay absolute inset-0 opacity-35" />
          <div className="section relative z-10 w-full">
            <div className="section-inner">
              <Reveal>
                <p className="eyebrow text-accent">IM / Rental systems</p>
              </Reveal>
              <h1 className="mt-7 max-w-5xl text-balance text-[clamp(3.5rem,8.4vw,8.5rem)] font-[470] leading-[0.92] tracking-[-0.055em] text-text-primary">
                Built for the
                <span className="block text-accent-soft">moment.</span>
              </h1>
              <div className="mt-8 grid gap-8 border-t border-white/20 pt-7 lg:grid-cols-12 lg:items-end">
                <Reveal delay={0.16} className="lg:col-span-6">
                  <p className="max-w-xl text-lg leading-relaxed text-[#d0d5d2] sm:text-xl">
                    Engineered LED environments for launches, exhibitions, live
                    productions, and temporary spaces — delivered as one complete
                    technical system.
                  </p>
                </Reveal>
                <Reveal delay={0.22} className="flex flex-col gap-3 sm:flex-row lg:col-span-6 lg:justify-end">
                  <Button href="/contact/" size="large" icon={<ArrowRight size={18} />}>
                    Plan your event
                  </Button>
                  <Button href="#rental-scope" variant="secondary" size="large" icon={<ArrowDown size={18} />}>
                    Explore rental
                  </Button>
                </Reveal>
              </div>
              <p className="mt-6 font-mono text-[0.625rem] uppercase tracking-[0.13em] text-white/55">
                Concept environment · Photon Material study
              </p>
            </div>
          </div>
        </section>

        <section id="rental-scope" className="theme-light section section-space bg-background">
          <div className="section-inner">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <Reveal>
                  <p className="eyebrow text-accent-dim">Rental, engineered</p>
                  <h2 className="heading-section mt-7 text-text-primary">
                    Temporary by nature. Precise by design.
                  </h2>
                </Reveal>
              </div>
              <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8 lg:pt-12">
                <p className="text-lg leading-relaxed text-text-secondary sm:text-xl">
                  Premium rental is not a screen arriving at a venue. It is a
                  coordinated system where structure, signal, content, and crew
                  are considered before load-in begins.
                </p>
              </Reveal>
            </div>

            <StaggerReveal className="mt-16 grid border-y border-border-subtle md:grid-cols-3 lg:mt-24">
              {capabilities.map((capability) => (
                <StaggerItem key={capability.title}>
                  <article className="group h-full border-b border-border-subtle py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0 lg:py-10">
                    <div className="flex items-start justify-between">
                      <capability.icon className="text-accent-dim" size={25} strokeWidth={1.4} />
                      <span className="font-mono text-xs text-text-muted">{capability.number}</span>
                    </div>
                    <h3 className="mt-16 text-2xl font-medium tracking-[-0.035em] text-text-primary">
                      {capability.title}
                    </h3>
                    <p className="mt-4 leading-relaxed text-text-secondary">
                      {capability.description}
                    </p>
                    <div className="mt-8 h-px w-10 bg-accent-dim transition-[width] duration-[800ms] ease-[cubic-bezier(.22,.61,.36,1)] group-hover:w-full" />
                  </article>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section section-space overflow-hidden bg-bg-elevated">
          <div className="section-inner">
            <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <Reveal>
                  <p className="eyebrow text-accent">From brief to live</p>
                  <h2 className="heading-section mt-7 text-text-primary">
                    One controlled flow.
                  </h2>
                  <p className="mt-7 max-w-md text-lg leading-relaxed text-text-secondary">
                    Every phase protects the next. That is how a temporary
                    installation feels effortless on site.
                  </p>
                </Reveal>
              </div>

              <div className="lg:col-span-7 lg:col-start-6">
                <StaggerReveal className="border-t border-border-subtle">
                  {timeline.map((item, index) => (
                    <StaggerItem key={item.step}>
                      <article className="grid gap-4 border-b border-border-subtle py-7 sm:grid-cols-[4rem_1fr_1.4fr] sm:items-start sm:gap-7">
                        <span className="font-mono text-xs text-accent">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 className="text-xl font-medium tracking-[-0.025em] text-text-primary">
                          {item.step}
                        </h3>
                        <p className="leading-relaxed text-text-secondary">
                          {item.detail}
                        </p>
                      </article>
                    </StaggerItem>
                  ))}
                </StaggerReveal>
              </div>
            </div>
          </div>
        </section>

        <section className="theme-light section section-space bg-background">
          <div className="section-inner">
            <div className="light-gate overflow-hidden border border-border-subtle bg-bg-elevated">
              <div className="grid lg:grid-cols-12">
                <div className="p-7 sm:p-10 lg:col-span-7 lg:p-14 xl:p-16">
                  <Reveal>
                    <p className="eyebrow text-accent-dim">Complete delivery</p>
                    <h2 className="mt-7 max-w-3xl text-[clamp(2.5rem,5vw,5.4rem)] font-[470] leading-[1.0] tracking-[-0.05em] text-text-primary">
                      The screen is only one part of the experience.
                    </h2>
                  </Reveal>
                </div>
                <div className="border-t border-border-subtle p-7 sm:p-10 lg:col-span-5 lg:border-l lg:border-t-0 lg:p-14">
                  <StaggerReveal className="divide-y divide-border-subtle border-y border-border-subtle">
                    {deliveryScope.map((item) => (
                      <StaggerItem key={item.label}>
                        <div className="flex items-center gap-4 py-5">
                          <item.icon size={20} strokeWidth={1.5} className="text-accent-dim" />
                          <span className="font-medium text-text-primary">{item.label}</span>
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerReveal>
                </div>
              </div>
              <div className="h-px photon-seam" />
            </div>
          </div>
        </section>

        <section className="section section-space bg-background">
          <div className="section-inner">
            <div className="light-gate relative overflow-hidden border border-border-subtle bg-bg-elevated p-8 sm:p-12 lg:p-20">
              <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
              <Reveal>
                <p className="eyebrow text-accent">Start with the brief</p>
                <h2 className="mt-7 max-w-4xl text-[clamp(2.7rem,6vw,6.5rem)] font-[470] leading-[0.97] tracking-[-0.052em] text-text-primary">
                  Make the technology disappear into the experience.
                </h2>
                <p className="mt-7 max-w-2xl text-lg leading-relaxed text-text-secondary sm:text-xl">
                  Share the venue, date, format, and ambition. We will turn it
                  into a considered rental system and technical delivery plan.
                </p>
                <div className="mt-9">
                  <Button href="/contact/" size="large" icon={<ArrowRight size={18} />}>
                    Discuss your event
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <JsonLd
        data={serviceLd("en", {
          name: "LED Rental for Events",
          description:
            "Event-grade LED screens delivered, installed, run and de-rigged by IM Vision's own crew — for launches, exhibitions and activations across Europe.",
          serviceType: "LED rental",
        })}
      />
      <JsonLd data={pageBreadcrumbLd("en", "/rental/", "LED Rental for Events")} />
    </>
  );
}
