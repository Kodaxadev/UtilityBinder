import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

/**
 * Pilot intake endpoint.
 *
 * Storage strategy (pluggable, in order):
 *  1. If INTAKE_WEBHOOK_URL is set, forward the submission there
 *     (Zapier / Make / Supabase edge function / anything that accepts JSON).
 *  2. In local dev, also append to data/intake.jsonl for zero-config testing.
 *
 * TECH-DEBT(deploy): set INTAKE_WEBHOOK_URL in the hosting environment before
 * going live, or submissions will only be visible in server logs.
 */

const MAX_BODY_BYTES = 16_384;

type IntakePayload = Record<string, unknown>;

function isSpam(payload: IntakePayload): boolean {
  // Honeypot field — humans never fill it.
  return typeof payload.website === "string" && payload.website.length > 0;
}

function isValid(payload: IntakePayload): boolean {
  return (
    typeof payload.parkName === "string" &&
    payload.parkName.trim().length > 0 &&
    typeof payload.contact === "string" &&
    payload.contact.trim().length > 2
  );
}

export async function POST(request: Request) {
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return Response.json({ error: "Payload too large" }, { status: 413 });
  }

  let payload: IntakePayload;
  try {
    payload = JSON.parse(raw) as IntakePayload;
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Silently accept spam so bots learn nothing.
  if (isSpam(payload)) {
    return Response.json({ ok: true });
  }
  if (!isValid(payload)) {
    return Response.json(
      { error: "parkName and contact are required" },
      { status: 422 },
    );
  }

  const record = {
    receivedAt: new Date().toISOString(),
    ...payload,
    website: undefined,
  };

  const webhookUrl = process.env.INTAKE_WEBHOOK_URL;
  if (webhookUrl) {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
    });
    if (!res.ok) {
      console.error(
        `[intake] webhook responded ${res.status}; payload:`,
        JSON.stringify(record),
      );
      return Response.json({ error: "Storage failed" }, { status: 502 });
    }
  } else if (process.env.NODE_ENV === "production") {
    // Fail visibly: a lead must never see success while landing only in
    // logs. The payload is still logged as a last-resort recovery path.
    console.error(
      "[intake] INTAKE_WEBHOOK_URL not set in production — rejecting. Payload:",
      JSON.stringify(record),
    );
    return Response.json({ error: "Intake unavailable" }, { status: 503 });
  } else {
    console.warn(
      "[intake] INTAKE_WEBHOOK_URL not set — dev mode, writing to data/intake.jsonl only.",
    );
  }

  if (process.env.NODE_ENV === "development") {
    const dir = path.join(process.cwd(), "data");
    await mkdir(dir, { recursive: true });
    await appendFile(
      path.join(dir, "intake.jsonl"),
      JSON.stringify(record) + "\n",
      "utf8",
    );
  }

  return Response.json({ ok: true });
}
