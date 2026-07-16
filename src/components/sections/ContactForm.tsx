"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Locale } from "@/lib/i18n";

const projectTypes = [
  { value: "permanent", label: "Buy LED", labelSv: "Köpa LED" },
  { value: "rental", label: "Rent LED", labelSv: "Hyra LED" },
  { value: "service", label: "Service", labelSv: "Service" },
] as const;

const contactSchema = z.object({
  projectType: z.enum(["permanent", "rental", "service"]),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Please tell us a little more about the project"),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  locale?: Locale;
  compact?: boolean;
  defaultProjectType?: "permanent" | "rental" | "service";
}

export function ContactForm({
  locale = "en",
  compact = false,
  defaultProjectType = "permanent",
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { projectType: defaultProjectType },
  });

  const onSubmit = (data: ContactFormData) => {
    setIsSubmitting(true);

    // Simulate a brief submission moment for the loader/check animation,
    // then open the mailto link as before.
    setTimeout(() => {
      const selectedType = projectTypes.find((type) => type.value === data.projectType);
      const typeLabel = locale === "sv" ? selectedType?.labelSv : selectedType?.label;
      const projectDetails = [
        `${locale === "sv" ? "Projekttyp" : "Project type"}: ${typeLabel}`,
        `${locale === "sv" ? "Namn" : "Name"}: ${data.name}`,
        `Email: ${data.email}`,
        "",
        locale === "sv" ? "Förfrågan:" : "Enquiry:",
        data.message,
      ].filter(Boolean);

      const subject = encodeURIComponent(`${typeLabel} enquiry from ${data.name}`);
      const body = encodeURIComponent(projectDetails.join("\n"));
      window.location.assign(`mailto:sales@imvision.se?subject=${subject}&body=${body}`);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 800);
  };

  const fieldClass =
    "min-h-14 w-full rounded-[16px_6px_16px_16px] border border-border-subtle bg-background px-5 py-4 text-text-primary outline-none transition-all duration-[500ms] ease-[cubic-bezier(.22,.61,.36,1)] placeholder:text-text-muted focus:border-accent/70 focus:bg-bg-surface focus:px-6 focus:py-5 focus:shadow-[0_0_0_4px_rgba(145,169,161,.08)]";

  const labelClass = "mb-2 block text-sm font-medium text-text-primary transition-colors duration-300";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={compact ? "space-y-6" : "space-y-8"}>
      <fieldset>
        <legend className="eyebrow text-accent">
          {locale === "sv" ? "Vad gäller det?" : "How can we help?"}
        </legend>
        <div className="mt-5 grid gap-2 sm:grid-cols-3">
          {projectTypes.map((type) => (
            <label key={type.value} className="cursor-pointer">
              <input
                type="radio"
                value={type.value}
                {...register("projectType")}
                className="peer sr-only"
              />
              <span className="flex min-h-14 items-center justify-between rounded-[16px_6px_16px_16px] border border-border-subtle bg-background px-5 text-sm font-medium text-text-secondary transition-all duration-[500ms] ease-[cubic-bezier(.22,.61,.36,1)] hover:bg-white/[.025] hover:translate-y-[-1px] peer-checked:border-accent/70 peer-checked:bg-accent/10 peer-checked:text-text-primary peer-focus-visible:ring-2 peer-focus-visible:ring-accent">
                {locale === "sv" ? type.labelSv : type.label}
                <span className="h-2 w-2 rounded-full border border-text-muted transition-all duration-300 peer-checked:border-accent peer-checked:bg-accent" />
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className={`grid gap-5 ${compact ? "" : "sm:grid-cols-2"}`}>
        <div>
          <label htmlFor={compact ? "sales-name" : "name"} className={labelClass}>
            {locale === "sv" ? "Namn" : "Name"}
          </label>
          <input
            id={compact ? "sales-name" : "name"}
            autoComplete="name"
            {...register("name")}
            className={fieldClass}
            placeholder={locale === "sv" ? "Ert namn" : "Your name"}
          />
          <AnimatePresence>
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="mt-2 text-sm text-red-400"
              >
                {locale === "sv" ? "Ange ert namn." : errors.name.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <div>
          <label htmlFor={compact ? "sales-email" : "email"} className={labelClass}>
            {locale === "sv" ? "E-postadress" : "Work email"}
          </label>
          <input
            id={compact ? "sales-email" : "email"}
            type="email"
            autoComplete="email"
            {...register("email")}
            className={fieldClass}
            placeholder="name@company.com"
          />
          <AnimatePresence>
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="mt-2 text-sm text-red-400"
              >
                {locale === "sv" ? "Ange en giltig e-postadress." : errors.email.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div>
        <label htmlFor={compact ? "sales-message" : "message"} className={labelClass}>
          {locale === "sv" ? "Berätta kort" : "Tell us briefly"}
        </label>
        <textarea
          id={compact ? "sales-message" : "message"}
          rows={compact ? 3 : 5}
          {...register("message")}
          className={fieldClass}
          placeholder={locale === "sv" ? "Vad behöver ni hjälp med?" : "What do you need help with?"}
        />
        <AnimatePresence>
          {errors.message && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="mt-2 text-sm text-red-400"
            >
              {locale === "sv" ? "Berätta lite mer om projektet." : errors.message.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div
        className={`flex flex-col gap-4 border-t border-border-subtle pt-7 ${
          compact ? "" : "sm:flex-row sm:items-center sm:justify-between"
        }`}
      >
        <p className="max-w-sm text-xs leading-relaxed text-text-muted">
          {locale === "sv" ? "Vi återkommer så snart vi kan." : "We'll get back to you as soon as possible."}
        </p>
        <Button type="submit" size="large" loading={isSubmitting} icon={<ArrowRight size={18} />}>
          {locale === "sv" ? "Fortsätt till e-post" : "Continue to email"}
        </Button>
      </div>

      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
            role="status"
            className="flex items-start gap-3 rounded-[12px_4px_12px_12px] border border-accent/25 bg-accent/10 p-4 text-sm text-text-secondary"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 15 }}
              className="mt-0.5 shrink-0"
            >
              <Check size={19} className="text-accent" />
            </motion.span>
            {locale === "sv"
              ? "Ert e-postprogram har öppnats med en färdig förfrågan."
              : "Your email app has opened with a prepared enquiry."}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
