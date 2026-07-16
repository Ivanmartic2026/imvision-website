import type { Metadata } from "next";
import { SalesPage } from "@/components/sections/sales/SalesPage";

export const metadata: Metadata = {
  title: "Permanent LED Installations | IM Vision",
  description:
    "IM Vision designs, engineers, installs and services permanent LED systems for retail, property and public environments across Europe.",
};

export default function EnglishSalesPage() {
  return <SalesPage locale="en" />;
}
