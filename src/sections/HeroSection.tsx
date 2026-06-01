"use client";

import { ArrowRight, ShieldCheck, Globe2, BadgeCheck, PackageCheck, ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

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
          <div className="flex justify-center">

            {/* Centered hero content — stat card removed */}
            <div className="space-y-8 hero-fade-left max-w-3xl w-full">

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
