"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Save, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import ImageUpload from "@/components/admin/ImageUpload";

interface HeroData {
  en: { line1: string; line2: string; line3: string; description: string; browseProducts: string; orderWhatsApp: string };
  ar: { line1: string; line2: string; line3: string; description: string; browseProducts: string; orderWhatsApp: string };
  backgroundImage?: string;
}

export default function HeroEditor({ initial }: { initial: HeroData }) {
  const [data, setData] = useState<HeroData>(initial);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const setField = (lang: "en" | "ar", key: keyof HeroData["en"], val: string) =>
    setData(prev => ({ ...prev, [lang]: { ...prev[lang], [key]: val } }));

  const handleSave = async () => {
    setSaving(true);
    const supabase = createClient();
    await supabase.from("site_settings").upsert({ section: "hero", content: data });
    setSaving(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2500);
  };

  const inputClass = "w-full bg-white/6 border border-white/12 rounded-xl px-3.5 py-2.5 text-white text-sm placeholder-white/25 focus:outline-none focus:border-sky-500 transition-colors duration-200";
  const labelClass = "text-white/55 text-xs font-semibold block mb-1.5";
  const sectionClass = "bg-white/3 border border-white/8 rounded-2xl p-5 space-y-4";

  const fields: { key: keyof HeroData["en"]; label: string; multiline?: boolean }[] = [
    { key: "line1",          label: "السطر الأول من العنوان"                 },
    { key: "line2",          label: "السطر الثاني (الكلمة المميزة بالألوان)" },
    { key: "line3",          label: "السطر الثالث من العنوان"               },
    { key: "description",    label: "الوصف",                     multiline: true },
    { key: "browseProducts", label: "نص زرار تصفح المنتجات"               },
    { key: "orderWhatsApp",  label: "نص زرار واتساب"                        },
  ];

  return (
    <div className="space-y-6">

      {/* ── Background Image ── */}
      <div className={sectionClass}>
        <h3 className="text-white/50 text-[11px] font-black uppercase tracking-widest">🖼️ صورة الخلفية</h3>
        <p className="text-white/35 text-xs">تُعرض خلف العنوان في الصفحة الرئيسية. مقاس مقترح: 1920×1080 بكسل.</p>
        <ImageUpload
          value={data.backgroundImage ?? ""}
          onChange={(url) => setData(prev => ({ ...prev, backgroundImage: url }))}
          folder="medix-hero"
        />
      </div>

      {/* English */}
      <div className={sectionClass}>
        <h3 className="text-white/50 text-[11px] font-black uppercase tracking-widest">🇬🇧 الإنجليزي</h3>
        {fields.map(({ key, label, multiline }) => (
          <div key={key}>
            <label className={labelClass}>{label}</label>
            {multiline ? (
              <textarea rows={3} value={data.en[key]} onChange={e => setField("en", key, e.target.value)} className={cn(inputClass, "resize-none")} dir="ltr" />
            ) : (
              <input value={data.en[key]} onChange={e => setField("en", key, e.target.value)} className={inputClass} dir="ltr" />
            )}
          </div>
        ))}
      </div>

      {/* Arabic */}
      <div className={sectionClass}>
        <h3 className="text-white/50 text-[11px] font-black uppercase tracking-widest">🇸🇦 العربي</h3>
        {fields.map(({ key, label, multiline }) => (
          <div key={key}>
            <label className={labelClass}>{label}</label>
            {multiline ? (
              <textarea rows={3} value={data.ar[key]} onChange={e => setField("ar", key, e.target.value)} className={cn(inputClass, "resize-none")} />
            ) : (
              <input value={data.ar[key]} onChange={e => setField("ar", key, e.target.value)} className={inputClass} />
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className={cn(
          "flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm transition-all duration-200",
          success ? "bg-emerald-500 text-white" : "bg-sky-500 hover:bg-sky-400 text-white disabled:opacity-60"
        )}
      >
        {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> جاري الحفظ...</>
          : success ? "✓ تم الحفظ!"
          : <><Save className="w-4 h-4" /> حفظ</>}
      </button>
    </div>
  );
}
