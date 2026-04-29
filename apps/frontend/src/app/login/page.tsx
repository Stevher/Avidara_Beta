"use client";

import { useState, FormEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Logo from "@/components/Logo";

function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        const from = searchParams.get("from") || "/";
        router.push(from);
        router.refresh();
      } else {
        setError("Incorrect password.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
        required
        className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--indigo)]"
        style={{
          backgroundColor: "var(--bg)",
          borderColor: "var(--b2)",
          color: "var(--t)",
        }}
      />

      {error && (
        <p className="text-xs font-medium" style={{ color: "#f43f5e" }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading || !password}
        className="rounded-xl bg-[var(--indigo)] py-3 text-sm font-semibold text-white transition-all hover:bg-[var(--indigo-deep)] disabled:opacity-50"
      >
        {loading ? "Checking…" : "Enter"}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div
      className="flex min-h-screen items-center justify-center px-6"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div
        className="pointer-events-none fixed left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full blur-[120px]"
        style={{ background: "radial-gradient(ellipse, rgba(79,70,229,.1) 0%, transparent 70%)" }}
      />

      <div className="relative w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Logo height={40} />
        </div>

        <div
          className="rounded-2xl border p-8"
          style={{ borderColor: "var(--b)", backgroundColor: "var(--surf)" }}
        >
          <h1
            className="mb-1 text-xl font-bold"
            style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--t)" }}
          >
            Preview access
          </h1>
          <p className="mb-6 text-sm" style={{ color: "var(--t3)" }}>
            This site is password protected during pre-launch.
          </p>

          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>

        <p className="mt-6 text-center text-xs" style={{ color: "var(--t3)" }}>
          &copy; {new Date().getFullYear()} Avidara (Pty) Ltd
        </p>
      </div>
    </div>
  );
}
