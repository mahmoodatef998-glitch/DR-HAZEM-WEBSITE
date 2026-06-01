"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Star,
  Clock,
  ArrowRight,
  Flame,
  Tag,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { products, CATEGORIES, type ProductCategory } from "@/data/products";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";

/* ─── animation variants ─────────────────────────────── */
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.96,
    transition: { duration: 0.25, ease: "easeIn" as const },
  },
};

const tabVariants = {
  inactive: { scale: 1, backgroundColor: "transparent" },
  active: { scale: 1.04 },
};

/* ─── badge color map ────────────────────────────────── */
const badgeStyles: Record<string, string> = {
  sky: "bg-sky-500 text-white",
  teal: "bg-teal-500 text-white",
  violet: "bg-violet-500 text-white",
  rose: "bg-rose-500 text-white",
  amber: "bg-amber-500 text-white",
  emerald: "bg-emerald-500 text-white",
};

const ITEMS_PER_PAGE = 8;

/* ─── ProductCard ────────────────────────────────────── */
function ProductCard({ product }: { product: (typeof products)[0] }) {
  const [hovered, setHovered] = useState(false);

  const scrollToAppointment = () => {
    const el = document.querySelector("#appointment");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      variants={cardVariants}
      layout
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm flex flex-col"
      style={{
        boxShadow: hovered
          ? "0 20px 60px -12px rgba(14,165,233,0.18), 0 4px 20px -4px rgba(0,0,0,0.06)"
          : "0 1px 8px rgba(0,0,0,0.05)",
        transform: hovered ? "translateY(-6px)" : "translateY(0px)",
        transition: "box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {/* Top gradient band */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${product.gradient}`} />

      {/* Card Header */}
      <div className="relative px-6 pt-6 pb-4">
        {/* Discount badge */}
        {product.discount && (
          <motion.div
            initial={{ scale: 0, rotate: -15 }}
            animate={{ scale: 1, rotate: -12 }}
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex flex-col items-center justify-center shadow-lg shadow-rose-400/40 z-10"
          >
            <span className="text-white text-[10px] font-black leading-none">
              -{product.discount}%
            </span>
          </motion.div>
        )}

        {/* Popular glow */}
        {product.popular && (
          <div className="absolute inset-0 bg-gradient-to-br from-sky-50/80 to-transparent pointer-events-none" />
        )}

        <div className="flex items-start gap-4">
          {/* Icon */}
          <div
            className={`relative flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${product.gradient} flex items-center justify-center text-2xl shadow-lg transition-transform duration-400`}
            style={{ transform: hovered ? "scale(1.1) rotate(6deg)" : "scale(1) rotate(0deg)" }}
          >
            {product.icon}
            {product.popular && (
              <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center">
                <Flame className="w-3 h-3 text-white" />
              </div>
            )}
          </div>

          {/* Name + badge */}
          <div className="flex-1 min-w-0">
            {product.badge && (
              <span
                className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-1.5 ${
                  badgeStyles[product.badgeColor ?? "sky"]
                }`}
              >
                {product.badge}
              </span>
            )}
            <h3 className="text-slate-900 font-bold text-base leading-tight line-clamp-2 group-hover:text-sky-700 transition-colors duration-300">
              {product.name}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-500 text-sm leading-relaxed mt-3 line-clamp-2">
          {product.description}
        </p>
      </div>

      {/* Features */}
      <div className="px-6 pb-4 flex-1">
        <ul className="space-y-1.5">
          {product.features.slice(0, 4).map((feat, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-2 text-xs text-slate-600"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
              {feat}
            </motion.li>
          ))}
          {product.features.length > 4 && (
            <li className="text-xs text-sky-500 font-medium pl-5">
              +{product.features.length - 4} more included
            </li>
          )}
        </ul>
      </div>

      {/* Divider */}
      <div className="mx-6 h-px bg-slate-100" />

      {/* Footer */}
      <div className="px-6 py-4 flex items-center justify-between gap-3">
        {/* Rating + duration */}
        <div className="space-y-1">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.round(product.rating)
                    ? "fill-amber-400 text-amber-400"
                    : "fill-slate-200 text-slate-200"
                }`}
              />
            ))}
            <span className="text-slate-500 text-xs ml-1">
              {product.rating} ({product.reviews})
            </span>
          </div>
          <div className="flex items-center gap-1 text-slate-400 text-xs">
            <Clock className="w-3 h-3" />
            {product.duration}
          </div>
        </div>

        {/* Price */}
        <div className="text-right">
          {product.originalPrice && (
            <div className="text-slate-400 text-xs line-through">{product.originalPrice}</div>
          )}
          <div
            className={`font-black text-lg bg-gradient-to-r ${product.gradient} bg-clip-text text-transparent`}
          >
            {product.price}
          </div>
        </div>
      </div>

      {/* CTA — slides up on hover */}
      <div
        className="overflow-hidden transition-all duration-400 ease-out"
        style={{ maxHeight: hovered ? "60px" : "0px" }}
      >
        <div className="px-6 pb-5">
          <button
            onClick={scrollToAppointment}
            className={`w-full py-2.5 rounded-xl bg-gradient-to-r ${product.gradient} text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg hover:opacity-90 active:scale-95 transition-all duration-200 group/btn`}
          >
            Book This Service
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Section ───────────────────────────────────── */
export default function ProductsSection() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCategory = (cat: ProductCategory) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const scrollToTop = () =>
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const scrollToAppointment = () => {
    const el = document.querySelector("#appointment");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  /* category counts */
  const getCategoryCount = (cat: ProductCategory) =>
    cat === "All" ? products.length : products.filter((p) => p.category === cat).length;

  return (
    <section
      id="products"
      ref={sectionRef}
      className="section-padding bg-gradient-to-b from-slate-50 to-white relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 medical-pattern opacity-[0.025] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 via-teal-400 to-violet-500" />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute -top-32 -right-32 w-96 h-96 bg-sky-100/70 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        className="absolute -bottom-32 -left-32 w-80 h-80 bg-teal-100/70 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <SectionHeader
            badge="Health Services & Packages"
            title="Invest in Your "
            highlight="Health Today"
            description="Explore our 20 carefully designed medical packages and services — from preventive care to specialist treatment, all delivered with world-class expertise."
          />
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 flex flex-wrap justify-center gap-6 md:gap-12"
        >
          {[
            { label: "Services Available", value: "20" },
            { label: "Categories", value: "5" },
            { label: "Happy Patients", value: "12K+" },
            { label: "Avg. Rating", value: "4.9★" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-black bg-gradient-to-r from-sky-600 to-teal-600 bg-clip-text text-transparent">
                {s.value}
              </div>
              <div className="text-slate-500 text-xs font-medium mt-0.5">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap justify-center gap-2"
        >
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => handleCategory(cat)}
              variants={tabVariants}
              animate={activeCategory === cat ? "active" : "inactive"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2
                ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-sky-500 to-teal-500 text-white shadow-lg shadow-sky-400/30"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-sky-300 hover:text-sky-600 shadow-sm"
                }`}
            >
              {cat}
              <span
                className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-black
                  ${activeCategory === cat ? "bg-white/30 text-white" : "bg-slate-100 text-slate-500"}`}
              >
                {getCategoryCount(cat)}
              </span>
              {activeCategory === cat && (
                <motion.span
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-500 to-teal-500 -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Results count */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 flex items-center justify-between"
        >
          <p className="text-slate-500 text-sm">
            Showing{" "}
            <span className="font-bold text-slate-800">
              {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
              {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}
            </span>{" "}
            of <span className="font-bold text-slate-800">{filtered.length}</span> services
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Updated June 2025
          </div>
        </motion.div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${currentPage}`}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {paginated.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-10 flex items-center justify-center gap-3"
          >
            <button
              onClick={() => {
                setCurrentPage((p) => Math.max(1, p - 1));
                scrollToTop();
              }}
              disabled={currentPage === 1}
              className="w-10 h-10 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-500 hover:border-sky-400 hover:text-sky-600 hover:bg-sky-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => {
                  setCurrentPage(page);
                  scrollToTop();
                }}
                className={`w-10 h-10 rounded-full text-sm font-bold transition-all duration-300 ${
                  currentPage === page
                    ? "bg-gradient-to-r from-sky-500 to-teal-500 text-white shadow-md shadow-sky-400/30 scale-110"
                    : "border-2 border-slate-200 text-slate-500 hover:border-sky-300 hover:text-sky-600"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => {
                setCurrentPage((p) => Math.min(totalPages, p + 1));
                scrollToTop();
              }}
              disabled={currentPage === totalPages}
              className="w-10 h-10 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-500 hover:border-sky-400 hover:text-sky-600 hover:bg-sky-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* Bottom CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-16 relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-sky-950 to-teal-950" />
          <div className="absolute inset-0 medical-pattern opacity-[0.04]" />

          {/* Floating orbs */}
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-sky-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-teal-500/20 rounded-full blur-3xl" />

          <div className="relative px-8 md:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-5">
              {/* Icon */}
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-teal-500 flex items-center justify-center text-2xl shadow-xl shadow-sky-500/30">
                <Tag className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sky-400 text-sm font-semibold uppercase tracking-wider mb-1">
                  Need help choosing?
                </p>
                <h3 className="text-white text-xl md:text-2xl font-bold">
                  Not sure which package is right for you?
                </h3>
                <p className="text-white/60 text-sm mt-1">
                  Book a free 15-minute discovery call with Dr. Hazem's team.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Button
                variant="primary"
                size="lg"
                onClick={scrollToAppointment}
                className="group whitespace-nowrap"
              >
                Get Free Advice
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  const el = document.querySelector("#services");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="whitespace-nowrap"
              >
                View All Services
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
