import FadeIn from "@/components/FadeIn";

const findings = [
  {
    severity: "Critical",
    code: "CRIT",
    color: "text-red-400",
    border: "border-red-500/30",
    bg: "bg-red-500/5",
    badge: "bg-red-500/15 text-red-400",
    title: "Wrong dosing on artwork",
    body: "Initiation shown as 5 mg BD. PI requires 10 mg BD. Missed across three internal reviews.",
  },
  {
    severity: "Major",
    code: "MAJ",
    color: "text-orange-400",
    border: "border-orange-500/30",
    bg: "bg-orange-500/5",
    badge: "bg-orange-500/15 text-orange-400",
    title: "Off-label indication creep",
    body: "Promotional claim extends beyond the approved indication. Not caught before the print run.",
  },
  {
    severity: "Major",
    code: "MAJ",
    color: "text-orange-400",
    border: "border-orange-500/30",
    bg: "bg-orange-500/5",
    badge: "bg-orange-500/15 text-orange-400",
    title: "Non-PI comparative claim",
    body: "Superiority language used without supporting data in the approved label.",
  },
  {
    severity: "Minor",
    code: "MIN",
    color: "text-slate-400",
    border: "border-slate-500/30",
    bg: "bg-slate-500/5",
    badge: "bg-slate-500/15 text-slate-400",
    title: "Address discrepancy",
    body: "Promotional material address differs from the SAHPRA certificate holder address.",
  },
];

export default function Problem() {
  return (
    <section className="bg-[#0f172a] px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn className="mb-16 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#10b981]">
            The challenge
          </p>
          <h2
            className="mb-6 text-4xl font-bold tracking-tight text-white"
            style={{ fontFamily: "var(--font-fraunces), serif" }}
          >
            Compliance gaps are invisible, until they are not.
          </h2>
          <p className="text-lg leading-relaxed text-slate-400">
            Regulatory teams are stretched. Internal reviewers face commercial pressure.
            Rulebooks never stop growing. One overlooked finding, a wrong dosing figure,
            a non-PI claim, can delay a launch, trigger a recall, or draw regulatory action.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-slate-400">
            You know your products better than anyone. What you need is
            a second set of eyes that answers to no one but the rulebook.
          </p>
        </FadeIn>

        <FadeIn delay={150}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {findings.map((f) => (
              <div
                key={f.title}
                className={`rounded-xl border ${f.border} ${f.bg} p-5`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className={`rounded px-2 py-0.5 text-xs font-bold uppercase tracking-wide ${f.badge}`}>
                    {f.code}
                  </span>
                </div>
                <h3 className="mb-2 text-sm font-semibold text-white">{f.title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{f.body}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
