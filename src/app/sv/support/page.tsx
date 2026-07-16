import type { Metadata } from "next";
import { BookOpen, MessageCircle, Phone } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Support",
  description: "Support och kontaktvägar för IM Vision LED-installationer i hela Europa.",
  alternates: {
    canonical: "/sv/support/",
    languages: { en: "/support/", sv: "/sv/support/", "x-default": "/support/" },
  },
};

export default function SwedishSupportPage() {
  return (
    <>
      <Header locale="sv" />
      <main id="main-content">
        <PageHeader label="Support" title="Vi finns här när ni behöver oss." description="Hitta kontaktvägar och supportalternativ för er IMvision-installation." />
        <section className="section section-space">
          <div className="section-inner grid gap-px overflow-hidden rounded-[24px_6px_24px_24px] border border-border-subtle bg-border-subtle md:grid-cols-3">
            <article className="bg-bg-elevated p-8 lg:p-10"><Phone className="text-accent" /><h2 className="mt-10 text-2xl font-medium">Ring support</h2><p className="mt-4 text-text-secondary">Kontakta teamet för hjälp med ett befintligt system.</p><div className="mt-7"><Button href="tel:+46850520480" variant="secondary">+46 8 505 204 80</Button></div></article>
            <article className="bg-bg-elevated p-8 lg:p-10"><MessageCircle className="text-accent" /><h2 className="mt-10 text-2xl font-medium">Beskriv ärendet</h2><p className="mt-4 text-text-secondary">Förbered systeminformation, plats och en tydlig felbeskrivning.</p><div className="mt-7"><Button href="/sv/contact/">Kontakta oss</Button></div></article>
            <article className="bg-bg-elevated p-8 lg:p-10"><BookOpen className="text-accent" /><h2 className="mt-10 text-2xl font-medium">Dokumentation</h2><p className="mt-4 text-text-secondary">Manualer och systemspecifik dokumentation tillhandahålls för levererade installationer.</p></article>
          </div>
        </section>
      </main>
      <Footer locale="sv" />
    </>
  );
}
