import { createClient } from "@/lib/supabase/server";
import AboutEditor from "./AboutEditor";
import { translations } from "@/lib/translations";

export const dynamic = "force-dynamic";

export default async function AdminAboutPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("site_settings")
    .select("content")
    .eq("section", "about")
    .single();

  const defaults = {
    en: { ...translations.en.about },
    ar: { ...translations.ar.about },
  };
  const saved = (data?.content ?? {}) as Record<string, unknown>;
  const initial = { ...defaults, ...saved };

  return (
    <div className="p-8 max-w-3xl" dir="rtl">
      <div className="mb-8">
        <h1 className="text-white font-black text-2xl mb-1">عن د. حازم</h1>
        <p className="text-white/40 text-sm">السيرة الذاتية، الاقتباس، وعود الجودة</p>
      </div>
      <AboutEditor initial={initial} />
    </div>
  );
}
