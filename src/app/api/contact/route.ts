import { NextRequest, NextResponse } from "next/server";
import { sendLeadEmail, type LeadAttachment } from "@/lib/email";

// Node runtime (Buffer + Resend). Always dynamic (POST handler).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// IM Flow's public API. The app lives at flow.imvision.se/crm and its backend
// serves both /crm and /api on :8005 — `/api/` is therefore the correct base,
// not `/crm/api/` (that prefix falls through to the SPA and returns HTML).
// NOTE: flow.imvision.se's nginx `location /api/` must point at :8005. A deploy
// on this host has twice rewritten those proxypass lines to :8080 (the lager
// app), which silently 404s every ticket and pushes users onto the mailto
// fallback. If tickets stop arriving, check that first.
const BASE = process.env.FLOW_API_BASE || "https://flow.imvision.se/api";

// ──────────────────────────────────────────────────────────
// Sync functions — Flow endpoints
// ──────────────────────────────────────────────────────────

/**
 * Sync a support/felanmälan submission to Flow's /api/support.
 * Returns the ticket number on success, null on failure.
 */
async function syncToSupport(data: {
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  message: string;
  fileName?: string;
}): Promise<{ ok: boolean; ref: string | null }> {
  // Fältnamnen är Flow-endpointens kontrakt (apps/core/public_website.py).
  // De hette tidigare _name/_email/_phone_number — ett Jotform-format som
  // endpointen aldrig tog emot, så varje anrop avvisades tyst.
  const payload = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    company: data.company || data.address || "",
    message: data.message,
  };

  try {
    const res = await fetch(`${BASE}/support`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.warn("[/api/contact] Support sync failed:", res.status, res.statusText);
      return { ok: false, ref: null };
    }
    const json = await res.json().catch(() => ({}));
    // Flow svarar { ok, ref } där ref är CRM:ets eget ärendenummer (S-1644).
    return { ok: true, ref: (json as { ref?: string }).ref ?? null };
  } catch (err) {
    console.warn("[/api/contact] Support sync error:", err);
    return { ok: false, ref: null };
  }
}

/**
 * Sync a buy/rental sales enquiry to Flow's /api/sales-enquiry.
 * Returns the project number on success, null on failure.
 */
async function syncToSales(data: {
  category: "buy" | "rental";
  name: string;
  email: string;
  phone: string;
  company: string;
  location: string;
  eventDate: string;
  message: string;
  fileName?: string;
}): Promise<{ ok: boolean; ref: string | null }> {
  const payload = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    company: data.company || "",
    category: data.category,
    location: data.location || "",
    message: data.eventDate
      ? `${data.message}\n\nDatum: ${data.eventDate}`
      : data.message,
  };

  try {
    const res = await fetch(`${BASE}/sales-enquiry`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.warn("[/api/contact] Sales sync failed:", res.status, res.statusText);
      return { ok: false, ref: null };
    }
    const json = await res.json().catch(() => ({}));
    // Säljförfrågan hamnar i CRM:ets säljinkorg, som inte har ett kundvänt
    // nummer än. Den kan alltså ha lyckats UTAN att ha något ref — därför
    // returneras ok separat.
    return { ok: true, ref: (json as { ref?: string }).ref ?? null };
  } catch (err) {
    console.warn("[/api/contact] Sales sync error:", err);
    return { ok: false, ref: null };
  }
}

/**
 * Build a mailto: URL from form fields. Used as a fallback when
 * the server-side email (Resend) cannot deliver.
 */
