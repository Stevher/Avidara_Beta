"use client";

// ── Brand tokens ──────────────────────────────────────────────
const IN = "#4f46e5";
const IDK = "#4338ca";
const EM = "#10b981";
const BT = "#101828";
const MT = "#6B7B8D";
const BL = "#D0D4E8";
const RA = "#f8f9fc";
const CR = "#C0392B";
const OR = "#D4660A";
const SL = "#5A6880";

type Sev = "critical" | "major" | "minor";
const SC: Record<Sev, string> = { critical: CR, major: OR, minor: SL };
const SB: Record<Sev, string> = { critical: "#FDEEEC", major: "#FEF9E7", minor: "#EFF1F3" };

const META = {
  product: "Cardivex 5 mg",
  subtitle: "Amlodipine besylate 5 mg tablets · Novus Pharma (Pty) Ltd · S3",
  docRef: "2941657892",
  piRef: "CARD-PI-2024/01",
  date: "11 April 2026",
  version: "1.0 — Initial Review",
};

const OVERVIEW: [string, string][] = [
  ["Artwork Document", "Cardivex 5 mg — Promotional Patient Leave-Behind A5 Leaflet"],
  ["Document Reference", "2941657892"],
  ["Product", "Cardivex 5 mg (Amlodipine besylate 5 mg tablets)"],
  ["Scheduling Status", "S3"],
  ["Registration Number", "35/4.2/0098"],
  ["Format", "A5 leave-behind, 2 pages (front and reverse)"],
  ["MAH / PI Holder", "Novus Pharma (Pty) Ltd, 14 Acacia Road, Sandton, Johannesburg, 2196, RSA"],
  ["Reference PI", "CARD-PI-2024/01 — SAHPRA-approved (March 2024)"],
  ["Intended Audience", "Healthcare professionals (HCPs) — promotional leave-behind"],
  ["Review Date", "11 April 2026"],
  ["Review Version", "1.0 — Initial Review"],
];

type Finding = { sev: Sev; title: string; location: string; obs: string; piRef: string; rec: string };

const FINDINGS: Finding[] = [
  { sev: "critical", title: "Scheduling Declaration Absent from Front Cover",
    location: "Front cover — scheduling box area",
    obs: "The front cover does not display the S3 scheduling declaration. Schedule 3 medicines must carry the scheduling statement prominently on the front face in the prescribed box format per GN R510 Reg 11(1)(a). Omission constitutes a fundamental labelling non-compliance that blocks regulatory approval.",
    piRef: "PI §5 / GN R510 Reg 11(1)(a): The scheduling status must be displayed on the front panel in the prescribed box.",
    rec: 'Add the scheduling declaration "S3 PHARMACIST ONLY MEDICINE" to the front cover in the required box format with the prescribed minimum dimensions. Artwork cannot be approved for distribution without this element.' },
  { sev: "critical", title: "INN Prominence Ratio Non-Compliant — 1:4 vs Required 1:2",
    location: "Front cover — product name area",
    obs: 'The proprietary name "Cardivex" appears at 24pt while the INN "amlodipine" is rendered at 6pt — a ratio of 1:4. SAHPRA regulations (GN R510 Reg 9(1)) require the INN to appear at a minimum prominence ratio of 1:2 relative to the proprietary name.',
    piRef: "PI §5.1 / GN R510 Reg 9(1): The non-proprietary name must appear with at least half the prominence of the proprietary name.",
    rec: 'Increase "amlodipine" to a minimum of 12pt, or reduce the proprietary name until both are at equal prominence. Confirm final sizes with the regulatory team before artwork sign-off.' },
  { sev: "major", title: "Storage Temperature Deviates from Registered PI",
    location: "Back panel — storage section",
    obs: 'The leaflet states "Store below 30°C in a dry place." The SAHPRA-approved PI §6.4 specifies "Store below 25°C. Protect from light and moisture." Both the temperature ceiling and the light-protection requirement deviate from the registered storage statement.',
    piRef: "PI §6.4: Store below 25°C. Protect from light and moisture.",
    rec: 'Replace with the verbatim PI storage statement: "Store below 25°C. Protect from light and moisture." Do not paraphrase or approximate registered storage conditions.' },
  { sev: "major", title: "Missed Dose Instruction Absent",
    location: "Page 2 — Dosage and directions section",
    obs: "No instruction is provided for a missed dose. The SAHPRA-approved PI §4.2 includes a specific missed dose statement. Its absence may lead patients to double-dose or to seek incorrect guidance at point of dispensing.",
    piRef: "PI §4.2: If you forget to take Cardivex, take the next dose at the usual time. Do not take a double dose.",
    rec: "Add the missed dose instruction verbatim from PI §4.2. Ensure it is placed immediately after the standard dosage directions, in the same typeface and prominence." },
  { sev: "major", title: "Pregnancy Contraindication and Category Omitted",
    location: "Page 2 — Contraindications section",
    obs: "Pregnancy is listed as a contraindication in the SAHPRA-approved PI §4.3, and Pregnancy Category C appears in §4.6. Neither element appears in the leaflet. Omission of pregnancy risk information from a patient-facing document is a safety concern and a regulatory gap.",
    piRef: "PI §4.3 / §4.6: Cardivex is contraindicated in pregnancy. Pregnancy Category C.",
    rec: "Add the pregnancy contraindication per PI §4.3 and include the Pregnancy Category C notation per §4.6. Wording must be reviewed by the MAH medical/regulatory team before approval." },
  { sev: "major", title: "Disposal Instruction Absent",
    location: "Back panel — general information",
    obs: "No instruction for disposal of unused or expired medicine is included. GN R510 Reg 18 requires patient-facing materials to carry a disposal statement. Its absence may attract a SAHPRA deficiency query.",
    piRef: "GN R510 Reg 18 / National Environmental Management: Waste Act Reg 30.",
    rec: 'Add: "Do not dispose of medicines via wastewater or household waste. Ask your pharmacist how to dispose of medicines you no longer need."' },
  { sev: "minor", title: "Batch Number and Expiry Date Order Reversed",
    location: "Back panel — batch/expiry area",
    obs: "The expiry date field is printed before the batch number field. GN R510 Reg 11(1)(g)–(h) places the batch number before the expiry date. SAHPRA reviewers may raise this as a query during formal review.",
    piRef: "GN R510 Reg 11(1)(g)–(h): Batch number precedes expiry date in the prescribed order.",
    rec: 'Swap to place "Batch No:" before "Expiry Date:" in the back panel layout. No other changes to the panel are required.' },
  { sev: "minor", title: "Registration Number Format Non-Standard",
    location: "Back panel — registration details",
    obs: 'The registration number is displayed as "REG NO: CARD5/2022" rather than the standard SAHPRA format (e.g., 35/4.2/0098). The "REG NO:" prefix is not part of the approved registration number.',
    piRef: "SAHPRA Labelling Guidelines §3: Registration numbers must appear in the approved format without prefix.",
    rec: 'Remove the "REG NO:" prefix and display the number as "35/4.2/0098" only. Verify against the current registration certificate.' },
];

