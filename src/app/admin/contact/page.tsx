import { createClient } from "@/lib/supabase/server";
import ContactEditor from "./ContactEditor";
import { translations } from "@/lib/translations";

export const dynamic = "force-dynamic";

export default async function AdminContactPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("site_settings")
    .select("content")
    .eq("section", "contact")
    .single();

  const defaults = {
    whatsapp: "971500000000",
    email: "info@drhazem.ae",
    location_en: "Dubai, UAE",
    location_ar: "دبي، الإمارات",
    hours_en: "Sun–Thu: 9AM–6PM",
    hours_ar: "الأحد–الخميس: 9ص–6م",
    dha_license: "XXXXX",
  };

  const saved = (data?.content ?? {}) as Record<string, unknown>;
  const initial = { ...defaults, ...saved } as typeof defaults;

  return (
    <div className="p-8 max-w-2xl" dir="rtl">
      <div className="mb-8">
        <h1 className="text-white font-black text-2xl mb-1">بيانات التواصل</h1>
        <p className="text-white/40 text-sm">رقم واتساب، الإيميل، ساعات العمل</p>
      </div>
      <ContactEditor initial={initial} />
    </div>
  );
}
