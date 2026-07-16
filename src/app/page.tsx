import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { StoryTimeline } from "@/components/sections/StoryTimeline";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { PortfolioPreview } from "@/components/sections/PortfolioPreview";
import { ProjectSlider } from "@/components/sections/ProjectSlider";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { BusinessIntro } from "@/components/sections/BusinessIntro";
import { Locale } from "@/lib/i18n";

export const metadata = {
  alternates: {
    canonical: "/",
    languages: { en: "/", sv: "/sv/" },
  },
};

export function HomePage({ locale = "en" }: { locale?: Locale }) {
  return (
    <>
      <Header locale={locale} />
      <main id="main-content">
        <Hero locale={locale} />
        <BusinessIntro locale={locale} />
        <ProjectSlider locale={locale} />
        <ServicesPreview locale={locale} />
        <PortfolioPreview locale={locale} />
        <StoryTimeline locale={locale} />
        <ContactCTA locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}

export default function Home() {
  return <HomePage />;
}
