import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

// ── Redis client (lazy — skipped if env vars not set) ─────────────────────
function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

// ── KV conversation storage ────────────────────────────────────────────────
const CONVERSATION_TTL = 60 * 60 * 24 * 180; // 180 days in seconds

function hashIp(ip: string): string {
  // Simple deterministic hash — not cryptographic, just for grouping, no PII stored
  let h = 0;
  for (let i = 0; i < ip.length; i++) {
    h = (Math.imul(31, h) + ip.charCodeAt(i)) | 0;
  }
  return (h >>> 0).toString(16);
}

async function storeConversation(
  sessionId: string,
  page: string,
  ipHash: string,
  messages: { role: string; content: string }[],
  assistantReply: string,
): Promise<void> {
  const redis = getRedis();
  if (!redis) return; // not configured — skip silently

  const key = `chat:${sessionId}`;
  const now = Date.now();

  const existing = await redis.get<{
    createdAt: number;
    page: string;
    ipHash: string;
    firstMessage: string;
    messages: { role: string; content: string }[];
  }>(key);

  const allMessages = [
    ...(existing?.messages ?? []),
    ...messages.slice(existing ? existing.messages.length : 0),
    { role: "assistant", content: assistantReply },
  ];

  const record = {
    id: sessionId,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
    page: existing?.page ?? page,
    ipHash,
    firstMessage: existing?.firstMessage ?? (messages[0]?.content ?? ""),
    messageCount: allMessages.filter((m) => m.role === "user").length,
    messages: allMessages,
  };

  await redis.set(key, record, { ex: CONVERSATION_TTL });
  // Add to index (sorted by updatedAt so latest is first)
  await redis.zadd("chat:index", { score: now, member: sessionId });

  // Send email alert on the very first message of a new conversation
  if (!existing) {
    sendChatAlert(record.firstMessage, page, sessionId).catch((err) =>
      console.error("Chat alert email error:", err)
    );
  }
}

// ── New-chat email alert ───────────────────────────────────────────────────
async function sendChatAlert(firstMessage: string, page: string, sessionId: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const adminUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.avidara.co.za"}/admin`;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      from: "Avidara Chat <hello@avidara.co.za>",
      to: "hello@avidara.co.za",
      subject: `New chat started — "${firstMessage.slice(0, 60)}${firstMessage.length > 60 ? "…" : ""}"`,
      html: `
<div style="font-family:'Helvetica Neue',Arial,sans-serif;background:#0f172a;padding:32px 24px;">
  <div style="max-width:520px;margin:0 auto;">
    <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#10b981;">New Chat</p>
    <h2 style="margin:0 0 24px;font-size:20px;font-weight:700;color:#f1f5f9;line-height:1.3;">Someone started a conversation</h2>
    <div style="background:#1e293b;border-radius:12px;border:1px solid rgba(255,255,255,0.07);padding:20px;margin-bottom:24px;">
      <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#64748b;">First message</p>
      <p style="margin:0 0 16px;font-size:15px;color:#f1f5f9;">"${firstMessage}"</p>
      <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#64748b;">Source page</p>
      <p style="margin:0;font-size:14px;color:#818cf8;font-family:monospace;">${page || "/"}</p>
    </div>
    <a href="${adminUrl}" style="display:inline-block;padding:12px 24px;background:#4f46e5;color:#fff;text-decoration:none;border-radius:8px;font-size:14px;font-weight:600;">
      View full transcript →
    </a>
    <p style="margin:20px 0 0;font-size:12px;color:#334155;">Session ID: ${sessionId}</p>
  </div>
</div>`,
    }),
  });
}

// ── In-memory rate limiter (per IP, resets on cold start) ──────────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 20;       // max messages per window
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour in ms

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return false;
  }

  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

// ── System prompt ──────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are Avidara's sales assistant. You help potential clients understand what Avidara does, how it works, pricing, and whether it's a good fit for their needs.

