import type { ReactNode } from "react";

export const INDUSTRY_GROUPS = [
  "Health & Life Sciences",
  "Professional & Regulated Services",
  "Industrial & Resources",
] as const;

export type IndustryGroup = (typeof INDUSTRY_GROUPS)[number];

export interface Industry {
  href: string;
  label: string;
  sub: string;
  accent: string;
  accentLight: string;
  description: string;
  frameworks: string[];
  group: IndustryGroup;
  icon: ReactNode;
}

export const industries: Industry[] = [
  {
    href: "/life-sciences",
    label: "Pharmaceuticals",
    sub: "Life Sciences",
    accent: "#3b82f6",
    accentLight: "#60a5fa",
    description: "SAHPRA artwork review, PI/PIL gap analysis, MLR-structured reports, and dossier submissions.",
    frameworks: ["SAHPRA", "ICH/CTD", "MCA Code v19"],
    group: "Health & Life Sciences",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
      </svg>
    ),
  },
  {
    href: "/medical-devices",
    label: "Medical Devices",
    sub: "Devices & Diagnostics",
    accent: "#0891b2",
    accentLight: "#22d3ee",
    description: "SAHPRA device registration, technical file review, and ISO 13485 compliance documentation.",
    frameworks: ["SAHPRA MD", "ISO 13485", "IMDRF"],
    group: "Health & Life Sciences",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/>
      </svg>
    ),
  },
  {
    href: "/consumer-health",
    label: "Consumer Health",
    sub: "Nutraceuticals · Cosmetics · OTC",
    accent: "#10b981",
    accentLight: "#34d399",
    description: "Claims substantiation, labelling compliance, and health claim review for consumer-facing products.",
    frameworks: ["R146 regs", "SAHPRA cosmetics", "Foodstuffs Act"],
    group: "Health & Life Sciences",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
      </svg>
    ),
  },
  {
    href: "/veterinary",
    label: "Veterinary",
    sub: "Animal Health",
    accent: "#a21caf",
    accentLight: "#d946ef",
    description: "Veterinary product labelling, promotional material review, and DAFF/SAHPRA compliance.",
    frameworks: ["Act 36/1947", "SAHPRA vet", "DAFF"],
    group: "Health & Life Sciences",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
        <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
        <line x1="9" y1="9" x2="9.01" y2="9"/>
        <line x1="15" y1="9" x2="15.01" y2="9"/>
      </svg>
    ),
  },
  {
    href: "/pharma-manufacturing",
    label: "Pharma Manufacturing",
    sub: "GMP · Batch Records · Validation",
    accent: "#475569",
    accentLight: "#94a3b8",
    description: "GMP compliance review for batch manufacturing records, validation protocols, and quality management documentation against SAHPRA and PIC/S requirements.",
    frameworks: ["SAHPRA GMP", "PIC/S", "Act 101/1965"],
    group: "Health & Life Sciences",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16.5 9.4 7.5 4.21"/>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
        <path d="m3.3 7 8.7 5 8.7-5"/>
        <path d="M12 22V12"/>
      </svg>
    ),
  },
  {
    href: "/pharmacovigilance",
    label: "Pharmacovigilance",
    sub: "Safety Reporting · PSUR · Risk Management",
    accent: "#b45309",
    accentLight: "#fbbf24",
    description: "Safety reporting review for adverse event documentation, PSURs, and risk management plans against SAHPRA pharmacovigilance requirements.",
    frameworks: ["SAHPRA PV Guideline", "ICH E2 series", "GVP"],
    group: "Health & Life Sciences",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
  },
  {
    href: "/transport",
    label: "Transport",
    sub: "Logistics · Dangerous Goods",
    accent: "#1e40af",
    accentLight: "#93c5fd",
    description: "Cross-border documents, dangerous goods declarations, and NRTA/RTMS/AARTO compliance review.",
    frameworks: ["NRTA 93/1996", "SANS 10228", "SADC"],
    group: "Industrial & Resources",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2"/>
        <path d="M16 8h4a2 2 0 012 2v6a2 2 0 01-2 2h-1"/>
        <circle cx="5.5" cy="18.5" r="2.5"/>
        <circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
  },
  {
    href: "/publishing",
    label: "Publishing",
    sub: "Legal · Medical · Agricultural · Historical",
    accent: "#4338ca",
    accentLight: "#818cf8",
    description: "Verify publications against authoritative sources across any knowledge-intensive field - legal, medical, agricultural, historical, and beyond.",
    frameworks: ["Legal", "Medical", "Agricultural", "Historical"],
    group: "Professional & Regulated Services",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
      </svg>
    ),
  },
  {
    href: "/financial-services",
    label: "Financial Services",
    sub: "Advice · Asset Management",
    accent: "#16a34a",
    accentLight: "#4ade80",
    description: "FAIS compliance review for records of advice, minimum disclosure documents, fair conduct programmes, and client-facing communications, with CoFI Bill readiness built in.",
    frameworks: ["FAIS Act", "CoFI Bill", "FSCA"],
    group: "Professional & Regulated Services",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 10v11M12 10v11M16 10v11"/>
      </svg>
    ),
  },
  {
    href: "/legal",
    label: "Legal",
    sub: "Employment · Contracts · Litigation",
    accent: "#7c3aed",
    accentLight: "#a78bfa",
    description: "Collective agreement and contract review against the LRA, BCEA, and National Minimum Wage Act - plus litigation support and general legal document analysis.",
    frameworks: ["LRA", "BCEA", "NMW Act"],
    group: "Professional & Regulated Services",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
        <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
        <path d="M7 21h10"/>
        <path d="M12 3v18"/>
        <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
      </svg>
    ),
  },
  {
    href: "/competition-law",
    label: "Competition Law",
    sub: "Restrictive Practices · Pricing · Market Conduct",
    accent: "#b91c1c",
    accentLight: "#f87171",
    description: "Restrictive practice, pricing, and market conduct review against the Competition Act - trade agreements, distribution terms, and pricing policies checked before the Commission does.",
    frameworks: ["Competition Act 89/1998", "Competition Commission Guidelines"],
    group: "Professional & Regulated Services",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 7 13.5 15.5 8.5 10.5 2 17"/>
        <path d="M16 7h6v6"/>
      </svg>
    ),
  },
  {
    href: "/procurement",
    label: "Public Procurement",
    sub: "Tender Compliance · SCM · B-BBEE",
    accent: "#0369a1",
    accentLight: "#38bdf8",
    description: "Bid responsiveness review, tender document compliance, and B-BBEE verification under PPA 2024, PPPFA Regulations, and National Treasury SCM instructions.",
    frameworks: ["PPA 2024", "PPPFA", "B-BBEE Codes"],
    group: "Professional & Regulated Services",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
        <rect x="9" y="3" width="6" height="4" rx="2"/>
        <path d="M9 12h6M9 16h4"/>
      </svg>
    ),
  },
  {
    href: "/data-protection",
    label: "Data Protection",
    sub: "POPIA · PAIA · FICA",
    accent: "#9d174d",
    accentLight: "#f472b6",
    description: "Privacy policy and PAIA manual review, POPIA compliance programme assessment, and FICA Risk Management & Compliance Programme verification.",
    frameworks: ["POPIA", "PAIA", "FICA"],
    group: "Professional & Regulated Services",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    href: "/agriculture",
    label: "Agriculture",
    sub: "Agrochemicals · Export · Produce Standards",
    accent: "#3f6212",
    accentLight: "#84cc16",
    description: "Agrochemical label compliance, APS Act produce grading and marking, PPECB export certification, and destination-market MRL compliance for South African agricultural exports.",
    frameworks: ["Act 36/1947", "APS Act", "PPECB"],
    group: "Industrial & Resources",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12c0-2.76 1.12-5.26 2.93-7.07"/>
        <path d="M12 6v6l4 2"/>
        <path d="M6.34 17.66A8 8 0 0 1 4 12"/>
      </svg>
    ),
  },
  {
    href: "/mining",
    label: "Mining",
    sub: "Health, Safety & Environmental",
    accent: "#78350f",
    accentLight: "#b45309",
    description: "Mine Health and Safety Act Codes of Practice, Social & Labour Plan compliance, and environmental authorisation reviews - before DMRE inspection or s.54 action.",
    frameworks: ["MHSA 29/1996", "MPRDA", "NEMA"],
    group: "Industrial & Resources",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20h20M4 20V10l8-8 8 8v10"/>
        <path d="M10 20v-6h4v6"/>
        <circle cx="12" cy="9" r="1"/>
      </svg>
    ),
  },
  {
    href: "/energy",
    label: "Energy & IPP",
    sub: "Renewable Generation · Licensing · DFI",
    accent: "#0d9488",
    accentLight: "#2dd4bf",
    description: "IPP bid-document compliance, NERSA generation licence applications, grid-code documentation, NEMA environmental authorisation packages, and IFC Performance Standards for DFI-financed projects.",
    frameworks: ["ERA 4/2006", "NERSA", "IFC PS"],
    group: "Industrial & Resources",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
  },
  {
    href: "/environmental",
    label: "Environmental",
    sub: "NEMA · EIA · Water & Waste Licensing",
    accent: "#15803d",
    accentLight: "#86efac",
    description: "Environmental authorisation review for EIA reports, water use licences, and waste management licences against NEMA and its specific environmental management acts.",
    frameworks: ["NEMA 107/1998", "NEM:WA", "National Water Act"],
    group: "Industrial & Resources",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 4 13c0-3.87 1.6-6.5 4-8.5C10 3 12.5 2 15 2c-1.5 3-1.5 6-1.5 6a5 5 0 0 1 5 5c0 3-2.5 7-7.5 7Z"/>
        <path d="M4 13c0-1 .5-1.5 1-2"/>
      </svg>
    ),
  },
  {
    href: "/managed-healthcare",
    label: "Managed Healthcare",
    sub: "Medical Schemes · PMB Compliance",
    accent: "#701a75",
    accentLight: "#e879f9",
    description: "PMB compliance review for medical scheme clinical and funding policy, protocols, rule amendments, and treatment algorithms - against the Medical Schemes Act and its Regulations.",
    frameworks: ["Medical Schemes Act 131/1998", "Regulation 15I(c)", "CMS"],
    group: "Health & Life Sciences",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z"/>
        <path d="M12 8v8M8 12h8"/>
      </svg>
    ),
  },
];

export const industryCount = industries.length;
