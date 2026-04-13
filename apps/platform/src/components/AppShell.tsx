"use client";

import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type User = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

interface AppShellProps {
  user: User;
  children: React.ReactNode;
}

export default function AppShell({ user, children }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const pathname = usePathname();

  useEffect(() => {
    const saved = localStorage.getItem("av-theme") as "dark" | "light" | null;
    if (saved === "light") {
      setTheme("light");
      document.documentElement.classList.add("light");
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("av-theme", next);
    document.documentElement.classList.toggle("light", next === "light");
  };

  return (
    <div style={{ display: "flex", height: "100dvh", overflow: "hidden" }}>
      {/* ── Sidebar ─────────────────────────────────────────── */}
      <aside
        className="app-sidebar"
        style={{
          width: collapsed ? "var(--sb-col)" : "var(--sb)",
          minWidth: collapsed ? "var(--sb-col)" : "var(--sb)",
          height: "100dvh",
          background: "var(--sf)",
          borderRight: "1px solid var(--b2)",
          display: "flex",
          flexDirection: "column",
          transition: "width 0.2s ease, min-width 0.2s ease",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        {/* Logo */}
        <div
          style={{
            height: "var(--tb)",
            display: "flex",
            alignItems: "center",
            padding: collapsed ? "0 13px" : "0 16px",
            borderBottom: "1px solid var(--b2)",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 26, height: 26,
                background: "var(--accent)",
                borderRadius: 7,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span style={{ color: "#fff", fontWeight: 800, fontSize: 13, letterSpacing: "-0.5px" }}>A</span>
            </div>
            {!collapsed && (
              <span style={{ fontWeight: 700, fontSize: 14, color: "var(--t)", whiteSpace: "nowrap" }}>
                Avidara
              </span>
            )}
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "10px 8px", display: "flex", flexDirection: "column", gap: 2, overflow: "hidden" }}>
          <NavItem
            href="/dashboard"
            label="New Review"
            active={pathname === "/dashboard"}
            collapsed={collapsed}
            icon={
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M7.5 1C7.77614 1 8 1.22386 8 1.5V7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H8V13.5C8 13.7761 7.77614 14 7.5 14C7.22386 14 7 13.7761 7 13.5V8H1.5C1.22386 8 1 7.77614 1 7.5C1 7.22386 1.22386 7 1.5 7H7V1.5C7 1.22386 7.22386 1 7.5 1Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
              </svg>
            }
          />
          <NavItem
            href="/history"
            label="History"
            active={pathname === "/history"}
            collapsed={collapsed}
            icon={
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M1.90321 7.29677C1.90321 10.341 4.11041 12.4147 6.58893 12.8439C6.87255 12.893 7.06266 13.1627 7.01355 13.4463C6.96444 13.73 6.69471 13.9201 6.41109 13.871C3.49942 13.3668 0.86084 10.9127 0.86084 7.29677C0.86084 3.65781 3.44999 1.2 6.61666 1.2C9.73562 1.2 12.1917 3.5 12.1917 7.17143C12.1917 7.63413 12.0674 8.20178 11.9026 8.7L12.6507 8.32639C12.9051 8.20047 13.2126 8.29961 13.3385 8.55396C13.4644 8.80832 13.3653 9.11589 13.1109 9.24181L11.0109 10.2918C10.8468 10.3707 10.6527 10.3564 10.5024 10.2549L8.90234 9.15436C8.66875 8.99695 8.60923 8.68055 8.76664 8.44695C8.92406 8.21336 9.24045 8.15384 9.47405 8.31126L10.4722 8.96787C10.6021 8.49328 10.7021 7.94577 10.7021 7.17143C10.7021 4.32441 8.78187 2.68571 6.61666 2.68571C4.40146 2.68571 1.90321 4.45647 1.90321 7.29677Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
              </svg>
            }
          />
        </nav>

        {/* Bottom controls */}
        <div style={{ borderTop: "1px solid var(--b2)", padding: "8px", display: "flex", flexDirection: "column", gap: 1 }}>
          {/* Theme toggle */}
          <SidebarButton
            onClick={toggleTheme}
            label={theme === "dark" ? "Light mode" : "Dark mode"}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            collapsed={collapsed}
            icon={
              theme === "dark" ? (
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M7.5 0C7.77614 0 8 0.223858 8 0.5V2.5C8 2.77614 7.77614 3 7.5 3C7.22386 3 7 2.77614 7 2.5V0.5C7 0.223858 7.22386 0 7.5 0ZM2.1967 2.1967C2.39196 2.00144 2.70854 2.00144 2.9038 2.1967L4.31802 3.61091C4.51328 3.80617 4.51328 4.12276 4.31802 4.31802C4.12276 4.51328 3.80617 4.51328 3.61091 4.31802L2.1967 2.90381C2.00144 2.70854 2.00144 2.39196 2.1967 2.1967ZM12.8033 2.1967C12.9986 2.39196 12.9986 2.70854 12.8033 2.9038L11.3891 4.31802C11.1938 4.51328 10.8772 4.51328 10.682 4.31802C10.4867 4.12276 10.4867 3.80617 10.682 3.61091L12.0962 2.1967C12.2915 2.00144 12.608 2.00144 12.8033 2.1967ZM0 7.5C0 7.22386 0.223858 7 0.5 7H2.5C2.77614 7 3 7.22386 3 7.5C3 7.77614 2.77614 8 2.5 8H0.5C0.223858 8 0 7.77614 0 7.5ZM12 7.5C12 7.22386 12.2239 7 12.5 7H14.5C14.7761 7 15 7.22386 15 7.5C15 7.77614 14.7761 8 14.5 8H12.5C12.2239 8 12 7.77614 12 7.5ZM10.682 10.682C10.8772 10.4867 11.1938 10.4867 11.3891 10.682L12.8033 12.0962C12.9986 12.2915 12.9986 12.608 12.8033 12.8033C12.608 12.9986 12.2915 12.9986 12.0962 12.8033L10.682 11.3891C10.4867 11.1938 10.4867 10.8772 10.682 10.682ZM4.31802 10.682C4.51328 10.8772 4.51328 11.1938 4.31802 11.3891L2.9038 12.8033C2.70854 12.9986 2.39196 12.9986 2.1967 12.8033C2.00144 12.608 2.00144 12.2915 2.1967 12.0962L3.61091 10.682C3.80617 10.4867 4.12276 10.4867 4.31802 10.682ZM7.5 12C7.77614 12 8 12.2239 8 12.5V14.5C8 14.7761 7.77614 15 7.5 15C7.22386 15 7 14.7761 7 14.5V12.5C7 12.2239 7.22386 12 7.5 12ZM7.5 4C5.567 4 4 5.567 4 7.5C4 9.433 5.567 11 7.5 11C9.433 11 11 9.433 11 7.5C11 5.567 9.433 4 7.5 4Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M2.89998 0.499976C2.89998 0.279062 2.72089 0.0999756 2.49998 0.0999756C2.27906 0.0999756 2.09998 0.279062 2.09998 0.499976V1.09998H1.49998C1.27906 1.09998 1.09998 1.27906 1.09998 1.49998C1.09998 1.72089 1.27906 1.89998 1.49998 1.89998H2.09998V2.49998C2.09998 2.72089 2.27906 2.89998 2.49998 2.89998C2.72089 2.89998 2.89998 2.72089 2.89998 2.49998V1.89998H3.49998C3.72089 1.89998 3.89998 1.72089 3.89998 1.49998C3.89998 1.27906 3.72089 1.09998 3.49998 1.09998H2.89998V0.499976ZM11.5 0.999976C11.2791 0.999976 11.1 1.17906 11.1 1.39998V1.99998H10.5C10.2791 1.99998 10.1 2.17906 10.1 2.39998C10.1 2.62089 10.2791 2.79998 10.5 2.79998H11.1V3.39998C11.1 3.62089 11.2791 3.79998 11.5 3.79998C11.7209 3.79998 11.9 3.62089 11.9 3.39998V2.79998H12.5C12.7209 2.79998 12.9 2.62089 12.9 2.39998C12.9 2.17906 12.7209 1.99998 12.5 1.99998H11.9V1.39998C11.9 1.17906 11.7209 0.999976 11.5 0.999976ZM7.5 3.99976C6.10929 3.99976 5 5.10905 5 6.49976C5 7.29671 5.36876 8.00939 5.94941 8.48079C5.28 8.88342 4.72549 9.44899 4.34999 10.1191C4.03328 10.6951 3.84999 11.3661 3.84999 12C3.84999 13.2485 4.38849 14.3685 5.25999 15.1191C5.46499 15.2981 5.7451 15.2681 5.92499 15.0631C6.10499 14.8581 6.07499 14.5781 5.87 14.3981C5.19 13.8081 4.84999 12.9481 4.84999 12C4.84999 10.5241 5.93 9.24976 7.37 8.88976C7.63 8.82976 7.79 8.57976 7.73 8.31976C7.67 8.05976 7.42 7.89976 7.16 7.95976C6.46 8.12976 5.94999 8.43976 5.51999 8.87976C5.19 8.52976 5 8.03976 5 7.49976C5 5.82476 6.32929 4.49976 8 4.49976C9.67071 4.49976 11 5.82476 11 7.49976C11 8.03976 10.81 8.52976 10.48 8.87976C10.05 8.43976 9.54 8.12976 8.84 7.95976C8.58 7.89976 8.33 8.05976 8.27 8.31976C8.21 8.57976 8.37 8.82976 8.63 8.88976C10.07 9.24976 11.15 10.5241 11.15 12C11.15 12.9481 10.81 13.8081 10.13 14.3981C9.92501 14.5781 9.895 14.8581 10.075 15.0631C10.255 15.2681 10.535 15.2981 10.74 15.1191C11.6115 14.3685 12.15 13.2485 12.15 12C12.15 11.3661 11.9667 10.6951 11.65 10.1191C11.2745 9.44899 10.72 8.88342 10.0506 8.48079C10.6312 8.00939 11 7.29671 11 6.49976C11 5.10905 9.89071 3.99976 8.5 3.99976H7.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
                </svg>
              )
            }
          />

          {/* User info */}
          <div
            style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: collapsed ? "9px 13px" : "9px 12px",
              borderRadius: 7, overflow: "hidden",
            }}
          >
            <div
              style={{
                width: 24, height: 24, borderRadius: "50%",
                background: "var(--accent)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, fontSize: 11, fontWeight: 700, color: "#fff",
              }}
            >
              {user.name?.[0]?.toUpperCase() ?? user.email?.[0]?.toUpperCase() ?? "U"}
            </div>
            {!collapsed && (
              <div style={{ overflow: "hidden", flex: 1 }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: "var(--t)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", lineHeight: 1.4 }}>
                  {user.name ?? "User"}
                </p>
                <p style={{ fontSize: 11, color: "var(--t3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", lineHeight: 1.4 }}>
                  {user.email}
                </p>
              </div>
            )}
          </div>

          {/* Sign out */}
          <SidebarButton
            onClick={() => signOut({ callbackUrl: "/login" })}
            label="Sign out"
            title="Sign out"
            collapsed={collapsed}
            icon={
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M3 1C2.44772 1 2 1.44772 2 2V13C2 13.5523 2.44772 14 3 14H7.5C7.77614 14 8 13.7761 8 13.5C8 13.2239 7.77614 13 7.5 13H3V2H7.5C7.77614 2 8 1.77614 8 1.5C8 1.22386 7.77614 1 7.5 1H3ZM11.8536 5.14645C11.6583 4.95118 11.3417 4.95118 11.1465 5.14645C10.9512 5.34171 10.9512 5.65829 11.1465 5.85355L12.2929 7H6.5C6.22386 7 6 7.22386 6 7.5C6 7.77614 6.22386 8 6.5 8H12.2929L11.1465 9.14645C10.9512 9.34171 10.9512 9.65829 11.1465 9.85355C11.3417 10.0488 11.6583 10.0488 11.8536 9.85355L13.8536 7.85355C14.0488 7.65829 14.0488 7.34171 13.8536 7.14645L11.8536 5.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
              </svg>
            }
          />

          {/* Collapse toggle */}
          <SidebarButton
            onClick={() => setCollapsed(!collapsed)}
            label="Collapse"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            collapsed={collapsed}
            icon={
              <svg
                width="15" height="15" viewBox="0 0 15 15" fill="none"
                style={{ transition: "transform 0.2s", transform: collapsed ? "rotate(180deg)" : "none" }}
              >
                <path d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
              </svg>
            }
          />
        </div>
      </aside>

      {/* ── Main area ───────────────────────────────────────── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
        {/* Topbar */}
        <header
          className="app-topbar"
          style={{
            height: "var(--tb)",
            background: "var(--sf)",
            borderBottom: "1px solid var(--b2)",
            display: "flex",
            alignItems: "center",
            padding: "0 24px",
            flexShrink: 0,
            gap: 12,
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--t2)", letterSpacing: "0.01em" }}>
            Compliance Review Platform
          </span>
        </header>

        {/* Content */}
        <main style={{ flex: 1, overflow: "auto" }}>
          {children}
        </main>

        {/* Footer */}
        <footer
          className="app-footer"
          style={{
            height: "var(--ft)",
            background: "var(--sf)",
            borderTop: "1px solid var(--b2)",
            display: "flex",
            alignItems: "center",
            padding: "0 24px",
            gap: 20,
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 11, color: "var(--t3)" }}>© {new Date().getFullYear()} Avidara</span>
          <span style={{ fontSize: 11, color: "var(--t3)" }}>v1.0</span>
          <span style={{ fontSize: 11, color: "var(--t3)", marginLeft: "auto" }}>
            All reviews are confidential
          </span>
        </footer>
      </div>
    </div>
  );
}

/* ── Shared sub-components ─────────────────────────────── */

function NavItem({
  href, label, active, collapsed, icon,
}: {
  href: string;
  label: string;
  active: boolean;
  collapsed: boolean;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      title={collapsed ? label : undefined}
      style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: collapsed ? "9px 13px" : "9px 12px",
        borderRadius: 7,
        background: active ? "var(--accent)" : "transparent",
        color: active ? "#fff" : "var(--t2)",
        textDecoration: "none",
        fontSize: 13, fontWeight: active ? 600 : 500,
        overflow: "hidden", whiteSpace: "nowrap",
        transition: "background 0.15s, color 0.15s",
      }}
    >
      <span style={{ flexShrink: 0 }}>{icon}</span>
      {!collapsed && label}
    </Link>
  );
}

function SidebarButton({
  onClick, label, title, collapsed, icon,
}: {
  onClick: () => void;
  label: string;
  title?: string;
  collapsed: boolean;
  icon: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: collapsed ? "9px 13px" : "9px 12px",
        borderRadius: 7, border: "none",
        background: "transparent", cursor: "pointer",
        color: "var(--t3)", fontSize: 13,
        overflow: "hidden", whiteSpace: "nowrap", width: "100%",
        textAlign: "left",
      }}
    >
      <span style={{ flexShrink: 0 }}>{icon}</span>
      {!collapsed && label}
    </button>
  );
}