About Avidara:
Avidara is a regulatory intelligence platform built for life sciences companies in South Africa and beyond. It helps pharmaceutical, medical device, nutraceutical, and cosmetics companies manage compliance, regulatory submissions, and documentation — with AI-powered analysis rather than generic checklists.

Key points:
- Avidara replaces the need for expensive external regulatory consultants for day-to-day compliance tasks
- It uses AI to analyse documents against the relevant regulatory standards (SAHPRA, ICH/CTD, MCA Code of Practice, etc.)
- It does NOT replace the human regulatory professional — it removes the admin burden and ensures nothing gets missed
- Accountability stays with the client's team; Avidara provides the intelligence layer
- It is structured for MLR (Medical, Legal, Regulatory) review filing
- It covers multiple industries: Pharmaceuticals, Medical Devices, Nutraceuticals, Cosmetics, Veterinary, Food & Beverage, Clinical Research

Review tiers — this is critical to understand:

Document Review (standard tier):
- The primary, most common service
- The client uploads a single document: the PI (Package Insert / Product Information) or PIL
- Avidara analyses the PI/PIL against the relevant regulatory framework — SAHPRA, ICH/CTD, MCA Code of Practice, etc.
- Flags gaps, non-compliant claims, missing mandatory elements, labelling errors, and artwork inconsistencies
- Best for: day-to-day compliance, artwork sign-off before print, labelling review before batch release, HCP promotional material review, marketing claim checks
- Fast turnaround — same-day for artwork reviews
- Lower cost, flat per-document pricing
- This is what 80% of clients use regularly

Dossier Review (deep review tier):
- A more comprehensive, scoped engagement
- The client uploads a document package: PI + SMPC + clinical summaries + dossier sections — whatever is relevant to the review
- Avidara cross-references claims across all uploaded documents, checks consistency between the PI and clinical data, validates submission-readiness
- Identifies inconsistencies between documents, unsupported claims, gaps in clinical substantiation, and submission structure issues
- Best for: new product registrations, major SAHPRA submissions, significant label variations, preparing a full dossier for regulatory sign-off
- Takes longer and is scoped per project — turnaround and pricing discussed during the review call
- Higher value engagement, less frequent — typically one or two per product per year

Other services:
- MLR File Structuring — organising documentation for Medical, Legal, and Regulatory sign-off
- Compliance Monitoring — continuous tracking against changing regulations

How it works:
1. The client uploads their document(s) — a single PI for Document Review, or a package of documents for Dossier Review
2. Avidara analyses them against the relevant regulatory frameworks
3. The client receives a structured report with gaps, risks, and recommended actions — formatted for MLR file sign-off

Who it's for:
- Regulatory Affairs Managers
- Quality Assurance teams
- Marketing and brand teams needing compliance checks on promotional claims
- Companies preparing SAHPRA submissions
- Companies managing multi-product portfolios at scale

Pricing:
- Document Review: flat per-document rate — exact pricing discussed on a review call
- Dossier Review: scoped per project — pricing depends on document volume and complexity, discussed on a review call
- Never disclose specific prices — always direct to booking a review call

Contact: hello@avidara.co.za

Website pages — what each page covers:

Homepage (avidara.co.za): Overview of Avidara as a compliance intelligence platform. Covers the 5 industries, how it works (upload → analyse → structured report), and why Avidara (independent external review layer, AI-assisted, expert-supervised).

Pharmaceuticals page (/life-sciences): Focuses on PI/PIL compliance, artwork review, MLR-structured reports, promotional materials review. Key message: "Your compliance layer. Independent, intelligent, precise." Common findings shown: wrong dosing on artwork, off-label indication creep, non-PI comparative claims.

Medical Devices page (/medical-devices): Technical file gap analysis, IFU labelling compliance, ISO 13485 alignment, SAHPRA registration documentation. Common findings: missing clinical evidence, IFU contraindication omissions, incomplete risk management files.

Consumer Health page (/consumer-health): Nutraceuticals, cosmetics, OTC medicines, functional foods. Health claim substantiation, R146 labelling, ingredient declaration, allergen labelling. Common findings: unsubstantiated health claims ("clinically proven"), undeclared allergens, misleading "natural" claims.

