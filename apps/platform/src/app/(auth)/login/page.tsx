import { signIn } from "@/auth";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div
        className="w-full max-w-sm rounded-2xl border p-8"
        style={{ backgroundColor: "var(--surf)", borderColor: "var(--b2)" }}
      >
        <div className="mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--indigo)" }}>
            Avidara
          </p>
          <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--t)" }}>
            Platform
          </h1>
          <p className="text-sm" style={{ color: "var(--t2)" }}>
            Sign in to access the compliance platform
          </p>
        </div>

        <form
          action={async () => {
            "use server";
            await signIn("microsoft-entra-id", { redirectTo: "/dashboard" });
          }}
        >
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 rounded-xl py-3 px-4 text-sm font-semibold transition-opacity hover:opacity-80"
            style={{ backgroundColor: "var(--indigo)", color: "#fff" }}
          >
            <svg width="18" height="18" viewBox="0 0 21 21" fill="none">
              <rect x="1" y="1" width="9" height="9" fill="#f25022" />
              <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
              <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
              <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
            </svg>
            Sign in with Microsoft
          </button>
        </form>
      </div>
    </div>
  );
}
