export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-sky-950 to-teal-900 flex items-center justify-center">
      {/* Decorative orbs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative flex flex-col items-center gap-8">
        {/* Logo mark */}
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-sky-500 to-teal-500 flex items-center justify-center shadow-2xl shadow-sky-500/40 animate-pulse">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="10" width="18" height="4" rx="2" fill="white" opacity="0.9" />
            <rect x="10" y="3" width="4" height="18" rx="2" fill="white" opacity="0.9" />
            <circle cx="12" cy="12" r="3" fill="white" opacity="0.35" />
          </svg>
        </div>

        {/* Brand name */}
        <div className="text-center">
          <p className="text-white font-black text-xl tracking-tight">Medix Healthcare</p>
          <p className="text-sky-400 text-xs font-semibold uppercase tracking-widest mt-1">
            Healthcare Trading
          </p>
        </div>

        {/* Dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 bg-sky-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
