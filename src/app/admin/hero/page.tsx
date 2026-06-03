import { createClient } from "@/lib/supabase/server";
import HeroEditor from "./HeroEditor";
import { translations } from "@/lib/translations";

export const dynamic = "force-dynamic";

export default async function AdminHeroPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("site_settings")
    .select("content")
    .eq("section", "hero")
    .single();

  // Merge DB values on top of default translations
  const defaults = { en: translations.en.hero, ar: translations.ar.hero };
  const saved = (data?.content ?? {}) as Record<string, unknown>;
  const initial = { ...defaults, ...saved };

  return (
    <div className="p-8 max-w-3xl" dir="rtl">
      <div className="mb-8">
        <h1 className="text-white font-black text-2xl mb-1">الصفحة الرئيسية (Hero)</h1>
        <p className="text-white/40 text-sm">تعديل العنوان والوصف والأزرار</p>
      </div>
      <HeroEditor initial={initial} />
    </div>
  );
}
