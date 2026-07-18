import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactForm } from "@/components/sections/ContactForm";
import { ContactDetails } from "@/components/sections/ContactDetails";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta, pageBreadcrumbLd, CONTACT, SITE_URL } from "@/lib/seo";

export const metadata = pageMeta({
  locale: "sv",
  path: "/contact/",
  title: "Kontakt",
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
        <PageHeader
          label="Kontakt"
          title="Kontakta IM Vision"
          description="Vi hjälper dig med permanenta LED-installationer, uthyrning och teknisk support. Berätta om ditt projekt så återkommer vi samma arbetsdag."
          className="pt-[220px] md:pt-[240px] lg:pt-[260px]"
        />
        <section className="theme-light section section-space bg-background !pt-12 md:!pt-16 lg:!pt-20">
          <div className="section-inner">
            <ContactForm locale="sv" />
            <ContactDetails locale="sv" />
          </div>
        </section>
      </main>
      <Footer locale="sv" />
    </>
  );
}
