"use client";

import { cn } from "@/lib/utils";

/**
 * Inline M3D!X text — uses "3" for E and "!" for I, matching the brand logo exactly.
 * Wrap in any colour class you need.
 */
export function MedixText({ className }: { className?: string }) {
  return (
    <span className={cn("font-black tracking-tight", className)}>
      M3D!X
    </span>
  );
}

/**
 * Full wordmark:
 *   M3D!X          ← white, bold
 *   HEALTHCARE TRADING  ← sky-400, small, spaced
 *
 * size: "sm" | "md" | "lg"
 * variant: "light" (for dark bg) | "dark" (for light bg)
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
  const wordSize = { sm: "text-xl", md: "text-3xl", lg: "text-5xl" }[size];
  const tagSize  = { sm: "text-[7px]", md: "text-[9px]", lg: "text-xs" }[size];

  const wordColor = variant === "light" ? "text-white"      : "text-slate-900";
  const tagColor  = variant === "light" ? "text-sky-400"    : "text-sky-500";

  return (
    <div className={cn("leading-none select-none", className)}>
      <div className={cn("font-black tracking-tight leading-none", wordSize, wordColor)}>
        M3D!X
      </div>
      {showTagline && (
        <div className={cn(
          "font-semibold tracking-[0.2em] uppercase mt-0.5",
          tagSize, tagColor
        )}>
          Healthcare Trading
        </div>
      )}
    </div>
  );
}
