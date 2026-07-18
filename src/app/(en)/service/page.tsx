import type { Metadata } from "next";
import { ServicePageContent } from "@/components/sections/service/ServicePageContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta, pageBreadcrumbLd } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  locale: "en",
  path: "/service/",
  title: "Service & Support",
  description:
    "Installation, monitoring, maintenance and long-term support for LED displays — priority response from the team that built your system.",
});

export default function ServicePage() {
  return (
    <>
      <ServicePageContent locale="en" />
      <JsonLd data={pageBreadcrumbLd("en", "/service/", "Service & Support")} />
    </>
  );
}
