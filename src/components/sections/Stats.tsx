import { Locale } from "@/lib/i18n";

const operatingModel = [
  ["Space", "Rum", "Architecture and audience", "Arkitektur och publik"],
  ["System", "System", "Display, structure, and signal", "Display, struktur och signal"],
  ["Operation", "Drift", "Content, control, and people", "Innehåll, styrning och människor"],
  ["Lifecycle", "Livscykel", "Service and future change", "Service och framtida förändring"],
];

export function Stats({ locale = "en" }: { locale?: Locale }) {
  return (
    <section className="theme-light section border-y border-border-subtle bg-bg-elevated py-16 text-text-primary lg:py-20" aria-labelledby="model-title">
      <div className="section-inner">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-4">
            <p className="eyebrow text-accent">IM / {locale === "sv" ? "Arbetsmodell" : "Operating model"}</p>
            <h2 id="model-title" className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.035em]">
              {locale === "sv" ? "En helhet. Ett system." : "Built as one system."}
            </h2>
          </div>
          <dl className="grid gap-px overflow-hidden rounded-[20px_6px_20px_20px] border border-border-subtle bg-border-subtle sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
            {operatingModel.map(([termEn, termSv, descriptionEn, descriptionSv], index) => (
              <div key={termEn} className="min-h-40 bg-bg-surface p-5">
                <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted">0{index + 1} / {locale === "sv" ? termSv : termEn}</dt>
                <dd className="mt-8 text-sm font-semibold leading-relaxed text-text-primary">{locale === "sv" ? descriptionSv : descriptionEn}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
