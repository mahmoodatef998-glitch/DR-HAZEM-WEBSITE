"use client";

import { useReducedMotion, motion, type Variants } from "framer-motion";
import { ArrowRight, ShieldCheck, BadgeCheck, Package, Truck } from "lucide-react";
import Button from "@/components/ui/Button";
import { useTranslation } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "971585335516";

type BezierEase = [number, number, number, number];
const E: BezierEase = [0.22, 1, 0.36, 1];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.75, ease: E } },
};
const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  show:   { opacity: 1, x: 0,  transition: { duration: 0.65, ease: E } },
};

const WhatsAppIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function HeroSection() {
  const prefersReduced = useReducedMotion();
  const { t, isRTL } = useTranslation();
  const h = t.hero;

  const trustBadges = [
    { icon: ShieldCheck, label: h.trust.gcc,      color: "text-teal-400"    },
    { icon: BadgeCheck,  label: h.trust.licensed,  color: "text-sky-400"     },
    { icon: Package,     label: h.trust.direct,    color: "text-amber-400"   },
    { icon: Truck,       label: h.trust.delivery,  color: "text-emerald-400" },
  ];

  const WHATSAPP_MSG = encodeURIComponent(
    isRTL
      ? "مرحبا د. حازم، أريد الاستفسار عن منتجاتكم."
      : "Hello Dr. Hazem, I'd like to inquire about your products."
  );

  const lineReveal: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09 } },
  };
  const lineMask: Variants = {
    hidden: { y: prefersReduced ? 0 : "110%" },
    show:   { y: "0%", transition: { duration: prefersReduced ? 0.01 : 0.82, ease: E } },
  };

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">

      {/* ── Background ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-sky-950 to-slate-900" />

      {/* ── Radial glow ── */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 70% 40%, rgba(14,165,233,0.4) 0%, transparent 60%),
                            radial-gradient(circle at 30% 60%, rgba(20,184,166,0.3) 0%, transparent 50%)`,
        }}
        aria-hidden="true"
      />

      {/* ── Grid ── */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* ── Orbs ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl"
          animate={prefersReduced ? {} : { scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 -left-20 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl"
          animate={prefersReduced ? {} : { scale: [1, 1.1, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
      </div>

      {/* ── Origin flags (decorative, large screens) ── */}
      <div className={cn(
        "absolute top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-6 pointer-events-none select-none z-10",
        isRTL ? "left-8" : "right-8"
      )} aria-hidden="true">
        <motion.div
          initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 1, ease: E }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-6xl filter drop-shadow-2xl">🇪🇸</span>
          <span className="text-white/30 text-[10px] font-black uppercase tracking-widest">Spain</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 1, ease: E }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-6xl filter drop-shadow-2xl">🇮🇹</span>
          <span className="text-white/30 text-[10px] font-black uppercase tracking-widest">Italy</span>
        </motion.div>
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
          <div className={cn("flex", isRTL ? "justify-center xl:justify-end" : "justify-center xl:justify-start")}>

            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className={cn(
                "space-y-8 max-w-3xl w-full",
                isRTL && "text-right font-cairo"
              )}
            >
              {/* Source badge */}
              <motion.div variants={fadeUp} className={cn("flex items-center gap-3 flex-wrap", isRTL && "flex-row-reverse justify-end")}>
                <span className={cn(
                  "inline-flex items-center gap-2 bg-white/8 border border-white/15 rounded-full px-4 py-1.5 text-xs font-semibold text-white/70 uppercase tracking-widest",
                  isRTL && "flex-row-reverse font-cairo"
                )}>
                  <span>🇪🇸</span> {isRTL ? "إسبانيا" : "Spain"} · <span>🇮🇹</span> {isRTL ? "إيطاليا" : "Italy"}
                  <span className="w-px h-3 bg-white/20" />
                  {isRTL ? "استيراد مباشر" : "Direct Import"}
                </span>
                <span className="text-white/40 text-xs font-semibold uppercase tracking-widest">
                  {isRTL ? "دبي · الإمارات" : "Dubai · UAE"}
                </span>
              </motion.div>

              {/* H1 — luxury line reveal */}
              <motion.h1
                variants={lineReveal}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-[64px] font-black text-white leading-[1.05] tracking-tight"
              >
                <span className="block overflow-hidden">
                  <motion.span variants={lineMask} className="block">{h.line1}</motion.span>
                </span>
                <span className="block overflow-hidden">
                  <motion.span variants={lineMask} className="block">
                    <span className="bg-gradient-to-r from-sky-400 to-teal-400 bg-clip-text text-transparent">
                      {h.line2}
                    </span>
                  </motion.span>
                </span>
                <span className="block overflow-hidden">
                  <motion.span variants={lineMask} className="block">{h.line3}</motion.span>
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p variants={fadeUp} className="text-lg sm:text-xl text-white/65 leading-relaxed max-w-xl">
                {isRTL ? (
                  h.description
                ) : (
                  <>
                    Certified medicines and supplements imported{" "}
                    <strong className="text-white/90 font-semibold">directly from licensed manufacturers</strong>{" "}
                    in Spain &amp; Italy — fully documented, GCC-approved, and delivered fast across the UAE.
                  </>
                )}
              </motion.p>

              {/* CTAs */}
              <motion.div variants={fadeUp} className={cn("flex flex-col sm:flex-row gap-4", isRTL && "sm:flex-row-reverse")}>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => scrollTo("#products")}
                  className={cn("group", isRTL && "flex-row-reverse")}
                >
                  {h.browseProducts}
                  <ArrowRight className={cn("w-5 h-5 group-hover:translate-x-1 transition-transform duration-300", isRTL && "rotate-180 group-hover:-translate-x-1 group-hover:translate-x-0")} />
                </Button>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full",
                    "bg-[#25D366] text-white font-semibold text-lg",
                    "shadow-xl shadow-[#25D366]/30 hover:shadow-[#25D366]/50 hover:-translate-y-0.5",
                    "transition-[transform,box-shadow] duration-300",
                    isRTL && "flex-row-reverse"
                  )}
                >
                  <WhatsAppIcon />
                  {h.orderWhatsApp}
                </a>
              </motion.div>

              {/* Trust badges */}
              <motion.div variants={fadeUp} className={cn("flex flex-wrap items-center gap-5 pt-2", isRTL && "flex-row-reverse")}>
                {trustBadges.map(({ icon: Icon, label, color }, i) => (
                  <motion.div
                    key={i}
                    variants={fadeLeft}
                    className={cn("flex items-center gap-2 text-white/55 text-sm", isRTL && "flex-row-reverse")}
                  >
                    <Icon className={`w-4 h-4 ${color} flex-shrink-0`} aria-hidden="true" />
                    <span className={isRTL ? "font-cairo" : ""}>{label}</span>
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
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/30 pointer-events-none"
        aria-hidden="true"
      >
        <span className="text-[10px] font-black uppercase tracking-widest">
          {isRTL ? "انتقل للأسفل" : "Scroll"}
        </span>
        <motion.div
          animate={prefersReduced ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 bg-white/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
