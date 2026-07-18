import type { Metadata } from "next";
import type { Locale } from "./i18n";

export const SITE_URL = "https://imvision.se";
export const SITE_NAME = "IM Vision";
export const DEFAULT_OG_IMAGE = "/images/photon-material/hero-experience-centre.jpg";
export const CONTACT = {
  email: "info@imvision.se",
  phone: "010 330 46 36",
  phoneE164: "+46103304636",
  legalName: "IM Vision Group AB",
  orgNumber: "556924-1200",
  // Swedish VAT number is deterministically SE + 10-digit org.nr + 01.
  vatID: "SE556924120001",
  // Head office (Jönköping).
  street: "Herkulesvägen 56",
  postalCode: "553 02",
  locality: "Jönköping",
  region: "Jönköping",
  country: "SE",
} as const;

/** Secondary location — warehouse & office in the Stockholm area. */
export const STOCKHOLM_LOCATION = {
  street: "Svarvarvägen 20",
  postalCode: "132 38",
  locality: "Saltsjö-Boo",
  region: "Stockholm",
  country: "SE",
} as const;

/**
 * Verified social / external profiles for `sameAs` — links the IM Vision entity
 * to its official accounts (a strong Knowledge Graph / entity-disambiguation
 * signal). Use canonical profile URLs only (no tracking/locale query params).
 * Add LinkedIn / YouTube / Crunchbase / Wikidata here as they become available.
 */
export const SOCIAL_LINKS = [
  { platform: "Facebook", url: "https://www.facebook.com/imvision.se" },
  { platform: "Instagram", url: "https://www.instagram.com/imvision.se" },
  { platform: "LinkedIn", url: "https://www.linkedin.com/company/improd-ab" },
] as const;

// Same list, as bare URLs, for schema.org `sameAs`. Single source of truth so
// the visible footer links and the structured-data entity never drift apart.
export const SOCIAL_PROFILES: string[] = SOCIAL_LINKS.map((s) => s.url);

/** EN path always starts and ends with "/". Returns the absolute URL for a locale. */
export function localeUrl(locale: Locale, path: string): string {
  if (locale === "en") return SITE_URL + path;
  return SITE_URL + (path === "/" ? "/sv/" : "/sv" + path);
}

/**
 * Builds per-page Metadata with canonical + hreflang alternates, Open Graph, and
 * Twitter cards. `title`/`description` should be the localized page values; the
 * root template appends " | IM Vision".
 */
export function pageMeta({
  locale,
  path,
  title,
  description,
  image = DEFAULT_OG_IMAGE,
  absoluteTitle,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  image?: string;
  absoluteTitle?: boolean;
}): Metadata {
  const enUrl = localeUrl("en", path);
  const svUrl = localeUrl("sv", path);
  const canonical = locale === "sv" ? svUrl : enUrl;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical,
      languages: { en: enUrl, sv: svUrl, "x-default": enUrl },
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: locale === "sv" ? "sv_SE" : "en_US",
      alternateLocale: locale === "sv" ? "en_US" : "sv_SE",
      url: canonical,
      title: absoluteTitle ? title : `${title} | ${SITE_NAME}`,
      description,
      // Don't prepend the brand when the title is already absolute (it already
      // contains "IM Vision …") — avoids "IM Vision — IM Vision — …".
      images: [
        { url: image, width: 1672, height: 941, alt: absoluteTitle ? title : `${SITE_NAME} — ${title}` },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: absoluteTitle ? title : `${title} | ${SITE_NAME}`,
      description,
      images: [image],
    },
  };
}

/* ---------- JSON-LD structured data ---------- */

// Reused across Organization/LocalBusiness so the entity's expertise is
// declared consistently (topical + entity signal for Google & AI search).
const KNOWS_ABOUT = [
  "LED displays",
  "LED walls",
  "LED screens",
  "Digital signage",
  "DOOH (digital out-of-home)",
  "LED installation",
  "LED rental",
  "Display service and maintenance",
] as const;

