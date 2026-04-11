"use client";

import { useState, useEffect, useCallback } from "react";

interface Message {
  role: string;
  content: string;
}

interface Conversation {
  id: string;
  createdAt: number;
  updatedAt: number;
  page: string;
  ipHash: string;
  firstMessage: string;
  messageCount: number;
  messages: Message[];
}

interface Stats {
  today: number;
  thisWeek: number;
  totalSessions: number;
  totalMessages: number;
  topPages: { page: string; count: number }[];
}

interface ApiResponse {
  total: number;
  conversations: Conversation[];
  stats: Stats;
}

function timeAgo(ms: number): string {
  const diff = Date.now() - ms;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function formatDate(ms: number): string {
  return new Date(ms).toLocaleString("en-ZA", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

// ── Login screen ──────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: (pw: string) => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    // Quick pre-check — actual auth is enforced server-side
    const res = await fetch("/api/admin/data?limit=1", {
      headers: { Authorization: `Bearer ${pw}` },
    });
    if (res.ok) {
      sessionStorage.setItem("admin_pw", pw);
      onLogin(pw);
    } else {
      setError(true);
    }
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center px-6"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div
        className="w-full max-w-sm rounded-2xl border p-8"
        style={{ borderColor: "var(--b2)", backgroundColor: "var(--surf)" }}
      >
        <div className="mb-6 flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ backgroundColor: "var(--indigo)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <div>
            <h1 className="text-base font-bold" style={{ color: "var(--t)" }}>Avidara Admin</h1>
            <p className="text-xs" style={{ color: "var(--t3)" }}>Chat reports</p>
          </div>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-3">
          <input
            type="password"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setError(false); }}
            placeholder="Admin password"
            autoFocus
            className="w-full rounded-xl border px-4 py-3 text-sm outline-none"
            style={{
              borderColor: error ? "#ef4444" : "var(--b2)",
              backgroundColor: "var(--bg)",
              color: "var(--t)",
            }}
          />
          {error && (
            <p className="text-xs" style={{ color: "#ef4444" }}>Incorrect password.</p>
          )}
          <button
            type="submit"
            className="rounded-xl py-3 text-sm font-semibold text-white transition-opacity hover:opacity-80"
            style={{ backgroundColor: "var(--indigo)" }}
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Stat card ─────────────────────────────────────────────────────────────
function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div
      className="rounded-xl border p-5"
      style={{ borderColor: "var(--b)", backgroundColor: "var(--surf)" }}
    >
      <p className="mb-1 text-xs font-medium uppercase tracking-wider" style={{ color: "var(--t3)" }}>{label}</p>
      <p className="text-3xl font-bold" style={{ color: "var(--t)" }}>{value}</p>
    </div>
  );
}

