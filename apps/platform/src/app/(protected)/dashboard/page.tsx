"use client";

import { useState, useRef } from "react";
import ProgressStepper, { type ReviewStage } from "@/components/ProgressStepper";
import ReviewWorkspace, { type ReviewResult } from "@/components/ReviewWorkspace";

/* ── State machine ──────────────────────────────────────── */

type DashboardState =
  | { status: "idle" }
  | { status: "uploading" | "extracting" | "analysing" | "generating"; artworkName: string; piName: string }
  | { status: "results"; review: ReviewResult };

const STAGE_ORDER: ReviewStage[] = ["uploading", "extracting", "analysing", "generating"];

/* ── Mock result (replace with real API response) ───────── */

const MOCK_RESULT: ReviewResult = {
  productName: "CARDIVEX 10 mg Tablets",
  reviewDate: new Date().toLocaleDateString("en-ZA", { year: "numeric", month: "long", day: "numeric" }),
  artworkFile: "CARDIVEX_artwork_v3.pdf",
  piFile: "CARDIVEX_PI_approved.pdf",
  findings: [
    {
      id: "F-001",
      severity: "critical",
      section: "4.3 Contraindications",
      description:
        "The contraindication for use during pregnancy is stated in PI section 4.3 but is absent from the artwork patient information leaflet. Omission of a contraindication constitutes a critical compliance gap.",
      recommendation:
        "Add the contraindication statement to PIL section 2 using approved wording from PI section 4.3: 'CARDIVEX is contraindicated in pregnancy (see section 4.6).'",
    },
    {
      id: "F-002",
      severity: "major",
      section: "4.1 Therapeutic Indications",
      description:
        "The indication statement on the outer carton reads 'treatment of hypertension' but the approved PI specifies 'management of hypertension and heart failure'. The partial indication may mislead prescribers.",
      recommendation:
        "Update outer carton text to reflect the full approved indication as per PI section 4.1.",
    },
    {
      id: "F-003",
      severity: "minor",
      section: "6.4 Storage",
      description:
        "Storage temperature range on the artwork reads '15–30°C' but PI section 6.4 specifies 'Store below 25°C'. The artwork range exceeds the approved storage condition.",
      recommendation:
        "Align the storage statement on all artwork surfaces with the approved wording in PI section 6.4.",
    },
  ],
  summary: {
    critical: 1,
    major: 1,
    minor: 1,
    overall:
      "Non-compliant — critical findings must be resolved and artwork resubmitted before regulatory approval.",
  },
};

/* ── Page ───────────────────────────────────────────────── */

