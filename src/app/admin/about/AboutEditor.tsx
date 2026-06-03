"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Save, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Translations } from "@/lib/translations";

type AboutData = { en: Translations["about"]; ar: Translations["about"] };

export default function AboutEditor({ initial }: { initial: AboutData }) {
  const [data, setData] = useState<AboutData>(initial);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const setField = (lang: "en" | "ar", key: keyof Translations["about"], val: string) =>
    setData(prev => ({ ...prev, [lang]: { ...prev[lang], [key]: val } }));

  const handleSave = async () => {
    setSaving(true);
    const supabase = createClient();
    await supabase.from("site_settings").upsert({ section: "about", content: data });
    setSaving(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2500);
  };

  const inputClass = "w-full bg-white/6 border border-white/12 rounded-xl px-3.5 py-2.5 text-white text-sm placeholder-white/25 focus:outline-none focus:border-sky-500 transition-colors duration-200";
  const labelClass = "text-white/55 text-xs font-semibold block mb-1.5";
  const sectionClass = "bg-white/3 border border-white/8 rounded-2xl p-5 space-y-4";

  const textFields: { key: keyof Translations["about"]; label: string; multiline?: boolean }[] = [
    { key: "title",        label: "العنوان الرئيسي" },
    { key: "titleHighlight", label: "الكلمة المميزة (gradient)" },
    { key: "description",  label: "الوصف",           multiline: true },
    { key: "profileName",  label: "اسم الشخصية"     },
    { key: "profileTitle", label: "المسمى الوظيفي"  },
    { key: "profileSub",   label: "وصف فرعي"        },
    { key: "bio",          label: "السيرة الذاتية",  multiline: true },
    { key: "quote",        label: "الاقتباس",        multiline: true },
    { key: "quoteAuthor",  label: "صاحب الاقتباس"   },
    { key: "promiseTitle", label: "عنوان وعود الجودة" },
    { key: "promiseSub",   label: "وصف وعود الجودة"  },
  ];

  return (
    <div className="space-y-6">
      {(["en", "ar"] as const).map(lang => (
        <div key={lang} className={sectionClass}>
          <h3 className="text-white/50 text-[11px] font-black uppercase tracking-widest">
            {lang === "en" ? "🇬🇧 الإنجليزي" : "🇸🇦 العربي"}
          </h3>
          {textFields.map(({ key, label, multiline }) => (
            <div key={key}>
              <label className={labelClass}>{label}</label>
              {multiline ? (
                <textarea rows={3} value={String(data[lang][key] ?? "")}
                  onChange={e => setField(lang, key, e.target.value)}
                  className={cn(inputClass, "resize-none")} dir={lang === "ar" ? "rtl" : "ltr"} />
              ) : (
                <input value={String(data[lang][key] ?? "")}
                  onChange={e => setField(lang, key, e.target.value)}
                  className={inputClass} dir={lang === "ar" ? "rtl" : "ltr"} />
              )}
            </div>
          ))}
        </div>
      ))}

      <button onClick={handleSave} disabled={saving}
        className={cn("flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm transition-all duration-200",
          success ? "bg-emerald-500 text-white" : "bg-sky-500 hover:bg-sky-400 text-white disabled:opacity-60")}>
        {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> جاري الحفظ...</>
          : success ? "✓ تم الحفظ!" : <><Save className="w-4 h-4" /> حفظ</>}
      </button>
    </div>
  );
}
