"use client";

import { useState, useMemo, useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Check, Monitor, CalendarDays, Wrench, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Locale } from "@/lib/i18n";
import {
  Input,
  Textarea,
  FileUpload,
  FormField,
  UploadedFile,
} from "@/components/ui/form";

type Category = "buy" | "rental" | "service";

const baseSchema = z.object({
  category: z.enum(["buy", "rental", "service"]),
  name: z.string().min(2, "required"),
  company: z.string().optional(),
  email: z.string().email("invalid"),
  phone: z.string().min(6, "required"),
  projectName: z.string().optional(),
  eventDate: z.string().optional(),
  location: z.string().optional(),
  screenSize: z.string().optional(),
  installationSite: z.string().optional(),
  serialNumber: z.string().optional(),
  description: z.string().min(10, "min"),
  termsAccepted: z.boolean(),
  honeypot: z.string().max(0, "spam").optional(),
});

const contactSchema = baseSchema.superRefine((data, ctx) => {
  if (data.category === "buy") {
    if (!data.projectName || data.projectName.length < 2) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["projectName"], message: "required" });
    }
  }
  if (data.category === "rental") {
    if (!data.eventDate || data.eventDate.length < 2) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["eventDate"], message: "required" });
    }
    if (!data.location || data.location.length < 2) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["location"], message: "required" });
    }
  }
  if (data.category === "service") {
    if (!data.installationSite || data.installationSite.length < 2) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["installationSite"], message: "required" });
    }
    if (data.termsAccepted !== true) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["termsAccepted"], message: "required" });
    }
  }
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  locale?: Locale;
  compact?: boolean;
  defaultCategory?: Category;
}

function generateCaseNumber() {
  const year = new Date().getFullYear();
  const random = Math.floor(100000 + Math.random() * 900000);
  return `IM-${year}-${random}`;
}

