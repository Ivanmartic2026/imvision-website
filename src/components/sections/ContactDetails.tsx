import { Phone, Mail, MapPin } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { CONTACT, STOCKHOLM_LOCATION, SOCIAL_LINKS } from "@/lib/seo";
import { SOCIAL_ICONS } from "@/components/ui/social-icons";

const offices = [
  {
    labels: { en: "Head office", sv: "Huvudkontor" },
    street: CONTACT.street,
    line2: `${CONTACT.postalCode} ${CONTACT.locality}`,
  },
  {
    labels: { en: "Warehouse & office", sv: "Lager & kontor" },
    street: STOCKHOLM_LOCATION.street,
    line2: `${STOCKHOLM_LOCATION.postalCode} ${STOCKHOLM_LOCATION.locality}`,
  },
];

export function ContactDetails({ locale = "en" }: { locale?: Locale }) {
  const isSv = locale === "sv";

  return (
    <div className="mt-16 border-t border-border-subtle pt-16 lg:mt-20 lg:pt-20">
      <p className="eyebrow text-accent">{isSv ? "Direktkontakt" : "Direct contact"}</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <a
          href={`tel:${CONTACT.phoneE164}`}
          className="group premium-card flex items-start gap-4 bg-bg-elevated p-5"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px_4px_12px_12px] bg-background text-accent">
            <Phone size={20} strokeWidth={1.5} />
          </span>
          <span>
            <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-text-muted">
              {isSv ? "Telefon" : "Phone"}
            </span>
            <span className="mt-1 block font-medium text-text-primary transition-colors group-hover:text-accent">
              {CONTACT.phone}
            </span>
          </span>
        </a>

        <a
          href={`mailto:${CONTACT.email}`}
          className="group premium-card flex items-start gap-4 bg-bg-elevated p-5"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px_4px_12px_12px] bg-background text-accent">
            <Mail size={20} strokeWidth={1.5} />
          </span>
          <span>
            <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-text-muted">
              {isSv ? "E-post" : "Email"}
            </span>
            <span className="mt-1 block font-medium text-text-primary transition-colors group-hover:text-accent">
              {CONTACT.email}
            </span>
          </span>
        </a>

        {offices.map((office) => (
          <a
            key={office.street}
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              `${office.street}, ${office.line2}, Sweden`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group premium-card flex items-start gap-4 bg-bg-elevated p-5"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px_4px_12px_12px] bg-background text-accent">
              <MapPin size={20} strokeWidth={1.5} />
            </span>
            <span>
              <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-text-muted">
                {office.labels[locale]}
              </span>
              <span className="mt-1 block font-medium leading-snug text-text-primary transition-colors group-hover:text-accent">
                {office.street}
                <br />
                {office.line2}
              </span>
            </span>
          </a>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-text-muted">
          {isSv ? "Följ oss" : "Follow us"}
        </span>
        <div className="flex items-center gap-2">
          {SOCIAL_LINKS.map(({ platform, url }) => {
            const Icon = SOCIAL_ICONS[platform];
            return (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={isSv ? `Följ IM Vision på ${platform}` : `Follow IM Vision on ${platform}`}
                className="flex h-10 w-10 items-center justify-center rounded-[10px_3px_10px_10px] border border-border-subtle text-text-muted transition-colors hover:border-accent/50 hover:text-accent"
              >
                <Icon />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
