"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Tag, Zap } from "lucide-react";
import { useTranslation } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

export interface OfferItem {
  id: string;
  productName: string;
  productNameAr: string;
  imageUrl: string;
  originalPrice: string;
  offerPrice: string;
  discountPct: number;
  active: boolean;
}

const E = [0.22, 1, 0.36, 1] as const;

export default function OffersSection() {
  const { isRTL } = useTranslation();
  const [offers, setOffers] = useState<OfferItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/offers")
      .then(r => r.json())
      .then(data => {
        setOffers((data.items ?? []).filter((o: OfferItem) => o.active));
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  if (!loaded || offers.length === 0) return null;

  return (
    <section id="offers" className="section-padding bg-slate-950 relative overflow-hidden">
      {/* Background gradient wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(239,68,68,0.07) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/6 to-transparent" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: E }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-5">
            <Zap className="w-3.5 h-3.5" />
            {isRTL ? "عروض حصرية" : "Special Offers"}
          </span>

          <h2
            className={cn(
              "text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4",
              isRTL ? "font-cairo" : ""
            )}
          >
            {isRTL ? "عروض " : "Limited "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-500">
              {isRTL ? "لفترة محدودة" : "Time Deals"}
            </span>
          </h2>

          <p
            className={cn(
              "text-white/45 text-base sm:text-lg max-w-xl mx-auto leading-relaxed",
              isRTL ? "font-cairo" : ""
            )}
          >
            {isRTL
              ? "وفّر أكثر على منتجاتنا المختارة — لفترة محدودة فقط"
              : "Save more on selected products — for a limited time only"}
          </p>
        </motion.div>

        {/* ── Cards grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {offers.map((offer, i) => (
            <OfferCard key={offer.id} offer={offer} index={i} isRTL={isRTL} />
          ))}
        </div>
      </div>
    </section>
  );
}

function OfferCard({
  offer,
  index,
  isRTL,
}: {
  offer: OfferItem;
  index: number;
  isRTL: boolean;
}) {
  const name = isRTL && offer.productNameAr ? offer.productNameAr : offer.productName;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: E, delay: index * 0.06 }}
      whileHover={{ y: -5, transition: { duration: 0.22, ease: "easeOut" } }}
      className="offer-card-shimmer group relative bg-white/[0.04] border border-white/8 rounded-2xl overflow-hidden hover:border-red-500/25 hover:shadow-[0_8px_32px_rgba(239,68,68,0.12)] transition-[border-color,box-shadow] duration-300"
    >
      {/* ── OFFER badge — animated flash ── */}
      <div className="absolute top-3 left-3 z-10">
        <span className="animate-offer-flash inline-flex items-center gap-1 bg-red-500 text-white text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 sm:px-2.5 py-1 rounded-full shadow-lg shadow-red-500/40">
          <Tag className="w-2.5 h-2.5" />
          OFFER
        </span>
      </div>

      {/* ── Discount pill ── */}
      <div className="absolute top-3 right-3 z-10">
        <span className="bg-slate-900/90 backdrop-blur-sm border border-red-500/35 text-red-400 text-[10px] font-black px-2 py-1 rounded-lg">
          -{offer.discountPct}%
        </span>
      </div>

      {/* ── Product image ── */}
      <div className="relative h-40 sm:h-48 bg-white/[0.03] overflow-hidden">
        {offer.imageUrl ? (
          <Image
            src={offer.imageUrl}
            alt={name}
            fill
            className="object-contain p-4 group-hover:scale-[1.06] transition-transform duration-500 ease-out"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-white/10 text-5xl select-none">
            💊
          </div>
        )}
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-slate-950/60 to-transparent" />
      </div>

      {/* ── Card content ── */}
      <div className="p-3.5 sm:p-4">
        <h3
          className={cn(
            "text-white font-bold text-sm leading-snug mb-3 line-clamp-2 min-h-[2.5rem]",
            isRTL ? "font-cairo text-right" : ""
          )}
        >
          {name}
        </h3>

        <div className="space-y-2">
          {/* Prices */}
          <div className={cn("flex items-baseline gap-2", isRTL ? "flex-row-reverse" : "")}>
            <p className="text-white/30 text-xs line-through leading-none">
              {offer.originalPrice} AED
            </p>
            <p className="text-red-400 text-lg sm:text-xl font-black leading-none">
              {offer.offerPrice}
              <span className="text-red-400/60 text-[10px] font-semibold ml-0.5">AED</span>
            </p>
          </div>

          {/* Savings tag */}
          <div className={cn("flex", isRTL ? "justify-end" : "")}>
            <span className="bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded-md">
              {isRTL ? `وفّر ${offer.discountPct}%` : `Save ${offer.discountPct}%`}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
