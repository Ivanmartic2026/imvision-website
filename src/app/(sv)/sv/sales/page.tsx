import type { Metadata } from "next";
import { SalesPage } from "@/components/sections/sales/SalesPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta, pageBreadcrumbLd, serviceLd } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  locale: "sv",
  path: "/sales/",
  // Owner decision (MASTERPROMPT §2): "LED-skärmar" everywhere — never
  // "digital skyltning" in visible text, titles, meta, OG/Twitter or alt text.
  title: "Permanenta LED-skärmar för butik, fastighet och offentlig miljö",
  description:
    "IM Vision projekterar, installerar och servar permanenta LED-skärmar för butik, fastighet och offentlig miljö i Norden och Europa. Ni får offert inom 24 timmar.",
});

export default function SwedishSalesPage() {
  return (
    <>
      <SalesPage locale="sv" />
      <JsonLd
        data={serviceLd("sv", {
          name: "Permanenta LED-installationer",
          description:
            "Design, projektering, installation och service av permanenta LED-system för butik, fastighet och offentlig miljö i Norden och Europa.",
          serviceType: "LED-installation",
        })}
      />
      <JsonLd data={pageBreadcrumbLd("sv", "/sales/", "Permanenta LED-installationer")} />
    </>
  );
}
