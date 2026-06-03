"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Save, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Translations } from "@/lib/translations";

type Reason = Translations["whyChoose"]["reasons"][number];
type Data = { en: Reason[]; ar: Reason[] };

export default function WhyChooseEditor({ initial }: { initial: Data }) {
  const [data, setData]   = useState<Data>(initial);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<"en" | "ar">("en");

  const setField = (lang: "en" | "ar", idx: number, key: keyof Reason, val: string) => {
    const arr = [...data[lang]];
    arr[idx] = { ...arr[idx], [key]: val };
    setData(prev => ({ ...prev, [lang]: arr }));
  };

  const handleSave = async () => {
    setSaving(true);
    const supabase = createClient();
    await supabase.from("site_settings").upsert({ section: "why_choose", content: data });
    setSaving(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2500);
  };

  const inputClass = "w-full bg-white/6 border border-white/12 rounded-xl px-3.5 py-2.5 text-white text-sm placeholder-white/25 focus:outline-none focus:border-sky-500 transition-colors duration-200";
  const labelClass = "text-white/45 text-[10px] font-bold block mb-1";

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {(["en", "ar"] as const).map(lang => (
          <button key={lang} onClick={() => setActiveTab(lang)}
            className={cn("px-5 py-2 rounded-xl text-sm font-bold transition-all duration-150",
              activeTab === lang ? "bg-sky-500/20 text-sky-400 border border-sky-500/30"
                : "text-white/40 hover:text-white/60 bg-white/5")}>
            {lang === "en" ? "🇬🇧 English" : "🇸🇦 العربي"}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {data[activeTab].map((reason, idx) => (
          <div key={idx} className="bg-white/3 border border-white/8 rounded-2xl p-5 space-y-3">
            <span className="text-white/30 text-xs font-black">#{idx + 1}</span>
            <div><label className={labelClass}>العنوان</label>
              <input value={reason.title} onChange={e => setField(activeTab, idx, "title", e.target.value)}
                className={inputClass} dir={activeTab === "ar" ? "rtl" : "ltr"} /></div>
            <div><label className={labelClass}>الوصف</label>
              <textarea rows={3} value={reason.description}
                onChange={e => setField(activeTab, idx, "description", e.target.value)}
                className={cn(inputClass, "resize-none")} dir={activeTab === "ar" ? "rtl" : "ltr"} /></div>
          </div>
        ))}
      </div>

      <button onClick={handleSave} disabled={saving}
        className={cn("flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm transition-all duration-200",
          success ? "bg-emerald-500 text-white" : "bg-sky-500 hover:bg-sky-400 text-white disabled:opacity-60")}>
        {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> جاري الحفظ...</>
          : success ? "✓ تم الحفظ!" : <><Save className="w-4 h-4" /> حفظ</>}
      </button>
    </div>
  );
}
