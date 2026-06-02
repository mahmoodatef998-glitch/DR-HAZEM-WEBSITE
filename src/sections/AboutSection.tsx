"use client";

import { ShieldCheck, BadgeCheck, Globe2, Award, CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const guarantees = [
  { icon: ShieldCheck, text: "Every batch comes with full EU certification documentation" },
  { icon: BadgeCheck,  text: "All products are registered and approved for the GCC market" },
  { icon: Globe2,      text: "Direct contracts with licensed manufacturers — no middlemen" },
  { icon: Award,       text: "Cold-chain logistics maintained from EU warehouse to your door" },
];

const stats = [
  { value: "200+", label: "Products Available",  sub: "Spain & Italy combined"       },
  { value: "100%", label: "Certified Quality",    sub: "Every batch documented"       },
  { value: "GCC",  label: "Market Approved",      sub: "Full regulatory compliance"   },
  { value: "48h",  label: "UAE Delivery",          sub: "Dubai & Abu Dhabi"            },
];

const E = [0.22, 1, 0.36, 1] as const;

export default function AboutSection() {
  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="about" className="section-padding bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-sky-50/60 to-transparent pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-teal-50 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="About Medix Healthcare"
          title="Your Trusted European "
          highlight="Pharmaceutical Importer"
          description="Medix Healthcare was founded with one clear mission: to give patients and healthcare providers in the UAE direct access to premium, certified pharmaceuticals from the best European manufacturers."
        />

        <div className="mt-16 grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — Profile card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: E }}
            className="space-y-8"
          >
            {/* Card */}
            <div className="relative bg-gradient-to-br from-slate-900 to-sky-950 rounded-3xl p-8 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl" />

              <div className="relative flex gap-6 items-start">
                {/* Avatar / Logo */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-sky-400 to-teal-500 flex items-center justify-center shadow-xl shadow-sky-500/30 text-4xl">
                    👨‍⚕️
                  </div>
                  <div className="mt-3 flex items-center justify-center gap-1">
                    <span className="text-xs text-amber-400/80 font-semibold">🇪🇸 🇮🇹</span>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white">Dr. Hazem</h3>
                  <p className="text-sky-400 font-semibold text-sm mt-0.5">Founder — Medix Healthcare</p>
                  <p className="text-white/45 text-sm mt-0.5">Licensed Medical Importer · Dubai, UAE</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="bg-sky-500/20 text-sky-300 text-xs px-3 py-1 rounded-full border border-sky-500/30">DHA Licensed</span>
                    <span className="bg-teal-500/20 text-teal-300 text-xs px-3 py-1 rounded-full border border-teal-500/30">GCC Approved</span>
                    <span className="bg-amber-500/20 text-amber-300 text-xs px-3 py-1 rounded-full border border-amber-500/30">EU Partner</span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="relative text-white/65 text-sm leading-relaxed mt-6">
                Dr. Hazem built Medix Healthcare after years of medical practice, driven by one observation:
                the best European medicines were simply not available or accessible to patients in the GCC.
                Today, we source exclusively from{" "}
                <strong className="text-white/90">licensed manufacturers in Spain and Italy</strong>,
                ensuring every product is authentic, certified, and delivered with full documentation.
              </p>

              {/* Quote */}
              <div className="relative mt-6 pl-4 border-l-2 border-sky-500">
                <p className="text-white/75 text-sm italic">
                  "I built Medix Healthcare so that every patient in the UAE could access the same
                  high-quality pharmaceuticals available in European pharmacies — directly, affordably, and with confidence."
                </p>
                <p className="text-sky-400 text-xs font-semibold mt-1">— Dr. Hazem, Founder</p>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              onClick={() => scrollTo("#contact")}
              className="group"
            >
              Get in Touch
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Right — Guarantees */}
          <div className="space-y-5">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Our Quality Promise</h3>
              <p className="text-slate-500 text-sm">Every product we import meets strict international standards before it reaches you.</p>
            </div>

            {guarantees.map((g, i) => {
              const Icon = g.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: E }}
                  className="flex items-start gap-4 p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center flex-shrink-0 group-hover:bg-sky-100 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-sky-600" />
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-700 text-sm leading-relaxed">{g.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: E }}
              className="text-center p-6 bg-gradient-to-br from-sky-50 to-teal-50 rounded-2xl border border-sky-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <AnimatedCounter
                value={stat.value}
                className="text-4xl font-black bg-gradient-to-r from-sky-600 to-teal-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 inline-block"
              />
              <div className="text-slate-800 font-semibold text-sm mt-2">{stat.label}</div>
              <div className="text-slate-500 text-xs mt-1">{stat.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
