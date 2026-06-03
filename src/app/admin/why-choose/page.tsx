import { createClient } from "@/lib/supabase/server";
import WhyChooseEditor from "./WhyChooseEditor";
import { translations } from "@/lib/translations";

export const dynamic = "force-dynamic";

export default async function AdminWhyChoosePage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("site_settings")
    .select("content")
    .eq("section", "why_choose")
    .single();

  const defaults = {
    en: translations.en.whyChoose.reasons,
    ar: translations.ar.whyChoose.reasons,
  };
  const saved = (data?.content ?? {}) as Record<string, unknown>;
  const initial = { ...defaults, ...saved };

  return (
    <div className="p-8 max-w-4xl" dir="rtl">
      <div className="mb-8">
        <h1 className="text-white font-black text-2xl mb-1">لماذا نحن</h1>
        <p className="text-white/40 text-sm">تعديل أسباب اختيار Medix Healthcare</p>
      </div>
      <WhyChooseEditor initial={initial} />
    </div>
  );
}
