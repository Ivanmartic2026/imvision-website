import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactForm } from "@/components/sections/ContactForm";
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
      <Header locale="sv" />
      <main id="main-content">
        <section className="theme-light section section-space bg-background">
          <div className="section-inner">
            <ContactForm locale="sv" />
          </div>
        </section>
      </main>
      <Footer locale="sv" />
    </>
  );
}
