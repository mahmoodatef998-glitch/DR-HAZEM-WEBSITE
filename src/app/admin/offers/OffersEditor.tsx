"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Save, Loader2, Plus, Trash2, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProductRow } from "@/types/database";

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

interface Props {
  initialOffers: OfferItem[];
  products: Pick<ProductRow, "id" | "name" | "name_ar" | "image_url" | "price" | "original_price">[];
}

const inputClass =
  "w-full bg-white/6 border border-white/12 rounded-xl px-3.5 py-2.5 text-white text-sm placeholder-white/25 focus:outline-none focus:border-sky-500 transition-colors duration-200";
const labelClass = "text-white/55 text-xs font-semibold block mb-1.5";

const emptyForm = (): Omit<OfferItem, "id"> => ({
  productName: "",
  productNameAr: "",
  imageUrl: "",
  originalPrice: "",
  offerPrice: "",
  discountPct: 0,
  active: true,
});

function calcDiscount(original: string, offer: string) {
  const orig = parseFloat(original);
  const off = parseFloat(offer);
  if (orig > 0 && off > 0 && orig > off) {
    return Math.round(((orig - off) / orig) * 100);
  }
  return 0;
}

export default function OffersEditor({ initialOffers, products }: Props) {
  const [offers, setOffers] = useState<OfferItem[]>(initialOffers);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm());
  const [selectedProductId, setSelectedProductId] = useState("");

  const handleProductSelect = (productId: string) => {
    setSelectedProductId(productId);
    const p = products.find(p => p.id === productId);
    if (!p) return;
    setForm(prev => ({
      ...prev,
      productName: p.name,
      productNameAr: p.name_ar ?? "",
      imageUrl: p.image_url ?? "",
      originalPrice: p.original_price ?? p.price ?? "",
      offerPrice: p.price ?? "",
    }));
  };

  const handleFormChange = (key: keyof Omit<OfferItem, "id">, val: string | boolean) => {
    setForm(prev => {
      const next = { ...prev, [key]: val };
      if (key === "originalPrice" || key === "offerPrice") {
        next.discountPct = calcDiscount(
          key === "originalPrice" ? String(val) : prev.originalPrice,
          key === "offerPrice" ? String(val) : prev.offerPrice,
        );
      }
      return next;
    });
  };

  const handleAddOffer = () => {
    if (!form.productName.trim() || !form.offerPrice.trim()) return;
    const item: OfferItem = { ...form, id: Math.random().toString(36).slice(2, 10) };
    setOffers(prev => [...prev, item]);
    setForm(emptyForm());
    setSelectedProductId("");
    setShowForm(false);
  };

  const handleDelete = (id: string) => setOffers(prev => prev.filter(o => o.id !== id));

  const toggleActive = (id: string) =>
    setOffers(prev => prev.map(o => (o.id === id ? { ...o, active: !o.active } : o)));

  const handleSave = async () => {
    setSaving(true);
    const supabase = createClient();
    await supabase
      .from("site_settings")
      .upsert({ section: "offers", content: { items: offers } });
    setSaving(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* ── Offers list card ── */}
      <div className="bg-white/3 border border-white/8 rounded-2xl overflow-hidden divide-y divide-white/6">
        {/* Header */}
        <div className="p-4 flex items-center justify-between">
          <div>
            <h3 className="text-white font-bold text-sm">Offer Cards</h3>
            <p className="text-white/35 text-xs mt-0.5">
              {offers.length} offer{offers.length !== 1 ? "s" : ""} configured
            </p>
          </div>
          <button
            onClick={() => setShowForm(v => !v)}
            className="flex items-center gap-1.5 bg-sky-500/15 hover:bg-sky-500/25 text-sky-400 text-xs font-bold px-3.5 py-2 rounded-xl transition-colors duration-150"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Offer
          </button>
        </div>

        {/* ── Add form ── */}
        {showForm && (
          <div className="p-5 space-y-4 bg-white/[0.02]">
            <p className="text-white/50 text-[11px] font-black uppercase tracking-widest">
              New Offer
            </p>

            {/* Product picker */}
            <div>
              <label className={labelClass}>Auto-fill from product (optional)</label>
              <div className="relative">
                <select
                  value={selectedProductId}
                  onChange={e => handleProductSelect(e.target.value)}
                  className={cn(inputClass, "appearance-none pr-9 cursor-pointer")}
                >
                  <option value="">— Select product —</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Product Name (EN)</label>
                <input
                  value={form.productName}
                  onChange={e => handleFormChange("productName", e.target.value)}
                  placeholder="e.g. OmegaCore Forte"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Product Name (AR)</label>
                <input
                  value={form.productNameAr}
                  onChange={e => handleFormChange("productNameAr", e.target.value)}
                  placeholder="e.g. أوميغاكور فورتي"
                  dir="rtl"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Original Price (AED)</label>
                <input
                  type="number"
                  min="0"
                  value={form.originalPrice}
                  onChange={e => handleFormChange("originalPrice", e.target.value)}
                  placeholder="250"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Offer Price (AED)</label>
                <input
                  type="number"
                  min="0"
                  value={form.offerPrice}
                  onChange={e => handleFormChange("offerPrice", e.target.value)}
                  placeholder="185"
                  className={inputClass}
                />
              </div>
            </div>

            {form.discountPct > 0 && (
              <p className="text-emerald-400 text-xs font-bold">
                ✓ Discount: {form.discountPct}% off (auto-calculated)
              </p>
            )}

            <div>
              <label className={labelClass}>Image URL (optional override)</label>
              <input
                value={form.imageUrl}
                onChange={e => handleFormChange("imageUrl", e.target.value)}
                placeholder="https://res.cloudinary.com/..."
                className={inputClass}
              />
            </div>

            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={handleAddOffer}
                disabled={!form.productName.trim() || !form.offerPrice.trim()}
                className="flex items-center gap-2 bg-sky-500 hover:bg-sky-400 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors duration-150"
              >
                <Plus className="w-4 h-4" />
                Add to List
              </button>
              <button
                onClick={() => {
                  setShowForm(false);
                  setForm(emptyForm());
                  setSelectedProductId("");
                }}
                className="text-white/40 hover:text-white/70 text-sm px-4 py-2.5 rounded-xl hover:bg-white/5 transition-colors duration-150"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* ── Empty state ── */}
        {offers.length === 0 && !showForm && (
          <div className="p-10 text-center text-white/20 text-sm">
            No offers yet — add your first offer above.
          </div>
        )}

        {/* ── Offer rows ── */}
        {offers.map(offer => (
          <div key={offer.id} className="p-4 flex items-center gap-4">
            {/* Thumbnail */}
            <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-white/5 flex items-center justify-center">
              {offer.imageUrl ? (
                <img
                  src={offer.imageUrl}
                  alt={offer.productName}
                  className="w-full h-full object-contain p-1"
                />
              ) : (
                <span className="text-xl">💊</span>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm truncate">{offer.productName}</p>
              {offer.productNameAr && (
                <p className="text-white/35 text-xs font-cairo mt-0.5 truncate" dir="rtl">
                  {offer.productNameAr}
                </p>
              )}
              <div className="flex items-center gap-2 mt-1">
                <span className="text-white/25 text-xs line-through">
                  {offer.originalPrice} AED
                </span>
                <span className="text-red-400 text-xs font-bold">{offer.offerPrice} AED</span>
                {offer.discountPct > 0 && (
                  <span className="bg-red-500/15 text-red-400 text-[10px] font-bold px-1.5 py-0.5 rounded">
                    -{offer.discountPct}%
                  </span>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => toggleActive(offer.id)}
                className={cn(
                  "text-xs font-bold px-3 py-1.5 rounded-lg transition-colors duration-150",
                  offer.active
                    ? "bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25"
                    : "bg-white/5 text-white/30 hover:bg-white/10 hover:text-white/50",
                )}
              >
                {offer.active ? "Live" : "Hidden"}
              </button>
              <button
                onClick={() => handleDelete(offer.id)}
                className="p-2 rounded-xl text-white/25 hover:text-rose-400 hover:bg-rose-500/10 transition-colors duration-150"
                title="Delete offer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── Save button ── */}
      <button
        onClick={handleSave}
        disabled={saving}
        className={cn(
          "flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200",
          success
            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
            : "bg-sky-500 hover:bg-sky-400 disabled:opacity-60 text-white",
        )}
      >
        {saving ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : success ? (
          <Check className="w-4 h-4" />
        ) : (
          <Save className="w-4 h-4" />
        )}
        {saving ? "Saving…" : success ? "Saved!" : "Save Offers"}
      </button>
    </div>
  );
}
