"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none";

    const variants = {
      primary:
        "bg-gradient-to-r from-sky-500 to-teal-500 text-white shadow-lg shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-500/40 hover:-translate-y-0.5 active:translate-y-0",
      secondary:
        "bg-white text-sky-600 border-2 border-sky-200 hover:border-sky-400 hover:bg-sky-50 hover:-translate-y-0.5 active:translate-y-0",
      outline:
        "bg-transparent text-white border-2 border-white/60 hover:bg-white hover:text-sky-600 hover:-translate-y-0.5 active:translate-y-0",
      ghost:
        "bg-transparent text-sky-600 hover:bg-sky-50 hover:text-sky-700",
    };

    const sizes = {
      sm: "px-5 py-2 text-sm gap-1.5",
      md: "px-7 py-3 text-base gap-2",
      lg: "px-9 py-4 text-lg gap-2.5",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading ? (
          <>
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
