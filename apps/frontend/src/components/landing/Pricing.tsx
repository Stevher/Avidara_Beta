const plans = [
  {
    name: "Starter",
    price: "$499",
    period: "/month",
    description: "For small teams beginning to modernize their regulatory workflows.",
    features: [
      "Up to 20 document reviews/month",
      "AI compliance scanning",
      "2 team members",
      "Standard report export",
      "Email support",
    ],
    cta: "Get started",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$1,499",
    period: "/month",
    description: "For growing regulatory teams managing multiple active submissions.",
    features: [
      "Unlimited document reviews",
      "Full AI analysis suite",
      "Up to 15 team members",
      "Advanced audit-ready reports",
      "Priority support",
      "SSO & RBAC",
      "Version history & audit trail",
    ],
    cta: "Get started",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations with complex compliance requirements and custom needs.",
    features: [
      "Everything in Professional",
      "Unlimited team members",
      "Private cloud deployment",
      "Custom AI model fine-tuning",
      "Dedicated success manager",
      "SLA guarantees",
      "Custom integrations",
    ],
    cta: "Contact us",
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-[#0f0f14] px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-indigo-400">Pricing</p>
          <h2 className="text-4xl font-bold tracking-tight text-white">Simple, transparent pricing</h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            No per-seat surprises. Scale your regulatory operations without scaling your costs unpredictably.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-8 ${
                plan.highlighted
                  ? "border-indigo-500/50 bg-indigo-500/5 shadow-lg shadow-indigo-500/10"
                  : "border-white/[0.06] bg-white/[0.02]"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-indigo-500 px-3 py-1 text-xs font-medium text-white">
                    Most popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="mb-1 text-base font-semibold text-white">{plan.name}</h3>
                <div className="mb-3 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  {plan.period && <span className="text-slate-400">{plan.period}</span>}
                </div>
                <p className="text-sm text-slate-400">{plan.description}</p>
              </div>

              <ul className="mb-8 flex flex-col gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-slate-300">
                    <svg
                      className="mt-0.5 flex-shrink-0 text-indigo-400"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 8l3.5 3.5L13 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#request-access"
                className={`mt-auto inline-flex h-11 w-full items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                  plan.highlighted
                    ? "bg-indigo-500 text-white hover:bg-indigo-400"
                    : "border border-white/10 text-slate-300 hover:border-white/20 hover:text-white"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
