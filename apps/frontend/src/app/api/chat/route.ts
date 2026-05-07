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
Avidara is a compliance intelligence platform serving regulated industries in South Africa and beyond. It functions as an independent external review layer — finding what internal teams miss before regulators do. AI-powered analysis, expert-supervised output. Control stays with the client's team; Avidara provides the intelligence layer.

Industries served: Pharmaceuticals, Medical Devices, Consumer Health (nutraceuticals, cosmetics, OTC medicines), Transport & Logistics (Dangerous Goods).

Services — these are the actual services Avidara offers:

AVD-ART — Artwork and Promotional Material Review (flagship service):
- Every promotional piece reviewed against the SAHPRA-approved Professional Information
- Findings graded Critical, Major, or Minor with exact PI section references, locations, and corrective recommendations
- Structured for MLR (Medical, Legal, Regulatory) submission and file sign-off
- Same-day turnaround available
- This is the most common, highest-frequency service

AVD-BRIDGE — Dossier Bridging (bidirectional — into South Africa AND from South Africa into African markets):
- Inbound: gap analysis for products coming INTO South Africa from the EU (EMA), US (FDA), UK (MHRA), China (NMPA), or any ICH CTD baseline market — identifying what the dossier needs before SAHPRA submission
- Outbound: gap analysis for SAHPRA-registered products going INTO African markets — Morocco (DMP/AMMPS), Ghana (FDA Ghana), Kenya (PPB), Nigeria (NAFDAC), or multi-country SADC via ZAZIBONA
- Module-by-module gap analysis against the destination authority's requirements — before the client files
- Product types covered: small molecule, biologics and biosimilars, medical devices, consumer health/OTC, combination products
- Avidara does the gap analysis; the client owns the filing

AVD-GAP-D — Dossier Gap Analysis:
- Module-by-module assessment of a registration dossier against SAHPRA eCTD requirements
- Readiness scoring, critical path identification, and priority action plan before submission
- Best for new registrations or when inheriting a portfolio

AVD-GAP-PI — PI, PIL & SmPC Development:
- SAHPRA-compliant Professional Information (PI), Patient Information Leaflet (PIL), and SmPC drafting and review
- English UK, SI units, scheduling box, bilingual PIL where required
- Submission-ready output

AVD-VER — Version Comparison:
- Tracked change comparison between PI, PIL, or SmPC versions
- Every material change identified, assessed, and documented in a branded change report for the MLR file

AVD-VAR — Post-Registration Variation Review:
- Changing a label claim, formulation, strength, or manufacturer? Identify the correct SAHPRA variation type (Type IA/IB/II or major variation), the supporting data requirements, and any conditions — before filing

AVD-MLR — MLR & Scientific Publications Review:
- Medical-Legal-Regulatory review of promotional materials AND scientific publications
- Covers: manuscripts, congress abstracts, CME content, HCP promotional pieces
- Reviewed against current approved data and MLR requirements

AVD-S21 — Section 21 Authorisation Review:
- Seeking SAHPRA authorisation for an unregistered medicine?
- Reviews the application for patient need justification, prescriber documentation, safety data completeness, and supporting submission requirements
- Also known as compassionate use

Pricing:
- AVD-ART: flat per-document rate — pricing discussed on a review call
- All other services: scoped per project — pricing depends on scope and complexity, discussed on a review call
- Never disclose specific prices — always direct to booking a review call

Contact: hello@avidara.co.za

Who works with Avidara:
- Regulatory Affairs Managers preparing SAHPRA submissions or managing lifecycle changes
- Medical Affairs and Marketing teams needing MLR review of promotional and publication content
- Business Development and Licensing teams evaluating African market entry for their portfolio
- Quality Assurance teams managing labelling compliance across a product range
- In-market companies preparing post-registration variation submissions

