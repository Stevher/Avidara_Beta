"use client";

import FindingCard, { type Finding } from "./FindingCard";

export interface ReviewResult {
  productName: string;
  reviewDate: string;
  artworkFile: string;
  piFile: string;
  findings: Finding[];
  summary: {
    critical: number;
    major: number;
    minor: number;
    overall: string;
  };
}

export default function ReviewWorkspace({
  review,
  onNewReview,
}: {
  review: ReviewResult;
  onNewReview: () => void;
}) {
  const verdictColor =
    review.summary.critical > 0 ? "var(--crit-c)"
    : review.summary.major > 0 ? "var(--maj-c)"
    : "var(--green)";

  const verdictBg =
    review.summary.critical > 0 ? "var(--crit-bg)"
    : review.summary.major > 0 ? "var(--maj-bg)"
    : "rgba(52,211,153,0.08)";

  const sortedFindings = [
    ...review.findings.filter(f => f.severity === "critical"),
    ...review.findings.filter(f => f.severity === "major"),
    ...review.findings.filter(f => f.severity === "minor"),
  ];

  return (
    <div style={{ height: "100%", display: "flex", overflow: "hidden" }}>

      {/* ── Left panel — overview ─────────────────────────── */}
      <aside
        style={{
          width: 300,
          minWidth: 280,
          maxWidth: 320,
          background: "var(--sf)",
          borderRight: "1px solid var(--b2)",
          padding: "24px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 22,
          overflow: "auto",
          flexShrink: 0,
        }}
      >
        {/* Product */}
        <div>
          <Label>Product</Label>
          <p style={{ fontSize: 15, fontWeight: 700, color: "var(--t)", lineHeight: 1.3 }}>
            {review.productName}
          </p>
          <p style={{ fontSize: 12, color: "var(--t3)", marginTop: 4 }}>{review.reviewDate}</p>
        </div>

        {/* Documents */}
        <div>
          <Label>Documents reviewed</Label>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            <FileRow tag="Artwork" name={review.artworkFile} />
            <FileRow tag="PI" name={review.piFile} />
          </div>
        </div>

        {/* Finding counts */}
        <div>
          <Label>Findings</Label>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {review.summary.critical > 0 && (
              <CountRow label="Critical" count={review.summary.critical} color="var(--crit-c)" bg="var(--crit-bg)" />
            )}
            {review.summary.major > 0 && (
              <CountRow label="Major" count={review.summary.major} color="var(--maj-c)" bg="var(--maj-bg)" />
            )}
            {review.summary.minor > 0 && (
              <CountRow label="Minor" count={review.summary.minor} color="var(--min-c)" bg="var(--min-bg)" />
            )}
            {sortedFindings.length === 0 && (
              <p style={{ fontSize: 13, color: "var(--green)", fontWeight: 600 }}>
                No findings — compliant
              </p>
            )}
          </div>
        </div>

        {/* Verdict */}
        <div
          style={{
            padding: "12px 14px",
            background: verdictBg,
            borderRadius: 10,
            borderLeft: `3px solid ${verdictColor}`,
          }}
        >
          <p style={{ fontSize: 12, color: "var(--t2)", lineHeight: 1.6 }}>
            {review.summary.overall}
          </p>
        </div>

        <div style={{ flex: 1 }} />

        {/* Actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <button
            onClick={() => window.print()}
            style={{
              padding: "10px 16px",
              background: "var(--accent)",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
              <path d="M3.5 2C3.22386 2 3 2.22386 3 2.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V4.70711L9.29289 2H3.5ZM2 2.5C2 1.67157 2.67157 1 3.5 1H9.5C9.63261 1 9.75979 1.05268 9.85355 1.14645L12.8536 4.14645C12.9473 4.24021 13 4.36739 13 4.5V12.5C13 13.3284 12.3284 14 11.5 14H3.5C2.67157 14 2 13.3284 2 12.5V2.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
            </svg>
            Download PDF
          </button>
          <button
            onClick={onNewReview}
            style={{
              padding: "10px 16px",
              background: "transparent",
              color: "var(--t2)",
              border: "1px solid var(--b2)",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              transition: "border-color 0.15s",
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--accent)")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--b2)")}
          >
            New review
          </button>
        </div>
      </aside>

      {/* ── Right panel — findings ──────────────────────────── */}
      <div style={{ flex: 1, overflow: "auto", padding: "28px 28px" }}>
        <div style={{ maxWidth: 680 }}>
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--t)", marginBottom: 4 }}>
              Compliance Findings
            </h2>
            <p style={{ fontSize: 13, color: "var(--t3)" }}>
              {sortedFindings.length} finding{sortedFindings.length !== 1 ? "s" : ""} identified
            </p>
          </div>

          {sortedFindings.length === 0 ? (
            <div
              style={{
                padding: "40px",
                border: "1px solid var(--b2)",
                borderRadius: 12,
                textAlign: "center",
              }}
            >
              <p style={{ fontSize: 15, fontWeight: 600, color: "var(--green)", marginBottom: 8 }}>
                No findings
              </p>
              <p style={{ fontSize: 13, color: "var(--t3)" }}>
                The artwork is compliant with the package insert.
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {sortedFindings.map(f => (
                <FindingCard key={f.id} finding={f} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Local helpers ───────────────────────────────────────── */

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: 11, fontWeight: 600, color: "var(--t3)",
        textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 7,
      }}
    >
      {children}
    </p>
  );
}

function FileRow({ tag, name }: { tag: string; name: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
      <span
        style={{
          fontSize: 10, fontWeight: 700, color: "var(--t3)",
          background: "var(--sf2)", borderRadius: 4, padding: "2px 6px",
          marginTop: 1, flexShrink: 0,
        }}
      >
        {tag}
      </span>
      <span style={{ fontSize: 12, color: "var(--t2)", lineHeight: 1.4, wordBreak: "break-all" }}>
        {name}
      </span>
    </div>
  );
}

function CountRow({
  label, count, color, bg,
}: {
  label: string; count: number; color: string; bg: string;
}) {
  return (
    <div
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "8px 12px", background: bg, borderRadius: 8,
      }}
    >
      <span style={{ fontSize: 13, fontWeight: 500, color }}>{label}</span>
      <span style={{ fontSize: 14, fontWeight: 700, color }}>{count}</span>
    </div>
  );
}
