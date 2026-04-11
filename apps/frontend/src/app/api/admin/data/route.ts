import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

interface ConversationRecord {
  id: string;
  createdAt: number;
  updatedAt: number;
  page: string;
  ipHash: string;
  firstMessage: string;
  messageCount: number;
  messages: { role: string; content: string }[];
}

function isAuthorised(req: Request): boolean {
  const authHeader = req.headers.get("authorization") ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;
  return token === adminPassword;
}

export async function GET(req: Request) {
  if (!isAuthorised(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.KV_REST_API_URL) {
    return NextResponse.json({ error: "KV not configured" }, { status: 503 });
  }

  try {
    const url = new URL(req.url);
    const limit = Math.min(parseInt(url.searchParams.get("limit") ?? "50"), 200);
    const offset = parseInt(url.searchParams.get("offset") ?? "0");
    const sessionId = url.searchParams.get("id");

    // Single conversation detail
    if (sessionId) {
      const record = await kv.get<ConversationRecord>(`chat:${sessionId}`);
      if (!record) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json(record);
    }

    // List conversations (newest first)
    const total = await kv.zcard("chat:index");
    const sessionIds = await kv.zrange("chat:index", offset, offset + limit - 1, { rev: true }) as string[];

    if (sessionIds.length === 0) {
      return NextResponse.json({ total, conversations: [], stats: buildEmptyStats() });
    }

    const records = await Promise.all(
      sessionIds.map((id) => kv.get<ConversationRecord>(`chat:${id}`))
    );

    const conversations = records.filter(Boolean) as ConversationRecord[];
    const stats = buildStats(conversations, total);

    return NextResponse.json({ total, conversations, stats });
  } catch (err) {
    console.error("Admin data error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

function buildEmptyStats() {
  return { today: 0, thisWeek: 0, totalMessages: 0, topPages: [] };
}

function buildStats(conversations: ConversationRecord[], total: number) {
  const now = Date.now();
  const dayMs = 86400_000;
  const weekMs = 7 * dayMs;

  let today = 0;
  let thisWeek = 0;
  let totalMessages = 0;
  const pageCounts: Record<string, number> = {};

  for (const c of conversations) {
    if (now - c.createdAt < dayMs) today++;
    if (now - c.createdAt < weekMs) thisWeek++;
    totalMessages += c.messageCount;
    pageCounts[c.page] = (pageCounts[c.page] ?? 0) + 1;
  }

  const topPages = Object.entries(pageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([page, count]) => ({ page, count }));

  return { today, thisWeek, totalSessions: total, totalMessages, topPages };
}
