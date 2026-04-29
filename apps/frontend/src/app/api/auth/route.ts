import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { password } = await req.json();

  if (!password || password !== process.env.PREVIEW_PASSWORD) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set("avidara-preview", "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    // No maxAge — expires when browser closes
  });
  return res;
}
