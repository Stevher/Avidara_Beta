import Logo from "@/components/Logo";

const footerLinks = [
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
    <footer className="border-t border-white/[0.06] bg-[#0f172a] px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <a href="/" className="mb-4 inline-flex">
              <Logo height={30} />
            </a>
            <p className="mt-4 text-sm leading-relaxed text-slate-500">
              Compliance Intelligence. Independent, exhaustive, and precise review
              across every regulatory rulebook.
            </p>
            <div className="mt-6 flex flex-col gap-1">
              <span className="text-xs text-slate-600">Serving clients across South Africa</span>
              <a
                href="mailto:hello@avidara.co.za"
                className="text-xs text-slate-500 transition-colors hover:text-slate-300"
              >
                hello@avidara.co.za
              </a>
            </div>
          </div>

          {footerLinks.map((col) => (
            <div key={col.heading}>
              <h4 className="mb-4 text-sm font-semibold text-white">{col.heading}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-500 transition-colors hover:text-slate-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} Avidara (Pty) Ltd. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            Precision. Compliance. Clarity.
          </p>
        </div>
      </div>
    </footer>
  );
}
