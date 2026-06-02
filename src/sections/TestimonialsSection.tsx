"use client";

import { useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const testimonials = [
  {
    name: "Sarah Al-Mansouri",
    role: "Business Executive",
    location: "Dubai, UAE",
    rating: 5,
    text: "Dr. Hazem is truly exceptional. His thoroughness and ability to explain complex medical issues in simple terms gave me complete confidence in my treatment. I felt genuinely cared for throughout the entire process.",
    condition: "Chronic Care Management",
    initials: "SA",
    color: "from-sky-400 to-blue-500",
  },
  {
    name: "Ahmed Hassan",
    role: "Engineer",
    location: "Abu Dhabi, UAE",
    rating: 5,
    text: "After years of misdiagnosis elsewhere, Dr. Hazem correctly identified my condition within the first consultation. His diagnostic precision and dedication to getting it right is unmatched. Highly recommended.",
    condition: "Complex Diagnosis",
    initials: "AH",
    color: "from-teal-400 to-emerald-500",
  },
  {
    name: "Fatima Al-Rashid",
    role: "Teacher",
    location: "Sharjah, UAE",
    rating: 5,
    text: "The level of care I received was beyond anything I've experienced before. Dr. Hazem took his time, answered all my questions patiently, and followed up personally to ensure I was recovering well.",
    condition: "Preventive Health",
    initials: "FA",
    color: "from-violet-400 to-purple-500",
  },
  {
    name: "Omar Abdullah",
    role: "Entrepreneur",
    location: "Dubai, UAE",
    rating: 5,
    text: "Dr. Hazem's expertise saved my life. His quick identification of a serious condition and immediate action made all the difference. I am forever grateful for his skill and compassion.",
    condition: "Emergency Consultation",
    initials: "OA",
    color: "from-rose-400 to-pink-500",
  },
  {
    name: "Layla Khalid",
    role: "Marketing Director",
    location: "Dubai, UAE",
    rating: 5,
    text: "As someone who is normally anxious about medical appointments, Dr. Hazem made me feel completely at ease. His warm, professional manner and genuine concern for my wellbeing are truly remarkable.",
    condition: "General Consultation",
    initials: "LK",
    color: "from-amber-400 to-orange-500",
  },
  {
    name: "Karim Saad",
    role: "Architect",
    location: "Al Ain, UAE",
    rating: 5,
    text: "World-class medical care right here in the UAE. Dr. Hazem combines international expertise with genuine personal attention. The follow-up process was thorough and I always felt in good hands.",
    condition: "Chronic Disease Management",
    initials: "KS",
    color: "from-indigo-400 to-blue-600",
  },
];

const platformStats = [
  { value: "4.9/5", label: "Average Rating",   sub: "Across all platforms" },
  { value: "500+",  label: "Verified Reviews", sub: "From real patients"   },
  { value: "98%",   label: "Would Recommend",  sub: "To friends & family"  },
];

type BezierEase = [number, number, number, number];
const E: BezierEase = [0.22, 1, 0.36, 1];

const slideVariants: Variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.45, ease: E },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -60 : 60,
    opacity: 0,
    transition: { duration: 0.3, ease: E },
  }),
};

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const visibleCount = 3;
  const maxIndex = testimonials.length - visibleCount;

  const prev = () => {
    setDirection(-1);
    setActiveIndex((i) => Math.max(0, i - 1));
  };
  const next = () => {
    setDirection(1);
    setActiveIndex((i) => Math.min(maxIndex, i + 1));
  };
  const goTo = (i: number) => {
    setDirection(i > activeIndex ? 1 : -1);
    setActiveIndex(i);
  };

  const visible = testimonials.slice(activeIndex, activeIndex + visibleCount);

  return (
    <section id="testimonials" className="section-padding bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50/60 via-white to-teal-50/60 pointer-events-none" />
      <div className="absolute top-20 left-10 text-sky-100">
        <Quote className="w-32 h-32 rotate-180" />
      </div>
      <div className="absolute bottom-20 right-10 text-teal-100">
        <Quote className="w-24 h-24" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Patient Stories"
          title="Real Results, "
          highlight="Real People"
          description="Thousands of patients across the UAE trust Dr. Hazem with their health. Here's what they say about their experience."
        />

        {/* Platform stats — animated counters */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap justify-center gap-8 mb-14"
        >
          {platformStats.map((stat, i) => (
            <div key={i} className="text-center">
              <AnimatedCounter
                value={stat.value}
                className="text-3xl font-black bg-gradient-to-r from-sky-600 to-teal-600 bg-clip-text text-transparent"
              />
              <div className="text-slate-700 font-semibold text-sm mt-1">{stat.label}</div>
              <div className="text-slate-400 text-xs">{stat.sub}</div>
            </div>
          ))}
        </motion.div>

        {/* Testimonials Grid — AnimatePresence slide */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid md:grid-cols-3 gap-6"
            >
              {visible.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-white rounded-3xl p-7 shadow-lg shadow-slate-100/80 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-slate-600 text-sm leading-relaxed flex-1 mb-6">
                    &ldquo;{t.text}&rdquo;
                  </blockquote>

                  {/* Condition badge */}
                  <div className="mb-4">
                    <span className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-600 text-xs font-semibold px-3 py-1.5 rounded-full border border-sky-100">
                      <CheckCircle2 className="w-3 h-3" />
                      {t.condition}
                    </span>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                    <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                      <p className="text-slate-400 text-xs">{t.role} · {t.location}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <motion.button
            onClick={prev}
            disabled={activeIndex === 0}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            className="w-12 h-12 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-600 hover:border-sky-400 hover:text-sky-600 hover:bg-sky-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          {/* Dots */}
          <div className="flex gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <motion.button
                key={i}
                onClick={() => goTo(i)}
                animate={{
                  width: i === activeIndex ? 28 : 10,
                  backgroundColor:
                    i === activeIndex ? "rgb(14 165 233)" : "rgb(226 232 240)",
                }}
                transition={{ duration: 0.3 }}
                className="h-2.5 rounded-full"
              />
            ))}
          </div>

          <motion.button
            onClick={next}
            disabled={activeIndex === maxIndex}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            className="w-12 h-12 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-600 hover:border-sky-400 hover:text-sky-600 hover:bg-sky-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