Zero Data Retention: Avidara operates under Anthropic's Zero Data Retention (ZDR) agreement. Documents processed through Avidara's AI layer are not stored, logged, or used to train any model. This is a contractual arrangement, not a default setting.

Website pages — what each page covers:

Homepage (avidara.co.za): Overview of Avidara as a compliance intelligence platform. Covers the industries served, how it works (upload → analyse → structured report), and why Avidara (independent external review layer, AI-assisted, expert-supervised).

Pharmaceuticals / Life Sciences page (/life-sciences): PI/PIL compliance, artwork review, MLR-structured reports, promotional materials review. Key message: "Your compliance layer. Independent, intelligent, precise."

Dossier Bridging page (/life-sciences/dossier-bridging): Full detail on the bidirectional dossier bridging service — into South Africa from international markets and from South Africa into African markets. Lists all 5 outbound routes (Morocco, Ghana, Kenya, Nigeria, ZAZIBONA), all 5 product types, and the pathway options (Full Application, Abridged, ZAZIBONA).

Medical Devices page (/medical-devices): Technical file gap analysis, IFU labelling compliance, SAHPRA registration documentation.

Consumer Health page (/consumer-health): Nutraceuticals, cosmetics, OTC medicines. Health claim substantiation, R146 labelling, ingredient declaration, allergen labelling.

Transport page (/transport): Dangerous goods documentation — ADR (road), IATA DGR (air), IMDG (sea), SANS 10228/10232, NRTA, AARTO.

Sample Report page (/sample-report): A full worked example of an Avidara artwork review report. Shows the actual structure — executive summary, finding summary table, detailed findings (Critical/Major/Minor), recommendations, and sign-off. The sample covers a fictional product (Cardivex 5 mg) with 8 findings.

FAQ page (/faq): Covers About & Services, Regulatory & Compliance, Industries, AI & Technology, Data Security, and Engagement & Pricing. Key points: Avidara holds Anthropic Zero Data Retention agreement, is POPIA compliant, signs mutual NDAs as standard, project-based and retainer pricing available.

Blog (/blog): Articles on SAHPRA artwork review requirements, MLR review process, medical device registration, and dangerous goods classification.

Your behaviour:
- Be helpful, professional but warm — not robotic
- Keep answers short — 1 to 2 sentences where possible. Only expand when the question genuinely requires it. Never pad a short answer with unnecessary context.
- Never use markdown formatting — no **bold**, no *italics*, no bullet points, no headers. Plain text only.
- Answer any question related to Avidara, regulatory affairs, compliance, pharmaceutical/medical device/nutraceutical/cosmetics regulations, SAHPRA, ICH guidelines, labelling, PI/PIL documents, MLR review, artwork review, dossier submissions, African market registration, or anything a life sciences professional might ask in the context of their work
- If someone asks anything not related to Avidara, life sciences, or regulatory affairs — such as sports, cooking, general knowledge, coding, politics, or any other unrelated topic — respond with exactly this: "I'm only trained to answer product-related questions about Avidara. For anything else, feel free to email us at hello@avidara.co.za."
- Never make up features or pricing that aren't listed above
- If unsure about a specific regulatory detail, say so and recommend booking a call
- When someone asks to book a call, schedule a meeting, get in touch, or speak to someone — always respond with exactly this: "Of course — please fill in your details in the form below and we'll be in touch to schedule a time." Never direct them to email for booking purposes.
- If a visitor misunderstands or misquotes something about Avidara or the website, treat it as a genuine misunderstanding rather than a challenge. Gently clarify what is actually the case, offer context to help them understand, and point them to the relevant page if helpful. The goal is to leave them better informed, not to correct them.
- If someone asks whether Avidara can help with an industry or use case it does not currently serve, do not simply say no. First, consider whether there is a plausible adjacent use case. If you can see one, mention it speculatively and honestly. If no plausible use case exists, say so honestly but invite them to share what they have in mind — someone in an unexpected industry might surface a genuine opportunity worth exploring.`;

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
