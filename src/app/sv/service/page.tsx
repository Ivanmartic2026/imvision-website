import type { Metadata } from "next";
import { Headphones, Settings, ShieldCheck, Zap } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { ServiceForm } from "@/components/sections/ServiceForm";

const services = [
  { icon: Headphones, title: "Teknisk support", text: "Diagnostik och samordnad respons när systemet behöver uppmärksamhet." },
  { icon: Settings, title: "Förebyggande underhåll", text: "Planerad inspektion, rengöring och kalibrering förlänger displayens livslängd." },
  { icon: ShieldCheck, title: "Serviceavtal", text: "Tydliga responstider, reservdelsprogram och omfattning anpassad efter installationen." },
  { icon: Zap, title: "Fjärrövervakning", text: "Ansluten diagnostik kan upptäcka avvikelser innan de påverkar upplevelsen." },
];

export const metadata: Metadata = {
  title: "Service och support",
  description: "Installation, övervakning, underhåll och långsiktig support för LED-system — prioriterad respons från teamet som byggde er installation.",
  alternates: {
    canonical: "/sv/service/",
    languages: { en: "/service/", sv: "/sv/service/", "x-default": "/service/" },
  },
};

export default function SwedishServicePage() {
  return <><Header locale="sv" /><main id="main-content"><PageHeader label="Service" title="Vårt ansvar slutar inte vid installationen." description="Från driftsättning och övervakning till underhåll och långsiktig support – för att systemet ska fungera optimalt över tid." /><section className="section section-space"><div className="section-inner"><div className="grid gap-px overflow-hidden rounded-[24px_6px_24px_24px] border border-border-subtle bg-border-subtle md:grid-cols-2">{services.map((service) => <article key={service.title} className="bg-bg-elevated p-8 lg:p-12"><service.icon className="text-accent" strokeWidth={1.4} /><h2 className="mt-12 text-2xl font-medium">{service.title}</h2><p className="mt-4 text-text-secondary">{service.text}</p></article>)}</div><div className="mt-20 light-gate border border-border-subtle bg-bg-elevated p-8 sm:p-12 lg:p-16"><p className="eyebrow text-accent">Skydda investeringen</p><h2 className="mt-7 max-w-4xl text-4xl font-medium tracking-[-0.04em] lg:text-6xl">En serviceplan byggd kring er installation.</h2><div className="mt-8"><Button href="/sv/contact/" size="large">Prata med serviceteamet</Button></div></div></div></section><ServiceForm locale="sv" /></main><Footer locale="sv" /></>;
}
