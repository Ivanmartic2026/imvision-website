import type { Metadata } from "next";
import { SupportPageContent } from "@/components/sections/support/SupportPageContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta, pageBreadcrumbLd } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  locale: "en",
  path: "/support/",
  title: "Support",
  description:
    "IM Vision support centre for LED displays — FAQs, documentation, remote monitoring and direct contact for service and maintenance across Europe.",
});

export default function SupportPage() {
  return (
    <>
      <SupportPageContent locale="en" />
      <JsonLd data={pageBreadcrumbLd("en", "/support/", "Support")} />
    </>
  );
}
