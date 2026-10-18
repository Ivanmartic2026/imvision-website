import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProjectArchive } from "@/components/sections/projects/ProjectArchive";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta, pageBreadcrumbLd } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  locale: "en",
  path: "/projects/",
  title: "LED Display Projects & Installations",
  description:
    "Explore selected IM Vision LED installations — retail displays, architectural facades, event screens and digital-out-of-home delivered across the Nordics and Europe.",
});

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        {/* One card per project, one heading level, and a filter row instead of
            a long unbroken list. The old version wrapped the whole card in a
            single anchor whose accessible name was the entire card, and labelled
            every link "Discover". */}
        <PageHeader
          label="Installations"
          title="Built to stay visible."
          description="Selected installations, products, and operational partnerships. Filter by environment."
        />
        <ProjectArchive locale="en" />
      </main>
      <Footer />
      <JsonLd data={pageBreadcrumbLd("en", "/projects/", "Projects")} />
    </>
  );
}
