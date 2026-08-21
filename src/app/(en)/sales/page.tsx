import type { Metadata } from "next";
import { SalesPage } from "@/components/sections/sales/SalesPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta, pageBreadcrumbLd, serviceLd } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  locale: "en",
  path: "/sales/",
  // "digital signage" is the vocabulary the incoming English demand actually uses —
  // see the note in docs/seo/SEO-NEXT-STEPS.md §2. Kept alongside "LED", not instead of it.
  title: "Digital Signage & Permanent LED Installations",
  description:
    "IM Vision designs, engineers, installs and services digital signage and permanent LED systems for retail, property and public environments across Europe.",
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
      <JsonLd data={pageBreadcrumbLd("en", "/sales/", "Permanent LED Installations")} />
    </>
  );
}
