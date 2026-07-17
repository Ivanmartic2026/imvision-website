import { Resend } from "resend";

export interface LeadAttachment {
  filename: string;
  content: Buffer;
}

export interface LeadEmailInput {
  subject: string;
  fields: { label: string; value: string }[];
  replyTo?: string;
  attachments?: LeadAttachment[];
}

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string
  );
}

/**
 * Sends a lead/enquiry email server-side via Resend.
 * Configure in the environment:
 *   RESEND_API_KEY  (required)   — from resend.com
 *   MAIL_TO         (optional)   — recipient, defaults to sales@imvision.se
 *   MAIL_FROM       (optional)   — verified sender, e.g. "IM Vision <noreply@imvision.se>"
 *                                  (defaults to Resend's onboarding sender for testing)
 */
export async function sendLeadEmail({ subject, fields, replyTo, attachments }: LeadEmailInput) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  const to = process.env.MAIL_TO || "sales@imvision.se";
  const from = process.env.MAIL_FROM || "IM Vision Website <onboarding@resend.dev>";
  const resend = new Resend(apiKey);

  const text = fields.map((f) => `${f.label}: ${f.value}`).join("\n");
  const rows = fields
    .map(
      (f) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#6b7280;vertical-align:top;white-space:nowrap"><strong>${escapeHtml(
          f.label
        )}</strong></td><td style="padding:6px 0;color:#111827;white-space:pre-wrap">${escapeHtml(
          f.value
        )}</td></tr>`
    )
    .join("");
  const html = `<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;font-size:15px;line-height:1.6">
    <h2 style="margin:0 0 16px;font-size:18px">New enquiry from imvision.se</h2>
    <table style="border-collapse:collapse">${rows}</table>
  </div>`;

  const { data, error } = await resend.emails.send({
    from,
    to,
    subject,
    replyTo,
    text,
    html,
    attachments: attachments?.map((a) => ({ filename: a.filename, content: a.content })),
  });

  if (error) {
    throw new Error(error.message || "Resend failed to send the email");
  }
  return data;
}
