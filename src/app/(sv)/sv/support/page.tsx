import type { Metadata } from "next";
import { SupportPageContent } from "@/components/sections/support/SupportPageContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta, pageBreadcrumbLd } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  locale: "sv",
  path: "/support/",
  title: "Support och service för LED-skärmar",
  description:
    "IM Visions supportcenter för LED-skärmar — vanliga frågor, dokumentation, fjärrövervakning och direktkontakt för service och underhåll i hela Europa.",
});

export default function SwedishSupportPage() {
  return (
    <>
      <SupportPageContent locale="sv" />
      <JsonLd data={pageBreadcrumbLd("sv", "/support/", "Support")} />
    </>
  );
}
