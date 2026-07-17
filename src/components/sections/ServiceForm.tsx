"use client";

import { useState, useCallback, useMemo, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "motion/react";
import {
  Check,
  UploadCloud,
  X,
  FileText,
  Image as ImageIcon,
  Film,
  AlertTriangle,
  Info,
  Phone,
  Mail,
  Monitor,
  User,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Locale } from "@/lib/i18n";

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB per file
const MAX_FILES = 5;

const issueTypes = [
  { value: "driftstopp", label: "Driftstopp (Akut)", labelEn: "Downtime (Urgent)" },
  { value: "fel-led", label: "Fel på LED-skärm", labelEn: "LED screen fault" },
  { value: "mjukvara-cms", label: "Mjukvara / CMS", labelEn: "Software / CMS" },
  { value: "bildproblem", label: "Bildproblem", labelEn: "Image problem" },
  { value: "natverk", label: "Nätverk / Kommunikation", labelEn: "Network / Communication" },
  { value: "mekaniskt", label: "Mekaniskt fel", labelEn: "Mechanical fault" },
  { value: "strom", label: "Strömproblem", labelEn: "Power problem" },
  { value: "underhall", label: "Service / Underhåll", labelEn: "Service / Maintenance" },
  { value: "garanti", label: "Garantifråga", labelEn: "Warranty question" },
  { value: "annat", label: "Annat", labelEn: "Other" },
] as const;

const priorities = [
  {
    value: "kritisk",
    label: "Kritisk",
    labelEn: "Critical",
    description: "Skärmen fungerar inte alls",
    descriptionEn: "The screen is not working at all",
    color: "#ef4444",
  },
  {
    value: "hog",
    label: "Hög",
    labelEn: "High",
    description: "Delar av systemet fungerar inte",
    descriptionEn: "Parts of the system are not working",
    color: "#f97316",
  },
  {
    value: "normal",
    label: "Normal",
    labelEn: "Normal",
    description: "Problem finns men verksamheten fungerar",
    descriptionEn: "Issue exists but operations continue",
    color: "#3b82f6",
  },
  {
    value: "lag",
    label: "Låg",
    labelEn: "Low",
    description: "Fråga eller mindre fel",
    descriptionEn: "Question or minor issue",
    color: "#22c55e",
  },
] as const;

const contactOptions = [
  { value: "ring", label: "Ring mig", labelEn: "Call me", icon: Phone },
  { value: "maila", label: "Maila mig", labelEn: "Email me", icon: Mail },
  { value: "fjarrsupport", label: "Fjärrsupport fungerar", labelEn: "Remote support works", icon: Monitor },
  { value: "tekniker", label: "Tekniker behöver komma ut", labelEn: "Technician needs to visit", icon: User },
] as const;

const serviceSchema = z.object({
  company: z.string().min(1, "required"),
  name: z.string().min(1, "required"),
  phone: z.string().min(1, "required"),
  email: z.string().email("invalid"),
  project: z.string().optional(),
  address: z.string().optional(),
  issueType: z.enum(issueTypes.map((i) => i.value) as [string, ...string[]]),
  priority: z.enum(priorities.map((p) => p.value) as [string, ...string[]]),
  description: z.string().min(10, "min"),
  contactMethods: z.array(z.string()).min(1, "min"),
  termsAccepted: z.boolean().refine((val) => val === true, "required"),
  honeypot: z.string().max(0, "spam").optional(),
});

type ServiceFormData = z.infer<typeof serviceSchema>;

interface ServiceFormProps {
  locale?: Locale;
}

function generateTicketNumber() {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 1_000_000)
    .toString()
    .padStart(6, "0");
  return `IM-${year}-${random}`;
}

