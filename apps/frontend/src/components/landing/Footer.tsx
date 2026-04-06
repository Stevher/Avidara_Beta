import Logo from "@/components/Logo";

const cols = [
  {
    heading: "Services",
    links: [
      { label: "Artwork Review", href: "#services" },
      { label: "PI and PIL Development", href: "#services" },
      { label: "Version Comparison", href: "#services" },
      { label: "Dossier Gap Analysis", href: "#services" },
      { label: "Transport Compliance", href: "#services" },
    ],
  },
  {
    heading: "Industries",
    links: [
      { label: "Pharmaceuticals", href: "#industries" },
      { label: "Medical Devices", href: "#industries" },
      { label: "Transport and Logistics", href: "#industries" },
      { label: "Cosmetics", href: "#industries" },
      { label: "Financial Services", href: "#industries" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Avidara", href: "#platform" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Why Avidara", href: "#why" },
      { label: "Contact", href: "mailto:hello@avidara.co.za" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t px-6 pt-16 pb-10" style={{ borderColor: "var(--b)", backgroundColor: "var(--bg2)" }}>
      <div className="mx-auto max-w-6xl">
        {/* Main grid */}
        <div className="mb-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand col */}
          <div>
            <a href="/" className="mb-5 inline-flex">
              <Logo height={36} />
            </a>
            <p className="mt-5 max-w-[230px] text-sm leading-relaxed" style={{ color: "var(--t3)" }}>
              Independent compliance intelligence. Pharmaceuticals, logistics, cosmetics,
              foodstuffs, financial services, and beyond.
            </p>
            <div className="mt-5 flex flex-col gap-1.5">
              <a
                href="mailto:hello@avidara.co.za"
                className="text-xs transition-colors hover:text-[var(--t)]"
                style={{ color: "var(--t2)" }}
              >
                hello@avidara.co.za
              </a>
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.heading}>
              <h4
                className="mb-4 text-xs font-bold uppercase tracking-widest"
                style={{ color: "var(--t3)" }}
              >
                {col.heading}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm transition-colors hover:text-[var(--t)]"
                      style={{ color: "var(--t3)" }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col items-start justify-between gap-4 border-t pt-8 sm:flex-row sm:items-center"
          style={{ borderColor: "var(--b)" }}
        >
          <p className="text-xs" style={{ color: "var(--t3)" }}>
            &copy; {new Date().getFullYear()} Avidara (Pty) Ltd · South Africa
          </p>
          <div className="flex flex-wrap gap-2">
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs"
              style={{ borderColor: "var(--b)", color: "var(--t3)", backgroundColor: "var(--surf)" }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--emerald)]" />
              Serving clients across South Africa
            </span>
            <span
              className="inline-flex items-center rounded-full border px-3 py-1 text-xs"
              style={{ borderColor: "var(--b)", color: "var(--t3)", backgroundColor: "var(--surf)" }}
            >
              Precision. Compliance. Clarity.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
