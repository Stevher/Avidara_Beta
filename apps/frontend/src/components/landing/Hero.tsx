export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-0 pt-32" style={{ backgroundColor: "var(--bg)" }}>
      {/* Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full blur-[140px]"
          style={{ backgroundColor: "var(--glow)" }}
        />
      </div>

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(var(--t) 1px, transparent 1px), linear-gradient(90deg, var(--t) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Badge */}
        <div
          className="mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium"
          style={{
            borderColor: "rgba(16,185,129,.3)",
            backgroundColor: "rgba(16,185,129,.08)",
            color: "var(--emerald-light)",
          }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--emerald)]" />
          Compliance Intelligence Platform
        </div>

        <h1
          className="mb-6 text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-[72px]"
          style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--t)" }}
        >
          Your compliance layer.{" "}
          <span
            style={{
              background: "linear-gradient(135deg, var(--indigo-light) 0%, var(--emerald) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Independent, intelligent, precise.
          </span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed" style={{ color: "var(--t2)" }}>
          Avidara stands outside every industry it serves as an independent external review layer.
          It finds what internal teams miss, before regulators do.
        </p>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href="#book"
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--indigo)] px-7 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[var(--indigo-deep)] hover:shadow-xl"
            style={{ boxShadow: "0 4px 20px rgba(79,70,229,.35)" }}
          >
            Book a review
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a
            href="#platform"
            className="inline-flex h-12 items-center gap-2 rounded-xl border px-7 text-sm font-medium transition-all hover:border-[var(--b2)]"
            style={{ borderColor: "var(--b)", color: "var(--t2)" }}
          >
            See how it works
          </a>
        </div>

        {/* Stats */}
        <div
          className="mt-16 flex flex-wrap items-start justify-center gap-x-10 gap-y-6 border-t pt-10"
          style={{ borderColor: "var(--b)" }}
        >
          {[
            { value: "Minutes", label: "Report delivery" },
            { value: "6+", label: "Regulatory rulesets" },
            { value: "100%", label: "Your accountability preserved" },
            { value: "Zero", label: "Compliance gaps" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="text-2xl font-bold"
                style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--t)" }}
              >
                {stat.value}
              </p>
              <p className="mt-1 text-sm" style={{ color: "var(--t3)" }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mock UI */}
      <div className="relative z-10 mx-auto mt-20 max-w-5xl">
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-40"
          style={{ background: "linear-gradient(to top, var(--bg), transparent)" }}
        />
        <div
          className="overflow-hidden rounded-t-2xl border"
          style={{ borderColor: "var(--b)", boxShadow: "0 -4px 40px rgba(0,0,0,.3)", backgroundColor: "var(--surf2)" }}
        >
          {/* Chrome */}
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
              app.avidara.co.za/review/AVD-ART-00042
            </div>
          </div>

          <div className="flex h-[400px]">
            {/* Sidebar */}
            <div className="hidden w-52 shrink-0 border-r p-4 sm:block" style={{ borderColor: "var(--b)", backgroundColor: "var(--bg)" }}>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest" style={{ color: "var(--t3)" }}>
                Active Reviews
              </p>
              {[
                { id: "AVD-ART-00042", name: "CARDIVEX 10 mg", status: "In Review", active: true },
                { id: "AVD-ART-00039", name: "ARLOZYB 5/80 mg", status: "Complete", active: false },
                { id: "AVD-GAP-00031", name: "MAKTUDA 40 mg", status: "Pending", active: false },
              ].map((d) => (
                <div
                  key={d.id}
                  className="mb-1 rounded-lg px-3 py-2.5"
                  style={{ backgroundColor: d.active ? "rgba(79,70,229,.1)" : undefined }}
                >
                  <p className="text-xs font-medium" style={{ color: d.active ? "var(--indigo-light)" : "var(--t2)" }}>
                    {d.id}
                  </p>
                  <p className="text-[10px]" style={{ color: "var(--t3)" }}>{d.name} · {d.status}</p>
                </div>
              ))}
            </div>

            {/* Main */}
            <div className="flex flex-1 flex-col overflow-hidden">
              <div className="flex items-center justify-between border-b px-5 py-3" style={{ borderColor: "var(--b)" }}>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--t)" }}>CARDIVEX 10 mg — Artwork Review</p>
                  <p className="text-xs" style={{ color: "var(--t3)" }}>nexivarin · AVD-ART-00042 · SAHPRA</p>
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
                        <span className="text-[10px]" style={{ color: "var(--t3)" }}>Dosage error — Section 4.2</span>
                      </div>
                      <div className="space-y-1.5">
                        <div className="h-1.5 w-full rounded-full bg-red-500/10" />
                        <div className="h-1.5 w-4/5 rounded-full bg-red-500/10" />
                      </div>
                    </div>
                    <div className="rounded-lg border border-orange-500/25 bg-orange-500/5 px-4 py-3">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="rounded bg-orange-500/15 px-1.5 py-0.5 text-[10px] font-bold uppercase text-orange-400">Major</span>
                        <span className="text-[10px]" style={{ color: "var(--t3)" }}>Off-label indication — Section 4.1</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-orange-500/10" />
                    </div>
                    <div className="h-2 w-full rounded-full" style={{ backgroundColor: "var(--b)" }} />
                    <div className="h-2 w-2/3 rounded-full" style={{ backgroundColor: "var(--b)" }} />
                  </div>
                </div>

                <div className="hidden w-60 shrink-0 border-l p-4 lg:block" style={{ borderColor: "var(--b)" }}>
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest" style={{ color: "var(--t3)" }}>
                    Findings
                  </p>
                  {[
                    { code: "CRIT", color: "text-red-400", bg: "bg-red-500/10", text: "Initiation dose 5 mg BD. PI requires 10 mg BD." },
                    { code: "MAJ", color: "text-orange-400", bg: "bg-orange-500/10", text: "Promotional claim extends beyond approved indication." },
                    { code: "MAJ", color: "text-orange-400", bg: "bg-orange-500/10", text: "Superiority language without supporting PI data." },
                    { code: "MIN", color: "text-slate-400", bg: "bg-slate-500/10", text: "Address differs from SAHPRA certificate holder." },
                  ].map((f, i) => (
                    <div key={i} className="mb-2 rounded-lg p-2.5" style={{ backgroundColor: "var(--b)" }}>
                      <span className={`mb-1.5 inline-block rounded px-1.5 py-0.5 text-[9px] font-bold ${f.bg} ${f.color}`}>
                        {f.code}
                      </span>
                      <p className="text-[11px] leading-relaxed" style={{ color: "var(--t2)" }}>{f.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
