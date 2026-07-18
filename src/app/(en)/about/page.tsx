import type { Metadata } from "next";
import { AboutPageContent } from "@/components/sections/about/AboutPageContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta, pageBreadcrumbLd } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  locale: "en",
  path: "/about/",
  title: "About IM Vision",
  description:
    "IM Vision designs, engineers, installs and services advanced LED display solutions — one accountable partner across Europe.",
});

export default function AboutPage() {
  return (
    <>
      <AboutPageContent locale="en" />
      <JsonLd data={pageBreadcrumbLd("en", "/about/", "About IM Vision")} />
    </>
  );
}
