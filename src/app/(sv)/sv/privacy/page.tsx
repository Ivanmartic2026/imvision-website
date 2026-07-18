import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta, pageBreadcrumbLd } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  locale: "sv",
  path: "/privacy/",
  title: "Integritetspolicy",
  description:
    "Hur IM Vision samlar in, använder och skyddar personuppgifter när du besöker vår webbplats eller kontaktar oss om LED-lösningar.",
});

export default function SwedishPrivacyPage() {
  return (
    <>
      <Header locale="sv" />
      <main id="main-content">
        <PageHeader
          label="Juridiskt"
          title="Integritetspolicy."
          description="Hur vi hanterar personuppgifter och respekterar din integritet."
        />

        <section className="section section-space">
          <div className="section-inner max-w-3xl">
            <div className="prose prose-lg prose-invert max-w-none text-text-secondary">
              <h2 className="text-2xl font-medium text-text-primary">1. Personuppgiftsansvarig</h2>
              <p>
                IM Vision Group AB, org.nr 556924-1200 (”IM Vision”, ”vi”, ”oss”) är personuppgiftsansvarig för de
                personuppgifter som behandlas via denna webbplats och i samband med förfrågningar
                om våra LED-lösningar.
              </p>

              <h2 className="mt-12 text-2xl font-medium text-text-primary">2. Vilka uppgifter vi samlar in</h2>
              <p>
                Vi samlar endast in personuppgifter som är nödvändiga för ändamålet. Det kan vara
                ditt namn, företag, e-postadress, telefonnummer och innehållet i ditt meddelande när
                du använder vårt kontaktformulär eller kommunicerar med oss.
              </p>

              <h2 className="mt-12 text-2xl font-medium text-text-primary">3. Varför vi behandlar dina uppgifter</h2>
              <ul className="list-disc space-y-2 pl-5">
                <li>För att besvara förfrågningar och lämna offerter.</li>
                <li>För att planera, leverera och supporta LED-installationer.</li>
                <li>För att uppfylla rättsliga eller avtalsenliga förpliktelser.</li>
              </ul>

              <h2 className="mt-12 text-2xl font-medium text-text-primary">4. Rättslig grund</h2>
              <p>
                Behandlingen grundar sig på vårt berättigade intresse att kommunicera med
                befintliga och potentiella kunder, eller på avtalsenlig nödvändighet för att
                fullgöra ett avtal med dig.
              </p>

              <h2 className="mt-12 text-2xl font-medium text-text-primary">5. Hur länge vi sparar dina uppgifter</h2>
              <p>
                Vi sparar personuppgifter endast så länge det behövs för de angivna ändamålen, eller
                så länge det krävs enligt tillämplig lag.
              </p>

              <h2 className="mt-12 text-2xl font-medium text-text-primary">6. Cookies och analys</h2>
              <p>
                Denna webbplats använder inte analyscookies eller marknadsföringscookies från
                tredje part. Eventuella cookies är uteslutande tekniskt nödvändiga för att sidan ska
                fungera.
              </p>

              <h2 className="mt-12 text-2xl font-medium text-text-primary">7. Dina rättigheter</h2>
              <p>
                Du har rätt att få tillgång till, rätta, radera eller begränsa behandlingen av dina
                personuppgifter. Du kan också invända mot behandling eller begära dataportabilitet.
              </p>

              <h2 className="mt-12 text-2xl font-medium text-text-primary">8. Kontakt</h2>
              <p>
                Frågor om integritet kan skickas till{" "}
                <a href="mailto:info@imvision.se" className="text-accent hover:underline">
                  info@imvision.se
                </a>{" "}
                eller per post till IM Vision Group AB, Herkulesvägen 56, 553 02 Jönköping, Sverige.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer locale="sv" />
      <JsonLd data={pageBreadcrumbLd("sv", "/privacy/", "Integritetspolicy")} />
    </>
  );
}
