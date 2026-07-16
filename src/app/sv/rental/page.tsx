import type { Metadata } from "next";
import Image from "next/image";
import { ArrowDown, ArrowRight, CalendarRange, Radio, Truck } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/effects/Reveal";
import { StaggerReveal, StaggerItem } from "@/components/effects/StaggerReveal";

const capabilities = [
  { icon: CalendarRange, number: "01", title: "Skapat för ögonblicket", text: "Från fokuserade varumärkesaktiveringar till flerdagarsproduktioner anpassas LED-systemet efter format, publik och tidsplan." },
  { icon: Truck, number: "02", title: "En teknisk partner", text: "Planering, logistik, riggsamordning, installation, kalibrering och demontering hanteras som en leverans." },
  { icon: Radio, number: "03", title: "Trygghet genom hela produktionen", text: "Tekniker på plats säkerställer bildkvalitet och systemprestanda från första signal till sista bildruta." },
];

const process = [
  ["01", "Brief", "Syfte, lokal, publik, innehåll och produktionsschema."],
  ["02", "Projektering", "Skärmgeometri, betraktningsavstånd, riggning, kraft och signalflöde."],
  ["03", "Förberedelse", "Systemtest, innehållskontroll, logistik och bemanning."],
  ["04", "Leverans", "Installation, kalibrering, teknisk drift och kontrollerad demontering."],
];

export const metadata: Metadata = {
  title: "LED-uthyrning för event",
  description: "Kompletta LED-system för lanseringar, event, utställningar och tillfälliga miljöer.",
};

export default function SwedishRentalPage() {
  return (
    <>
      <Header locale="sv" />
      <main id="main-content">
        <section className="relative flex min-h-[92svh] items-end overflow-hidden bg-background pb-10 pt-28 sm:pb-14 lg:pb-16">
          <Image src="/images/photon-material/event-rental.jpg" alt="Konceptmiljö med en stor LED-installation för ett premiumevent" fill loading="eager" sizes="100vw" className="object-cover object-center" />
          <div className="media-grade absolute inset-0" />
          <div className="image-grid-overlay absolute inset-0 opacity-35" />
          <div className="section relative z-10 w-full">
            <div className="section-inner">
              <Reveal><p className="eyebrow text-accent">IM / Uthyrningssystem</p></Reveal>
              <Reveal delay={0.08}>
                <h1 className="mt-7 max-w-5xl text-balance text-[clamp(3.5rem,8.4vw,8.5rem)] font-[470] leading-[0.92] tracking-[-0.055em] text-text-primary">
                  Skapat för<span className="block text-accent-soft">ögonblicket.</span>
                </h1>
              </Reveal>
              <div className="mt-8 grid gap-8 border-t border-white/20 pt-7 lg:grid-cols-12 lg:items-end">
                <Reveal delay={0.16} className="lg:col-span-6"><p className="max-w-xl text-lg leading-relaxed text-[#d0d5d2] sm:text-xl">Projekterade LED-miljöer för lanseringar, utställningar, liveproduktioner och tillfälliga rum – levererade som ett komplett tekniskt system.</p></Reveal>
                <Reveal delay={0.22} className="flex flex-col gap-3 sm:flex-row lg:col-span-6 lg:justify-end">
                  <Button href="/sv/contact/" size="large" icon={<ArrowRight size={18} />}>Planera ert event</Button>
                  <Button href="#rental-scope" variant="secondary" size="large" icon={<ArrowDown size={18} />}>Utforska uthyrning</Button>
                </Reveal>
              </div>
              <p className="mt-6 font-mono text-[0.625rem] uppercase tracking-[0.13em] text-white/55">Konceptmiljö · Photon Material-studie</p>
            </div>
          </div>
        </section>

        <section id="rental-scope" className="theme-light section section-space bg-background">
          <div className="section-inner">
            <Reveal><p className="eyebrow text-accent-dim">Uthyrning med precision</p><h2 className="heading-section mt-7 max-w-5xl text-text-primary">Tillfälligt på plats. Genomtänkt in i minsta detalj.</h2></Reveal>
            <StaggerReveal className="mt-16 grid border-y border-border-subtle md:grid-cols-3 lg:mt-24">
              {capabilities.map((item) => (
                <StaggerItem key={item.number}><article className="h-full border-b border-border-subtle py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0 lg:py-10"><div className="flex justify-between"><item.icon size={25} strokeWidth={1.4} className="text-accent-dim" /><span className="font-mono text-xs text-text-muted">{item.number}</span></div><h3 className="mt-16 text-2xl font-medium tracking-[-0.035em] text-text-primary">{item.title}</h3><p className="mt-4 leading-relaxed text-text-secondary">{item.text}</p></article></StaggerItem>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section section-space bg-bg-elevated">
          <div className="section-inner grid gap-14 lg:grid-cols-12">
            <Reveal className="lg:col-span-4"><p className="eyebrow text-accent">Från idé till genomförande</p><h2 className="heading-section mt-7">Ett tryggt flöde hela vägen.</h2></Reveal>
            <StaggerReveal className="border-t border-border-subtle lg:col-span-7 lg:col-start-6">
              {process.map(([number, title, text]) => <StaggerItem key={number}><article className="grid gap-4 border-b border-border-subtle py-7 sm:grid-cols-[4rem_1fr_1.5fr]"><span className="font-mono text-xs text-accent">{number}</span><h3 className="text-xl font-medium text-text-primary">{title}</h3><p className="text-text-secondary">{text}</p></article></StaggerItem>)}
            </StaggerReveal>
          </div>
        </section>

        <section className="section section-space"><div className="section-inner"><div className="light-gate border border-border-subtle bg-bg-elevated p-8 sm:p-12 lg:p-20"><Reveal><p className="eyebrow text-accent">Börja med idén</p><h2 className="mt-7 max-w-5xl text-[clamp(2.7rem,6vw,6.5rem)] font-[470] leading-[0.97] tracking-[-0.052em]">Låt tekniken försvinna in i upplevelsen.</h2><div className="mt-9"><Button href="/sv/contact/" size="large" icon={<ArrowRight size={18} />}>Berätta om ert event</Button></div></Reveal></div></div></section>
      </main>
      <Footer locale="sv" />
    </>
  );
}
