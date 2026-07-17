import type { Metadata } from "next";
import { AboutPageContent } from "@/components/sections/about/AboutPageContent";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  locale: "sv",
  path: "/about/",
  title: "Om IM Vision",
  description: "IM Vision designar, projekterar, installerar och servar avancerade LED-system — en ansvarig partner i hela Europa.",
});

export default function SwedishAboutPage() {
  return <AboutPageContent locale="sv" />;
}
