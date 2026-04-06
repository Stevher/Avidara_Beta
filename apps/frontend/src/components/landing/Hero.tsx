export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0b0b0f] px-6 pb-0 pt-32 text-center">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 flex items-start justify-center pt-20">
        <div className="h-[500px] w-[700px] rounded-full bg-indigo-500/10 blur-[120px]" />
      </div>

      {/* Grid lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-300">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
          Now in private beta
        </div>

        <h1 className="mb-6 text-5xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl">
          Regulatory review,{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
            reimagined
          </span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-400">
          Avidara brings AI precision to pharmaceutical document compliance — from IND submissions
          to NDA reviews. Cut review cycles from weeks to hours.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#request-access"
            className="inline-flex h-12 items-center gap-2 rounded-lg bg-indigo-500 px-6 text-sm font-medium text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-400 hover:shadow-indigo-400/30"
          >
            Request early access
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#how-it-works"
            className="inline-flex h-12 items-center gap-2 rounded-lg border border-white/10 px-6 text-sm font-medium text-slate-300 transition-all hover:border-white/20 hover:text-white"
          >
            See how it works
          </a>
        </div>

        {/* Stats row */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 border-t border-white/[0.06] pt-10">
          {[
            { value: "90%", label: "Reduction in review time" },
            { value: "500+", label: "Regulatory documents processed" },
            { value: "99.8%", label: "Compliance accuracy rate" },
            { value: "3 hrs", label: "Average review turnaround" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mock UI Dashboard */}
      <div className="relative z-10 mx-auto mt-20 max-w-5xl">
        {/* Fade bottom edge into next section */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-32 bg-gradient-to-t from-[#0b0b0f] to-transparent" />

        <div className="overflow-hidden rounded-t-2xl border border-white/[0.08] bg-[#0f0f14] shadow-2xl shadow-black/60">
          {/* Window chrome */}
          <div className="flex items-center gap-2 border-b border-white/[0.06] bg-[#13131a] px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-red-500/60" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
            <div className="h-3 w-3 rounded-full bg-green-500/60" />
            <div className="mx-auto flex h-6 w-64 items-center justify-center rounded-md bg-white/[0.04] text-xs text-slate-500">
              app.avidara.io/review/IND-2024-0381
            </div>
          </div>

          {/* App layout */}
          <div className="flex h-[420px]">
            {/* Sidebar */}
            <div className="hidden w-52 flex-shrink-0 border-r border-white/[0.06] bg-[#0d0d12] p-4 sm:block">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-600">Active Reviews</p>
              {[
                { name: "IND-2024-0381", type: "IND", status: "In Review", active: true },
                { name: "NDA-2024-0112", type: "NDA", status: "Pending", active: false },
                { name: "CTD-2023-0887", type: "CTD", status: "Complete", active: false },
              ].map((doc) => (
                <div
                  key={doc.name}
                  className={`mb-1 rounded-lg px-3 py-2.5 ${doc.active ? "bg-indigo-500/10" : "hover:bg-white/[0.03]"}`}
                >
                  <p className={`text-xs font-medium ${doc.active ? "text-indigo-300" : "text-slate-400"}`}>
                    {doc.name}
                  </p>
                  <p className="text-[10px] text-slate-600">{doc.type} · {doc.status}</p>
                </div>
              ))}
            </div>

            {/* Main panel */}
            <div className="flex flex-1 flex-col overflow-hidden">
              {/* Top bar */}
              <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-3">
                <div>
                  <p className="text-sm font-medium text-white">IND-2024-0381 — Module 2.7.4</p>
                  <p className="text-xs text-slate-500">Summary of Clinical Safety · 142 pages</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-yellow-500/10 px-2.5 py-1 text-xs font-medium text-yellow-400">
                    4 findings
                  </span>
                  <span className="rounded-full bg-indigo-500/10 px-2.5 py-1 text-xs font-medium text-indigo-400">
                    AI reviewed
                  </span>
                </div>
              </div>

              {/* Content area */}
              <div className="flex flex-1 overflow-hidden">
                {/* Document preview */}
                <div className="flex-1 p-6">
                  <div className="space-y-3">
                    {/* Simulated document lines */}
                    <div className="h-2.5 w-3/4 rounded-full bg-white/[0.06]" />
                    <div className="h-2.5 w-full rounded-full bg-white/[0.06]" />
                    <div className="h-2.5 w-5/6 rounded-full bg-white/[0.06]" />
                    {/* Highlighted finding */}
                    <div className="relative rounded-lg border border-yellow-500/30 bg-yellow-500/5 px-4 py-3">
                      <div className="mb-2 flex items-center gap-2">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 1L7.5 4.5H11L8.5 6.5L9.5 10L6 8L2.5 10L3.5 6.5L1 4.5H4.5L6 1Z" fill="#eab308" />
                        </svg>
                        <span className="text-[10px] font-semibold uppercase tracking-wide text-yellow-400">Finding #2 — ICH E3 §9.4</span>
                      </div>
                      <div className="space-y-1.5">
                        <div className="h-2 w-full rounded-full bg-yellow-500/10" />
                        <div className="h-2 w-4/5 rounded-full bg-yellow-500/10" />
                        <div className="h-2 w-full rounded-full bg-yellow-500/10" />
                      </div>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-white/[0.06]" />
                    <div className="h-2.5 w-2/3 rounded-full bg-white/[0.06]" />
                    <div className="h-2.5 w-5/6 rounded-full bg-white/[0.06]" />
                    <div className="h-2.5 w-full rounded-full bg-white/[0.06]" />
                    <div className="h-2.5 w-3/4 rounded-full bg-white/[0.06]" />
                  </div>
                </div>

                {/* Findings panel */}
                <div className="hidden w-64 flex-shrink-0 border-l border-white/[0.06] p-4 lg:block">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-600">AI Findings</p>
                  {[
                    { id: 1, severity: "high", text: "Missing adverse event categorisation per ICH E3 §9.3" },
                    { id: 2, severity: "medium", text: "Incomplete exposure table — §9.4 requires duration subgroups" },
                    { id: 3, severity: "low", text: "Narrative format inconsistency in §9.5.1" },
                    { id: 4, severity: "low", text: "Reference formatting deviates from eCTD M1 spec" },
                  ].map((finding) => (
                    <div key={finding.id} className="mb-2 rounded-lg bg-white/[0.02] p-3">
                      <div className="mb-1.5 flex items-center gap-1.5">
                        <span className={`h-1.5 w-1.5 rounded-full ${
                          finding.severity === "high" ? "bg-red-400" :
                          finding.severity === "medium" ? "bg-yellow-400" : "bg-slate-500"
                        }`} />
                        <span className="text-[10px] font-medium uppercase tracking-wide text-slate-500">
                          {finding.severity}
                        </span>
                      </div>
                      <p className="text-[11px] leading-relaxed text-slate-400">{finding.text}</p>
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
