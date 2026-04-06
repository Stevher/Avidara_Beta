import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Avidara — Compliance Intelligence";
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
          backgroundColor: "#0f172a",
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
              "linear-gradient(rgba(226,232,240,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(226,232,240,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            left: "60px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(79,70,229,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", zIndex: 10 }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "10px",
              backgroundColor: "#4f46e5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="28" height="28" viewBox="0 0 44 44" fill="none">
              <polygon points="9,11 17,11 23,31 18,31" fill="white" />
              <polygon points="23,31 28,31 37,11 32,11" fill="#10b981" />
            </svg>
          </div>
          <span style={{ color: "white", fontSize: "24px", fontWeight: 700, letterSpacing: "-0.5px" }}>
            Avidara
          </span>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", zIndex: 10, maxWidth: "800px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "rgba(16,185,129,0.1)",
              border: "1px solid rgba(16,185,129,0.25)",
              borderRadius: "100px",
              padding: "6px 16px",
              width: "fit-content",
            }}
          >
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#10b981" }} />
            <span style={{ color: "#34d399", fontSize: "14px", fontWeight: 600 }}>
              Compliance Intelligence Platform
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span style={{ color: "white", fontSize: "62px", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-2px" }}>
              Your compliance layer.
            </span>
            <span style={{ fontSize: "62px", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-2px", color: "#818cf8" }}>
              Independent, intelligent, precise.
            </span>
          </div>

          <span style={{ color: "#64748b", fontSize: "20px", lineHeight: 1.5 }}>
            Avidara stands outside every industry it serves, finding what internal teams miss, before regulators do.
          </span>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            zIndex: 10,
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "28px",
            width: "100%",
            gap: "0px",
          }}
        >
          {[
            { value: "Minutes", label: "Report delivery" },
            { value: "6+", label: "Regulatory rulesets" },
            { value: "100%", label: "Client accountability" },
            { value: "Zero", label: "Compliance gaps" },
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
              <span style={{ color: "white", fontSize: "24px", fontWeight: 700 }}>{stat.value}</span>
              <span style={{ color: "#475569", fontSize: "13px" }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
