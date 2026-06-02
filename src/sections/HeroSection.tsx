"use client";

import { ArrowRight, ShieldCheck, Globe2, BadgeCheck, PackageCheck, ChevronDown } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

const trustBadges = [
  { icon: ShieldCheck, label: "GCC Approved",        color: "text-teal-400"  },
  { icon: BadgeCheck,  label: "UK / Spain Licensed",  color: "text-sky-400"   },
  { icon: Globe2,      label: "ISO Certified Import", color: "text-amber-400" },
];

type BezierEase = [number, number, number, number];
const E: BezierEase = [0.22, 1, 0.36, 1];

/* ── animation variants ── */
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.75, ease: E } },
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  show:   { opacity: 1, x: 0,  transition: { duration: 0.65, ease: E } },
};

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

      {/* ── Floating orbs (Framer Motion) ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 -left-20 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute bottom-20 right-1/3 w-64 h-64 bg-sky-400/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
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

      {/* ── Staggered content ── */}
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
          <div className="flex justify-center">

            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-8 max-w-3xl w-full"
            >
              {/* Badge row */}
              <motion.div variants={fadeUp} className="flex items-center gap-3 flex-wrap">
                <Badge variant="teal" className="bg-teal-500/20 text-teal-300 border-teal-500/30">
                  <PackageCheck className="w-3 h-3" />
                  Medical Import &amp; Distribution
                </Badge>
                <span className="text-white/50 text-xs font-semibold uppercase tracking-widest">
                  Est. Dubai · UAE
                </span>
              </motion.div>

              {/* Headline */}
              <motion.div variants={fadeUp} className="space-y-4">
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
              </motion.div>

              {/* Buttons */}
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
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
              </motion.div>

              {/* Trust badges */}
              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-6 pt-2">
                {trustBadges.map(({ icon: Icon, label, color }, i) => (
                  <motion.div
                    key={i}
                    variants={fadeLeft}
                    className="flex items-center gap-2 text-white/60 text-sm"
                  >
                    <Icon className={`w-4 h-4 ${color}`} />
                    <span>{label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/38 pointer-events-none"
      >
        <span className="text-xs font-semibold uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
