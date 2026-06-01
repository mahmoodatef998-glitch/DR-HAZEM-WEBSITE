"use client";

import { ArrowRight, Star, Shield, Award, ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "12K+", label: "Patients Treated" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "50+", label: "Certifications" },
];

export default function HeroSection() {
  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-sky-950 to-teal-900" />

      {/* Animated gradient orbs */}
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

      {/* Medical pattern overlay */}
      <div className="absolute inset-0 opacity-5 medical-pattern" />

      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Content — CSS fade-up animation (no JS state = no hydration mismatch) */}
          <div className="space-y-8 hero-fade-left">
            {/* Trust badge */}
            <div className="flex items-center gap-3">
              <Badge variant="teal" className="bg-teal-500/20 text-teal-300 border-teal-500/30">
                <Shield className="w-3 h-3" />
                Trusted Medical Expert
              </Badge>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-white/60 text-xs ml-1">5.0 Rating</span>
              </div>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight">
                Your Health
                <br />
                <span className="bg-gradient-to-r from-sky-400 to-teal-400 bg-clip-text text-transparent">
                  Deserves
                </span>
                <br />
                Expert Care
              </h1>
              <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-xl">
                Dr. Hazem combines 15+ years of specialist expertise with cutting-edge
                medical technology to deliver exceptional patient outcomes in Dubai &amp; UAE.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => scrollToSection("#appointment")}
                className="group"
              >
                Book Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection("#about")}
              >
                Learn More
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <Award className="w-4 h-4 text-teal-400" />
                <span>Board Certified</span>
              </div>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <Shield className="w-4 h-4 text-sky-400" />
                <span>DHA Licensed</span>
              </div>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <Star className="w-4 h-4 text-amber-400" />
                <span>Top Rated Specialist</span>
              </div>
            </div>
          </div>

          {/* Right — Stats + Visual */}
          <div className="relative hero-fade-right">
            <div className="relative">
              {/* Glow behind card */}
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/30 to-teal-500/30 rounded-3xl blur-2xl scale-105" />

              {/* Card */}
              <div className="relative glass rounded-3xl p-8 border border-white/10">
                {/* Doctor avatar */}
                <div className="relative mx-auto w-48 h-48 mb-6">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-400 to-teal-400 animate-pulse-ring" />
                  <div className="relative w-full h-full rounded-full bg-gradient-to-br from-sky-500 to-teal-600 flex items-center justify-center shadow-2xl">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="8" r="4" fill="white" opacity="0.9" />
                      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="white" opacity="0.9" />
                      <path d="M16 3h2v2h2v2h-2v2h-2V7h-2V5h2V3z" fill="white" />
                    </svg>
                  </div>
                  <div className="absolute bottom-2 right-2 flex items-center gap-1.5 bg-emerald-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    Available
                  </div>
                </div>

                {/* Name */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white">Dr. Hazem</h3>
                  <p className="text-sky-300 text-sm font-medium">Medical Specialist &amp; Consultant</p>
                  <p className="text-white/50 text-xs mt-1">Dubai, UAE</p>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-3">
                  {stats.map((stat, i) => (
                    <div
                      key={i}
                      className="bg-white/10 rounded-2xl p-4 text-center hover:bg-white/15 transition-colors duration-300 border border-white/10"
                    >
                      <div className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-teal-400 bg-clip-text text-transparent">
                        {stat.value}
                      </div>
                      <div className="text-white/60 text-xs font-medium mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge — top left */}
              <div className="absolute -top-4 -left-4 glass rounded-2xl px-4 py-3 border border-white/20 animate-float shadow-xl">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-bold">DHA Certified</p>
                    <p className="text-white/50 text-xs">Dubai Health Authority</p>
                  </div>
                </div>
              </div>

              {/* Floating badge — bottom right */}
              <div
                className="absolute -bottom-4 -right-4 glass rounded-2xl px-4 py-3 border border-white/20 shadow-xl"
                style={{ animation: "float 3s ease-in-out infinite", animationDelay: "1.5s" }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-bold">Top Specialist</p>
                    <p className="text-white/50 text-xs">UAE 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
