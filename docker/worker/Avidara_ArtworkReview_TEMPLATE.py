#!/usr/bin/env python3
"""
╔══════════════════════════════════════════════════════════════════════════════╗
║  AVIDARA — ARTWORK REVIEW REPORT GENERATOR                                  ║
║  Compliance Intelligence                                                     ║
║                                                                              ║
║  Language : Python 3                                                         ║
║  Requires : pip install weasyprint pillow numpy --break-system-packages      ║
║  Run      : python3 Avidara_ArtworkReview_TEMPLATE.py                        ║
║                                                                              ║
║  HOW TO USE                                                                  ║
║  ──────────                                                                  ║
║  1. Edit the CONFIGURATION section (between the ═══ markers)                 ║
║  2. Run the script — PDF saved to OUTPUT_PATH                                ║
║  3. Do not edit anything below ═══ END CONFIGURATION ═══                    ║
║                                                                              ║
║  SEVERITY LEVELS                                                             ║
║  ───────────────                                                             ║
║  "critical" — patient safety or regulatory non-conformance; blocks release   ║
║  "major"    — substantive error; must correct before release                 ║
║  "minor"    — recommended improvement; document in MLR file if not actioned  ║
║                                                                              ║
║  ACCOUNTABILITY                                                              ║
║  ──────────────                                                              ║
║  Avidara flags, analyses, and reports. The client team reviews all           ║
║  outputs, makes findings their own, and bears full regulatory                ║
║  accountability for everything acted upon.                                   ║
╚══════════════════════════════════════════════════════════════════════════════╝
"""

import base64, io, os, sys
from datetime import date

# ── Dependency check ──────────────────────────────────────────────────────────
try:
    from weasyprint import HTML
except ImportError:
    sys.exit("ERROR: WeasyPrint not installed.\nRun: pip install weasyprint --break-system-packages")
try:
    from PIL import Image
    import numpy as np
    HAS_PILLOW = True
except ImportError:
    HAS_PILLOW = False

# ══════════════════════════════════════════════════════════════════════════════
#  CONFIGURATION — EDIT THIS SECTION FOR EACH REVIEW
# ══════════════════════════════════════════════════════════════════════════════

OUTPUT_PATH = "Avidara_ArtworkReview_OUTPUT.pdf"

# ── Logo ──────────────────────────────────────────────────────────────────────
# OnGreen = logo with green accent bar — used on navy/dark backgrounds
LOGO_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "assets", "Avidara_On_Green.png")

# ── Review metadata ───────────────────────────────────────────────────────────
PRODUCT_NAME     = "Fibranix 2,5 / 5"
PRODUCT_SUBTITLE = "Apixaban 2,5 mg / 5 mg  ·  Cipla Medpro (Pty) Ltd  ·  S4"
REVIEW_DATE      = date.today().strftime("%-d %B %Y")
VERSION          = "1.0 — Initial Review"
DOC_REF          = "4383882704"
PI_REF           = "CM1204A/SA"

# ── Document overview (label, value) ──────────────────────────────────────────
OVERVIEW = [
    ("Artwork Document",     "Fibranix 2,5 / 5 — DVT/PE A5 Leave-Behind"),
    ("Document Reference",   "4383882704"),
    ("Product",              "Fibranix 2,5 / 5 (Apixaban 2,5 mg; 5 mg film-coated tablets)"),
    ("Scheduling Status",    "S4"),
    ("Registration Numbers", "FIBRANIX 2,5: 56/8.2/0026   ·   FIBRANIX 5: 56/8.2/0027"),
    ("Format",               "A5 leave-behind, 2 pages (front and reverse)"),
    ("MAH / PI Holder",      "Cipla Medpro (Pty) Ltd, Building 9, Parc du Cap, Mispel Street, Bellville, 7530, RSA"),
    ("Reference PI",         "CM1204A/SA — Fibranix Online PI, SAHPRA-approved (December 2023)"),
    ("Intended Audience",    "Healthcare professionals (HCPs) — promotional leave-behind"),
    ("Review Date",          REVIEW_DATE),
    ("Review Version",       VERSION),
]

