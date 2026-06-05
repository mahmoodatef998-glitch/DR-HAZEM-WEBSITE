"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Save, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Data = {
  whatsapp: string; email: string;
  location_en: string; location_ar: string;
  hours_en: string; hours_ar: string;
  dha_license: string;
};

export default function ContactEditor({ initial }: { initial: Data }) {
  const [data, setData] = useState<Data>(initial);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = <K extends keyof Data>(k: K, v: string) => setData(p => ({ ...p, [k]: v }));

  const handleSave = async () => {
    setSaving(true);
    const supabase = createClient();
    await supabase.from("site_settings").upsert({ section: "contact", content: data });
    setSaving(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2500);
  };

  const inputClass = "w-full bg-white/6 border border-white/12 rounded-xl px-3.5 py-2.5 text-white text-sm placeholder-white/25 focus:outline-none focus:border-sky-500 transition-colors duration-200";
  const labelClass = "text-white/55 text-xs font-semibold block mb-1.5";

  return (
    <div className="space-y-5 bg-white/3 border border-white/8 rounded-2xl p-6">
      <div>
        <label className={labelClass}>رقم واتساب (بدون +)</label>
        <input value={data.whatsapp} onChange={e => set("whatsapp", e.target.value)}
          placeholder="971501234567" className={inputClass} dir="ltr" />
        <p className="text-white/30 text-xs mt-1">مثال: 971501234567 (بدون + أو مسافات)</p>
      </div>
      <div>
        <label className={labelClass}>البريد الإلكتروني</label>
        <input type="email" value={data.email} onChange={e => set("email", e.target.value)}
          placeholder="hazem@medixhealthcare.co" className={inputClass} dir="ltr" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>الموقع (إنجليزي)</label>
          <input value={data.location_en} onChange={e => set("location_en", e.target.value)}
            className={inputClass} dir="ltr" />
        </div>
        <div>
          <label className={labelClass}>الموقع (عربي)</label>
          <input value={data.location_ar} onChange={e => set("location_ar", e.target.value)}
            className={inputClass} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>ساعات العمل (إنجليزي)</label>
          <input value={data.hours_en} onChange={e => set("hours_en", e.target.value)}
            className={inputClass} dir="ltr" />
        </div>
        <div>
          <label className={labelClass}>ساعات العمل (عربي)</label>
          <input value={data.hours_ar} onChange={e => set("hours_ar", e.target.value)}
            className={inputClass} />
        </div>
      </div>
      <div>
        <label className={labelClass}>رقم ترخيص DHA</label>
        <input value={data.dha_license} onChange={e => set("dha_license", e.target.value)}
          placeholder="XXXXX" className={inputClass} dir="ltr" />
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
