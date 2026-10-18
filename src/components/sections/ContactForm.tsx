"use client";

import { useState, useMemo, useId, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Input, Textarea, FileUpload, FormField, UploadedFile } from "@/components/ui/form";
import { ContactTypeSelector } from "./contact/ContactTypeSelector";
import { ContactSuccessState } from "./contact/ContactSuccessState";
import { ContactErrorState } from "./contact/ContactErrorState";
import { ContactCategory } from "./contact/types";
import { AnalyticsEvent, pushEvent } from "@/lib/analytics";

const contactSchema = z.object({
  category: z.enum(["buy", "rental", "service"]),
  name: z.string().min(2, "required"),
  phone: z.string().min(6, "required"),
  email: z.string().email("invalid"),
  company: z.string().optional(),
  eventDate: z.string().optional(),
  location: z.string().optional(),
  installation: z.string().optional(),
  message: z.string().min(10, "min"),
  honeypot: z.string().max(0, "spam").optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  locale?: Locale;
  compact?: boolean;
  defaultCategory?: ContactCategory;
  /** Hide the 3-card category selector (use with defaultCategory for a single-purpose form). */
  hideSelector?: boolean;
  /**
   * "panel" renders the whole form — heading, selector and fields — inside one
   * card that is visible immediately (used by the contact page hero). The
   * default keeps the previous stacked presentation for embedded forms.
   */
  variant?: "default" | "panel";
  /** Element id for the panel wrapper, so header CTAs can deep-link to the form. */
  id?: string;
}

export function ContactForm({
  locale = "en",
  compact = false,
  defaultCategory,
  hideSelector = false,
  variant = "default",
  id = "contact-form",
}: ContactFormProps) {
  const isPanel = variant === "panel";
  const optionalSuffix = locale === "sv" ? "(valfritt)" : "(optional)";
  const [selectedCategory, setSelectedCategory] = useState<ContactCategory | null>(defaultCategory ?? null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [flowRef, setFlowRef] = useState<string | undefined>(undefined);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  // Pre-filled mailto for the error state: the in-page link is the reliable
  // fallback when a popup blocker swallows window.open().
  const [fallbackHref, setFallbackHref] = useState<string | undefined>(undefined);
  const formId = useId();
  const started = useRef(false);
  const summaryRef = useRef<HTMLDivElement | null>(null);

  // form_start – vid första interaktionen med formuläret (ingen PII).
  const handleFirstInteraction = () => {
    if (started.current) return;
    started.current = true;
    pushEvent(AnalyticsEvent.formStart, { form_id: "contact" });
  };

  const categories = useMemo(
    () => ({
      buy: {
        value: "buy" as const,
        title: locale === "sv" ? "Köpa LED" : "Buy LED",
        submitLabel: locale === "sv" ? "Skicka projektförfrågan" : "Send project enquiry",
        recipient: "info@imvision.se",
        messagePlaceholder:
          locale === "sv"
            ? "Exempel: placering, önskad storlek, användningsområde och ungefärlig tidsplan."
            : "Example: location, desired size, use case and approximate timeline.",
      },
      rental: {
        value: "rental" as const,
        title: locale === "sv" ? "Hyra LED" : "Rent LED",
        submitLabel: locale === "sv" ? "Skicka hyresförfrågan" : "Send rental enquiry",
        recipient: "info@imvision.se",
        messagePlaceholder:
          locale === "sv"
            ? "Exempel: datum, plats, skärmstorlek, typ av event och önskad hjälp."
            : "Example: date, location, screen size, type of event and help needed.",
      },
      service: {
        value: "service" as const,
        title: locale === "sv" ? "Service och support" : "Service & support",
        submitLabel: locale === "sv" ? "Skicka serviceärende" : "Send support case",
        recipient: "service@imvision.se",
        messagePlaceholder:
          locale === "sv"
            ? "Beskriv vad som har hänt, när felet uppstod och om installationen fortfarande är i drift."
            : "Describe what happened, when the issue started and whether the installation is still running.",
      },
    }),
    [locale]
  );

  const t = useMemo(
    () => ({
      title: locale === "sv" ? "Hur kan vi hjälpa er?" : "How can we help you?",
      subtitle:
        locale === "sv"
          ? "Välj vad det gäller så återkommer vi inom 24 timmar."
          : "Choose what it concerns and we reply within 24 hours.",
      phone: "010 330 46 36",
      helpNow: locale === "sv" ? "Behöver ni hjälp direkt?" : "Need help right now?",
      callUs: locale === "sv" ? "Ring oss under kontorstid." : "Call us during office hours.",
      preferEmail: locale === "sv" ? "Föredrar ni e-post?" : "Prefer email?",
      common: {
        name: locale === "sv" ? "Namn" : "Name",
        namePlaceholder: locale === "sv" ? "Ert namn" : "Your name",
        phone: locale === "sv" ? "Telefon" : "Phone",
        phonePlaceholder: locale === "sv" ? "+46 70 123 45 67" : "+46 70 123 45 67",
        email: locale === "sv" ? "E-postadress" : "Work email",
        emailPlaceholder: "name@company.com",
        company: locale === "sv" ? "Företag" : "Company",
        companyPlaceholder: locale === "sv" ? "Ert företag" : "Your company",
        eventDate: locale === "sv" ? "Datum för eventet" : "Event date",
        eventDatePlaceholder: locale === "sv" ? "T.ex. 15 september 2026" : "E.g. 15 September 2026",
        location: locale === "sv" ? "Ort eller plats" : "City or location",
        locationPlaceholder: locale === "sv" ? "T.ex. Stockholm" : "E.g. Stockholm",
        installation: locale === "sv" ? "Produkt eller installation" : "Product or installation",
        installationPlaceholder: locale === "sv" ? "T.ex. Mall of Scandinavia" : "E.g. Mall of Scandinavia",
        message: locale === "sv" ? "Berätta kort om projektet" : "Tell us briefly about the project",
        attachments: locale === "sv" ? "Lägg till filer" : "Add files",
        attachmentsDescription: locale === "sv" ? "Bilder, PDF, DWG, dokument eller video." : "Images, PDF, DWG, documents or video.",
        attachmentsLimit: locale === "sv" ? "Max 5 filer, 25 MB per fil." : "Max 5 files, 25 MB each.",
      },
      errors: {
        name: locale === "sv" ? "Ange ert namn." : "Please enter your name.",
        phone: locale === "sv" ? "Ange ett giltigt telefonnummer." : "Please enter a valid phone number.",
        email: locale === "sv" ? "Ange en giltig e-postadress." : "Please enter a valid email.",
        message: locale === "sv" ? "Berätta kort om projektet." : "Please tell us briefly about the project.",
      },
    }),
    [locale]
  );

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { category: defaultCategory || "buy" },
  });

  useEffect(() => {
    if (selectedCategory) {
      setValue("category", selectedCategory, { shouldValidate: false });
    }
  }, [selectedCategory, setValue]);

  function selectCategory(category: ContactCategory) {
    const previous = getValues();
    setSelectedCategory(category);
    setSubmitError(false);
    setFlowRef(undefined);
    setSubmitAttempted(false);
    // Keep everything the user already typed; only drop the fields that belong
    // to the category they are leaving (eventDate/location vs installation).
    reset(
      {
        category,
        name: previous.name ?? "",
        phone: previous.phone ?? "",
        email: previous.email ?? "",
        company: previous.company ?? "",
        message: previous.message ?? "",
        eventDate: "",
        location: "",
        installation: "",
      },
      { keepDefaultValues: false }
    );
  }

  function getErrorMessage(path: keyof typeof t.errors) {
    return errors[path] ? t.errors[path] : undefined;
  }

  /**
   * mailto fallback used when the API call fails. It carries the submitted
   * values in the body so a server/network failure never costs the user what
   * they just typed. Capped to keep the URL within mail-client limits.
   */
  function buildMailtoFallback(category: ContactCategory, data: ContactFormData) {
    const config = categories[category];
    const subject = locale === "sv" ? `Ny ${config.title} från imvision.se` : `New ${config.title} from imvision.se`;
    const lines = [
      [t.common.name, data.name],
      [t.common.phone, data.phone],
      [t.common.email, data.email],
      [t.common.company, data.company],
      [t.common.eventDate, data.eventDate],
      [t.common.location, data.location],
      [t.common.installation, data.installation],
      [t.common.message, data.message],
    ]
      .filter(([, value]) => typeof value === "string" && value.trim().length > 0)
      .map(([label, value]) => `${label}: ${value}`);
    const body = lines.join("\n").slice(0, 1800);
    return `mailto:${config.recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  // Move focus to the error summary once validation errors are rendered, so
  // keyboard and screen-reader users land on the explanation instead of
  // hunting through the form.
  useEffect(() => {
    if (!submitAttempted) return;
    if (Object.keys(errors).length === 0) return;
    const frame = requestAnimationFrame(() => summaryRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [submitAttempted, errors]);

  const onSubmit = async (data: ContactFormData) => {
    if (typeof document !== "undefined") {
      const trap = document.getElementById(`${formId}-company-url`) as HTMLInputElement | null;
      if (trap && trap.value) return;
    }

    setIsSubmitting(true);
    setSubmitError(false);
    setFlowRef(undefined);
    setFallbackHref(undefined);
    const config = categories[data.category];

    try {
      const formData = new FormData();
      formData.append("category", config.title);
      // Stable, unlocalised key — the server routes on this, not the display title.
      formData.append("categoryKey", config.value);
      formData.append("name", data.name);
      formData.append("phone", data.phone);
      formData.append("email", data.email);
      formData.append("message", data.message);
      formData.append("locale", locale);
      if (data.company) formData.append("company", data.company);
      if (data.eventDate) formData.append("eventDate", data.eventDate);
      if (data.location) formData.append("location", data.location);
      if (data.installation) formData.append("installation", data.installation);
      files.forEach(({ file }, index) => formData.append(`attachment-${index}`, file));

      const res = await fetch("/api/contact/", { method: "POST", body: formData });

      if (res.ok) {
        // Always show success — the server guarantees { ok: true } even
        // when email delivery fails. A mailto: fallback is provided as a
        // courtesy so the user's mail app opens with the form data.
        const body = await res.json().catch(() => null);
        if (typeof body?.fallbackMailto === "string") {
          window.open(body.fallbackMailto, "_blank");
        }
        // Capture Flow reference (IM-0042 / PRJ-0003) for display.
        if (typeof body?.ref === "string") {
          setFlowRef(body.ref);
        }
        setIsSuccess(true);
        setSubmitError(false);
      } else {
        // Server returned error status — offer a pre-filled mailto as courtesy.
        const mailto = buildMailtoFallback(data.category, data);
        setFallbackHref(mailto);
        window.open(mailto, "_blank");
        setSubmitError(true);
      }

      // Konverteringsmätning (endast kategori – aldrig namn/e-post/telefon/fritext).
      pushEvent(AnalyticsEvent.formSubmit, { form_id: "contact", category: data.category });
      pushEvent(AnalyticsEvent.generateLead, { form_id: "contact", category: data.category });
      pushEvent(
        data.category === "service"
          ? AnalyticsEvent.bookService
          : AnalyticsEvent.quoteRequest,
        { form_id: "contact", category: data.category },
      );
    } catch {
      // Network failure / fetch crash — offer a pre-filled mailto so the user can still send.
      const mailto = buildMailtoFallback(data.category, data);
      setFallbackHref(mailto);
      window.open(mailto, "_blank");
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess && selectedCategory) {
    return <ContactSuccessState locale={locale} category={selectedCategory} flowRef={flowRef} />;
  }

  if (submitError && selectedCategory) {
    return (
      <ContactErrorState
        locale={locale}
        recipient={categories[selectedCategory].recipient}
        onRetry={() => setSubmitError(false)}
        mailtoHref={fallbackHref}
      />
    );
  }

  const errorCount = Object.keys(errors).filter((key) => key !== "category" && key !== "honeypot").length;

  return (
    <div
      id={isPanel ? id : undefined}
      tabIndex={isPanel ? -1 : undefined}
      className={cn(
        isPanel && "outline-none",
        compact ? "space-y-6" : "space-y-10 sm:space-y-12",
        isPanel &&
          "space-y-3.5 rounded-[24px_8px_24px_24px] border border-border-subtle bg-bg-surface p-4 shadow-[0_20px_60px_rgba(0,0,0,.20)] sm:p-6 scroll-mt-28"
      )}
    >
      {!compact && (
        <div className={cn(isPanel ? "text-left" : "text-center")}>
          {/* h2, not h1: the page's single h1 is the hero heading. Two h1s on
              one page is a heading-hierarchy defect for SEO + a11y. */}
          <h2
            className={cn(
              "font-semibold tracking-tight text-text-primary",
              isPanel ? "text-2xl" : "text-3xl sm:text-4xl"
            )}
          >
            {t.title}
          </h2>
          {!isPanel && <p className="mx-auto mt-3 max-w-lg text-text-secondary">{t.subtitle}</p>}
        </div>
      )}

      {/* Selector — hidden when the form is locked to a single category */}
      {!hideSelector && (
        <ContactTypeSelector locale={locale} selected={selectedCategory} onSelect={selectCategory} />
      )}

      {/* Validation summary: the single place that explains what needs fixing,
          announced and focused as soon as an invalid submit happens. */}
      {submitAttempted && errorCount > 0 && (
        <div
          ref={summaryRef}
          role="alert"
          tabIndex={-1}
          className="rounded-[12px_4px_12px_12px] border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-300 outline-none focus-visible:ring-2 focus-visible:ring-red-400/60"
        >
          <strong className="font-semibold text-red-200">
            {locale === "sv" ? `Kontrollera ${errorCount} fält` : `Check ${errorCount} field${errorCount === 1 ? "" : "s"}`}
          </strong>
          {" — "}
          {locale === "sv"
            ? "fälten är markerade nedan."
            : "the fields are marked below."}
        </div>
      )}

      {/* Expanded form — no entrance animation in panel mode so the form is
          visible from the first paint (and survives a failed hydration). */}
      {isPanel ? (
        renderForm()
      ) : (
        <AnimatePresence>
          {selectedCategory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
              className="overflow-hidden"
            >
              {renderForm()}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );

  function renderForm() {
    if (!selectedCategory) return null;
    const fileField = (
      <FileUpload
        files={files}
        onChange={setFiles}
        label={t.common.attachments}
        description={t.common.attachmentsDescription}
        limitText={t.common.attachmentsLimit}
        compact={isPanel}
        dragLabel={locale === "sv" ? "Klicka för att ladda upp" : "Click to upload"}
        dragHint={locale === "sv" ? "eller släpp filer här" : "or drop files here"}
      />
    );
    return (
      <form
        onSubmit={handleSubmit(onSubmit, () => setSubmitAttempted(true))}
        onFocusCapture={handleFirstInteraction}
        onChangeCapture={handleFirstInteraction}
        className={cn(
          isPanel ? "space-y-3.5" : "space-y-5",
          !isPanel && "mx-auto max-w-2xl rounded-[24px_8px_24px_24px] border border-border-subtle bg-bg-surface p-6 shadow-[0_12px_40px_rgba(0,0,0,.05)] sm:p-10"
        )}
      >
        <input type="hidden" {...register("category")} value={selectedCategory} />

        <div className={cn("grid", isPanel ? "gap-3.5 sm:grid-cols-2 lg:grid-cols-3" : "gap-5 sm:grid-cols-2")}>
          <FormField id={`${formId}-name`} label={t.common.name} required error={getErrorMessage("name")}>
            <Input
              id={`${formId}-name`}
              autoComplete="name"
              aria-invalid={errors.name ? "true" : undefined}
              {...register("name")}
              placeholder={t.common.namePlaceholder}
              error={!!errors.name}
              // Auto-focus only when the form appears after an explicit choice —
              // never in panel mode, where it would scroll the page on load.
              autoFocus={
                !isPanel && typeof window !== "undefined" && window.matchMedia("(min-width: 640px)").matches
              }
            />
          </FormField>

          <FormField id={`${formId}-phone`} label={t.common.phone} required error={getErrorMessage("phone")}>
            <Input
              id={`${formId}-phone`}
              type="tel"
              autoComplete="tel"
              aria-invalid={errors.phone ? "true" : undefined}
              {...register("phone")}
              placeholder={t.common.phonePlaceholder}
              error={!!errors.phone}
            />
          </FormField>

          <FormField id={`${formId}-email`} label={t.common.email} required error={getErrorMessage("email")}>
            <Input
              id={`${formId}-email`}
              type="email"
              autoComplete="email"
              aria-invalid={errors.email ? "true" : undefined}
              {...register("email")}
              placeholder={t.common.emailPlaceholder}
              error={!!errors.email}
            />
          </FormField>

          <FormField
            id={`${formId}-company`}
            label={`${t.common.company} ${optionalSuffix}`}
            error={undefined}
          >
            <Input
              id={`${formId}-company`}
              autoComplete="organization"
              {...register("company")}
              placeholder={t.common.companyPlaceholder}
            />
          </FormField>

          {selectedCategory === "rental" && (
            <>
              <FormField id={`${formId}-eventDate`} label={`${t.common.eventDate} ${optionalSuffix}`} error={undefined}>
                <Input
                  id={`${formId}-eventDate`}
                  {...register("eventDate")}
                  placeholder={t.common.eventDatePlaceholder}
                />
              </FormField>
              <FormField id={`${formId}-location`} label={`${t.common.location} ${optionalSuffix}`} error={undefined}>
                <Input
                  id={`${formId}-location`}
                  {...register("location")}
                  placeholder={t.common.locationPlaceholder}
                />
              </FormField>
            </>
          )}

          {selectedCategory === "service" && (
            <>
              <FormField id={`${formId}-installation`} label={`${t.common.installation} ${optionalSuffix}`} error={undefined}>
                <Input
                  id={`${formId}-installation`}
                  {...register("installation")}
                  placeholder={t.common.installationPlaceholder}
                />
              </FormField>
            </>
          )}

          {isPanel && <div className="sm:col-span-2">{fileField}</div>}

          <FormField
            id={`${formId}-message`}
            label={
              selectedCategory === "service"
                ? locale === "sv"
                  ? "Beskriv felet"
                  : "Describe the issue"
                : t.common.message
            }
            required
            error={getErrorMessage("message")}
            className={isPanel ? "sm:col-span-2 lg:col-span-3" : "sm:col-span-2"}
          >
            <Textarea
              id={`${formId}-message`}
              rows={isPanel ? 2 : 4}
              aria-invalid={errors.message ? "true" : undefined}
              {...register("message")}
              placeholder={categories[selectedCategory].messagePlaceholder}
              error={!!errors.message}
            />
          </FormField>
        </div>

        {!isPanel && fileField}

        {/* Honeypot */}
        <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
          <label htmlFor={`${formId}-company-url`}>Company website</label>
          <input
            id={`${formId}-company-url`}
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("honeypot")}
          />
        </div>

        <div className="space-y-3 pt-1">
          <Button
            type="submit"
            size="large"
            loading={isSubmitting}
            icon={<ArrowRight size={18} />}
            className={cn("w-full", !isPanel && "sm:w-auto")}
          >
            {isSubmitting
              ? locale === "sv"
                ? "Skickar..."
                : "Sending..."
              : categories[selectedCategory].submitLabel}
          </Button>
          {isPanel && (
            <p className="text-center text-xs leading-relaxed text-text-muted">
              {locale === "sv" ? "Vi svarar inom 24 timmar. Brådskande? Ring " : "We reply within 24 hours. Urgent? Call "}
              <a
                href="tel:+46103304636"
                className="inline-flex min-h-11 items-center px-1 text-accent-soft underline decoration-accent-soft/40 underline-offset-4 transition-colors hover:text-accent"
              >
                {t.phone}
              </a>
            </p>
          )}
        </div>
      </form>
    );
  }
}
