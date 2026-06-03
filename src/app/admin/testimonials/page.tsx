import { createClient } from "@/lib/supabase/server";
import TestimonialsEditor from "./TestimonialsEditor";
import { translations } from "@/lib/translations";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("site_settings")
    .select("content")
    .eq("section", "testimonials")
    .single();

  const defaults = {
    en: translations.en.testimonials.items,
    ar: translations.ar.testimonials.items,
  };
  const saved = (data?.content ?? {}) as Record<string, unknown>;
  const initial = { ...defaults, ...saved };

  return (
    <div className="p-8 max-w-4xl" dir="rtl">
      <div className="mb-8">
        <h1 className="text-white font-black text-2xl mb-1">التقييمات</h1>
        <p className="text-white/40 text-sm">تعديل آراء العملاء</p>
      </div>
      <TestimonialsEditor initial={initial} />
    </div>
  );
}