# ── Findings ──────────────────────────────────────────────────────────────────
# severity: "critical" | "major" | "minor"
FINDINGS = [
    {
        "severity":       "critical",
        "title":          'Incorrect Initiation Dosing — "Fibranix 5 mg BD" vs PI-Approved 10 mg BD',
        "location":       "Page 2 — Dosing chart, initiation column header",
        "observation":    (
            'The dosing chart labels the initiation phase as "Initiation Fibranix 5 mg BD" over 7 days. '
            "The SAHPRA-approved PI (§4.2) specifies 10 mg twice daily for 7 days. The label \"5 mg BD\" "
            "creates an unambiguous dosing discrepancy that could lead to patient underdosing, "
            "inadequate anticoagulation, and therapeutic failure. Patient safety-critical finding."
        ),
        "pi_ref":         "PI §4.2: The recommended dose of FIBRANIX is 10 mg taken orally twice daily for 7 days, "
                          "followed by 5 mg taken orally twice daily.",
        "recommendation": (
            'Amend the initiation label to "Fibranix 10 mg BD" or "2 × Fibranix 5 mg tablets, twice daily." '
            "Mandatory correction before release. Medical/regulatory sign-off on the revised dosing chart recommended."
        ),
    },
    {
        "severity":       "critical",
        "title":          'Registered Product Name Error — "Firanix" instead of "Fibranix"',
        "location":       "Page 2 — Convenience callout box",
        "observation":    (
            'The callout reads "Firanix can be taken with or without food." The letter "b" has been omitted '
            "from the registered product name. This constitutes a breach of the SAHPRA-registered name and "
            "may cause confusion at prescriber, dispenser, or patient level."
        ),
        "pi_ref":         "PI §1 (Name of the Medicine): FIBRANIX 2,5 film-coated tablets / FIBRANIX 5 film-coated tablets.",
        "recommendation": (
            'Correct "Firanix" to "Fibranix." Conduct a comprehensive spelling audit of every product name '
            "instance across both pages. Implement mandatory proofreading that specifically verifies the "
            "product name at each occurrence."
        ),
    },
    {
        "severity":       "major",
        "title":          "Renal Impairment Claim Inconsistent with Approved PI (CrCl 15–29 mL/min)",
        "location":       "Page 2 — Renal impairment callout",
        "observation":    (
            'The artwork states "use with caution" for CrCl 15–29 mL/min. The SAHPRA-approved PI (§4.2, '
            'Treatment of VTE) states: "No dose adjustment is necessary in patients with mild, moderate '
            'or severe (creatinine clearance 15–29 mL/min) renal impairment." The "use with caution" '
            "qualifier is not supported by the approved label for this indication and may deter appropriate prescribing."
        ),
        "pi_ref":         "PI §4.2 (Special Populations — Treatment of VTE): No dose adjustment necessary for CrCl 15–29 mL/min. "
                          "PI §4.3: FIBRANIX is not recommended in patients with CrCl &lt; 15 mL/min.",
        "recommendation": (
            'Remove "use with caution" for CrCl 15–29 mL/min. Replace with PI-aligned language confirming '
            "no dose adjustment required. Retain the contraindication for CrCl &lt; 15 mL/min or dialysis."
        ),
    },
    {
        "severity":       "major",
        "title":          '"Death" Omitted from NVAF Indication Statement',
        "location":       "Page 2 — Full indication block (base of page)",
        "observation":    (
            'The artwork states "indicated for prevention of stroke and systemic embolism in adult patients '
            "with non-valvular atrial fibrillation (NVAF)...\" The SAHPRA-approved PI (§4.1) defines the "
            "NVAF indication as reduction of risk of stroke, systemic embolism, AND death. Omission of "
            '"and death" materially understates the approved benefit profile.'
        ),
        "pi_ref":         "PI §4.1: FIBRANIX is indicated to reduce the risk of stroke, systemic embolism, and death "
                          "in patients with nonvalvular atrial fibrillation with one or more risk factors.",
        "recommendation": (
            'Amend to include "and death" following "systemic embolism." Corrected text: "…indicated for '
            'prevention of stroke, systemic embolism, and death in adult patients with non-valvular '
            'atrial fibrillation (NVAF)…"'
        ),
    },
    {
        "severity":       "major",
        "title":          "Company Address Discrepancy vs Registered PI Holder Address",
        "location":       "Pages 1 &amp; 2 — Company details / footer block",
        "observation":    (
            "The artwork displays Building 2, Junxion Park, 10 Elephant Lane, Century City 7441. "
            "The SAHPRA-approved PI (§7) lists the registered holder address as Building 9, Parc du Cap, "
            "Mispel Street, Bellville, 7530, RSA. Address discrepancy may attract regulatory scrutiny."
        ),
        "pi_ref":         "PI §7 (Holder of Certificate of Registration): CIPLA MEDPRO (PTY) LTD. "
                          "Building 9, Parc du Cap, Mispel Street, Bellville, 7530, RSA.",
        "recommendation": (
            "Verify with Cipla Medpro Regulatory Affairs which address is appropriate for South African "
            "promotional materials. Obtain documented justification if using an address other than the PI holder address."
        ),
    },
    {
        "severity":       "major",
        "title":          "Duplicate Sentence in Dosing Chart Disclaimer",
        "location":       "Page 2 — Small-print block beneath dosing chart",
        "observation":    (
            "The disclaimer paragraph below the dosing chart contains a duplicated sentence. The statement "
            "beginning \"The duration of overall therapy should be individualised...\" appears twice within "
            "the same paragraph. This reflects insufficient proofreading."
        ),
        "pi_ref":         "PI §4.2: Duration-of-treatment guidance appears once within the posology section.",
        "recommendation": (
            "Remove the duplicate sentence to produce a single, coherent disclaimer paragraph. Implement "
            "a proofreading protocol that checks for duplicated text blocks before regulatory submission."
        ),
    },
    {
        "severity":       "minor",
        "title":          "Specific NVAF Risk Factors Listed Beyond Approved PI Wording",
        "location":       "Page 2 — Full indication block (base of page)",
        "observation":    (
            'The artwork lists specific NVAF risk factors: "prior stroke or TIA, age ≥75 years, '
            "hypertension, diabetes mellitus, symptomatic heart failure (NYHA Class ≥II).\" "
            "The SAHPRA-approved PI (§4.1) refers only to \"one or more risk factors\" without listing "
            'examples. While introduced with "such as," these factors may be considered an extension of '
            "the approved indication text."
        ),
        "pi_ref":         'PI §4.1: "…in patients with nonvalvular atrial fibrillation with one or more risk factors." '
                          "No specific risk factors are enumerated.",
        "recommendation": (
            'Consider replacing the specific list with the approved PI wording "with one or more risk factors." '
            "If retention is commercially important, seek formal guidance from SAHPRA or MAH Regulatory Affairs."
        ),
    },
    {
        "severity":       "minor",
        "title":          '"ml/min" vs Approved "mL/min" — SI Unit Formatting',
        "location":       "Page 2 — Renal impairment callout",
        "observation":    (
            'The artwork uses "ml/min" (lower-case "l") throughout. The SAHPRA-approved PI consistently '
            'uses "mL/min" (upper-case "L") in conformity with SI unit conventions for the millilitre. '
            "Clinically benign but deviates from the approved reference document."
        ),
        "pi_ref":         'PI §§4.2, 4.4, 5.2: "mL/min" used consistently throughout all creatinine clearance references.',
        "recommendation": (
            'Update all instances of "ml/min" to "mL/min" throughout the artwork as part of the '
            "global correction pass prior to resubmission."
        ),
    },
]

