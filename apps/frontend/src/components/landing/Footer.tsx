import Logo from "@/components/Logo";
import { INDUSTRY_GROUPS, industries } from "@/data/industries";

const serviceLinks = [
  { label: "Artwork Review", href: "/life-sciences#services" },
  { label: "PI and PIL Review", href: "/life-sciences#services" },
  { label: "Version Comparison", href: "/life-sciences#services" },
  { label: "Dossier Gap Analysis", href: "/life-sciences#services" },
  { label: "Dossier Bridge", href: "/life-sciences/dossier-bridging" },
  { label: "Compliance Consult", href: "/consult" },
];

const companyLinks = [
  { label: "About Avidara", href: "/#platform" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "International", href: "/international" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="border-t px-6 pt-16 pb-10" style={{ borderColor: "var(--b)", backgroundColor: "var(--bg2)" }}>
      <div className="mx-auto max-w-6xl">
        {/* Main grid */}
        <div className="mb-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1.4fr_1fr_1fr]">
          {/* Brand col */}
          <div>
            <a href="/" className="mb-5 inline-flex focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--indigo-light)] rounded">
              <Logo height={48} />
            </a>
            <p className="mt-5 max-w-[230px] text-sm leading-relaxed" style={{ color: "var(--t3)" }}>
              AI-powered compliance reviews for regulated industries. Results in under two minutes.
            </p>
            <div className="mt-5 flex flex-col gap-1.5">
              <a
                href="mailto:hello@avidara.co.za"
                className="text-xs transition-colors hover:text-[var(--t)] focus:outline-none focus-visible:underline"
                style={{ color: "var(--t2)" }}
              >
                hello@avidara.co.za
              </a>
            </div>
          </div>

          {/* Services col */}
          <div>
            <h4
              className="mb-4 text-xs font-bold uppercase tracking-widest"
              style={{ color: "var(--t3)" }}
            >
              Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors hover:text-[var(--t)] focus:outline-none focus-visible:underline"
                    style={{ color: "var(--t3)" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries col - grouped */}
          <div>
            <h4
              className="mb-4 text-xs font-bold uppercase tracking-widest"
              style={{ color: "var(--t3)" }}
            >
              Industries
            </h4>
            <div className="flex flex-col gap-4">
              {INDUSTRY_GROUPS.map((group) => {
                const groupIndustries = industries.filter((ind) => ind.group === group);
                if (!groupIndustries.length) return null;
                return (
                  <div key={group}>
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--t3)", opacity: 0.65 }}>
                      {group}
                    </p>
                    <ul className="space-y-2.5">
                      {groupIndustries.map((ind) => (
                        <li key={ind.href}>
                          <a
                            href={ind.href}
                            className="text-sm transition-colors hover:text-[var(--t)] focus:outline-none focus-visible:underline"
                            style={{ color: "var(--t3)" }}
                          >
                            {ind.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Company col */}
          <div>
            <h4
              className="mb-4 text-xs font-bold uppercase tracking-widest"
              style={{ color: "var(--t3)" }}
            >
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors hover:text-[var(--t)] focus:outline-none focus-visible:underline"
                    style={{ color: "var(--t3)" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col items-start justify-between gap-4 border-t pt-8 sm:flex-row sm:items-center"
          style={{ borderColor: "var(--b)" }}
        >
          <p className="text-xs" style={{ color: "var(--t3)" }}>
            &copy; {new Date().getFullYear()} Avidara (Pty) Ltd &middot; South Africa
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
