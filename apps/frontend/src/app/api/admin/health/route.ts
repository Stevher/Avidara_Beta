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
    await redis.ping();
    return NextResponse.json({
      kv: "ok",
      admin: adminPassword ? "ok" : "not_configured",
      message: "KV connection successful. Chat storage is active.",
    });
  } catch (err) {
    return NextResponse.json({
      kv: "error",
      admin: adminPassword ? "ok" : "not_configured",
      message: `KV connection failed: ${err instanceof Error ? err.message : "unknown error"}`,
    });
  }
}