# ── Executive summary override (leave blank to auto-generate) ─────────────────
EXEC_SUMMARY_OVERRIDE = ""

# ══════════════════════════════════════════════════════════════════════════════
#  END CONFIGURATION — DO NOT EDIT BELOW THIS LINE
# ══════════════════════════════════════════════════════════════════════════════

# ── Brand constants ───────────────────────────────────────────────────────────
NAVY    = "#22409A"
GREEN   = "#00A048"
CORAL   = "#C0392B"
ORANGE  = "#D4660A"
SLATE   = "#5A6880"
INK     = "#101828"
MUTED   = "#6B7B8D"
BORDER  = "#D0D4E8"
BG_ROW  = "#EDF0FA"
BG_LIGHT= "#F8F9FC"

# ── Severity maps ─────────────────────────────────────────────────────────────
SEV_LABEL  = {"critical": "Critical",  "major": "Major",  "minor": "Minor"}
SEV_COLOR  = {"critical": CORAL,       "major": ORANGE,   "minor": SLATE}
SEV_BG     = {"critical": "#FDEEEC",   "major": "#FEF9E7","minor": "#EFF1F3"}
SEV_BORDER = {"critical": CORAL,       "major": ORANGE,   "minor": SLATE}

# ── Counts ────────────────────────────────────────────────────────────────────
_counts = {}
for f in FINDINGS:
    _counts[f["severity"]] = _counts.get(f["severity"], 0) + 1
N_CRITICAL = _counts.get("critical", 0)
N_MAJOR    = _counts.get("major",    0)
N_MINOR    = _counts.get("minor",    0)
N_TOTAL    = len(FINDINGS)

