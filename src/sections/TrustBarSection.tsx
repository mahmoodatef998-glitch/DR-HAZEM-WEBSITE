"use client";

import { motion } from "framer-motion";
import { ShieldCheck, BadgeCheck, Truck, Package, Award, Globe2 } from "lucide-react";
import { useTranslation } from "@/contexts/LanguageContext";

export default function TrustBarSection() {
  const { t } = useTranslation();
  const tb = t.trustBar;

  const items = [
    { icon: "🇪🇸", label: tb.spain,    sub: tb.spainSub    },
    { icon: "🇮🇹", label: tb.italy,    sub: tb.italySub    },
    { icon: ShieldCheck, label: tb.gcc, sub: tb.gccSub      },
    { icon: BadgeCheck,  label: tb.dha, sub: tb.dhaSub      },
    { icon: Award,       label: tb.iso, sub: tb.isoSub      },
    { icon: Package,  label: tb.original, sub: tb.originalSub },
    { icon: Truck,    label: tb.delivery, sub: tb.deliverySub },
    { icon: Globe2,   label: tb.authentic, sub: tb.authenticSub },
  ];

  const doubled = [...items, ...items];

  return (
    <section className="bg-slate-950 border-y border-white/5 overflow-hidden py-5" aria-label="Trust indicators">
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" aria-hidden="true" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" aria-hidden="true" />

        {/* aria-hidden on marquee — content is decorative/redundant */}
        <motion.div
          aria-hidden="true"
          className="flex gap-0"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        >
          {doubled.map((item, i) => {
            const isEmoji = typeof item.icon === "string";
            const Icon = isEmoji ? null : item.icon as React.ElementType;
            return (
              <div key={i} className="flex items-center gap-3 px-8 py-1 border-r border-white/5 flex-shrink-0">
                <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center">
                  {isEmoji ? <span className="text-xl">{item.icon as string}</span> : Icon ? <Icon className="w-4 h-4 text-sky-400" /> : null}
                </div>
                <div>
                  <p className="text-white/80 text-xs font-bold leading-none">{item.label}</p>
                  <p className="text-white/35 text-[10px] mt-0.5 leading-none">{item.sub}</p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