// ── Helper components ─────────────────────────────────────────
function Pill({ sev }: { sev: Sev }) {
  return (
    <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 8,
      background: SB[sev], color: SC[sev], border: `1px solid ${SC[sev]}`,
      whiteSpace: "nowrap", letterSpacing: "0.05em" }}>
      {sev.toUpperCase()}
    </span>
  );
}

function SectionHead({ n, title }: { n: string; title: string }) {
  return (
    <div style={{ marginTop: 32, marginBottom: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <span style={{ background: IN, color: "#fff", fontSize: 10, fontWeight: 700,
          padding: "2px 7px", borderRadius: 3, letterSpacing: "0.05em" }}>{n}</span>
        <span style={{ fontSize: 15, fontWeight: 700, color: IN }}>{title}</span>
      </div>
      <div style={{ height: 2, background: `linear-gradient(to right, ${EM} 20%, #d1fae5 70%, transparent)` }} />
    </div>
  );
}

function SubLabel({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 8, fontWeight: 700,
      letterSpacing: "0.09em", textTransform: "uppercase" as const, color: MT, marginBottom: 4 }}>
      {text}
      <div style={{ flex: 1, borderTop: `1px solid ${BL}` }} />
    </div>
  );
}

// ── Main component ────────────────────────────────────────────
export default function SampleReportClient() {
  const nC = FINDINGS.filter(f => f.sev === "critical").length;
  const nM = FINDINGS.filter(f => f.sev === "major").length;
  const nN = FINDINGS.filter(f => f.sev === "minor").length;
  const sevLabels: Record<Sev, string> = {
    critical: "Critical Findings — Mandatory Corrections (must resolve before release)",
    major: "Major Findings — Required Corrections (must resolve before release)",
    minor: "Minor Findings — Recommended Improvements",
  };

  return (
    <>
      {/* Top bar */}
      <div className="no-print" style={{ position: "sticky", top: 0, zIndex: 50, display: "flex",
        alignItems: "center", justifyContent: "space-between", padding: "10px 24px",
        backgroundColor: "#0f172a", borderBottom: "1px solid #1e293b" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a href="/" style={{ color: "#64748b", fontSize: 12, textDecoration: "none" }}>← avidara.co.za</a>
          <span style={{ color: "#334155" }}>|</span>
          <span style={{ color: "#94a3b8", fontSize: 12, fontWeight: 600 }}>Sample Report</span>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <a href="/#book" style={{ background: IN, color: "#fff", padding: "8px 16px",
            borderRadius: 8, fontSize: 12, fontWeight: 600, textDecoration: "none" }}>Book your review →</a>
          <button onClick={() => window.print()} style={{ background: "#1e293b", color: "#94a3b8",
            border: "1px solid #334155", padding: "8px 16px", borderRadius: 8, fontSize: 12, cursor: "pointer" }}>
            ⬇ Download PDF
          </button>
        </div>
      </div>

      {/* Page wrapper */}
      <div style={{ background: "#f1f5f9", minHeight: "100vh", padding: "40px 24px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", background: "#fff",
          borderRadius: 8, boxShadow: "0 4px 24px rgba(0,0,0,.08)", overflow: "hidden" }}>

          {/* Running header */}
          <div style={{ borderBottom: `2px solid ${IN}`, padding: "10px 24px",
            display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: IN, letterSpacing: "0.06em" }}>
              AVIDARA · COMPLIANCE INTELLIGENCE · ARTWORK REVIEW
            </span>
            <span style={{ fontSize: 11, color: MT }}>{META.product} [{META.docRef}]</span>
          </div>

          {/* Title block */}
          <div style={{ background: IN }}>
            <div style={{ padding: "20px 24px 12px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.12em", color: "#a5b4fc",
                  textTransform: "uppercase" as const, marginBottom: 6 }}>Artwork Review Report</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{META.product}</div>
                <div style={{ fontSize: 11, color: "#c7d2fe" }}>{META.subtitle}</div>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-full-dark-strap.svg" alt="Avidara"
                style={{ height: 38, filter: "brightness(0) invert(1)", marginTop: 4 }} />
            </div>
            <div style={{ padding: "0 24px 10px" }}>
              <span style={{ display: "inline-block", fontSize: 9, fontWeight: 700, color: "#fca5a5",
                border: "1px solid #fca5a5", borderRadius: 3, padding: "2px 8px" }}>
                ⚠ Findings Identified — Not Approved for Release
              </span>
            </div>
            <div style={{ background: IDK, padding: "8px 24px", display: "flex", gap: 24, flexWrap: "wrap" as const }}>
              {[["Doc ref", META.docRef], ["Date", META.date], ["Version", META.version], ["PI", META.piRef]].map(([l, v]) => (
                <span key={l} style={{ fontSize: 10, color: "#a5b4fc" }}>
                  {l}: <strong style={{ color: "#e0e7ff", fontWeight: 500 }}>{v}</strong>
                </span>
              ))}
            </div>
          </div>

          {/* Content padding wrapper */}
          <div style={{ padding: "0 24px 32px" }}>

            {/* Stats banner */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10, margin: "16px 0" }}>
              {[
                { label: "PRODUCT", val: META.product, sub: "Amlodipine besylate 5 mg tablets", top: IN },
                { label: "ARTWORK REVIEWED", val: "Patient Leave-Behind A5", sub: `Ref ${META.docRef} · 2 pages`, top: IN },
                { label: "REFERENCE PI", val: META.piRef, sub: "SAHPRA-approved", top: IN },
                { label: "REVIEW OUTCOME", val: "Not Approved for Release", sub: `${nC} critical · ${nM} major · ${nN} minor`, top: CR },
              ].map((c) => (
                <div key={c.label} style={{ background: RA, border: `1px solid ${BL}`,
                  borderRadius: 5, padding: 10, borderTop: `3px solid ${c.top}` }}>
                  <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.08em", color: MT,
                    textTransform: "uppercase" as const, marginBottom: 4 }}>{c.label}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: c.top === CR ? CR : BT,
                    marginBottom: 2, lineHeight: 1.2 }}>{c.val}</div>
                  <div style={{ fontSize: 9, color: MT }}>{c.sub}</div>
                </div>
              ))}
            </div>

            {/* 01 Executive Summary */}
            <SectionHead n="01" title="Executive Summary" />
            <p style={{ fontSize: 13, color: BT, lineHeight: 1.7, margin: "0 0 10px" }}>
              This Artwork Review Report was prepared by Avidara for {META.product} (Document Reference: {META.docRef}). The artwork was reviewed against the SAHPRA-approved Professional Information (PI, {META.piRef}).
            </p>
            <p style={{ fontSize: 13, color: BT, lineHeight: 1.7, margin: "0 0 10px" }}>
              A total of {FINDINGS.length} findings were identified: {nC} Critical, {nM} Major, and {nN} Minor. Critical findings require immediate correction before this artwork may be released.
            </p>
            <p style={{ fontSize: 13, color: BT, lineHeight: 1.7, margin: "0 0 14px" }}>
              Avidara&apos;s role is to flag, analyse, and report. The client team reviews all findings, makes them their own, and bears full regulatory accountability for everything acted upon.
            </p>
            <div style={{ background: "#fef2f2", borderLeft: "3px solid #dc2626",
              borderRadius: "0 4px 4px 0", padding: "10px 14px", fontSize: 12, color: "#dc2626", lineHeight: 1.6 }}>
              This artwork is <strong>NOT APPROVED FOR RELEASE</strong> in its current form. All Critical and Major findings must be corrected and the revised artwork resubmitted to Avidara for formal re-review before any distribution to healthcare professionals.
            </div>

            {/* 02 Finding Summary */}
            <SectionHead n="02" title="Finding Summary" />
            <div style={{ border: `1px solid ${BL}`, borderRadius: 5, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                <thead>
                  <tr style={{ background: RA }}>
                    {["#", "Severity", "Finding", "PI Reference", "Location"].map(h => (
                      <th key={h} style={{ padding: "8px 10px", textAlign: "left", fontSize: 9,
                        fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase" as const,
                        color: MT, borderBottom: `1px solid ${BL}` }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {FINDINGS.map((f, i) => (
                    <tr key={i} style={{ background: i % 2 === 1 ? RA : "#fff" }}>
                      <td style={{ padding: "8px 10px", fontWeight: 700, color: IN, borderBottom: `1px solid ${BL}`, width: 24 }}>{i + 1}</td>
                      <td style={{ padding: "8px 10px", borderBottom: `1px solid ${BL}`, width: 80 }}><Pill sev={f.sev} /></td>
                      <td style={{ padding: "8px 10px", color: BT, borderBottom: `1px solid ${BL}` }}>{f.title}</td>
                      <td style={{ padding: "8px 10px", color: MT, borderBottom: `1px solid ${BL}`, width: 90, fontSize: 10 }}>{f.piRef.split(":")[0].trim()}</td>
                      <td style={{ padding: "8px 10px", color: MT, borderBottom: `1px solid ${BL}`, width: 110, fontSize: 10 }}>{f.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 03 Document Overview */}
            <SectionHead n="03" title="Document Overview" />
            <div style={{ border: `1px solid ${BL}`, borderRadius: 5, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <tbody>
                  {OVERVIEW.map(([label, value], i) => (
                    <tr key={i} style={{ background: i % 2 === 1 ? RA : "#fff" }}>
                      <td style={{ padding: "8px 12px", fontWeight: 700, color: IN, width: "32%",
                        borderBottom: i < OVERVIEW.length - 1 ? `1px solid ${BL}` : "none" }}>{label}</td>
                      <td style={{ padding: "8px 12px", color: BT,
                        borderBottom: i < OVERVIEW.length - 1 ? `1px solid ${BL}` : "none" }}>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 04 Detailed Findings */}
            <SectionHead n="04" title="Detailed Findings" />
            {FINDINGS.map((f, i) => (
              <div key={i} style={{ border: `1px solid ${BL}`, borderLeft: `3px solid ${SC[f.sev]}`,
                borderRadius: "0 5px 5px 0", marginBottom: 12, pageBreakInside: "avoid" as const }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 14px",
                  background: "#fff", borderBottom: `1px solid ${BL}` }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: IN, minWidth: 22, flexShrink: 0 }}>F{i + 1}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3, flexWrap: "wrap" as const }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: BT }}>{f.title}</span>
                      <Pill sev={f.sev} />
                    </div>
                    <div style={{ fontSize: 10, color: MT }}>{f.location}</div>
                  </div>
                </div>
                <div style={{ padding: "10px 14px 10px 36px", background: RA }}>
                  <div style={{ marginBottom: 10 }}>
                    <SubLabel text="Observation" />
                    <div style={{ fontSize: 11, color: BT, lineHeight: 1.6 }}>{f.obs}</div>
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <SubLabel text="PI / PIL Reference" />
                    <div style={{ fontSize: 11, color: MT, lineHeight: 1.6 }}>{f.piRef}</div>
                  </div>
                  <div>
                    <SubLabel text="Recommendation" />
                    <div style={{ fontSize: 11, color: BT, lineHeight: 1.6 }}>{f.rec}</div>
                  </div>
                </div>
              </div>
            ))}

            {/* 05 Recommendations */}
            <SectionHead n="05" title="Recommendations" />
            <p style={{ fontSize: 13, color: BT, lineHeight: 1.7, margin: "0 0 12px" }}>
              The following actions are required before this promotional material may be approved for distribution to healthcare professionals.
            </p>
            {(["critical", "major", "minor"] as Sev[]).map(sev => {
              const items = FINDINGS.map((f, i) => ({ f, i })).filter(({ f }) => f.sev === sev);
              if (!items.length) return null;
              return (
                <div key={sev} style={{ border: `1px solid ${BL}`, borderRadius: 5, overflow: "hidden", marginBottom: 10 }}>
                  <div style={{ padding: "7px 12px", fontSize: 9, fontWeight: 700, letterSpacing: "0.07em",
                    textTransform: "uppercase" as const, color: "#fff", background: SC[sev] }}>
                    {sevLabels[sev]}
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {items.map(({ f, i }) => (
                      <li key={i} style={{ padding: "8px 12px 8px 24px", borderBottom: `1px solid ${BL}`,
                        fontSize: 11, color: BT, lineHeight: 1.6, position: "relative" }}>
                        <span style={{ position: "absolute", left: 8, color: IN, fontWeight: 700 }}>→</span>
                        <strong>F{i + 1}:</strong> {f.rec}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
            <div style={{ background: "#fef2f2", borderLeft: "3px solid #dc2626",
              borderRadius: "0 4px 4px 0", padding: "10px 14px", fontSize: 12, color: "#dc2626", lineHeight: 1.6, marginBottom: 4 }}>
              Following correction of all Critical and Major findings, the revised artwork must be resubmitted to Avidara for formal re-review and sign-off before any distribution to healthcare professionals.
            </div>

            {/* 06 Sign-Off */}
            <SectionHead n="06" title="Sign-Off" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
              {[
                { label: "Reviewed By", val: "Avidara (Pty) Ltd", sub: "Compliance Intelligence", c: IN },
                { label: "Review Date", val: META.date, sub: `Version ${META.version}`, c: BT },
                { label: "Outcome", val: "Not Approved for Release", sub: `${nC} critical · ${nM} major · ${nN} minor`, c: CR },
              ].map(card => (
                <div key={card.label} style={{ background: RA, border: `1px solid ${BL}`, borderRadius: 5, padding: 12 }}>
                  <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.08em",
                    textTransform: "uppercase" as const, color: MT, marginBottom: 4 }}>{card.label}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: card.c, marginBottom: 2 }}>{card.val}</div>
                  <div style={{ fontSize: 10, color: MT }}>{card.sub}</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 11, color: MT, lineHeight: 1.7, margin: "0 0 8px" }}>
              The findings and recommendations herein are based solely on the SAHPRA-approved PI ({META.piRef}) as provided for this review. Avidara flags, analyses, and reports. The client team reviews all findings, makes them their own, and bears full legal and regulatory accountability for everything acted upon. This report does not constitute legal or regulatory advice.
            </p>
            <p style={{ fontSize: 10, color: "#cbd5e1", lineHeight: 1.6, fontStyle: "italic", margin: 0 }}>
              This is a sample report for demonstration purposes only. The product name, findings, and references are fictitious and do not represent a real regulatory submission.
            </p>
          </div>

          {/* Document footer */}
          <div style={{ borderTop: `1px solid ${BL}`, padding: "14px 24px",
            display: "flex", justifyContent: "space-between", alignItems: "center", background: RA }}>
            <span style={{ fontSize: 10, color: MT }}>Confidential · Avidara (Pty) Ltd · Compliance Intelligence</span>
            <span style={{ fontSize: 10, color: MT }}>Sample Report — AVI-DEMO-2026</span>
          </div>
        </div>

        {/* Below-doc CTA */}
        <div className="no-print" style={{ maxWidth: 860, margin: "28px auto 0", textAlign: "center" }}>
          <p style={{ color: "#64748b", marginBottom: 14 }}>Ready to get a real report for your documents?</p>
          <a href="/#book" style={{ display: "inline-flex", alignItems: "center", gap: 8,
            background: IN, color: "#fff", padding: "14px 28px", borderRadius: 12,
            fontSize: 14, fontWeight: 600, textDecoration: "none",
            boxShadow: "0 4px 20px rgba(79,70,229,.35)" }}>
            Book a Document Review →
          </a>
        </div>
      </div>

      <style>{`
        @media print { .no-print { display: none !important; } body { background: white; } }
        @page { size: A4; margin: 1.5cm; }
      `}</style>
    </>
  );
}
