import FadeIn from "@/components/FadeIn";

const endpoints = [
  { method: "POST", path: "/v1/reviews", desc: "Submit a document for AI review" },
  { method: "GET", path: "/v1/reviews/:id", desc: "Retrieve review status and findings" },
  { method: "GET", path: "/v1/reviews/:id/report", desc: "Export audit-ready PDF report" },
  { method: "POST", path: "/v1/webhooks", desc: "Register a webhook for review events" },
];

const features = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 7l-4 3 4 3M14 7l4 3-4 3M11 4l-2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "REST API",
    description: "Clean, versioned REST endpoints. Submit documents, poll findings, and export reports programmatically.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 10a7 7 0 1 0 14 0A7 7 0 0 0 3 10z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 6v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Webhooks",
    description: "Subscribe to real-time events — review started, finding detected, review complete — delivered to your endpoint.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="5" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 9h6M7 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "TypeScript SDK",
    description: "First-class TypeScript support with full type definitions. Get up and running in minutes.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 3L4 6.5v5L10 15l6-3.5v-5L10 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M10 3v12M4 6.5l6 3.5 6-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Sandbox environment",
    description: "Full-featured staging environment with test documents and simulated AI responses. No production data required.",
  },
];

export default function Developers() {
  return (
    <section id="developers" className="bg-[#0b0b0f] px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-indigo-400">For developers</p>
          <h2 className="text-4xl font-bold tracking-tight text-white">
            Build on Avidara
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            Integrate AI-powered regulatory review directly into your existing systems. Our API is designed for developer partners building on the Avidara platform.
          </p>
        </FadeIn>

        <FadeIn delay={150}>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          {/* Left: feature list */}
          <div className="flex flex-col gap-8">
            {features.map((f) => (
              <div key={f.title} className="flex gap-4">
                <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                  {f.icon}
                </div>
                <div>
                  <h3 className="mb-1.5 text-sm font-semibold text-white">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{f.description}</p>
                </div>
              </div>
            ))}

            <div className="flex gap-3 pt-2">
              <a
                href="#request-access"
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-indigo-500 px-5 text-sm font-medium text-white transition-colors hover:bg-indigo-400"
              >
                Get API access
              </a>
              <a
                href="#"
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/10 px-5 text-sm font-medium text-slate-300 transition-colors hover:border-white/20 hover:text-white"
              >
                View docs
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right: code snippet */}
          <div className="rounded-2xl border border-white/[0.06] bg-[#0f0f14] overflow-hidden">
            {/* Tab bar */}
            <div className="flex items-center gap-1 border-b border-white/[0.06] bg-[#13131a] px-4 py-3">
              <div className="rounded-md bg-white/[0.06] px-3 py-1 text-xs text-slate-300">Quick start</div>
              <div className="rounded-md px-3 py-1 text-xs text-slate-500">Webhooks</div>
              <div className="rounded-md px-3 py-1 text-xs text-slate-500">Reports</div>
            </div>

            {/* Code block */}
            <div className="p-6 font-mono text-sm">
              <p className="mb-4 text-slate-500">{"// Submit a document for AI review"}</p>
              <p>
                <span className="text-violet-400">import</span>
                <span className="text-white"> {"{"} </span>
                <span className="text-indigo-300">AvidaraClient</span>
                <span className="text-white"> {"}"} </span>
                <span className="text-violet-400">from</span>
                <span className="text-green-400"> &apos;@avidara/sdk&apos;</span>
                <span className="text-white">;</span>
              </p>
              <p className="mt-4">
                <span className="text-violet-400">const</span>
                <span className="text-white"> client </span>
                <span className="text-slate-400">=</span>
                <span className="text-violet-400"> new</span>
                <span className="text-indigo-300"> AvidaraClient</span>
                <span className="text-white">{"({"}</span>
              </p>
              <p className="pl-4">
                <span className="text-slate-300">apiKey</span>
                <span className="text-slate-400">: </span>
                <span className="text-green-400">process.env.AVIDARA_API_KEY</span>
                <span className="text-white">,</span>
              </p>
              <p><span className="text-white">{"});"}</span></p>

              <p className="mt-4">
                <span className="text-violet-400">const</span>
                <span className="text-white"> review </span>
                <span className="text-slate-400">=</span>
                <span className="text-violet-400"> await</span>
                <span className="text-white"> client.reviews.</span>
                <span className="text-indigo-300">create</span>
                <span className="text-white">{"({"}</span>
              </p>
              <p className="pl-4">
                <span className="text-slate-300">document</span>
                <span className="text-slate-400">: </span>
                <span className="text-slate-300">fileBuffer</span>
                <span className="text-white">,</span>
              </p>
              <p className="pl-4">
                <span className="text-slate-300">type</span>
                <span className="text-slate-400">: </span>
                <span className="text-green-400">&apos;IND&apos;</span>
                <span className="text-white">,</span>
              </p>
              <p className="pl-4">
                <span className="text-slate-300">guidelines</span>
                <span className="text-slate-400">: </span>
                <span className="text-white">[</span>
                <span className="text-green-400">&apos;ICH-E3&apos;</span>
                <span className="text-white">, </span>
                <span className="text-green-400">&apos;FDA-IND&apos;</span>
                <span className="text-white">],</span>
              </p>
              <p><span className="text-white">{"});"}</span></p>

              <p className="mt-4 text-slate-500">{"// review.id, review.status, review.findings"}</p>
            </div>

            {/* Endpoint list */}
            <div className="border-t border-white/[0.06] px-6 py-4">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-600">API Endpoints</p>
              <div className="space-y-2">
                {endpoints.map((ep) => (
                  <div key={ep.path} className="flex items-center gap-3 text-xs">
                    <span className={`w-10 text-center rounded px-1.5 py-0.5 font-mono font-bold ${
                      ep.method === "POST" ? "bg-indigo-500/15 text-indigo-400" : "bg-slate-500/15 text-slate-400"
                    }`}>
                      {ep.method}
                    </span>
                    <span className="font-mono text-slate-300">{ep.path}</span>
                    <span className="hidden text-slate-600 sm:inline">{ep.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        </FadeIn>
      </div>
    </section>
  );
}
