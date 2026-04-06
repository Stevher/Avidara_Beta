import Logo from "@/components/Logo";

const cols = [
  {
    heading: "Platform",
    links: [
      { label: "How it works", href: "#how-it-works" },
      { label: "Services", href: "#services" },
      { label: "Industries", href: "#industries" },
      { label: "Book a review", href: "#book" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Contact", href: "mailto:hello@avidara.co.za" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "POPIA Compliance", href: "#" },
      { label: "Data Handling Policy", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t px-6 py-16" style={{ borderColor: "var(--b)", backgroundColor: "var(--bg)" }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href="/" className="mb-5 inline-flex">
              <Logo height={28} />
            </a>
            <p className="mt-5 text-sm leading-relaxed" style={{ color: "var(--t3)" }}>
              Compliance Intelligence. Independent, exhaustive, and precise review
              across every regulatory rulebook.
            </p>
            <div className="mt-5 flex flex-col gap-1.5">
              <span className="text-xs" style={{ color: "var(--t3)" }}>Serving clients across South Africa</span>
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
              <h4 className="mb-4 text-sm font-semibold" style={{ color: "var(--t)" }}>{col.heading}</h4>
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

        <div
          className="flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row"
          style={{ borderColor: "var(--b)" }}
        >
          <p className="text-xs" style={{ color: "var(--t3)" }}>
            &copy; {new Date().getFullYear()} Avidara (Pty) Ltd. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "var(--t3)" }}>
            Precision. Compliance. Clarity.
          </p>
        </div>
      </div>
    </footer>
  );
}
