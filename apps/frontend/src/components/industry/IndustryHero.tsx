export interface IndustryHeroProps {
  badge: string;
  heading: string;
  headingAccent: string;
  sub: string;
  accent: string;
  accentLight: string;
  accentDeep: string;
}

export default function IndustryHero({
  badge,
  heading,
  headingAccent,
  sub,
  accent,
  accentLight,
  accentDeep,
}: IndustryHeroProps) {
  const glowRgba = hexToRgba(accent, 0.15);
  const badgeBorder = hexToRgba(accent, 0.25);
  const badgeBg = hexToRgba(accent, 0.08);
  const btnShadow = `0 4px 20px ${hexToRgba(accent, 0.38)}`;

  return (
    <section className="relative overflow-hidden px-6 pb-0 pt-32" style={{ backgroundColor: "var(--bg)" }}>
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, var(--b2) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          maskImage: "radial-gradient(ellipse 90% 80% at 50% 40%, black 5%, transparent 100%)",
        }}
      />

      {/* Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[700px] w-[900px] -translate-x-1/2 rounded-full blur-[160px]"
        style={{ backgroundColor: glowRgba }}
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Badge */}
        <div
          className="mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
          style={{
            borderColor: badgeBorder,
            backgroundColor: badgeBg,
            color: accentLight,
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: "var(--emerald)", animation: "pulse 2s infinite" }}
          />
          {badge}
        </div>

        <h1
          className="mb-6 text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-[72px]"
          style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--t)" }}
        >
          {heading}{" "}
          <em
            className="not-italic"
            style={{
              background: `linear-gradient(135deg, ${accentLight} 0%, var(--emerald) 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {headingAccent}
          </em>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed" style={{ color: "var(--t2)" }}>
          {sub}
        </p>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href="#book"
            className="inline-flex h-12 items-center gap-2 rounded-xl px-7 text-sm font-semibold text-white transition-all hover:shadow-xl"
            style={{ backgroundColor: accent, boxShadow: btnShadow }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = accentDeep; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = accent; }}
          >
            Book a review
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a
            href="#how-it-works"
            className="inline-flex h-12 items-center gap-2 rounded-xl border px-7 text-sm font-medium transition-all hover:border-[var(--b2)] hover:text-[var(--t)]"
            style={{ borderColor: "var(--b)", color: "var(--t2)" }}
          >
            See how it works
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 border-t" style={{ borderColor: "var(--b)" }}>
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {[
              { value: "Minutes", accent: ".", label: "Report in your inbox, fast" },
              { value: "6+", accent: null, label: "Regulatory rulesets encoded" },
              { value: "100%", accent: null, label: "Your accountability preserved" },
              { value: "Zero", accent: " gaps", label: "Consistent every review" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="border-r px-4 py-8 text-center last:border-r-0"
                style={{ borderColor: "var(--b)" }}
              >
                <p
                  className="text-[1.9rem] font-bold leading-none"
                  style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--t)" }}
                >
                  {stat.value}
                  {stat.accent && <span style={{ color: "var(--emerald)" }}>{stat.accent}</span>}
                </p>
                <p className="mt-2 text-xs font-medium" style={{ color: "var(--t3)" }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mock UI */}
      <div className="relative z-10 mx-auto mt-16 max-w-5xl">
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-40"
          style={{ background: "linear-gradient(to top, var(--bg), transparent)" }}
        />
        <div
          className="overflow-hidden rounded-t-2xl border"
          style={{ borderColor: "var(--b)", boxShadow: "0 -4px 60px rgba(0,0,0,.35)", backgroundColor: "var(--surf2)" }}
        >
          <div className="flex items-center gap-2 border-b px-4 py-3" style={{ borderColor: "var(--b)", backgroundColor: "var(--bg)" }}>
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-400/60" />
              <div className="h-3 w-3 rounded-full bg-yellow-400/60" />
              <div className="h-3 w-3 rounded-full bg-green-400/60" />
            </div>
            <div
              className="mx-auto flex h-6 w-64 items-center justify-center rounded-md text-xs"
              style={{ backgroundColor: "var(--b)", color: "var(--t3)" }}
            >
              app.avidara.co.za/review/AVD-00042
            </div>
          </div>

          <div className="flex h-[360px]">
            <div className="hidden w-52 shrink-0 border-r p-4 sm:block" style={{ borderColor: "var(--b)", backgroundColor: "var(--bg)" }}>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest" style={{ color: "var(--t3)" }}>Active Reviews</p>
              {[
                { id: "AVD-00042", name: "Review in progress", status: "In Review", active: true },
                { id: "AVD-00039", name: "Previous review", status: "Complete", active: false },
                { id: "AVD-00031", name: "Queued document", status: "Pending", active: false },
              ].map((d) => (
                <div key={d.id} className="mb-1 rounded-lg px-3 py-2.5" style={{ backgroundColor: d.active ? hexToRgba(accent, 0.1) : undefined }}>
                  <p className="text-xs font-medium" style={{ color: d.active ? accentLight : "var(--t2)" }}>{d.id}</p>
                  <p className="text-[10px]" style={{ color: "var(--t3)" }}>{d.name} · {d.status}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-1 flex-col overflow-hidden">
              <div className="flex items-center justify-between border-b px-5 py-3" style={{ borderColor: "var(--b)" }}>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--t)" }}>Compliance Review — AVD-00042</p>
                  <p className="text-xs" style={{ color: "var(--t3)" }}>{badge} · Document analysis complete</p>
                </div>
                <div className="flex gap-2">
                  <span className="rounded-full bg-red-500/10 px-2.5 py-0.5 text-xs font-medium text-red-400">1 critical</span>
                  <span className="rounded-full bg-orange-500/10 px-2.5 py-0.5 text-xs font-medium text-orange-400">2 major</span>
                </div>
              </div>

              <div className="flex flex-1 overflow-hidden">
                <div className="flex-1 p-5">
                  <div className="space-y-2.5">
                    <div className="h-2 w-3/4 rounded-full" style={{ backgroundColor: "var(--b)" }} />
                    <div className="h-2 w-full rounded-full" style={{ backgroundColor: "var(--b)" }} />
                    <div className="rounded-lg border border-red-500/25 bg-red-500/5 px-4 py-3">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="rounded bg-red-500/15 px-1.5 py-0.5 text-[10px] font-bold uppercase text-red-400">Critical</span>
                        <span className="text-[10px]" style={{ color: "var(--t3)" }}>Regulatory gap — Section 4.2</span>
                      </div>
                      <div className="space-y-1.5">
                        <div className="h-1.5 w-full rounded-full bg-red-500/10" />
                        <div className="h-1.5 w-4/5 rounded-full bg-red-500/10" />
                      </div>
                    </div>
                    <div className="rounded-lg border border-orange-500/25 bg-orange-500/5 px-4 py-3">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="rounded bg-orange-500/15 px-1.5 py-0.5 text-[10px] font-bold uppercase text-orange-400">Major</span>
                        <span className="text-[10px]" style={{ color: "var(--t3)" }}>Compliance deviation — Section 4.1</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-orange-500/10" />
                    </div>
                    <div className="h-2 w-full rounded-full" style={{ backgroundColor: "var(--b)" }} />
                    <div className="h-2 w-2/3 rounded-full" style={{ backgroundColor: "var(--b)" }} />
                  </div>
                </div>

                <div className="hidden w-56 shrink-0 border-l p-4 lg:block" style={{ borderColor: "var(--b)" }}>
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest" style={{ color: "var(--t3)" }}>Findings</p>
                  {[
                    { code: "CRIT", color: "text-red-400", bg: "bg-red-500/10", text: "Critical non-conformance identified. Requires correction before approval." },
                    { code: "MAJ", color: "text-orange-400", bg: "bg-orange-500/10", text: "Major deviation from regulatory requirement. Action required." },
                    { code: "MAJ", color: "text-orange-400", bg: "bg-orange-500/10", text: "Incomplete supporting documentation. Cross-reference missing." },
                    { code: "MIN", color: "text-slate-400", bg: "bg-slate-500/10", text: "Minor formatting non-conformance. Advisory." },
                  ].map((f, i) => (
                    <div key={i} className="mb-2 rounded-lg p-2.5" style={{ backgroundColor: "var(--b)" }}>
                      <span className={`mb-1.5 inline-block rounded px-1.5 py-0.5 text-[9px] font-bold ${f.bg} ${f.color}`}>{f.code}</span>
                      <p className="text-[11px] leading-relaxed" style={{ color: "var(--t2)" }}>{f.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes pulse{0%,100%{opacity:1;}50%{opacity:.4;}}`}</style>
    </section>
  );
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}
