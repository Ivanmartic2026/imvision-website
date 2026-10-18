import type { Metadata } from "next";
import { AboutPageContent } from "@/components/sections/about/AboutPageContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta, pageBreadcrumbLd } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  locale: "sv",
  path: "/about/",
  title: "Om oss — LED-leverantör i Sverige och Europa",
  description: "IM Vision designar, projekterar, installerar och servar avancerade LED-system — en ansvarig partner i Norden och Europa.",
});

export default function SwedishAboutPage() {
  return (
    <>
      <AboutPageContent locale="sv" />
      <JsonLd data={pageBreadcrumbLd("sv", "/about/", "Om IM Vision")} />
    </>
  );
}
