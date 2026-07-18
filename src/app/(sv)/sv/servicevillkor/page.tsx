import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta, pageBreadcrumbLd, localeUrl } from "@/lib/seo";

// Swedish-only page (Swedish legal document) — advertise only the sv alternate
// so we don't emit an hreflang for a non-existent English /servicevillkor/.
const SV_URL = localeUrl("sv", "/servicevillkor/");

export const metadata: Metadata = {
  ...pageMeta({
    locale: "sv",
    path: "/servicevillkor/",
    title: "Allmänna servicevillkor",
    description:
      "Allmänna servicevillkor för service, reparation, installation, felsökning, underhåll och konsultuppdrag som utförs av IM Vision Group AB.",
  }),
  alternates: { canonical: SV_URL, languages: { sv: SV_URL, "x-default": SV_URL } },
};

const company = "IM Vision Group AB";

type Block =
  | { type: "p"; text: string }
  | { type: "sub"; text: string }
  | { type: "list"; items: string[] };

const sections: { n: number; title: string; blocks: Block[] }[] = [
  {
    n: 1,
    title: "Allmänt",
    blocks: [
      {
        type: "p",
        text: `Dessa allmänna servicevillkor gäller för samtliga service-, reparations-, installations-, felsöknings-, underhålls- och konsultuppdrag som utförs av ${company}, om inte annat avtalats skriftligen.`,
      },
      { type: "p", text: "Genom att beställa ett uppdrag accepterar kunden dessa villkor." },
    ],
  },
  {
    n: 2,
    title: "Beställning",
    blocks: [
      { type: "p", text: "Beställning kan ske muntligen eller skriftligen." },
      { type: "p", text: `Beställningen är bindande när den har accepterats av ${company}.` },
      { type: "p", text: "Ändringar eller tillägg efter beställning kan påverka pris och leveranstid." },
    ],
  },
  {
    n: 3,
    title: "Debitering",
    blocks: [
      { type: "p", text: "Samtliga priser anges exklusive mervärdesskatt om inget annat anges." },
      { type: "sub", text: "Minimidebitering" },
      { type: "p", text: "Varje serviceärende debiteras med minst 2 timmar." },
      { type: "sub", text: "Minimifaktura" },
      {
        type: "p",
        text: "Minsta fakturabelopp är 2 500 SEK exklusive moms per serviceärende, oavsett faktisk tidsåtgång.",
      },
      { type: "sub", text: "Arbetstid" },
      {
        type: "p",
        text: "Arbetstid debiteras från det att serviceteknikern lämnar företagets verksamhetsort eller föregående uppdrag till dess att teknikern återkommer eller påbörjar nästa uppdrag.",
      },
      { type: "p", text: "Efter minimidebiteringen debiteras påbörjad halvtimme som hel halvtimme." },
    ],
  },
  {
    n: 4,
    title: "Resor",
    blocks: [
      { type: "p", text: "Följande debiteras:" },
      {
        type: "list",
        items: [
          "Restid",
          "Milersättning eller fordonskostnad enligt gällande prislista",
          "Parkeringsavgifter",
          "Broavgifter",
          "Färjeavgifter",
          "Trängselskatter",
          "Vägavgifter",
          "Eventuella flygresor",
          "Tåg",
          "Taxi",
          "Hyrbil",
          "Fraktkostnader",
        ],
      },
      { type: "p", text: "Samtliga kostnader vidarefaktureras kunden." },
    ],
  },
  {
    n: 5,
    title: "Traktamente och logi",
    blocks: [
      { type: "p", text: "När uppdrag kräver övernattning debiteras:" },
      {
        type: "list",
        items: [
          "Hotell",
          "Logi",
          "Traktamente enligt Skatteverkets gällande nivåer eller faktisk kostnad",
          "Måltider om dessa inte ingår i traktamentet",
          "Övriga nödvändiga resekostnader",
        ],
      },
    ],
  },
  {
    n: 6,
    title: "Material",
    blocks: [
      { type: "p", text: "Material debiteras enligt gällande prislista." },
      { type: "p", text: "Specialbeställt material återtas inte." },
      { type: "p", text: "Beställt material faktureras även om kunden avbeställer arbetet." },
      { type: "p", text: "Reservdelar omfattas av respektive tillverkares garantivillkor." },
    ],
  },
  {
    n: 7,
    title: "Kundens ansvar",
    blocks: [
      { type: "p", text: "Kunden ansvarar för att:" },
      {
        type: "list",
        items: [
          "arbetsplatsen är säker",
          "arbetsområdet är tillgängligt",
          "erforderliga tillstånd finns",
          "el, vatten och andra media finns tillgängliga",
          "maskiner är rengjorda när detta krävs",
          "risker har informerats innan arbetets start",
        ],
      },
      { type: "p", text: "Extra arbete som uppstår på grund av brister hos kunden debiteras." },
    ],
  },
  {
    n: 8,
    title: "Väntetid",
    blocks: [
      {
        type: "p",
        text: "Om teknikern inte kan påbörja arbetet på grund av kunden debiteras väntetid som ordinarie arbetstid.",
      },
      { type: "p", text: "Väntetid över 15 minuter debiteras fullt ut." },
    ],
  },
  {
    n: 9,
    title: "Bomkörning",
    blocks: [
      { type: "p", text: "Om teknikern inte kan utföra arbetet på grund av exempelvis:" },
      {
        type: "list",
        items: [
          "kunden ej på plats",
          "inget tillträde",
          "maskinen ej tillgänglig",
          "arbete inte förberett",
          "säkerhetskrav inte uppfyllda",
        ],
      },
      { type: "p", text: "debiteras:" },
      {
        type: "list",
        items: [
          "minimifaktura 2 500 SEK exklusive moms",
          "samtliga resekostnader",
          "eventuell väntetid",
          "övriga uppkomna kostnader",
        ],
      },
    ],
  },
  {
    n: 10,
    title: "Akuta utryckningar",
    blocks: [
      { type: "p", text: "Jour- och akutservice debiteras enligt särskild prislista." },
      { type: "p", text: "Minimidebitering gäller även vid jour." },
    ],
  },
  {
    n: 11,
    title: "Arbetstid",
    blocks: [
      { type: "p", text: "Ordinarie arbetstid:" },
      { type: "p", text: "Måndag–Fredag 07.00–16.00" },
      { type: "p", text: "Arbete utanför ordinarie arbetstid debiteras enligt jour- eller övertidstaxa." },
    ],
  },
  {
    n: 12,
    title: "Ändrings- och tilläggsarbeten",
    blocks: [
      {
        type: "p",
        text: "Arbeten som inte omfattas av ursprunglig beställning betraktas som tilläggsarbeten och debiteras enligt gällande timpris samt materialkostnad.",
      },
    ],
  },
  {
    n: 13,
    title: "Garanti",
    blocks: [
      { type: "p", text: "Garanti lämnas på utfört arbete under 6 månader, om inte annat avtalats." },
      { type: "p", text: "Garantin omfattar inte:" },
      {
        type: "list",
        items: [
          "normalt slitage",
          "felaktigt handhavande",
          "yttre påverkan",
          "olyckshändelser",
          "modifieringar utförda av annan",
          "bristande underhåll",
          "produkter levererade av kunden",
        ],
      },
    ],
  },
  {
    n: 14,
    title: "Reklamation",
    blocks: [
      {
        type: "p",
        text: "Reklamation ska ske skriftligen utan oskäligt dröjsmål efter att felet upptäckts.",
      },
      {
        type: "p",
        text: `${company} ska ges möjlighet att avhjälpa eventuella fel innan annan entreprenör anlitas.`,
      },
    ],
  },
  {
    n: 15,
    title: "Ansvarsbegränsning",
    blocks: [
      { type: "p", text: `${company} ansvarar inte för:` },
      {
        type: "list",
        items: [
          "produktionsbortfall",
          "utebliven vinst",
          "driftstopp",
          "följdskador",
          "indirekta skador",
        ],
      },
      { type: "p", text: "Ansvar gäller endast vid grov vårdslöshet eller uppsåt." },
      {
        type: "p",
        text: `${company}s sammanlagda ansvar är begränsat till det belopp som fakturerats för det aktuella uppdraget.`,
      },
    ],
  },
  {
    n: 16,
    title: "Betalningsvillkor",
    blocks: [
      { type: "p", text: "Betalning ska ske inom 30 dagar från fakturadatum om inget annat avtalats." },
      { type: "p", text: "Vid försenad betalning debiteras:" },
      {
        type: "list",
        items: [
          "dröjsmålsränta enligt räntelagen",
          "lagstadgad påminnelseavgift",
          "inkassokostnader",
          "eventuella ombudskostnader",
        ],
      },
      { type: "p", text: `Vid utebliven betalning har ${company} rätt att avbryta pågående arbete.` },
    ],
  },
  {
    n: 17,
    title: "Äganderätt",
    blocks: [
      {
        type: "p",
        text: `Levererat material förblir ${company}s egendom tills full betalning erhållits.`,
      },
    ],
  },
  {
    n: 18,
    title: "Avbokning",
    blocks: [
      { type: "p", text: "Avbokning ska ske senast 24 timmar före bokad servicetid." },
      { type: "p", text: "Senare avbokning debiteras med minst minimifakturan samt uppkomna kostnader." },
    ],
  },
  {
    n: 19,
    title: "Force Majeure",
    blocks: [
      {
        type: "p",
        text: `${company} ansvarar inte för förseningar eller uteblivna prestationer som beror på omständigheter utanför företagets kontroll, exempelvis:`,
      },
      {
        type: "list",
        items: [
          "krig",
          "pandemi",
          "strejk",
          "naturkatastrof",
          "myndighetsbeslut",
          "leveransproblem",
          "omfattande trafikstörningar",
        ],
      },
    ],
  },
  {
    n: 20,
    title: "Arbetsmiljö",
    blocks: [
      { type: "p", text: "Tekniker har rätt att avbryta arbetet om arbetsmiljön bedöms vara osäker." },
      { type: "p", text: "Eventuell väntetid eller återbesök debiteras." },
    ],
  },
  {
    n: 21,
    title: "Personuppgifter",
    blocks: [
      {
        type: "p",
        text: "Personuppgifter behandlas enligt Dataskyddsförordningen (GDPR) och används endast för att administrera uppdraget samt uppfylla lagstadgade skyldigheter.",
      },
    ],
  },
  {
    n: 22,
    title: "Tvister",
    blocks: [
      { type: "p", text: "Tvister ska i första hand lösas genom förhandling." },
      {
        type: "p",
        text: `Om överenskommelse inte kan nås ska tvisten avgöras enligt svensk lag vid allmän domstol på den ort där ${company} har sitt säte.`,
      },
    ],
  },
  {
    n: 23,
    title: "Giltighet",
    blocks: [
      { type: "p", text: "Dessa servicevillkor gäller tills de ersätts av en senare version." },
      { type: "p", text: "Den senaste publicerade versionen gäller för nya beställningar." },
    ],
  },
];

