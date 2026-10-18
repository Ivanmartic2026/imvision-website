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
  locale: "en",
  path: "/contact/",
  title: "Contact — LED Display Sales, Rental & Service",
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
      <Header locale="en" variant="light" />
      <main id="main-content">
        <ContactHero
          locale="en"
          label="Contact"
          title="Contact IM Vision"
          description="Get help with permanent LED installations, LED rentals and technical support. Tell us about your project and we'll reply the same business day."
        >
          <Suspense
            fallback={<ContactForm locale="en" variant="panel" defaultCategory="buy" />}
          >
            <ContactFormPanel locale="en" />
          </Suspense>
        </ContactHero>
        <section className="theme-light section bg-background pb-16 pt-4 md:pb-20">
          <div className="section-inner">
            <ContactDetails locale="en" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
