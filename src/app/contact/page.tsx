import { Metadata } from "next";
import { Phone, Mail, MapPin } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactForm } from "@/components/sections/ContactForm";
import { Reveal } from "@/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with IMvision. Let's discuss your LED display project.",
};

const contactItems = [
  {
    icon: Phone,
    label: "Phone",
    value: "+46 8 505 204 80",
    href: "tel:+46850520480",
  },
  {
    icon: Mail,
    label: "Email",
    value: "sales@imvision.se",
    href: "mailto:sales@imvision.se",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "Spånga, Sweden",
    href: "#",
  },
];

export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHeader
          label="Contact"
          title="Tell us what you are planning."
          description="A few lines are enough. We will take it from there."
        />

        <section className="section section-space">
          <div className="section-inner">
            <div className="grid gap-12 lg:grid-cols-5">
              <div className="lg:col-span-2">
                <Reveal>
                  <p className="eyebrow text-accent">Direct contact</p>
                  <h2 className="mt-6 text-3xl font-medium tracking-[-0.04em] text-text-primary sm:text-4xl">
                    Begin with a conversation.
                  </h2>
                  <p className="mt-4 text-text-secondary">
                    Permanent LED, rental, and service all begin here.
                  </p>
                </Reveal>

                <div className="mt-8 space-y-4">
                  {contactItems.map((item, index) => (
                    <Reveal key={item.label} delay={index * 0.1}>
                      <a
                        href={item.href}
                        className="group premium-card flex items-center gap-4 bg-bg-elevated p-5"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-[12px_4px_12px_12px] bg-background text-accent">
                          <item.icon size={22} strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                            {item.label}
                          </p>
                          <p className="mt-1 font-medium text-text-primary transition-colors group-hover:text-accent">
                            {item.value}
                          </p>
                        </div>
                      </a>
                    </Reveal>
                  ))}
                </div>

                <Reveal delay={0.4}>
                  <div className="mt-8 rounded-[24px] border border-accent/15 bg-accent/5 p-7">
                    <p className="font-medium text-text-primary">A useful first brief</p>
                    <p className="mt-2 text-text-secondary">
                      Place, timing, and ambition are enough. Technical details can follow.
                    </p>
                  </div>
                </Reveal>
              </div>

              <div className="lg:col-span-3">
                <Reveal delay={0.2}>
                  <div className="light-gate border border-border-subtle bg-bg-elevated p-7 shadow-[0_30px_90px_rgba(0,0,0,.22)] sm:p-10 lg:p-12">
                    <ContactForm />
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
