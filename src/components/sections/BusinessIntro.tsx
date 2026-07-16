import { SectionLabel } from "@/components/ui/SectionLabel";
import { Locale } from "@/lib/i18n";

export function BusinessIntro({ locale = "en" }: { locale?: Locale }) {
  return (
    <section
      className="theme-light section section-space relative z-20 -mt-8 rounded-tl-[32px] rounded-tr-[8px] bg-background text-text-primary"
      aria-labelledby="business-intro-title"
    >
      <div className="section-inner border-b border-border-subtle pb-20 md:pb-28 lg:pb-36">
        <div>
          <SectionLabel>{locale === "sv" ? "IM Vision" : "IM Vision"}</SectionLabel>
          <h2
            id="business-intro-title"
            className="mt-10 max-w-[13ch] text-[clamp(3.2rem,8.2vw,8.75rem)] font-[450] leading-[0.93] tracking-[-0.052em] text-text-primary"
          >
            {locale === "sv" ? "Vi designar upplevelsen, inte bara skärmen." : "We design the experience, not just the screen."}
          </h2>
        </div>
        <p className="mt-10 max-w-[620px] text-lg leading-[1.75] text-text-secondary sm:mt-12 sm:text-xl lg:text-[1.35rem]">
          {locale === "sv"
            ? "LED-lösningar för företag, fastigheter, retail, arenor och event – förenade genom design, teknik och driftsäkerhet."
            : "LED solutions for companies, property, retail, arenas, and events — united by design, technology, and operational reliability."}
        </p>
      </div>
    </section>
  );
}
