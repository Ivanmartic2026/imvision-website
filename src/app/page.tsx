import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { StoryTimeline } from "@/components/sections/StoryTimeline";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { Technology } from "@/components/sections/Technology";
import { PortfolioPreview } from "@/components/sections/PortfolioPreview";
import { ProjectSlider } from "@/components/sections/ProjectSlider";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { BusinessIntro } from "@/components/sections/BusinessIntro";
import { Locale } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  locale: "en",
  path: "/",
  // Absolute: the root layout's title.template does NOT apply to the same-segment
  // home page, so the brand must be included here explicitly.
  title: "IM Vision — LED displays: buy, rent, install & service across Europe",
  absoluteTitle: true,
  description:
    "IM Vision designs, engineers, installs and services premium LED displays for retail, events and digital-out-of-home — one accountable partner across Europe.",
});

export function HomePage({ locale = "en" }: { locale?: Locale }) {
  return (
    <>
      {/* Preload the hero LCP image (unoptimized static export doesn't auto-preload it).
          React 19 hoists this <link> into <head>. */}
      <link
        rel="preload"
        as="image"
        href="/images/photon-material/hero-experience-centre.jpg"
        fetchPriority="high"
      />
      <Header locale={locale} />
      <main id="main-content">
        <Hero locale={locale} />
        <BusinessIntro locale={locale} />
        <ProjectSlider locale={locale} />
        <ServicesPreview locale={locale} />
        <Technology locale={locale} />
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
