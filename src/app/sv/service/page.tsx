import type { Metadata } from "next";
import { ServicePageContent } from "@/components/sections/service/ServicePageContent";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  locale: "sv",
  path: "/service/",
  title: "Service och support",
  description:
    "Installation, övervakning, underhåll och långsiktig support för LED-system — prioriterad respons från teamet som byggde er installation.",
});

export default function SwedishServicePage() {
  return <ServicePageContent locale="sv" />;
}
