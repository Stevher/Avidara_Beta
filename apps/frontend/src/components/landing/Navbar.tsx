export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-[#0b0b0f]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 2L15.5 6V12L9 16L2.5 12V6L9 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M9 6V12M6 7.5L12 10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-[15px] font-semibold tracking-tight text-white">Avidara</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm text-slate-400 transition-colors hover:text-white">Features</a>
          <a href="#how-it-works" className="text-sm text-slate-400 transition-colors hover:text-white">How it works</a>
          <a href="#pricing" className="text-sm text-slate-400 transition-colors hover:text-white">Pricing</a>
        </div>

        <div className="flex items-center gap-3">
          <a href="#" className="text-sm text-slate-400 transition-colors hover:text-white">Sign in</a>
          <a
            href="#request-access"
            className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-400"
          >
            Request access
          </a>
        </div>
      </div>
    </nav>
  );
}
