import type { Metadata } from "next";
import { SalesPage } from "@/components/sections/sales/SalesPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta, serviceLd } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  locale: "en",
  path: "/sales/",
  title: "Permanent LED Installations",
  description:
    "IM Vision designs, engineers, installs and services permanent LED systems for retail, property and public environments across Europe.",
});

export default function EnglishSalesPage() {
  return (
    <>
      <SalesPage locale="en" />
      <JsonLd
        data={serviceLd("en", {
          name: "Permanent LED Installations",
          description:
            "Design, engineering, installation and service of permanent LED systems for retail, property and public environments across Europe.",
          serviceType: "LED installation",
        })}
      />
    </>
  );
}