// ── Transcript modal ───────────────────────────────────────────────────────
function TranscriptModal({ conversation, onClose }: { conversation: Conversation; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,.6)" }}
      onClick={onClose}
    >
      <div
        className="flex max-h-[80vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl border"
        style={{ borderColor: "var(--b2)", backgroundColor: "var(--bg)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-start justify-between border-b px-5 py-4"
          style={{ borderColor: "var(--b)" }}
        >
          <div>
            <p className="text-sm font-semibold" style={{ color: "var(--t)" }}>
              {conversation.messageCount} message{conversation.messageCount !== 1 ? "s" : ""}
              &nbsp;·&nbsp;
              <span style={{ color: "var(--t3)" }}>{conversation.page}</span>
            </p>
            <p className="mt-0.5 text-xs" style={{ color: "var(--t3)" }}>
              {formatDate(conversation.createdAt)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
            style={{ color: "var(--t2)" }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {conversation.messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className="max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed"
                style={
                  msg.role === "user"
                    ? { backgroundColor: "var(--indigo)", color: "#fff" }
                    : { backgroundColor: "var(--surf2)", color: "var(--t)", border: "1px solid var(--b)" }
                }
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────
function Dashboard({ password }: { password: string }) {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Conversation | null>(null);
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 20;

  const fetchData = useCallback(async (offset: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/data?limit=${PAGE_SIZE}&offset=${offset}`, {
        headers: { Authorization: `Bearer ${password}` },
      });
      if (!res.ok) throw new Error(await res.text());
      setData(await res.json());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [password]);

  useEffect(() => {
    fetchData(page * PAGE_SIZE);
  }, [fetchData, page]);

  const stats = data?.stats;
  const conversations = data?.conversations ?? [];
  const total = data?.total ?? 0;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      {/* Top bar */}
      <header
        className="sticky top-0 z-10 border-b px-6 py-4"
        style={{ borderColor: "var(--b)", backgroundColor: "var(--bg)" }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{ backgroundColor: "var(--indigo)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <span className="text-sm font-semibold" style={{ color: "var(--t)" }}>Chat Reports</span>
          </div>
          <button
            onClick={() => fetchData(page * PAGE_SIZE)}
            className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-opacity hover:opacity-70"
            style={{ borderColor: "var(--b2)", color: "var(--t2)" }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 4v6h-6M1 20v-6h6"/>
              <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
            </svg>
            Refresh
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {/* Stats row */}
        {stats && (
          <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard label="Today" value={stats.today} />
            <StatCard label="This week" value={stats.thisWeek} />
            <StatCard label="All sessions" value={stats.totalSessions} />
            <StatCard label="Total messages" value={stats.totalMessages} />
          </div>
        )}

        {/* Top pages */}
        {stats && stats.topPages.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-wider" style={{ color: "var(--t3)" }}>
              Top pages
            </h2>
            <div className="flex flex-wrap gap-2">
              {stats.topPages.map((p) => (
                <div
                  key={p.page}
                  className="flex items-center gap-2 rounded-full border px-3 py-1 text-xs"
                  style={{ borderColor: "var(--b)", backgroundColor: "var(--surf)" }}
                >
                  <span style={{ color: "var(--t2)" }}>{p.page || "/"}</span>
                  <span
                    className="flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white"
                    style={{ backgroundColor: "var(--indigo)" }}
                  >
                    {p.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Conversations table */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--t3)" }}>
              Recent conversations {total > 0 && `(${total})`}
            </h2>
          </div>

          {loading && (
            <div className="flex justify-center py-16">
              <div
                className="h-6 w-6 animate-spin rounded-full border-2 border-t-transparent"
                style={{ borderColor: "var(--indigo)", borderTopColor: "transparent" }}
              />
            </div>
          )}

          {error && (
            <div
              className="rounded-xl border p-4 text-sm"
              style={{ borderColor: "#ef444440", backgroundColor: "#ef444412", color: "#ef4444" }}
            >
              {error}
            </div>
          )}

          {!loading && !error && conversations.length === 0 && (
            <div
              className="rounded-xl border p-8 text-center text-sm"
              style={{ borderColor: "var(--b)", color: "var(--t3)" }}
            >
              No conversations yet. They will appear here once users start chatting.
            </div>
          )}

          {!loading && conversations.length > 0 && (
            <div
              className="overflow-hidden rounded-xl border"
              style={{ borderColor: "var(--b)" }}
            >
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "var(--surf)", borderBottom: "1px solid var(--b)" }}>
                    {["Time", "Page", "First message", "Messages"].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                        style={{ color: "var(--t3)" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {conversations.map((c, i) => (
                    <tr
                      key={c.id}
                      className="cursor-pointer transition-colors hover:opacity-80"
                      style={{
                        borderTop: i > 0 ? "1px solid var(--b)" : undefined,
                        backgroundColor: "var(--bg)",
                      }}
                      onClick={() => setSelected(c)}
                    >
                      <td className="whitespace-nowrap px-4 py-3" style={{ color: "var(--t2)" }}>
                        <span title={formatDate(c.createdAt)}>{timeAgo(c.createdAt)}</span>
                      </td>
                      <td className="px-4 py-3" style={{ color: "var(--t2)" }}>
                        <span className="font-mono text-xs">{c.page || "/"}</span>
                      </td>
                      <td className="max-w-xs px-4 py-3" style={{ color: "var(--t)" }}>
                        <span className="line-clamp-1">{c.firstMessage}</span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-center" style={{ color: "var(--t3)" }}>
                        {c.messageCount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {total > PAGE_SIZE && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs" style={{ color: "var(--t3)" }}>
                Showing {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, total)} of {total}
              </p>
              <div className="flex gap-2">
                <button
                  disabled={page === 0}
                  onClick={() => setPage((p) => p - 1)}
                  className="rounded-lg border px-3 py-1.5 text-xs font-medium transition-opacity disabled:opacity-30"
                  style={{ borderColor: "var(--b2)", color: "var(--t2)" }}
                >
                  Previous
                </button>
                <button
                  disabled={(page + 1) * PAGE_SIZE >= total}
                  onClick={() => setPage((p) => p + 1)}
                  className="rounded-lg border px-3 py-1.5 text-xs font-medium transition-opacity disabled:opacity-30"
                  style={{ borderColor: "var(--b2)", color: "var(--t2)" }}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {selected && (
        <TranscriptModal conversation={selected} onClose={() => setSelected(null)} />
      )}

      <style>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

// ── Root ─────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [password, setPassword] = useState<string | null>(null);

  // Restore session
  useEffect(() => {
    const saved = sessionStorage.getItem("admin_pw");
    if (saved) setPassword(saved);
  }, []);

  if (!password) {
    return <LoginScreen onLogin={setPassword} />;
  }

  return <Dashboard password={password} />;
}
