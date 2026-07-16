import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontakta IMvision om permanenta LED-system, uthyrning, service eller partnerskap.",
};

export default function SwedishContactPage() {
  return (
    <>
      <Header locale="sv" />
      <main id="main-content">
        <PageHeader label="Kontakt" title="Berätta vad ni planerar." description="Några rader räcker. Vi tar det vidare därifrån." />
        <section className="section section-space">
          <div className="section-inner grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <p className="eyebrow text-accent">Direktkontakt</p>
              <h2 className="mt-8 text-4xl font-[470] leading-[1.08] tracking-[-0.04em] sm:text-5xl">Börja med en dialog.</h2>
              <div className="mt-8 space-y-4">
                <a href="tel:+46850520480" className="premium-card flex items-center gap-4 bg-bg-elevated p-5"><Phone className="text-accent" size={22} /><span>+46 8 505 204 80</span></a>
                <a href="mailto:sales@imvision.se" className="premium-card flex items-center gap-4 bg-bg-elevated p-5"><Mail className="text-accent" size={22} /><span>sales@imvision.se</span></a>
                <div className="premium-card flex items-center gap-4 bg-bg-elevated p-5"><MapPin className="text-accent" size={22} /><span>Spånga, Sverige</span></div>
              </div>
            </div>
            <div className="lg:col-span-3"><div className="light-gate border border-border-subtle bg-bg-elevated p-7 shadow-[0_30px_90px_rgba(0,0,0,.22)] sm:p-10 lg:p-12"><ContactForm locale="sv" /></div></div>
          </div>
        </section>
      </main>
      <Footer locale="sv" />
    </>
  );
}
