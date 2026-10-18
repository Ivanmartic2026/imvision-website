import type { Project } from "./projects";

export type SwedishProjectCopy = {
  title: string;
  category: string;
  description: string;
  longDescription: string;
  /**
   * Swedish wording for `specs.type`. That field became visible in the fact block,
   * which exposed it rendering in English on the Swedish pages. Same fact, Swedish
   * words — no new claims. Falls back to the English string where unset.
   */
  specsType?: string;
  /** Swedish wording for `location` — "Gothenburg, Sweden" read wrong on a Swedish page. */
  location?: string;
  /**
   * Swedish wording for `specs.size`. Also fixes a real inconsistency: the Swedish
   * body copy writes "7,37 m²" and "26,88 × 7,68 meter" with a decimal comma while
   * the fact block showed the English period form.
   */
  specsSize?: string;
  caseStudy?: Project["caseStudy"];
};

export const swedishProjectCopy: Record<string, SwedishProjectCopy> = {
  "boland-city": {
    title: "Boland City",
    category: "Rapsgatan — Uppsala",
    description:
      "En dubbelsidig digital pylon med två LED-skärmar på 4,0 × 1,75 meter, levererad och driftsatt vid Boland City i Uppsala.",
    longDescription:
      "Den 18 augusti 2026 färdigställdes och driftsattes den fristående pylonen vid Rapsgatan i Boland City. Pylonen bär två Unilumin USK5.9-skärmar monterade rygg mot rygg — totalt 14 m² aktiv skärmyta — under en belyst topskylt. En ljussensor styr ljusstyrkan automatiskt, och två 4G-routrar ger fjärråtkomst till innehåll och skärmstyrning utan platsbesök. Leveransen omfattade stålpylon och fasadbeklädnad, ett integrerat teknikutrymme i pylonens nederdel samt fullständig idrifttagning, injustering och funktionsprov.",
    location: "Uppsala",
    specsSize: "14,0 m² · 2 × 4,0 × 1,75 m",
    specsType: "Dubbelsidig digital pylon",
    caseStudy: {
      // Källa: longDescription beskriver leveransomfattning, skärmar och driftsättning.
      challenge:
        "Leverera en komplett utomhus-LED-installation — stomme, skärmar, elsystem och full driftsättning — för ett trafikerat handelsområde i Uppsala.",
      response:
        "Två Unilumin USK5.9-skärmar monterade rygg mot rygg på en egenstomme med integrerat teknikutrymme, automatisk ljusstyrka via ljussensor och två 4G-routrar för fjärrhantering.",
      delivery: [
        "Tillverkning och montering av stålpylon med fasadbeklädnad",
        "Integrerat teknikutrymme i pylonens nederdel",
        "Montering av två 4,0 × 1,75 m LED-skärmar (14 m² aktiv yta)",
        "Fullständig idrifttagning, injustering och funktionsprov",
      ],
      outcome:
        "En 14 m² dubbelsidig display med automatisk ljusstyrka och fjärrhantering, driftsatt den 18 augusti 2026 vid Rapsgatan, Boland City.",
    },
  },
  "the-icon": {
    title: "The Icon",
    category: "Westfield Mall of Scandinavia — Stockholm",
    description: "En av Europas största DOOH-skärmar. 525 m² vid Westfield Mall of Scandinavia.",
    longDescription:
      "The Icon mäter 41 × 13 meter — totalt 525 m² — och är en av Europas största DOOH-skärmar. Den dubbelsidiga ytan syns från motorväg, gångstråk och passerande tåg.",
    location: "Solna",
    specsSize: "525 m² · 41 × 13 m",
    specsType: "Dubbelsidig DOOH",
    caseStudy: {
      // Källa: longDescription beskriver mått, synlighet och omfattning.
      challenge:
        "Skapa en av Europas största digitala utomhusskärmar på en nyckelplats i Stockholm med synlighet från motorväg, gångstråk och passerande tåg.",
      response:
        "En 41 × 13 meters dubbelsidig display på 525 m² — en av Europas största DOOH-skärmar.",
      delivery: [
        "Installation av en 525 m² dubbelsidig LED-skärm vid Westfield Mall of Scandinavia",
      ],
      outcome:
        "En 525 m² DOOH-skärm synlig från motorväg, gångstråk och passerande tåg på en av Nordens mest trafikerade platser.",
    },
  },
  "the-halo": {
    title: "The Halo",
    category: "Westfield Mall of Scandinavia — Stockholm",
    description: "Två monumentala LED-ringar och tre LED-kuber skapar ett digitalt landmärke i 360 grader.",
    longDescription:
      "The Halo förenar två monumentala LED-ringar — en på varje våningsplan — med tre stora LED-kuber som ger exponering i 360 grader. Mitt i Westfield Mall of Scandinavia skapar installationen en naturlig samlingspunkt för kampanjer, event och varumärkesaktiveringar.",
    location: "Solna",
    specsType: "2 LED-ringar · 3 LED-kuber · 360°",
    caseStudy: {
      // Källa: longDescription beskriver den flervisions LED-installationen på köpcentrum.
      challenge:
        "Skapa ett digitalt 360-graderslandmärke mitt i ett stort köpcentrum som drar kampanjer, event och varumärkesaktiveringar till sin mittpunkt.",
      response:
        "Två monumentala LED-ringar (en per våningsplan) kombinerat med tre stora LED-kuber med full 360-graders synlighet.",
      delivery: [
        "Installation av två LED-ringar på separata våningsplan",
        "Montering av tre stora LED-kuber med 360° synlighet",
        "Integrering vid mittpunkten i Westfield Mall of Scandinavia",
      ],
      outcome:
        "En flervisions LED-miljö som skapar en naturlig samlingspunkt för kampanjer, event och varumärkesaktiveringar i köpcentrumets mitt.",
    },
  },
  "the-geminis": {
    title: "The Geminis",
    category: "Westfield Täby Centrum — Stockholm",
    description: "Fyra storformatsskärmar skapar en digital mittpunkt i Westfield Täby Centrum.",
    longDescription:
      "The Geminis samlar fyra digitala porträttskärmar i storformat på torget i Westfield Täby Centrum. Platsen välkomnar omkring 13 miljoner besökare per år och har en genomsnittlig besökstid på över 90 minuter — den längsta genomsnittliga besökstiden bland Sveriges köpcentrum.",
    location: "Täby",
    specsType: "4 digitala porträttskärmar i storformat",
    caseStudy: {
      // Källa: longDescription beskriver fyra porträttskärmar på en av Sveriges mest besökta platser.
      challenge:
        "Skapa en högkontrastig digital mittpunkt på ett av Sveriges mest besökta köpcentrum med 13 miljoner besökare årligen.",
      response:
        "Fyra digitala porträttskärmar i storformat placerade på torget i Westfield Täby Centrum.",
      delivery: [
        "Installation av fyra porträttskärmar i storformat på centrala torget",
      ],
      outcome:
        "En högkontrastig digital närvaro på en plats med över 13 miljoner årliga besökare och genomsnittlig besökstid över 90 minuter.",
    },
  },
  "the-curve": {
    title: "The Curve",
    category: "Westfield Täby Centrum — Stockholm",
    description: "En 40 m² böjd LED-skärm följer fasaden på Westfield Täby Centrum.",
    longDescription:
      "The Curve är en 40 m² böjd LED-skärm integrerad längs fasaden på Westfield Täby Centrum. Den svepande geometrin förvandlar byggnadens kant till en väl synlig digital storformatsyta och ger kampanjer en naturlig närvaro i en av Sveriges största shoppingdestinationer.",
    location: "Täby",
    specsSize: "40 m²",
    specsType: "Böjd DOOH i storformat",
    caseStudy: {
      // Källa: longDescription beskriver en 40 m² böjd skärm integrerad i fasaden.
      challenge:
        "Förvandla byggnadskanten på en stor shoppingdestination till en väl synlig digital storformatsyta.",
      response:
        "En 40 m² böjd LED-skärm integrerad längs fasaden på Westfield Täby Centrum.",
      delivery: [
        "Tillverkning och montering av skräddarsydd böjd LED-skärm längs byggnadens fasad",
      ],
      outcome:
        "En svepande digital böjd yta som ger kampanjer en naturlig närvaro i en av Sveriges största shoppingdestinationer.",
    },
  },
  "the-node": {
    title: "The Icon @ The Node",
    category: "Sergels torg — Stockholm",
    description: "Tre stora högupplösta skärmar skapar en digital närvaro under Sergels torgs ikoniska fontän.",
    longDescription:
      "The Icon @ The Node samlar tre stora högupplösta skärmar, vardera sex meter breda, under den ikoniska fontänen vid Sergels torg. I ett av Stockholms mest trafikerade nav möter installationen ett konstant flöde av stockholmare, pendlare och besökare från morgon till kväll.",
    location: "Stockholm",
    specsSize: "3 skärmar · 6 m breda",
    specsType: "DOOH i storformat med rörlig bild",
    caseStudy: {
      // Källa: longDescription beskriver tre 6 meter breda skärmar vid Sergels torg.
      challenge:
        "Skapa en digital närvaro i fullformat vid en av Stockholms mest ikoniska och trafikerade platser — under fontänen på Sergels torg.",
      response:
        "Tre stora högupplösta skärmar, vardera sex meter breda, placerade i navet.",
      delivery: [
        "Installation av tre 6 m breda högupplösta skärmar under Sergels torgs fontän",
      ],
      outcome:
        "En konstant digital närvaro som möter ett flöde av stockholmare, pendlare och besökare från morgon till kväll i ett av Stockholms mest trafikerade nav.",
    },
  },
  "e4-tradet-nord": {
    title: "E4 Trädet — Impact",
    category: "Upplands Väsby — Stockholm",
    description: "Digital storformatsmedia längs E4:an, riktad mot Stockholmspendlare och resenärer till Arlanda.",
    longDescription:
      "E4 Trädet står i Upplands Väsby längs den vältrafikerade E4:an. Den digitala storformatsytan möter både pendlare till och från Stockholm och resenärer på väg mot Arlanda — med tydlig närvaro längs en av regionens viktigaste trafikleder.",
    location: "Upplands Väsby",
    specsType: "Digital vägkantsmedia i storformat",
    caseStudy: {
      // Källa: longDescription beskriver E4-placeringen och målgrupp.
      challenge:
        "Nå Stockholmspendlare och resenärer till Arlanda genom digital storformatsmedia längs den vältrafikerade E4:an.",
      response:
        "En digital storformatsplats i Upplands Väsby längs E4:an, riktad mot pendlare och resenärer på en av regionens viktigaste trafikleder.",
      delivery: [
        "Installation av digital vägkantsmedia i storformat längs E4-korridoren",
      ],
      outcome:
        "En tydlig närvaro längs vägen som når pendlare till och från Stockholm samt resenärer mot Arlanda på en nyckelrutt.",
    },
  },
  "sodertull-city": {
    title: "Södertull City",
    category: "Södra Vallgatan — Malmö",
    description: "En 7,37 m² storformatsskärm mitt i centrala Malmö med cirka 162 010 kontakter per dag.",
    longDescription:
      "Södertull City är en 7,37 m² storformatsskärm på hörnet av Södra Vallgatan i centrala Malmö, ett kvarter från Gustav Adolfs Torg. Placeringen möter buss-, bil- och fotgängartrafik i stadens kommersiella hjärta och når cirka 162 010 kontakter per dag. Annonsformat: 936 × 832 pixlar. Spotlängd: 5 sekunder.",
    location: "Malmö",
    specsSize: "7,37 m²",
    specsType: "City-DOOH i storformat · 936 × 832 · 5 s",
    caseStudy: {
      // Källa: longDescription beskriver en 7,37 m² cityskärm med 162 010 dagliga kontakter.
      challenge:
        "Skapa en högkontrastig storformatsskärm på en av Malmös mest trafikerade kommersiella korsningar.",
      response:
        "En 7,37 m² display på hörnet av Södra Vallgatan i centrala Malmö, ett kvarter från Gustav Adolfs Torg.",
      delivery: [
        "Installation av en 7,37 m² storformatsskärm på en vältrafikerad stadskorsning",
      ],
      outcome:
        "En cityskärm som når cirka 162 010 kontakter per dag i Malmös kommersiella hjärta.",
    },
  },
  kappahl: {
    title: "Kappahl",
    category: "Butiksnätverk — europeisk utrullning",
    description:
      "Ett skalbart digitalt butiksnätverk för kampanjer och varumärkeskommunikation på cirka 160 platser i sex marknader.",
    longDescription:
      "Kappahls digitala butiksnätverk omfattar cirka 160 platser och 220 kontaktpunkter i Sverige, Norge, Finland, Polen, Storbritannien och Island. En omfattande utrullning i Kappahl- och Newbie-butiker under 2025 skapade en gemensam grund för snabbare kampanjer, rörligt innehåll och framtida butikskoncept.",
    location: "Sex europeiska marknader",
    specsSize: "Cirka 160 platser · 220 kontaktpunkter",
    specsType: "Digital utrullning i butik",
    caseStudy: {
      // Källa: longDescription beskriver ett digitalt butiksnätverk över 160 platser och 6 marknader.
      challenge:
        "Skapa en gemensam digital grund för snabbare kampanjer och rörligt innehåll över sex europeiska marknader.",
      response:
        "Ett skalbart digitalt butiksnätverk som omfattar cirka 160 platser och 220 kontaktpunkter i Sverige, Norge, Finland, Polen, Storbritannien och Island.",
      delivery: [
        "Omfattande utrullning i Kappahl- och Newbie-butiker under 2025",
        "Nätverksimplementering över sex europeiska marknader",
      ],
      outcome:
        "En gemensam digital grund som möjliggör snabbare kampanjer och rörligt innehåll för en europeisk handelskedja.",
    },
  },
  "sas-nordic-lounges": {
    title: "SAS — Lounger och Express Check-in",
    category: "Flygplatser i Norden",
    description:
      "En sammanhållen digital displaymiljö i SAS lounger och Express Check-in runt om i Norden.",
    longDescription:
      "IM Vision har levererat och installerat LED- och displaylösningar för SAS lounger i hela Norden samt för miljöer inom Express Check-in. Från lugna loungeytor till intensiva avgångshallar anpassas varje installation efter arkitektur, betraktningsavstånd, omgivande ljus och platsens driftkrav. Resultatet är ett sammanhållet visuellt uttryck genom hela passagerarresan — byggt för tydlig kommunikation, driftsäkerhet och en premiumupplevelse med skandinavisk precision.",
    location: "Norden",
    specsType: "LED- och displaysystem",
    caseStudy: {
      // Källa: longDescription beskriver levererad och installerad LED för SAS lounger och Express Check-in.
      challenge:
        "Skapa en sammanhållen digital displaymiljö för SAS lounger och Express Check-in i hela Norden.",
      response:
        "LED- och displaylösningar anpassade efter varje plats arkitektur, betraktningsavstånd, omgivande ljus och driftkrav.",
      delivery: [
        "Leverans och installation av LED för SAS lounger i hela Norden",
        "Installation av displaysystem för Express Check-in",
      ],
      outcome:
        "Ett sammanhållet visuellt uttryck genom hela passageraresan — byggt för tydlig kommunikation, driftsäkerhet och premiumupplevelse.",
    },
  },
  "nordstan-facade": {
    title: "En fasad som svänger",
    category: "Nordstan P-hus — Göteborg",
    description: "26,88 × 7,68 meter LED runt hörnet Nils Ericsonsgatan–Kanaltorget.",
    longDescription:
      "26,88 × 7,68 meter LED runt hörnet Nils Ericsonsgatan–Kanaltorget. 224 gjutna kabinett på en radie av tolv meter — egen stålstomme, egen konstruktion, egna montörer.",
    location: "Göteborg",
    specsSize: "26,88 × 7,68 m",
    specsType: "Böjd utomhus-LED · 224 gjutna kabinett · 12 m radie",
    caseStudy: {
      // Källa: description beskriver "egen stålstomme, egen konstruktion, egna montörer."
      challenge:
        "Skapa en markant LED-fasad runt hörnet vid en stor korsning i Göteborg — stor nog att synas från flera håll.",
      response:
        "26,88 × 7,68 meter LED på en tolv meters krök, uppbyggd av 224 gjutna kabinett och en egen konstruktion.",
      delivery: [
        "Egen tillverkad stålstomme för en tolv meters böjd fasad",
        "Montering av 224 gjutna LED-kabinett",
        "Egen konstruktion och egna montörer",
      ],
      outcome:
        "En LED-fasad som följer hela hörnet vid Nils Ericsonsgatan och Kanaltorget — egenkonstruerad och monterad av eget team.",
    },
  },
  "taby-centrum": {
    title: "Retail i rörelse",
    category: "Täby Centrum — Stockholm",
    description: "Digitala ytor mitt i ett av Sveriges största köpcentrum.",
    longDescription:
      "Digitala ytor mitt i ett av Sveriges största köpcentrum. Installerade för att synas — servade för att aldrig sluta.",
    location: "Täby",
    specsType: "Retail-LED",
    caseStudy: {
      // Källa: longDescription beskriver digitala ytor installerade och servade på ett av Sveriges största köpcentrum.
      challenge:
        "Placera digitala ytor mitt i ett av Sveriges största köpcentrum med design för långsiktig och pålitlig drift.",
      response:
        "Digitala LED-ytor installerade för maximal synlighet och servade för att aldrig sluta.",
      delivery: [
        "Installation av retail-LED-ytor på Täby Centrum",
        "Pågående serviceavtal för att upprätthålla prestanda",
      ],
      outcome:
        "Digitala ytor mitt i ett av Sveriges största köpcentrum, installerade för att synas och servade för att aldrig sluta.",
    },
  },
  "ocean-outdoor-operations": {
    title: "Skärmar som aldrig lämnas ensamma",
    category: "Ocean Outdoor — Rikstäckande drift",
    description: "Driftavtal för Mall of Scandinavia och Täby Centrum.",
    longDescription:
      "Driftavtal för Mall of Scandinavia och Täby Centrum. Besiktning före start, uppkoppling mot IM Monitoring, åtgärd innan kunden hunnit ringa.",
    location: "Sverige",
    specsType: "Övervakning och drift",
    caseStudy: {
      // Källa: longDescription beskriver driftavtal med besiktning, övervakning och proaktiv åtgärd.
      challenge:
        "Säkerställ att kritiska digitala skärmar på svenska köpcentrum aldrig står oupptäckta.",
      response:
        "Besiktning före start, uppkoppling mot IM Monitoring och proaktiv åtgärd innan kunden behöver kontakta oss.",
      delivery: [
        "Besiktning före lansering för Mall of Scandinavia-skärmar",
        "Besiktning före lansering för Täby Centrum-skärmar",
        "Uppkoppling mot IM Monitoring för kontinuerlig övervakning",
      ],
      outcome:
        "Proaktiv drift för skärmar på Mall of Scandinavia och Täby Centrum — åtgärd innan kunden behöver ringa.",
    },
  },
  "fashion-industry": {
    title: "Modemiljö",
    category: "Butik / Upplevelse",
    description: "En flexibel visuell scen för butik och liveupplevelser.",
    longDescription:
      "Ett redaktionellt projektutkast som utforskar hur högupplöst LED, reflekterande material och kontrollerad ljussättning kan förvandla en modemiljö till en flexibel visuell scen.",
    location: "Stockholm",
    specsSize: "24 m²",
    specsType: "LED-vägg inomhus",
    caseStudy: {
      challenge:
        "Skapa en visuell miljö som klarar såväl daglig butiksdrift som säsongskampanjer och livepresentationer utan att det fysiska rummet behöver byggas om.",
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
    location: "Göteborg",
    specsType: "LED-skärmar i butik",
  },
  "automotive-industry": {
    title: "Bilshowroom",
    category: "Showroom",
    description: "En filmisk LED-miljö som ger varje bil rätt inramning.",
    longDescription:
      "Ett redaktionellt koncept för ett premiumshowroom där en omslutande LED-yta skapar flexibla miljöer för lanseringar, presentationer och den dagliga kundupplevelsen.",
    location: "Malmö",
    specsType: "Böjd LED-vägg",
  },
  "outdoor-advertising-dooh": {
    title: "Digital utomhusmedia",
    category: "DOOH",
    description: "Ljusstarka displaysystem konstruerade för krävande utomhusmiljöer.",
    longDescription:
      "Ett projektutkast för vädertåliga LED-system i urbana miljöer, utformat med fokus på läsbarhet i dagsljus, driftsäkerhet och nordiskt klimat.",
    location: "Köpenhamn, Danmark",
    specsType: "Utomhus-LED",
  },
};
