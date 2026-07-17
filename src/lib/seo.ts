import type { Metadata } from "next";
import type { Locale } from "./i18n";

export const SITE_URL = "https://imvision.se";
export const SITE_NAME = "IM Vision";
export const DEFAULT_OG_IMAGE = "/images/photon-material/hero-experience-centre.jpg";
export const CONTACT = {
  email: "sales@imvision.se",
  phone: "+46 8 505 204 80",
  phoneE164: "+46850520480",
  locality: "Spånga",
  region: "Stockholm",
  country: "SE",
} as const;

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
      images: [{ url: image, width: 1672, height: 941, alt: `${SITE_NAME} — ${title}` }],
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

export function organizationLd() {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    email: CONTACT.email,
    telephone: CONTACT.phoneE164,
    address: {
      "@type": "PostalAddress",
      addressLocality: CONTACT.locality,
      addressRegion: CONTACT.region,
      addressCountry: CONTACT.country,
    },
    areaServed: { "@type": "Place", name: "Europe" },
  };
}

export function localBusinessLd() {
  return {
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: SITE_NAME,
    url: SITE_URL,
    image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
    logo: `${SITE_URL}/logo.png`,
    email: CONTACT.email,
    telephone: CONTACT.phoneE164,
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: CONTACT.locality,
      addressRegion: CONTACT.region,
      addressCountry: CONTACT.country,
    },
    areaServed: { "@type": "Place", name: "Europe" },
    knowsAbout: [
      "LED displays",
      "LED walls",
      "Digital signage",
      "DOOH",
      "LED installation",
      "Display service and maintenance",
    ],
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
    "@graph": [organizationLd(), localBusinessLd(), websiteLd()],
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
        name,
        description,
        serviceType,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: { "@type": "Place", name: "Europe" },
        inLanguage: locale === "sv" ? "sv" : "en",
      },
    ],
  };
}
