"use client";

import { useState, useMemo, useId, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Locale } from "@/lib/i18n";
import { Input, Textarea, FileUpload, FormField, UploadedFile } from "@/components/ui/form";
import { ContactTypeSelector } from "./contact/ContactTypeSelector";
import { ContactSuccessState } from "./contact/ContactSuccessState";
import { ContactErrorState } from "./contact/ContactErrorState";
import { ContactCategory } from "./contact/types";

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
}

export function ContactForm({ locale = "en", compact = false, defaultCategory }: ContactFormProps) {
  const [selectedCategory, setSelectedCategory] = useState<ContactCategory | null>(defaultCategory ?? null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const formId = useId();

  const endpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT;

  const categories = useMemo(
    () => ({
      buy: {
        value: "buy" as const,
        title: locale === "sv" ? "Köpa LED" : "Buy LED",
        submitLabel: locale === "sv" ? "Skicka projektförfrågan" : "Send project enquiry",
        recipient: "sales@imvision.se",
        messagePlaceholder:
          locale === "sv"
            ? "Exempel: placering, önskad storlek, användningsområde och ungefärlig tidsplan."
            : "Example: location, desired size, use case and approximate timeline.",
      },
      rental: {
        value: "rental" as const,
        title: locale === "sv" ? "Hyra LED" : "Rent LED",
        submitLabel: locale === "sv" ? "Skicka hyresförfrågan" : "Send rental enquiry",
        recipient: "sales@imvision.se",
        messagePlaceholder:
          locale === "sv"
            ? "Exempel: datum, plats, skärmstorlek, typ av event och önskad hjälp."
            : "Example: date, location, screen size, type of event and help needed.",
      },
      service: {
        value: "service" as const,
        title: locale === "sv" ? "Service & support" : "Service & support",
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
      title: locale === "sv" ? "Hur kan vi hjälpa dig?" : "How can we help you?",
      subtitle:
        locale === "sv"
          ? "Välj vad du behöver hjälp med så återkommer vi samma arbetsdag."
          : "Choose what you need help with and we'll reply the same business day.",
      phone: "+46 8 505 204 80",
      helpNow: locale === "sv" ? "Behöver du hjälp direkt?" : "Need help right now?",
      callUs: locale === "sv" ? "Ring oss under kontorstid." : "Call us during office hours.",
      preferEmail: locale === "sv" ? "Föredrar du e-post?" : "Prefer email?",
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
    setSelectedCategory(category);
    setSubmitError(false);
    reset(
      {
        category,
        name: "",
        phone: "",
        email: "",
        company: "",
        eventDate: "",
        location: "",
        installation: "",
        message: "",
      },
      { keepDefaultValues: false }
    );
    setFiles([]);
  }

  function getErrorMessage(path: keyof typeof t.errors) {
    return errors[path] ? t.errors[path] : undefined;
  }

  const onSubmit = async (data: ContactFormData) => {
    if (typeof document !== "undefined") {
      const trap = document.getElementById(`${formId}-company-url`) as HTMLInputElement | null;
      if (trap && trap.value) return;
    }

    setIsSubmitting(true);
    setSubmitError(false);
    const config = categories[data.category];

    if (endpoint) {
      try {
        const hasFiles = files.length > 0;
        let res: Response;

        if (hasFiles) {
          const formData = new FormData();
          formData.append("category", data.category);
          formData.append("name", data.name);
          formData.append("phone", data.phone);
          formData.append("email", data.email);
          formData.append("message", data.message);
          formData.append("recipient", config.recipient);
          formData.append("locale", locale);
          if (data.company) formData.append("company", data.company);
          if (data.eventDate) formData.append("eventDate", data.eventDate);
          if (data.location) formData.append("location", data.location);
          if (data.installation) formData.append("installation", data.installation);
          files.forEach(({ file }, index) => formData.append(`attachment-${index}`, file));
          res = await fetch(endpoint, { method: "POST", body: formData });
        } else {
          res = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({ ...data, recipient: config.recipient, locale }),
          });
        }

        if (!res.ok) throw new Error("Bad response");
        setIsSuccess(true);
      } catch {
        setSubmitError(true);
      }
    } else {
      // Mailto fallback
      const details = [
        `${locale === "sv" ? "Kategori" : "Category"}: ${config.title}`,
        `${locale === "sv" ? "Namn" : "Name"}: ${data.name}`,
        `${locale === "sv" ? "Telefon" : "Phone"}: ${data.phone}`,
        `Email: ${data.email}`,
        data.company ? `${locale === "sv" ? "Företag" : "Company"}: ${data.company}` : "",
        data.eventDate ? `${locale === "sv" ? "Datum" : "Date"}: ${data.eventDate}` : "",
        data.location ? `${locale === "sv" ? "Plats" : "Location"}: ${data.location}` : "",
        data.installation
          ? `${locale === "sv" ? "Produkt/installation" : "Product/installation"}: ${data.installation}`
          : "",
        "",
        locale === "sv" ? "Meddelande:" : "Message:",
        data.message,
      ]
        .filter(Boolean)
        .join("\n");

      const subject = encodeURIComponent(`${config.title} enquiry from ${data.name}`);
      const body = encodeURIComponent(details);
      window.location.assign(`mailto:${config.recipient}?subject=${subject}&body=${body}`);
      setIsSuccess(true);
    }

    setIsSubmitting(false);
  };

  if (isSuccess && selectedCategory) {
    return <ContactSuccessState locale={locale} category={selectedCategory} />;
  }

  if (submitError && selectedCategory) {
    return (
      <ContactErrorState
        locale={locale}
        recipient={categories[selectedCategory].recipient}
        onRetry={() => setSubmitError(false)}
      />
    );
  }

  return (
    <div className={compact ? "space-y-6" : "space-y-10 sm:space-y-12"}>
      {!compact && (
        <>
          {/* Direct contact */}
          <div className="grid gap-4 sm:grid-cols-2">
            <a
              href={`tel:${t.phone.replace(/\s/g, "")}`}
              className="group rounded-2xl border border-border-subtle bg-bg-surface p-5 transition-all duration-200 hover:border-accent hover:bg-bg-elevated"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border-subtle bg-bg-elevated text-accent transition-colors group-hover:border-accent/30">
                  <Phone size={18} strokeWidth={1.5} />
                </span>
                <div>
                  <p className="text-sm font-medium text-text-muted">{t.helpNow}</p>
                  <p className="mt-0.5 text-lg font-semibold text-text-primary">{t.phone}</p>
                  <p className="mt-1 text-sm text-text-secondary">{t.callUs}</p>
                </div>
              </div>
            </a>
            <a
              href={`mailto:${categories.buy.recipient}`}
              className="group rounded-2xl border border-border-subtle bg-bg-surface p-5 transition-all duration-200 hover:border-accent hover:bg-bg-elevated"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border-subtle bg-bg-elevated text-accent transition-colors group-hover:border-accent/30">
                  <Mail size={18} strokeWidth={1.5} />
                </span>
                <div>
                  <p className="text-sm font-medium text-text-muted">{t.preferEmail}</p>
                  <p className="mt-0.5 text-lg font-semibold text-text-primary">{categories.buy.recipient}</p>
                </div>
              </div>
            </a>
          </div>

          {/* Heading */}
          <div className="text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">{t.title}</h1>
            <p className="mx-auto mt-3 max-w-lg text-text-secondary">{t.subtitle}</p>
          </div>
        </>
      )}

      {/* Selector */}
      <ContactTypeSelector locale={locale} selected={selectedCategory} onSelect={selectCategory} />

      {/* Expanded form */}
      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
            className="overflow-hidden"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mx-auto max-w-2xl space-y-5 rounded-3xl border border-border-subtle bg-bg-surface p-6 shadow-[0_12px_40px_rgba(0,0,0,.05)] sm:p-10"
            >
              <input type="hidden" {...register("category")} value={selectedCategory} />

              <div className="grid gap-5 sm:grid-cols-2">
                <FormField id={`${formId}-name`} label={t.common.name} required error={getErrorMessage("name")}>
                  <Input
                    id={`${formId}-name`}
                    autoComplete="name"
                    aria-invalid={errors.name ? "true" : undefined}
                    {...register("name")}
                    placeholder={t.common.namePlaceholder}
                    error={!!errors.name}
                    // Auto-focus on desktop only to avoid mobile scroll jumps
                    autoFocus={typeof window !== "undefined" && window.matchMedia("(min-width: 640px)").matches}
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

                <FormField
                  id={`${formId}-email`}
                  label={t.common.email}
                  required
                  error={getErrorMessage("email")}
                  className="sm:col-span-2"
                >
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

                {selectedCategory === "rental" && (
                  <>
                    <FormField id={`${formId}-eventDate`} label={t.common.eventDate} error={undefined}>
                      <Input
                        id={`${formId}-eventDate`}
                        {...register("eventDate")}
                        placeholder={t.common.eventDatePlaceholder}
                      />
                    </FormField>
                    <FormField id={`${formId}-location`} label={t.common.location} error={undefined}>
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
                    <FormField id={`${formId}-company`} label={t.common.company} error={undefined}>
                      <Input
                        id={`${formId}-company`}
                        autoComplete="organization"
                        {...register("company")}
                        placeholder={t.common.companyPlaceholder}
                      />
                    </FormField>
                    <FormField id={`${formId}-installation`} label={t.common.installation} error={undefined}>
                      <Input
                        id={`${formId}-installation`}
                        {...register("installation")}
                        placeholder={t.common.installationPlaceholder}
                      />
                    </FormField>
                  </>
                )}

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
                  className="sm:col-span-2"
                >
                  <Textarea
                    id={`${formId}-message`}
                    rows={4}
                    aria-invalid={errors.message ? "true" : undefined}
                    {...register("message")}
                    placeholder={categories[selectedCategory].messagePlaceholder}
                    error={!!errors.message}
                  />
                </FormField>
              </div>

              <FileUpload
                files={files}
                onChange={setFiles}
                label={t.common.attachments}
                description={t.common.attachmentsDescription}
                limitText={t.common.attachmentsLimit}
              />

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

              <div className="pt-2">
                <Button
                  type="submit"
                  size="large"
                  loading={isSubmitting}
                  icon={<ArrowRight size={18} />}
                  className="w-full sm:w-auto"
                >
                  {isSubmitting
                    ? locale === "sv"
                      ? "Skickar..."
                      : "Sending..."
                    : categories[selectedCategory].submitLabel}
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
