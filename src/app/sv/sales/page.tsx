import type { Metadata } from "next";
import { SalesPage } from "@/components/sections/sales/SalesPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta, serviceLd } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  locale: "sv",
  path: "/sales/",
  title: "Permanenta LED-installationer",
  description:
    "IM Vision designar, projekterar, installerar och servar permanenta LED-system för retail, fastigheter och offentliga miljöer i hela Europa.",
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
    </>
  );
}
