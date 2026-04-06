export default function CTA() {
  return (
    <section id="request-access" className="bg-[#0b0b0f] px-6 py-32">
      <div className="mx-auto max-w-3xl text-center">
        <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 px-8 py-16">
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-white">
            Ready to transform your regulatory process?
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-slate-400">
            Join the teams already using Avidara to submit faster, with fewer deficiencies.
            Request early access today.
          </p>
          <form className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <input
              type="email"
              placeholder="you@yourcompany.com"
              className="h-12 w-full rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 sm:w-72"
            />
            <button
              type="submit"
              className="h-12 w-full rounded-lg bg-indigo-500 px-6 text-sm font-medium text-white transition-colors hover:bg-indigo-400 sm:w-auto"
            >
              Request access
            </button>
          </form>
          <p className="mt-4 text-xs text-slate-600">No credit card required. We&apos;ll reach out within 24 hours.</p>
        </div>
      </div>
    </section>
  );
}
