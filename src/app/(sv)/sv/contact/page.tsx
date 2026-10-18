import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Suspense } from "react";
import { ContactForm } from "@/components/sections/ContactForm";
import { ContactFormPanel } from "@/components/sections/contact/ContactFormPanel";
import { ContactDetails } from "@/components/sections/ContactDetails";
import { ContactHero } from "@/components/sections/contact/ContactHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta, pageBreadcrumbLd, CONTACT, SITE_URL } from "@/lib/seo";

export const metadata = pageMeta({
  locale: "sv",
  path: "/contact/",
  title: "Kontakt — köp, hyra och service av LED-skärmar",
  description:
    "Kontakta IM Vision om köp, hyra, installation eller service av LED-skärmar i hela Europa. Vi svarar inom en arbetsdag.",
});

const contactPageLd = {
  "@context": "https://schema.org",
  "@graph": [
    pageBreadcrumbLd("sv", "/contact/", "Kontakt"),
    {
      "@type": "ContactPoint",
      "@id": `${SITE_URL}/#contact`,
      telephone: CONTACT.phoneE164,
      email: CONTACT.email,
      contactType: "sales",
      availableLanguage: ["English", "Swedish"],
      areaServed: "Europe",
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      },
    },
  ],
};

export default function SwedishContactPage() {
  return (
    <>
      <JsonLd data={contactPageLd} />
      <Header locale="sv" variant="light" />
      <main id="main-content">
        <ContactHero
          locale="sv"
          label="Kontakt"
          title="Kontakta IM Vision"
          description="Vi hjälper dig med permanenta LED-installationer, uthyrning och teknisk support. Berätta om ditt projekt så återkommer vi samma arbetsdag."
        >
          <Suspense
            fallback={<ContactForm locale="sv" variant="panel" defaultCategory="buy" />}
          >
            <ContactFormPanel locale="sv" />
          </Suspense>
        </ContactHero>
        <section className="theme-light section bg-background pb-16 pt-4 md:pb-20">
          <div className="section-inner">
            <ContactDetails locale="sv" />
          </div>
        </section>
      </main>
      <Footer locale="sv" />
    </>
  );
}
