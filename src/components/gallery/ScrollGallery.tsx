"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
  type MotionValue,
} from "framer-motion";
import {
  Star, Clock, CheckCircle2, ArrowRight,
  Flame, ChevronLeft, ChevronRight,
} from "lucide-react";
import { products, CATEGORIES, ORIGIN_LABEL, type Product, type ProductCategory } from "@/data/products";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/contexts/LanguageContext";

/* ─────────────────────────────────────────────────────────
   CONSTANTS  (layout — never change)
───────────────────────────────────────────────────────── */
const CARD_W      = 290;
const CARD_H      = 450;
const SPACING     = 162;   // increased 50%
const STEP_Y      = 65;    // vertical rise per card step (staircase effect)
const PERSPECTIVE = "1500px";
const MAX_VISIBLE = 5;     // show more steps of the staircase

/* ─────────────────────────────────────────────────────────
   GALLERY CARD  – large portrait card with cross-fade hover
───────────────────────────────────────────────────────── */
function GalleryCard({
  product,
  index,
  activeIndex,
  orderLabel,
}: {
  product: Product;
  index: number;
  activeIndex: MotionValue<number>;
  orderLabel: string;
}) {
  const [hovered, setHovered] = useState(false);

  const offset  = useTransform(activeIndex, (v) => index - v);
  const x       = useTransform(offset, (v) => v * SPACING);
  const y       = useTransform(offset, (v) => -v * STEP_Y); // staircase: each step higher
  const z       = useTransform(offset, (v) => -Math.abs(v) * 140);
  const rotateY = useTransform(offset, (v) => v * -9);      // subtle tilt to complement stairs
  const opacity = useTransform(offset, (v) =>
    Math.abs(v) > MAX_VISIBLE + 0.5 ? 0 : Math.max(0, 1 - Math.abs(v) * 0.18)
  );
  const scale   = useTransform(offset, (v) =>
    Math.max(0.65, 1 - Math.abs(v) * 0.07)
  );

  const [isActive, setIsActive] = useState(index === 0);
  useEffect(() => {
    return activeIndex.on("change", (v) => setIsActive(Math.round(v) === index));
  }, [activeIndex, index]);

  const numStr = String(index + 1).padStart(2, "0");

  const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "971500000000";
  const { t: cardT } = useTranslation();

  const handleBook = (e: React.MouseEvent) => {
    e.stopPropagation();
    const msg = encodeURIComponent(`${cardT.products.whatsappMsg} ${product.name} (${product.brand})`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={()  => setHovered(false)}
      style={{
        x, y, z, rotateY, opacity, scale,
        position : "absolute",
        left     : "50%",
        top      : "50%",
        marginLeft: -CARD_W / 2,
        marginTop : -CARD_H / 2,
        width    : CARD_W,
        height   : CARD_H,
        transformStyle: "preserve-3d",
      }}
      className="cursor-pointer rounded-2xl overflow-hidden"
    >
      {/* ── LUXURY BLACK base ── */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(145deg, #0c0c0c 0%, #141414 50%, #0a0a0a 100%)" }}
      />
      <div className={`absolute inset-0 bg-gradient-to-t ${product.gradient} opacity-[0.08]`} />

      {/* grain texture */}
      <div
        className="absolute inset-0 opacity-[0.22] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${product.gradient}`} />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.07] pointer-events-none" />

      {/* active glow ring */}
      <motion.div
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="absolute -inset-px rounded-2xl pointer-events-none"
        style={{ boxShadow: "inset 0 0 0 1.5px rgba(255,255,255,0.18), 0 0 40px rgba(255,255,255,0.04)" }}
      />

      {/* ── DEFAULT VIEW ── */}
      <motion.div
        animate={{ opacity: hovered ? 0 : 1 }}
        transition={{ duration: 0.18 }}
        className="absolute inset-0 p-6 flex flex-col pointer-events-none"
      >
        <div className="flex items-start justify-between">
          <span className="font-mono text-white/35 text-[11px] font-bold tracking-[0.2em]">{numStr}</span>
          <div className="flex items-center gap-1.5">
            {/* Country badge */}
            <span className="text-[15px]">{product.origin === "ES" ? "🇪🇸" : "🇮🇹"}</span>
            {product.popular && (
              <div className="flex items-center gap-1 bg-amber-400/18 border border-amber-400/35 rounded-full px-2 py-0.5">
                <Flame className="w-2.5 h-2.5 text-amber-400" />
                <span className="text-amber-300 text-[8px] font-black uppercase tracking-widest">Hot</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="relative flex items-center justify-center">
            <div
              className={`absolute rounded-full bg-gradient-to-br ${product.gradient}`}
              style={{ width: 130, height: 130, filter: "blur(48px)", opacity: 0.35 }}
            />
            <div
              className="relative flex items-center justify-center w-28 h-28 rounded-full"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <span className="text-[60px] leading-none filter drop-shadow-2xl select-none">{product.icon}</span>
            </div>
          </div>
        </div>

        <div>
          {product.badge && (
            <span className={`inline-block text-[8px] font-black uppercase tracking-[0.18em] px-2.5 py-1 rounded-full mb-2 bg-gradient-to-r ${product.gradient} text-white`}>
              {product.badge}
            </span>
          )}
          <p className="text-white/35 text-[9px] font-bold uppercase tracking-[0.2em] mb-1">{product.category}</p>
          <h3 className="text-white font-black text-[17px] leading-snug mb-3 line-clamp-2">{product.name}</h3>
          <div className="flex items-end justify-between">
            <div>
              {product.originalPrice && (
                <span className="text-white/30 text-xs line-through block">{product.originalPrice}</span>
              )}
              <span className={`font-black text-2xl leading-none bg-gradient-to-r ${product.gradient} bg-clip-text text-transparent`}>
                {product.price.split(" / ")[0]}
              </span>
            </div>
            <div className="text-right">
              <div className="flex gap-0.5 justify-end">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-2.5 h-2.5 ${i < Math.round(product.rating) ? "fill-yellow-300 text-yellow-300" : "fill-white/18 text-white/18"}`} />
                ))}
              </div>
              <p className="text-white/32 text-[9px] mt-0.5 font-medium">{product.reviews} reviews</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── HOVER OVERLAY ── */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="absolute inset-0 flex flex-col rounded-2xl overflow-hidden"
            style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(22px) saturate(180%)", WebkitBackdropFilter: "blur(22px) saturate(180%)" }}
          >
            <div className={`h-0.5 bg-gradient-to-r ${product.gradient} flex-shrink-0`} />
            <div className="flex-1 p-5 flex flex-col overflow-hidden">
              <div className="flex items-start gap-3 mb-3 flex-shrink-0">
                <div className="w-10 h-10 rounded-xl bg-white/12 border border-white/18 flex items-center justify-center text-xl flex-shrink-0">
                  {product.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-white/40 text-[8px] font-bold uppercase tracking-[0.18em]">
                    {product.origin === "ES" ? "🇪🇸" : "🇮🇹"} {ORIGIN_LABEL[product.origin]} · {product.category}
                  </p>
                  <h3 className="text-white font-black text-[13px] leading-tight line-clamp-2">{product.name}</h3>
                  <p className="text-white/30 text-[9px] mt-0.5">{product.brand}</p>
                </div>
                {product.badge && (
                  <span className="text-[7px] font-black uppercase tracking-widest px-2 py-1 rounded-full bg-white/12 border border-white/18 text-white flex-shrink-0">
                    {product.badge}
                  </span>
                )}
              </div>
              <p className="text-white/60 text-[10.5px] leading-relaxed mb-3 line-clamp-2 flex-shrink-0">{product.description}</p>
              <ul className="space-y-1.5 flex-1 overflow-hidden">
                {product.features.slice(0, 4).map((feat, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.055, duration: 0.2 }}
                    className="flex items-start gap-2 text-white/72 text-[10px]"
                  >
                    <CheckCircle2 className="w-3 h-3 flex-shrink-0 text-white/40 mt-0.5" />
                    <span className="leading-snug">{feat}</span>
                  </motion.li>
                ))}
              </ul>
              <div className="flex-shrink-0 pt-3 mt-2 border-t border-white/12">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    {product.originalPrice && (
                      <div className="text-white/28 text-[9px] line-through leading-none mb-0.5">{product.originalPrice}</div>
                    )}
                    <span className="text-white font-black text-xl leading-none">{product.price.split(" / ")[0]}</span>
                    {product.discount && (
                      <span className="ml-2 text-rose-400 text-[9px] font-black">-{product.discount}%</span>
                    )}
                  </div>
                  <div className="text-right text-white/38 text-[9px]">
                    <div className="flex items-center gap-1 justify-end mb-0.5">
                      <Clock className="w-2.5 h-2.5" />
                      {product.duration}
                    </div>
                    <div className="flex gap-0.5 justify-end">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-2 h-2 ${i < Math.round(product.rating) ? "fill-yellow-300 text-yellow-300" : "fill-white/18 text-white/18"}`} />
                      ))}
                    </div>
                  </div>
                </div>
                <motion.button
                  onClick={handleBook}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28, duration: 0.2 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full py-2.5 rounded-xl bg-[#25D366] text-white text-[11px] font-black flex items-center justify-center gap-2 shadow-xl tracking-wide uppercase`}
                >
                  {orderLabel}
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   SCROLL GALLERY  –  sticky 3-D showcase driven by scroll
───────────────────────────────────────────────────────── */
export default function ScrollGallery({ products: productsProp }: { products?: typeof products }) {
  const allProducts = productsProp ?? products;
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("All");

  /* ── filtered products ── */
  const filteredProducts =
    activeCategory === "All"
      ? allProducts
      : allProducts.filter((p) => p.category === activeCategory);
  const TOTAL = filteredProducts.length;

  /* ── category change: reset index + scroll to section top ── */
  const handleCategoryChange = useCallback((cat: ProductCategory) => {
    setActiveCategory(cat);
    setDisplayIndex(0);
    if (!containerRef.current) return;
    window.scrollTo({ top: containerRef.current.offsetTop - 80, behavior: "smooth" });
  }, []);

  /* ── scroll → activeIndex ── */
  const { scrollYProgress } = useScroll({ target: containerRef });
  const rawIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL - 1]);
  const activeIndex = useSpring(rawIndex, { stiffness: 280, damping: 38, restDelta: 0.01 });

  useEffect(() => {
    return activeIndex.on("change", (v) => setDisplayIndex(Math.round(v)));
  }, [activeIndex]);

  /* ── keyboard / button navigation ── */
  const scrollToIndex = useCallback(
    (targetIdx: number) => {
      const el = containerRef.current;
      if (!el) return;
      const clamped = Math.max(0, Math.min(TOTAL - 1, targetIdx));
      const progress = TOTAL <= 1 ? 0 : clamped / (TOTAL - 1);
      const maxScroll = el.scrollHeight - window.innerHeight;
      window.scrollTo({ top: el.offsetTop + progress * maxScroll, behavior: "smooth" });
    },
    [TOTAL]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") scrollToIndex(displayIndex + 1);
      if (e.key === "ArrowLeft"  || e.key === "ArrowUp")   scrollToIndex(displayIndex - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [displayIndex, scrollToIndex]);

  return (
    <div
      ref={containerRef}
      style={{ height: `${TOTAL * 25}vh` }}
      className="relative"
    >
      {/* ════════════════════════════════════════════
          STICKY VIEWPORT
      ════════════════════════════════════════════ */}
      <div className="sticky top-0 h-screen overflow-hidden bg-black">

        {/* ── ambient radial glow ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={displayIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(ellipse 70% 60% at 50% 55%, rgba(14,165,233,0.07) 0%, transparent 70%)` }}
          />
        </AnimatePresence>

        {/* ── scan lines ── */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 4px)" }}
        />

        {/* ════════════════════════════════════════════
            CATEGORY FILTER — animated pill (layoutId)
        ════════════════════════════════════════════ */}
        <div className="absolute top-0 left-0 right-0 z-40 px-6 pt-4 pb-3 bg-gradient-to-b from-black/90 via-black/50 to-transparent">
          <div className="flex items-center gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={cn(
                  "relative px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider transition-colors duration-200",
                  activeCategory === cat
                    ? "text-black"
                    : "text-white/40 hover:text-white/75"
                )}
              >
                {activeCategory === cat && (
                  <motion.span
                    layoutId="gallery-filter-pill"
                    className="absolute inset-0 rounded-full bg-white"
                    transition={{ type: "spring", stiffness: 380, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{cat === "All" ? t.products.all : cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── top-left brand / title ── */}
        <div className="absolute top-16 left-8 z-30 pointer-events-none select-none">
          <p className="text-white/28 text-[9px] font-black uppercase tracking-[0.28em] mb-2">
            Dr. Hazem · Dubai UAE
          </p>
          <h2 className="text-white font-black leading-[0.92] tracking-tight">
            <span className="block text-[28px] sm:text-[38px] md:text-[46px]">{t.products.heading}</span>
            <span className="block text-[28px] sm:text-[38px] md:text-[46px] text-white/30">{t.products.headingSub}</span>
          </h2>
          <p className="text-white/22 text-xs font-bold uppercase tracking-[0.22em] mt-3">
            ({String(TOTAL).padStart(2, "0")}) {activeCategory === "All" ? t.products.total : activeCategory.toUpperCase()}
          </p>
        </div>

        {/* ── current card index (top-right) ── */}
        <div className="absolute top-16 right-8 z-30 text-right pointer-events-none select-none">
          <AnimatePresence mode="wait">
            <motion.p
              key={displayIndex}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.25 }}
              className="text-white font-black text-5xl md:text-6xl leading-none tracking-tight"
            >
              {String(displayIndex + 1).padStart(2, "0")}
            </motion.p>
          </AnimatePresence>
          <p className="text-white/22 text-[10px] font-bold uppercase tracking-[0.22em] mt-1">
            / {String(TOTAL).padStart(2, "0")}
          </p>
        </div>

        {/* ════════════════════
            3-D CARD STAGE
        ════════════════════ */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ perspective: PERSPECTIVE, perspectiveOrigin: "50% 50%" }}
        >
          <div style={{ position: "relative", width: 0, height: 0, transformStyle: "preserve-3d" }}>
            {filteredProducts.map((product, index) => (
              <GalleryCard
                key={`${product.id}-${activeCategory}`}
                product={product}
                index={index}
                activeIndex={activeIndex}
                orderLabel={t.products.orderButton}
              />
            ))}
          </div>
        </div>

        {/* ── bottom info strip ── */}
        <div className="absolute bottom-[88px] right-8 z-30 text-right max-w-[220px] pointer-events-none select-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={displayIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <p className="text-white/28 text-[8px] font-bold uppercase tracking-[0.22em] mb-1">
                {filteredProducts[displayIndex]?.category}
              </p>
              <p className="text-white font-black text-sm leading-tight mb-0.5">
                {filteredProducts[displayIndex]?.name}
              </p>
              <p className="text-white/55 font-black text-base">
                {filteredProducts[displayIndex]?.price.split(" / ")[0]}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── prev / next buttons ── */}
        <div className="absolute bottom-6 left-8 z-30 flex items-center gap-3">
          <motion.button
            onClick={() => scrollToIndex(displayIndex - 1)}
            disabled={displayIndex === 0}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            aria-label="Previous product"
            className="w-10 h-10 rounded-full border border-white/18 bg-white/6 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 disabled:opacity-20 disabled:cursor-not-allowed transition-colors duration-200 backdrop-blur-sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </motion.button>
          <motion.button
            onClick={() => scrollToIndex(displayIndex + 1)}
            disabled={displayIndex === TOTAL - 1}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            aria-label="Next product"
            className="w-10 h-10 rounded-full border border-white/18 bg-white/6 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 disabled:opacity-20 disabled:cursor-not-allowed transition-colors duration-200 backdrop-blur-sm"
          >
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* ── progress dots ── */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3">
          <div className="flex items-center gap-1">
            {filteredProducts.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to product ${i + 1}`}
                animate={{
                  width: i === displayIndex ? 22 : 5,
                  backgroundColor: i === displayIndex ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.18)",
                }}
                transition={{ duration: 0.3 }}
                className="h-[5px] rounded-full cursor-pointer"
              />
            ))}
          </div>
          <p className="text-white/22 text-[9px] font-black uppercase tracking-[0.24em]">{t.products.scrollToSurf}</p>
        </div>

        {/* ── hover hint ── */}
        <AnimatePresence>
          {displayIndex !== undefined && (
            <motion.div
              key="hover-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 z-20 pointer-events-none select-none"
              style={{ marginTop: CARD_H / 2 + 16 }}
            >
              <p className="text-white/20 text-[9px] font-bold uppercase tracking-[0.22em]">{t.products.hoverReveal}</p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
