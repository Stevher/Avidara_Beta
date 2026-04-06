export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0f172a] px-6 pb-0 pt-32 text-center">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 flex items-start justify-center pt-10">
        <div className="h-[500px] w-[700px] rounded-full bg-[#4f46e5]/10 blur-[130px]" />
      </div>

      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#10b981]/30 bg-[#10b981]/10 px-4 py-1.5 text-sm text-[#34d399]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#10b981]" />
          Compliance Intelligence Platform
        </div>

        <h1
          className="mb-6 text-5xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl"
          style={{ fontFamily: "var(--font-fraunces), serif" }}
        >
          Your compliance layer.{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #818cf8 0%, #10b981 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Independent, intelligent, precise.
          </span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-400">
          Avidara stands outside every industry it serves as an independent external review layer.
          It finds what internal teams miss, before regulators do.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#book"
            className="inline-flex h-12 items-center gap-2 rounded-lg bg-[#4f46e5] px-6 text-sm font-semibold text-white shadow-lg shadow-[#4f46e5]/20 transition-all hover:bg-[#3730a3]"
          >
            Book a review
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#platform"
            className="inline-flex h-12 items-center gap-2 rounded-lg border border-white/10 px-6 text-sm font-medium text-slate-300 transition-all hover:border-white/20 hover:text-white"
          >
            See how it works
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 border-t border-white/[0.06] pt-10">
          {[
            { value: "Minutes", label: "Report delivery" },
            { value: "6+", label: "Regulatory rulesets encoded" },
            { value: "100%", label: "Your accountability preserved" },
            { value: "Zero", label: "Gaps missed" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-fraunces), serif" }}>
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mock UI — CARDIVEX Artwork Review */}
      <div className="relative z-10 mx-auto mt-20 max-w-5xl">
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-32 bg-gradient-to-t from-[#0f172a] to-transparent" />

        <div className="overflow-hidden rounded-t-2xl border border-white/[0.08] bg-[#111827] shadow-2xl shadow-black/60">
          {/* Window chrome */}
          <div className="flex items-center gap-2 border-b border-white/[0.06] bg-[#0f172a] px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-red-500/60" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
            <div className="h-3 w-3 rounded-full bg-green-500/60" />
            <div className="mx-auto flex h-6 w-64 items-center justify-center rounded-md bg-white/[0.04] text-xs text-slate-500">
              app.avidara.co.za/review/AVD-ART-00042
            </div>
          </div>

          {/* App layout */}
          <div className="flex h-[420px]">
            {/* Sidebar */}
            <div className="hidden w-52 flex-shrink-0 border-r border-white/[0.06] bg-[#0d1424] p-4 sm:block">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-600">Active Reviews</p>
              {[
                { id: "AVD-ART-00042", product: "CARDIVEX 10 mg", status: "In Review", active: true },
                { id: "AVD-ART-00039", product: "ARLOZYB 5/80 mg", status: "Complete", active: false },
                { id: "AVD-GAP-00031", product: "MAKTUDA 40 mg", status: "Pending", active: false },
              ].map((doc) => (
                <div
                  key={doc.id}
                  className={`mb-1 rounded-lg px-3 py-2.5 ${doc.active ? "bg-[#4f46e5]/10" : ""}`}
                >
                  <p className={`text-xs font-medium ${doc.active ? "text-[#818cf8]" : "text-slate-400"}`}>
                    {doc.id}
                  </p>
                  <p className="text-[10px] text-slate-600">{doc.product}</p>
                  <p className="text-[10px] text-slate-600">{doc.status}</p>
                </div>
              ))}
            </div>

            {/* Main panel */}
            <div className="flex flex-1 flex-col overflow-hidden">
              {/* Top bar */}
              <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-3">
                <div>
                  <p className="text-sm font-medium text-white">CARDIVEX 10 mg Tablets — Artwork Review</p>
                  <p className="text-xs text-slate-500">nexivarin hydrochloride · AVD-ART-00042 · SAHPRA</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-400">
                    1 critical
                  </span>
                  <span className="rounded-full bg-orange-500/10 px-2.5 py-1 text-xs font-medium text-orange-400">
                    2 major
                  </span>
                  <span className="rounded-full bg-slate-500/10 px-2.5 py-1 text-xs font-medium text-slate-400">
                    1 minor
                  </span>
                </div>
              </div>

              <div className="flex flex-1 overflow-hidden">
                {/* Document preview */}
                <div className="flex-1 p-6">
                  <div className="space-y-3">
                    <div className="h-2.5 w-3/4 rounded-full bg-white/[0.06]" />
                    <div className="h-2.5 w-full rounded-full bg-white/[0.06]" />
                    {/* Critical finding highlight */}
                    <div className="relative rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-3">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide bg-red-500/15 text-red-400">
                          Critical
                        </span>
                        <span className="text-[10px] text-slate-500">Dosage error — Section 4.2</span>
                      </div>
                      <div className="space-y-1.5">
                        <div className="h-2 w-full rounded-full bg-red-500/10" />
                        <div className="h-2 w-4/5 rounded-full bg-red-500/10" />
                      </div>
                    </div>
                    {/* Major finding highlight */}
                    <div className="relative rounded-lg border border-orange-500/30 bg-orange-500/5 px-4 py-3">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide bg-orange-500/15 text-orange-400">
                          Major
                        </span>
                        <span className="text-[10px] text-slate-500">Off-label indication — Section 4.1</span>
                      </div>
                      <div className="space-y-1.5">
                        <div className="h-2 w-full rounded-full bg-orange-500/10" />
                        <div className="h-2 w-3/5 rounded-full bg-orange-500/10" />
                      </div>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-white/[0.06]" />
                    <div className="h-2.5 w-2/3 rounded-full bg-white/[0.06]" />
                  </div>
                </div>

                {/* Findings panel */}
                <div className="hidden w-64 flex-shrink-0 border-l border-white/[0.06] p-4 lg:block">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-600">Findings</p>
                  {[
                    {
                      severity: "critical",
                      label: "CRIT",
                      color: "text-red-400",
                      bg: "bg-red-500/10",
                      text: "Initiation dose shown as 5 mg BD. PI requires 10 mg BD. Missed across three internal reviews.",
                    },
                    {
                      severity: "major",
                      label: "MAJ",
                      color: "text-orange-400",
                      bg: "bg-orange-500/10",
                      text: "Promotional claim extends beyond the approved indication. Not caught before print run.",
                    },
                    {
                      severity: "major",
                      label: "MAJ",
                      color: "text-orange-400",
                      bg: "bg-orange-500/10",
                      text: "Superiority language used without supporting data in the approved label.",
                    },
                    {
                      severity: "minor",
                      label: "MIN",
                      color: "text-slate-400",
                      bg: "bg-slate-500/10",
                      text: "Address on artwork differs from SAHPRA certificate holder address.",
                    },
                  ].map((f, i) => (
                    <div key={i} className="mb-2 rounded-lg bg-white/[0.02] p-3">
                      <div className="mb-1.5 flex items-center gap-1.5">
                        <span className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${f.bg} ${f.color}`}>
                          {f.label}
                        </span>
                      </div>
                      <p className="text-[11px] leading-relaxed text-slate-400">{f.text}</p>
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