# ── Outcome ───────────────────────────────────────────────────────────────────
if N_CRITICAL > 0 or N_MAJOR > 0:
    OUTCOME_LABEL = "Not Approved for Release"
    OUTCOME_META  = f"{N_CRITICAL} critical  ·  {N_MAJOR} major  ·  {N_MINOR} minor"
    OUTCOME_COLOR = CORAL
    STATUS_LINE   = "⚠ Findings Identified — Not Approved for Release"
else:
    OUTCOME_LABEL = "Approved"
    OUTCOME_META  = f"{N_MINOR} minor observation(s)"
    OUTCOME_COLOR = GREEN
    STATUS_LINE   = "✓ Approved — Minor observations noted"

# ── Executive summary ─────────────────────────────────────────────────────────
if EXEC_SUMMARY_OVERRIDE:
    EXEC_SUMMARY = EXEC_SUMMARY_OVERRIDE
else:
    EXEC_SUMMARY = (
        f"This Artwork Review Report was prepared by Avidara for the {PRODUCT_NAME} "
        f"(Document Reference: {DOC_REF}). The artwork was reviewed against the SAHPRA-approved "
        f"Professional Information (PI, {PI_REF})."
        f"<br><br>"
        f"A total of {N_TOTAL} finding{'s' if N_TOTAL != 1 else ''} were identified: "
        f"{N_CRITICAL} Critical, {N_MAJOR} Major, and {N_MINOR} Minor."
        + (f" Critical findings require immediate correction before this artwork may be released." if N_CRITICAL > 0 else "")
        + "<br><br>"
        "Avidara's role is to flag, analyse, and report. The client team reviews all findings, makes them "
        "their own, and bears full regulatory accountability for everything acted upon."
    )


# ══════════════════════════════════════════════════════════════════════════════
#  LOGO LOADER
# ══════════════════════════════════════════════════════════════════════════════
def load_logo(path: str) -> str | None:
    """Load logo PNG, strip near-black background, return base64 data URI."""
    if not os.path.exists(path):
        return None
    try:
        img = Image.open(path).convert("RGBA")
        if HAS_PILLOW:
            data = np.array(img)
            mask = (data[:, :, 0] < 30) & (data[:, :, 1] < 30) & (data[:, :, 2] < 30)
            data[mask, 3] = 0
            img = Image.fromarray(data)
        buf = io.BytesIO()
        img.save(buf, format="PNG")
        return f"data:image/png;base64,{base64.b64encode(buf.getvalue()).decode()}"
    except Exception as e:
        print(f"  ⚠  Logo error: {e}")
        return None


# ══════════════════════════════════════════════════════════════════════════════
#  HTML COMPONENT BUILDERS
# ══════════════════════════════════════════════════════════════════════════════

def severity_pill(sev: str) -> str:
    c = SEV_COLOR[sev]; bg = SEV_BG[sev]; lbl = SEV_LABEL[sev].upper()
    return (
        f'<span style="display:inline-block;font-size:6pt;font-weight:700;'
        f'letter-spacing:.06em;padding:2pt 6pt;border-radius:8pt;white-space:nowrap;'
        f'background:{bg};color:{c};border:0.5pt solid {c}">{lbl}</span>'
    )


def section_heading(num: int, title: str) -> str:
    return f"""
<div style="margin-top:16pt;margin-bottom:0;page-break-after:avoid">
  <div style="display:flex;align-items:center;gap:8pt;margin-bottom:4pt">
    <span style="font-size:7.5pt;font-weight:700;color:#fff;background:{NAVY};
                 border-radius:3pt;padding:2pt 6pt;letter-spacing:.05em;flex-shrink:0">{num:02d}</span>
    <span style="font-size:13pt;font-weight:700;color:{NAVY}">{title}</span>
  </div>
  <div style="height:1.5pt;background:linear-gradient(to right,{GREEN} 20%,rgba(0,160,72,.2) 60%,transparent 100%);
              margin-bottom:10pt"></div>
</div>"""


def callout_box(text: str, style: str = "info") -> str:
    """style: 'info' (blue) | 'warning' (coral)"""
    border = CORAL if style == "warning" else NAVY
    bg     = "#FDEEEC" if style == "warning" else "#EEF1FB"
    color  = CORAL if style == "warning" else "#0C447C"
    return f"""
<div style="background:{bg};border-left:3pt solid {border};border-radius:0 4pt 4pt 0;
            padding:8pt 10pt;font-size:8.5pt;color:{color};line-height:1.6;margin:8pt 0;
            page-break-inside:avoid">{text}</div>"""


