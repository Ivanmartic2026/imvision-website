import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { StoryTimeline } from "@/components/sections/StoryTimeline";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { Technology } from "@/components/sections/Technology";
import { ProjectSlider } from "@/components/sections/ProjectSlider";
import { ProofSection } from "@/components/sections/ProofSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { BusinessIntro } from "@/components/sections/BusinessIntro";
import { Locale } from "@/lib/i18n";

/**
 * Shared home layout, rendered by both /(en)/page and /(sv)/sv/page.
 *
 * Order (MASTERPROMPT §6): hero → proof → positioning → buy/rent → projects →
 * process → why us → FAQ → final CTA. Two things were deliberately removed:
 *  • `PortfolioPreview` — it repeated the project cards and carried the
 *    "environments" list; projects are shown once, in `ProjectSlider`.
 *  • The duplicate statistics block — replaced by verified project facts in
 *    `ProofSection` (see docs/claims-register.md).
 */
export function HomePage({ locale = "en" }: { locale?: Locale }) {
  return (
    <>
      {/* The hero <Image> below carries `priority`, so Next emits the optimized
          LCP preload (imagesrcset) automatically — no manual <link>. */}
      <Header locale={locale} />
      <main id="main-content">
        <Hero locale={locale} />
        <ProofSection locale={locale} />
        <BusinessIntro locale={locale} />
        <ServicesPreview locale={locale} />
        <ProjectSlider locale={locale} />
        <StoryTimeline locale={locale} />
        <Technology locale={locale} />
        <FaqSection locale={locale} />
        <ContactCTA locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
