"use client";

import { cn } from "@/lib/utils";

/* ─── Each letter as a flex item — gap handles spacing uniformly ─── */
function Letter({ char, flip }: { char: string; flip?: boolean }) {
  return (
    <span
      style={{
        display: "inline-block",
        transform: flip ? "scaleX(-1)" : undefined,
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      }}
    >
      {char}
    </span>
  );
}

/**
 * Inline M[Ǝ]D[I]X — reversed E + I, matching brand logo.
 */
export function MedixText({ className }: { className?: string }) {
  return (
    <span
      className={cn("inline-flex items-baseline font-black", className)}
      style={{ letterSpacing: 0, gap: "0.02em" }}
    >
      <Letter char="M" />
      <Letter char="E" flip />
      <Letter char="D" />
      <Letter char="I" flip />
      <Letter char="X" />
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
  const wordSize = { sm: "text-[24px]", md: "text-[34px]", lg: "text-[54px]" }[size];
  const tagSize  = { sm: "text-[7.5px]", md: "text-[11px]", lg: "text-[18px]" }[size];

  const wordColor = variant === "light" ? "text-white"     : "text-slate-900";
  const tagColor  = variant === "light" ? "text-sky-400/90" : "text-sky-500";

  return (
    <div className={cn("leading-none select-none", className)}>
      {/* M[Ǝ]D[I]X */}
      <div
        className={cn("font-black leading-none", wordSize, wordColor)}
        style={{ WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale" }}
      >
        <span
          className="inline-flex items-baseline"
          style={{ letterSpacing: 0, gap: "0.01em" }}
        >
          <Letter char="M" />
          <Letter char="E" flip />
          <Letter char="D" />
          <Letter char="I" flip />
          <Letter char="X" />
        </span>
      </div>

      {/* HEALTHCARE TRADING */}
      {showTagline && (
        <div
          className={cn("font-bold uppercase mt-[3px]", tagSize, tagColor)}
          style={{
            letterSpacing: "0.22em",
            WebkitFontSmoothing: "antialiased",
          }}
        >
          Healthcare Trading
        </div>
      )}
    </div>
  );
}
