import type { Metadata } from "next";
import { HomePage } from "@/app/page";

export const metadata: Metadata = {
  title: "Köp, hyr, installera och serva LED",
  description:
    "IM Vision designar, projekterar, installerar och servar avancerade LED-skärmar — en ansvarig partner i hela Europa.",
  alternates: {
    canonical: "/sv/",
    languages: { en: "/", sv: "/sv/", "x-default": "/" },
  },
};

export default function SwedishHomePage() {
  return <HomePage locale="sv" />;
}
