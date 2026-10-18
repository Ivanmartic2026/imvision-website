import type { Metadata } from "next";
import { SalesPage } from "@/components/sections/sales/SalesPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta, pageBreadcrumbLd, serviceLd } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  locale: "en",
  path: "/sales/",
  // Owner decision (MASTERPROMPT §2): "LED screens" everywhere — "digital signage"
  // must not appear in visible text, titles, meta, OG/Twitter or alt text.
  title: "Permanent LED Screens for Retail, Property and Public Spaces",
  description:
    "IM Vision designs, engineers, installs and services permanent LED screens for retail, property and public spaces across the Nordics and Europe. We reply within 24 hours.",
});

export default function EnglishSalesPage() {
  return (
    <>
      <SalesPage locale="en" />
      <JsonLd
        data={serviceLd("en", {
          name: "Permanent LED Installations",
          description:
            "Design, engineering, installation and service of permanent LED systems for retail, property and public spaces across the Nordics and Europe.",
          serviceType: "LED installation",
        })}
      />
      <JsonLd data={pageBreadcrumbLd("en", "/sales/", "Permanent LED Installations")} />
    </>
  );
}