function formatDateTime(locale: Locale) {
  const now = new Date();
  const date = now.toLocaleDateString(locale === "sv" ? "sv-SE" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const time = now.toLocaleTimeString(locale === "sv" ? "sv-SE" : "en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return { date, time, iso: now.toISOString() };
}

function getBrowserInfo() {
  if (typeof navigator === "undefined") return { browser: "", os: "" };
  return {
    browser: navigator.userAgent,
    os: navigator.platform,
  };
}

export function ServiceForm({ locale = "en" }: ServiceFormProps) {
  const isSv = locale === "sv";
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [capturedServerSide, setCapturedServerSide] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [ticketNumber] = useState(() => generateTicketNumber());
  const [submittedAt, setSubmittedAt] = useState<{ date: string; time: string; iso: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = useMemo(
    () => ({
      title: isSv ? "Skapa serviceärende" : "Create service ticket",
      subtitle: isSv
        ? "Få hjälp inom minuter. Beskriv felet så tar vårt serviceteam över."
        : "Get help within minutes. Describe the issue and our service team will take over.",
      sections: {
        contact: isSv ? "1. Kontaktuppgifter" : "1. Contact details",
        issueType: isSv ? "2. Typ av ärende" : "2. Type of issue",
        priority: isSv ? "3. Prioritet" : "3. Priority",
        description: isSv ? "4. Beskriv felet" : "4. Describe the issue",
        attachments: isSv ? "5. Bilagor" : "5. Attachments",
        contactPreference: isSv ? "6. Önskad kontakt" : "6. Preferred contact",
        info: isSv ? "7. Viktig information" : "7. Important information",
      },
      labels: {
        company: isSv ? "Företag *" : "Company *",
        name: isSv ? "Namn *" : "Name *",
        phone: isSv ? "Telefon *" : "Phone *",
        email: isSv ? "E-post *" : "Email *",
        project: isSv ? "Projekt / Installation" : "Project / Installation",
        address: isSv ? "Adress (om service på plats behövs)" : "Address (if on-site service is needed)",
        description: isSv ? "Beskriv problemet" : "Describe the problem",
        terms: isSv
          ? "Jag har läst och accepterar IM Visions servicevillkor och godkänner att felsökning och eventuella kostnader kan debiteras om ärendet inte omfattas av garanti eller serviceavtal."
          : "I have read and accept IM Vision's service terms and agree that troubleshooting and any costs may be charged if the issue is not covered by warranty or service agreement.",
        submit: isSv ? "Skicka ärende" : "Submit ticket",
      },
      placeholders: {
        company: isSv ? "Företagsnamn" : "Company name",
        name: isSv ? "Ert namn" : "Your name",
        phone: isSv ? "Telefonnummer" : "Phone number",
        email: isSv ? "E-postadress" : "Email address",
        project: isSv ? "Projektnamn eller installations-id" : "Project name or installation ID",
        address: isSv ? "Gatuadress, postnummer, ort" : "Street address, ZIP, city",
        description: isSv
          ? "Berätta vad som har hänt.\nNär uppstod felet?\nÄr felet konstant eller intermittent?\nHar något ändrats innan felet uppstod?\nFinns felkod?"
          : "Tell us what happened.\nWhen did the issue start?\nIs it constant or intermittent?\nHas anything changed before the issue occurred?\nIs there an error code?",
      },
      fileDrop: isSv
        ? "Dra filer hit eller klicka för att ladda upp"
        : "Drag files here or click to upload",
      fileTypes: isSv
        ? "Bilder, filmer, PDF, loggfiler, zip. Max 5 filer, 25 MB per fil."
        : "Images, videos, PDF, log files, zip. Max 5 files, 25 MB each.",
      infoCard: {
        title: isSv ? "Viktig information innan du skickar ärendet" : "Important information before submitting",
        intro: isSv
          ? "IM Vision påbörjar felsökning så snart ärendet har registrerats."
          : "IM Vision begins troubleshooting as soon as the ticket is registered.",
        billing: isSv
          ? "Om felet inte omfattas av garanti eller serviceavtal debiteras arbete enligt gällande prislista."
          : "If the issue is not covered by warranty or service agreement, work will be charged according to the current price list.",
        rate: isSv ? "Nuvarande timdebitering för tekniker är:" : "Current technician hourly rate:",
        price: "795 SEK/timme exklusive moms",
        costs: isSv
          ? "Eventuella kostnader för resa, material, lift, logi, frakt och externa underentreprenörer debiteras enligt offert eller gällande prislista."
          : "Any costs for travel, materials, lift, lodging, freight, and external subcontractors will be charged according to quote or current price list.",
        coverage: isSv
          ? "Om felet omfattas av garanti eller giltigt serviceavtal sker naturligtvis ingen debitering enligt avtal."
          : "If the issue is covered by warranty or valid service agreement, no charges will apply as per agreement.",
      },
      success: {
        title: isSv ? "Tack — ditt serviceärende är på väg." : "Thank you — your service request is on its way.",
        body: isSv
          ? "Vi har tagit emot ditt ärende och behandlar det så snart som möjligt."
          : "We've received your request and will process it as soon as possible.",
        bodyMailto: isSv
          ? "Ditt e-postprogram öppnades med ett färdigt ärende — tryck skicka för att nå vårt serviceteam. Spara ärendenumret nedan."
          : "Your email client opened with a prepared ticket — press send to reach our service team. Keep the ticket number below for reference.",
        urgent: isSv
          ? "Vid akuta driftstopp rekommenderar vi att ni även kontaktar oss via telefon."
          : "For urgent downtime, we recommend that you also contact us by phone.",
        ticket: isSv ? "Ärendenummer" : "Ticket number",
        date: isSv ? "Datum" : "Date",
        time: isSv ? "Tid" : "Time",
      },
      errors: {
        required: isSv ? "Obligatoriskt fält" : "Required field",
        email: isSv ? "Ogiltig e-postadress" : "Invalid email address",
        description: isSv ? "Beskriv problemet mer utförligt" : "Please describe the issue in more detail",
        contactMethod: isSv ? "Välj minst ett sätt att kontakta dig på" : "Select at least one contact method",
        terms: isSv ? "Godkänn servicevillkoren för att skicka ärendet" : "Accept the service terms to submit the ticket",
        fileSize: isSv ? "Filen är för stor (max 25 MB)" : "File is too large (max 25 MB)",
        fileCount: isSv ? "Max 5 filer tillåtna" : "Maximum 5 files allowed",
        submit: isSv ? "Något gick fel. Försök igen eller kontakta oss på telefon." : "Something went wrong. Please try again or contact us by phone.",
      },
    }),
    [isSv]
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      contactMethods: [],
      termsAccepted: false,
      honeypot: "",
    },
  });

  const validateFiles = useCallback(
    (newFiles: File[]) => {
      if (files.length + newFiles.length > MAX_FILES) {
        setSubmitError(t.errors.fileCount);
        return false;
      }
      const oversized = newFiles.find((f) => f.size > MAX_FILE_SIZE);
      if (oversized) {
        setSubmitError(t.errors.fileSize);
        return false;
      }
      return true;
    },
    [files.length, t.errors.fileCount, t.errors.fileSize]
  );

  const addFiles = useCallback(
    (newFiles: FileList | null) => {
      if (!newFiles) return;
      const fileArray = Array.from(newFiles);
      if (!validateFiles(fileArray)) return;
      setFiles((prev) => [...prev, ...fileArray]);
      setSubmitError(null);
    },
    [validateFiles]
  );

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      addFiles(e.dataTransfer.files);
    },
    [addFiles]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return <ImageIcon size={18} />;
    if (type.startsWith("video/")) return <Film size={18} />;
    return <FileText size={18} />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const onSubmit = async (data: ServiceFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    const dateTime = formatDateTime(locale);
    setSubmittedAt(dateTime);

    const issueLabel = issueTypes.find((i) => i.value === data.issueType)?.[isSv ? "label" : "labelEn"];
    const priorityLabel = priorities.find((p) => p.value === data.priority)?.[isSv ? "label" : "labelEn"];

    const formData = new FormData();
    formData.append("formType", "service case");
    formData.append("ticketNumber", ticketNumber);
    formData.append("company", data.company);
    formData.append("name", data.name);
    formData.append("phone", data.phone);
    formData.append("email", data.email);
    formData.append("project", data.project || "");
    formData.append("address", data.address || "");
    formData.append("issueType", issueLabel || data.issueType);
    formData.append("priority", priorityLabel || data.priority);
    formData.append("description", data.description);
    formData.append("contactMethods", data.contactMethods.join(", "));
    formData.append("termsAccepted", data.termsAccepted ? "Yes" : "No");
    formData.append("browser", getBrowserInfo().browser);
    formData.append("os", getBrowserInfo().os);

    files.forEach((file, index) => {
      formData.append(`attachment-${index}`, file);
    });

    try {
      const response = await fetch("/api/contact/", { method: "POST", body: formData });
      if (!response.ok) throw new Error("Submission failed");
      setCapturedServerSide(true);
      setIsSuccess(true);
      reset();
      setFiles([]);
    } catch {
      setSubmitError(t.errors.submit);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass =
    "min-h-14 w-full rounded-[16px_6px_16px_16px] border border-border-strong bg-background px-5 py-4 text-text-primary outline-none transition-all duration-[500ms] ease-[cubic-bezier(.22,.61,.36,1)] placeholder:text-text-muted focus:border-accent/70 focus:bg-bg-surface focus:px-6 focus:shadow-[0_0_0_4px_rgba(145,169,161,.08)]";

  const labelClass = "mb-2 block text-sm font-medium text-text-primary";

  const sectionClass = "rounded-[24px_6px_24px_24px] border border-border-subtle bg-bg-elevated/40 p-6 backdrop-blur-sm sm:p-8 lg:p-10";

  if (isSuccess) {
    return (
      <section className="section section-space bg-background" aria-labelledby="service-success-title">
        <div className="section-inner">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
            className="mx-auto max-w-2xl text-center"
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent/15 text-accent">
              <Check size={36} strokeWidth={1.5} />
            </div>
            <h2 id="service-success-title" className="heading-section mt-8">
              {t.success.title}
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              {capturedServerSide ? t.success.body : t.success.bodyMailto}
            </p>
            <p className="mt-6 text-text-secondary">{t.success.urgent}</p>

            <div className="mt-10 grid gap-4 rounded-[24px_6px_24px_24px] border border-border-subtle bg-bg-elevated p-6 text-left sm:grid-cols-3 sm:p-8">
              <div>
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-accent-dim">{t.success.ticket}</span>
                <p className="mt-2 text-lg font-medium tracking-[-0.02em] text-text-primary">{ticketNumber}</p>
              </div>
              <div>
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-accent-dim">{t.success.date}</span>
                <p className="mt-2 text-lg font-medium tracking-[-0.02em] text-text-primary">{submittedAt?.date}</p>
              </div>
              <div>
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-accent-dim">{t.success.time}</span>
                <p className="mt-2 text-lg font-medium tracking-[-0.02em] text-text-primary">{submittedAt?.time}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="section section-space bg-background" aria-labelledby="service-form-title">
      <div className="section-inner">
        <div className="mb-12 max-w-3xl lg:mb-16">
          <span className="eyebrow text-accent">{isSv ? "Support" : "Support"}</span>
          <h2 id="service-form-title" className="heading-section mt-6">
            {t.title}
          </h2>
          <p className="mt-4 text-lg text-text-secondary">{t.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 lg:space-y-8" noValidate>
          {/* Honeypot — hidden from assistive tech (aria-hidden) so it stays out of
              the a11y tree and the label check; bots still fill it. */}
          <input
            type="text"
            {...register("honeypot")}
            className="sr-only"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            aria-label="Leave this field empty"
          />

          {/* Section 1: Contact details */}
          <fieldset className={sectionClass}>
            <legend className="text-xl font-medium tracking-[-0.025em] text-text-primary">{t.sections.contact}</legend>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="company" className={labelClass}>{t.labels.company}</label>
                <input id="company" {...register("company")} className={fieldClass} placeholder={t.placeholders.company} autoComplete="organization" />
                <ErrorMessage error={errors.company} message={t.errors.required} />
              </div>
              <div>
                <label htmlFor="name" className={labelClass}>{t.labels.name}</label>
                <input id="name" {...register("name")} className={fieldClass} placeholder={t.placeholders.name} autoComplete="name" />
                <ErrorMessage error={errors.name} message={t.errors.required} />
              </div>
              <div>
                <label htmlFor="phone" className={labelClass}>{t.labels.phone}</label>
                <input id="phone" type="tel" {...register("phone")} className={fieldClass} placeholder={t.placeholders.phone} autoComplete="tel" />
                <ErrorMessage error={errors.phone} message={t.errors.required} />
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>{t.labels.email}</label>
                <input id="email" type="email" {...register("email")} className={fieldClass} placeholder={t.placeholders.email} autoComplete="email" />
                <ErrorMessage error={errors.email} message={t.errors.email} />
              </div>
              <div>
                <label htmlFor="project" className={labelClass}>{t.labels.project}</label>
                <input id="project" {...register("project")} className={fieldClass} placeholder={t.placeholders.project} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="address" className={labelClass}>{t.labels.address}</label>
                <input id="address" {...register("address")} className={fieldClass} placeholder={t.placeholders.address} autoComplete="street-address" />
              </div>
            </div>
          </fieldset>

          {/* Section 2: Issue type */}
          <fieldset className={sectionClass}>
            <legend className="text-xl font-medium tracking-[-0.025em] text-text-primary">{t.sections.issueType}</legend>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {issueTypes.map((issue) => (
                <label key={issue.value} className="cursor-pointer">
                  <input type="radio" value={issue.value} {...register("issueType")} className="peer sr-only" />
                  <span className="flex min-h-14 items-center gap-3 rounded-[16px_6px_16px_16px] border border-border-subtle bg-background px-5 text-sm font-medium text-text-secondary transition-all duration-[500ms] ease-[cubic-bezier(.22,.61,.36,1)] hover:bg-white/[.025] hover:translate-y-[-1px] peer-checked:border-accent/70 peer-checked:bg-accent/10 peer-checked:text-text-primary peer-focus-visible:ring-2 peer-focus-visible:ring-accent">
                    <span className="h-2 w-2 shrink-0 rounded-full border border-text-muted transition-all duration-300 peer-checked:border-accent peer-checked:bg-accent" />
                    {isSv ? issue.label : issue.labelEn}
                  </span>
                </label>
              ))}
            </div>
            <ErrorMessage error={errors.issueType} message={t.errors.required} />
          </fieldset>

          {/* Section 3: Priority */}
          <fieldset className={sectionClass}>
            <legend className="text-xl font-medium tracking-[-0.025em] text-text-primary">{t.sections.priority}</legend>
            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {priorities.map((priority) => (
                    <label key={priority.value} className="cursor-pointer">
                      <input
                        type="radio"
                        value={priority.value}
                        checked={field.value === priority.value}
                        onChange={() => field.onChange(priority.value)}
                        className="peer sr-only"
                      />
                      <span
                        className="flex h-full flex-col rounded-[16px_6px_16px_16px] border border-border-subtle bg-background p-5 transition-all duration-[500ms] ease-[cubic-bezier(.22,.61,.36,1)] hover:bg-white/[.025] peer-checked:scale-[1.02] peer-checked:border-white/20 peer-checked:bg-white/[.04] peer-focus-visible:ring-2 peer-focus-visible:ring-accent"
                        style={{ boxShadow: field.value === priority.value ? `0 0 0 1px ${priority.color}40, 0 12px 40px ${priority.color}15` : undefined }}
                      >
                        <span className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: priority.color }} />
                          <span className="text-sm font-semibold text-text-primary">{isSv ? priority.label : priority.labelEn}</span>
                        </span>
                        <span className="mt-2 text-xs leading-relaxed text-text-secondary">{isSv ? priority.description : priority.descriptionEn}</span>
                      </span>
                    </label>
                  ))}
                </div>
              )}
            />
            <ErrorMessage error={errors.priority} message={t.errors.required} />
          </fieldset>

          {/* Section 4: Description */}
          <fieldset className={sectionClass}>
            <legend className="text-xl font-medium tracking-[-0.025em] text-text-primary">{t.sections.description}</legend>
            <div className="mt-6">
              <label htmlFor="description" className={labelClass}>{t.labels.description}</label>
              <textarea
                id="description"
                {...register("description")}
                rows={6}
                className={`${fieldClass} resize-none`}
                placeholder={t.placeholders.description}
              />
              <ErrorMessage error={errors.description} message={t.errors.description} />
            </div>
          </fieldset>

          {/* Section 5: Attachments */}
          <fieldset className={sectionClass}>
            <legend className="text-xl font-medium tracking-[-0.025em] text-text-primary">{t.sections.attachments}</legend>
            {/* Label + sr-only (not hidden) input = pointer AND keyboard operable.
                focus-within surfaces the keyboard focus ring; drag/drop stays on the label. */}
            <label
              htmlFor="service-file-input"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="mt-6 flex cursor-pointer flex-col items-center rounded-[16px_6px_16px_16px] border border-dashed border-border-strong bg-background px-6 py-10 text-center transition-all duration-500 hover:border-accent/50 hover:bg-white/[.02] focus-within:border-accent focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 focus-within:ring-offset-background"
            >
              <UploadCloud size={32} className="text-accent" aria-hidden="true" />
              <p className="mt-3 text-sm font-medium text-text-primary">{t.fileDrop}</p>
              <p className="mt-1 text-xs text-text-muted">{t.fileTypes}</p>
              <input
                id="service-file-input"
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,video/*,.pdf,.log,.txt,.zip"
                className="sr-only"
                onChange={(e) => addFiles(e.target.files)}
              />
            </label>
            <AnimatePresence>
              {files.length > 0 && (
                <motion.ul
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-5 space-y-2"
                >
                  {files.map((file, index) => (
                    <motion.li
                      key={`${file.name}-${index}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="flex items-center justify-between rounded-[12px_4px_12px_12px] border border-border-subtle bg-background px-4 py-3"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <span className="text-accent">{getFileIcon(file.type)}</span>
                        <span className="truncate text-sm text-text-primary">{file.name}</span>
                        <span className="text-xs text-text-muted">{formatFileSize(file.size)}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="ml-3 rounded-full p-1 text-text-muted transition-colors hover:bg-white/[.06] hover:text-text-primary"
                        aria-label={isSv ? `Ta bort ${file.name}` : `Remove ${file.name}`}
                      >
                        <X size={16} />
                      </button>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </fieldset>

          {/* Section 6: Preferred contact */}
          <fieldset className={sectionClass}>
            <legend className="text-xl font-medium tracking-[-0.025em] text-text-primary">{t.sections.contactPreference}</legend>
            <Controller
              name="contactMethods"
              control={control}
              render={({ field }) => (
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {contactOptions.map((option) => {
                    const Icon = option.icon;
                    const checked = field.value.includes(option.value);
                    return (
                      <label key={option.value} className="cursor-pointer">
                        <input
                          type="checkbox"
                          value={option.value}
                          checked={checked}
                          onChange={(e) => {
                            const next = e.target.checked
                              ? [...field.value, option.value]
                              : field.value.filter((v) => v !== option.value);
                            field.onChange(next);
                          }}
                          className="peer sr-only"
                        />
                        <span className="flex min-h-14 items-center gap-3 rounded-[16px_6px_16px_16px] border border-border-subtle bg-background px-5 text-sm font-medium text-text-secondary transition-all duration-[500ms] ease-[cubic-bezier(.22,.61,.36,1)] hover:bg-white/[.025] peer-checked:border-accent/70 peer-checked:bg-accent/10 peer-checked:text-text-primary peer-focus-visible:ring-2 peer-focus-visible:ring-accent">
                          <Icon size={18} className="text-text-muted transition-colors peer-checked:text-accent" />
                          {isSv ? option.label : option.labelEn}
                          <span className="ml-auto h-2 w-2 rounded-full border border-text-muted transition-all peer-checked:border-accent peer-checked:bg-accent" />
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            />
            <ErrorMessage error={errors.contactMethods} message={t.errors.contactMethod} />
          </fieldset>

          {/* Section 7: Info card */}
          <div className="rounded-[24px_6px_24px_24px] border border-accent/20 bg-accent/5 p-6 backdrop-blur-sm sm:p-8">
            <div className="flex items-start gap-4">
              <Info size={22} className="mt-0.5 shrink-0 text-accent" />
              <div>
                <h3 className="text-lg font-medium text-text-primary">{t.infoCard.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{t.infoCard.intro}</p>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">{t.infoCard.billing}</p>
                <p className="mt-4 text-sm font-medium text-text-primary">{t.infoCard.rate}</p>
                <p className="mt-1 text-2xl font-medium tracking-[-0.03em] text-accent">{t.infoCard.price}</p>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">{t.infoCard.costs}</p>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">{t.infoCard.coverage}</p>
              </div>
            </div>
          </div>

          {/* Terms and submit */}
          <div className={sectionClass}>
            <label className="flex cursor-pointer items-start gap-4">
              <input type="checkbox" {...register("termsAccepted")} className="peer sr-only" />
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-border-strong bg-background transition-all duration-300 peer-checked:border-accent peer-checked:bg-accent peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background">
                <Check size={12} className="text-background opacity-0 peer-checked:opacity-100" />
              </span>
              <span className="text-sm leading-relaxed text-text-secondary">{t.labels.terms}</span>
            </label>
            <ErrorMessage error={errors.termsAccepted} message={t.errors.terms} />

            {submitError && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 flex items-start gap-3 rounded-[12px_4px_12px_12px] border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
              >
                <AlertTriangle size={18} className="mt-0.5 shrink-0" />
                {submitError}
              </motion.div>
            )}

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button type="submit" size="large" loading={isSubmitting} icon={<ArrowRight size={18} />}>
                {t.labels.submit}
              </Button>
              <p className="text-xs text-text-muted">
                {isSv
                  ? "Genom att skicka godkänner du att vi sparar uppgifterna för ärendehantering."
                  : "By submitting, you agree that we store the information for ticket handling."}
              </p>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

function ErrorMessage({ error, message }: { error?: { message?: string }; message: string }) {
  return (
    <AnimatePresence>
      {error && (
        <motion.p
          role="alert"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          className="mt-2 flex items-center gap-1.5 text-xs text-red-300"
        >
          <AlertTriangle size={12} aria-hidden="true" />
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
