"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[App Error]", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-sky-950 to-teal-900 flex items-center justify-center px-4">
      {/* Orb decoration */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative text-center space-y-8 max-w-md">
        {/* Icon */}
        <div className="w-24 h-24 rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center mx-auto">
          <AlertCircle className="w-12 h-12 text-rose-400" />
        </div>

        {/* Text */}
        <div>
          <h2 className="text-3xl font-black text-white mb-3">Something went wrong</h2>
          <p className="text-white/60 leading-relaxed">
            We encountered an unexpected error. Please try refreshing the page or go back to the homepage.
          </p>
          {process.env.NODE_ENV === "development" && (
            <p className="mt-3 text-rose-400/70 text-xs font-mono bg-rose-500/10 border border-rose-500/20 rounded-xl p-3 text-left">
              {error.message}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-sky-500 to-teal-500 text-white font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-sky-500/30"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
          >
            <Home className="w-4 h-4" />
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}
