"use client";

import {
  useMotionValue, useTransform, useSpring,
  motion, useReducedMotion,
} from "framer-motion";
import { ShieldCheck, Package, Award, Truck, BadgeDollarSign, MessageCircle, ArrowRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import { useTranslation } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "971585335516";
const WHATSAPP_MSG = encodeURIComponent("Hello Dr. Hazem, I'd like to place an order.");

/* Icons matching reason order */
const ICONS = [ShieldCheck, Package, Award, BadgeDollarSign, Truck, MessageCircle];
const GRADIENTS = [
  "from-sky-500 to-blue-600",
  "from-teal-500 to-emerald-600",
  "from-violet-500 to-purple-600",
  "from-amber-500 to-orange-600",
  "from-rose-500 to-pink-600",
  "from-indigo-500 to-blue-700",
];

type Reason = { title: string; description: string };

function TiltCard({ reason, index }: { reason: Reason; index: number }) {
  const prefersReduced = useReducedMotion();
  const { isRTL } = useTranslation();
  const Icon = ICONS[index];
  const gradient = GRADIENTS[index];

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const sx = useSpring(rawX, { stiffness: 260, damping: 26 });
  const sy = useSpring(rawY, { stiffness: 260, damping: 26 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-7, 7]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - r.left) / r.width - 0.5);
    rawY.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onMouseLeave = () => { rawX.set(0); rawY.set(0); };

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReduced ? 0 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: prefersReduced ? 0 : (index % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={prefersReduced ? {} : { y: -6, transition: { duration: 0.25 } }}
      style={prefersReduced ? {} : { rotateX, rotateY, transformStyle: "preserve-3d" as const }}
      onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}
      className={cn("group relative bg-white/5 backdrop-blur-sm rounded-3xl p-7 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-[background-color,border-color] duration-[400ms] cursor-default", isRTL && "text-right")}
    >
      <div className={`absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-[400ms]`} />
      <div
        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
        style={prefersReduced ? {} : { transform: "translateZ(18px)" }}
      >
        <Icon className="w-7 h-7 text-white" aria-hidden="true" />
      </div>
      <h3 className="text-white font-bold text-lg mb-2 group-hover:text-sky-300 transition-colors duration-300">{reason.title}</h3>
      <p className="text-white/60 text-sm leading-relaxed group-hover:text-white/70 transition-colors duration-300">{reason.description}</p>
    </motion.div>
  );
}

export default function WhyChooseSection() {
  const { t, isRTL } = useTranslation();
  const w = t.whyChoose;

  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="why-choose" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-sky-950 to-teal-950" />
      <div className="absolute inset-0 medical-pattern opacity-[0.03]" aria-hidden="true" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 via-teal-400 to-sky-500" />
      <div className="absolute top-20 right-20 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={w.badge} title={w.title} highlight={w.titleHighlight}
          description={w.description}
          className="[&_h2]:text-white [&_p]:text-white/60"
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: "1200px" }}>
          {w.reasons.map((reason, i) => (
            <TiltCard key={i} reason={reason} index={i} />
          ))}
        </div>

        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-teal-500/10 rounded-3xl" />
          <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-sky-500/20 rounded-full blur-3xl" aria-hidden="true" />
          <div className={cn("relative flex flex-col md:flex-row items-center justify-between gap-8", isRTL && "md:flex-row-reverse")}>
            <div className={cn("text-center md:text-left", isRTL && "md:text-right")}>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{w.cta.title}</h3>
              <p className="text-white/60 text-lg">{w.cta.subtitle}</p>
            </div>
            <div className={cn("flex flex-col sm:flex-row gap-4 flex-shrink-0", isRTL && "sm:flex-row-reverse")}>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#25D366] text-white font-semibold text-base shadow-xl shadow-[#25D366]/30 hover:shadow-[#25D366]/50 hover:-translate-y-0.5 transition-[transform,box-shadow] duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                {w.cta.btn1}
              </a>
              <Button variant="outline" size="lg" onClick={() => scrollTo("#products")}>
                {w.cta.btn2}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
