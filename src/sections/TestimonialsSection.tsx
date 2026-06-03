"use client";

import { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { useTranslation } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

type BezierEase = [number, number, number, number];
const E: BezierEase = [0.22, 1, 0.36, 1];

const slideVariants: Variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.45, ease: E } },
  exit:  (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0, transition: { duration: 0.3, ease: E } }),
};

export default function TestimonialsSection() {
  const { t, isRTL } = useTranslation();
  const ts = t.testimonials;

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const visibleCount = isMobile ? 1 : 3;
  const maxIndex = ts.items.length - visibleCount;

  const prev = () => { setDirection(-1); setActiveIndex(i => Math.max(0, i - 1)); };
  const next = () => { setDirection(1);  setActiveIndex(i => Math.min(maxIndex, i + 1)); };
  const goTo = (i: number) => { setDirection(i > activeIndex ? 1 : -1); setActiveIndex(i); };

  const visible = ts.items.slice(activeIndex, activeIndex + visibleCount);

  return (
    <section id="testimonials" className="section-padding bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50/60 via-white to-teal-50/60 pointer-events-none" />
      <div className="absolute top-20 left-10 text-sky-100" aria-hidden="true"><Quote className="w-32 h-32 rotate-180" /></div>
      <div className="absolute bottom-20 right-10 text-teal-100" aria-hidden="true"><Quote className="w-24 h-24" /></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={ts.badge}
          title={ts.title}
          highlight={ts.titleHighlight}
          description={ts.description}
        />

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: E }}
          className="mt-10 flex flex-wrap justify-center gap-8 mb-14"
        >
          {ts.stats.map((stat, i) => (
            <div key={i} className={cn("text-center", isRTL && "font-cairo")}>
              <AnimatedCounter value={stat.value} className="text-3xl font-black bg-gradient-to-r from-sky-600 to-teal-600 bg-clip-text text-transparent" />
              <div className="text-slate-700 font-semibold text-sm mt-1">{stat.label}</div>
              <div className="text-slate-400 text-xs">{stat.sub}</div>
            </div>
          ))}
        </motion.div>

        {/* Testimonials slider */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIndex} custom={direction} variants={slideVariants}
              initial="enter" animate="center" exit="exit"
              className={isMobile ? "grid grid-cols-1 gap-6" : "grid md:grid-cols-3 gap-6"}
            >
              {visible.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4, ease: E }}
                  className={cn("bg-white rounded-3xl p-7 shadow-lg shadow-slate-100/80 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-[transform,box-shadow] duration-300 flex flex-col", isRTL && "text-right")}
                >
                  {/* Stars */}
                  <div className={cn("flex gap-1 mb-4", isRTL && "flex-row-reverse")} aria-label={`Rating: 5 out of 5`}>
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                    ))}
                  </div>

                  <blockquote className="text-slate-600 text-sm leading-relaxed flex-1 mb-6">
                    &ldquo;{item.text}&rdquo;
                  </blockquote>

                  {/* Product tag */}
                  <div className="mb-4">
                    <span className={cn("inline-flex items-center gap-1.5 bg-sky-50 text-sky-600 text-xs font-semibold px-3 py-1.5 rounded-full border border-sky-100", isRTL && "flex-row-reverse")}>
                      <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                      {item.tag}
                    </span>
                  </div>

                  {/* Author */}
                  <div className={cn("flex items-center gap-3 pt-4 border-t border-slate-100", isRTL && "flex-row-reverse")}>
                    <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white font-bold text-sm shadow-md flex-shrink-0`} aria-hidden="true">
                      {item.initials}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{item.name}</p>
                      <p className="text-slate-400 text-xs">{item.role} · {item.location}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <motion.button onClick={isRTL ? next : prev} disabled={activeIndex === 0} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }} aria-label="Previous testimonials"
            className="w-12 h-12 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-600 hover:border-sky-400 hover:text-sky-600 hover:bg-sky-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300">
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </motion.button>
          <div className="flex gap-2" role="tablist" aria-label="Testimonial pages">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <motion.button key={i} onClick={() => goTo(i)} role="tab" aria-selected={i === activeIndex} aria-label={`Page ${i + 1}`}
                animate={{ width: i === activeIndex ? 28 : 10, backgroundColor: i === activeIndex ? "rgb(14 165 233)" : "rgb(226 232 240)" }}
                transition={{ duration: 0.3 }} className="h-2.5 rounded-full" />
            ))}
          </div>
          <motion.button onClick={isRTL ? prev : next} disabled={activeIndex === maxIndex} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }} aria-label="Next testimonials"
            className="w-12 h-12 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-600 hover:border-sky-400 hover:text-sky-600 hover:bg-sky-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300">
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