// Logo as a referenceable ImageObject (Google prefers ImageObject with
// dimensions for the knowledge-panel / rich-result logo).
const LOGO_LD = {
  "@type": "ImageObject",
  "@id": `${SITE_URL}/#logo`,
  url: `${SITE_URL}/logo.png`,
  contentUrl: `${SITE_URL}/logo.png`,
  width: 256,
  height: 70,
  caption: SITE_NAME,
} as const;

const ORG_DESCRIPTION =
  "IM Vision designs, engineers, installs and services professional LED display solutions — for permanent installations and events across Europe.";

export function organizationLd() {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: CONTACT.legalName,
    alternateName: "IM Vision LED",
    url: SITE_URL,
    logo: LOGO_LD,
    image: { "@id": `${SITE_URL}/#logo` },
    description: ORG_DESCRIPTION,
    email: CONTACT.email,
    telephone: CONTACT.phoneE164,
    vatID: CONTACT.vatID,
    taxID: CONTACT.orgNumber,
    identifier: {
      "@type": "PropertyValue",
      propertyID: "Organisationsnummer",
      value: CONTACT.orgNumber,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.street,
      postalCode: CONTACT.postalCode,
      addressLocality: CONTACT.locality,
      addressRegion: CONTACT.region,
      addressCountry: CONTACT.country,
    },
    location: [
      { "@id": `${SITE_URL}/#localbusiness` },
      { "@id": `${SITE_URL}/#localbusiness-stockholm` },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: CONTACT.phoneE164,
      email: CONTACT.email,
      contactType: "sales",
      areaServed: ["SE", "EU"],
      availableLanguage: ["Swedish", "English"],
    },
    areaServed: [
      { "@type": "Place", name: "Europe" },
      { "@type": "Country", name: "Sweden" },
    ],
    knowsAbout: [...KNOWS_ABOUT],
    ...(SOCIAL_PROFILES.length ? { sameAs: SOCIAL_PROFILES } : {}),
  };
}

export function localBusinessLd() {
  return {
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: `${SITE_NAME} — Jönköping (HQ)`,
    legalName: CONTACT.legalName,
    url: SITE_URL,
    image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
    logo: LOGO_LD,
    description: ORG_DESCRIPTION,
    email: CONTACT.email,
    telephone: CONTACT.phoneE164,
    vatID: CONTACT.vatID,
    priceRange: "$$$",
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.street,
      postalCode: CONTACT.postalCode,
      addressLocality: CONTACT.locality,
      addressRegion: CONTACT.region,
      addressCountry: CONTACT.country,
    },
    areaServed: [
      { "@type": "Place", name: "Europe" },
      { "@type": "Country", name: "Sweden" },
    ],
    knowsAbout: [...KNOWS_ABOUT],
    ...(SOCIAL_PROFILES.length ? { sameAs: SOCIAL_PROFILES } : {}),
  };
}

