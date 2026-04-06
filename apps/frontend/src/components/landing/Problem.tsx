import FadeIn from "@/components/FadeIn";

const findings = [
  {
    code: "CRIT",
    title: "Wrong dosing on artwork",
    body: "Initiation shown as 5 mg BD. PI requires 10 mg BD. Missed across three internal reviews.",
    border: "rgba(239,68,68,.25)",
    bg: "rgba(239,68,68,.04)",
    badgeBg: "rgba(239,68,68,.12)",
    badgeColor: "#f87171",
  },
  {
    code: "MAJ",
    title: "Off-label indication creep",
    body: "Promotional claim extends beyond the approved indication. Not caught before the print run.",
    border: "rgba(249,115,22,.25)",
    bg: "rgba(249,115,22,.04)",
    badgeBg: "rgba(249,115,22,.12)",
    badgeColor: "#fb923c",
  },
  {
    code: "MAJ",
    title: "Non-PI comparative claim",
    body: "Superiority language used without supporting data in the approved label.",
    border: "rgba(249,115,22,.25)",
    bg: "rgba(249,115,22,.04)",
    badgeBg: "rgba(249,115,22,.12)",
    badgeColor: "#fb923c",
  },
  {
    code: "MIN",
    title: "Address discrepancy",
    body: "Promotional material address differs from the SAHPRA certificate holder address.",
    border: "var(--b2)",
    bg: "var(--b)",
    badgeBg: "var(--b2)",
    badgeColor: "var(--t3)",
  },
];

export default function Problem() {
  return (
    <section className="px-6 py-32" style={{ backgroundColor: "var(--bg2)" }}>
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.6fr] lg:items-center">
          <FadeIn>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest" style={{ color: "var(--emerald)" }}>
              The challenge
            </p>
            <h2
              className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight"
              style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--t)" }}
            >
              Compliance gaps are invisible, until they are not.
            </h2>
            <p className="mb-4 text-lg leading-relaxed" style={{ color: "var(--t2)" }}>
              Regulatory teams are stretched. Internal reviewers face commercial pressure.
              Rulebooks never stop growing. One overlooked finding, a wrong dosing figure,
              a non-PI claim, can delay a launch, trigger a recall, or draw regulatory action.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: "var(--t2)" }}>
              You know your products better than anyone. What you need is a second set of eyes
              that answers to no one but the rulebook.
            </p>
          </FadeIn>

          <FadeIn delay={150}>
            <div className="grid gap-3 sm:grid-cols-2">
              {findings.map((f) => (
                <div
                  key={f.title}
                  className="rounded-xl border p-5"
                  style={{ borderColor: f.border, backgroundColor: f.bg }}
                >
                  <span
                    className="mb-3 inline-block rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                    style={{ backgroundColor: f.badgeBg, color: f.badgeColor }}
                  >
                    {f.code}
                  </span>
                  <h3 className="mb-2 text-sm font-semibold" style={{ color: "var(--t)" }}>{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--t2)" }}>{f.body}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
