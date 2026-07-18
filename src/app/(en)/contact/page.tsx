import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactForm } from "@/components/sections/ContactForm";
import { ContactDetails } from "@/components/sections/ContactDetails";
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
      <Header locale="en" variant="light" />
      <main id="main-content">
        <PageHeader
          label="Contact"
          title="Contact IM Vision"
          description="Get help with permanent LED installations, LED rentals and technical support. Tell us about your project and we'll reply the same business day."
          className="pt-[220px] md:pt-[240px] lg:pt-[260px]"
        />
        <section className="theme-light section section-space bg-background !pt-12 md:!pt-16 lg:!pt-20">
          <div className="section-inner">
            <ContactForm />
            <ContactDetails />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
