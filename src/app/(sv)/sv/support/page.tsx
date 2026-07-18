import type { Metadata } from "next";
import { SupportPageContent } from "@/components/sections/support/SupportPageContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta, pageBreadcrumbLd } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  locale: "sv",
  path: "/support/",
  title: "Support",
  description: "Support och kontaktvägar för IM Vision LED-installationer i hela Europa.",
});

export default function SwedishSupportPage() {
  return (
    <>
      <SupportPageContent locale="sv" />
      <JsonLd data={pageBreadcrumbLd("sv", "/support/", "Support")} />
    </>
  );
}
