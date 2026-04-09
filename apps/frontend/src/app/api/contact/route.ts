import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, surname, company, email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const displayName = [name, surname].filter(Boolean).join(" ") || "Not provided";

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Avidara <hello@avidara.co.za>",
        to: "hello@avidara.co.za",
        reply_to: email,
        subject: `New review request — ${displayName}${company ? ` · ${company}` : ""}`,
        html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0f172a;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;padding:40px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

        <!-- Header -->
        <tr><td style="padding-bottom:32px;text-align:center;">
          <img src="https://avidara.co.za/logo.svg" alt="Avidara" width="48" height="48" style="display:inline-block;border-radius:8px;vertical-align:middle;margin-right:12px;" />
          <span style="font-size:24px;font-weight:700;color:#f1f5f9;letter-spacing:-0.5px;vertical-align:middle;">Avidara</span>
        </td></tr>

        <!-- Gradient line -->
        <tr><td style="padding-bottom:32px;">
          <div style="height:1px;background:linear-gradient(90deg,transparent,#4f46e5 30%,#10b981 70%,transparent);opacity:0.4;"></div>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:#1e293b;border-radius:16px;padding:40px;border:1px solid rgba(255,255,255,0.07);">

          <p style="margin:0 0 8px;font-size:13px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#10b981;">New Review Request</p>
          <h1 style="margin:0 0 32px;font-size:26px;font-weight:700;color:#f1f5f9;line-height:1.3;">
            ${displayName} wants a review
          </h1>

          <!-- Details card -->
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;border-radius:12px;border:1px solid rgba(255,255,255,0.07);margin-bottom:32px;">
            <tr><td style="padding:24px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom:16px;border-bottom:1px solid rgba(255,255,255,0.07);">
                    <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#64748b;">Name</p>
                    <p style="margin:0;font-size:15px;color:#f1f5f9;font-weight:500;">${displayName}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 0;border-bottom:1px solid rgba(255,255,255,0.07);">
                    <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#64748b;">Company</p>
                    <p style="margin:0;font-size:15px;color:#f1f5f9;font-weight:500;">${company || "Not provided"}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:16px;">
                    <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#64748b;">Email</p>
                    <p style="margin:0;font-size:15px;color:#818cf8;font-weight:500;">${email}</p>
                  </td>
                </tr>
              </table>
            </td></tr>
          </table>

          <!-- CTA button -->
          <table cellpadding="0" cellspacing="0">
            <tr><td style="border-radius:10px;background:linear-gradient(135deg,#4f46e5,#3730a3);">
              <a href="mailto:${email}" style="display:inline-block;padding:14px 28px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:10px;">
                Reply to ${name || "this lead"} →
              </a>
            </td></tr>
          </table>

        </td></tr>

        <!-- Footer -->
        <tr><td style="padding-top:32px;text-align:center;">
          <p style="margin:0;font-size:12px;color:#334155;">
            Sent from <a href="https://avidara.co.za" style="color:#4f46e5;text-decoration:none;">avidara.co.za</a> · Pharmaceutical Regulatory Document Services
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
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
