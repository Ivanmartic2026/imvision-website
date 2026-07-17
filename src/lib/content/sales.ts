import { Locale } from "@/lib/i18n";
import { Project, projects } from "@/lib/projects";
import { swedishProjectCopy } from "@/lib/projects-sv";

export interface UseCase {
  number: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface Principle {
  label: string;
  description: string;
}

export interface FeaturedProject {
  slug: string;
  override?: {
    title?: string;
    category?: string;
    description?: string;
  };
}

export interface SalesContent {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subhead: string;
    primaryCta: string;
    secondaryCta: string;
    image: string;
    imageAlt: string;
    caption: string;
  };
  intro: {
    eyebrow: string;
    title: string;
    body: string;
  };
  useCases: {
    eyebrow: string;
    title: string;
    body: string;
    items: UseCase[];
  };
  process: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: ProcessStep[];
  };
  architecturalIntegration: {
    eyebrow: string;
    title: string;
    body: string;
    image: string;
    imageAlt: string;
    imageBadge: string;
  };
  technicalPrinciples: {
    eyebrow: string;
    title: string;
    image: string;
    imageAlt: string;
    principles: Principle[];
  };
  responsibility: {
    eyebrow: string;
    title: string;
    bullets: string[];
    closing: string;
  };
  featuredProjects: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
    projects: FeaturedProject[];
  };
  service: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
  };
  projectForm: {
    eyebrow: string;
    title: string;
    body: string;
  };
  finalCta: {
    eyebrow: string;
    title: string;
    body: string;
    primaryCta: string;
    phone: string;
    email: string;
  };
}

