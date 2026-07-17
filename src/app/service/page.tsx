import type { Metadata } from "next";
import { ServicePageContent } from "@/components/sections/service/ServicePageContent";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  locale: "en",
  path: "/service/",
  title: "Service & Support",
  description:
    "Installation, monitoring, maintenance and long-term support for LED displays — priority response from the team that built your system.",
});

export default function ServicePage() {
  return <ServicePageContent locale="en" />;
}
