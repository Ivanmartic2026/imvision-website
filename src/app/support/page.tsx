import { Metadata } from "next";
import { BookOpen, Download, MessageCircle, ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/effects/Reveal";

const faqs = [
  {
    question: "How do I request emergency support?",
    answer:
      "Call our 24/7 support line at +46 8 505 204 80 or email support@imvision.se. Enterprise clients receive priority on-site dispatch.",
  },
  {
    question: "What is covered under a service agreement?",
    answer:
      "Depending on your tier, coverage includes preventive maintenance, remote monitoring, spare module management, software updates, and guaranteed response times.",
  },
  {
    question: "Can IMvision monitor my displays remotely?",
    answer:
      "Yes. Cloud-connected displays can be monitored 24/7 for health, temperature, signal status, and brightness performance.",
  },
  {
    question: "How long do LED displays typically last?",
    answer:
      "With proper maintenance, indoor LED displays can operate 80,000–100,000 hours. Outdoor displays typically have shorter lifespans depending on environmental exposure.",
  },
  {
    question: "Do you offer training for our team?",
    answer:
      "Yes. We provide operator training, content management guidance, and basic troubleshooting as part of most installations and service plans.",
  },
];

const resources = [
  {
    icon: BookOpen,
    title: "Documentation",
    description: "Access user manuals, installation guides, and specifications.",
  },
  {
    icon: Download,
    title: "Software Downloads",
    description: "Download control software, firmware, and configuration tools.",
  },
  {
    icon: MessageCircle,
    title: "Open a Ticket",
    description: "Describe your issue and our support team will respond quickly.",
  },
];

export const metadata: Metadata = {
  title: "Support",
  description:
    "IMvision support center. Find FAQs, documentation, and contact options for LED display service.",
};

export default function SupportPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHeader
          label="Support"
          title="We're here when you need us."
          description="Find answers, documentation, and support options for your IMvision LED installation."
        />

        <section className="section section-space">
          <div className="section-inner">
            <div className="grid gap-6 md:grid-cols-3">
              {resources.map((resource, index) => (
                <Reveal key={resource.title} delay={index * 0.1}>
                  <div className="premium-card h-full bg-bg-elevated p-8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <resource.icon size={26} strokeWidth={1.5} />
                    </div>
                    <h3 className="mt-8 text-xl font-medium text-text-primary">
                      {resource.title}
                    </h3>
                    <p className="mt-3 text-text-secondary">
                      {resource.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-space bg-bg-elevated">
          <div className="section-inner">
            <div className="mb-12 max-w-3xl">
              <Reveal>
                <h2 className="text-4xl font-[470] tracking-[-0.04em] text-text-primary sm:text-5xl">
                  Frequently asked questions
                </h2>
              </Reveal>
            </div>

            <div className="mx-auto max-w-4xl space-y-4">
              {faqs.map((faq, index) => (
                <Reveal key={faq.question} delay={index * 0.05}>
                  <details className="group rounded-[24px] border border-border-subtle bg-background p-7 transition-colors duration-[700ms] open:border-accent/30">
                    <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-medium text-text-primary">
                      {faq.question}
                      <span className="ml-4 transition-transform group-open:rotate-180">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          className="text-accent"
                        >
                          <path
                            d="M4 6L8 10L12 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </summary>
                    <p className="mt-4 text-text-secondary">{faq.answer}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-space">
          <div className="section-inner">
            <div className="light-gate border border-border-subtle bg-[radial-gradient(circle_at_50%_0%,rgba(145,169,161,0.08),transparent_50%)] p-10 text-center lg:p-20">
              <Reveal>
                <h2 className="text-4xl font-[470] tracking-[-0.04em] text-text-primary sm:text-5xl">
                  Still need help?
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
                  Our support team is available around the clock for service and
                  technical questions.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button
                    href="tel:+46850520480"
                    variant="secondary"
                    size="large"
                  >
                    Call Support
                  </Button>
                  <Button
                    href="/contact/"
                    size="large"
                    icon={<ArrowRight size={18} />}
                  >
                    Contact Us
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
