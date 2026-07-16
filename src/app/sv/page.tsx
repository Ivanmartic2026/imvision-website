import type { Metadata } from "next";
import { HomePage } from "@/app/page";

export const metadata: Metadata = {
  title: "Arkitektoniska LED-system",
  description:
    "IMvision formar, projekterar, installerar och underhåller arkitektoniska LED-miljöer i Sverige och Europa.",
  alternates: {
    canonical: "/sv/",
    languages: { en: "/", sv: "/sv/" },
  },
};

export default function SwedishHomePage() {
  return <HomePage locale="sv" />;
}
