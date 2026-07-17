import type { Metadata } from "next";
import { SupportPageContent } from "@/components/sections/support/SupportPageContent";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  locale: "sv",
  path: "/support/",
  title: "Support",
  description: "Support och kontaktvägar för IM Vision LED-installationer i hela Europa.",
});

export default function SwedishSupportPage() {
  return <SupportPageContent locale="sv" />;
}
