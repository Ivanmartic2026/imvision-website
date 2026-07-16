import type { Metadata } from "next";
import { SalesPage } from "@/components/sections/sales/SalesPage";

export const metadata: Metadata = {
  title: "Permanenta LED-installationer | IM Vision",
  description:
    "IM Vision designar, projekterar, installerar och servar permanenta LED-system för retail, fastigheter och offentliga miljöer i hela Europa.",
};

export default function SwedishSalesPage() {
  return <SalesPage locale="sv" />;
}
