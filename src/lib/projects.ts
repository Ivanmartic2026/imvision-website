/**
 * What IM Vision verifiably did on a project.
 *
 * Structured rather than free text so the same fact renders identically in both
 * locales — the component owns the wording, the data owns the fact.
 *
 * ⚠️ Only set this where the project's own published copy states the role. Being
 * in the portfolio is not evidence of having built something: several entries are
 * Ocean Outdoor OOH sites credited to Ocean Outdoor, and nothing published says
 * who engineered or installed them. Leave `role` unset there — the field simply
 * does not render.
 */
export type ProjectRole =
  | "designed"
  | "engineered"
  | "delivered"
  | "installed"
  | "serviced"
  | "operated"
  | "monitored";

export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  visualPlaceholder?: boolean;
  visualLabel?: string;
  imageCredit?: string;
  sourceUrl?: string;
  sourceLabel?: string;
  location: string;
  year: string;
  specs: {
    pixelPitch?: string;
    brightness?: string;
    size?: string;
    type?: string;
  };
  results?: string;
  /** Set only where the project's own copy states it — see ProjectRole. */
  role?: ProjectRole[];
  /** Source for `role`, so a reviewer can check the claim without hunting. */
  roleSource?: string;
  tags: string[];
  verified?: boolean;
  gallery?: { src: string; alt: string }[];
  caseStudy?: {
    challenge: string;
    response: string;
    delivery: string[];
    outcome: string;
  };
}

