"use client";

const SEV = {
  Critical: { bg: "#fef2f2", border: "#fecaca", badge: "#ef4444", text: "#991b1b" },
  Major:    { bg: "#fffbeb", border: "#fde68a", badge: "#f59e0b", text: "#92400e" },
  Minor:    { bg: "#f0fdf4", border: "#bbf7d0", badge: "#22c55e", text: "#166534" },
} as const;

const findings = [
  {
    id: "F-001",
    sev: "Critical" as const,
    title: "Scheduling statement absent from front panel",
    location: "Front panel — scheduling box",
    reference: "GN R510 of 2017 — Regulations Relating to the Labelling and Advertising of Medicines, Reg 11(1)(a); MCA Code v18, Clause 12.2",
    description:
      "The front panel of the carton does not carry the mandatory scheduling statement in the required scheduling box format. Schedule 4 medicines must display the scheduling statement prominently on the front panel in the prescribed box. The current artwork omits this element entirely.",
    recommendation:
      "Add the scheduling box to the front panel with the exact wording prescribed in GN R510: 'S4 PHARMACIST INITIATED MEDICINE'. The box must meet the minimum size requirements and be placed in a position of prominence on the front panel. Artwork cannot proceed to print without this element.",
  },
  {
    id: "F-002",
    sev: "Major" as const,
    title: "INN displayed at smaller font size than proprietary name",
    location: "Front panel — product name area",
    reference: "GN R510 of 2017, Reg 9(1); MCA Code v18, Clause 7.1",
    description:
      "The International Non-proprietary Name (INN) 'amlodipine' is displayed at 6pt on the front panel. The proprietary name 'Cardivex' is displayed at 18pt. Regulations require the INN to appear with at least equal prominence to the proprietary name. The current ratio (1:3) is non-compliant.",
    recommendation:
      "Increase the INN font size to at least match the proprietary name, or reduce the proprietary name to a size where both are equal. Alternatively, adopt the approach of placing the INN immediately below the proprietary name at 100% of its font size. Confirm final sizes with your regulatory team before artwork sign-off.",
  },
  {
    id: "F-003",
    sev: "Major" as const,
    title: "Storage condition stated as descriptor — temperature range required",
    location: "Side panel — storage conditions",
    reference: "GN R510 of 2017, Reg 15(1)(f); ICH Q1A(R2)",
    description:
      "The storage condition on the side panel reads 'Store in a cool, dry place'. Vague descriptors are not accepted by SAHPRA — the approved storage condition per the registration certificate is 'Store below 25°C. Protect from moisture.' Both elements (temperature ceiling and moisture protection) must appear verbatim.",
    recommendation:
      "Replace the current storage statement with: 'Store below 25°C. Protect from moisture.' If the registration certificate specifies different conditions, use those exactly. Do not paraphrase or use synonyms for registered storage statements.",
  },
  {
    id: "F-004",
    sev: "Minor" as const,
    title: "Batch number and expiry date fields swapped in position",
    location: "Base panel — batch/expiry area",
    reference: "GN R510 of 2017, Reg 11(1)(g)–(h)",
    description:
      "The expiry date field appears before the batch number field on the base panel. While both elements are present, the conventional and expected order (batch number first, expiry date second) is reversed. This is not a critical deficiency but may attract a query during review.",
    recommendation:
      "Reorder to place the batch number field before the expiry date field. Label: 'Batch No:' followed by 'Expiry Date:'. This follows the order specified in Regulation 11(1)(g)–(h) and the presentation expected by SAHPRA reviewers.",
  },
  {
    id: "F-005",
    sev: "Minor" as const,
    title: "Disposal instruction absent from patient-facing panel",
    location: "Inner flap — patient instructions",
    reference: "GN R510 of 2017, Reg 18; SAHPRA Guidance on Waste Disposal",
    description:
      "The carton does not carry a disposal instruction for unused or expired medicine. While this is not always enforced as a critical deficiency on secondary packaging, SAHPRA's guidance recommends its inclusion on patient-facing materials and it is mandatory on the PIL.",
    recommendation:
      "Add a brief disposal statement to the inner flap or a suitable panel: 'Do not dispose of medicines via wastewater or household waste. Ask your pharmacist how to dispose of medicines you no longer need.' Confirm PIL carries equivalent wording.",
  },
  {
    id: "F-006",
    sev: "Minor" as const,
    title: "Registration number format non-standard",
    location: "Side panel — registration details",
    reference: "SAHPRA Registration Number Format Guidelines (2019)",
    description:
      "The registration number is displayed as 'REG 45/17.2.5/0312' — the prefix 'REG' is not part of the approved registration number format. SAHPRA registration numbers follow the format XX/XX.X.X/XXXX without prefix.",
    recommendation:
      "Remove the 'REG' prefix. Display the registration number as '45/17.2.5/0312' only. Verify the number against the current registration certificate — do not rely on the number from a prior artwork version.",
  },
];

