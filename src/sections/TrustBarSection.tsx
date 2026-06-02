"use client";

import { motion } from "framer-motion";
import { ShieldCheck, BadgeCheck, Truck, Package, Award, Globe2 } from "lucide-react";

const items = [
  { icon: "🇪🇸", label: "Imported from Spain",          sub: "Licensed EU Manufacturers" },
  { icon: "🇮🇹", label: "Imported from Italy",          sub: "Certified Pharmaceutical Labs" },
  { icon: ShieldCheck, label: "GCC Approved",            sub: "Full Regulatory Compliance" },
  { icon: BadgeCheck,  label: "DHA Licensed",            sub: "Dubai Health Authority" },
  { icon: Award,       label: "ISO Certified",           sub: "International Quality Standard" },
  { icon: Package,     label: "Original Packaging",      sub: "Direct — No Intermediaries" },
  { icon: Truck,       label: "Fast UAE Delivery",       sub: "Dubai · Abu Dhabi · UAE-wide" },
  { icon: Globe2,      label: "100% Authentic",          sub: "Verified Batch Documentation" },
];

// Duplicate for infinite scroll effect
const doubled = [...items, ...items];

export default function TrustBarSection() {
  return (
    <section className="bg-slate-950 border-y border-white/5 overflow-hidden py-5">
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

        {/* Infinite scroll track */}
        <motion.div
          className="flex gap-0"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {doubled.map((item, i) => {
            const isEmoji = typeof item.icon === "string";
            const Icon = isEmoji ? null : item.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-3 px-8 py-1 border-r border-white/5 flex-shrink-0"
              >
                <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center">
                  {isEmoji ? (
                    <span className="text-xl">{item.icon as string}</span>
                  ) : Icon ? (
                    <Icon className="w-4 h-4 text-sky-400" />
                  ) : null}
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
