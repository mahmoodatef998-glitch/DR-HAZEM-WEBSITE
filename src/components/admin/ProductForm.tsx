"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import ImageUpload from "./ImageUpload";
import { Loader2, Plus, X, Save } from "lucide-react";
import type { ProductRow } from "@/types/database";
import { cn } from "@/lib/utils";

type FormData = Omit<ProductRow, "id" | "created_at" | "updated_at">;

const CATEGORIES = ["Cardiology", "Dermatology", "Supplements", "Orthopedics", "Immunology", "Pediatrics"];
const GRADIENTS = [
  "from-rose-500 to-red-600", "from-sky-500 to-blue-600", "from-teal-400 to-green-500",
  "from-violet-500 to-purple-600", "from-amber-400 to-orange-500", "from-pink-400 to-rose-500",
  "from-emerald-500 to-teal-600", "from-indigo-500 to-violet-600", "from-cyan-500 to-sky-600",
  "from-yellow-400 to-amber-500", "from-red-500 to-rose-700", "from-green-500 to-emerald-700",
];
const EMOJIS = ["💊","🫀","🦴","✨","⚡","🛡️","👶","🦿","💓","🏋️","💎","🧬","🌿","🍊","⭐","🔬","🧘","💉"];

const DEFAULT: FormData = {
  name: "", name_ar: "", brand: "", origin: "ES", category: "Supplements",
  price: "", original_price: null, description: "", description_ar: "",
  features: [""], features_ar: [],
  badge: null, badge_color: null, rating: 4.9, reviews: 0,
  icon: "💊", gradient: "from-sky-500 to-blue-600",
  popular: false, discount: null, image_url: null, sort_order: 0, active: true,
};

interface ProductFormProps {
  initialData?: ProductRow;
}

