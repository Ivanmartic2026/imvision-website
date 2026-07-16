import type { Metadata } from "next";
import { Compass, Target, Users } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";

const values = [
  { icon: Target, title: "Precision", text: "Varje pixel, mått och anslutning spelar roll. Vi projekterar med noggrannhet från första beslut." },
  { icon: Compass, title: "Innovation", text: "Vi utforskar kontinuerligt ny displayteknik, styrning och metoder för arkitektonisk integration." },
  { icon: Users, title: "Partnerskap", text: "Vi arbetar tillsammans med våra kunder från första skiss till långsiktig support." },
];

export const metadata: Metadata = {
  title: "Om IM Vision",
  description: "IM Vision designar, projekterar, installerar och servar avancerade LED-system — en ansvarig partner i hela Europa.",
  alternates: {
    canonical: "/sv/about/",
    languages: { en: "/about/", sv: "/sv/about/", "x-default": "/about/" },
  },
};

export default function SwedishAboutPage() {
  return <><Header locale="sv" /><main id="main-content"><PageHeader label="Om oss" title="Vi är IMvision." description="Mer än en LED-leverantör. Vi designar, projekterar, installerar och underhåller avancerade displaylösningar i Sverige och Europa." /><section className="section section-space"><div className="section-inner"><div className="grid gap-12 lg:grid-cols-2"><h2 className="heading-section">Teknik, design och skala. Levererat med trygghet.</h2><div className="space-y-5 text-lg leading-relaxed text-text-secondary"><p>Från Spånga arbetar vi med kunder i Norden och övriga Europa. Teamet förenar teknisk kompetens med en stark känsla för form.</p><p>Från en enskild butiksskärm till en digital fasad möter varje projekt samma omsorg, precision och ambition.</p></div></div><div className="mt-20 grid border-y border-border-subtle md:grid-cols-3">{values.map((value) => <article key={value.title} className="border-b border-border-subtle py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0"><value.icon className="text-accent" strokeWidth={1.4} /><h3 className="mt-12 text-2xl font-medium">{value.title}</h3><p className="mt-4 text-text-secondary">{value.text}</p></article>)}</div></div></section></main><Footer locale="sv" /></>;
}