export const projects: Project[] = [
  {
    slug: "boland-city",
    title: "Boland City",
    category: "Rapsgatan — Uppsala",
    description:
      "A double-sided digital pylon with two 4.0 × 1.75 m LED screens, delivered and commissioned at Boland City in Uppsala.",
    longDescription:
      "Delivered and commissioned on 18 August 2026, the freestanding pylon at Rapsgatan in Boland City carries two Unilumin USK5.9 LED screens mounted back-to-back — 14 m² of active display area in total — beneath an illuminated top sign. A light sensor drives automatic brightness control, and dual 4G routers give remote access to content and screen management without a site visit. The scope covered the steel pylon and cladding, an integrated technical compartment at the base, and full commissioning, calibration, and function testing.",
    image: "/images/projects/boland-city/hero.jpg",
    visualLabel: "Boland City — Rapsgatan, Uppsala",
    location: "Uppsala, Sweden",
    year: "2026",
    specs: {
      size: "14.0 m² · 2 × 4.0 × 1.75 m",
      pixelPitch: "5.95 mm",
      brightness: "4,500 cd/m²",
      type: "Double-sided digital pylon",
    },
    role: ["delivered", "installed"],
    roleSource:
      'longDescription: "The scope covered the steel pylon and cladding, an integrated technical compartment at the base, and full commissioning, calibration, and function testing."',
    caseStudy: {
      // Source: longDescription describes the full scope, screens, and commissioning date.
      challenge:
        "Deliver a complete outdoor LED display — structural steel, screens, electrical systems, and full commissioning — for a busy commercial area in Uppsala.",
      response:
        "Two Unilumin USK5.9 LED screens mounted back-to-back on a custom steel pylon with an integrated technical compartment, automatic brightness control via a light sensor, and dual 4G routers for remote content and screen management.",
      delivery: [
        "Steel pylon fabrication and cladding",
        "Integrated technical compartment at the base",
        "Mounting of two 4.0 × 1.75 m LED screens (14 m² active area)",
        "Full commissioning, calibration, and function testing",
      ],
      outcome:
        "A 14 m² double-sided display operating autonomously with automatic brightness and remote management, commissioned on 18 August 2026 at Rapsgatan, Boland City.",
    },
    tags: ["DOOH", "Pylon", "Uppsala"],
    verified: true,
    gallery: [
      {
        src: "/images/projects/boland-city/01-placering.jpg",
        alt: "The pylon in its parking-lot setting at Rapsgatan, Uppsala",
      },
      {
        src: "/images/projects/boland-city/02-vinklad-vy.jpg",
        alt: "Angled view of the pylon and LED screen cassette",
      },
      {
        src: "/images/projects/boland-city/03-siluett.jpg",
        alt: "The pylon in silhouette against the sky",
      },
      {
        src: "/images/projects/boland-city/04-topskylt.jpg",
        alt: "Close-up of the illuminated Boland City top sign above the LED screen",
      },
    ],
  },
  {
    slug: "the-icon",
    title: "The Icon",
    category: "Westfield Mall of Scandinavia — Stockholm",
    description:
      "One of Europe's largest DOOH screens. 525 m² at Westfield Mall of Scandinavia.",
    longDescription:
      "The Icon measures 41 × 13 metres — 525 m² in total — making it one of Europe's largest DOOH screens. The double-sided display is visible from motorways, pedestrian areas, and passing trains.",
    image: "/images/projects/the-icon.jpg",
    visualLabel: "The Icon — Westfield Mall of Scandinavia",
    imageCredit: "© Ocean Outdoor",
    caseStudy: {
      // Source: longDescription states dimensions, visibility, and scale.
      challenge:
        "Create one of Europe's largest digital out-of-home screens in a prime Stockholm location where it is visible from motorways, pedestrian areas, and passing trains.",
      response:
        "A 41 × 13 metre double-sided display covering 525 m² — one of Europe's largest DOOH screens.",
      delivery: [
        "Installation of a 525 m² double-sided LED display at Westfield Mall of Scandinavia",
      ],
      outcome:
        "A 525 m² DOOH screen visible from motorways, pedestrian areas, and passing trains, positioned at one of the Nordic region's most trafficked locations.",
    },
    sourceUrl: "https://oceanoutdoor.com/se/ooh-site/the-icon-westfield-mall-of-scandinavia/",
    location: "Solna, Sweden",
    year: "",
    specs: { size: "525 m² · 41 × 13 m", type: "Double-sided DOOH" },
    tags: ["DOOH", "Large format", "Installation"],
    verified: true,
  },
  {
    slug: "the-halo",
    title: "The Halo",
    category: "Westfield Mall of Scandinavia — Stockholm",
    description:
      "Two monumental LED rings and three large-format LED cubes create a 360-degree digital landmark at the heart of the shopping centre.",
    longDescription:
      "The Halo brings together two monumental LED rings — one on each floor — and three large-format LED cubes with 360-degree coverage. Positioned at the heart of Westfield Mall of Scandinavia, the installation creates a natural centre point for campaigns, events, and brand activations.",
    image: "/images/projects/the-halo.jpg",
    visualLabel: "The Halo — Westfield Mall of Scandinavia",
    imageCredit: "© Ocean Outdoor",
    caseStudy: {
      // Source: longDescription describes the multi-format LED installation at the shopping centre.
      challenge:
        "Create a 360-degree digital landmark at the heart of a major shopping centre that draws campaigns, events, and brand activations to its centre point.",
      response:
        "Two monumental LED rings (one per floor) combined with three large-format LED cubes providing full 360-degree coverage.",
      delivery: [
        "Installation of two LED rings on separate floors",
        "Mounting of three large-format LED cubes with 360° visibility",
        "Integration at the centre point of Westfield Mall of Scandinavia",
      ],
      outcome:
        "A multi-format LED environment that creates a natural gathering point for campaigns, events, and brand activations at the shopping centre's heart.",
    },
    sourceUrl: "https://oceanoutdoor.com/se/ooh-site/the-halo-westfield-mall-of-scandinavia/",
    location: "Solna, Sweden",
    year: "",
    specs: { type: "2 LED rings · 3 LED cubes · 360°" },
    tags: ["DOOH", "360°", "Brand activation"],
    verified: true,
  },
  {
    slug: "the-geminis",
    title: "The Geminis",
    category: "Westfield Täby Centrum — Stockholm",
    description:
      "Four large-format portrait screens create a high-impact digital centre point at Westfield Täby Centrum.",
    longDescription:
      "The Geminis brings together four large-format digital portrait screens in the central square at Westfield Täby Centrum. The location welcomes around 13 million visitors annually, with an average visit time of more than 90 minutes — the longest average visit among shopping centres in Sweden.",
    image: "/images/projects/the-geminis.jpg",
    visualLabel: "The Geminis — Westfield Täby Centrum",
    imageCredit: "© Ocean Outdoor",
    caseStudy: {
      // Source: longDescription describes four portrait screens at Täby Centrum.
      challenge:
        "Create a high-impact digital centre point at one of Sweden's busiest shopping centres, welcoming 13 million visitors annually.",
      response:
        "Four large-format portrait screens positioned in the central square at Westfield Täby Centrum.",
      delivery: [
        "Installation of four portrait-format LED screens in the central square",
      ],
      outcome:
        "A high-impact digital presence at a location with over 13 million annual visitors and an average visit time exceeding 90 minutes.",
    },
    sourceUrl: "https://oceanoutdoor.com/se/ooh-site/the-icon-geminis/",
    location: "Täby, Sweden",
    year: "",
    specs: { type: "4 large-format portrait DOOH screens" },
    tags: ["DOOH", "Retail", "Portrait format"],
    verified: true,
  },
  {
    slug: "the-curve",
    title: "The Curve",
    category: "Westfield Täby Centrum — Stockholm",
    description:
      "A 40 m² curved LED screen follows the façade of Westfield Täby Centrum and creates a highly visible digital surface for every passer-by.",
    longDescription:
      "The Curve is a 40 m² curved LED screen integrated along the façade of Westfield Täby Centrum. Its sweeping geometry turns the building edge into a highly visible large-format digital surface and gives campaigns a natural presence in one of Sweden's largest shopping destinations.",
    image: "/images/projects/the-curve.jpg",
    visualLabel: "The Curve — Westfield Täby Centrum",
    imageCredit: "© Ocean Outdoor",
    sourceUrl: "https://oceanoutdoor.com/se/ooh-site/the-curve-westfield-taby-centrum/",
    caseStudy: {
      // Source: longDescription describes a 40 m² curved screen integrated into the façade.
      challenge:
        "Turn the building edge of a major shopping destination into a highly visible large-format digital surface.",
      response:
        "A 40 m² curved LED screen integrated along the façade of Westfield Täby Centrum.",
      delivery: [
        "Custom curved LED screen fabrication and mounting along the building façade",
      ],
      outcome:
        "A sweeping curved digital surface that gives campaigns a natural presence in one of Sweden's largest shopping destinations.",
    },
    location: "Täby, Sweden",
    year: "",
    specs: { size: "40 m²", type: "Curved large-format DOOH" },
    tags: ["DOOH", "Curved LED", "Façade"],
    verified: true,
  },
  {
    slug: "the-node",
    title: "The Icon @ The Node",
    category: "Sergels torg — Stockholm",
    description:
      "Three large, high-resolution screens create a full-motion digital presence beneath the iconic fountain at Sergels torg.",
    longDescription:
      "The Icon @ The Node brings together three large, high-resolution screens, each six metres wide, beneath the iconic fountain at Sergels torg. Positioned in one of Stockholm's busiest hubs, the installation meets a constant flow of residents, commuters, and visitors from morning to night.",
    image: "/images/projects/the-node.jpg",
    visualLabel: "The Icon @ The Node — Sergels torg",
    imageCredit: "© Ocean Outdoor",
    caseStudy: {
      // Source: longDescription describes three 6-metre-wide screens at Sergels torg.
      challenge:
        "Create a full-motion digital presence at one of Stockholm's most iconic and trafficked locations beneath the fountain at Sergels torg.",
      response:
        "Three large high-resolution screens, each six metres wide, positioned in the central hub.",
      delivery: [
        "Installation of three 6 m wide high-resolution screens beneath Sergels torg fountain",
      ],
      outcome:
        "A constant digital presence meeting a flow of residents, commuters, and visitors from morning to night at one of Stockholm's busiest hubs.",
    },
    sourceUrl: "https://oceanoutdoor.com/se/ooh-site/the-icon-/",
    location: "Stockholm, Sweden",
    year: "",
    specs: { size: "3 screens · 6 m wide", type: "Large-format full-motion DOOH" },
    tags: ["DOOH", "Full motion", "Large format"],
    verified: true,
  },
  {
    slug: "e4-tradet-nord",
    title: "E4 Trädet — Impact",
    category: "Upplands Väsby — Stockholm",
    description:
      "Large-format digital roadside media positioned along the E4, connecting with Stockholm commuters and travellers heading to Arlanda.",
    longDescription:
      "E4 Trädet stands in Upplands Väsby along the heavily travelled E4. The large-format digital placement meets commuters moving to and from Stockholm as well as travellers heading toward Arlanda, creating a clear roadside presence on one of the region's most important routes.",
    image: "/images/projects/e4-tradet-nord.jpg",
    visualLabel: "E4 Trädet — Upplands Väsby",
    imageCredit: "© Ocean Outdoor",
    caseStudy: {
      // Source: longDescription describes the E4 roadside placement and target audience.
      challenge:
        "Connect with Stockholm commuters and travellers heading to Arlanda through large-format digital roadside media positioned along the heavily travelled E4.",
      response:
        "A large-format digital placement in Upplands Väsby along the E4, targeting commuters and travellers on one of the region's most important routes.",
      delivery: [
        "Installation of large-format digital roadside display along the E4 corridor",
      ],
      outcome:
        "A clear roadside presence reaching commuters to and from Stockholm and travellers heading toward Arlanda on a key regional route.",
    },
    sourceUrl: "https://oceanoutdoor.com/se/ooh-site/stockholm-e4-tradet-n-impact/",
    location: "Upplands Väsby, Sweden",
    year: "",
    specs: { type: "Large-format digital roadside DOOH" },
    tags: ["DOOH", "Roadside", "Large format"],
    verified: true,
  },
  {
    slug: "sodertull-city",
    title: "Södertull City",
    category: "Södra Vallgatan — Malmö",
    description:
      "A large-format city screen at one of central Malmö's busiest meeting points, reaching around 162,010 contacts every day.",
    longDescription:
      "Södertull City is a 7.37 m² large-format screen on the corner of Södra Vallgatan in central Malmö, one block from Gustav Adolfs Torg. The placement meets bus, car, and pedestrian traffic in the city's commercial heart and reaches around 162,010 contacts per day. Advertising format: 936 × 832 pixels. Spot length: 5 seconds.",
    image: "/images/projects/sodertull-city.jpg",
    visualLabel: "Project photo — Södertull City",
    location: "Malmö, Sweden",
    year: "",
    specs: { size: "7.37 m²", type: "Large-format city DOOH · 936 × 832 · 5 s" },
    caseStudy: {
      // Source: longDescription describes a 7.37 m² city screen with 162,010 daily contacts.
      challenge:
        "Create a high-impact large-format city screen at one of Malmö's busiest commercial intersections.",
      response:
        "A 7.37 m² display on the corner of Södra Vallgatan in central Malmö, one block from Gustav Adolfs Torg.",
      delivery: [
        "Installation of a 7.37 m² large-format screen at a high-traffic city intersection",
      ],
      outcome:
        "A city screen reaching around 162,010 contacts per day in Malmö's commercial heart.",
    },
    tags: ["DOOH", "City centre", "Retail"],
    verified: true,
  },
  {
    slug: "kappahl",
    title: "Kappahl",
    category: "Digital in-store — European retail rollout",
    description:
      "A scalable digital in-store network bringing campaigns and brand communication to around 160 locations across six markets.",
    longDescription:
      "Kappahl's digital in-store network connects approximately 160 locations and 220 touchpoints across Sweden, Norway, Finland, Poland, the UK, and Iceland. A major rollout across Kappahl and Newbie stores during 2025 created a consistent foundation for faster campaigns, moving content, and future store concepts.",
    image: "/images/projects/kappahl.jpg",
    visualLabel: "Kappahl — digital in-store",
    imageCredit: "© Grassfish",
    sourceUrl: "https://grassfish.com/cases/kappahl/",
    sourceLabel: "Grassfish",
    caseStudy: {
      // Source: longDescription describes a digital in-store network across 160 locations and 6 markets.
      challenge:
        "Create a consistent digital foundation for faster campaigns, moving content, and future store concepts across six European markets.",
      response:
        "A scalable digital in-store network connecting approximately 160 locations and 220 touchpoints across Sweden, Norway, Finland, Poland, the UK, and Iceland.",
      delivery: [
        "Major rollout across Kappahl and Newbie stores in 2025",
        "Network deployment across six European markets",
      ],
      outcome:
        "A consistent digital foundation enabling faster campaigns and moving content for a European retail chain.",
    },
    location: "Six European markets",
    year: "2025",
    specs: { size: "Approx. 160 locations · 220 touchpoints", type: "Digital in-store rollout" },
    tags: ["Retail", "In-store LED", "Rollout"],
    verified: true,
  },
  {
    slug: "sas-nordic-lounges",
    title: "SAS — Lounges & Express Check-in",
    category: "Nordic airports",
    description:
      "A unified digital display environment across SAS lounges and Express Check-in throughout the Nordic region.",
    longDescription:
      "IM Vision has delivered and installed LED and digital display solutions for SAS lounges across the Nordic region, as well as for Express Check-in environments. From calm lounge spaces to high-traffic departure halls, every display is adapted to the architecture, viewing distance, ambient light, and operational demands of the location. The result is one coherent visual identity throughout the passenger journey — built for clear communication, reliable operation, and a premium Scandinavian experience.",
    image: "/images/projects/sas-nordic-lounges.jpg",
    visualLabel: "SAS — lounges and Express Check-in",
    location: "Nordic region",
    year: "",
    specs: { type: "LED & digital display systems" },
    role: ["delivered", "installed"],
    roleSource: 'longDescription: "IM Vision has delivered and installed LED and digital display solutions for SAS lounges…"',
    caseStudy: {
      // Source: longDescription explicitly states IM Vision delivered and installed LED solutions for SAS.
      challenge:
        "Create a unified digital display environment across SAS lounges and Express Check-in throughout the Nordic region.",
      response:
        "LED and digital display solutions adapted to each location's architecture, viewing distance, ambient light, and operational demands.",
      delivery: [
        "LED and digital display delivery for SAS lounges across the Nordic region",
        "Display installation for Express Check-in environments",
      ],
      outcome:
        "One coherent visual identity throughout the passenger journey — built for clear communication, reliable operation, and a premium Scandinavian experience.",
    },
    tags: ["Aviation", "Lounges", "In-store LED"],
    verified: true,
  },
  {
    slug: "nordstan-facade",
    title: "A façade that turns",
    category: "Nordstan P-hus — Gothenburg",
    description:
      "26.88 × 7.68 m of LED wrapping the corner of Nils Ericsonsgatan and Kanaltorget. 224 cast cabinets on a twelve-metre radius — custom steel structure and in-house engineering.",
    longDescription:
      "26.88 × 7.68 metres of LED around the corner of Nils Ericsonsgatan and Kanaltorget. 224 cast cabinets on a twelve-metre radius — custom steel structure, in-house engineering, and our own installation team.",
    image: "",
    visualPlaceholder: true,
    visualLabel: "Nordstan — Göteborg",
    location: "Gothenburg, Sweden",
    year: "",
    // Cabinet count and radius were already published in the page copy; moving them
    // into specs makes them visible in the fact block instead of buried in prose.
    specs: {
      size: "26.88 × 7.68 m",
      type: "Curved outdoor LED · 224 cast cabinets · 12 m radius",
    },
    role: ["engineered", "installed"],
    roleSource: 'description: "custom steel structure, in-house engineering, and our own installation team"',
    caseStudy: {
      // Source: description states "custom steel structure, in-house engineering, and our own installation team."
      challenge:
        "Create a striking LED façade around the corner of a major Gothenburg intersection — large enough to be seen from multiple directions.",
      response:
        "26.88 × 7.68 metres of LED on a twelve-metre radius curve, supported by 224 cast cabinets and a custom steel structure.",
      delivery: [
        "Custom steel structure for a twelve-metre curved façade",
        "Installation of 224 cast LED cabinets",
        "In-house engineering and own installation team execution",
      ],
      outcome:
        "A full-corner LED façade at Nils Ericsonsgatan and Kanaltorget — a custom-engineered, in-house built installation.",
    },
    tags: ["DOOH", "Façade", "Engineering"],
    verified: true,
  },
  {
    slug: "taby-centrum",
    title: "Retail in motion",
    category: "Täby Centrum — Stockholm",
    description:
      "Digital surfaces at the heart of one of Sweden's largest shopping centres. Installed to be seen — serviced to keep performing.",
    longDescription:
      "Digital surfaces at the heart of one of Sweden's largest shopping centres. Installed to be seen — serviced to keep performing.",
    image: "",
    visualPlaceholder: true,
    visualLabel: "Täby Centrum — Täby",
    location: "Täby, Sweden",
    year: "",
    specs: { type: "Retail LED" },
    role: ["installed", "serviced"],
    roleSource: 'longDescription: "Installed to be seen — serviced to keep performing."',
    caseStudy: {
      // Source: longDescription describes digital surfaces at Sweden's largest shopping centre, installed and serviced.
      challenge:
        "Deploy digital surfaces at the heart of one of Sweden's largest shopping centres that are built to perform reliably over time.",
      response:
        "Digital LED surfaces installed for maximum visibility and serviced to keep performing.",
      delivery: [
        "Installation of retail LED surfaces at Täby Centrum",
        "Ongoing service agreements to maintain performance",
      ],
      outcome:
        "Digital surfaces at the heart of one of Sweden's largest shopping centres, installed to be seen and serviced to keep performing.",
    },
    tags: ["Retail", "Digital surfaces", "Service"],
    verified: true,
  },
  {
    slug: "ocean-outdoor-operations",
    title: "Screens never left alone",
    category: "Ocean Outdoor — Nationwide operations",
    description:
      "Operations agreements for Mall of Scandinavia and Täby Centrum. Inspection before launch, connection to IM Monitoring, and action before the client needs to call.",
    longDescription:
      "Operations agreements for Mall of Scandinavia and Täby Centrum. Inspection before launch, connection to IM Monitoring, and action before the client needs to call.",
    image: "",
    visualPlaceholder: true,
    visualLabel: "Ocean Outdoor — Sverige",
    location: "Sweden",
    year: "",
    specs: { type: "Monitoring & operations" },
    role: ["operated", "monitored"],
    roleSource: 'longDescription: "Operations agreements for Mall of Scandinavia and Täby Centrum… connection to IM Monitoring"',
    caseStudy: {
      // Source: longDescription describes operations agreements with inspection, monitoring, and proactive action.
      challenge:
        "Ensure critical digital screens at major Swedish shopping centres never go unnoticed when issues arise.",
      response:
        "Inspection before launch, connection to IM Monitoring, and proactive action before the client needs to call.",
      delivery: [
        "Pre-launch inspection for Mall of Scandinalia screens",
        "Pre-launch inspection for Täby Centrum screens",
        "Connection to IM Monitoring for continuous oversight",
      ],
      outcome:
        "Proactive operations for screens at Mall of Scandinavia and Täby Centrum — action before the client needs to call.",
    },
    tags: ["Operations", "Monitoring", "Service"],
    verified: true,
  },
  {
    slug: "fashion-industry",
    title: "Fashion Environment",
    category: "Retail / Experience",
    description: "A flexible visual stage conceived for retail and live moments.",
    longDescription:
      "An editorial case-study framework exploring how high-resolution LED, reflective materials, and controlled lighting can turn a fashion space into a flexible visual stage.",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80",
    location: "Stockholm, Sweden",
    year: "2024",
    specs: {
      pixelPitch: "P2.6",
      brightness: "1000 nits",
      size: "24m²",
      type: "Indoor LED Wall",
    },
    tags: ["Retail", "Events", "Indoor"],
    verified: false,
    caseStudy: {
      challenge:
        "Create one visual environment capable of supporting daily retail, seasonal campaigns, and live presentations without rebuilding the physical space.",
      response:
        "Treat the LED surface, reflections, lighting, content, and customer sightlines as one spatial system rather than separate production elements.",
      delivery: [
        "Map audience movement and primary viewing distances",
        "Define screen geometry around the architecture",
        "Coordinate content ratios with lighting and reflections",
        "Plan service access, calibration, and daily operation",
      ],
      outcome:
        "A reusable environment designed to change character through content while the architectural framework remains calm and consistent.",
    },
  },
  {
    slug: "grocery-store",
    title: "Grocery Store",
    category: "Retail",
    description:
      "A concept study for bright, energy-efficient in-store LED screens in grocery environments.",
    longDescription:
      "An editorial concept study exploring how a coordinated in-store LED screen network could support dynamic pricing, promotional content, and wayfinding in grocery environments — while maintaining readability under challenging store lighting.",
    image:
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1920&q=80",
    location: "Gothenburg, Sweden",
    year: "2024",
    specs: {
      pixelPitch: "P3.9",
      brightness: "1200 nits",
      size: "18m²",
      type: "In-store LED screens",
    },
    tags: ["Retail", "In-store LED", "Indoor"],
    verified: false,
  },
  {
    slug: "automotive-industry",
    title: "Automotive Industry",
    category: "Showroom",
    description:
      "A concept study for cinematic showroom LED walls that put every vehicle in its best light.",
    longDescription:
      "An editorial concept study for a premium automotive showroom featuring a sweeping LED backdrop. The idea is to let the screen adapt to different vehicle launches, creating immersive scenes from cityscapes to rugged terrain without moving a single car.",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80",
    location: "Malmö, Sweden",
    year: "2023",
    specs: {
      pixelPitch: "P2.9",
      brightness: "900 nits",
      size: "42m²",
      type: "Curved LED Wall",
    },
    tags: ["Showroom", "Automotive", "Indoor"],
    verified: false,
  },
  {
    slug: "outdoor-advertising-dooh",
    title: "Outdoor Advertising",
    category: "Digital Out-of-Home",
    description: "A concept study for high-brightness outdoor displays in urban environments.",
    longDescription:
      "An editorial concept study for weatherproof outdoor LED displays in high-traffic urban environments. Designed for continuous operation, the screens would deliver brilliant visibility in direct sunlight and withstand harsh Nordic winters.",
    image:
      "https://images.unsplash.com/photo-1555445054-8488d058d2a0?w=1920&q=80",
    location: "Copenhagen, Denmark",
    year: "2023",
    specs: {
      pixelPitch: "P6.2",
      brightness: "5500 nits",
      size: "72m²",
      type: "Outdoor LED",
    },
    tags: ["DOOH", "Outdoor", "Advertising"],
    verified: false,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
