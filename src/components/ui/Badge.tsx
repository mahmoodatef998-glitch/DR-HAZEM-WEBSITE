import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "blue" | "teal" | "gray" | "green";
  className?: string;
}

export default function Badge({ children, variant = "blue", className }: BadgeProps) {
  const variants = {
    blue: "bg-sky-100 text-sky-700 border border-sky-200",
    teal: "bg-teal-100 text-teal-700 border border-teal-200",
    gray: "bg-slate-100 text-slate-600 border border-slate-200",
    green: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