const sv: SalesContent = {
  meta: {
    title: "Permanenta LED-installationer | IM Vision",
    description:
      "IM Vision designar, projekterar, installerar och servar permanenta LED-system för retail, fastigheter och offentliga miljöer i hela Europa.",
  },
  hero: {
    eyebrow: "IM / Permanent LED",
    title: "LED som blir en del av arkitekturen.",
    subhead:
      "Vi designar, projekterar, installerar och servar permanenta LED-system för retail, fastigheter och offentliga miljöer.",
    primaryCta: "Starta ert projekt",
    secondaryCta: "Se hur vi arbetar",
    image: "/images/photon-material/permanent-retail.jpg",
    imageAlt: "Permanenta LED-installation i premium retail-miljö",
    caption: "Konceptmiljö · Photon Material-studie",
  },
  intro: {
    eyebrow: "Utformat för platsen",
    title: "Varje installation börjar med platsen.",
    body:
      "Siktlinjer, dagsljus, konstruktion och användning avgör vilken lösning som fungerar. Därför börjar vi med miljön – inte med en produktlista.",
  },
  useCases: {
    eyebrow: "Användningsområden",
    title: "Tre miljöer. En gemensam ansats.",
    body:
      "Permanent LED ska kännas självklart i rummet. Här är tre miljöer där vi ofta arbetar.",
    items: [
      {
        number: "01",
        title: "Butik och retail",
        description:
          "Skyltfönster och digitala ytor utformade kring kundflöden, dagsljus och rummets arkitektur.",
        image: "/images/photon-material/permanent-retail.jpg",
        imageAlt: "LED i premium retail-miljö",
      },
      {
        number: "02",
        title: "Showroom och upplevelse",
        description:
          "Högupplösta visuella miljöer som ger produkter och varumärken en flexibel, filmisk bakgrund.",
        image: "/images/photon-material/hero-experience-centre.jpg",
        imageAlt: "LED i showroom och upplevelsemiljö",
      },
      {
        number: "03",
        title: "Arkitektur och fasad",
        description:
          "LED integrerad i lobbyer, offentliga miljöer och byggnadsskal där konstruktion och serviceåtkomst löses från början.",
        image: "/images/photon-material/architectural-facade.jpg",
        imageAlt: "LED integrerad i byggnadsfasad",
      },
    ],
  },
  process: {
    eyebrow: "En sammanhållen process",
    title: "Från tom yta till kalibrerat system.",
    intro: "Vi hanterar hela kedjan och löser varje beslut i rätt ordning.",
    steps: [
      {
        number: "01",
        title: "Platsanalys",
        description:
          "Vi analyserar rum, konstruktion, ljus, siktlinjer, betraktningsavstånd och daglig drift.",
      },
      {
        number: "02",
        title: "Design",
        description:
          "Vi definierar displaygeometri, upplösning, innehållsbeteende och arkitektonisk integration.",
      },
      {
        number: "03",
        title: "Projektering",
        description:
          "Vi planerar kraft, signal, värmehantering, infästning, säkerhet, åtkomst och systemstyrning.",
      },
      {
        number: "04",
        title: "Installation",
        description: "Vi samordnar leverans, montage, inriktning, driftsättning och kalibrering.",
      },
      {
        number: "05",
        title: "Drift och service",
        description: "Ni får dokumentation, utbildning, underhåll och långsiktig teknisk support.",
      },
    ],
  },
  architecturalIntegration: {
    eyebrow: "Arkitektonisk integration",
    title: "Integrerat från början.",
    body:
      "Permanent LED fungerar bäst när teknik, konstruktion och serviceåtkomst planeras tillsammans med arkitekturen. Resultatet blir en installation som känns självklar i rummet – inte som ett tillägg.",
    image: "/images/photon-material/architectural-facade.jpg",
    imageAlt: "LED integrerad i nordisk byggnadsfasad",
    imageBadge: "Arkitektoniskt koncept",
  },
  technicalPrinciples: {
    eyebrow: "Tekniska principer",
    title: "Dimensionerat för verkligheten.",
    image: "/images/photon-material/engineering-calibration.jpg",
    imageAlt: "Teknisk kalibrering av LED-system",
    principles: [
      {
        label: "Betraktningsavstånd",
        description:
          "Pixel pitch och upplösning väljs efter hur installationen faktiskt ska upplevas.",
      },
      {
        label: "Ljusstyrka",
        description: "Ljusstyrka och kontrast balanseras efter dagsljus, miljö och öppettider.",
      },
      {
        label: "Konstruktion",
        description: "Infästning, kylning och serviceåtkomst integreras i den tekniska lösningen.",
      },
      {
        label: "Långsiktig drift",
        description: "Systemet planeras för daglig användning, underhåll och framtida service.",
      },
    ],
  },
  responsibility: {
    eyebrow: "Ett partnerskap",
    title: "Ett ansvar genom hela projektet.",
    bullets: [
      "design och teknisk rådgivning",
      "konstruktion och projektering",
      "logistik och installation",
      "driftsättning och kalibrering",
      "dokumentation och utbildning",
      "service och långsiktig support",
    ],
    closing:
      "Ni har en partner genom hela projektet – från de första ritningarna till den dagliga driften.",
  },
  featuredProjects: {
    eyebrow: "Referenser",
    title: "Utvalda installationer",
    body:
      "Se hur permanent LED har integrerats i retailmiljöer, showroom och arkitektoniska projekt.",
    cta: "Se alla projekt",
    projects: [
      { slug: "kappahl" },
      { slug: "sas-nordic-lounges" },
      { slug: "the-curve" },
    ],
  },
  service: {
    eyebrow: "Livslängd",
    title: "Byggd för många års drift.",
    body:
      "En permanent LED-installation behöver mer än rätt hårdvara. Vi erbjuder förebyggande underhåll, fjärrsupport, reservdelar och teknisk service under hela systemets livslängd.",
    cta: "Läs om service och support",
  },
  projectForm: {
    eyebrow: "Starta ert projekt",
    title: "Dela er förfrågan.",
    body: "Fyll i formuläret så öppnas ert e-postprogram med en färdig förfrågan.",
  },
  finalCta: {
    eyebrow: "Nästa steg",
    title: "Låt oss börja med platsen.",
    body:
      "Dela ritningar, miljö, önskad upplevelse och tidsplan. Vi hjälper er att definiera rätt permanent LED-system.",
    primaryCta: "Starta ert projekt",
    phone: "010 330 46 36",
    email: "sales@imvision.se",
  },
};

