import { Metadata } from "next";
import { Target, Compass, Users, ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/effects/Reveal";
import { StaggerReveal, StaggerItem } from "@/components/effects/StaggerReveal";

const values = [
  {
    icon: Target,
    title: "Precision",
    description:
      "Every pixel, every measurement, every connection matters. We engineer to exacting standards.",
  },
  {
    icon: Compass,
    title: "Innovation",
    description:
      "We continuously explore new display technologies, control systems, and design approaches.",
  },
  {
    icon: Users,
    title: "Partnership",
    description:
      "We work alongside our clients, from the first sketch to years of ongoing support.",
  },
];

const stats = [
  { value: "15+", label: "Years of experience" },
  { value: "500+", label: "Projects delivered" },
  { value: "98%", label: "Client satisfaction" },
  { value: "24/7", label: "Support available" },
];

export const metadata: Metadata = {
  title: "About IM Vision",
  description:
    "IM Vision designs, engineers, installs and services advanced LED display solutions — one accountable partner across Europe.",
  alternates: {
    canonical: "/about/",
    languages: { en: "/about/", sv: "/sv/about/", "x-default": "/about/" },
  },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHeader
          label="About"
          title="We are IMvision."
          description="We design, engineer, install, and maintain professional LED systems across Europe."
        />

        <section className="section section-space">
          <div className="section-inner">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <Reveal>
                <h2 className="max-w-[15ch] text-4xl font-[470] leading-[1.08] tracking-[-0.04em] text-text-primary sm:text-5xl lg:text-6xl">
                  Technology, design, and scale — delivered with confidence.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="max-w-[600px] text-lg leading-[1.75] text-text-secondary">
                  Based in Spånga, Sweden, we serve clients across the Nordics
                  and Europe. Our team combines deep technical expertise with a
                  sharp eye for design, ensuring every installation is as
                  reliable as it is impressive.
                </p>
                <p className="mt-5 max-w-[600px] text-lg leading-[1.75] text-text-secondary">
                  From a single retail screen to a city-scale digital facade, we
                  bring the same level of care, precision, and ambition to every
                  project.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section border-y border-border-subtle bg-bg-elevated py-24 md:py-32 lg:py-36">
          <div className="section-inner">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <Reveal key={stat.label} delay={index * 0.1}>
                  <div className="text-center">
                    <div className="font-mono text-4xl font-medium text-text-primary sm:text-5xl">
                      {stat.value}
                    </div>
                    <p className="mt-2 text-sm uppercase tracking-wider text-text-secondary">
                      {stat.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-space">
          <div className="section-inner">
            <div className="mb-16 max-w-3xl">
              <Reveal>
                <h2 className="text-4xl font-[470] tracking-[-0.04em] text-text-primary sm:text-5xl">
                  What drives us
                </h2>
              </Reveal>
            </div>

            <StaggerReveal className="grid gap-6 md:grid-cols-3">
              {values.map((value) => (
                <StaggerItem key={value.title}>
                  <div className="premium-card h-full bg-bg-elevated p-8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <value.icon size={26} strokeWidth={1.5} />
                    </div>
                    <h3 className="mt-8 text-xl font-medium text-text-primary">
                      {value.title}
                    </h3>
                    <p className="mt-3 text-text-secondary">
                      {value.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section section-space">
          <div className="section-inner">
            <div className="light-gate border border-border-subtle bg-[radial-gradient(circle_at_50%_0%,rgba(145,169,161,0.08),transparent_50%)] p-10 text-center lg:p-20">
              <Reveal>
                <h2 className="text-4xl font-[470] tracking-[-0.04em] text-text-primary sm:text-5xl">
                  Let&apos;s build something extraordinary
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
                  Whether you are exploring LED for the first time or scaling an
                  existing network, we would love to hear from you.
                </p>
                <div className="mt-8 flex justify-center">
                  <Button
                    href="/contact/"
                    size="large"
                    icon={<ArrowRight size={18} />}
                  >
                    Get in Touch
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
