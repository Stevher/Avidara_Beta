import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

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

  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!url || !token) {
    return NextResponse.json({
      kv: "not_configured",
      admin: adminPassword ? "ok" : "not_configured",
      message: "KV environment variables are missing. Link a KV database in Vercel Dashboard → Storage.",
    });
  }

  try {
    const redis = new Redis({ url, token });

    // Real write/read/delete round-trip — more reliable than ping
    const testKey = "health:test";
    const testVal = Date.now().toString();
    await redis.set(testKey, testVal, { ex: 10 });
    const readBack = await redis.get<string>(testKey);
    await redis.del(testKey);

    if (readBack !== testVal) {
      return NextResponse.json({
        kv: "error",
        admin: adminPassword ? "ok" : "not_configured",
        message: `KV write/read mismatch — wrote "${testVal}", read "${readBack}". Storage may not be functioning correctly.`,
      });
    }

    // Also report how many chat sessions are indexed
    const chatCount = await redis.zcard("chat:index");

    return NextResponse.json({
      kv: "ok",
      admin: adminPassword ? "ok" : "not_configured",
      chatCount,
      message: `KV write/read verified. ${chatCount} chat session${chatCount !== 1 ? "s" : ""} stored.`,
    });
  } catch (err) {
    return NextResponse.json({
      kv: "error",
      admin: adminPassword ? "ok" : "not_configured",
      message: `KV error: ${err instanceof Error ? err.message : "unknown error"}`,
    });
  }
}
