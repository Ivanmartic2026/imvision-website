import type { Metadata } from "next";
import { SalesPage } from "@/components/sections/sales/SalesPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta, pageBreadcrumbLd, serviceLd } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  locale: "sv",
  path: "/sales/",
  // Swedish keeps "LED" first: Search Console shows Swedish demand using "LED skärm",
  // not "digital skyltning", so the latter is a secondary term here — not a swap.
  title: "Permanenta LED-skärmar och digital skyltning",
  description:
    "IM Vision projekterar, installerar och servar permanenta LED-skärmar och digital skyltning för retail, fastigheter och offentliga miljöer i hela Europa.",
});

export default function SwedishSalesPage() {
  return (
    <>
      <SalesPage locale="sv" />
      <JsonLd
        data={serviceLd("sv", {
          name: "Permanenta LED-installationer",
          description:
            "Design, projektering, installation och service av permanenta LED-system för retail, fastigheter och offentliga miljöer i hela Europa.",
          serviceType: "LED-installation",
        })}
      />
      <JsonLd data={pageBreadcrumbLd("sv", "/sales/", "Permanenta LED-installationer")} />
    </>
  );
}
