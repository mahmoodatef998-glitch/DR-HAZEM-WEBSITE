import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

/* ─────────────────────────────────────────────────────────
   RATE LIMITING  (in-memory — sufficient for single-instance / Vercel serverless)
   For production with high traffic, replace with Upstash Redis:
   https://upstash.com/docs/redis/sdks/ratelimit
───────────────────────────────────────────────────────── */
const WINDOW_MS   = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5;

const rateMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateMap.get(ip);

  if (!record || record.resetAt < now) {
    rateMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (record.count >= MAX_REQUESTS) return true;
  record.count++;
  return false;
}

/* ─────────────────────────────────────────────────────────
   INPUT SANITIZATION
───────────────────────────────────────────────────────── */
function sanitize(input: string, maxLength = 500): string {
  return input
    .replace(/<[^>]*>/g, "")           // strip HTML tags
    .replace(/[<>&"'`]/g, "")          // strip dangerous chars
    .replace(/\s+/g, " ")              // collapse whitespace
    .trim()
    .substring(0, maxLength);
}

/* ─────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────── */
interface ContactPayload {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  message: string;
}

/* ─────────────────────────────────────────────────────────
   POST /api/contact
───────────────────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  /* 1 — Get client IP */
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headersList.get("x-real-ip") ||
    "unknown";

  /* 2 — Rate limit check */
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  /* 3 — Parse body */
  let body: ContactPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  /* 4 — Sanitize inputs */
  const name    = sanitize(body.name    ?? "", 100);
  const phone   = sanitize(body.phone   ?? "", 20);
  const email   = sanitize(body.email   ?? "", 100);
  const service = sanitize(body.service ?? "", 100);
  const message = sanitize(body.message ?? "", 1000);

  /* 5 — Validate required fields */
  if (!name || !phone || !message) {
    return NextResponse.json(
      { error: "Name, phone, and message are required." },
      { status: 422 }
    );
  }

  /* 6 — Phone basic format check */
  const phoneClean = phone.replace(/[\s\-()]/g, "");
  if (!/^\+?\d{7,15}$/.test(phoneClean)) {
    return NextResponse.json(
      { error: "Please enter a valid phone number." },
      { status: 422 }
    );
  }

  /* 7 — Email format check (if provided) */
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 422 }
    );
  }

  /* ────────────────────────────────────────────────────
     TODO: Replace this log with your notification service.
     Options:
       • Resend (https://resend.com) — send email
       • SendGrid — send email
       • Telegram Bot API — instant Telegram message
       • Slack Incoming Webhook — notify your team
       • Supabase / Firebase — store in database
  ──────────────────────────────────────────────────── */
  console.log("[contact] new appointment request:", {
    name,
    phone,
    email: email || "—",
    service: service || "—",
    message,
    ip,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ success: true }, { status: 200 });
}
