import type { Metadata } from "next";
import { SupportPageContent } from "@/components/sections/support/SupportPageContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta, pageBreadcrumbLd } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  locale: "en",
  path: "/support/",
  title: "Support",
  description:
    "IM Vision support centre — FAQs, documentation and contact options for LED display service across Europe.",
});

export default function SupportPage() {
  return (
    <>
      <SupportPageContent locale="en" />
      <JsonLd data={pageBreadcrumbLd("en", "/support/", "Support")} />
    </>
  );
}
