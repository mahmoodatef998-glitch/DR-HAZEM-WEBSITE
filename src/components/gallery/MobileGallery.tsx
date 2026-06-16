"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { Star, CheckCircle2, ChevronLeft, ChevronRight, Flame, ExternalLink } from "lucide-react";
import { products, CATEGORIES, ORIGIN_LABEL, type Product, type ProductCategory } from "@/data/products";
import { getOriginFlag } from "@/lib/origins";
import { cn, slugify } from "@/lib/utils";
import { useTranslation } from "@/contexts/LanguageContext";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "971585335516";
const SWIPE_THRESHOLD = 30;

function OrderButton({ product }: { product: Product }) {
  const { t } = useTranslation();
  const msg = encodeURIComponent(`${t.products.whatsappMsg} ${product.name} (${product.brand})`);
  return (
    <div className="flex gap-2">
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-[#25D366] text-white font-black text-sm shadow-lg shadow-[#25D366]/25 active:scale-95 transition-transform duration-100"
      >
        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        {t.products.orderButton}
      </a>
      <a
        href={`/products/${slugify(product.name)}`}
        className="w-12 flex items-center justify-center rounded-2xl bg-white/10 border border-white/15 text-white/70 hover:text-white hover:bg-white/18 transition-colors duration-150 active:scale-95"
        title="View full details"
      >
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );
}

function SwipeCard({
  product, index, total, direction, onSwipe,
}: {
  product: Product;
  index: number;
  total: number;
  direction: number;
  onSwipe: (dir: 1 | -1) => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-4, 0, 4]);
  const greenTint = useTransform(x, [0, 100], [0, 0.07]);
  const redTint   = useTransform(x, [-100, 0], [0.07, 0]);

  const router = useRouter();
  const mainPrice   = product.price || product.originalPrice || "";
  const hasDiscount = !!(product.originalPrice && product.price && product.price !== product.originalPrice);
  const maxDragRef  = useRef(0);
  const tapZoneRef  = useRef<"left" | "center" | "right">("center");
  const skipNavRef  = useRef(false);

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    skipNavRef.current = !!(e.target as Element).closest("a, button");
    maxDragRef.current = 0;
    if (!skipNavRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width;
      tapZoneRef.current = relX < 0.3 ? "left" : relX > 0.7 ? "right" : "center";
    }
  }, []);

  const handleDrag = useCallback(
    (_: unknown, info: { offset: { x: number } }) => {
      maxDragRef.current = Math.max(maxDragRef.current, Math.abs(info.offset.x));
    },
    []
  );

  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
      const wasTap = maxDragRef.current < 5;
      maxDragRef.current = 0;
      const isSwipe = Math.abs(info.offset.x) > SWIPE_THRESHOLD || Math.abs(info.velocity.x) > 250;
      if (!isSwipe) {
        animate(x, 0, { type: "spring", stiffness: 1200, damping: 80 });
        if (wasTap && tapZoneRef.current === "center" && !skipNavRef.current) {
          router.push(`/products/${slugify(product.name)}`);
        }
        return;
      }
      onSwipe((info.offset.x > 0 ? -1 : 1) as 1 | -1);
    },
    [x, onSwipe, router, product.name]
  );

  const numStr = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: -400, right: 400 }}
      dragElastic={0}
      dragMomentum={false}
      onPointerDown={handlePointerDown}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      initial={{ opacity: 0, x: direction > 0 ? 300 : -300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction > 0 ? -300 : 300 }}
      transition={{ type: "spring", stiffness: 480, damping: 40, mass: 0.5 }}
      style={{ x, rotate, willChange: "transform" }}
      className="absolute inset-4 cursor-grab active:cursor-grabbing select-none touch-none rounded-3xl overflow-hidden"
      aria-label={`Product ${index + 1} of ${total}: ${product.name}`}
    >
      <div className="absolute inset-0 bg-[#111111]" />
      {product.image_url ? (
        <>
          <img src={product.image_url} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover scale-125 blur-2xl opacity-50 pointer-events-none" draggable={false} />
          <img src={product.image_url} alt={product.name} className="absolute inset-0 w-full h-full object-contain" draggable={false} />
        </>
      ) : (
        <>
          <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-[0.07]`} />
          <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${product.gradient}`} />
        </>
      )}
      <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/[0.06] pointer-events-none" />
      <motion.div className="absolute inset-0 bg-[#25D366] rounded-3xl pointer-events-none" style={{ opacity: greenTint }} />
      <motion.div className="absolute inset-0 bg-rose-500 rounded-3xl pointer-events-none" style={{ opacity: redTint }} />
      <div className="absolute inset-0 flex z-20 pointer-events-none">
        <div className="w-[30%] h-[82%] pointer-events-auto cursor-pointer" onClick={() => onSwipe(-1)} aria-label="Previous product" />
        <div className="flex-1" />
        <div className="w-[30%] h-[82%] pointer-events-auto cursor-pointer" onClick={() => onSwipe(1)} aria-label="Next product" />
      </div>
      <div className="relative h-full flex flex-col z-10">
        {product.image_url ? (
          <>
            {product.badge && (
              <div className="flex justify-end p-4">
                <span className={`text-[8px] font-black uppercase tracking-[0.16em] px-2.5 py-1 rounded-full bg-gradient-to-r ${product.gradient} text-white shadow-lg`}>{product.badge}</span>
              </div>
            )}
            <div className="mt-auto">
              <div className="bg-gradient-to-t from-black/90 to-transparent pt-12 px-5 pb-3">
                <h3 className="text-white font-black text-[18px] leading-snug mb-2 drop-shadow-lg">{product.name}</h3>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    {hasDiscount && <p className="text-white/50 text-xs line-through leading-none mb-0.5">{product.originalPrice}</p>}
                    <span className={cn("font-black text-2xl leading-none", hasDiscount ? "text-rose-400" : "text-white")}>{mainPrice}</span>
                  </div>
                  <div className="flex gap-0.5">{[...Array(5)].map((_, i) => (<Star key={i} className={cn("w-3 h-3", i < Math.round(product.rating ?? 5) ? "fill-yellow-300 text-yellow-300" : "fill-white/20 text-white/20")} aria-hidden="true" />))}</div>
                </div>
              </div>
              <div className="px-5 pb-4 relative z-30"><OrderButton product={product} /></div>
            </div>
          </>
        ) : (
          <div className="flex flex-col h-full p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl leading-none">{getOriginFlag(product.origin)}</span>
                <div>
                  <p className="text-white/30 text-[9px] font-black uppercase tracking-[0.18em]">{ORIGIN_LABEL[product.origin]}</p>
                  <p className="text-white/50 text-[10px] font-semibold">{product.brand}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {product.popular && (<div className="flex items-center gap-1 bg-amber-400/15 border border-amber-400/25 rounded-full px-2 py-0.5"><Flame className="w-2.5 h-2.5 text-amber-400" aria-hidden="true" /><span className="text-amber-300 text-[8px] font-black uppercase tracking-widest">Hot</span></div>)}
                <span className="text-white/25 font-mono text-[11px] font-bold">{numStr}/{String(total).padStart(2, "0")}</span>
              </div>
            </div>
            <div className="flex items-center justify-center my-3">
              <div className="relative w-20 h-20">
                <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${product.gradient} opacity-20`} />
                <div className="absolute inset-0 rounded-full ring-1 ring-white/[0.08]" />
                <span className="absolute inset-0 flex items-center justify-center text-5xl leading-none" aria-hidden="true">{product.icon}</span>
              </div>
            </div>
            <div className="text-center mb-2.5">
              {product.badge && <span className={`inline-block text-[8px] font-black uppercase tracking-[0.16em] px-2.5 py-1 rounded-full mb-2 bg-gradient-to-r ${product.gradient} text-white`}>{product.badge}</span>}
              <p className="text-white/30 text-[9px] font-bold uppercase tracking-[0.18em] mb-1">{product.category}</p>
              <h3 className="text-white font-black text-[18px] leading-snug">{product.name}</h3>
            </div>
            <p className="text-white/50 text-[11px] leading-relaxed text-center line-clamp-2 mb-2.5">{product.description}</p>
            <ul className="space-y-1.5 mb-3 flex-1">{product.features.slice(0, 3).map((f, i) => (<li key={i} className="flex items-start gap-2 text-white/55 text-[11px]"><CheckCircle2 className="w-3 h-3 text-white/25 flex-shrink-0 mt-0.5" aria-hidden="true" /><span>{f}</span></li>))}</ul>
            <div className="flex items-center justify-between mb-3">
              <div>
                {hasDiscount && <p className="text-white/25 text-xs line-through leading-none mb-0.5">{product.originalPrice}</p>}
                <span className={cn("font-black text-2xl leading-none", hasDiscount ? "text-rose-400" : "text-white")}>{mainPrice}</span>
              </div>
              <div className="text-right">
                <div className="flex gap-0.5 justify-end mb-0.5">{[...Array(5)].map((_, i) => (<Star key={i} className={cn("w-3 h-3", i < Math.round(product.rating ?? 5) ? "fill-yellow-300 text-yellow-300" : "fill-white/15 text-white/15")} aria-hidden="true" />))}</div>
                <p className="text-white/30 text-[9px]">{product.reviews ?? 0} reviews</p>
              </div>
            </div>
            <div className="relative z-30"><OrderButton product={product} /></div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function MobileGallery({ products: productsProp }: { products?: typeof products }) {
  const allProducts = productsProp ?? products;
  const { t, isRTL } = useTranslation();
  const [index, setIndex]     = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("All");

  const filtered = activeCategory === "All" ? allProducts : allProducts.filter((p) => p.category === activeCategory);
  const total   = filtered.length;
  const current = filtered[index] ?? filtered[0];

  const go = useCallback((dir: 1 | -1) => {
    setDirection(dir);
    setIndex((prev) => { const next = prev + dir; if (next < 0) return total - 1; if (next >= total) return 0; return next; });
  }, [total]);

  const handleCategory = useCallback((cat: ProductCategory) => { setActiveCategory(cat); setIndex(0); setDirection(1); }, []);

  const [showHint, setShowHint] = useState(true);
  useEffect(() => { const timer = setTimeout(() => setShowHint(false), 2200); return () => clearTimeout(timer); }, []);

  const peekProduct = filtered[(index + 1) % total];
  if (!current) return null;

  return (
    <section className="relative h-screen bg-[#0a0a0a] overflow-hidden" aria-label="Products gallery">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 55%, rgba(14,165,233,0.06) 0%, transparent 70%)" }} aria-hidden="true" />
      <div className="absolute top-0 left-0 right-0 z-30 px-4 pt-4 pb-2 bg-gradient-to-b from-black/85 to-transparent">
        <div className={cn("flex gap-1.5 overflow-x-auto pb-1", isRTL && "flex-row-reverse")} style={{ scrollbarWidth: "none" }} aria-label="Product categories">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => handleCategory(cat)} className={cn("relative flex-shrink-0 px-3.5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider transition-colors duration-150", activeCategory === cat ? "text-black" : "text-white/40")}>
              {activeCategory === cat && (<motion.span layoutId="mob-filter-pill" className="absolute inset-0 rounded-full bg-white" transition={{ type: "spring", stiffness: 420, damping: 38 }} />)}
              <span className="relative z-10">{cat === "All" ? t.products.all : cat}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 top-14">
        {peekProduct && (
          <div className="absolute inset-4 rounded-3xl overflow-hidden opacity-25" style={{ transform: "scale(0.94) translateY(10px)", background: "#111" }} aria-hidden="true">
            <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${peekProduct.gradient}`} />
          </div>
        )}
        <AnimatePresence mode="sync" custom={direction}>
          <SwipeCard key={`${current.id}-${activeCategory}`} product={current} index={index} total={total} direction={direction} onSwipe={go} />
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {showHint && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="absolute inset-0 top-14 z-25 flex items-center justify-between px-3 pointer-events-none" aria-hidden="true">
            <motion.div animate={{ x: [0, -5, 0] }} transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }} className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center"><ChevronLeft className="w-4 h-4 text-white/60" /></motion.div>
            <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }} className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center"><ChevronRight className="w-4 h-4 text-white/60" /></motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute bottom-0 left-0 right-0 z-30 px-5 pb-7 pt-3 bg-gradient-to-t from-black/70 to-transparent">
        <p className="text-white/20 text-[9px] font-black uppercase tracking-[0.22em] text-center mb-3">{t.products.swipeHint}</p>
        <div className="flex items-center justify-between gap-2">
          <button onClick={() => go(-1)} aria-label="Previous product" className="w-9 h-9 rounded-full border border-white/15 bg-white/[0.05] flex items-center justify-center text-white/50 active:scale-90 transition-transform duration-100"><ChevronLeft className="w-4 h-4" aria-hidden="true" /></button>
          <div className="flex items-center gap-1 overflow-hidden" style={{ maxWidth: "calc(100% - 88px)" }}>
            {filtered.map((_, i) => (<motion.button key={i} onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }} animate={{ width: i === index ? 18 : 5, backgroundColor: i === index ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.18)" }} transition={{ duration: 0.2 }} className="h-[5px] rounded-full flex-shrink-0" aria-label={`Go to product ${i + 1}`} />))}
          </div>
          <button onClick={() => go(1)} aria-label="Next product" className="w-9 h-9 rounded-full border border-white/15 bg-white/[0.05] flex items-center justify-center text-white/50 active:scale-90 transition-transform duration-100"><ChevronRight className="w-4 h-4" aria-hidden="true" /></button>
        </div>
      </div>
    </section>
  );
}
