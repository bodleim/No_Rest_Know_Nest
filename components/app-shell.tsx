"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { useAppState } from "@/state/app-state";

const navItems = [
  { href: "/quests", label: "홈", mode: "exact" as const },
  { href: "/quests", label: "퀘스트", mode: "prefix" as const },
  { href: "/growth", label: "로그", mode: "growth" as const },
  { href: "/resume", label: "이력서", mode: "exact" as const },
];

const navEnabledPrefixes = ["/quests", "/logs", "/growth", "/resume", "/insights"];

function shouldShowNav(pathname: string) {
  return navEnabledPrefixes.some((prefix) => pathname.startsWith(prefix));
}

function isItemActive(
  pathname: string,
  href: string,
  mode: "exact" | "prefix" | "growth",
) {
  if (mode === "exact") {
    return pathname === href;
  }

  if (mode === "prefix") {
    return pathname.startsWith("/quests/");
  }

  return pathname.startsWith("/growth") || pathname.startsWith("/logs/");
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { hydrated } = useAppState();
  const showNav = shouldShowNav(pathname);

  return (
    <div className="min-h-screen bg-hero-glow px-0 py-0 text-ink md:px-6 md:py-4">
      <div className="mobile-frame relative mx-auto flex min-h-screen w-full max-w-[390px] flex-col overflow-hidden bg-white md:h-[844px] md:min-h-[844px] md:rounded-[34px] md:border md:border-white/70 md:shadow-phone">
        <main
          className="flex-1 overflow-y-auto"
          style={{
            paddingTop: "max(1.25rem, calc(var(--safe-top) + 1rem))",
            paddingBottom: showNav
              ? "calc(6.75rem + var(--safe-bottom))"
              : "calc(5rem + var(--safe-bottom))",
            paddingLeft: "max(1.5rem, calc(var(--safe-left) + 1.5rem))",
            paddingRight: "max(1.5rem, calc(var(--safe-right) + 1.5rem))",
          }}
        >
          {hydrated ? children : <div className="h-full animate-pulse rounded-[28px] bg-sky-soft" />}
        </main>

        {showNav ? <BottomNav pathname={pathname} /> : null}
      </div>
    </div>
  );
}

function BottomNav({ pathname }: { pathname: string }) {
  return (
    <nav
      className="mobile-bottom-nav fixed inset-x-0 bottom-0 z-50 mx-auto flex w-full max-w-[390px] items-center justify-between border border-slate-100 bg-white/95 px-8 pt-3 shadow-card backdrop-blur md:rounded-b-[34px]"
      style={{
        paddingBottom: "calc(0.75rem + var(--safe-bottom))",
        paddingLeft: "max(2rem, calc(var(--safe-left) + 1.5rem))",
        paddingRight: "max(2rem, calc(var(--safe-right) + 1.5rem))",
      }}
    >
        {navItems.map((item) => {
          const active = isItemActive(pathname, item.href, item.mode);

        return (
          <Link
            key={item.label}
            href={item.href}
            className="flex min-w-[56px] flex-col items-center gap-1 text-[11px] font-medium text-slate-400"
          >
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                active ? "bg-sky" : "bg-slate-200"
              }`}
            />
            <span className={active ? "text-sky" : ""}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
