import type { Metadata } from "next";
import { ServicePageContent } from "@/components/sections/service/ServicePageContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta, pageBreadcrumbLd } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  locale: "en",
  path: "/service/",
  // Was "Service & Support" — 17 characters, and indistinguishable from /support/.
  // Now states the offering and carries the "digital signage" vocabulary.
  title: "Digital Signage & LED Display Maintenance",
  description:
    "Installation, monitoring, maintenance and long-term support for digital signage and LED displays — priority response from the team that built your system.",
});

export default function ServicePage() {
  return (
    <>
      <ServicePageContent locale="en" />
      <JsonLd data={pageBreadcrumbLd("en", "/service/", "Service & Support")} />
    </>
  );
}
