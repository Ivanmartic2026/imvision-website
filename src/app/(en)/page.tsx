import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  locale: "en",
  path: "/",
  // Absolute: the root layout's title.template does NOT apply to the same-segment
  // home page, so the brand must be included here explicitly.
  title: "IM Vision — Buy, rent & install LED displays across Europe",
  absoluteTitle: true,
  description:
    "IM Vision designs, engineers, installs and services premium LED displays for retail, events and digital-out-of-home — one accountable partner across Europe.",
});

export default function Home() {
  return <HomePage locale="en" />;
}
