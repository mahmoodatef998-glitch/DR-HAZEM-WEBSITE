"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
  useMotionValue,
  useAnimationFrame,
  type MotionValue,
} from "framer-motion";
import {
  Star, CheckCircle2, ArrowRight, Flame, Clock,
} from "lucide-react";
import { products, type Product } from "@/data/products";

/* ─────────────────────────────────────────────────────────
   DATA SLICES  (3 rows of unequal sizes for visual variety)
───────────────────────────────────────────────────────── */
const ROW_1 = products.slice(0, 7);    // moves  ←  fast
const ROW_2 = products.slice(7, 14);   // moves  →  medium
const ROW_3 = products.slice(14);      // moves  ←  slow

/* ─────────────────────────────────────────────────────────
   WRAP UTILITY  –  maps any continuous number to a range
   so we get a seamless infinite loop
───────────────────────────────────────────────────────── */
function wrap(min: number, max: number, v: number): number {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

/* ─────────────────────────────────────────────────────────
   PRODUCT CARD
   • Default view  →  icon + name + price
   • Hover view    →  description + features + CTA
     (cross-fade inside the same fixed-size card)
───────────────────────────────────────────────────────── */
function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);

  const book = (e: React.MouseEvent) => {
    e.stopPropagation();
    document.querySelector("#appointment")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{
        scale: hovered ? 1.07 : 1,
        y:     hovered ? -10  : 0,
      }}
      transition={{ type: "spring", stiffness: 280, damping: 26 }}
      style={{ zIndex: hovered ? 50 : 1, position: "relative" }}
      className="flex-shrink-0 w-[236px] h-[308px] rounded-3xl overflow-hidden cursor-default"
    >
      {/* ── gradient background ── */}
      <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient}`} />

      {/* ── ambient light orb (hover only) ── */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute -top-14 -left-8 w-52 h-52 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.24) 0%, transparent 68%)",
        }}
      />

      {/* ── glass film (hover) ── */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "rgba(0,0,0,0.14)",
          backdropFilter: "blur(3px)",
          WebkitBackdropFilter: "blur(3px)",
        }}
      />

      {/* ── border highlight (hover) ── */}
      <motion.div
        animate={{
          boxShadow: hovered
            ? "inset 0 0 0 1.5px rgba(255,255,255,0.22), 0 28px 72px rgba(0,0,0,0.42)"
            : "inset 0 0 0 1px rgba(255,255,255,0.1)",
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 rounded-3xl pointer-events-none"
      />

      {/* ══════════════════════════════════════
          DEFAULT VIEW  (fades out on hover)
      ══════════════════════════════════════ */}
      <motion.div
        animate={{ opacity: hovered ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 p-5 flex flex-col pointer-events-none"
      >
        {/* icon + badge */}
        <div className="flex items-start justify-between flex-shrink-0">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-2xl">
              {product.icon}
            </div>
            {product.popular && (
              <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center shadow">
                <Flame className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
          {product.badge && (
            <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/20 text-white border border-white/25">
              {product.badge}
            </span>
          )}
        </div>

        {/* spacer */}
        <div className="flex-1" />

        {/* name + price + stars */}
        <div>
          <p className="text-white/50 text-[9px] font-bold uppercase tracking-[0.14em] mb-1">
            {product.category}
          </p>
          <h3 className="text-white font-black text-[13px] leading-snug mb-3 line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-white font-black text-lg leading-none">
              {product.price.split(" / ")[0]}
            </span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-2.5 h-2.5 ${
                    i < Math.round(product.rating)
                      ? "fill-yellow-300 text-yellow-300"
                      : "fill-white/20 text-white/20"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-1 text-white/38 text-[9px] mt-1">
            <Clock className="w-2.5 h-2.5" />
            {product.duration}
          </div>
        </div>
      </motion.div>

      {/* ══════════════════════════════════════
          HOVER VIEW  (fades in on hover)
      ══════════════════════════════════════ */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.22, delay: hovered ? 0.07 : 0 }}
        className="absolute inset-0 p-5 flex flex-col"
      >
        {/* compressed header */}
        <div className="flex items-center gap-2.5 flex-shrink-0 mb-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-xl flex-shrink-0">
            {product.icon}
          </div>
          <div className="min-w-0">
            <p className="text-white/50 text-[8px] font-bold uppercase tracking-[0.14em]">
              {product.category}
            </p>
            <h3 className="text-white font-black text-[11px] leading-snug line-clamp-1">
              {product.name}
            </h3>
          </div>
        </div>

        {/* description */}
        <p className="text-white/72 text-[10px] leading-relaxed line-clamp-2 flex-shrink-0 mb-3">
          {product.description}
        </p>

        {/* features — staggered reveal */}
        <ul className="space-y-1.5 flex-1 overflow-hidden">
          {product.features.slice(0, 3).map((feat, i) => (
            <motion.li
              key={i}
              animate={{
                opacity: hovered ? 1 : 0,
                x:       hovered ? 0 : -8,
              }}
              transition={{ delay: hovered ? 0.13 + i * 0.05 : 0, duration: 0.18 }}
              className="flex items-start gap-1.5 text-white/80 text-[10px]"
            >
              <CheckCircle2 className="w-3 h-3 flex-shrink-0 text-white/55 mt-0.5" />
              <span className="leading-snug">{feat}</span>
            </motion.li>
          ))}
        </ul>

        {/* price + CTA */}
        <div className="flex-shrink-0 mt-2 pt-2.5 border-t border-white/18">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-black text-base leading-none">
              {product.price.split(" / ")[0]}
            </span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-2 h-2 ${
                    i < Math.round(product.rating)
                      ? "fill-yellow-300 text-yellow-300"
                      : "fill-white/20 text-white/20"
                  }`}
                />
              ))}
            </div>
          </div>

          <motion.button
            onClick={book}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 5 }}
            transition={{ delay: hovered ? 0.24 : 0, duration: 0.18 }}
            whileHover={{ backgroundColor: "rgba(255,255,255,0.28)" }}
            className="w-full py-2 rounded-xl bg-white/18 border border-white/32 text-white text-[10px] font-bold flex items-center justify-center gap-1.5 backdrop-blur-sm transition-colors"
          >
            Book This Service <ArrowRight className="w-3 h-3" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   VELOCITY ROW  –  infinite horizontal marquee
   Speed = baseVelocity + scrollVelocity boost