export default function DashboardPage() {
  const [state, setState] = useState<DashboardState>({ status: "idle" });
  const [showModal, setShowModal] = useState(false);
  const [artwork, setArtwork] = useState<File | null>(null);
  const [pi, setPi] = useState<File | null>(null);

  const canSubmit = artwork !== null && pi !== null;

  const startReview = () => {
    if (!artwork || !pi) return;
    setShowModal(false);

    const artworkName = artwork.name;
    const piName = pi.name;

    // Advance through stages — replace setTimeout calls with real API calls
    let stageIndex = 0;
    const advance = () => {
      const currentStage = STAGE_ORDER[stageIndex];
      setState({ status: currentStage, artworkName, piName });
      stageIndex++;
      if (stageIndex < STAGE_ORDER.length) {
        setTimeout(advance, 2200);
      } else {
        // Final stage shown briefly, then show results
        setTimeout(() => {
          setState({
            status: "results",
            review: {
              ...MOCK_RESULT,
              artworkFile: artworkName,
              piFile: piName,
              reviewDate: new Date().toLocaleDateString("en-ZA", {
                year: "numeric", month: "long", day: "numeric",
              }),
            },
          });
        }, 2200);
      }
    };
    advance();
  };

  const reset = () => {
    setState({ status: "idle" });
    setArtwork(null);
    setPi(null);
  };

  /* ── Results view ── */
  if (state.status === "results") {
    return <ReviewWorkspace review={state.review} onNewReview={reset} />;
  }

  /* ── Progress stepper ── */
  if (
    state.status === "uploading" ||
    state.status === "extracting" ||
    state.status === "analysing" ||
    state.status === "generating"
  ) {
    return <ProgressStepper stage={state.status} />;
  }

  /* ── Idle / empty state ── */
  return (
    <>
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 24px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            maxWidth: 400,
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 56, height: 56,
              background: "rgba(129,140,248,0.10)",
              borderRadius: 16,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="14 2 14 8 20 8" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="12" y1="18" x2="12" y2="12" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="9" y1="15" x2="15" y2="15" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>

          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--t)", marginBottom: 8, lineHeight: 1.3 }}>
              Start a new review
            </h2>
            <p style={{ fontSize: 14, color: "var(--t2)", lineHeight: 1.65 }}>
              Upload the artwork PDF and package insert to begin a compliance review.
              Results are typically ready in 60–90 seconds.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            style={{
              padding: "11px 28px",
              background: "var(--accent)",
              color: "#fff",
              border: "none",
              borderRadius: 9,
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              letterSpacing: "0.01em",
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            Upload documents
          </button>
        </div>
      </div>

      {/* ── Upload modal ── */}
      {showModal && (
        <div
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.55)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 100,
            backdropFilter: "blur(4px)",
          }}
          onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}
        >
          <div
            style={{
              background: "var(--sf)",
              borderRadius: 16,
              padding: "28px",
              width: "100%",
              maxWidth: 460,
              border: "1px solid var(--b2)",
              display: "flex",
              flexDirection: "column",
              gap: 20,
              margin: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--t)", marginBottom: 4 }}>
                  New compliance review
                </h3>
                <p style={{ fontSize: 12, color: "var(--t3)", lineHeight: 1.5 }}>
                  Upload the artwork and package insert. Files are deleted after the review completes.
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--t3)", padding: 2, flexShrink: 0 }}
              >
                <svg width="16" height="16" viewBox="0 0 15 15" fill="none">
                  <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <UploadZone label="Artwork" description="Final artwork — PDF" file={artwork} onChange={setArtwork} />
              <UploadZone label="Package Insert" description="Approved PI / SmPC — PDF" file={pi} onChange={setPi} />
            </div>

            <button
              onClick={startReview}
              disabled={!canSubmit}
              style={{
                padding: "12px",
                background: canSubmit ? "var(--accent)" : "var(--sf2)",
                color: canSubmit ? "#fff" : "var(--t3)",
                border: "none",
                borderRadius: 9,
                fontSize: 14,
                fontWeight: 600,
                cursor: canSubmit ? "pointer" : "not-allowed",
              }}
              onMouseEnter={e => { if (canSubmit) e.currentTarget.style.opacity = "0.85"; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
            >
              Start review
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ── Upload zone ─────────────────────────────────────────── */

function UploadZone({
  label, description, file, onChange,
}: {
  label: string;
  description: string;
  file: File | null;
  onChange: (f: File | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div>
      <p
        style={{
          fontSize: 11, fontWeight: 600, color: "var(--t3)",
          textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6,
        }}
      >
        {label}
      </p>
      <div
        onClick={() => inputRef.current?.click()}
        style={{
          border: "1.5px dashed",
          borderColor: file ? "var(--accent)" : "var(--b2)",
          borderRadius: 10,
          padding: "14px 16px",
          cursor: "pointer",
          display: "flex", alignItems: "center", gap: 12,
          background: file ? "rgba(129,140,248,0.05)" : "transparent",
          transition: "border-color 0.15s",
        }}
      >
        {file ? (
          <>
            <svg width="16" height="16" viewBox="0 0 15 15" fill="none">
              <path d="M7.49991 0.877045C3.84222 0.877045 0.877075 3.84219 0.877075 7.49988C0.877075 11.1575 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1575 14.1227 7.49988C14.1227 3.84219 11.1576 0.877045 7.49991 0.877045ZM10.6708 6.28136C10.8714 6.04755 10.8445 5.69605 10.6107 5.49549C10.3769 5.29494 10.0254 5.32181 9.82484 5.55561L6.92394 8.97396L5.12514 7.2003C4.91341 6.98457 4.5628 6.98457 4.35107 7.2003C4.13934 7.41603 4.13934 7.77107 4.35107 7.9868L6.55757 10.2033C6.66366 10.3099 6.80968 10.3699 6.96068 10.3699C7.1117 10.3699 7.25772 10.3099 7.3638 10.2033L10.6708 6.28136Z" fill="var(--accent)" fillRule="evenodd" clipRule="evenodd" />
            </svg>
            <div style={{ flex: 1, overflow: "hidden" }}>
              <p style={{ fontSize: 13, color: "var(--t)", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {file.name}
              </p>
              <p style={{ fontSize: 11, color: "var(--t3)" }}>
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              onClick={e => { e.stopPropagation(); onChange(null); }}
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--t3)", padding: 2, flexShrink: 0 }}
            >
              <svg width="13" height="13" viewBox="0 0 15 15" fill="currentColor">
                <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fillRule="evenodd" clipRule="evenodd" />
              </svg>
            </button>
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 15 15" fill="none" style={{ color: "var(--t3)", flexShrink: 0 }}>
              <path d="M7.81825 1.18188C7.64251 1.00615 7.35759 1.00615 7.18185 1.18188L4.18185 4.18188C4.00611 4.35762 4.00611 4.64254 4.18185 4.81828C4.35759 4.99401 4.64251 4.99401 4.81825 4.81828L7.05005 2.58648V9.15005C7.05005 9.39858 7.25152 9.60005 7.50005 9.60005C7.74858 9.60005 7.95005 9.39858 7.95005 9.15005V2.58648L10.1819 4.81828C10.3576 4.99401 10.6425 4.99401 10.8182 4.81828C10.9939 4.64254 10.9939 4.35762 10.8182 4.18188L7.81825 1.18188ZM2.5 10C2.5 9.75148 2.29852 9.55001 2.05 9.55001C1.80148 9.55001 1.6 9.75148 1.6 10V12.5C1.6 13.0523 2.04772 13.5 2.6 13.5H12.4C12.9523 13.5 13.4 13.0523 13.4 12.5V10C13.4 9.75148 13.1985 9.55001 12.95 9.55001C12.7015 9.55001 12.5 9.75148 12.5 10V12.5C12.5 12.5553 12.4553 12.6 12.4 12.6H2.6C2.54477 12.6 2.5 12.5553 2.5 12.5V10Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
            </svg>
            <div>
              <p style={{ fontSize: 13, color: "var(--t2)" }}>{description}</p>
              <p style={{ fontSize: 11, color: "var(--t3)" }}>Click to browse</p>
            </div>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          style={{ display: "none" }}
          onChange={e => onChange(e.target.files?.[0] ?? null)}
        />
      </div>
    </div>
  );
}
