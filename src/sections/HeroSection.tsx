"use client";

import { ArrowRight, ShieldCheck, Globe2, BadgeCheck, PackageCheck, ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

const companyStats = [
  { value: "200+",   label: "Products Available" },
  { value: "UK · ES", label: "Licensed Sources"  },
  { value: "100%",   label: "Certified Quality"  },
  { value: "GCC",    label: "Approved Dist."      },
];

const trustBadges = [
  { icon: ShieldCheck, label: "GCC Approved",        color: "text-teal-400"  },
  { icon: BadgeCheck,  label: "UK / Spain Licensed",  color: "text-sky-400"   },
  { icon: Globe2,      label: "ISO Certified Import", color: "text-amber-400" },
];

export default function HeroSection() {
  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ── Static background ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-sky-950 to-teal-900" />

      {/* orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute top-1/2 -left-20 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-20 right-1/3 w-64 h-64 bg-sky-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute inset-0 opacity-5 medical-pattern" />

      {/* ── Content (fully static — no scroll transforms) ── */}
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div className="space-y-8 hero-fade-left">

              <div className="flex items-center gap-3 flex-wrap">
                <Badge variant="teal" className="bg-teal-500/20 text-teal-300 border-teal-500/30">
                  <PackageCheck className="w-3 h-3" />
                  Medical Import &amp; Distribution
                </Badge>
                <span className="text-white/50 text-xs font-semibold uppercase tracking-widest">
                  Est. Dubai · UAE
                </span>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[64px] font-black text-white leading-[1.05] tracking-tight">
                  Premium
                  <br />
                  <span className="bg-gradient-to-r from-sky-400 to-teal-400 bg-clip-text text-transparent">
                    Imported
                  </span>
                  <br />
                  Medicines
                </h1>
                <p className="text-lg sm:text-xl text-white/68 leading-relaxed max-w-xl">
                  Medix Healthcare brings you{" "}
                  <strong className="text-white/90 font-semibold">
                    licensed, certified pharmaceuticals
                  </strong>{" "}
                  sourced directly from authorised manufacturers in{" "}
                  <strong className="text-white/90 font-semibold">
                    Spain &amp; the United Kingdom
                  </strong>{" "}
                  — tested, documented, and GCC-approved.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => scrollTo("#products")}
                  className="group"
                >
                  Explore Products
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => scrollTo("#about")}
                >
                  Our Story
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-2">
                {trustBadges.map(({ icon: Icon, label, color }, i) => (
                  <div key={i} className="flex items-center gap-2 text-white/60 text-sm">
                    <Icon className={`w-4 h-4 ${color}`} />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Company stat card */}
            <div className="relative hero-fade-right">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500/30 to-teal-500/30 rounded-3xl blur-2xl scale-105" />

                <div className="relative glass rounded-3xl p-8 border border-white/10">
                  <div className="relative mx-auto w-36 h-36 mb-6">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-400 to-teal-400 animate-pulse-ring" />
                    <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-sky-500 to-teal-600 flex items-center justify-center shadow-2xl">
                      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                        <rect x="8" y="26" width="48" height="12" rx="6" fill="white" opacity="0.9" />
                        <rect x="26" y="8" width="12" height="48" rx="6" fill="white" opacity="0.9" />
                        <circle cx="32" cy="32" r="8" fill="white" opacity="0.4" />
                      </svg>
                    </div>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-emerald-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                      Active Imports
                    </div>
                  </div>

                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-black text-white tracking-tight">
                      Medix Healthcare
                    </h3>
                    <p className="text-sky-300 text-sm font-semibold mt-0.5">
                      Medical Import &amp; Distribution
                    </p>
                    <p className="text-white/45 text-xs mt-1">
                      Dubai · UAE &nbsp;|&nbsp; Spain · UK Sourced
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {companyStats.map((stat, i) => (
                      <div
                        key={i}
                        className="bg-white/10 rounded-2xl p-4 text-center hover:bg-white/15 transition-colors duration-300 border border-white/10"
                      >
                        <div className="text-xl font-black bg-gradient-to-r from-sky-400 to-teal-400 bg-clip-text text-transparent leading-tight">
                          {stat.value}
                        </div>
                        <div className="text-white/55 text-[11px] font-medium mt-1">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* floating badge — GCC */}
                <div className="absolute -top-4 -left-4 glass rounded-2xl px-4 py-3 border border-white/20 animate-float shadow-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white text-xs font-bold">GCC Licensed</p>
                      <p className="text-white/50 text-xs">Full Compliance</p>
                    </div>
                  </div>
                </div>

                {/* floating badge — origin */}
                <div
                  className="absolute -bottom-4 -right-4 glass rounded-2xl px-4 py-3 border border-white/20 shadow-xl"
                  style={{ animation: "float 3s ease-in-out infinite", animationDelay: "1.5s" }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                      <Globe2 className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white text-xs font-bold">UK &amp; Spain</p>
                      <p className="text-white/50 text-xs">Certified Origin</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Scroll indicator (static) ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/38 pointer-events-none">
        <span className="text-xs font-semibold uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </div>
    </section>
  );
}
