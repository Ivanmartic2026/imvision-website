import { Locale } from "@/lib/i18n";

const capabilities = [
  ["01", "Site & concept", "Plats & koncept"],
  ["02", "System engineering", "Systemprojektering"],
  ["03", "Installation", "Installation"],
  ["04", "Lifecycle support", "Livscykelsupport"],
];

export function TrustStrip({ locale = "en" }: { locale?: Locale }) {
  return (
    <section id="capabilities" className="border-y border-border-subtle bg-bg-elevated" aria-label="End-to-end capability">
      <div className="section">
        <div className="section-inner grid sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map(([number, labelEn, labelSv], index) => (
            <div
              key={number}
              className={`flex min-h-24 items-center gap-4 py-5 sm:px-6 lg:min-h-28 ${
                index > 0 ? "border-t border-border-subtle sm:border-t-0 sm:border-l" : ""
              } ${index === 2 ? "sm:border-l-0 lg:border-l" : ""}`}
            >
              <span className="font-mono text-[11px] text-accent">IM / {number}</span>
              <span className="text-sm font-semibold text-text-primary">{locale === "sv" ? labelSv : labelEn}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
