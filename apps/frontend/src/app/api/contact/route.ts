import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Avidara <hello@avidara.co.za>",
        to: "hello@avidara.co.za",
        subject: "New review request from avidara.co.za",
        html: `
          <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 32px;">
            <h2 style="color: #0f172a; margin-bottom: 8px;">New review request</h2>
            <p style="color: #475569; margin-bottom: 24px;">Someone submitted the Book a Review form on avidara.co.za.</p>
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px 20px; margin-bottom: 24px;">
              <p style="margin: 0; color: #0f172a; font-size: 15px;">
                <strong>Email:</strong> <a href="mailto:${email}" style="color: #4f46e5;">${email}</a>
              </p>
            </div>
            <a href="mailto:${email}" style="display: inline-block; background: #4f46e5; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 600;">
              Reply to this lead
            </a>
            <p style="color: #94a3b8; font-size: 12px; margin-top: 32px;">Sent from avidara.co.za</p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", res.status, err);
      return NextResponse.json({ error: "Failed to send" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
