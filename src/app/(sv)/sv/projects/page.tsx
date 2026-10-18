import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProjectArchive } from "@/components/sections/projects/ProjectArchive";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta, pageBreadcrumbLd } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  locale: "sv",
  path: "/projects/",
  title: "LED-projekt och installationer",
  description: "Utvalda LED-installationer, produkter och driftuppdrag från IM Vision i Norden och Europa.",
  image: "/images/photon-material/architectural-facade.jpg",
  imageWidth: 1536,
  imageHeight: 1024,
});

export default function SwedishProjectsPage() {
  return (
    <>
      <Header locale="sv" />
      <main id="main-content">
        <PageHeader
          label="Installationer"
          title="Byggda för att fortsätta synas."
          description="Utvalda installationer, produkter och driftuppdrag. Filtrera på miljö."
        />
        <ProjectArchive locale="sv" />
      </main>
      <Footer locale="sv" />
      <JsonLd data={pageBreadcrumbLd("sv", "/projects/", "Projekt")} />
    </>
  );
}
