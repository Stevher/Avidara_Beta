export type FindingSeverity = "critical" | "major" | "minor";

export interface Finding {
  id: string;
  severity: FindingSeverity;
  section: string;
  description: string;
  recommendation: string;
}

const SEVERITY: Record<FindingSeverity, { label: string; color: string; bg: string }> = {
  critical: { label: "Critical", color: "var(--crit-c)", bg: "var(--crit-bg)" },
  major:    { label: "Major",    color: "var(--maj-c)",  bg: "var(--maj-bg)"  },
  minor:    { label: "Minor",    color: "var(--min-c)",  bg: "var(--min-bg)"  },
};

export default function FindingCard({ finding }: { finding: Finding }) {
  const cfg = SEVERITY[finding.severity];

  return (
    <div
      style={{
        background: "var(--sf)",
        border: "1px solid var(--b2)",
        borderRadius: 12,
        padding: "18px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <span
          style={{
            display: "inline-flex", alignItems: "center",
            padding: "3px 9px", borderRadius: 5,
            background: cfg.bg, color: cfg.color,
            fontSize: 11, fontWeight: 700,
            textTransform: "uppercase", letterSpacing: "0.06em",
          }}
        >
          {cfg.label}
        </span>
        <span style={{ fontSize: 12, color: "var(--t3)", fontFamily: "monospace" }}>
          {finding.id}
        </span>
        <span
          style={{
            fontSize: 12, color: "var(--t3)",
            marginLeft: "auto",
            textAlign: "right",
            fontStyle: "italic",
          }}
        >
          {finding.section}
        </span>
      </div>

      {/* Description */}
      <div>
        <p
          style={{
            fontSize: 11, fontWeight: 600, color: "var(--t3)",
            textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 5,
          }}
        >
          Finding
        </p>
        <p style={{ fontSize: 13, color: "var(--t)", lineHeight: 1.65 }}>
          {finding.description}
        </p>
      </div>

      {/* Recommendation */}
      <div style={{ borderTop: "1px solid var(--b)", paddingTop: 14 }}>
        <p
          style={{
            fontSize: 11, fontWeight: 600, color: "var(--t3)",
            textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 5,
          }}
        >
          Recommendation
        </p>
        <p style={{ fontSize: 13, color: "var(--t2)", lineHeight: 1.65 }}>
          {finding.recommendation}
        </p>
      </div>
    </div>
  );
}
