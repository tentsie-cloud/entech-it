import { NextResponse } from "next/server";
import { Resend } from "resend";
import { services } from "@/data/services";

const ENQUIRY_RECIPIENT = process.env.ENQUIRY_TO_EMAIL ?? "tentsie@gmail.com";

type EnquiryPayload = {
  name?: string;
  phone?: string;
  email?: string;
  device?: string;
  fault?: string;
  date?: string;
  area?: string;
};

function isValid(payload: EnquiryPayload) {
  return Boolean(
    payload.name &&
      payload.phone &&
      payload.email &&
      payload.device &&
      payload.fault &&
      payload.date &&
      payload.area
  );
}

export async function POST(request: Request) {
  const payload = (await request.json()) as EnquiryPayload;

  if (!isValid(payload)) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const deviceLabel =
    services.find((s) => s.id === payload.device)?.name ?? payload.device;

  const html = `
    <h2>New repair enquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(payload.name!)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(payload.phone!)}</p>
    <p><strong>Email:</strong> ${escapeHtml(payload.email!)}</p>
    <p><strong>Device:</strong> ${escapeHtml(deviceLabel!)}</p>
    <p><strong>Area:</strong> ${escapeHtml(payload.area!)}</p>
    <p><strong>Preferred date:</strong> ${escapeHtml(payload.date!)}</p>
    <p><strong>Fault description:</strong><br/>${escapeHtml(payload.fault!)}</p>
  `;

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    // No email provider configured yet — log so the enquiry isn't silently lost
    // during local development or before RESEND_API_KEY is set in production.
    console.info("[enquiry] RESEND_API_KEY not set, logging enquiry instead of sending:", payload);
    return NextResponse.json({ ok: true, delivered: false });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.ENQUIRY_FROM_EMAIL ?? "ENTECH IT <onboarding@resend.dev>",
    to: ENQUIRY_RECIPIENT,
    replyTo: payload.email,
    subject: `New repair enquiry — ${deviceLabel}`,
    html,
  });

  if (error) {
    console.error("[enquiry] Resend error:", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, delivered: true });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
