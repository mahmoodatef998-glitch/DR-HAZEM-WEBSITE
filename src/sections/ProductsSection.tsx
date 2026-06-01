"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BookOpen, ArrowRight, Sparkles } from "lucide-react";
import FlipBook from "@/components/book/FlipBook";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import { products } from "@/data/products";

/* ── quick category count helper ── */
const CATEGORIES = ["Health Packages", "Specialist Care", "Diagnostics", "Chronic Care", "Wellness"] as const;

export default function ProductsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const scrollToAppointment = () =>
    document.querySelector("#appointment")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="products"
      ref={sectionRef}
      className="section-padding bg-gradient-to-b from-slate-50 to-white relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 medical-pattern opacity-[0.025] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 via-teal-400 to-violet-500 pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-sky-100/60 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
        className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-teal-100/60 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <SectionHeader
            badge="Health Services & Packages"
            title="Invest in Your "
            highlight="Health Today"
            description="Browse all 20 medical packages — flip through the book to explore each one in detail."
          />
        </motion.div>

        {/* ── Category pills ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="mt-8 flex flex-wrap justify-center gap-2"
        >
          {CATEGORIES.map((cat) => {
            const count = products.filter((p) => p.category === cat).length;
            return (
              <div
                key={cat}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-semibold shadow-sm"
              >
                {cat}
                <span className="w-4 h-4 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-[10px] font-black">
                  {count}
                </span>
              </div>
            );
          })}
        </motion.div>

        {/* ── Main layout: book left, info right ── */}
        <div className="mt-14 flex flex-col xl:flex-row items-center xl:items-start justify-center gap-14 xl:gap-20">

          {/* Book (centred on mobile, left-aligned on xl) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="flex-shrink-0"
          >
            <FlipBook />
          </motion.div>

          {/* Right panel — stats + how to use */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="w-full xl:max-w-xs space-y-6 xl:pt-10"
          >
            {/* How to use card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md shadow-slate-100/60">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-teal-500 flex items-center justify-center shadow-md shadow-sky-400/25">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-bold text-slate-800">How to Browse</h4>
              </div>
              <ul className="space-y-3">
                {[
                  { icon: "👆", label: "Click the page to flip forward" },
                  { icon: "👈", label: "Use Prev / Next buttons to navigate" },
                  { icon: "📱", label: "Swipe left / right on mobile" },
                  { icon: "🔵", label: "Click dot indicators to jump" },
                ].map((tip, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-600">
                    <span className="text-base">{tip.icon}</span>
                    {tip.label}
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "20", label: "Services", sub: "Across 5 categories", gradient: "from-sky-500 to-blue-600" },
                { value: "4.9★", label: "Avg Rating", sub: "Verified reviews", gradient: "from-amber-500 to-orange-500" },
                { value: "12K+", label: "Patients", sub: "Treated in UAE", gradient: "from-teal-500 to-emerald-600" },
                { value: "98%", label: "Satisfaction", sub: "Would recommend", gradient: "from-violet-500 to-purple-600" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className={`text-xl font-black bg-gradient-to-r ${s.gradient} bg-clip-text text-transparent`}>
                    {s.value}
                  </div>
                  <div className="text-slate-700 font-semibold text-xs mt-0.5">{s.label}</div>
                  <div className="text-slate-400 text-[10px] mt-0.5">{s.sub}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-slate-900 to-sky-950 rounded-3xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="relative">
                <p className="text-sky-400 text-xs font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Need help choosing?
                </p>
                <h4 className="text-white font-bold text-base mb-2 leading-snug">
                  Not sure which package fits you?
                </h4>
                <p className="text-white/60 text-xs mb-4 leading-relaxed">
                  Book a free 15-min discovery call with Dr. Hazem&apos;s team.
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={scrollToAppointment}
                  className="w-full group"
                >
                  Get Free Advice
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
