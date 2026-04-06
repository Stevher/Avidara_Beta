import FadeIn from "@/components/FadeIn";

const testimonials = [
  {
    quote:
      "We cut our NDA review cycle from six weeks to four days. Avidara flagged a CMC section gap that would have caused a major delay — caught before submission.",
    name: "Dr. Sarah Chen",
    role: "VP of Regulatory Affairs",
    company: "Meridian Biopharma",
    initials: "SC",
  },
  {
    quote:
      "Our team was skeptical about AI in regulatory work. After the first IND submission with Avidara, every skeptic became a convert. The accuracy is remarkable.",
    name: "James Okafor",
    role: "Director of CMC Regulatory",
    company: "Nexagen Therapeutics",
    initials: "JO",
  },
  {
    quote:
      "The audit trail alone is worth it. When FDA asked questions during review, we could trace every decision back to source documents in seconds, not hours.",
    name: "Dr. Priya Mehta",
    role: "Head of Global Regulatory Strategy",
    company: "Solara Life Sciences",
    initials: "PM",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#0b0b0f] px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-indigo-400">Testimonials</p>
          <h2 className="text-4xl font-bold tracking-tight text-white">
            Trusted by regulatory teams that can&apos;t afford mistakes
          </h2>
        </FadeIn>

        <FadeIn delay={150}>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col gap-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8 1l1.8 3.6 4 .6-2.9 2.8.7 4-3.6-1.9L4.4 12l.7-4L2.2 5.2l4-.6L8 1z"
                      fill="#818cf8"
                    />
                  </svg>
                ))}
              </div>

              <p className="flex-1 text-sm leading-relaxed text-slate-300">&ldquo;{t.quote}&rdquo;</p>

              <div className="flex items-center gap-3 border-t border-white/[0.06] pt-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500/20 text-xs font-semibold text-indigo-300">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{t.name}</p>
                  <p className="text-xs text-slate-500">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        </FadeIn>
      </div>
    </section>
  );
}
