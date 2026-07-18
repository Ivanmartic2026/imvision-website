"use client";

import { useState, useCallback, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
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
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Locale } from "@/lib/i18n";

const MAX_TOTAL_SIZE = 4 * 1024 * 1024; // ~4 MB total (Vercel serverless body cap)
const MAX_FILES = 5;

const serviceSchema = z
  .object({
    name: z.string().min(1, "required"),
    phone: z.string().optional(),
    email: z.union([z.literal(""), z.string().email("invalid")]).optional(),
    project: z.string().optional(),
    description: z.string().min(10, "min"),
    honeypot: z.string().max(0, "spam").optional(),
  })
  .refine((data) => Boolean(data.phone?.trim()) || Boolean(data.email?.trim()), {
    message: "contact",
    path: ["phone"],
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

export function ServiceForm({ locale = "en" }: ServiceFormProps) {
  const isSv = locale === "sv";
  const termsHref = isSv ? "/sv/servicevillkor/" : "/terms/";
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [ticketNumber] = useState(() => generateTicketNumber());
  const [submittedAt, setSubmittedAt] = useState<{ date: string; time: string; iso: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = useMemo(
    () => ({
      eyebrow: isSv ? "Serviceärende" : "Service request",
      title: isSv ? "Rapportera ett serviceärende." : "Report a service issue.",
      subtitle: isSv
        ? "Beskriv problemet med några rader och bifoga gärna bilder eller video. Vi tar det vidare därifrån."
        : "Describe the issue in a few lines and feel free to attach images or video. We'll take it from there.",
      labels: {
        name: isSv ? "Namn" : "Name",
        phone: isSv ? "Telefon" : "Phone",
        email: isSv ? "E-post" : "Email",
        project: isSv ? "Projekt / Installation" : "Project / Installation",
        optional: isSv ? "(valfritt)" : "(optional)",
        description: isSv ? "Beskriv problemet" : "Describe the problem",
        submit: isSv ? "Skicka serviceärende" : "Submit service request",
      },
      placeholders: {
        name: isSv ? "Ert namn" : "Your name",
        phone: isSv ? "070-123 45 67" : "+46 70 123 45 67",
        email: isSv ? "namn@foretag.se" : "name@company.com",
        project: isSv ? "T.ex. anläggning, plats eller projektnamn" : "E.g. site, location, or project name",
        description: isSv
          ? "Beskriv vad som hänt. När började problemet? Är hela eller delar av skärmen påverkade? Bifoga gärna bilder eller video."
          : "Describe what happened. When did the problem start? Is all or part of the screen affected? Feel free to attach images or video.",
      },
      contactHint: isSv ? "Ange minst ett sätt vi kan nå er på." : "Enter at least one way to reach you.",
      fileDrop: isSv ? "Dra och släpp filer här" : "Drag and drop files here",
      fileSub: isSv
        ? "eller klicka för att välja · bilder, video eller dokument"
        : "or click to select · images, video, or documents",
      fileTypes: isSv ? "Max 5 filer, ~4 MB totalt." : "Max 5 files, ~4 MB total.",
      attachments: isSv ? "Bilder, video eller dokument" : "Images, video, or documents",
      success: {
        title: isSv ? "Tack — ditt serviceärende är skickat." : "Thank you — your service request has been sent.",
        body: isSv
          ? "Vi har tagit emot ditt ärende och återkommer så snart som möjligt."
          : "We've received your request and will get back to you as soon as possible.",
        urgent: isSv
          ? "Vid akut driftstopp rekommenderar vi att ni även ringer oss."
          : "For urgent downtime, we recommend calling us as well.",
        ticket: isSv ? "Ärendenummer" : "Ticket number",
        date: isSv ? "Datum" : "Date",
        time: isSv ? "Tid" : "Time",
      },
      errors: {
        required: isSv ? "Obligatoriskt fält" : "Required field",
        email: isSv ? "Ogiltig e-postadress" : "Invalid email address",
        contact: isSv ? "Ange telefon eller e-post" : "Enter a phone number or email",
        description: isSv ? "Beskriv problemet lite mer" : "Please describe the problem in a little more detail",
        fileCount: isSv ? "Max 5 filer tillåtna" : "Maximum 5 files allowed",
        fileSize: isSv ? "Filerna är för stora (max ~4 MB totalt)" : "Files are too large (max ~4 MB total)",
        submit: isSv
          ? "Något gick fel. Försök igen eller ring oss."
          : "Something went wrong. Please try again or call us.",
      },
    }),
    [isSv]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: { honeypot: "" },
  });

  const addFiles = useCallback(
    (incoming: FileList | null) => {
      if (!incoming) return;
      const incomingArr = Array.from(incoming);
      setFiles((prev) => {
        const merged = [...prev];
        for (const f of incomingArr) {
          if (!merged.some((m) => m.name === f.name && m.size === f.size)) merged.push(f);
        }
        if (merged.length > MAX_FILES) {
          setSubmitError(t.errors.fileCount);
          return prev;
        }
        if (merged.reduce((sum, f) => sum + f.size, 0) > MAX_TOTAL_SIZE) {
          setSubmitError(t.errors.fileSize);
          return prev;
        }
        setSubmitError(null);
        return merged;
      });
    },
    [t.errors.fileCount, t.errors.fileSize]
  );

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setSubmitError(null);
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

    const formData = new FormData();
    formData.append("formType", "service case");
    formData.append("ticketNumber", ticketNumber);
    formData.append("name", data.name);
    if (data.phone?.trim()) formData.append("phone", data.phone.trim());
    if (data.email?.trim()) formData.append("email", data.email.trim());
    if (data.project?.trim()) formData.append("project", data.project.trim());
    formData.append("description", data.description);

    files.forEach((file, index) => {
      formData.append(`attachment-${index}`, file);
    });

    try {
      const response = await fetch("/api/contact/", { method: "POST", body: formData });
      if (!response.ok) throw new Error("Submission failed");
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
    "min-h-14 w-full rounded-[16px_6px_16px_16px] border border-border-strong bg-background px-5 py-4 text-text-primary outline-none transition-all duration-[500ms] ease-[cubic-bezier(.22,.61,.36,1)] placeholder:text-text-muted focus:border-accent/70 focus:bg-bg-surface focus:shadow-[0_0_0_4px_rgba(145,169,161,.08)]";

  const labelClass = "mb-2 block text-sm font-medium text-text-primary";

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
            <p className="mt-4 text-lg text-text-secondary">{t.success.body}</p>
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
        <div className="mx-auto max-w-2xl">
          <div className="mb-10 lg:mb-12">
            <span className="eyebrow text-accent">{t.eyebrow}</span>
            <h2 id="service-form-title" className="heading-section mt-6">
              {t.title}
            </h2>
            <p className="mt-4 text-lg text-text-secondary">{t.subtitle}</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-7" noValidate>
            {/* Honeypot — hidden from assistive tech; bots still fill it. */}
            <input
              type="text"
              {...register("honeypot")}
              className="sr-only"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              aria-label="Leave this field empty"
            />

            <div>
              <label htmlFor="name" className={labelClass}>{t.labels.name}</label>
              <input id="name" {...register("name")} className={fieldClass} placeholder={t.placeholders.name} autoComplete="name" />
              <ErrorMessage error={errors.name} message={t.errors.required} />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="phone" className={labelClass}>{t.labels.phone}</label>
                <input id="phone" type="tel" {...register("phone")} className={fieldClass} placeholder={t.placeholders.phone} autoComplete="tel" />
                <ErrorMessage error={errors.phone} message={t.errors.contact} />
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>{t.labels.email}</label>
                <input id="email" type="email" {...register("email")} className={fieldClass} placeholder={t.placeholders.email} autoComplete="email" />
                <ErrorMessage error={errors.email} message={t.errors.email} />
              </div>
            </div>
            <p className="-mt-3 text-xs text-text-muted">{t.contactHint}</p>

            <div>
              <label htmlFor="project" className={labelClass}>
                {t.labels.project} <span className="font-normal text-text-muted">{t.labels.optional}</span>
              </label>
              <input id="project" {...register("project")} className={fieldClass} placeholder={t.placeholders.project} />
            </div>

            <div>
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

            <div>
              <label className={labelClass}>
                {t.attachments} <span className="font-normal text-text-muted">{t.labels.optional}</span>
              </label>
              <label
                htmlFor="service-file-input"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="flex cursor-pointer flex-col items-center rounded-[16px_6px_16px_16px] border border-dashed border-border-strong bg-background px-6 py-10 text-center transition-all duration-500 hover:border-accent/50 hover:bg-white/[.02] focus-within:border-accent focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 focus-within:ring-offset-background"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <UploadCloud size={22} aria-hidden="true" />
                </span>
                <p className="mt-3 text-sm font-medium text-text-primary">{t.fileDrop}</p>
                <p className="mt-1 text-xs text-text-muted">{t.fileSub}</p>
                <p className="mt-1 text-xs text-text-muted">{t.fileTypes}</p>
                <input
                  id="service-file-input"
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*,video/*,.pdf,.doc,.docx,.txt,.zip"
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
                    className="mt-4 space-y-2"
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
                          <span className="shrink-0 text-xs text-text-muted">{formatFileSize(file.size)}</span>
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
            </div>

            {submitError && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3 rounded-[12px_4px_12px_12px] border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
              >
                <AlertTriangle size={18} className="mt-0.5 shrink-0" />
                {submitError}
              </motion.div>
            )}

            <div className="border-t border-border-subtle pt-6">
              <p className="text-xs leading-relaxed text-text-muted">
                {isSv ? "Genom att skicka ärendet godkänner du våra " : "By submitting, you accept our "}
                <Link href={termsHref} className="text-accent underline underline-offset-2 hover:text-accent-soft">
                  {isSv ? "servicevillkor" : "service terms"}
                </Link>
                {isSv
                  ? ". Ärenden som inte omfattas av garanti eller serviceavtal kan debiteras enligt gällande prislista."
                  : ". Requests not covered by warranty or service agreement may be charged according to the current price list."}
              </p>
              <div className="mt-6">
                <Button type="submit" size="large" loading={isSubmitting} icon={<ArrowRight size={18} />}>
                  {t.labels.submit}
                </Button>
              </div>
            </div>
          </form>
        </div>
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
