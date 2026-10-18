import { Locale } from "@/lib/i18n";

export interface FaqItem {
  question: Record<Locale, string>;
  answer: Record<Locale, string>;
}

export const homeFaqs: FaqItem[] = [
  {
    question: {
      en: "Should I buy or rent an LED display?",
      sv: "Ska vi köpa eller hyra en LED-skärm?",
    },
    answer: {
      en: "It depends on how you plan to use it. If you need a permanent installation — in a shop, office building, or public space — buying makes sense. If you need a display for a specific event, product launch, or seasonal campaign, renting is more flexible. Both options include our full range of support: design, installation or on-site setup, and service.",
      sv: "Det beror på hur ni ska använda den. Behöver ni en permanent installation — i en butik, ett kontor eller en offentlig miljö — är köp det rätt valet. Behöver ni en skärm för ett specifikt event, en produktpresentation eller en säsongsaktivering passar hyra bättre. Båda alternativen ingår vårt fulla stöd: design, installation eller uppsättning på plats, och service.",
    },
  },
  {
    question: {
      en: "How much does an LED display cost?",
      sv: "Vad kostar en LED-skärm?",
    },
    answer: {
      en: "There is no fixed price — each project is unique. What matters are the size you need, the pixel pitch (resolution), whether it is installed indoors or outdoors, and whether a custom solution is required. We provide a free quotation based on your specific requirements, so you know exactly what you are getting before you commit.",
      sv: "Det finns inget fast pris — varje projekt är unikt. Det som avgör är storleken ni behöver, pixelavståndet (upplösningen), om det installeras inomhus eller utomhus, och om en anpassad lösning krävs. Vi lämnar en kostnadsfri offert baserad på era specifika krav, så att ni vet exakt vad ni får innan ni bestämmer er.",
    },
  },
  {
    question: {
      en: "How long does it take from enquiry to a finished installation?",
      sv: "Hur lång tid tar det från förfrågan till färdig installation?",
    },
    answer: {
      en: "A typical permanent installation takes a few weeks, depending on scope. We start with a site analysis, move through design and engineering, then handle construction, assembly, setup, and programming. We coordinate the entire chain, so you do not have to manage multiple suppliers.",
      sv: "En typisk permanent installation tar några veckor, beroende på omfattningen. Vi börjar med en platsanalys, går igenom design och projektering, och hanterar därefter konstruktion, montage, driftsättning och programmering. Vi koordinerar hela kedjan så att ni inte behöver hantera flera leverantörer.",
    },
  },
  {
    question: {
      en: "What is included in your installation?",
      sv: "Vad ingår i er installation?",
    },
    answer: {
      en: "Everything from the first analysis to the finished system. We handle site analysis, design, engineering, construction, assembly, commissioning, and programming. You get documentation, training for your team, and a system that is ready to use from day one.",
      sv: "Allt från den första analysen till det färdiga systemet. Vi hanterar platsanalys, design, projektering, konstruktion, montage, driftsättning och programmering. Ni får dokumentation, utbildning för er personal och ett system som är redo att användas direkt.",
    },
  },
  {
    question: {
      en: "What happens after installation?",
      sv: "Vad händer efter installationen?",
    },
    answer: {
      en: "Your LED screens keep performing. We offer service agreements that cover preventive maintenance, remote monitoring, spare part management, software updates and agreed response levels. We reply to service enquiries within 24 hours. You can also contact us for ad-hoc support and training for your team.",
      sv: "Era LED-skärmar fortsätter att prestera. Vi erbjuder serviceavtal som omfattar förebyggande underhåll, fjärrövervakning, reservdelshantering, mjukvaruuppdateringar och avtalade responstider. Vi svarar på serviceförfrågningar inom 24 timmar. Ni kan också kontakta oss för stöd och utbildning för er personal.",
    },
  },
  {
    question: {
      en: "How long does an LED display last?",
      sv: "Hur länge håller en LED-skärm?",
    },
    answer: {
      en: "With proper maintenance, indoor LED displays can operate for 80,000 to 100,000 hours. Outdoor displays typically have a shorter lifespan due to environmental factors such as weather and UV exposure. Service agreements help maintain performance and extend the useful life of your investment.",
      sv: "Vid rätt underhåll kan inomhusdisplayer arbeta 80 000–100 000 timmar. Utomhusdisplayer har kortare livslängd beroende på miljöpåverkan som väder och UV-strålning. Serviceavtal hjälper till att behålla prestandan och förlänga er investering.",
    },
  },
  {
    question: {
      en: "Can you work with our existing architecture or space?",
      sv: "Kan ni arbeta i vår befintliga arkitektur/miljö?",
    },
    answer: {
      en: "Yes. We design installations that fit within your building structure — facades, storefronts, lobbies, office environments, and entrances. We offer transparent LED technology for glass surfaces, custom dimensions, and tailored configurations. Every project starts with understanding your space.",
      sv: "Ja. Vi designar installationer som passar in i er byggnadsstruktur — fasader, butiksentréer, foajéer, kontorsmiljöer och ingångar. Vi erbjuder transparenta LED-lösningar för glasskyltar, anpassade mått och skräddarsydda konfigurationer. Varje projekt börjar med att förstå er miljö.",
    },
  },
  {
    question: {
      en: "Where are you located and where do you work?",
      sv: "Var arbetar ni?",
    },
    answer: {
      en: "Our headquarters is in Jönköping, and we have a warehouse and office in the Stockholm area. We deliver, install, and service projects throughout Sweden and across the Nordics and Europe. Contact us at 010 330 46 36 or info@imvision.se to discuss your project location.",
      sv: "Vårt huvudkontor finns i Jönköping och vi har lager och kontor i Stockholmsområdet. Vi levererar, installerar och serviceprojekt i hela Sverige och över Europa. Kontakta oss på 010 330 46 36 eller info@imvision.se för att diskutera er projektplats.",
    },
  },
];

/**
 * Both locales share one list: each item already carries its own `en` and `sv`
 * strings, so there is nothing to filter on. An earlier signature took a
 * `locale` it never read, which is why this one does not.
 */
export function getFaqForLocale(): FaqItem[] {
  return homeFaqs;
}