export default function SwedishServiceTermsPage() {
  return (
    <>
      <Header locale="sv" />
      <main id="main-content">
        <PageHeader
          label="Juridiskt"
          title="Allmänna servicevillkor."
          description="Villkor för service, reparation, installation, felsökning, underhåll och konsultuppdrag som utförs av IM Vision Group AB."
        />

        <section className="section section-space">
          <div className="section-inner max-w-3xl">
            <dl className="mb-14 grid gap-px overflow-hidden rounded-[20px_6px_20px_20px] border border-border-subtle bg-border-subtle sm:grid-cols-3">
              <div className="bg-bg-elevated p-5">
                <dt className="text-xs uppercase tracking-[0.14em] text-text-muted">Företag</dt>
                <dd className="mt-2 text-text-primary">IM Vision Group AB</dd>
              </div>
              <div className="bg-bg-elevated p-5">
                <dt className="text-xs uppercase tracking-[0.14em] text-text-muted">Organisationsnummer</dt>
                <dd className="mt-2 text-text-primary">556924-1200</dd>
              </div>
              <div className="bg-bg-elevated p-5">
                <dt className="text-xs uppercase tracking-[0.14em] text-text-muted">Gäller från</dt>
                <dd className="mt-2 text-text-primary">2026-07-18</dd>
              </div>
            </dl>

            <div className="space-y-12">
              {sections.map((section) => (
                <section key={section.n} id={`avsnitt-${section.n}`} className="scroll-mt-28">
                  <h2 className="flex items-baseline gap-3 text-2xl font-medium tracking-[-0.02em] text-text-primary">
                    <span className="font-mono text-lg text-accent">{section.n}.</span>
                    {section.title}
                  </h2>
                  <div className="mt-4 space-y-4 leading-relaxed text-text-secondary">
                    {section.blocks.map((block, i) => {
                      if (block.type === "sub") {
                        return (
                          <h3
                            key={i}
                            className="pt-2 text-sm font-semibold uppercase tracking-[0.12em] text-text-primary"
                          >
                            {block.text}
                          </h3>
                        );
                      }
                      if (block.type === "list") {
                        return (
                          <ul key={i} className="space-y-2">
                            {block.items.map((item) => (
                              <li key={item} className="flex gap-3">
                                <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      return <p key={i}>{block.text}</p>;
                    })}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer locale="sv" />
      <JsonLd data={pageBreadcrumbLd("sv", "/servicevillkor/", "Allmänna servicevillkor")} />
    </>
  );
}
