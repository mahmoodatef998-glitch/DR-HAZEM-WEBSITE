"use client";

import { ShieldCheck, BadgeCheck, Globe2, Award, CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { useTranslation } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { useSiteConfig } from "@/hooks/useSiteConfig";

/* Icons for the 4 guarantee items — order matches translations.ts guarantees array */
const GUARANTEE_ICONS = [ShieldCheck, BadgeCheck, Globe2, Award];

const E = [0.22, 1, 0.36, 1] as const;

export default function AboutSection() {
  const { t, isRTL } = useTranslation();
  const a = t.about;
  const config = useSiteConfig();

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="about" className="section-padding bg-white relative overflow-hidden">
      {/* ── Background decorations ── */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-sky-50/60 to-transparent pointer-events-none" aria-hidden="true" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-teal-50 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={a.badge}
          title={a.title}
          highlight={a.titleHighlight}
          description={a.description}
          className={isRTL ? "font-cairo" : undefined}
        />

        <div className="mt-16 grid lg:grid-cols-2 gap-16 items-center">

          {/* ─── Left column — Profile card ─── */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: E }}
            className="space-y-8"
          >
            {/* Dark profile card */}
            <div className="relative bg-gradient-to-br from-slate-900 to-sky-950 rounded-3xl p-5 sm:p-8 overflow-hidden shadow-2xl shadow-slate-900/20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

              {/* Profile header */}
              <div className={cn(
                "relative flex flex-col sm:flex-row gap-5 sm:gap-6 items-start",
                isRTL && "sm:flex-row-reverse"
              )}>
                {/* Logo / About Photo */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-xl shadow-sky-500/30 bg-white/10 flex items-center justify-center p-1">
                    {config?.aboutImage ? (
                      <Image src={config.aboutImage} alt="About photo" width={96} height={96} className="w-full h-full object-cover rounded-2xl" />
                    ) : (
                      <Image src="/logo.png" alt="Medix Healthcare Trading" width={96} height={96} className="w-full h-full object-contain drop-shadow-lg" />
                    )}
                  </div>
                  <div className="mt-3 flex items-center justify-center gap-1">
                    <span className="text-xs text-amber-400/80 font-semibold">🇪🇸 🇮🇹</span>
                  </div>
                </div>

                {/* Info */}
                <div className={cn("flex-1", isRTL && "text-right font-cairo")}>
                  <h3 className="text-2xl font-bold text-white">{a.profileName}</h3>
                  <p className="text-sky-400 font-semibold text-sm mt-0.5">{a.profileTitle}</p>
                  <p className="text-white/45 text-sm mt-0.5">{a.profileSub}</p>
                  <div className={cn("flex flex-wrap gap-2 mt-3", isRTL && "flex-row-reverse")}>
                    <span className="bg-sky-500/20 text-sky-300 text-xs px-3 py-1 rounded-full border border-sky-500/30">
                      {a.badges.dha}
                    </span>
                    <span className="bg-teal-500/20 text-teal-300 text-xs px-3 py-1 rounded-full border border-teal-500/30">
                      {a.badges.gcc}
                    </span>
                    <span className="bg-amber-500/20 text-amber-300 text-xs px-3 py-1 rounded-full border border-amber-500/30">
                      {a.badges.eu}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className={cn(
                "relative text-white/65 text-sm leading-relaxed mt-6",
                isRTL && "text-right font-cairo"
              )}>
                {a.bio}
              </p>

              {/* Quote */}
              <div className={cn(
                "relative mt-6 pl-4 border-l-2 border-sky-500",
                isRTL && "pl-0 pr-4 border-l-0 border-r-2 text-right font-cairo"
              )}>
                <p className="text-white/75 text-sm italic leading-relaxed">
                  {a.quote}
                </p>
                <p className="text-sky-400 text-xs font-semibold mt-2">{a.quoteAuthor}</p>
              </div>
            </div>

            {/* CTA button */}
            <Button
              variant="primary"
              size="lg"
              onClick={() => scrollTo("#contact")}
              className={cn("group", isRTL && "flex-row-reverse font-cairo")}
            >
              {a.cta}
              <ArrowRight className={cn("w-5 h-5 group-hover:translate-x-1 transition-transform", isRTL && "rotate-180 group-hover:-translate-x-1 group-hover:translate-x-0")} />
            </Button>
          </motion.div>

          {/* ─── Right column — Quality Promise ─── */}
          <div className="space-y-5">
            <div className={cn("mb-6", isRTL && "text-right font-cairo")}>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{a.promiseTitle}</h3>
              <p className="text-slate-500 text-sm">{a.promiseSub}</p>
            </div>

            {a.guarantees.map((text, i) => {
              const Icon = GUARANTEE_ICONS[i] ?? ShieldCheck;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: E }}
                  className={cn(
                    "flex items-start gap-4 p-5 bg-white border border-slate-100 rounded-2xl",
                    "shadow-sm hover:shadow-md hover:-translate-y-0.5",
                    "transition-all duration-300 group",
                    isRTL && "flex-row-reverse text-right"
                  )}
                >
                  <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center flex-shrink-0 group-hover:bg-sky-100 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-sky-600" aria-hidden="true" />
                  </div>
                  <div className={cn("flex items-start gap-2", isRTL && "flex-row-reverse")}>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <p className={cn("text-slate-700 text-sm leading-relaxed", isRTL && "font-cairo")}>
                      {text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ─── Stats row ─── */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {a.stats.map((stat, i) => (
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
              <div className={cn("text-slate-800 font-semibold text-sm mt-2", isRTL && "font-cairo")}>
                {stat.label}
              </div>
              <div className={cn("text-slate-500 text-xs mt-1", isRTL && "font-cairo")}>
                {stat.sub}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
