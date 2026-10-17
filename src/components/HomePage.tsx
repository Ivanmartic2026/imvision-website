import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { StoryTimeline } from "@/components/sections/StoryTimeline";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { Technology } from "@/components/sections/Technology";
import { PortfolioPreview } from "@/components/sections/PortfolioPreview";
import { ProjectSlider } from "@/components/sections/ProjectSlider";
import { ProofSection } from "@/components/sections/ProofSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { BusinessIntro } from "@/components/sections/BusinessIntro";
import { Locale } from "@/lib/i18n";

/** Shared home layout, rendered by both /(en)/page and /(sv)/sv/page. */
export function HomePage({ locale = "en" }: { locale?: Locale }) {
  return (
    <>
      {/* The hero <Image> below carries `priority`, so Next emits the optimized
          LCP preload (imagesrcset) automatically — no manual <link>. */}
      <Header locale={locale} />
      <main id="main-content">
        <Hero locale={locale} />
        <BusinessIntro locale={locale} />
        <ProjectSlider locale={locale} />
        <ServicesPreview locale={locale} />
        <Technology locale={locale} />
        <PortfolioPreview locale={locale} />
        <StoryTimeline locale={locale} />
        {/* Credibility before objections: show the delivered work first, then
            answer the purchase questions, then ask for the contact. */}
        <ProofSection locale={locale} />
        <FaqSection locale={locale} />
        <ContactCTA locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
