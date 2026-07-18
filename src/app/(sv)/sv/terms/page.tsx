import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta, pageBreadcrumbLd } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  locale: "sv",
  path: "/terms/",
  title: "Användarvillkor",
  description:
    "Villkor för användning av IM Visions webbplats och våra LED-tjänster.",
});

export default function SwedishTermsPage() {
  return (
    <>
      <Header locale="sv" />
      <main id="main-content">
        <PageHeader
          label="Juridiskt"
          title="Användarvillkor."
          description="Villkoren som gäller när du använder vår webbplats och våra tjänster."
        />

        <section className="section section-space">
          <div className="section-inner max-w-3xl">
            <div className="prose prose-lg prose-invert max-w-none text-text-secondary">
              <h2 className="text-2xl font-medium text-text-primary">1. Allmänt</h2>
              <p>
                Dessa villkor gäller för din användning av IM Visions webbplats och för all
                information och de tjänster som tillhandahålls genom den. Genom att använda
                webbplatsen accepterar du villkoren.
              </p>

              <h2 className="mt-12 text-2xl font-medium text-text-primary">2. Användning av webbplatsen</h2>
              <p>
                Du får använda webbplatsen endast för lagliga ändamål. Du får inte försöka skada,
                inaktivera eller påverka webbplatsen eller dess innehåll.
              </p>

              <h2 className="mt-12 text-2xl font-medium text-text-primary">3. Offerter och avtal</h2>
              <p>
                Information på webbplatsen är av allmän vägledande natur. Offerter,
                projektspecifikationer, leveransvillkor och priser bekräftas i separata skriftliga
                avtal.
              </p>

              <h2 className="mt-12 text-2xl font-medium text-text-primary">4. Immateriella rättigheter</h2>
              <p>
                Allt innehåll på denna webbplats, inklusive text, bilder, grafik och varumärken,
                ägs av IM Vision eller dess licensgivare och skyddas av upphovsrätt och andra
                immateriella rättigheter.
              </p>

              <h2 className="mt-12 text-2xl font-medium text-text-primary">5. Ansvar</h2>
              <p>
                IM Vision ansvarar inte för indirekta skador eller förluster som uppstår genom
                användning av webbplatsen. Vårt ansvar för levererade produkter och tjänster
                regleras av det aktuella avtalet.
              </p>

              <h2 className="mt-12 text-2xl font-medium text-text-primary">6. Länkar till tredje parts webbplatser</h2>
              <p>
                Webbplatsen kan innehålla länkar till externa webbplatser. IM Vision ansvarar inte
                för innehållet eller praxis på dessa webbplatser.
              </p>

              <h2 className="mt-12 text-2xl font-medium text-text-primary">7. Ändringar av villkoren</h2>
              <p>
                Vi kan komma att uppdatera dessa villkor. Den aktuella versionen finns alltid
                tillgänglig på denna sida.
              </p>

              <h2 className="mt-12 text-2xl font-medium text-text-primary">8. Tillämplig lag</h2>
              <p>
                Dessa villkor regleras av svensk lag. Eventuella tvister ska lösas av svensk
                domstol.
              </p>

              <h2 className="mt-12 text-2xl font-medium text-text-primary">9. Kontakt</h2>
              <p>
                Vid frågor om dessa villkor, kontakta{" "}
                <a href="mailto:info@imvision.se" className="text-accent hover:underline">
                  info@imvision.se
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer locale="sv" />
      <JsonLd data={pageBreadcrumbLd("sv", "/terms/", "Användarvillkor")} />
    </>
  );
}
