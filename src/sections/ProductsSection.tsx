"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import VelocityShowcase from "@/components/velocity/VelocityShowcase";
import SectionHeader from "@/components/ui/SectionHeader";

export default function ProductsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView     = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section id="products" className="relative overflow-hidden">

      {/* ── section header (above the dark showcase) ── */}
      <div
        ref={headerRef}
        className="section-padding bg-gradient-to-b from-slate-50 to-white pb-0"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <SectionHeader
              badge="Health Services & Packages"
              title="Invest in Your "
              highlight="Health Today"
              description="20 premium medical packages across 5 specialties — browse the showcase below, hover any card to reveal full details."
            />
          </motion.div>

          {/* category quick-nav */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-8 flex flex-wrap justify-center gap-2.5"
          >
            {(
              [
                { label: "Health Packages",   count: 4 },
                { label: "Specialist Care",   count: 4 },
                { label: "Diagnostics",       count: 4 },
                { label: "Chronic Care",      count: 4 },
                { label: "Wellness",          count: 4 },
              ] as const
            ).map((cat) => (
              <div
                key={cat.label}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-slate-600 text-xs font-semibold"
              >
                {cat.label}
                <span className="w-4 h-4 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-[10px] font-black">
                  {cat.count}
                </span>
              </div>
            ))}
          </motion.div>

          {/* scroll hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="text-center text-slate-400 text-xs mt-6 font-medium tracking-wide"
          >
            ↓ Scroll through the immersive showcase below
          </motion.p>
        </div>
      </div>

      {/* ── immersive velocity showcase ── */}
      <VelocityShowcase />

    </section>
  );
}