function buildMailtoUrl(
  to: string,
  subject: string,
  fields: { label: string; value: string }[],
): string {
  const body = fields.map((f) => `${f.label}: ${f.value}`).join("\n\n");
  return `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// ──────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────

const MAX_TOTAL_ATTACHMENT_BYTES = 4 * 1024 * 1024;

const SKIP_FIELDS = new Set(["honeypot", "company-url", "recipient", "locale", "categoryKey"]);

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

function recipientFor(type: string): string {
  return /service/i.test(type)
    ? process.env.MAIL_TO_SERVICE || "service@imvision.se"
    : process.env.MAIL_TO || "info@imvision.se";
}

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

// ──────────────────────────────────────────────────────────
// Main handler
// ──────────────────────────────────────────────────────────

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
  let phone = "";
  let message = "";
  let company = "";
  let address = "";
  let eventDate = "";
  let fileName = "";

  for (const [key, value] of form.entries()) {
    if (SKIP_FIELDS.has(key) || key.startsWith("_")) continue;

    if (typeof value === "string") {
      const trimmed = value.trim();
      if (!trimmed) continue;
      if (key === "name") name = trimmed;
      if (key === "email") email = trimmed;
      if (key === "phone") phone = trimmed;
      if (key === "message" || key === "description") message = trimmed;
      if (key === "company") company = trimmed;
      if (key === "location") address = trimmed;
      if (key === "project") address = trimmed;
      if (key === "eventDate") eventDate = trimmed;
      fields.push({ label: LABELS[key] ?? prettify(key), value: trimmed });
    } else if (value && typeof (value as Blob).arrayBuffer === "function") {
      const file = value as File;
      if (!file.size) continue;
      totalBytes += file.size;
      if (totalBytes > MAX_TOTAL_ATTACHMENT_BYTES) {
        return NextResponse.json(
          { error: "Attachments are too large (max ~4 MB total)." },
          { status: 413 },
        );
      }
      if (!fileName) fileName = file.name || "attachment";
      attachments.push({
        filename: file.name || "attachment",
        content: Buffer.from(await file.arrayBuffer()),
      });
    }
  }

  // Server-side required-field validation (defence in depth).
  if (!name || !message || (!email && !phone)) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }
  if (email && !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const type = String(form.get("category") ?? form.get("formType") ?? form.get("issueType") ?? "").trim();
  const subject = `Ny ${type || "förfrågan"} från ${name} — imvision.se`;
  const routingKey = String(form.get("categoryKey") ?? "").trim() || type;
  const recipient = recipientFor(routingKey);

  if (attachments.length) {
    fields.push({ label: "Bilagor", value: `${attachments.length} fil(er) bifogade` });
  }

  // ── Determine which Flow endpoint to call ──────────────────
  // service → /api/support (support ticket)
  // buy/rental → /api/sales-enquiry (sales project)
  // ──────────────────────────────────────────────────────────

  let flowRef: string | null = null;    // human-readable ref (S-1644)
  // Skilt från flowRef: en säljförfrågan kan registreras utan att ha ett
  // nummer att visa kunden. Fallbacken ska styras av om något SPARADES.
  let flowOk = false;

  if (/service/i.test(routingKey)) {
    // ── Support / felanmälan ───────────────────────────────
    const support = await syncToSupport({
      name, email, phone,
      company: company || "",
      address: address || "",
      message,
      fileName: fileName || undefined,
    });
    flowOk = support.ok;
    if (support.ref) {
      flowRef = support.ref;
      console.log("[/api/contact] Support ticket created:", support.ref);
    }
  } else {
    // ── Sales / köp / hyra ─────────────────────────────────
    const category = (/buy|rental/i.test(routingKey) ? "buy" : "rental") as "buy" | "rental";
    const sales = await syncToSales({
      category,
      name, email, phone,
      company: company || "",
      location: address || "",
      eventDate: eventDate || "",
      message,
      fileName: fileName || undefined,
    });
    flowOk = sales.ok;
    if (sales.ref) {
      flowRef = sales.ref;
      console.log("[/api/contact] Sales enquiry created:", sales.ref);
    }
  }

  // ── Core guarantee: user never sees a form error ──────────
  // Send email via Resend AND sync to Flow in parallel. If Resend
  // fails, return a mailto: fallback URL so the client opens the
  // user's mail app. Flow errors are silently logged.
  //
  // Response format:
  //   ✅ All OK                → { ok: true, ref: "S-1644" }
  //   ✅ Email OK, no Flow ref  → { ok: true }
  //   ❌ Resend failed          → { ok: true, fallbackMailto: "mailto:..." }
  // ───────────────────────────────────────────────────────────

  const emailPromise = sendLeadEmail({
    subject,
    fields,
    replyTo: email || undefined,
    attachments,
    to: recipient,
  }).catch(e => e);

  const [emailResult] = await Promise.allSettled([emailPromise]);
  const emailOk = emailResult.status === "fulfilled" && emailResult.value === true;

  if (!emailOk) {
    // Har Flow redan tagit emot ärendet är det tryggat: CRM:et skickar både
    // kundbekräftelsen och den interna aviseringen via sin egen SMTP
    // (apps/core/public_website.py). Resend-anropet är då en dubblering, och
    // dess fel ska varken öppna användarens mejlklient i onödan eller få
    // formuläret att se ut som att det misslyckades.
    if (flowOk) {
      console.warn("[/api/contact] Resend failed, but Flow recorded the enquiry");
      return NextResponse.json({ ok: true, ref: flowRef });
    }

    // Ingenting registrerat någonstans — då är mailto den enda vägen kvar.
    console.error("[/api/contact] Resend failed and Flow unavailable, returning mailto fallback");
    return NextResponse.json({ ok: true, fallbackMailto: buildMailtoUrl(recipient, subject, fields) });
  }

  return NextResponse.json({
    ok: true,
    ...(flowRef && { ref: flowRef }),
  });
}
