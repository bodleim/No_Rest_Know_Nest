"use client";

import Link from "next/link";
import { ReactNode } from "react";

export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  return (
    <header className="mb-7">
      {eyebrow ? (
        <p className="mb-1 text-xl font-bold text-ink">{eyebrow}</p>
      ) : null}
      {title ? (
        <h1 className="mt-7 text-[28px] font-bold leading-[1.22] text-ink">
          {title}
        </h1>
      ) : null}
      {description ? (
        <p className="text-[12px] leading-5 text-slate-500">
          {description}
        </p>
      ) : null}
    </header>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[24px] border border-line bg-white p-5 shadow-card ${className}`}
    >
      {children}
    </div>
  );
}

export function PrimaryButton({
  children,
  href,
  onClick,
  type = "button",
  disabled,
  className = "",
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}) {
  const classes = `inline-flex h-14 w-full items-center justify-center rounded-full bg-sky px-5 text-base font-semibold text-white shadow-card transition hover:brightness-[1.02] disabled:cursor-not-allowed disabled:opacity-50 ${className}`;

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}

export function SecondaryButton({
  children,
  href,
  onClick,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
}) {
  const classes =
    "inline-flex h-14 w-full items-center justify-center rounded-full border border-line bg-white px-5 text-base font-semibold text-sky";

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-sky-soft px-3 py-1 text-xs font-semibold text-sky">
      {children}
    </span>
  );
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-3 overflow-hidden rounded-full bg-sky-soft">
      <div
        className="h-full rounded-full bg-sky transition-all"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export function SectionTitle({
  title,
  action,
}: {
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="text-xl font-bold text-ink">{title}</h2>
      {action}
    </div>
  );
}

export function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-ink">{value}</span>
    </div>
  );
}

export function StickyActionBar({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`compact-screen-action -mx-7 mt-5 bg-white px-7 pt-2 ${className}`}
      style={{
        paddingBottom: "calc(2.5rem + var(--safe-bottom))",
      }}
    >
      {children}
    </div>
  );
}