export default function SampleReportClient() {
  return (
    <>
      {/* ── Print / Download controls — hidden on print ── */}
      <div
        className="no-print sticky top-0 z-50 flex items-center justify-between border-b px-6 py-3"
        style={{ backgroundColor: "#0f172a", borderColor: "#1e293b" }}
      >
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="text-xs font-medium transition-opacity hover:opacity-70"
            style={{ color: "#64748b" }}
          >
            ← avidara.co.za
          </a>
          <span style={{ color: "#334155" }}>|</span>
          <span className="text-xs font-semibold" style={{ color: "#94a3b8" }}>Sample Report</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/#book"
            className="rounded-lg px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-80"
            style={{ backgroundColor: "#4f46e5" }}
          >
            Book your review →
          </a>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 rounded-lg border px-4 py-2 text-xs font-medium transition-opacity hover:opacity-70"
            style={{ borderColor: "#334155", color: "#94a3b8", backgroundColor: "#1e293b" }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
            </svg>
            Download PDF
          </button>
        </div>
      </div>

      {/* ── Report document ── */}
      <div className="report-page" style={{ backgroundColor: "#f8fafc", minHeight: "100vh", padding: "48px 24px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", backgroundColor: "#fff", borderRadius: 12, boxShadow: "0 4px 32px rgba(0,0,0,.08)", overflow: "hidden" }}>

          {/* Header */}
          <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", padding: "40px 48px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: "#4f46e5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: "#fff", fontSize: 16, fontWeight: 800 }}>A</span>
                  </div>
                  <span style={{ color: "#f1f5f9", fontSize: 18, fontWeight: 700, letterSpacing: -0.3 }}>Avidara</span>
                </div>
                <p style={{ color: "#64748b", fontSize: 11, margin: 0 }}>Regulatory Document Review</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ display: "inline-block", background: "rgba(239,68,68,.15)", border: "1px solid rgba(239,68,68,.3)", color: "#fca5a5", fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", padding: "4px 10px", borderRadius: 4 }}>
                  Sample — Redacted
                </span>
              </div>
            </div>

            <h1 style={{ color: "#f1f5f9", fontSize: 26, fontWeight: 700, margin: "0 0 6px", lineHeight: 1.2 }}>
              Document Review Report
            </h1>
            <p style={{ color: "#94a3b8", fontSize: 14, margin: 0 }}>
              Pharmaceutical Artwork &amp; Labelling — Gap Analysis
            </p>
          </div>

          {/* Document details */}
          <div style={{ borderBottom: "1px solid #e2e8f0", padding: "24px 48px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px 32px" }}>
              {[
                { label: "Product", value: "Cardivex 5 mg Tablets" },
                { label: "Document type", value: "Carton artwork (secondary packaging)" },
                { label: "Review type", value: "Document Review" },
                { label: "Regulatory framework", value: "GN R510 of 2017 · MCA Code v18" },
                { label: "Review date", value: "11 April 2026" },
                { label: "Reference", value: "AVI-2026-0042" },
              ].map((item) => (
                <div key={item.label}>
                  <p style={{ margin: "0 0 2px", fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, color: "#94a3b8" }}>{item.label}</p>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: "#1e293b" }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Executive summary */}
          <div style={{ padding: "32px 48px", borderBottom: "1px solid #e2e8f0" }}>
            <p style={{ margin: "0 0 16px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: "#94a3b8" }}>Executive Summary</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
              {[
                { label: "Total findings", value: "6", bg: "#f8fafc", border: "#e2e8f0", text: "#0f172a" },
                { label: "Critical", value: "1", bg: "#fef2f2", border: "#fecaca", text: "#ef4444" },
                { label: "Major", value: "2", bg: "#fffbeb", border: "#fde68a", text: "#f59e0b" },
                { label: "Minor", value: "3", bg: "#f0fdf4", border: "#bbf7d0", text: "#22c55e" },
              ].map((s) => (
                <div key={s.label} style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 10, padding: "14px 16px", textAlign: "center" }}>
                  <p style={{ margin: "0 0 4px", fontSize: 28, fontWeight: 800, color: s.text, lineHeight: 1 }}>{s.value}</p>
                  <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.8 }}>{s.label}</p>
                </div>
              ))}
            </div>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: "#475569" }}>
              This review identified <strong>1 Critical</strong> finding that must be resolved before artwork can proceed to print,
              <strong> 2 Major</strong> findings that require correction before submission or batch release, and
              <strong> 3 Minor</strong> findings that represent best-practice improvements or low-risk deviations.
              The Critical finding (absent scheduling statement) constitutes a regulatory non-compliance that would result in an automatic
              deficiency letter from SAHPRA.
            </p>
          </div>

          {/* Findings */}
          <div style={{ padding: "32px 48px" }}>
            <p style={{ margin: "0 0 24px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: "#94a3b8" }}>Detailed Findings</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {findings.map((f) => {
                const s = SEV[f.sev];
                return (
                  <div
                    key={f.id}
                    style={{ border: `1px solid ${s.border}`, borderRadius: 10, overflow: "hidden" }}
                  >
                    {/* Finding header */}
                    <div style={{ background: s.bg, padding: "14px 20px", display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", fontFamily: "monospace", minWidth: 52 }}>{f.id}</span>
                      <span style={{ background: s.badge, color: "#fff", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, padding: "3px 10px", borderRadius: 999 }}>{f.sev}</span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", flex: 1 }}>{f.title}</span>
                    </div>
                    {/* Finding body */}
                    <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                        <div>
                          <p style={{ margin: "0 0 2px", fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, color: "#94a3b8" }}>Location</p>
                          <p style={{ margin: 0, fontSize: 12, color: "#475569" }}>{f.location}</p>
                        </div>
                        <div>
                          <p style={{ margin: "0 0 2px", fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, color: "#94a3b8" }}>Regulatory reference</p>
                          <p style={{ margin: 0, fontSize: 12, color: "#475569" }}>{f.reference}</p>
                        </div>
                      </div>
                      <div>
                        <p style={{ margin: "0 0 2px", fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, color: "#94a3b8" }}>Finding</p>
                        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.65, color: "#334155" }}>{f.description}</p>
                      </div>
                      <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: "12px 16px" }}>
                        <p style={{ margin: "0 0 2px", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "#4f46e5" }}>Recommendation</p>
                        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.65, color: "#334155" }}>{f.recommendation}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Conclusion */}
          <div style={{ padding: "0 48px 32px" }}>
            <div style={{ background: "#f8fafc", borderRadius: 10, border: "1px solid #e2e8f0", padding: "24px 28px" }}>
              <p style={{ margin: "0 0 10px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: "#94a3b8" }}>Conclusion</p>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: "#334155" }}>
                The reviewed artwork contains one Critical non-conformance that prevents regulatory submission in its current state.
                The absent scheduling statement (F-001) must be addressed before any other corrections are evaluated, as it constitutes
                a fundamental labelling requirement under GN R510 of 2017. The two Major findings (F-002, F-003) must be resolved before
                batch release or SAHPRA submission. The three Minor findings (F-004, F-005, F-006) are recommended corrections that
                reduce the risk of a query during regulatory review. All findings should be verified by the responsible regulatory professional
                before corrective artwork is approved.
              </p>
            </div>
          </div>

          {/* Footer / disclaimer */}
          <div style={{ borderTop: "1px solid #e2e8f0", padding: "24px 48px", background: "#f8fafc" }}>
            <p style={{ margin: "0 0 6px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "#94a3b8" }}>Important notice</p>
            <p style={{ margin: 0, fontSize: 11, lineHeight: 1.7, color: "#94a3b8" }}>
              This is a <strong style={{ color: "#64748b" }}>sample report for demonstration purposes only</strong>. The product, findings, and references are fictitious.
              Avidara's findings are advisory. All decisions regarding regulatory submissions, artwork approvals, and corrective actions
              remain the responsibility of the client's qualified regulatory professional. Avidara does not accept liability for
              regulatory outcomes. This report does not constitute legal or regulatory advice.
            </p>
            <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <p style={{ margin: 0, fontSize: 11, color: "#cbd5e1" }}>Avidara · hello@avidara.co.za · avidara.co.za</p>
              <p style={{ margin: 0, fontSize: 11, color: "#cbd5e1" }}>AVI-2026-0042 · Page 1 of 1</p>
            </div>
          </div>
        </div>

        {/* CTA below report — hidden on print */}
        <div className="no-print" style={{ maxWidth: 820, margin: "32px auto 0", textAlign: "center" }}>
          <p style={{ fontSize: 15, color: "#64748b", marginBottom: 16 }}>
            Ready to get a real report for your documents?
          </p>
          <a
            href="/#book"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#4f46e5", color: "#fff", padding: "14px 28px",
              borderRadius: 12, fontSize: 14, fontWeight: 600, textDecoration: "none",
              boxShadow: "0 4px 20px rgba(79,70,229,.35)",
            }}
          >
            Book a Document Review
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          .report-page { padding: 0 !important; background: #fff !important; }
          body { background: #fff; }
        }
        @page { margin: 0; size: A4; }
      `}</style>
    </>
  );
}
