import { NextRequest, NextResponse } from "next/server";
import { sendLeadEmail, type LeadAttachment } from "@/lib/email";

// Node runtime (Buffer + Resend). Always dynamic (POST handler).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Vercel serverless request bodies are capped (~4.5 MB). Guard total attachments.
const MAX_TOTAL_ATTACHMENT_BYTES = 4 * 1024 * 1024;

// Fields that must never appear in the email.
const SKIP_FIELDS = new Set(["honeypot", "company-url", "recipient", "locale"]);

// Human labels for known field keys (used by both ContactForm and ServiceForm).
const LABELS: Record<string, string> = {
  category: "Enquiry type",
  formType: "Enquiry type",
  issueType: "Issue type",
  priority: "Priority",
  name: "Name",
  phone: "Phone",
  email: "Email",
  company: "Company",
  eventDate: "Event date",
  location: "Location",
  installation: "Product / installation",
  project: "Product / installation",
  address: "Address",
  contactMethods: "Preferred contact",
  message: "Message",
  description: "Description",
  ticketNumber: "Ticket number",
  termsAccepted: "Terms accepted",
  browser: "Browser",
  os: "OS",
};

function prettify(key: string): string {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
}

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function POST(req: NextRequest) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  // Honeypot — pretend success so bots don't retry, but send nothing.
  const honey = form.get("honeypot") ?? form.get("company-url");
  if (typeof honey === "string" && honey.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const fields: { label: string; value: string }[] = [];
  const attachments: LeadAttachment[] = [];
  let totalBytes = 0;
  let name = "";
  let email = "";
  let message = "";

  for (const [key, value] of form.entries()) {
    if (SKIP_FIELDS.has(key) || key.startsWith("_")) continue;

    if (typeof value === "string") {
      const trimmed = value.trim();
      if (!trimmed) continue;
      if (key === "name") name = trimmed;
      if (key === "email") email = trimmed;
      if (key === "message" || key === "description") message = trimmed;
      fields.push({ label: LABELS[key] ?? prettify(key), value: trimmed });
    } else if (value && typeof (value as Blob).arrayBuffer === "function") {
      const file = value as File;
      if (!file.size) continue;
      totalBytes += file.size;
      if (totalBytes > MAX_TOTAL_ATTACHMENT_BYTES) {
        return NextResponse.json(
          { error: "Attachments are too large (max ~4 MB total)." },
          { status: 413 }
        );
      }
      attachments.push({
        filename: file.name || "attachment",
        content: Buffer.from(await file.arrayBuffer()),
      });
    }
  }

  // Server-side required-field validation (defence in depth).
  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const type = String(form.get("category") ?? form.get("formType") ?? form.get("issueType") ?? "").trim();
  const subject = `New ${type || "enquiry"} from ${name} — imvision.se`;

  if (attachments.length) {
    fields.push({ label: "Attachments", value: `${attachments.length} file(s) attached` });
  }

  try {
    await sendLeadEmail({ subject, fields, replyTo: email, attachments });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/contact] send failed:", err);
    return NextResponse.json({ error: "Failed to send the message." }, { status: 500 });
  }
}