Veterinary page (/veterinary): Veterinary product labels, promotional materials, Act 36 of 1947, DAFF/DALRRD guidelines. Common findings: missing withdrawal periods on food-producing animal products, off-label species claims, scheduling declaration gaps.

Transport page (/transport): Dangerous goods documentation, cross-border permits, SANS 10228/10232, NRTA, RTMS, AARTO, SADC protocols. Common findings: incorrect UN number classification, expired route permits, unreachable emergency contacts.

Sample Report page (/sample-report): A full worked example of an Avidara artwork review report. Shows the actual structure clients receive — executive summary, finding summary table, detailed findings (Critical/Major/Minor), recommendations, and sign-off. The sample covers a fictional pharmaceutical product (Cardivex 5 mg) with 8 findings across scheduling, INN prominence, storage, and labelling.

FAQ page (/faq): Covers About & Services, Regulatory & Compliance, Industries, AI & Technology, Data Security, and Engagement & Pricing. Key points: Avidara holds Anthropic Zero Data Retention agreement, is POPIA compliant, signs mutual NDAs as standard, offers project-based and retainer pricing.

Blog (/blog): Articles covering SAHPRA artwork review requirements, MLR review process, SAHPRA medical device registration changes, veterinary product labelling under Act 36, and dangerous goods classification under SANS 10228.

Your behaviour:
- Be helpful, professional but warm — not robotic
- Keep answers short — 1 to 2 sentences where possible. Only expand when the question genuinely requires it. Never pad a short answer with unnecessary context.
- Never use markdown formatting — no **bold**, no *italics*, no bullet points, no headers. Plain text only.
- Answer any question related to Avidara, regulatory affairs, compliance, pharmaceutical/medical device/nutraceutical/cosmetics regulations, SAHPRA, ICH guidelines, labelling, PI/PIL documents, MLR review, artwork review, dossier submissions, or anything a life sciences professional might ask in the context of their work
- If someone asks anything not related to Avidara, life sciences, or regulatory affairs — such as sports, cooking, general knowledge, coding, politics, or any other unrelated topic — respond with exactly this: "I'm only trained to answer product-related questions about Avidara. For anything else, feel free to email us at hello@avidara.co.za."
- Never make up features or pricing that aren't listed above
- If unsure about a specific regulatory detail, say so and recommend booking a call
- When someone asks to book a call, schedule a meeting, get in touch, or speak to someone — always respond with exactly this: "Of course — please fill in your details in the form below and we'll be in touch to schedule a time." Never direct them to email for booking purposes.`;

export async function POST(req: Request) {
  try {
    // ── Honeypot check ───────────────────────────────────────────────────
    const { messages, _hp, sessionId, page } = await req.json();
    if (_hp) {
      // Bot filled the hidden field — silently reject
      return NextResponse.json({ reply: "Thanks for your message!" });
    }

    // ── Rate limit check ─────────────────────────────────────────────────
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { reply: "You've sent a lot of messages. Please wait a while before trying again, or email us at hello@avidara.co.za." },
        { status: 429 }
      );
    }

    // ── Message validation ───────────────────────────────────────────────
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ reply: "I'm only able to help with questions about Avidara and regulatory compliance. Feel free to ask me anything about how Avidara works, our services, or life sciences regulations — or email us at hello@avidara.co.za." });
    }

    // ── Anthropic API call ───────────────────────────────────────────────
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY ?? "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 200,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Anthropic API error:", res.status, err);
      return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }

    const data = await res.json();
    const text = data.content?.[0]?.text ?? "";

    // ── Store conversation in KV (best-effort, never blocks response) ────
    if (sessionId && typeof sessionId === "string" && sessionId.length <= 64) {
      storeConversation(
        sessionId,
        typeof page === "string" ? page.slice(0, 100) : "/",
        hashIp(ip),
        messages,
        text,
      ).catch((err) => console.error("KV store error:", err));
    }

    return NextResponse.json({ reply: text });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
