import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactForm } from "@/components/sections/ContactForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta, pageBreadcrumbLd, CONTACT, SITE_URL } from "@/lib/seo";

export const metadata = pageMeta({
  locale: "en",
  path: "/contact/",
  title: "Contact",
  description:
    "Talk to IM Vision about buying, renting, installing or servicing LED displays across Europe. We reply within one business day.",
});

const contactPageLd = {
  "@context": "https://schema.org",
  "@graph": [
    pageBreadcrumbLd("en", "/contact/", "Contact"),
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

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactPageLd} />
      <Header />
      <main id="main-content">
        <section className="theme-light section section-space bg-background">
          <div className="section-inner">
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
