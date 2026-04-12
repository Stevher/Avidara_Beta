import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

const CONVERSATION_TTL = 60 * 60 * 24 * 180;

function isValidEmail(e: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

async function sendLeadEmail(
  name: string,
  surname: string,
  email: string,
  sessionId: string,
  page: string,
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const adminUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.avidara.co.za"}/admin`;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      from: "Avidara Chat <hello@avidara.co.za>",
      to: "hello@avidara.co.za",
      subject: `Follow-up request from ${name} ${surname}`,
      html: `
<div style="font-family:'Helvetica Neue',Arial,sans-serif;background:#0f172a;padding:32px 24px;">
  <div style="max-width:520px;margin:0 auto;">
    <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#10b981;">Contact Request</p>
    <h2 style="margin:0 0 24px;font-size:20px;font-weight:700;color:#f1f5f9;line-height:1.3;">Someone wants to be contacted</h2>
    <div style="background:#1e293b;border-radius:12px;border:1px solid rgba(255,255,255,0.07);padding:20px;margin-bottom:24px;">
      <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#64748b;">Name</p>
      <p style="margin:0 0 16px;font-size:15px;color:#f1f5f9;border-bottom:1px solid rgba(255,255,255,0.07);padding-bottom:16px;">${name} ${surname}</p>
      <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#64748b;">Email</p>
      <p style="margin:0 0 16px;font-size:15px;color:#818cf8;border-bottom:1px solid rgba(255,255,255,0.07);padding-bottom:16px;">
        <a href="mailto:${email}" style="color:#818cf8;">${email}</a>
      </p>
      <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#64748b;">Source page</p>
      <p style="margin:0 0 16px;font-size:14px;color:#94a3b8;font-family:monospace;border-bottom:1px solid rgba(255,255,255,0.07);padding-bottom:16px;">${page || "/"}</p>
      <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#64748b;">POPIA consent</p>
      <p style="margin:0;font-size:13px;color:#94a3b8;">This person has given explicit consent for Avidara to contact them regarding this conversation. Their details will not be shared with third parties.</p>
    </div>
    <a href="${adminUrl}" style="display:inline-block;padding:12px 24px;background:#4f46e5;color:#fff;text-decoration:none;border-radius:8px;font-size:14px;font-weight:600;">
      View conversation →
    </a>
    <p style="margin:20px 0 0;font-size:12px;color:#334155;">Session ID: ${sessionId}</p>
  </div>
</div>`,
    }),
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, surname, email, consent, sessionId, page } = body;

    // Validate required fields
    if (
      typeof name !== "string" || name.trim().length < 1 ||
      typeof surname !== "string" || surname.trim().length < 1 ||
      typeof email !== "string" || !isValidEmail(email.trim()) ||
      consent !== true ||
      typeof sessionId !== "string" || sessionId.length > 64
    ) {
      return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
    }

    const cleanName = name.trim().slice(0, 80);
    const cleanSurname = surname.trim().slice(0, 80);
    const cleanEmail = email.trim().toLowerCase().slice(0, 200);
    const cleanPage = typeof page === "string" ? page.slice(0, 100) : "/";

    // Store in Redis under the session record
    const redis = getRedis();
    if (redis) {
      const key = `chat:${sessionId}`;
      const existing = await redis.get<Record<string, unknown>>(key);
      if (existing) {
        await redis.set(key, {
          ...existing,
          lead: {
            name: cleanName,
            surname: cleanSurname,
            email: cleanEmail,
            consentAt: new Date().toISOString(),
          },
        }, { ex: CONVERSATION_TTL });
      }
    }

    // Fire lead notification email
    await sendLeadEmail(cleanName, cleanSurname, cleanEmail, sessionId, cleanPage);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Lead capture error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