/** Second physical location — Stockholm-area warehouse & office. */
export function stockholmBusinessLd() {
  return {
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness-stockholm`,
    name: `${SITE_NAME} — Stockholm`,
    legalName: CONTACT.legalName,
    url: SITE_URL,
    image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
    logo: LOGO_LD,
    description: "IM Vision warehouse and office serving the Stockholm region.",
    email: CONTACT.email,
    telephone: CONTACT.phoneE164,
    vatID: CONTACT.vatID,
    priceRange: "$$$",
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
    address: {
      "@type": "PostalAddress",
      streetAddress: STOCKHOLM_LOCATION.street,
      postalCode: STOCKHOLM_LOCATION.postalCode,
      addressLocality: STOCKHOLM_LOCATION.locality,
      addressRegion: STOCKHOLM_LOCATION.region,
      addressCountry: STOCKHOLM_LOCATION.country,
    },
    areaServed: [
      { "@type": "Place", name: "Stockholm" },
      { "@type": "Country", name: "Sweden" },
    ],
    knowsAbout: [...KNOWS_ABOUT],
    ...(SOCIAL_PROFILES.length ? { sameAs: SOCIAL_PROFILES } : {}),
  };
}

export function websiteLd() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: ["en", "sv"],
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

/** Site-wide graph included once, in the root layout. */
export function siteGraphLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationLd(), localBusinessLd(), stockholmBusinessLd(), websiteLd()],
  };
}

export function faqLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: { "@type": "Answer", text: it.answer },
    })),
  };
}

export function breadcrumbLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

/** Breadcrumb for a 2-level page: Home > page. */
export function pageBreadcrumbLd(locale: Locale, path: string, name: string) {
  const homeName = "Home";
  return breadcrumbLd([
    { name: locale === "sv" ? "Hem" : homeName, url: localeUrl(locale, "/") },
    { name, url: localeUrl(locale, path) },
  ]);
}

/**
 * CreativeWork schema for a project case study, bundled with a 3-level
 * breadcrumb (Home > Projects > project) and the Organization as creator.
 * Project pages are portfolio/case-study content, so CreativeWork is the
 * correct type (not Product — nothing is sold on these pages).
 */
export function projectLd(
  locale: Locale,
  {
    slug,
    title,
    description,
    image,
    category,
    location,
    imageCredit,
    sourceUrl,
    specs,
    tags,
  }: {
    slug: string;
    title: string;
    description: string;
    image?: string;
    category?: string;
    location?: string;
    imageCredit?: string;
    sourceUrl?: string;
    specs?: Record<string, string | undefined>;
    tags?: string[];
  }
) {
  const url = localeUrl(locale, `/projects/${slug}/`);
  const projectsName = locale === "sv" ? "Projekt" : "Projects";
  const absImage = image ? (image.startsWith("http") ? image : `${SITE_URL}${image}`) : undefined;
  const specProps = specs
    ? Object.entries(specs)
        .filter(([, v]) => Boolean(v))
        .map(([name, value]) => ({ "@type": "PropertyValue", name, value }))
    : [];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#project`,
        name: title,
        headline: title,
        description,
        url,
        ...(absImage
          ? {
              image: {
                "@type": "ImageObject",
                url: absImage,
                contentUrl: absImage,
                caption: title,
                // Attribution → correct image licensing/credit signal.
                ...(imageCredit ? { creditText: imageCredit.replace(/^Image:\s*/i, "") } : {}),
              },
            }
          : {}),
        ...(category ? { genre: category } : {}),
        ...(location ? { contentLocation: { "@type": "Place", name: location } } : {}),
        ...(tags?.length ? { keywords: tags.join(", ") } : {}),
        ...(specProps.length ? { additionalProperty: specProps } : {}),
        // External authoritative reference to the same installation (E-E-A-T).
        ...(sourceUrl ? { citation: sourceUrl } : {}),
        about: { "@type": "Thing", name: "LED display installation" },
        inLanguage: locale === "sv" ? "sv" : "en",
        creator: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        copyrightHolder: { "@id": `${SITE_URL}/#organization` },
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
      breadcrumbLd([
        { name: locale === "sv" ? "Hem" : "Home", url: localeUrl(locale, "/") },
        { name: projectsName, url: localeUrl(locale, "/projects/") },
        { name: title, url },
      ]),
    ],
  };
}

/** Service schema for solution pages (sales, rental, service). */
export function serviceLd(
  locale: Locale,
  {
    name,
    description,
    serviceType,
  }: { name: string; description: string; serviceType: string }
) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationLd(),
      {
        "@type": "Service",
        "@id": `${SITE_URL}/#service-${serviceType.toLowerCase().replace(/\s+/g, "-")}`,
        name,
        description,
        serviceType,
        category: "LED display solutions",
        provider: { "@id": `${SITE_URL}/#organization` },
        brand: { "@id": `${SITE_URL}/#organization` },
        areaServed: [
          { "@type": "Place", name: "Europe" },
          { "@type": "Country", name: "Sweden" },
        ],
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: `${SITE_URL}${locale === "sv" ? "/sv" : ""}/contact/`,
          availableLanguage: ["Swedish", "English"],
        },
        inLanguage: locale === "sv" ? "sv" : "en",
      },
    ],
  };
}
