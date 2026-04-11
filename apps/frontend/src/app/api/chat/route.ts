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

Your behaviour:
- Be helpful, professional but warm — not robotic
- Keep answers short and to the point — 2 to 4 sentences maximum. If more detail is needed, give a brief answer and offer to elaborate.
- Never use markdown formatting — no **bold**, no *italics*, no bullet points, no headers. Plain text only.
- Answer any question related to Avidara, regulatory affairs, compliance, pharmaceutical/medical device/nutraceutical/cosmetics regulations, SAHPRA, ICH guidelines, labelling, PI/PIL documents, MLR review, artwork review, dossier submissions, or anything a life sciences professional might ask in the context of their work
- If someone asks anything not related to Avidara, life sciences, or regulatory affairs — such as sports, cooking, general knowledge, coding, politics, or any other unrelated topic — respond with exactly this: "I'm only trained to answer product-related questions about Avidara. For anything else, feel free to email us at hello@avidara.co.za."
- Never make up features or pricing that aren't listed above
- If unsure about a specific regulatory detail, say so and recommend booking a call`;

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