export default function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const [data, setData] = useState<FormData>(
    initialData
      ? { ...initialData }
      : DEFAULT
  );
  const [saving, setSaving]   = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError]     = useState("");

  const set = <K extends keyof FormData>(key: K, val: FormData[K]) =>
    setData(prev => ({ ...prev, [key]: val }));

  /* Features helpers */
  const setFeature = (i: number, val: string, ar = false) => {
    const arr = ar ? [...(data.features_ar ?? [])] : [...data.features];
    arr[i] = val;
    ar ? set("features_ar", arr) : set("features", arr);
  };
  const addFeature = (ar = false) => {
    ar ? set("features_ar", [...(data.features_ar ?? []), ""])
       : set("features", [...data.features, ""]);
  };
  const removeFeature = (i: number, ar = false) => {
    ar ? set("features_ar", (data.features_ar ?? []).filter((_, j) => j !== i))
       : set("features", data.features.filter((_, j) => j !== i));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);

    const supabase = createClient();
    // Clean up empty features
    const cleanData = {
      ...data,
      features: data.features.filter(f => f.trim()),
      features_ar: (data.features_ar ?? []).filter(f => f.trim()),
      price: data.price.trim(),
      discount: data.discount ?? null,
      original_price: data.original_price || null,
      badge: data.badge || null,
      image_url: data.image_url || null,
    };

    let err;
    if (initialData) {
      const { error: e } = await supabase.from("products").update(cleanData).eq("id", initialData.id);
      err = e;
    } else {
      const { error: e } = await supabase.from("products").insert(cleanData);
      err = e;
    }

    setSaving(false);
    if (err) { setError("حدث خطأ: " + err.message); return; }

    setSuccess(true);
    setTimeout(() => setSuccess(false), 2500);
    if (!initialData) router.push("/admin/products");
    else router.refresh();
  };

  /* ── Field helpers ── */
  const labelClass = "text-white/60 text-xs font-semibold block mb-1.5";
  const inputClass = "w-full bg-white/6 border border-white/12 rounded-xl px-3.5 py-2.5 text-white text-sm placeholder-white/25 focus:outline-none focus:border-sky-500 transition-colors duration-200";
  const sectionClass = "bg-white/3 border border-white/8 rounded-2xl p-5 space-y-4";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl" dir="rtl">

      {/* ── Basic Info ── */}
      <div className={sectionClass}>
        <h3 className="text-white/50 text-[11px] font-black uppercase tracking-widest">معلومات أساسية</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>اسم المنتج (إنجليزي) *</label>
            <input value={data.name} onChange={e => set("name", e.target.value)} required
              placeholder="OmegaCore Forte 1000mg" className={inputClass} dir="ltr" />
          </div>
          <div>
            <label className={labelClass}>اسم المنتج (عربي)</label>
            <input value={data.name_ar ?? ""} onChange={e => set("name_ar", e.target.value)}
              placeholder="أوميجاكور فورتي" className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>الشركة المصنّعة *</label>
            <input value={data.brand} onChange={e => set("brand", e.target.value)} required
              placeholder="Ferrer Internacional" className={inputClass} dir="ltr" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>البلد</label>
              <select value={data.origin} onChange={e => set("origin", e.target.value as "ES" | "IT")} className={inputClass}>
                <option value="ES">🇪🇸 إسبانيا</option>
                <option value="IT">🇮🇹 إيطاليا</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>التصنيف</label>
              <select value={data.category} onChange={e => set("category", e.target.value)} className={inputClass}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div>
          <label className={labelClass}>الوصف (إنجليزي)</label>
          <textarea rows={2} value={data.description ?? ""} onChange={e => set("description", e.target.value)}
            placeholder="Ultra-pure Omega-3 fatty acids..." className={cn(inputClass, "resize-none")} dir="ltr" />
        </div>
        <div>
          <label className={labelClass}>الوصف (عربي)</label>
          <textarea rows={2} value={data.description_ar ?? ""} onChange={e => set("description_ar", e.target.value)}
            placeholder="أحماض أوميجا 3 فائقة النقاء..." className={cn(inputClass, "resize-none")} />
        </div>
      </div>

      {/* ── Pricing ── */}
      <div className={sectionClass}>
        <h3 className="text-white/50 text-[11px] font-black uppercase tracking-widest">السعر</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>السعر الحالي *</label>
            <input value={data.price} onChange={e => set("price", e.target.value)} required
              placeholder="AED 189" className={inputClass} dir="ltr" />
          </div>
          <div>
            <label className={labelClass}>السعر الأصلي (قبل الخصم)</label>
            <input value={data.original_price ?? ""} onChange={e => set("original_price", e.target.value || null)}
              placeholder="AED 229" className={inputClass} dir="ltr" />
          </div>
          <div>
            <label className={labelClass}>نسبة الخصم %</label>
            <input type="number" min={0} max={99} value={data.discount ?? ""}
              onChange={e => set("discount", e.target.value ? Number(e.target.value) : null)}
              placeholder="19" className={inputClass} dir="ltr" />
          </div>
        </div>
      </div>

      {/* ── Features ── */}
      <div className={sectionClass}>
        <h3 className="text-white/50 text-[11px] font-black uppercase tracking-widest">المميزات (إنجليزي)</h3>
        {data.features.map((f, i) => (
          <div key={i} className="flex gap-2">
            <input value={f} onChange={e => setFeature(i, e.target.value)}
              placeholder={`ميزة ${i + 1}`} className={cn(inputClass, "flex-1")} dir="ltr" />
            <button type="button" onClick={() => removeFeature(i)} className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center flex-shrink-0 hover:bg-rose-500/20 transition-colors">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addFeature()} className="flex items-center gap-2 text-sky-400 text-xs font-bold hover:text-sky-300 transition-colors">
          <Plus className="w-3.5 h-3.5" /> إضافة ميزة
        </button>
      </div>

      <div className={sectionClass}>
        <h3 className="text-white/50 text-[11px] font-black uppercase tracking-widest">المميزات (عربي)</h3>
        {(data.features_ar ?? []).map((f, i) => (
          <div key={i} className="flex gap-2">
            <input value={f} onChange={e => setFeature(i, e.target.value, true)}
              placeholder={`ميزة ${i + 1}`} className={cn(inputClass, "flex-1")} />
            <button type="button" onClick={() => removeFeature(i, true)} className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center flex-shrink-0 hover:bg-rose-500/20 transition-colors">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addFeature(true)} className="flex items-center gap-2 text-sky-400 text-xs font-bold hover:text-sky-300 transition-colors">
          <Plus className="w-3.5 h-3.5" /> إضافة ميزة عربية
        </button>
      </div>

      {/* ── Appearance ── */}
      <div className={sectionClass}>
        <h3 className="text-white/50 text-[11px] font-black uppercase tracking-widest">المظهر</h3>

        {/* Badge */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Badge (مثل: Best Seller)</label>
            <input value={data.badge ?? ""} onChange={e => set("badge", e.target.value || null)}
              placeholder="Best Seller" className={inputClass} dir="ltr" />
          </div>
          <div>
            <label className={labelClass}>التقييم</label>
            <input type="number" min={1} max={5} step={0.1} value={data.rating}
              onChange={e => set("rating", Number(e.target.value))}
              className={inputClass} dir="ltr" />
          </div>
        </div>

        {/* Emoji icon */}
        <div>
          <label className={labelClass}>أيقونة المنتج</label>
          <div className="flex flex-wrap gap-2">
            {EMOJIS.map(e => (
              <button key={e} type="button" onClick={() => set("icon", e)}
                className={cn("w-10 h-10 rounded-xl text-xl flex items-center justify-center border transition-all duration-150",
                  data.icon === e
                    ? "bg-sky-500/20 border-sky-500/40 scale-110"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                )}>
                {e}
              </button>
            ))}
          </div>
        </div>

        {/* Gradient */}
        <div>
          <label className={labelClass}>لون التدرج</label>
          <div className="flex flex-wrap gap-2">
            {GRADIENTS.map(g => (
              <button key={g} type="button" onClick={() => set("gradient", g)}
                className={cn(`w-10 h-10 rounded-xl bg-gradient-to-br border-2 transition-all duration-150 ${g}`,
                  data.gradient === g ? "border-white scale-110" : "border-transparent"
                )} />
            ))}
          </div>
        </div>

        {/* Flags */}
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={data.popular} onChange={e => set("popular", e.target.checked)}
              className="w-4 h-4 rounded accent-sky-500" />
            <span className="text-white/70 text-sm">منتج رائج 🔥</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={data.active} onChange={e => set("active", e.target.checked)}
              className="w-4 h-4 rounded accent-emerald-500" />
            <span className="text-white/70 text-sm">نشط (يظهر على الموقع)</span>
          </label>
        </div>
      </div>

      {/* ── Product Image ── */}
      <div className={sectionClass}>
        <h3 className="text-white/50 text-[11px] font-black uppercase tracking-widest">صورة المنتج</h3>
        <ImageUpload
          value={data.image_url ?? ""}
          onChange={url => set("image_url", url || null)}
          folder="products"
        />
      </div>

      {/* ── Submit ── */}
      {error && (
        <p className="text-rose-400 text-sm bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-3">{error}</p>
      )}

      <button
        type="submit"
        disabled={saving}
        className={cn(
          "flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm transition-all duration-200",
          success
            ? "bg-emerald-500 text-white"
            : "bg-sky-500 hover:bg-sky-400 text-white disabled:opacity-60"
        )}
      >
        {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> جاري الحفظ...</>
          : success ? "✓ تم الحفظ!"
          : <><Save className="w-4 h-4" /> {initialData ? "حفظ التعديلات" : "إضافة المنتج"}</>}
      </button>
    </form>
  );
}
