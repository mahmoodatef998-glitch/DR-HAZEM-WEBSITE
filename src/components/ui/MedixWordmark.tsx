"use client";

import { cn } from "@/lib/utils";

/* ─── Reversed-E and Reversed-I via CSS scaleX(-1) ─── */
const RevE = () => (
  <span
    className="inline-block"
    style={{ transform: "scaleX(-1)", display: "inline-block" }}
    aria-hidden="true"
  >
    E
  </span>
);
const RevI = () => (
  <span
    className="inline-block"
    style={{ transform: "scaleX(-1)", display: "inline-block" }}
    aria-hidden="true"
  >
    I
  </span>
);

/**
 * Inline M[Ǝ]D[I]X — reversed E + I, matching brand logo.
 */
export function MedixText({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-baseline font-black tracking-tight", className)}>
      M<RevE />D<RevI />X
    </span>
  );
}

/**
 * Full wordmark block.
 * size: "sm" | "md" | "lg"
 * variant: "light" (dark bg) | "dark" (light bg)
 */
export default function MedixWordmark({
  size = "md",
  variant = "light",
  showTagline = true,
  className,
}: {
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
  showTagline?: boolean;
  className?: string;
}) {
  /* ── M3D!X text size ── */
  const wordSize  = { sm: "text-[22px]", md: "text-[32px]", lg: "text-[52px]" }[size];
  /* ── HEALTHCARE TRADING size — roughly 38% of word size ── */
  const tagSize   = { sm: "text-[8.5px]", md: "text-[12px]", lg: "text-[20px]" }[size];

  const wordColor = variant === "light" ? "text-white"   : "text-slate-900";
  const tagColor  = variant === "light" ? "text-sky-400" : "text-sky-500";

  return (
    <div className={cn("leading-none select-none", className)}>
      {/* M[Ǝ]D[I]X */}
      <div className={cn("font-black tracking-tight leading-none", wordSize, wordColor)}>
        M<RevE />D<RevI />X
      </div>

      {/* HEALTHCARE TRADING */}
      {showTagline && (
        <div
          className={cn("font-semibold uppercase mt-1", tagSize, tagColor)}
          style={{ letterSpacing: "0.18em" }}
        >
          Healthcare Trading
        </div>
      )}
    </div>
  );
}
