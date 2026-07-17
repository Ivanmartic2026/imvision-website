import type { Project } from "./projects";

export type SwedishProjectCopy = {
  title: string;
  category: string;
  description: string;
  longDescription: string;
  caseStudy?: Project["caseStudy"];
};

export const swedishProjectCopy: Record<string, SwedishProjectCopy> = {
  "the-icon": {
    title: "The Icon",
    category: "Westfield Mall of Scandinavia — Stockholm",
    description: "En av Europas största DOOH-skärmar. 525 m² vid Westfield Mall of Scandinavia.",
    longDescription:
      "The Icon mäter 41 × 13 meter — totalt 525 m² — och är en av Europas största DOOH-skärmar samt Nordens största kommersiella skärm. Den dubbelsidiga ytan syns från motorväg, gångstråk och passerande tåg.",
  },
  "the-halo": {
    title: "The Halo",
    category: "Westfield Mall of Scandinavia — Stockholm",
    description: "Två monumentala LED-ringar och tre LED-kuber skapar ett digitalt landmärke i 360 grader.",
    longDescription:
      "The Halo förenar två monumentala LED-ringar — en på varje våningsplan — med tre stora LED-kuber som ger exponering i 360 grader. Mitt i Westfield Mall of Scandinavia skapar installationen en naturlig samlingspunkt för kampanjer, event och varumärkesaktiveringar.",
  },
  "the-geminis": {
    title: "The Geminis",
    category: "Westfield Täby Centrum — Stockholm",
    description: "Fyra storformatsskärmar skapar en digital mittpunkt i Westfield Täby Centrum.",
    longDescription:
      "The Geminis samlar fyra digitala porträttskärmar i storformat på torget i Westfield Täby Centrum. Platsen välkomnar omkring 13 miljoner besökare per år och har en genomsnittlig besökstid på över 90 minuter — den längsta genomsnittliga besökstiden bland Sveriges köpcentrum.",
  },
  "the-curve": {
    title: "The Curve",
    category: "Westfield Täby Centrum — Stockholm",
    description: "En 40 m² böjd LED-skärm följer fasaden på Westfield Täby Centrum.",
    longDescription:
      "The Curve är en 40 m² böjd LED-skärm integrerad längs fasaden på Westfield Täby Centrum. Den svepande geometrin förvandlar byggnadens kant till en väl synlig digital storformatsyta och ger kampanjer en naturlig närvaro i en av Sveriges största shoppingdestinationer.",
  },
  "the-node": {
    title: "The Icon @ The Node",
    category: "Sergels torg — Stockholm",
    description: "Tre stora högupplösta skärmar skapar en digital närvaro under Sergels torgs ikoniska fontän.",
    longDescription:
      "The Icon @ The Node samlar tre stora högupplösta skärmar, vardera sex meter breda, under den ikoniska fontänen vid Sergels torg. I ett av Stockholms mest trafikerade nav möter installationen ett konstant flöde av stockholmare, pendlare och besökare från morgon till kväll.",
  },
  "e4-tradet-nord": {
    title: "E4 Trädet Nord — Impact",
    category: "Upplands Väsby — Stockholm",
    description: "Digital storformatsmedia längs E4:an, riktad mot Stockholmspendlare och resenärer till Arlanda.",
    longDescription:
      "E4 Trädet Nord står i Upplands Väsby längs den vältrafikerade E4:an. Den digitala storformatsytan möter både pendlare till och från Stockholm och resenärer på väg mot Arlanda — med tydlig närvaro längs en av regionens viktigaste trafikleder.",
  },
  "sodertull-city": {
    title: "Södertull City",
    category: "Södra Vallgatan — Malmö",
    description: "En 7,37 m² storformatsskärm mitt i centrala Malmö med cirka 162 010 kontakter per dag.",
    longDescription:
      "Södertull City är en 7,37 m² storformatsskärm på hörnet av Södra Vallgatan i centrala Malmö, ett kvarter från Gustav Adolfs Torg. Placeringen möter buss-, bil- och fotgängartrafik i stadens kommersiella hjärta och når cirka 162 010 kontakter per dag. Annonsformat: 936 × 832 pixlar. Spotlängd: 5 sekunder.",
  },
  kappahl: {
    title: "Kappahl",
    category: "Digital in-store — europeisk retailutrullning",
    description:
      "Ett skalbart digitalt butiksnätverk för kampanjer och varumärkeskommunikation på cirka 160 platser i sex marknader.",
    longDescription:
      "Kappahls digitala butiksnätverk omfattar cirka 160 platser och 220 kontaktpunkter i Sverige, Norge, Finland, Polen, Storbritannien och Island. En omfattande utrullning i Kappahl- och Newbie-butiker under 2025 skapade en gemensam grund för snabbare kampanjer, rörligt innehåll och framtida butikskoncept.",
  },
  "sas-nordic-lounges": {
    title: "SAS — Lounger & Express Check-in",
    category: "Flygplatser i Norden",
    description:
      "En sammanhållen digital displaymiljö i SAS lounger och Express Check-in runt om i Norden.",
    longDescription:
      "IM Vision har levererat och installerat LED- och displaylösningar för SAS lounger i hela Norden samt för miljöer inom Express Check-in. Från lugna loungeytor till intensiva avgångshallar anpassas varje installation efter arkitektur, betraktningsavstånd, omgivande ljus och platsens driftkrav. Resultatet är ett sammanhållet visuellt uttryck genom hela passagerarresan — byggt för tydlig kommunikation, driftsäkerhet och en premiumupplevelse med skandinavisk precision.",
  },
  "nordstan-facade": {
    title: "En fasad som svänger",
    category: "Nordstan P-hus — Göteborg",
    description: "26,88 × 7,68 meter LED runt hörnet Nils Ericsonsgatan–Kanaltorget.",
    longDescription:
      "26,88 × 7,68 meter LED runt hörnet Nils Ericsonsgatan–Kanaltorget. 224 gjutna kabinett på en radie av tolv meter — egen stålstomme, egen konstruktion, egna montörer.",
  },
  "taby-centrum": {
    title: "Retail i rörelse",
    category: "Täby Centrum — Stockholm",
    description: "Digitala ytor mitt i ett av Sveriges största köpcentrum.",
    longDescription:
      "Digitala ytor mitt i ett av Sveriges största köpcentrum. Installerade för att synas — servade för att aldrig sluta.",
  },
  "ocean-outdoor-operations": {
    title: "Skärmar som aldrig lämnas ensamma",
    category: "Ocean Outdoor — Rikstäckande drift",
    description: "Driftavtal för Mall of Scandinavia och Täby Centrum.",
    longDescription:
      "Driftavtal för Mall of Scandinavia och Täby Centrum. Besiktning före start, uppkoppling mot IM Monitoring, åtgärd innan kunden hunnit ringa.",
  },
  parksign: {
    title: "ParkSign",
    category: "Egen produkt",
    description: "Digital skyltning för parkeringsmiljöer.",
    longDescription:
      "Digital skyltning för parkeringsmiljöer. Designad och renderad in i minsta detalj innan första skruven dras.",
  },
  "fashion-industry": {
    title: "Modemiljö",
    category: "Butik / Upplevelse",
    description: "En flexibel visuell scen för butik och liveupplevelser.",
    longDescription:
      "Ett redaktionellt projektutkast som utforskar hur högupplöst LED, reflekterande material och kontrollerad ljussättning kan förvandla en modemiljö till en flexibel visuell scen.",
    caseStudy: {
      challenge:
        "Skapa en visuell miljö som klarar både daglig butiksdrift, säsongskampanjer och livepresentationer utan att det fysiska rummet behöver byggas om.",
      response:
        "Behandla LED-ytan, reflektioner, ljussättning, innehåll och kundens siktlinjer som ett enda rumsligt system snarare än separata produktionsmoment.",
      delivery: [
        "Kartlägg publikens rörelser och primära betraktningsavstånd",
        "Definiera skärmgeometrin utifrån arkitekturen",
        "Samordna innehållsformat med ljus och reflektioner",
        "Planera serviceåtkomst, kalibrering och daglig drift",
      ],
      outcome:
        "En återanvändbar miljö som kan bygga karaktär genom innehåll samtidigt som den arkitektoniska ramen förblir lugn och konsekvent.",
    },
  },
  "grocery-store": {
    title: "Dagligvaruhandel",
    category: "Butik",
    description: "Ljusstark och energieffektiv digital kommunikation för butiksmiljön.",
    longDescription:
      "Ett utkast till en sammanhållen lösning för digital kommunikation i dagligvaruhandeln, med fokus på tydlig information, kampanjinnehåll och god läsbarhet i varierande butiksljus.",
  },
  "automotive-industry": {
    title: "Bilshowroom",
    category: "Showroom",
    description: "En filmisk LED-miljö som ger varje bil rätt inramning.",
    longDescription:
      "Ett redaktionellt koncept för ett premiumshowroom där en omslutande LED-yta skapar flexibla miljöer för lanseringar, presentationer och den dagliga kundupplevelsen.",
  },
  "outdoor-advertising-dooh": {
    title: "Digital utomhusmedia",
    category: "DOOH",
    description: "Ljusstarka displaysystem konstruerade för krävande utomhusmiljöer.",
    longDescription:
      "Ett projektutkast för vädertåliga LED-system i urbana miljöer, utformat med fokus på läsbarhet i dagsljus, driftsäkerhet och nordiskt klimat.",
  },
};