def stats_banner(logo_uri: str | None) -> str:
    cards = [
        (NAVY,          "Product",          PRODUCT_NAME,            PRODUCT_SUBTITLE.split("·")[0].strip()),
        (GREEN,         "Artwork Reviewed",  "DVT/PE Leave-Behind",   f"Ref {DOC_REF}  ·  2 pages"),
        ("#1A7A8A",     "Reference PI",      PI_REF,                  "SAHPRA-approved"),
        (OUTCOME_COLOR, "Review Outcome",    OUTCOME_LABEL,           OUTCOME_META),
    ]
    cells = ""
    for i, (accent, label, val, sub) in enumerate(cards):
        val_color = OUTCOME_COLOR if i == 3 else INK
        cells += f"""
<div style="flex:1;background:{BG_LIGHT};border:0.5pt solid {BORDER};border-radius:5pt;
            padding:10pt 10pt 8pt;border-top:3pt solid {accent};overflow:hidden">
  <div style="font-size:6pt;font-weight:700;letter-spacing:.09em;color:{MUTED};
              text-transform:uppercase;margin-bottom:3pt">{label}</div>
  <div style="font-size:9.5pt;font-weight:700;color:{val_color};margin-bottom:2pt;line-height:1.2">{val}</div>
  <div style="font-size:6.5pt;color:{MUTED}">{sub}</div>
</div>"""
    return f'<div style="display:flex;gap:8pt;margin-bottom:18pt">{cells}</div>'


def overview_table() -> str:
    rows = ""
    for i, (label, value) in enumerate(OVERVIEW):
        bg  = BG_ROW if i % 2 == 1 else "#ffffff"
        sep = "" if i == len(OVERVIEW) - 1 else f"border-bottom:0.5pt solid {BORDER}"
        rows += f"""
<tr style="background:{bg}">
  <td style="padding:6pt 10pt;{sep};font-weight:700;color:{NAVY};width:32%">{label}</td>
  <td style="padding:6pt 10pt;{sep};color:{INK}">{value}</td>
</tr>"""
    return f"""
<div style="border:0.5pt solid {BORDER};border-radius:5pt;overflow:hidden;margin-bottom:12pt">
  <table style="width:100%;border-collapse:collapse;font-size:8.5pt">
    <tbody>{rows}</tbody>
  </table>
</div>"""


def summary_table() -> str:
    rows = ""
    for i, f in enumerate(FINDINGS):
        bg    = BG_ROW if i % 2 == 1 else "#ffffff"
        pi_short = f.get("pi_ref", "").split(":")[0].split("(")[0].strip()[:40]
        rows += f"""
<tr style="background:{bg}">
  <td style="padding:6pt 8pt;border-bottom:0.5pt solid {BORDER};font-weight:700;color:{NAVY};width:18pt">{i+1}</td>
  <td style="padding:6pt 8pt;border-bottom:0.5pt solid {BORDER};width:52pt">{severity_pill(f['severity'])}</td>
  <td style="padding:6pt 8pt;border-bottom:0.5pt solid {BORDER};color:{INK}">{f['title']}</td>
  <td style="padding:6pt 8pt;border-bottom:0.5pt solid {BORDER};color:{MUTED};width:80pt">{pi_short}</td>
  <td style="padding:6pt 8pt;border-bottom:0.5pt solid {BORDER};color:{MUTED};width:80pt">{f['location']}</td>
</tr>"""
    return f"""
<div style="border:0.5pt solid {BORDER};border-radius:5pt;overflow:hidden;margin-bottom:12pt">
  <table style="width:100%;border-collapse:collapse;font-size:7.5pt">
    <thead>
      <tr style="background:{BG_LIGHT}">
        <th style="padding:6pt 8pt;text-align:left;font-size:6.5pt;font-weight:700;letter-spacing:.07em;
                   text-transform:uppercase;color:{MUTED};border-bottom:0.5pt solid {BORDER}">#</th>
        <th style="padding:6pt 8pt;text-align:left;font-size:6.5pt;font-weight:700;letter-spacing:.07em;
                   text-transform:uppercase;color:{MUTED};border-bottom:0.5pt solid {BORDER}">Severity</th>
        <th style="padding:6pt 8pt;text-align:left;font-size:6.5pt;font-weight:700;letter-spacing:.07em;
                   text-transform:uppercase;color:{MUTED};border-bottom:0.5pt solid {BORDER}">Finding</th>
        <th style="padding:6pt 8pt;text-align:left;font-size:6.5pt;font-weight:700;letter-spacing:.07em;
                   text-transform:uppercase;color:{MUTED};border-bottom:0.5pt solid {BORDER}">PI Reference</th>
        <th style="padding:6pt 8pt;text-align:left;font-size:6.5pt;font-weight:700;letter-spacing:.07em;
                   text-transform:uppercase;color:{MUTED};border-bottom:0.5pt solid {BORDER}">Location</th>
      </tr>
    </thead>
    <tbody>{rows}</tbody>
  </table>
</div>"""