const en: SalesContent = {
  meta: {
    title: "Permanent LED Installations | IM Vision",
    description:
      "IM Vision designs, engineers, installs and services permanent LED systems for retail, property and public environments across Europe.",
  },
  hero: {
    eyebrow: "IM / Permanent LED",
    title: "LED built into architecture.",
    subhead:
      "We design, engineer, install and service permanent LED systems for retail, property and public environments.",
    primaryCta: "Start your project",
    secondaryCta: "See how we work",
    image: "/images/photon-material/permanent-retail.jpg",
    imageAlt: "Permanent LED installation in a premium retail environment",
    caption: "Concept environment · Photon Material study",
  },
  intro: {
    eyebrow: "Designed for the space",
    title: "Every installation starts with the space.",
    body:
      "Sightlines, daylight, structure and use determine which solution works. That is why we start with the environment – not a product list.",
  },
  useCases: {
    eyebrow: "Applications",
    title: "Three environments. One shared approach.",
    body: "Permanent LED should feel inevitable in the room. Here are three environments where we often work.",
    items: [
      {
        number: "01",
        title: "Retail",
        description:
          "Shop windows and digital surfaces designed around customer flow, daylight and the architecture of the space.",
        image: "/images/photon-material/permanent-retail.jpg",
        imageAlt: "LED in a premium retail environment",
      },
      {
        number: "02",
        title: "Showroom & experience",
        description:
          "High-resolution visual environments that give products and brands a flexible, cinematic backdrop.",
        image: "/images/photon-material/hero-experience-centre.jpg",
        imageAlt: "LED in a showroom and experience environment",
      },
      {
        number: "03",
        title: "Architecture & facade",
        description:
          "LED integrated into lobbies, public spaces and building envelopes where structure and service access are resolved from the start.",
        image: "/images/photon-material/architectural-facade.jpg",
        imageAlt: "LED integrated into building facade",
      },
    ],
  },
  process: {
    eyebrow: "One accountable process",
    title: "From empty surface to calibrated system.",
    intro: "We handle the full chain and resolve every decision in the right order.",
    steps: [
      {
        number: "01",
        title: "Site analysis",
        description: "We analyse the room, structure, light, sightlines, viewing distance and daily operation.",
      },
      {
        number: "02",
        title: "Design",
        description: "We define display geometry, resolution, content behaviour and architectural integration.",
      },
      {
        number: "03",
        title: "Engineering",
        description: "We plan power, signal, thermal management, mounting, safety, access and system control.",
      },
      {
        number: "04",
        title: "Installation",
        description: "We coordinate delivery, assembly, alignment, commissioning and calibration.",
      },
      {
        number: "05",
        title: "Operation & service",
        description: "You receive documentation, training, maintenance and long-term technical support.",
      },
    ],
  },
  architecturalIntegration: {
    eyebrow: "Architectural integration",
    title: "Integrated from the start.",
    body:
      "Permanent LED works best when technology, structure and service access are planned together with the architecture. The result is an installation that feels inevitable in the space – not an add-on.",
    image: "/images/photon-material/architectural-facade.jpg",
    imageAlt: "LED integrated into a Nordic building facade",
    imageBadge: "Architectural concept",
  },
  technicalPrinciples: {
    eyebrow: "Engineering principles",
    title: "Sized for reality.",
    image: "/images/photon-material/engineering-calibration.jpg",
    imageAlt: "Technical calibration of an LED system",
    principles: [
      {
        label: "Viewing distance",
        description: "Pixel pitch and resolution are chosen based on how the installation will actually be experienced.",
      },
      {
        label: "Brightness",
        description: "Brightness and contrast are balanced for daylight, environment and opening hours.",
      },
      {
        label: "Structure",
        description: "Mounting, cooling and service access are integrated into the technical solution.",
      },
      {
        label: "Long-term operation",
        description: "The system is planned for daily use, maintenance and future service.",
      },
    ],
  },
  responsibility: {
    eyebrow: "A partnership",
    title: "Accountability across the whole project.",
    bullets: [
      "design and technical advisory",
      "engineering and project planning",
      "logistics and installation",
      "commissioning and calibration",
      "documentation and training",
      "service and long-term support",
    ],
    closing: "You have one partner from the first drawings to daily operations.",
  },
  featuredProjects: {
    eyebrow: "References",
    title: "Selected installations",
    body: "See how permanent LED has been integrated into retail environments, showrooms and architectural projects.",
    cta: "See all projects",
    projects: [
      { slug: "kappahl" },
      { slug: "sas-nordic-lounges" },
      { slug: "the-curve" },
    ],
  },
  service: {
    eyebrow: "Lifespan",
    title: "Built for years of operation.",
    body:
      "A permanent LED installation needs more than the right hardware. We offer preventive maintenance, remote support, spare parts and technical service throughout the system's lifetime.",
    cta: "Read about service and support",
  },
  projectForm: {
    eyebrow: "Start your project",
    title: "Share your enquiry.",
    body: "Fill in the form and your email app will open with a prepared enquiry.",
  },
  finalCta: {
    eyebrow: "Next step",
    title: "Let's start with the space.",
    body:
      "Share drawings, environment, intended experience and timeline. We will help you define the right permanent LED system.",
    primaryCta: "Start your project",
    phone: "010 330 46 36",
    email: "sales@imvision.se",
  },
};

export const salesContent: Record<Locale, SalesContent> = { en, sv };

export function getFeaturedProjects(locale: Locale, featured: FeaturedProject[]): Project[] {
  return featured
    .map((fp) => {
      const project = projects.find((p) => p.slug === fp.slug);
      if (!project) return null;
      if (locale === "sv") {
        const svCopy = swedishProjectCopy[project.slug];
        if (svCopy) {
          return {
            ...project,
            title: svCopy.title,
            category: svCopy.category,
            description: svCopy.description,
            longDescription: svCopy.longDescription,
          };
        }
      }
      return project;
    })
    .filter((p): p is Project => p !== null);
}
