import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Avidara — AI-Powered Regulatory Review";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#0b0b0f",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(226,232,240,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(226,232,240,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "50px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)",
          }}
        />

        {/* Top: Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", zIndex: 10 }}>
          {/* Hex icon */}
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "10px",
              backgroundColor: "#6366f1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 18 18" fill="none">
              <path d="M9 2L15.5 6V12L9 16L2.5 12V6L9 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M9 6V12M6 7.5L12 10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <span style={{ color: "white", fontSize: "22px", fontWeight: 600, letterSpacing: "-0.5px" }}>
            Avidara
          </span>
        </div>

        {/* Middle: Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", zIndex: 10, maxWidth: "760px" }}>
          {/* Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "rgba(99,102,241,0.12)",
              border: "1px solid rgba(99,102,241,0.3)",
              borderRadius: "100px",
              padding: "6px 16px",
              width: "fit-content",
            }}
          >
            <div
              style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#818cf8" }}
            />
            <span style={{ color: "#a5b4fc", fontSize: "14px", fontWeight: 500 }}>
              Now in private beta
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <span
              style={{
                color: "white",
                fontSize: "68px",
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: "-2px",
              }}
            >
              Regulatory review,
            </span>
            <span
              style={{
                fontSize: "68px",
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: "-2px",
                background: "linear-gradient(90deg, #818cf8 0%, #a78bfa 100%)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              reimagined.
            </span>
          </div>

          <span style={{ color: "#94a3b8", fontSize: "22px", lineHeight: 1.5, marginTop: "4px" }}>
            AI-powered compliance review for pharmaceutical regulatory teams.
          </span>
        </div>

        {/* Bottom: Stats row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0px",
            zIndex: 10,
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "32px",
            width: "100%",
          }}
        >
          {[
            { value: "90%", label: "Faster reviews" },
            { value: "99.8%", label: "Accuracy rate" },
            { value: "3 hrs", label: "Avg. turnaround" },
            { value: "500+", label: "Documents processed" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                flex: 1,
                paddingLeft: i === 0 ? "0" : "40px",
                borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <span style={{ color: "white", fontSize: "26px", fontWeight: 700 }}>{stat.value}</span>
              <span style={{ color: "#64748b", fontSize: "14px" }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