def _sub_section(label: str, text: str, muted: bool = False, last: bool = False) -> str:
    color = MUTED if muted else INK
    mb    = "0" if last else "8pt"
    return f"""
<div style="margin-bottom:{mb}">
  <div style="font-size:6pt;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
              color:{MUTED};margin-bottom:2pt;display:flex;align-items:center;gap:5pt">
    {label}
    <span style="flex:1;border-top:0.5pt solid {BORDER}"></span>
  </div>
  <div style="font-size:8.5pt;color:{color};line-height:1.6">{text}</div>
</div>"""


def finding_block(num: int, f: dict) -> str:
    sev = f["severity"]
    return f"""
<div style="border:0.5pt solid {BORDER};border-left:3pt solid {SEV_BORDER[sev]};
            border-radius:0 5pt 5pt 0;margin-bottom:10pt;page-break-inside:avoid;overflow:hidden">
  <div style="display:flex;align-items:flex-start;gap:8pt;padding:9pt 12pt 8pt;
              background:#ffffff;border-bottom:0.5pt solid {BORDER}">
    <div style="font-size:11pt;font-weight:700;color:{NAVY};min-width:18pt;
                padding-top:1pt;flex-shrink:0">F{num}</div>
    <div style="flex:1">
      <div style="display:flex;align-items:center;gap:6pt;margin-bottom:2pt;flex-wrap:wrap">
        <span style="font-size:9.5pt;font-weight:700;color:{INK}">{f['title']}</span>
        {severity_pill(sev)}
      </div>
      <div style="font-size:7pt;color:{MUTED}">{f['location']}</div>
    </div>
  </div>
  <div style="padding:8pt 12pt 9pt 36pt;background:{BG_LIGHT}">
    {_sub_section('Observation', f['observation'])}
    {_sub_section('PI / PIL Reference', f['pi_ref'], muted=True)}
    {_sub_section('Recommendation', f['recommendation'], last=True)}
  </div>
</div>"""


def recommendations_block(sev: str, header: str) -> str:
    items = [f for f in FINDINGS if f["severity"] == sev]
    if not items:
        return ""
    hc = SEV_COLOR[sev]
    lis = ""
    for i, f in enumerate(FINDINGS):
        if f["severity"] != sev:
            continue
        lis += f"""
<li style="font-size:8.5pt;color:{INK};line-height:1.6;padding:5pt 8pt 5pt 20pt;
           border-bottom:0.5pt solid {BG_ROW};position:relative">
  <span style="position:absolute;left:6pt;top:5pt;color:{NAVY};font-weight:700;font-size:8pt">→</span>
  <strong>F{i+1}:</strong> {f['recommendation']}
</li>"""
    return f"""
<div style="border:0.5pt solid {BORDER};border-radius:5pt;overflow:hidden;margin-bottom:8pt">
  <div style="padding:6pt 10pt;font-size:6.5pt;font-weight:700;letter-spacing:.08em;
              text-transform:uppercase;color:#fff;background:{hc}">{header}</div>
  <ul style="list-style:none;padding:0;margin:0">{lis}</ul>
</div>"""


def signoff_grid() -> str:
    cards = [
        ("Reviewed By",  "Avidara (Pty) Ltd",  "Compliance Intelligence",    NAVY),
        ("Review Date",  REVIEW_DATE,           f"Version: {VERSION}",        NAVY),
        ("Outcome",      OUTCOME_LABEL,         OUTCOME_META,                 OUTCOME_COLOR),
    ]
    cells = ""
    for label, val, sub, color in cards:
        bg = "#FDEEEC" if color == CORAL else BG_LIGHT
        border_extra = f";border:0.5pt solid {CORAL}" if color == CORAL else ""
        cells += f"""
<div style="flex:1;border:0.5pt solid {BORDER};border-radius:5pt;
            padding:10pt 12pt;background:{bg}{border_extra}">
  <div style="font-size:6pt;font-weight:700;letter-spacing:.09em;text-transform:uppercase;
              color:{MUTED};margin-bottom:4pt">{label}</div>
  <div style="font-size:10pt;font-weight:700;color:{color}">{val}</div>
  <div style="font-size:7pt;color:{MUTED};margin-top:2pt">{sub}</div>
</div>"""
    return f'<div style="display:flex;gap:8pt;margin-top:6pt">{cells}</div>'


