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

  const ROLE_LABELS: Record<string, string> = {
    designed: "designed",
    engineered: "engineered",
    delivered: "delivered",
    installed: "installed",
    serviced: "serviced",
    operated: "operated",
    monitored: "monitored",
  };

  // Projects where IM Vision's role is documented come first. `.slice(0, 6)` on the
  // raw array returned exactly the six Ocean Outdoor sites — the ones where nothing
  // published says what IM Vision did — while omitting every project that does say.
  // For an LLM deciding what it can attribute to this company, that was backwards.
  const notable = [...verified]
    .sort((a, b) => Number(Boolean(b.role?.length)) - Number(Boolean(a.role?.length)))
    .slice(0, 6)
    .map((p) => {
      // Neutral phrasing on purpose: the entries are not all installations —
      // the operations entry is an agreement covering several screens, so
      // "IM Vision installed this installation" would misdescribe it.
      const role = p.role?.length
        ? ` IM Vision's role: ${p.role.map((r) => ROLE_LABELS[r]).join(", ")}.`
        : "";
      return `- [${p.title}](${SITE_URL}/projects/${p.slug}/): ${p.description} (${p.location})${role}`;
    })
    .join("\n");

  const body = `# IM Vision

> IM Vision (${CONTACT.legalName}, org.nr ${CONTACT.orgNumber}) designs, engineers, installs and services professional LED display solutions for permanent installations and events across Europe. One accountable partner — in-house engineering, installation, service and operation.

Head office in Jönköping, Sweden, with a warehouse and office in the Stockholm area (Saltsjö-Boo). Bilingual website: English at the root, Swedish under /sv/.

## Services
- [Buy / permanent LED installations](${SITE_URL}/sales/): design, engineering and installation of permanent LED systems for retail, property and public spaces.
- [Rent LED for events](${SITE_URL}/rental/): event-grade LED screens delivered, installed, operated and de-rigged by our own crew.
- [Service & support](${SITE_URL}/service/): monitoring, maintenance, troubleshooting and repair of LED installations.

## Key pages
- [Home](${SITE_URL}/): overview of IM Vision's LED solutions.
- [Projects (case studies)](${SITE_URL}/projects/): reference installations across the Nordics.
- [About IM Vision](${SITE_URL}/about/): company, team and approach.
- [Contact](${SITE_URL}/contact/): enquiry form and direct contact details.
- [Support & FAQ](${SITE_URL}/support/): common questions and support requests.

## Svenska (Swedish)
- [Startsida](${SITE_URL}/sv/)
- [Köpa LED](${SITE_URL}/sv/sales/)
- [Hyra LED](${SITE_URL}/sv/rental/)
- [Service](${SITE_URL}/sv/service/)
- [Projekt](${SITE_URL}/sv/projects/)

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

## Optional
- [Sitemap](${SITE_URL}/sitemap.xml): all indexable URLs.
- [Privacy policy](${SITE_URL}/privacy/)
- [Terms](${SITE_URL}/terms/)
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
