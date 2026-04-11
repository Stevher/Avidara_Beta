import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Avidara — Compliance Intelligence";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const logoUrl = "https://avidara.co.za/logo-full-dark-strap.svg";

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#0f172a",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Dot grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle, #1e293b 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            opacity: 0.5,
          }}
        />

        {/* Glow top-right */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -160,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(79,70,229,0.25) 0%, transparent 70%)",
          }}
        />

        {/* Glow bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: -120,
            left: -120,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Top: wordmark */}
        <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoUrl} width={280} height={84} alt="Avidara" />
        </div>

        {/* Middle: headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20, position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 32, height: 2, background: "linear-gradient(90deg, #4f46e5, #10b981)" }} />
            <span style={{ color: "#818cf8", fontSize: 16, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Regulatory Intelligence
            </span>
          </div>

          <div style={{ color: "#f1f5f9", fontSize: 58, fontWeight: 800, lineHeight: 1.1, letterSpacing: "-1.5px" }}>
            Compliance intelligence
          </div>
          <div style={{ color: "#94a3b8", fontSize: 58, fontWeight: 400, lineHeight: 1.1, letterSpacing: "-1.5px", marginTop: -12 }}>
            for regulated industries.
          </div>
        </div>

        {/* Bottom: tagline + pills */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", position: "relative" }}>
          <p style={{ color: "#64748b", fontSize: 18, margin: 0, maxWidth: 540, lineHeight: 1.5 }}>
            Independent review that finds what internal teams miss — before regulators do.
          </p>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
            {["Pharmaceuticals", "Medical Devices", "Consumer Health", "Veterinary", "Transport"].map((label) => (
              <div
                key={label}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 100,
                  padding: "6px 16px",
                  color: "#94a3b8",
                  fontSize: 13,
                  fontWeight: 500,
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom gradient line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            background: "linear-gradient(90deg, transparent, #4f46e5 30%, #10b981 70%, transparent)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
