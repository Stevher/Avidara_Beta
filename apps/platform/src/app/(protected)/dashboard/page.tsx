import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--indigo)" }}>
              Avidara Platform
            </p>
            <h1 className="text-2xl font-bold" style={{ color: "var(--t)" }}>Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm" style={{ color: "var(--t2)" }}>{session.user.email}</span>
            <form action={async () => { "use server"; await signOut({ redirectTo: "/login" }); }}>
              <button
                type="submit"
                className="text-sm px-4 py-2 rounded-lg border transition-opacity hover:opacity-70"
                style={{ borderColor: "var(--b2)", color: "var(--t2)" }}
              >
                Sign out
              </button>
            </form>
          </div>
        </div>

        {/* Upload card — placeholder */}
        <div
          className="rounded-2xl border-2 border-dashed p-16 text-center"
          style={{ borderColor: "var(--b2)" }}
        >
          <p className="text-lg font-semibold mb-2" style={{ color: "var(--t)" }}>
            Upload a document to review
          </p>
          <p className="text-sm" style={{ color: "var(--t2)" }}>
            Document upload and analysis coming next.
          </p>
        </div>
      </div>
    </div>
  );
}
