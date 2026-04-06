export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0b0b0f] px-6 pt-24 pb-32 text-center">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[600px] rounded-full bg-indigo-500/10 blur-[120px]" />
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
        <div className="mt-20 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 border-t border-white/[0.06] pt-10">
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
    </section>
  );
}
