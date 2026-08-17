import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { industryCount } from "@/data/industries";

export const alt = "Avidara - Compliance Intelligence for Regulated Industries";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoSvg = await readFile(join(process.cwd(), "public/logo-full-dark-strap.svg"), "utf8");
  const logoDataUri = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "90px",
          background: "linear-gradient(135deg, #0f172a 0%, #151f38 55%, #1e293b 100%)",
        }}
      >
        {/* Glow accents */}
        <div
          style={{
            position: "absolute",
            top: "-180px",
            right: "-140px",
            width: "620px",
            height: "620px",
            borderRadius: "620px",
            background: "radial-gradient(circle, rgba(79,70,229,0.35) 0%, rgba(79,70,229,0) 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-220px",
            left: "-160px",
            width: "560px",
            height: "560px",
            borderRadius: "560px",
            background: "radial-gradient(circle, rgba(16,185,129,0.22) 0%, rgba(16,185,129,0) 70%)",
            display: "flex",
          }}
        />

        {/* Wordmark */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoDataUri} width={264} height={79} alt="Avidara" />


        {/* Tagline */}
        <div
          style={{
            display: "flex",
            marginTop: "28px",
            fontSize: 38,
            fontWeight: 600,
            color: "#e2e8f0",
            maxWidth: "820px",
            lineHeight: 1.25,
          }}
        >
          Compliance intelligence for regulated industries.
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "16px",
            fontSize: 24,
            color: "#94a3b8",
            maxWidth: "760px",
          }}
        >
          Independent external review. Findings before regulators do.
        </div>

        {/* Badge row */}
        <div style={{ display: "flex", gap: "14px", marginTop: "56px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 22px",
              borderRadius: "999px",
              border: "1.5px solid rgba(129,140,248,0.35)",
              background: "rgba(79,70,229,0.14)",
              color: "#c7d2fe",
              fontSize: 22,
              fontWeight: 600,
            }}
          >
            {industryCount} regulated industries
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 22px",
              borderRadius: "999px",
              border: "1.5px solid rgba(148,163,184,0.3)",
              background: "rgba(148,163,184,0.08)",
              color: "#cbd5e1",
              fontSize: 22,
              fontWeight: 600,
            }}
          >
            South Africa
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
