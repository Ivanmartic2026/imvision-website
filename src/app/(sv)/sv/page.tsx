import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  locale: "sv",
  path: "/",
  title: "Köp, hyr, installera och serva LED",
  description:
    "IM Vision designar, projekterar, installerar och servar avancerade LED-skärmar — en ansvarig partner i hela Europa.",
});

export default function SwedishHomePage() {
  return <HomePage locale="sv" />;
}
