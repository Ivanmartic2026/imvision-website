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
  tags: string[];
  verified?: boolean;
  caseStudy?: {
    challenge: string;
    response: string;
    delivery: string[];
    outcome: string;
  };
}

export const projects: Project[] = [
  {
    slug: "the-icon",
    title: "The Icon",
    category: "Westfield Mall of Scandinavia — Stockholm",
    description:
      "One of Europe's largest DOOH screens. 525 m² at Westfield Mall of Scandinavia.",
    longDescription:
      "The Icon measures 41 × 13 metres — 525 m² in total — making it one of Europe's largest DOOH screens and the largest commercial screen in the Nordics. The double-sided display is visible from motorways, pedestrian areas, and passing trains.",
    image: "/images/projects/the-icon.jpg",
    visualLabel: "The Icon — Westfield Mall of Scandinavia",
    imageCredit: "Image: Ocean Outdoor",
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
    imageCredit: "Image: Ocean Outdoor",
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
    imageCredit: "Image: Ocean Outdoor",
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
    imageCredit: "Image: Ocean Outdoor",
    sourceUrl: "https://oceanoutdoor.com/se/ooh-site/the-curve-westfield-taby-centrum/",
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
    imageCredit: "Image: Ocean Outdoor",
    sourceUrl: "https://oceanoutdoor.com/se/ooh-site/the-icon-/",
    location: "Stockholm, Sweden",
    year: "",
    specs: { size: "3 screens · 6 m wide", type: "Large-format full-motion DOOH" },
    tags: ["DOOH", "Full motion", "Large format"],
    verified: true,
  },
  {
    slug: "e4-tradet-nord",
    title: "E4 Trädet North — Impact",
    category: "Upplands Väsby — Stockholm",
    description:
      "Large-format digital roadside media positioned along the E4, connecting with Stockholm commuters and travellers heading to Arlanda.",
    longDescription:
      "E4 Trädet North stands in Upplands Väsby along the heavily travelled E4. The large-format digital placement meets commuters moving to and from Stockholm as well as travellers heading toward Arlanda, creating a clear roadside presence on one of the region's most important routes.",
    image: "/images/projects/e4-tradet-nord.jpg",
    visualLabel: "E4 Trädet North — Upplands Väsby",
    imageCredit: "Image: Ocean Outdoor",
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
    imageCredit: "Image: Grassfish",
    sourceUrl: "https://grassfish.com/cases/kappahl/",
    sourceLabel: "Grassfish",
    location: "Six European markets",
    year: "2025",
    specs: { size: "Approx. 160 locations · 220 touchpoints", type: "Digital in-store rollout" },
    tags: ["Retail", "Digital signage", "Rollout"],
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
    tags: ["Aviation", "Lounges", "Digital signage"],
    verified: true,
  },
  {
    slug: "nordstan-facade",
    title: "A façade that turns",
    category: "Nordstan P-hus — Gothenburg",
    description:
      "26.88 × 7.68 metres of LED around the corner of Nils Ericsonsgatan and Kanaltorget. 224 cast cabinets on a twelve-metre radius — custom steel structure, in-house engineering, and our own installation team.",
    longDescription:
      "26.88 × 7.68 metres of LED around the corner of Nils Ericsonsgatan and Kanaltorget. 224 cast cabinets on a twelve-metre radius — custom steel structure, in-house engineering, and our own installation team.",
    image: "",
    visualPlaceholder: true,
    visualLabel: "Case photo — Nordstan",
    location: "Gothenburg, Sweden",
    year: "",
    specs: { size: "26.88 × 7.68 m", type: "Curved outdoor LED" },
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
    visualLabel: "Case photo — Täby Centrum",
    location: "Täby, Sweden",
    year: "",
    specs: { type: "Retail LED" },
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
    visualLabel: "Case photo — Ocean Outdoor",
    location: "Sweden",
    year: "",
    specs: { type: "Monitoring & operations" },
    tags: ["Operations", "Monitoring", "Service"],
    verified: true,
  },
  {
    slug: "parksign",
    title: "ParkSign",
    category: "In-house product",
    description:
      "Digital signage for parking environments. Designed and rendered down to the final detail before the first screw is fixed.",
    longDescription:
      "Digital signage for parking environments. Designed and rendered down to the final detail before the first screw is fixed.",
    image: "",
    visualPlaceholder: true,
    visualLabel: "Product visual — ParkSign",
    location: "Sweden",
    year: "",
    specs: { type: "Digital parking signage" },
    tags: ["Product", "Parking", "Digital signage"],
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
      "Bright, energy-efficient digital signage that transforms the shopping experience.",
    longDescription:
      "End-to-end digital signage network across multiple grocery locations. The displays deliver dynamic pricing, promotional content, and wayfinding while maintaining exceptional visibility under challenging store lighting.",
    image:
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1920&q=80",
    location: "Gothenburg, Sweden",
    year: "2024",
    specs: {
      pixelPitch: "P3.9",
      brightness: "1200 nits",
      size: "18m²",
      type: "Digital Signage",
    },
    results:
      "Promotional campaign uptake rose 22% after the first quarter of deployment.",
    tags: ["Retail", "Digital Signage", "Indoor"],
  },
  {
    slug: "automotive-industry",
    title: "Automotive Industry",
    category: "Showroom",
    description:
      "Cinematic showroom LED walls that put every vehicle in its best light.",
    longDescription:
      "A premium automotive showroom installation featuring a sweeping LED backdrop. The screen adapts to different vehicle launches, creating immersive scenes from cityscapes to rugged terrain without moving a single car.",
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
    results:
      "Named the brand's highest-converting showroom in Northern Europe.",
    tags: ["Showroom", "Automotive", "Indoor"],
  },
  {
    slug: "outdoor-advertising-dooh",
    title: "Outdoor Advertising",
    category: "Digital Out-of-Home",
    description: "High-brightness displays built for any environment.",
    longDescription:
      "Weatherproof outdoor LED displays deployed in high-traffic urban environments. Built for 24/7 operation, the screens deliver brilliant visibility in direct sunlight and withstand harsh Nordic winters.",
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
    results:
      "Reached over 2.4 million impressions in the first month of operation.",
    tags: ["DOOH", "Outdoor", "Advertising"],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
