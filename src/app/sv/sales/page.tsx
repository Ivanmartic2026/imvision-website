import type { Metadata } from "next";
import { SalesPage } from "@/components/sections/sales/SalesPage";

export const metadata: Metadata = {
  title: "Permanenta LED-installationer",
  description:
    "IM Vision designar, projekterar, installerar och servar permanenta LED-system för retail, fastigheter och offentliga miljöer i hela Europa.",
  alternates: {
    canonical: "/sv/sales/",
    languages: { en: "/sales/", sv: "/sv/sales/", "x-default": "/sales/" },
  },
};

export default function SwedishSalesPage() {
  return <SalesPage locale="sv" />;
}
