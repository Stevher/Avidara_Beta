export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#0b0b0f] px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <a href="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 2L15.5 6V12L9 16L2.5 12V6L9 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M9 6V12M6 7.5L12 10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-[15px] font-semibold tracking-tight text-white">Avidara</span>
            </a>
            <p className="text-sm leading-relaxed text-slate-500">
              AI-powered regulatory review for pharmaceutical teams.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Product</h4>
            <ul className="space-y-3">
              {["Features", "How it works", "Pricing", "Security", "Changelog"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-slate-500 transition-colors hover:text-slate-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Company</h4>
            <ul className="space-y-3">
              {["About", "Blog", "Careers", "Contact", "Press"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-slate-500 transition-colors hover:text-slate-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Legal</h4>
            <ul className="space-y-3">
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "HIPAA Compliance", "SOC 2"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-slate-500 transition-colors hover:text-slate-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} Avidara, Inc. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            Built for pharmaceutical regulatory affairs professionals.
          </p>
        </div>
      </div>
    </footer>
  );
}
