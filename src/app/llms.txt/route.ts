import { projects } from "@/lib/projects";
import { SITE_URL, CONTACT, STOCKHOLM_LOCATION } from "@/lib/seo";

export const dynamic = "force-static";

/**
 * /llms.txt — the emerging convention for describing a site to LLM-based search
 * (ChatGPT Search, Perplexity, etc.) in a compact, machine-friendly form.
 * Built from the same source data as the site so it never drifts out of sync.
 */
export function GET() {
  const verified = projects.filter((p) => p.verified === true);
  const notable = verified
    .slice(0, 6)
    .map((p) => `- ${p.title} — ${p.description} (${p.location}) ${SITE_URL}/projects/${p.slug}/`)
    .join("\n");

  const body = `# IM Vision

> IM Vision (${CONTACT.legalName}, org.nr ${CONTACT.orgNumber}) designs, engineers, installs and services professional LED display solutions for permanent installations and events across Europe. One accountable partner — in-house engineering, installation, service and operation.

Head office in Jönköping, Sweden, with a warehouse and office in the Stockholm area (Saltsjö-Boo). Bilingual website: English at the root, Swedish under /sv/.

## Services
- Buy / permanent LED installations: ${SITE_URL}/sales/
- Rent LED for events: ${SITE_URL}/rental/
- Service & support: ${SITE_URL}/service/

## Key pages
- Home: ${SITE_URL}/
- Projects (case studies): ${SITE_URL}/projects/
- About IM Vision: ${SITE_URL}/about/
- Contact: ${SITE_URL}/contact/
- Support & FAQ: ${SITE_URL}/support/

## Svenska (Swedish)
- Startsida: ${SITE_URL}/sv/
- Köpa LED: ${SITE_URL}/sv/sales/
- Hyra LED: ${SITE_URL}/sv/rental/
- Service: ${SITE_URL}/sv/service/
- Projekt: ${SITE_URL}/sv/projects/

## Expertise
LED displays, LED walls, LED screens, digital signage, DOOH (digital out-of-home), LED installation, LED rental, display service and maintenance.

## Notable projects
${notable}

## Contact
- Phone: ${CONTACT.phone} (${CONTACT.phoneE164})
- Email: ${CONTACT.email}
- Head office: ${CONTACT.street}, ${CONTACT.postalCode} ${CONTACT.locality}, Sweden
- Stockholm office: ${STOCKHOLM_LOCATION.street}, ${STOCKHOLM_LOCATION.postalCode} ${STOCKHOLM_LOCATION.locality}, Sweden
- Company: ${CONTACT.legalName} (org.nr ${CONTACT.orgNumber})
- Languages: English, Swedish
- Sitemap: ${SITE_URL}/sitemap.xml
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
