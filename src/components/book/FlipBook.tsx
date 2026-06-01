"use client";

import { useState, useRef, useCallback } from "react";
import { useAnimate, motion, type PanInfo } from "framer-motion";
import {
  Star, Clock, CheckCircle2, ChevronLeft, ChevronRight,
  ArrowRight, Flame, Sparkles,
} from "lucide-react";
import { products, type Product } from "@/data/products";

/* ─── constants ─────────────────────────────────────── */
const TOTAL = products.length;
const FLIP_DURATION = 0.72;
const FLIP_EASE = [0.4, 0, 0.2, 1] as const;
const SWIPE_THRESHOLD = 70;

const BADGE_COLORS: Record<string, string> = {
  sky:     "bg-sky-500 text-white",
  teal:    "bg-teal-500 text-white",
  violet:  "bg-violet-500 text-white",
  rose:    "bg-rose-500 text-white",
  amber:   "bg-amber-500 text-white",
  emerald: "bg-emerald-500 text-white",
};

/* ─── PageFace ──────────────────────────────────────── */
function PageFace({
  product,
  isBack = false,
  pageNum,
  totalPages,
}: {
  product: Product;
  isBack?: boolean;
  pageNum: number;
  totalPages: number;
}) {
  const scrollToBooking = () =>
    document.querySelector("#appointment")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div
      className="absolute inset-0"
      style={{
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: isBack ? "rotateY(180deg)" : undefined,
      }}
    >
      {/* Page surface */}
      <div className="w-full h-full flex flex-col bg-white rounded-r-2xl overflow-hidden">

        {/* Gradient accent bar */}
        <div className={`h-1.5 flex-shrink-0 bg-gradient-to-r ${product.gradient}`} />

        {/* Scrollable body */}
        <div className="flex-1 flex flex-col px-6 pt-5 pb-2 min-h-0">

          {/* Row 1: icon + badges */}
          <div className="flex items-start justify-between mb-4 flex-shrink-0">
            <div className="relative">
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${product.gradient} flex items-center justify-center text-2xl shadow-md`}
              >
                {product.icon}
              </div>
              {product.popular && (
                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center shadow">
                  <Flame className="w-2.5 h-2.5 text-white" />
                </div>
              )}
            </div>

            <div className="flex flex-col items-end gap-1">
              {product.badge && (
                <span
                  className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${BADGE_COLORS[product.badgeColor ?? "sky"]}`}
                >
                  {product.badge}
                </span>
              )}
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-full">
                {product.category}
              </span>
              {product.discount && (
                <span className="text-[9px] font-black text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">
                  -{product.discount}% OFF
                </span>
              )}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-[17px] font-black text-slate-900 leading-tight mb-1.5 flex-shrink-0">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-slate-500 text-xs leading-relaxed mb-3 line-clamp-2 flex-shrink-0">
            {product.description}
          </p>

          {/* Features */}
          <ul className="space-y-1.5 mb-3 flex-1">
            {product.features.slice(0, 4).map((feat, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="leading-snug">{feat}</span>
              </li>
            ))}
            {product.features.length > 4 && (
              <li className="text-xs text-sky-500 font-semibold pl-5">
                +{product.features.length - 4} more included
              </li>
            )}
          </ul>

          {/* Price + rating row */}
          <div className="flex items-end justify-between border-t border-slate-100 pt-3 mb-3 flex-shrink-0">
            <div>
              {product.originalPrice && (
                <div className="text-xs text-slate-400 line-through leading-none mb-0.5">
                  {product.originalPrice}
                </div>
              )}
              <div
                className={`text-[22px] font-black bg-gradient-to-r ${product.gradient} bg-clip-text text-transparent leading-none`}
              >
                {product.price}
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-0.5 justify-end">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-2.5 h-2.5 ${
                      i < Math.round(product.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "fill-slate-200 text-slate-200"
                    }`}
                  />
                ))}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">{product.reviews} reviews</div>
              <div className="flex items-center justify-end gap-1 text-[10px] text-slate-400 mt-0.5">
                <Clock className="w-2.5 h-2.5" />
                {product.duration}
              </div>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={scrollToBooking}
            className={`w-full py-2.5 rounded-xl bg-gradient-to-r ${product.gradient} text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] transition-transform duration-100 flex-shrink-0`}
          >
            Book This Service <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Page footer */}
        <div className="px-6 py-2 border-t border-slate-100 flex items-center justify-between flex-shrink-0">
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`rounded-full ${
                  i === 0 ? `w-4 h-1.5 bg-gradient-to-r ${product.gradient}` : "w-1.5 h-1.5 bg-slate-200"
                }`}
              />
            ))}
          </div>
          <span className="text-[9px] text-slate-300 font-medium">
            {pageNum} / {totalPages}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── page stack behind the book ───────────────────── */
function PageStack({ count = 4 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="absolute inset-y-0 right-0 rounded-r-2xl border border-slate-200/70"
          style={{
            left: 0,
            right: `${-(i + 1) * 3}px`,
            zIndex: -i - 1,
            backgroundColor: `hsl(220, 16%, ${97 - i}%)`,
          }}
        />
      ))}
    </>
  );
}

/* ─── FlipBook (main export) ────────────────────────── */
export default function FlipBook() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [scope, animate] = useAnimate();

  const canGoNext = currentIndex < TOTAL - 1;
  const canGoPrev = currentIndex > 0;

  /* forward flip */
  const flipNext = useCallback(async () => {
    if (isFlipping || !canGoNext) return;
    setIsFlipping(true);

    await animate(scope.current, { rotateY: -180 }, { duration: FLIP_DURATION, ease: FLIP_EASE });
    setCurrentIndex((i) => i + 1);
    animate(scope.current, { rotateY: 0 }, { duration: 0 }); // instant reset
    setIsFlipping(false);
  }, [isFlipping, canGoNext, animate, scope]);

  /* backward flip */
  const flipPrev = useCallback(async () => {
    if (isFlipping || !canGoPrev) return;
    setIsFlipping(true);

    // First update index & instant set to 180 so back face is visible
    setCurrentIndex((i) => i - 1);
    animate(scope.current, { rotateY: 180 }, { duration: 0 });

    // Wait two frames for React to commit new content
    await new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));

    // Animate unflip to 0 (front face revealed)
    await animate(scope.current, { rotateY: 0 }, { duration: FLIP_DURATION, ease: FLIP_EASE });
    setIsFlipping(false);
  }, [isFlipping, canGoPrev, animate, scope]);

  /* swipe gesture */
  const handlePanEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (info.offset.x < -SWIPE_THRESHOLD) flipNext();
      else if (info.offset.x > SWIPE_THRESHOLD) flipPrev();
    },
    [flipNext, flipPrev]
  );

  const front = products[currentIndex];
  const back  = products[Math.min(currentIndex + 1, TOTAL - 1)];

  return (
    <div className="flex flex-col items-center gap-8 select-none">

      {/* ── BOOK ── */}
      <div
        className="relative"
        style={{ perspective: "1400px", perspectiveOrigin: "center center" }}
      >
        {/* Bottom shadow */}
        <div className="absolute -bottom-5 left-8 right-0 h-10 bg-black/15 rounded-full blur-2xl pointer-events-none" />

        {/* Stacked pages behind */}
        <div className="absolute top-0 bottom-0 left-6 right-0 overflow-visible pointer-events-none">
          <PageStack count={5} />
        </div>

        {/* Spine */}
        <div className="absolute left-0 top-0 bottom-0 w-6 z-20 rounded-l-xl overflow-hidden pointer-events-none">
          <div className="w-full h-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 relative">
            <div className="absolute top-0 left-0.5 w-0.5 h-full bg-white/10 rounded" />
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute left-0 right-0 h-px bg-white/5"
                style={{ top: `${5 + i * 9.5}%` }}
              />
            ))}
          </div>
        </div>

        {/* ── The flipping page ── */}
        <motion.div
          ref={scope}
          onPanEnd={handlePanEnd}
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "0% 50%",
            cursor: canGoNext ? "pointer" : "default",
            willChange: "transform",
          }}
          className="relative w-[320px] sm:w-[360px] md:w-[390px] h-[530px] sm:h-[560px] ml-6 touch-pan-y"
          onClick={flipNext}
        >
          {/* Shadow overlay during flip */}
          <motion.div
            className="absolute inset-0 z-10 pointer-events-none rounded-r-2xl"
            style={{ backfaceVisibility: "hidden" }}
            animate={{ background: isFlipping ? "rgba(0,0,0,0.08)" : "rgba(0,0,0,0)" }}
            transition={{ duration: 0.15 }}
          />

          {/* Front face */}
          <PageFace product={front} pageNum={currentIndex + 1} totalPages={TOTAL} />

          {/* Back face */}
          <PageFace product={back} isBack pageNum={currentIndex + 2} totalPages={TOTAL} />
        </motion.div>

        {/* Hover flip-hint arrow */}
        {canGoNext && !isFlipping && (
          <motion.div
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1 z-30 pointer-events-none"
          >
            <div className="w-7 h-7 rounded-full bg-sky-500/90 flex items-center justify-center shadow-lg shadow-sky-500/30">
              <ChevronRight className="w-4 h-4 text-white" />
            </div>
          </motion.div>
        )}
      </div>

      {/* ── PROGRESS BAR ── */}
      <div className="w-[326px] sm:w-[366px] md:w-[396px] ml-6 flex items-center gap-3">
        <span className="text-xs font-bold text-sky-500">{currentIndex + 1}</span>
        <div className="flex-1 h-1 bg-slate-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-sky-500 to-teal-500 rounded-full origin-left"
            animate={{ scaleX: (currentIndex + 1) / TOTAL }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
          />
        </div>
        <span className="text-xs font-bold text-slate-400">{TOTAL}</span>
      </div>

      {/* ── NAVIGATION ── */}
      <div className="flex items-center gap-5">
        {/* Previous */}
        <motion.button
          onClick={flipPrev}
          disabled={!canGoPrev || isFlipping}
          whileHover={canGoPrev ? { scale: 1.04, x: -2 } : {}}
          whileTap={canGoPrev ? { scale: 0.95 } : {}}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-full border-2 border-slate-200 text-slate-600 text-sm font-semibold disabled:opacity-25 disabled:cursor-not-allowed hover:border-sky-300 hover:text-sky-600 transition-colors duration-200"
        >
          <ChevronLeft className="w-4 h-4" /> Prev
        </motion.button>

        {/* Condensed dot indicators */}
        <div className="flex items-center gap-1.5">
          {products.map((_, i) => {
            const isActive = i === currentIndex;
            const show =
              isActive ||
              Math.abs(i - currentIndex) <= 1 ||
              i === 0 ||
              i === TOTAL - 1;
            if (!show) {
              // Show "…" only once on each side
              if (i === currentIndex - 2 || i === currentIndex + 2) {
                return (
                  <span key={i} className="text-slate-300 text-xs font-bold leading-none">
                    ·
                  </span>
                );
              }
              return null;
            }
            return (
              <motion.button
                key={i}
                onClick={() => {
                  if (!isFlipping) {
                    if (i > currentIndex) flipNext();
                    else if (i < currentIndex) flipPrev();
                  }
                }}
                animate={{
                  width: isActive ? 22 : 8,
                  backgroundColor: isActive ? "#0ea5e9" : "#e2e8f0",
                }}
                transition={{ duration: 0.25 }}
                className="h-2 rounded-full flex-shrink-0"
              />
            );
          })}
        </div>

        {/* Next */}
        <motion.button
          onClick={flipNext}
          disabled={!canGoNext || isFlipping}
          whileHover={canGoNext ? { scale: 1.04, x: 2 } : {}}
          whileTap={canGoNext ? { scale: 0.95 } : {}}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-sky-500 to-teal-500 text-white text-sm font-semibold shadow-md shadow-sky-400/25 disabled:opacity-25 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-sky-400/35 transition-all duration-200"
        >
          Next <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Swipe hint on mobile */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="text-[10px] text-slate-400 flex items-center gap-1 md:hidden"
      >
        <Sparkles className="w-3 h-3 text-sky-400" />
        Swipe left or right to browse
      </motion.p>
    </div>
  );
}
