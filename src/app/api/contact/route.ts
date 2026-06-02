import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  message: string;
}

export async function POST(req: NextRequest) {
  let body: ContactPayload;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, phone, message } = body;

  if (!name?.trim() || !phone?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "Name, phone, and message are required" }, { status: 422 });
  }

  /* ----------------------------------------------------------------
   *  TODO: replace this block with your real notification logic, e.g.:
   *    - send an email via Resend / SendGrid / Nodemailer
   *    - post to a Slack channel
   *    - write to a database (Supabase, Firebase, etc.)
   * ---------------------------------------------------------------- */
  console.log("[contact] new appointment request:", {
    name: body.name,
    phone: body.phone,
    email: body.email ?? "—",
    service: body.service ?? "—",
    message: body.message,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ success: true }, { status: 200 });
}
