"use client";

import { cn } from "@/lib/utils";

/**
 * Inline MEDIX text — E and I are mirrored (scaleX -1) to match the brand logo.
 * Use anywhere the word "MEDIX" appears.
 */
export function MedixText({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-baseline", className)}>
      <span>M</span>
      <span className="inline-block" style={{ transform: "scaleX(-1)" }}>E</span>
      <span>D</span>
      <span className="inline-block" style={{ transform: "scaleX(-1)" }}>I</span>
      <span>X</span>
    </span>
  );
}

/**
 * Full wordmark block:
 *   M3DIX  (large, bold)
 *   HEALTHCARE TRADING  (small, spaced)
 *
 * Pass `color` prop for any Tailwind text colour class.
 */
export default function MedixWordmark({
  color = "text-white",
  showTagline = true,
  size = "md",
  className,
}: {
  color?: string;
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const textSize = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
  }[size];

  const tagSize = {
    sm: "text-[7px]",
    md: "text-[8px]",
    lg: "text-[11px]",
  }[size];

  return (
    <div className={cn("leading-none", color, className)}>
      <div className={cn("font-black tracking-tight", textSize)}>
        <MedixText />
      </div>
      {showTagline && (
        <div className={cn("font-semibold tracking-[0.22em] mt-0.5 uppercase", tagSize)}>
          Healthcare Trading
        </div>
      )}
    </div>
  );
}