───────────────────────────────────────────────────────── */
interface VelocityRowProps {
  items: Product[];
  baseVelocity: number;          // px/s base speed (negative = left)
  smoothVelocity: MotionValue<number>;
}

function VelocityRow({ items, baseVelocity, smoothVelocity }: VelocityRowProps) {
  const baseX = useMotionValue(0);

  /* Map scroll velocity → multiplier (clamp: false = can exceed [0,5]) */
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  /* 3-D tilt of the whole row while scrolling fast */
  const rotateZ = useTransform(
    smoothVelocity,
    [-4000, 0, 4000],
    [
      `${baseVelocity > 0 ? 1.2 : -1.2}deg`,
      "0deg",
      `${baseVelocity > 0 ? -1.2 : 1.2}deg`,
    ]
  );
  const rotateY = useTransform(
    smoothVelocity,
    [-4000, 0, 4000],
    ["3deg", "0deg", "-3deg"]
  );

  /* direction tracks scroll direction to reverse base movement */
  const directionFactor = useRef<number>(1);

  useAnimationFrame((_, delta) => {
    /* base movement every frame */
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    /* flip direction based on scroll direction */
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;

    /* boost: proportional to scroll speed */
    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  /*
   * Percentage-based infinite wrap.
   * We render 4 copies of items → each copy = 25% of total flex width.
   * wrap(-25, 0, v) maps the continuous baseX to one repeating cycle.
   */
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  return (
    /* py-10 → vertical breathing room so lifted cards aren't clipped */
    <div className="relative overflow-hidden py-10">
      <motion.div
        className="flex gap-5 will-change-transform"
        style={{ x, rotateZ, rotateY }}
      >
        {[0, 1, 2, 3].flatMap((ci) =>
          items.map((p) => (
            <ProductCard key={`${ci}-${p.id}`} product={p} />
          ))
        )}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   VELOCITY SHOWCASE  –  the full section
───────────────────────────────────────────────────────── */
export default function VelocityShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  /* Section visibility for header reveal */
  const { scrollYProgress: sectionProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  /* Global scroll velocity → drives all row speeds */
  const { scrollY } = useScroll();
  const rawVelocity    = useVelocity(scrollY);
  const smoothVelocity = useSpring(rawVelocity, { damping: 50, stiffness: 400 });

  /* Header entrance */
  const headerY       = useTransform(sectionProgress, [0, 0.2], [50, 0]);
  const headerOpacity = useTransform(sectionProgress, [0, 0.18], [0, 1]);

  /* CTA bottom entrance */
  const ctaOpacity = useTransform(sectionProgress, [0.65, 0.85], [0, 1]);
  const ctaY       = useTransform(sectionProgress, [0.65, 0.85], [30, 0]);

  /* Global skewX gives the whole showcase a cinematic tilt while scrolling */
  const globalSkewX = useTransform(
    smoothVelocity,
    [-4000, 0, 4000],
    ["-2deg", "0deg", "2deg"]
  );

  return (
    <div ref={containerRef} className="relative overflow-hidden">

      {/* ── dark ambient bg ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-[#050d1a] to-slate-950 pointer-events-none" />
      <div className="absolute inset-0 medical-pattern opacity-[0.018] pointer-events-none" />

      {/* ── top/bottom fade to page bg ── */}
      <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-white to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-slate-50 to-transparent z-20 pointer-events-none" />

      {/* ── left/right cinematic edge masks ── */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

      {/* ── header ── */}
      <motion.div
        style={{ y: headerY, opacity: headerOpacity }}
        className="relative z-20 text-center pt-20 pb-8 px-4"
      >
        {/* pill */}
        <div className="inline-flex items-center gap-2 border border-white/14 text-white/65 text-[10px] font-bold uppercase tracking-[0.18em] px-5 py-2 rounded-full mb-5"
          style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(16px)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
          20 Premium Medical Services
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" style={{ animationDelay: "0.5s" }} />
        </div>

        <h3 className="text-white text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-3 leading-none">
          Explore Our Packages
        </h3>

        <p className="text-white/38 text-sm font-medium tracking-wide">
          Scroll to accelerate &nbsp;·&nbsp; Hover to reveal
        </p>
      </motion.div>

      {/* ── rows wrapped in global skew ── */}
      <motion.div
        style={{ skewX: globalSkewX }}
        className="relative z-10 pb-4 space-y-0"
        /* perspective gives depth to the rotateY/rotateZ on rows */
        /* applied via style to avoid Tailwind JIT issues */
        ref={undefined}
      >
        {/* Row 1 — left  ← fast */}
        <VelocityRow
          items={ROW_1}
          baseVelocity={-3.8}
          smoothVelocity={smoothVelocity}
        />

        {/* Row 2 — right → medium */}
        <VelocityRow
          items={ROW_2}
          baseVelocity={3.2}
          smoothVelocity={smoothVelocity}
        />

        {/* Row 3 — left  ← slow */}
        <VelocityRow
          items={ROW_3}
          baseVelocity={-2.2}
          smoothVelocity={smoothVelocity}
        />
      </motion.div>

      {/* ── bottom CTA ── */}
      <motion.div
        style={{ opacity: ctaOpacity, y: ctaY }}
        className="relative z-20 text-center pb-20 pt-4 px-4"
      >
        <p className="text-white/35 text-sm mb-5 font-medium">
          Not sure which package suits you?
        </p>
        <button
          onClick={() =>
            document.querySelector("#appointment")?.scrollIntoView({ behavior: "smooth" })
          }
          className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-teal-500 text-white text-sm font-bold px-8 py-3.5 rounded-full shadow-2xl shadow-sky-500/30 hover:shadow-sky-500/50 hover:-translate-y-1 active:scale-95 transition-all duration-300"
        >
          Book Free Consultation <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
}