# ══════════════════════════════════════════════════════════════════════════════
#  HTML DOCUMENT
# ══════════════════════════════════════════════════════════════════════════════
def build_html(logo_uri: str | None) -> str:

    finding_blocks_html = "\n".join(
        finding_block(i + 1, f) for i, f in enumerate(FINDINGS)
    )

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
@page {{
  size: A4;
  margin: 1.59cm 1.59cm 1.9cm 1.59cm;
  @top-left   {{ content: element(hdr); }}
  @bottom-left {{ content: element(ftr); }}
}}
* {{ box-sizing: border-box; margin: 0; padding: 0; }}
body {{
  font-family: Arial, Helvetica, sans-serif;
  font-size: 9pt;
  color: {INK};
  line-height: 1.5;
}}
#pg-hdr {{
  position: running(hdr);
  width: 100%;
  border-bottom: 1pt solid {GREEN};
  padding-bottom: 3pt;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 7pt;
}}
#pg-ftr {{
  position: running(ftr);
  width: 100%;
  border-top: 1pt solid {GREEN};
  padding-top: 3pt;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 7pt;
  color: {MUTED};
}}
#pg-ftr .pn::after {{
  content: "Page " counter(page) " of " counter(pages);
  color: {NAVY};
  font-weight: 700;
}}
p {{ font-size:9pt;color:{INK};margin-bottom:6pt;line-height:1.6; }}
</style>
</head>
<body>

<!-- Running header -->
<div id="pg-hdr">
  <span style="font-weight:700;color:{NAVY};letter-spacing:.04em">
    AVIDARA &nbsp;·&nbsp; ARTWORK REVIEW &nbsp;·&nbsp; COMPLIANCE INTELLIGENCE
  </span>
  <span style="color:{MUTED}">{PRODUCT_NAME} &nbsp;[{DOC_REF}]</span>
</div>

<!-- Running footer -->
<div id="pg-ftr">
  <span>Confidential &nbsp;·&nbsp; Avidara (Pty) Ltd &nbsp;·&nbsp; Compliance Intelligence</span>
  <span class="pn"></span>
</div>

<!-- ═══ TITLE BLOCK ══════════════════════════════════════════════════════ -->
<div style="border-radius:6pt;overflow:hidden;margin-bottom:12pt">

  <!-- Top band: navy left, green-accented right -->
  <div style="background:{NAVY};padding:18pt 18pt 14pt;display:flex;
              justify-content:space-between;align-items:flex-start">
    <div>
      <div style="font-size:6.5pt;font-weight:700;letter-spacing:.14em;color:#8ba0cc;
                  text-transform:uppercase;margin-bottom:5pt">Artwork Review Report</div>
      <div style="font-size:18pt;font-weight:700;color:#fff;margin-bottom:3pt;line-height:1.15">
        {PRODUCT_NAME}
      </div>
      <div style="font-size:8pt;color:#b8c8e8;margin-bottom:8pt">{PRODUCT_SUBTITLE}</div>
      <div style="display:flex;align-items:center;gap:6pt">
        <span style="font-size:7.5pt;font-weight:700;color:#fff;
                     background:rgba(255,255,255,.12);border-radius:4pt;
                     padding:3pt 9pt;border:0.5pt solid rgba(255,255,255,.2);
                     letter-spacing:.02em">
          {STATUS_LINE}
        </span>
      </div>
    </div>
    <!-- Logo pill -->
    <div style="background:{GREEN};border-radius:5pt;padding:10pt 14pt;
                display:flex;align-items:center;justify-content:center;
                min-width:110pt;flex-shrink:0;margin-left:16pt">
      {"<img src='" + logo_uri + "' alt='Avidara' style='height:26pt;width:auto'>" if logo_uri else
       f"<span style='font-size:16pt;font-weight:700;color:#fff;letter-spacing:.03em'>AVIDARA</span>"}
    </div>
  </div>

  <!-- Meta bar -->
  <div style="background:#1a3580;padding:5pt 18pt;display:flex;align-items:center;gap:0;flex-wrap:wrap">
    <span style="font-size:7pt;color:#8ba0cc;margin-right:16pt">
      Doc ref: <strong style="color:#c8d8f0;font-weight:500">{DOC_REF}</strong>
    </span>
    <span style="font-size:7pt;color:#8ba0cc;margin-right:16pt">
      Date: <strong style="color:#c8d8f0;font-weight:500">{REVIEW_DATE}</strong>
    </span>
    <span style="font-size:7pt;color:#8ba0cc;margin-right:16pt">
      Version: <strong style="color:#c8d8f0;font-weight:500">{VERSION}</strong>
    </span>
    <span style="font-size:7pt;color:#8ba0cc">
      PI: <strong style="color:#c8d8f0;font-weight:500">{PI_REF}</strong>
    </span>
  </div>

