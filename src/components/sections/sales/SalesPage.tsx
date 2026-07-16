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

interface SalesPageProps {
  locale: Locale;
}

export function SalesPage({ locale }: SalesPageProps) {
  const content = salesContent[locale];

  return (
    <>
      <SalesHero locale={locale} content={content} />
      <main id="main-content">
        <SalesIntro locale={locale} content={content} />
        <SalesUseCases locale={locale} content={content} />
        <SalesProcess locale={locale} content={content} />
        <SalesArchitecturalIntegration locale={locale} content={content} />
        <SalesTechnicalPrinciples locale={locale} content={content} />
        <SalesResponsibility locale={locale} content={content} />
        <SalesFeaturedProjects locale={locale} content={content} />
        <SalesService locale={locale} content={content} />
        <SalesProjectForm locale={locale} content={content} />
        <SalesFinalCta locale={locale} content={content} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
