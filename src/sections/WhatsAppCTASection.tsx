"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useTranslation } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "971500000000";

/* Map colorKey → Tailwind colour classes for icon + bg */
const COLOR_MAP: Record<string, { icon: string; bg: string }> = {
  green: { icon: "text-green-400",  bg: "bg-green-500/10"  },
  sky:   { icon: "text-sky-400",    bg: "bg-sky-500/10"    },
  teal:  { icon: "text-teal-400",   bg: "bg-teal-500/10"   },
  amber: { icon: "text-amber-400",  bg: "bg-amber-500/10"  },
};

/* Icon order matches translations.ts contact array */
const CONTACT_ICONS = [Phone, Mail, MapPin, Clock];

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const E = [0.22, 1, 0.36, 1] as const;

/* Href helpers for each contact item */
function getHref(index: number, value: string): string {
  if (index === 0) return `https://wa.me/${WHATSAPP_NUMBER}`;
  if (index === 1) return `mailto:${value}`;
  return "#";
}

export default function WhatsAppCTASection() {
  const { t, isRTL } = useTranslation();
  const w = t.whatsappCta;

  const WHATSAPP_MSG = encodeURIComponent(
    isRTL
      ? "مرحبا د. حازم، أريد طلب منتج."
      : "Hello Dr. Hazem, I'd like to order a product."
  );

  return (
    <section id="contact" className="section-padding bg-slate-950 relative overflow-hidden">
      {/* ── Background ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/40 via-slate-950 to-sky-950/30" aria-hidden="true" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#25D366]/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" aria-hidden="true" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Main CTA card ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: E }}
          className="relative bg-gradient-to-br from-[#25D366]/10 to-emerald-900/10 border border-[#25D366]/20 rounded-3xl p-10 md:p-14 text-center overflow-hidden mb-12"
        >
          {/* Decorative background WhatsApp icon */}
          <div className={cn(
            "absolute -bottom-8 opacity-[0.04]",
            isRTL ? "-left-8" : "-right-8"
          )} aria-hidden="true">
            <WhatsAppIcon className="w-64 h-64" />
          </div>

          {/* Live badge */}
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5, ease: E }}
            className={cn(
              "inline-flex items-center gap-2 bg-[#25D366]/15 border border-[#25D366]/25 rounded-full px-4 py-1.5",
              "text-xs font-black text-[#25D366] uppercase tracking-widest mb-6",
              isRTL && "font-cairo flex-row-reverse"
            )}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] inline-block animate-pulse" />
            {w.badge}
          </motion.span>

          {/* Headline */}
          <h2 className={cn(
            "text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight",
            isRTL && "font-cairo"
          )}>
            {w.title}
            <br />
            <span className="bg-gradient-to-r from-[#25D366] to-teal-400 bg-clip-text text-transparent">
              {w.titleHighlight}
            </span>
          </h2>

          {/* Description */}
          <p className={cn(
            "text-white/55 text-lg max-w-xl mx-auto mb-10 leading-relaxed",
            isRTL && "font-cairo"
          )}>
            {w.description}
          </p>

          {/* WhatsApp button */}
          <motion.a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className={cn(
              "inline-flex items-center gap-3 px-12 py-5 rounded-full",
              "bg-[#25D366] text-white font-black text-xl",
              "shadow-2xl shadow-[#25D366]/40 hover:shadow-[#25D366]/60 transition-shadow duration-300",
              isRTL && "flex-row-reverse font-cairo"
            )}
          >
            <WhatsAppIcon className="w-7 h-7" />
            {w.cta}
          </motion.a>

          <p className={cn("text-white/25 text-xs mt-4 font-medium", isRTL && "font-cairo")}>
            {w.phone}
          </p>
        </motion.div>

        {/* ── Contact info grid ── */}
        <div className={cn("grid sm:grid-cols-2 lg:grid-cols-4 gap-4", isRTL && "direction-rtl")}>
          {w.contact.map((item, i) => {
            const Icon = CONTACT_ICONS[i] ?? Phone;
            const colors = COLOR_MAP[item.colorKey] ?? COLOR_MAP.sky;
            const href = getHref(i, item.value);
            const isExternal = href.startsWith("http");
            return (
              <motion.a
                key={i}
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: E }}
                className={cn(
                  "flex items-start gap-3 p-5 bg-white/4 border border-white/8 rounded-2xl",
                  "hover:bg-white/[0.06] hover:border-white/[0.14] hover:shadow-md hover:shadow-sky-500/5",
                  "transition-all duration-300 group",
                  isRTL && "flex-row-reverse text-right"
                )}
              >
                <div className={cn(
                  "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0",
                  "group-hover:scale-110 transition-transform duration-300",
                  colors.bg
                )}>
                  <Icon className={cn("w-4 h-4", colors.icon)} aria-hidden="true" />
                </div>
                <div>
                  <p className={cn(
                    "text-white/35 text-[10px] font-bold uppercase tracking-wider",
                    isRTL && "font-cairo"
                  )}>
                    {item.label}
                  </p>
                  <p className={cn(
                    "text-white/80 text-sm font-semibold mt-0.5 group-hover:text-white transition-colors duration-300",
                    isRTL && "font-cairo"
                  )}>
                    {item.value}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
