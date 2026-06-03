"use client";

import { useState, useCallback } from "react";
import {
  motion, AnimatePresence, useMotionValue,
  useTransform, animate,
} from "framer-motion";
import { ArrowRight, Star, Clock, CheckCircle2, ChevronLeft, ChevronRight, Flame } from "lucide-react";
import { products, CATEGORIES, ORIGIN_LABEL, type Product, type ProductCategory } from "@/data/products";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/contexts/LanguageContext";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "971500000000";
const SWIPE_THRESHOLD = 80; // px to register a swipe

function OrderButton({ product }: { product: Product }) {
  const { t } = useTranslation();
  const msg = encodeURIComponent(`Hello Dr. Hazem, I'm interested in: ${product.name} (${product.brand})`);
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-[#25D366] text-white font-black text-sm shadow-xl shadow-[#25D366]/30 active:scale-95 transition-transform duration-150"
    >
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      {t.products.orderButton}
    </a>
  );
}

function SwipeCard({
  product, index, total, direction, onSwipe,
}: {
  product: Product; index: number; total: number;
  direction: number;
  onSwipe: (dir: 1 | -1) => void;
}) {
  const x = useMotionValue(0);
  // subtle tilt — felt, not distracting
  const rotate = useTransform(x, [-150, 0, 150], [-7, 0, 7]);
  // pre-compute tint opacities at component level (avoids new MotionValue on each render)
  const greenTint = useTransform(x, [0, 120],  [0, 0.08]);
  const redTint   = useTransform(x, [-120, 0], [0.08, 0]);

  const handleDragEnd = useCallback((_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    const isSwipe = Math.abs(info.offset.x) > SWIPE_THRESHOLD || Math.abs(info.velocity.x) > 400;
    if (!isSwipe) {
      // overdamped spring (ζ ≈ 1.02) → snaps back cleanly with zero bounce
      animate(x, 0, { type: "spring", stiffness: 600, damping: 50 });
      return;
    }
    // trigger immediately — AnimatePresence exit handles the fly-away animation
    onSwipe((info.offset.x > 0 ? -1 : 1) as 1 | -1);
  }, [x, onSwipe]);

  const E = [0.22, 1, 0.36, 1] as const;
  const numStr = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      drag="x"
      // wide constraints = card follows finger 1-to-1, no rubber-band lag
      dragConstraints={{ left: -400, right: 400 }}
      dragElastic={0.04}
      onDragEnd={handleDragEnd}
      initial={{ opacity: 0.5, scale: 0.94, x: direction > 0 ? 340 : -340 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.94, x: direction > 0 ? -340 : 340 }}
      // overdamped (ζ ≈ 1.20) → smooth arrival, no overshoot
      transition={{ type: "spring", stiffness: 380, damping: 44, mass: 0.88 }}
      style={{ x, rotate }}
      className="absolute inset-4 cursor-grab active:cursor-grabbing select-none touch-none rounded-3xl overflow-hidden"
      aria-label={`Product ${index + 1} of ${total}: ${product.name}`}
    >
      {/* Card background */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(145deg,#0c0c0c 0%,#141414 55%,#0a0a0a 100%)" }} />
      <div className={`absolute inset-0 bg-gradient-to-t ${product.gradient} opacity-[0.08]`} />
      {/* Grain */}
      <div className="absolute inset-0 opacity-[0.18] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${product.gradient}`} />
      <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/[0.07] pointer-events-none" />

      {/* Drag tint hint — green = swipe right (prev), red = swipe left (next) */}
      <motion.div className="absolute inset-0 bg-[#25D366] pointer-events-none rounded-3xl" style={{ opacity: greenTint }} />
      <motion.div className="absolute inset-0 bg-rose-500 pointer-events-none rounded-3xl" style={{ opacity: redTint }} />

      {/* Content */}
      <div className="relative h-full flex flex-col p-6 z-10">
        {/* Top row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{product.origin === "ES" ? "🇪🇸" : "🇮🇹"}</span>
            <div>
              <p className="text-white/30 text-[9px] font-black uppercase tracking-[0.2em]">{ORIGIN_LABEL[product.origin]}</p>
              <p className="text-white/50 text-[10px] font-bold">{product.brand}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {product.popular && (
              <div className="flex items-center gap-1 bg-amber-400/15 border border-amber-400/30 rounded-full px-2 py-0.5">
                <Flame className="w-2.5 h-2.5 text-amber-400" aria-hidden="true" />
                <span className="text-amber-300 text-[8px] font-black uppercase tracking-widest">Hot</span>
              </div>
            )}
            <span className="text-white/30 font-mono text-[11px] font-bold">{numStr}/{String(total).padStart(2, "0")}</span>
          </div>
        </div>

        {/* Icon */}
        <div className="flex items-center justify-center my-4">
          <div className="relative">
            <div className={`absolute rounded-full bg-gradient-to-br ${product.gradient}`} style={{ width: 100, height: 100, filter: "blur(40px)", opacity: 0.4 }} />
            <div className="relative flex items-center justify-center w-24 h-24 rounded-full" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <span className="text-5xl leading-none filter drop-shadow-2xl" aria-hidden="true">{product.icon}</span>
            </div>
          </div>
        </div>

        {/* Category + Name */}
        <div className="text-center mb-3">
          {product.badge && (
            <span className={`inline-block text-[8px] font-black uppercase tracking-[0.18em] px-2.5 py-1 rounded-full mb-2 bg-gradient-to-r ${product.gradient} text-white`}>
              {product.badge}
            </span>
          )}
          <p className="text-white/30 text-[9px] font-bold uppercase tracking-[0.2em] mb-1">{product.category}</p>
          <h3 className="text-white font-black text-xl leading-snug">{product.name}</h3>
        </div>

        {/* Description */}
        <p className="text-white/55 text-xs leading-relaxed text-center line-clamp-2 mb-3">{product.description}</p>

        {/* Features (top 3) */}
        <ul className="space-y-1.5 mb-4 flex-1">
          {product.features.slice(0, 3).map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-white/60 text-[11px]">
              <CheckCircle2 className="w-3 h-3 text-white/30 flex-shrink-0 mt-0.5" aria-hidden="true" />
              {f}
            </li>
          ))}
        </ul>

        {/* Price + Rating */}
        <div className="flex items-center justify-between mb-4">
          <div>
            {product.originalPrice && <p className="text-white/25 text-xs line-through">{product.originalPrice}</p>}
            <span className={`font-black text-2xl bg-gradient-to-r ${product.gradient} bg-clip-text text-transparent`}>
              {product.price.split(" / ")[0]}
            </span>
          </div>
          <div className="text-right">
            <div className="flex gap-0.5 justify-end">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={cn("w-3 h-3", i < Math.round(product.rating ?? 5) ? "fill-yellow-300 text-yellow-300" : "fill-white/15 text-white/15")} aria-hidden="true" />
              ))}
            </div>
            <p className="text-white/30 text-[9px] mt-0.5">{product.reviews ?? 0} reviews</p>
          </div>
        </div>

        {/* WhatsApp CTA */}
        <OrderButton product={product} />
      </div>
    </motion.div>
  );
}

