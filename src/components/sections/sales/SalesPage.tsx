import { Footer } from "@/components/layout/Footer";
import { Locale } from "@/lib/i18n";
import { salesContent } from "@/lib/content/sales";
import { SalesHero } from "./SalesHero";
import { SalesIntro } from "./SalesIntro";
import { SalesUseCases } from "./SalesUseCases";
import { SalesProcess } from "./SalesProcess";
import { SalesArchitecturalIntegration } from "./SalesArchitecturalIntegration";
import { SalesTechnicalPrinciples } from "./SalesTechnicalPrinciples";
import { SalesResponsibility } from "./SalesResponsibility";
import { SalesFeaturedProjects } from "./SalesFeaturedProjects";
import { SalesService } from "./SalesService";
import { SalesProjectForm } from "./SalesProjectForm";
import { SalesFinalCta } from "./SalesFinalCta";
import { SalesMidCta } from "./SalesMidCta";

interface SalesPageProps {
  locale: Locale;
}

export function SalesPage({ locale }: SalesPageProps) {
  const content = salesContent[locale];

  return (
    <>
      <main id="main-content">
        <SalesHero locale={locale} content={content} />
        <SalesIntro locale={locale} content={content} />
        {/* References straight after the intro: the delivered work is the
            strongest argument for a permanent investment, so it no longer sits
            behind three technical sections. */}
        <SalesFeaturedProjects locale={locale} content={content} />
        <SalesUseCases locale={locale} content={content} />
        <SalesProcess locale={locale} content={content} />
        <SalesArchitecturalIntegration locale={locale} content={content} />
        <SalesTechnicalPrinciples locale={locale} content={content} />
        {/* Mid-CTA at ~50 % — reader has absorbed process + architectural + technical content, a natural break before the softer responsibility section. */}
        <SalesMidCta locale={locale} variant="sales" />
        <SalesResponsibility locale={locale} content={content} />
        <SalesService locale={locale} content={content} />
        {/* Mid-CTA at ~75 % — reader has seen projects and service overview, right before the contact form. Captures late-scrollers. */}
        <SalesMidCta locale={locale} variant="sales" />
        <SalesProjectForm locale={locale} content={content} />
        <SalesFinalCta locale={locale} content={content} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
