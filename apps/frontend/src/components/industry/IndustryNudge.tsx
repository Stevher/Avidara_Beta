const industries = [
  { label: "Pharmaceuticals", href: "/life-sciences" },
  { label: "Medical Devices", href: "/medical-devices" },
  { label: "Consumer Health", href: "/consumer-health" },
  { label: "Veterinary", href: "/veterinary" },
  { label: "Transport", href: "/transport" },
];

export default function IndustryNudge({ current }: { current: string }) {
  const others = industries.filter((i) => i.label !== current);

  return (
    <section className="px-6 py-16" style={{ backgroundColor: "var(--bg2)" }}>
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-2 text-sm font-medium" style={{ color: "var(--t3)" }}>
          Not in {current}?
        </p>
        <p className="mb-6 text-base" style={{ color: "var(--t2)" }}>
          Avidara serves multiple regulated industries with the same analytical rigour — only the ruleset changes.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {others.map((ind) => (
            <a
              key={ind.href}
              href={ind.href}
              className="rounded-full border px-4 py-2 text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-[var(--b2)] hover:text-[var(--t)] hover:shadow-[var(--shadow)]"
              style={{ borderColor: "var(--b)", color: "var(--t2)", backgroundColor: "var(--surf)" }}
            >
              {ind.label}
            </a>
          ))}
          <a
            href="/"
            className="rounded-full border px-4 py-2 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow)]"
            style={{ borderColor: "rgba(79,70,229,.25)", color: "var(--indigo-light)", backgroundColor: "rgba(79,70,229,.06)" }}
          >
            View all industries →
          </a>
        </div>
      </div>
    </section>
  );
}