export default function MobileGallery() {
  const { t, isRTL } = useTranslation();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("All");

  const filtered = activeCategory === "All" ? products : products.filter(p => p.category === activeCategory);
  const total = filtered.length;
  const current = filtered[index] ?? filtered[0];

  const go = useCallback((dir: 1 | -1) => {
    setDirection(dir);
    setIndex(prev => {
      const next = prev + dir;
      if (next < 0) return total - 1;
      if (next >= total) return 0;
      return next;
    });
  }, [total]);

  const handleCategory = (cat: ProductCategory) => {
    setActiveCategory(cat);
    setIndex(0);
    setDirection(1);
  };

  if (!current) return null;

  return (
    <section id="products" className="relative h-screen bg-black overflow-hidden" aria-label="Products gallery">
      {/* Ambient glow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 80% 60% at 50% 60%, rgba(14,165,233,0.08) 0%, transparent 70%)` }}
        />
      </AnimatePresence>

      {/* Scan lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg,rgba(255,255,255,0.06) 0px,rgba(255,255,255,0.06) 1px,transparent 1px,transparent 4px)" }} />

      {/* Category filter */}
      <div className="absolute top-0 left-0 right-0 z-30 px-4 pt-4 pb-3 bg-gradient-to-b from-black/90 via-black/60 to-transparent">
        <div className={cn("flex gap-2 overflow-x-auto scrollbar-none pb-1", isRTL && "flex-row-reverse")} aria-label="Product categories">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategory(cat)}
              className={cn(
                "relative flex-shrink-0 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider transition-colors duration-200",
                activeCategory === cat ? "text-black" : "text-white/40 hover:text-white/75"
              )}
            >
              {activeCategory === cat && (
                <motion.span layoutId="mobile-filter-pill" className="absolute inset-0 rounded-full bg-white" transition={{ type: "spring", stiffness: 380, damping: 35 }} />
              )}
              <span className="relative z-10">{cat === "All" ? t.products.orderButton === "اطلب عبر واتساب" ? "الكل" : "All" : cat}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Card stack */}
      <div className="absolute inset-0 top-16">
        {/* Shadow/peek card behind */}
        {filtered[index + 1] && (
          <div className="absolute inset-4 rounded-3xl overflow-hidden opacity-30 scale-95 translate-y-3" style={{ background: "linear-gradient(145deg,#0c0c0c,#141414)" }}>
            <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${filtered[(index + 1) % total]?.gradient}`} />
          </div>
        )}

        {/* Main swipe card */}
        <AnimatePresence mode="popLayout" custom={direction}>
          <SwipeCard
            key={`${current.id}-${activeCategory}`}
            product={current}
            index={index}
            total={total}
            direction={direction}
            onSwipe={go}
          />
        </AnimatePresence>
      </div>

      {/* Bottom controls */}
      <div className={cn("absolute bottom-0 left-0 right-0 z-30 px-6 pb-8 pt-4 bg-gradient-to-t from-black/80 to-transparent", isRTL && "flex-row-reverse")}>
        {/* Swipe hint */}
        <p className="text-white/25 text-[9px] font-black uppercase tracking-[0.2em] text-center mb-4">
          {t.products.swipeHint}
        </p>

        {/* Progress dots + arrows */}
        <div className={cn("flex items-center justify-between gap-3")}>
          {/* Prev */}
          <motion.button
            onClick={() => go(-1)}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous product"
            className="w-10 h-10 rounded-full border border-white/18 bg-white/6 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors duration-200 backdrop-blur-sm"
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          </motion.button>

          {/* Dots */}
          <div className="flex items-center gap-1 overflow-hidden max-w-[200px]">
            {filtered.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                animate={{ width: i === index ? 20 : 5, backgroundColor: i === index ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.2)" }}
                transition={{ duration: 0.3 }}
                className="h-[5px] rounded-full flex-shrink-0"
                aria-label={`Go to product ${i + 1}`}
              />
            ))}
          </div>

          {/* Next */}
          <motion.button
            onClick={() => go(1)}
            whileTap={{ scale: 0.9 }}
            aria-label="Next product"
            className="w-10 h-10 rounded-full border border-white/18 bg-white/6 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors duration-200 backdrop-blur-sm"
          >
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
