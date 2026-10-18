import type { Metadata } from "next";
import { ServicePageContent } from "@/components/sections/service/ServicePageContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta, pageBreadcrumbLd } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  locale: "sv",
  path: "/service/",
  title: "Service och underhåll av LED-skärmar",
  description:
    "Installation, övervakning, underhåll och långsiktig support för LED-skärmar — prioriterad respons från teamet som byggde er installation. Vi svarar inom 24 timmar.",
  image: "/images/photon-material/engineering-calibration.jpg",
  imageWidth: 1448,
  imageHeight: 1086,
});

export default function SwedishServicePage() {
  return (
    <>
      <ServicePageContent locale="sv" />
      <JsonLd data={pageBreadcrumbLd("sv", "/service/", "Service och support")} />
    </>
  );
}
