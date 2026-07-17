import type { Metadata } from "next";
import { AboutPageContent } from "@/components/sections/about/AboutPageContent";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  locale: "en",
  path: "/about/",
  title: "About IM Vision",
  description:
    "IM Vision designs, engineers, installs and services advanced LED display solutions — one accountable partner across Europe.",
});

export default function AboutPage() {
  return <AboutPageContent locale="en" />;
}