function formatDateTime(locale: Locale) {
  const now = new Date();
  return new Intl.DateTimeFormat(locale === "sv" ? "sv-SE" : "en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(now);
}

export function ContactForm({ locale = "en", compact = false, defaultCategory }: ContactFormProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(defaultCategory ?? null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [usedMailto, setUsedMailto] = useState(false);
  const [caseNumber] = useState(() => generateCaseNumber());
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const formId = useId();

  const endpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT;

  const t = useMemo(
    () => ({
      title: locale === "sv" ? "Vad behöver du hjälp med?" : "What do you need help with?",
      subtitle:
        locale === "sv"
          ? "Välj ett alternativ så visas rätt formulär."
          : "Choose an option and the right form will appear.",
      step1: locale === "sv" ? "Välj tjänst" : "Choose service",
      step2: locale === "sv" ? "Dina uppgifter" : "Your details",
      step3: locale === "sv" ? "Projektuppgifter" : "Project details",
      step4: locale === "sv" ? "Skicka" : "Send",
      changeType: locale === "sv" ? "Ändra ärendetyp" : "Change request type",
      selected: locale === "sv" ? "Valt" : "Selected",
      categories: {
        buy: {
          title: locale === "sv" ? "Köpa LED" : "Buy LED",
          description:
            locale === "sv" ? "Permanenta installationer." : "Permanent installations.",
          cta: locale === "sv" ? "Begär offert" : "Request quote",
          submitting: locale === "sv" ? "Skickar förfrågan..." : "Sending request...",
        },
        rental: {
          title: locale === "sv" ? "Hyra LED" : "Rent LED",
          description:
            locale === "sv" ? "Event, mässor och tillfälliga installationer." : "Events, fairs and temporary installations.",
          cta: locale === "sv" ? "Kolla tillgänglighet" : "Check availability",
          submitting: locale === "sv" ? "Skickar förfrågan..." : "Sending request...",
        },
        service: {
          title: locale === "sv" ? "Service & Support" : "Service & Support",
          description:
            locale === "sv" ? "Support, felsökning och reparation." : "Support, troubleshooting and repair.",
          cta: locale === "sv" ? "Skicka supportärende" : "Submit support case",
          submitting: locale === "sv" ? "Skickar ärende..." : "Sending case...",
        },
      },
      common: {
        name: locale === "sv" ? "Namn" : "Name",
        namePlaceholder: locale === "sv" ? "Ert namn" : "Your name",
        company: locale === "sv" ? "Företag" : "Company",
        companyPlaceholder: locale === "sv" ? "Ert företag" : "Your company",
        phone: locale === "sv" ? "Telefon" : "Phone",
        phonePlaceholder: locale === "sv" ? "+46 70 123 45 67" : "+46 70 123 45 67",
        email: locale === "sv" ? "E-postadress" : "Work email",
        emailPlaceholder: "name@company.com",
        description: locale === "sv" ? "Berätta kort" : "Tell us briefly",
      },
      buy: {
        projectName: locale === "sv" ? "Projektnamn" : "Project name",
        projectNamePlaceholder: locale === "sv" ? "T.ex. Flagshipbutik Stockholm" : "E.g. Flagship store Stockholm",
        descriptionPlaceholder:
          locale === "sv"
            ? "Projektstorlek, plats, tidsplan eller frågor..."
            : "Project size, location, timeline or questions...",
      },
      rental: {
        eventDate: locale === "sv" ? "Eventdatum" : "Event date",
        eventDatePlaceholder: locale === "sv" ? "T.ex. 15 september 2026" : "E.g. 15 September 2026",
        location: locale === "sv" ? "Plats" : "Location",
        locationPlaceholder: locale === "sv" ? "Stad och venue" : "City and venue",
        screenSize: locale === "sv" ? "Storlek på skärm (valfritt)" : "Screen size (optional)",
        screenSizePlaceholder: locale === "sv" ? "T.ex. 4×3 m" : "E.g. 4×3 m",
        descriptionPlaceholder:
          locale === "sv"
            ? "Event, publik, innehåll och tidsplan..."
            : "Event, audience, content and timeline...",
        attachments: locale === "sv" ? "Bilagor (valfritt)" : "Attachments (optional)",
      },
      service: {
        installationSite: locale === "sv" ? "Anläggning / Plats" : "Installation / Site",
        installationSitePlaceholder: locale === "sv" ? "T.ex. Mall of Scandinavia" : "E.g. Mall of Scandinavia",
        serialNumber: locale === "sv" ? "Serienummer (om det finns)" : "Serial number (if available)",
        serialNumberPlaceholder: "SN-12345",
        attachments: locale === "sv" ? "Bilder eller filmer" : "Images or videos",
        descriptionPlaceholder:
          locale === "sv"
            ? "Beskriv felet, felmeddelande eller vad som hänt..."
            : "Describe the issue, error message or what happened...",
        terms:
          locale === "sv"
            ? "Jag godkänner att ärendet registreras och att eventuell support debiteras per timme."
            : "I agree that the case is registered and that any support may be billed hourly.",
        termsRequired: locale === "sv" ? "Godkänn villkoren för att skicka." : "Please accept the terms to submit.",
      },
      dragLabel: locale === "sv" ? "Klicka för att ladda upp" : "Click to upload",
      dragHint: locale === "sv" ? "eller dra och släpp filer här" : "or drag and drop files here",
      dragDescription: locale === "sv" ? "Bilder, PDF, DWG, dokument eller video" : "Images, PDF, DWG, documents or video",
      errors: {
        name: locale === "sv" ? "Ange ert namn." : "Please enter your name.",
        phone: locale === "sv" ? "Ange ett giltigt telefonnummer." : "Please enter a valid phone number.",
        email: locale === "sv" ? "Ange en giltig e-postadress." : "Please enter a valid email.",
        description: locale === "sv" ? "Berätta lite mer." : "Please tell us a little more.",
        projectName: locale === "sv" ? "Ange projektnamn." : "Please enter the project name.",
        eventDate: locale === "sv" ? "Ange eventdatum." : "Please enter the event date.",
        location: locale === "sv" ? "Ange plats." : "Please enter the location.",
        installationSite: locale === "sv" ? "Ange anläggning eller plats." : "Please enter the installation or site.",
      },
      trust: [
        locale === "sv" ? "Svar vanligtvis samma arbetsdag." : "Reply usually the same business day.",
        locale === "sv" ? "Ni får kontakt med en LED-specialist." : "You will be contacted by an LED specialist.",
      ],
      successTitle: locale === "sv" ? "Tack för er förfrågan" : "Thank you for your enquiry",
      successEndpoint:
        locale === "sv"
          ? "Tack — er förfrågan är skickad. Vi återkommer inom en arbetsdag."
          : "Thank you — your enquiry is on its way. We will reply within one business day.",
      successMailto:
        locale === "sv"
          ? "Ert e-postprogram öppnades med ett färdigt meddelande — tryck skicka så svarar vi inom en arbetsdag. Bilagor skickas inte automatiskt via e-post; bifoga dem i mailet eller vänta på vår uppföljning."
          : "Your email client opened with a prepared message — press send and we'll reply within one business day. Attachments are not sent automatically by email; attach them to the email or wait for our follow-up.",
      successService:
        locale === "sv"
          ? "Ert ärende är registrerat med referensnummer {case}. Vi återkommer inom en arbetsdag."
          : "Your case is registered with reference number {case}. We will reply within one business day.",
    }),
    [locale]
  );

  const categoryOrder: Category[] = ["buy", "rental", "service"];

  const categoryIcons = {
    buy: <Monitor size={24} strokeWidth={1.5} />,
    rental: <CalendarDays size={24} strokeWidth={1.5} />,
    service: <Wrench size={24} strokeWidth={1.5} />,
  };

  const categoryColors = {
    buy: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    rental: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    service: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { category: defaultCategory || "buy", termsAccepted: false },
  });

  function selectCategory(category: Category) {
    setSelectedCategory(category);
    setValue("category", category, { shouldValidate: false });
    reset({ category, termsAccepted: false }, { keepDefaultValues: false });
    setFiles([]);
  }

  function getErrorMessage(path: keyof typeof t.errors) {
    const err = errors[path];
    return err ? t.errors[path] : undefined;
  }

  const onSubmit = async (data: ContactFormData) => {
    if (typeof document !== "undefined") {
      const trap = document.getElementById(`${formId}-company-url`) as HTMLInputElement | null;
      if (trap && trap.value) return;
    }

    setIsSubmitting(true);
    const categoryLabel = t.categories[data.category].title;
    const submittedAt = formatDateTime(locale);

    if (endpoint) {
      try {
        const hasFiles = files.length > 0;
        let res: Response;

        if (hasFiles) {
          const formData = new FormData();
          formData.append("category", data.category);
          formData.append("categoryLabel", categoryLabel);
          formData.append("company", data.company || "");
          formData.append("name", data.name);
          formData.append("phone", data.phone);
          formData.append("email", data.email);
          formData.append("description", data.description);
          formData.append("locale", locale);
          formData.append("submittedAt", submittedAt);
          if (data.category === "buy" && data.projectName) formData.append("projectName", data.projectName);
          if (data.category === "rental") {
            if (data.eventDate) formData.append("eventDate", data.eventDate);
            if (data.location) formData.append("location", data.location);
            if (data.screenSize) formData.append("screenSize", data.screenSize);
          }
          if (data.category === "service") {
            if (data.installationSite) formData.append("installationSite", data.installationSite);
            if (data.serialNumber) formData.append("serialNumber", data.serialNumber);
            formData.append("caseNumber", caseNumber);
            formData.append("termsAccepted", "true");
          }
          files.forEach(({ file }, index) => formData.append(`attachment-${index}`, file));
          res = await fetch(endpoint, { method: "POST", body: formData });
        } else {
          const payload = {
            ...data,
            categoryLabel,
            locale,
            submittedAt,
            caseNumber: data.category === "service" ? caseNumber : undefined,
          };
          res = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify(payload),
          });
        }

        if (!res.ok) throw new Error("Bad response");
        setUsedMailto(false);
        setIsSuccess(true);
        setIsSubmitting(false);
        return;
      } catch {
        // fall through to mailto
      }
    }

    const details = [
      `${locale === "sv" ? "Kategori" : "Category"}: ${categoryLabel}`,
      data.company ? `${locale === "sv" ? "Företag" : "Company"}: ${data.company}` : "",
      `${locale === "sv" ? "Namn" : "Name"}: ${data.name}`,
      `${locale === "sv" ? "Telefon" : "Phone"}: ${data.phone}`,
      `Email: ${data.email}`,
      data.category === "buy" && data.projectName
        ? `${locale === "sv" ? "Projekt" : "Project"}: ${data.projectName}`
        : "",
      data.category === "rental"
        ? `${locale === "sv" ? "Eventdatum" : "Event date"}: ${data.eventDate || ""}`
        : "",
      data.category === "rental" ? `${locale === "sv" ? "Plats" : "Location"}: ${data.location || ""}` : "",
      data.category === "rental" && data.screenSize
        ? `${locale === "sv" ? "Skärmstorlek" : "Screen size"}: ${data.screenSize}`
        : "",
      data.category === "service"
        ? `${locale === "sv" ? "Anläggning/plats" : "Installation/site"}: ${data.installationSite || ""}`
        : "",
      data.category === "service" && data.serialNumber
        ? `${locale === "sv" ? "Serienummer" : "Serial number"}: ${data.serialNumber}`
        : "",
      data.category === "service" ? `Case: ${caseNumber}` : "",
      "",
      locale === "sv" ? "Beskrivning:" : "Description:",
      data.description,
    ].filter(Boolean);

    const subject = encodeURIComponent(
      data.category === "service"
        ? `${caseNumber} — ${categoryLabel} from ${data.name}`
        : `${categoryLabel} enquiry from ${data.name}`
    );
    const body = encodeURIComponent(details.join("\n"));
    window.location.assign(`mailto:sales@imvision.se?subject=${subject}&body=${body}`);
    setUsedMailto(true);
    setIsSuccess(true);
    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
        role="status"
        className="flex flex-col items-start gap-5 rounded-3xl border border-accent/25 bg-accent/10 p-8 text-text-secondary"
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 15 }}
          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-white"
        >
          <Check size={28} />
        </motion.span>
        <div>
          <p className="text-xl font-medium text-text-primary">{t.successTitle}</p>
          <p className="mt-2 max-w-md leading-relaxed">
            {usedMailto
              ? t.successMailto
              : selectedCategory === "service"
                ? t.successService.replace("{case}", caseNumber)
                : t.successEndpoint}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className={compact ? "space-y-5" : "space-y-8"}>
      {/* Progress */}
      {!compact && <div className="flex items-center gap-2 sm:gap-4">
        {[
          { number: 1, label: t.step1 },
          { number: 2, label: t.step2 },
          { number: 3, label: t.step3 },
          { number: 4, label: t.step4 },
        ].map((step, index, arr) => {
          const isCompleted = selectedCategory ? step.number <= 2 : step.number === 1;
          const isCurrent = selectedCategory ? step.number === 2 : step.number === 1;
          return (
            <div key={step.number} className="flex items-center gap-2 sm:gap-4">
              <div className="flex flex-col items-center gap-1 sm:flex-row sm:gap-2">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                    isCompleted
                      ? "bg-accent text-white"
                      : isCurrent
                        ? "border border-accent bg-accent/10 text-accent"
                        : "border border-border-subtle bg-bg-elevated text-text-muted"
                  }`}
                >
                  {isCompleted && !isCurrent ? <Check size={14} /> : step.number}
                </span>
                <span
                  className={`hidden text-xs font-medium sm:block ${
                    isCurrent ? "text-text-primary" : "text-text-muted"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < arr.length - 1 && (
                <span className="hidden h-px w-6 bg-border-subtle sm:block" aria-hidden="true" />
              )}
            </div>
          );
        })}
      </div>}

      {/* Category selection */}
      <AnimatePresence mode="wait">
        {!selectedCategory ? (
          <motion.div
            key="categories"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="space-y-6"
          >
            {!compact && <div className="text-center">
              <h2 className="text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">
                {t.title}
              </h2>
              <p className="mt-2 text-text-secondary">{t.subtitle}</p>
            </div>}

            <div className="grid gap-3 sm:grid-cols-3">
              {categoryOrder.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => selectCategory(cat)}
                  className="group flex flex-col items-start gap-3 rounded-2xl border border-border-subtle bg-bg-surface p-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-sm"
                >
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border ${categoryColors[cat]}`}
                  >
                    {categoryIcons[cat]}
                  </span>
                  <span>
                    <span className="block text-base font-semibold text-text-primary">
                      {t.categories[cat].title}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-text-secondary">
                      {t.categories[cat].description}
                    </span>
                  </span>
                  <span className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-accent transition-transform group-hover:translate-x-1">
                    {locale === "sv" ? "Välj" : "Select"}
                    <ArrowRight size={14} />
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between gap-4 rounded-xl border border-border-subtle bg-bg-elevated p-4">
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-lg border ${categoryColors[selectedCategory]}`}
                >
                  {categoryIcons[selectedCategory]}
                </span>
                <div>
                  <p className="text-xs text-text-muted">{t.selected}</p>
                  <p className="font-semibold text-text-primary">{t.categories[selectedCategory].title}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCategory(null)}
                className="flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent-dim"
              >
                <ArrowLeft size={14} />
                {t.changeType}
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField id={`${formId}-name`} label={t.common.name} required error={getErrorMessage("name")}>
                  <Input
                    id={`${formId}-name`}
                    autoComplete="name"
                    aria-invalid={errors.name ? "true" : undefined}
                    {...register("name")}
                    placeholder={t.common.namePlaceholder}
                    error={!!errors.name}
                  />
                </FormField>

                <FormField id={`${formId}-company`} label={t.common.company} error={undefined}>
                  <Input
                    id={`${formId}-company`}
                    autoComplete="organization"
                    {...register("company")}
                    placeholder={t.common.companyPlaceholder}
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
              </div>

              <AnimatePresence mode="wait">
                {selectedCategory === "buy" && (
                  <motion.div
                    key="buy"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <FormField
                      id={`${formId}-projectName`}
                      label={t.buy.projectName}
                      required
                      error={getErrorMessage("projectName")}
                    >
                      <Input
                        id={`${formId}-projectName`}
                        {...register("projectName")}
                        placeholder={t.buy.projectNamePlaceholder}
                        error={!!errors.projectName}
                      />
                    </FormField>
                  </motion.div>
                )}

                {selectedCategory === "rental" && (
                  <motion.div
                    key="rental"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="grid gap-4 sm:grid-cols-2"
                  >
                    <FormField
                      id={`${formId}-eventDate`}
                      label={t.rental.eventDate}
                      required
                      error={getErrorMessage("eventDate")}
                    >
                      <Input
                        id={`${formId}-eventDate`}
                        {...register("eventDate")}
                        placeholder={t.rental.eventDatePlaceholder}
                        error={!!errors.eventDate}
                      />
                    </FormField>

                    <FormField
                      id={`${formId}-location`}
                      label={t.rental.location}
                      required
                      error={getErrorMessage("location")}
                    >
                      <Input
                        id={`${formId}-location`}
                        {...register("location")}
                        placeholder={t.rental.locationPlaceholder}
                        error={!!errors.location}
                      />
                    </FormField>

                    <FormField
                      id={`${formId}-screenSize`}
                      label={t.rental.screenSize}
                      error={undefined}
                      className="sm:col-span-2"
                    >
                      <Input
                        id={`${formId}-screenSize`}
                        {...register("screenSize")}
                        placeholder={t.rental.screenSizePlaceholder}
                      />
                    </FormField>

                    <div className="sm:col-span-2">
                      <FileUpload
                        files={files}
                        onChange={setFiles}
                        label={t.rental.attachments}
                        description={t.dragDescription}
                        dragLabel={t.dragLabel}
                        dragHint={t.dragHint}
                      />
                    </div>
                  </motion.div>
                )}

                {selectedCategory === "service" && (
                  <motion.div
                    key="service"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        id={`${formId}-installationSite`}
                        label={t.service.installationSite}
                        required
                        error={getErrorMessage("installationSite")}
                      >
                        <Input
                          id={`${formId}-installationSite`}
                          {...register("installationSite")}
                          placeholder={t.service.installationSitePlaceholder}
                          error={!!errors.installationSite}
                        />
                      </FormField>

                      <FormField id={`${formId}-serialNumber`} label={t.service.serialNumber} error={undefined}>
                        <Input
                          id={`${formId}-serialNumber`}
                          {...register("serialNumber")}
                          placeholder={t.service.serialNumberPlaceholder}
                        />
                      </FormField>
                    </div>

                    <FileUpload
                      files={files}
                      onChange={setFiles}
                      label={t.service.attachments}
                      description={t.dragDescription}
                      dragLabel={t.dragLabel}
                      dragHint={t.dragHint}
                    />

                    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border-subtle bg-bg-elevated p-4">
                      <input
                        type="checkbox"
                        {...register("termsAccepted")}
                        className="mt-1 h-4 w-4 rounded border-border-strong text-accent focus:ring-accent"
                      />
                      <span className="text-sm text-text-secondary">{t.service.terms}</span>
                    </label>
                    {errors.termsAccepted && (
                      <p className="text-sm text-red-500">{t.service.termsRequired}</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <FormField
                id={`${formId}-description`}
                label={t.common.description}
                required
                error={getErrorMessage("description")}
              >
                <Textarea
                  id={`${formId}-description`}
                  rows={4}
                  aria-invalid={errors.description ? "true" : undefined}
                  {...register("description")}
                  placeholder={
                    selectedCategory === "buy"
                      ? t.buy.descriptionPlaceholder
                      : selectedCategory === "rental"
                        ? t.rental.descriptionPlaceholder
                        : t.service.descriptionPlaceholder
                  }
                  error={!!errors.description}
                />
              </FormField>

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

              <div className="flex flex-col gap-4 border-t border-border-subtle pt-6 sm:flex-row sm:items-center sm:justify-end">
                {!compact && <div className="space-y-1">
                  {t.trust.map((item) => (
                    <p key={item} className="flex items-start gap-2 text-xs text-text-muted">
                      <Check size={12} className="mt-0.5 shrink-0 text-accent" />
                      <span>{item}</span>
                    </p>
                  ))}
                </div>}
                <Button
                  type="submit"
                  size="large"
                  loading={isSubmitting}
                  icon={<ArrowRight size={18} />}
                  className="shrink-0"
                >
                  {isSubmitting
                    ? t.categories[selectedCategory].submitting
                    : t.categories[selectedCategory].cta}
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
