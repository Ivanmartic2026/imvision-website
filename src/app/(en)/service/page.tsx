import type { Metadata } from "next";
import { ServicePageContent } from "@/components/sections/service/ServicePageContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta, pageBreadcrumbLd } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  locale: "en",
  path: "/service/",
  // Was "Service & Support" — 17 characters, and indistinguishable from /support/.
  // Owner decision: "LED screens" only; no "digital signage" in any served string.
  title: "LED Screen Service and Maintenance",
  description:
    "Installation, monitoring, maintenance and long-term support for LED screens — priority response from the team that built your system. We reply within 24 hours.",
  image: "/images/photon-material/engineering-calibration.jpg",
  imageWidth: 1448,
  imageHeight: 1086,
});

export default function ServicePage() {
  return (
    <>
      <ServicePageContent locale="en" />
      <JsonLd data={pageBreadcrumbLd("en", "/service/", "Service & Support")} />
    </>
  );
}