</div>

<!-- ═══ STATS BANNER ═════════════════════════════════════════════════════ -->
{stats_banner(logo_uri)}

<!-- ═══ 01 EXECUTIVE SUMMARY ════════════════════════════════════════════ -->
{section_heading(1, 'Executive Summary')}
<p>{EXEC_SUMMARY}</p>
{callout_box(
    f'This artwork is <strong>NOT APPROVED FOR RELEASE</strong> in its current form. '
    f'All Critical and Major findings must be corrected and the revised artwork '
    f'resubmitted to Avidara for formal re-review before any distribution to '
    f'healthcare professionals.',
    style='warning'
) if N_CRITICAL > 0 or N_MAJOR > 0 else callout_box(
    'No Critical or Major findings identified. This artwork may proceed to release, '
    'subject to the client team\'s own review and sign-off. Minor observations should '
    'be documented in the MLR file.'
)}

<!-- ═══ 02 FINDING SUMMARY ══════════════════════════════════════════════ -->
{section_heading(2, 'Finding Summary')}
{summary_table()}

<!-- ═══ 03 DOCUMENT OVERVIEW ════════════════════════════════════════════ -->
{section_heading(3, 'Document Overview')}
{overview_table()}

<!-- ═══ 04 DETAILED FINDINGS ════════════════════════════════════════════ -->
{section_heading(4, 'Detailed Findings')}
{finding_blocks_html}

<!-- ═══ 05 RECOMMENDATIONS ══════════════════════════════════════════════ -->
{section_heading(5, 'Recommendations')}
<p>The following actions are required before this promotional material may be approved
for distribution to healthcare professionals.</p>
{recommendations_block('critical', 'Critical Findings — Mandatory Corrections (must resolve before release)')}
{recommendations_block('major',    'Major Findings — Required Corrections (must resolve before release)')}
{recommendations_block('minor',    'Minor Findings — Recommended Improvements')}
{callout_box(
    'Following correction of all Critical and Major findings, the revised artwork must '
    'be resubmitted to Avidara for formal re-review and sign-off before any '
    'distribution to healthcare professionals.',
    style='info'
) if N_CRITICAL > 0 or N_MAJOR > 0 else ''}

<!-- ═══ 06 SIGN-OFF ══════════════════════════════════════════════════════ -->
{section_heading(6, 'Sign-Off')}
{signoff_grid()}

<div style="height:16pt"></div>

<p style="font-size:7.5pt;color:{MUTED}">
  This report was prepared by Avidara (Pty) Ltd. Compliance Intelligence.
</p>
<p style="font-size:7.5pt;color:{MUTED}">
  The findings and recommendations herein are based solely on the SAHPRA-approved PI
  ({PI_REF}) as provided for this review. Avidara flags, analyses, and reports.
  The client team reviews all findings, makes them their own, and bears full legal
  and regulatory accountability for everything acted upon. This report does not
  constitute legal or regulatory advice.
</p>

</body>
</html>"""


# ══════════════════════════════════════════════════════════════════════════════
#  ENTRY POINT
# ══════════════════════════════════════════════════════════════════════════════
if __name__ == "__main__":
    print("Avidara Artwork Review — building PDF...")

    logo_uri = load_logo(LOGO_PATH)
    if logo_uri:
        print(f"  ✓ Logo loaded from {LOGO_PATH}")
    else:
        print(f"  ⚠  Logo not found at {LOGO_PATH} — using text fallback")
        print(f"     Expected: assets/Avidara_On_Green.png next to this script")

    html = build_html(logo_uri)
    HTML(string=html).write_pdf(OUTPUT_PATH)

    print(f"  ✓ {N_TOTAL} findings  ({N_CRITICAL} Critical · {N_MAJOR} Major · {N_MINOR} Minor)")
    print(f"  ✓ Outcome: {OUTCOME_LABEL}")
    print(f"  ✓ Saved to: {OUTPUT_PATH}")
