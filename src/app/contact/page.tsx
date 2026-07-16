import { Metadata } from "next";

import { Phone, Mail, MapPin, Check, ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactForm } from "@/components/sections/ContactForm";
import { Reveal } from "@/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to IM Vision about buying, renting, installing or servicing LED displays across Europe. We reply within one business day.",
  alternates: {
    canonical: "/contact/",
    languages: { en: "/contact/", sv: "/sv/contact/", "x-default": "/contact/" },
  },
};

const process = [
  { title: "Contact", body: "Share your project." },
  { title: "Needs analysis", body: "We ask the right questions." },
  { title: "Quote", body: "You receive a clear quote." },
  { title: "Delivery", body: "We deliver and install." },
];

const trust = [
  "Installations across Europe",
  "Own project managers and technicians",
  "Complete engineering, installation and service",
  "Premium LED partners",
  "Years of experience in professional LED",
];

export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHeader
          label="Contact"
          title="How can we help you?"
          description="Tell us briefly about your project or challenge. We usually reply the same business day."
        />

        <section className="theme-light section section-space bg-background">
          <div className="section-inner">
            <div className="mx-auto max-w-3xl">
              <Reveal>
                <div className="rounded-3xl border border-border-subtle bg-bg-surface p-7 shadow-[0_24px_80px_rgba(0,0,0,.06)] sm:p-10 lg:p-12">
                  <ContactForm />
                </div>
              </Reveal>
            </div>

            <div className="mx-auto mt-20 grid max-w-5xl gap-12 border-t border-border-subtle pt-16 lg:grid-cols-3">
              <Reveal>
                <p className="eyebrow text-accent">How it works</p>
                <ol className="mt-6 space-y-5">
                  {process.map((step, i) => (
                    <li key={step.title} className="flex gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 font-mono text-xs font-semibold text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="font-medium text-text-primary">{step.title}</p>
                        <p className="text-sm text-text-secondary">{step.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="eyebrow text-accent">Why IM Vision</p>
                <ul className="mt-6 space-y-3">
                  {trust.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-text-secondary">
                      <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="eyebrow text-accent">Direct contact</p>
                <div className="mt-6 space-y-3">
                  <a
                    href="tel:+46850520480"
                    className="group flex items-center gap-3 text-text-primary transition-colors hover:text-accent"
                  >
                    <Phone size={18} className="text-accent" strokeWidth={1.5} />
                    <span className="font-medium">+46 8 505 204 80</span>
                    <ArrowRight
                      size={14}
                      className="ml-auto text-text-muted transition-transform group-hover:translate-x-1"
                    />
                  </a>
                  <a
                    href="mailto:sales@imvision.se"
                    className="group flex items-center gap-3 text-text-primary transition-colors hover:text-accent"
                  >
                    <Mail size={18} className="text-accent" strokeWidth={1.5} />
                    <span className="font-medium">sales@imvision.se</span>
                    <ArrowRight
                      size={14}
                      className="ml-auto text-text-muted transition-transform group-hover:translate-x-1"
                    />
                  </a>
                  <div className="flex items-center gap-3 text-text-primary">
                    <MapPin size={18} className="text-accent" strokeWidth={1.5} />
                    <span className="font-medium">Spånga, Sweden</span>
                  </div>
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
