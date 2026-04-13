"use client";

export type ReviewStage = "uploading" | "extracting" | "analysing" | "generating";

const STAGES: { key: ReviewStage; label: string; detail: string }[] = [
  { key: "uploading",  label: "Uploading",   detail: "Sending documents to secure storage"    },
  { key: "extracting", label: "Extracting",  detail: "Reading document text and structure"    },
  { key: "analysing",  label: "Analysing",   detail: "Running compliance checks with Claude"  },
  { key: "generating", label: "Generating",  detail: "Compiling findings and report"          },
];

export default function ProgressStepper({ stage }: { stage: ReviewStage }) {
  const currentIndex = STAGES.findIndex(s => s.key === stage);

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
      }}
    >
      <div style={{ maxWidth: 380, width: "100%", display: "flex", flexDirection: "column", gap: 36 }}>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--t)", marginBottom: 8 }}>
            Review in progress
          </h2>
          <p style={{ fontSize: 14, color: "var(--t2)" }}>
            {STAGES[currentIndex].detail}
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {STAGES.map((s, i) => {
            const status = i < currentIndex ? "done" : i === currentIndex ? "active" : "pending";

            return (
              <div key={s.key} style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                {/* Dot + connector line */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 24, flexShrink: 0 }}>
                  <div
                    style={{
                      width: 24, height: 24, borderRadius: "50%", flexShrink: 0,
                      background: status !== "pending" ? "var(--accent)" : "var(--sf2)",
                      border: status === "pending" ? "2px solid var(--b2)" : "none",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    {status === "done" ? (
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <path d="M9.5 2.5L4 8L1.5 5.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : status === "active" ? (
                      <div className="stepper-pulse" style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />
                    ) : (
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--t3)" }} />
                    )}
                  </div>
                  {i < STAGES.length - 1 && (
                    <div
                      style={{
                        width: 2, height: 32, marginTop: 2,
                        background: i < currentIndex ? "var(--accent)" : "var(--b2)",
                        transition: "background 0.4s",
                      }}
                    />
                  )}
                </div>

                {/* Label */}
                <div style={{ paddingTop: 3, paddingBottom: i < STAGES.length - 1 ? 32 : 0 }}>
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: status === "active" ? 600 : 400,
                      color: status === "pending" ? "var(--t3)" : "var(--t)",
                      lineHeight: 1.4,
                    }}
                  >
                    {s.label}
                  </p>
                  {status === "active" && (
                    <p style={{ fontSize: 12, color: "var(--t3)", marginTop: 3 }}>{s.detail}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
