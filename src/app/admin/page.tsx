import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Package, Image, Phone, User, Star, MessageSquare, ArrowLeft } from "lucide-react";

const SECTIONS = [
  { href: "/admin/products",    label: "المنتجات",         icon: Package,       color: "from-sky-500 to-blue-600",     desc: "إضافة وتعديل وحذف المنتجات وأسعارها وصورها" },
  { href: "/admin/hero",        label: "الصفحة الرئيسية",  icon: Image,         color: "from-teal-500 to-emerald-600", desc: "عنوان الموقع، الوصف، صورة الخلفية، أزرار CTA" },
  { href: "/admin/about",       label: "عن د. حازم",       icon: User,          color: "from-violet-500 to-purple-600", desc: "السيرة الذاتية، الاقتباسات، الإحصائيات" },
  { href: "/admin/contact",     label: "بيانات التواصل",   icon: Phone,         color: "from-amber-500 to-orange-600", desc: "رقم واتساب، الإيميل، ساعات العمل" },
  { href: "/admin/testimonials",label: "التقييمات",         icon: Star,          color: "from-rose-500 to-pink-600",   desc: "إضافة وتعديل آراء العملاء" },
  { href: "/admin/why-choose",  label: "لماذا نحن",        icon: MessageSquare, color: "from-indigo-500 to-blue-700",  desc: "أسباب اختيار Medix Healthcare" },
];

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { count } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true })
    .eq("active", true);

  return (
    <div className="p-8 max-w-5xl" dir="rtl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-white font-black text-2xl mb-1">لوحة التحكم</h1>
        <p className="text-white/40 text-sm">إدارة محتوى موقع Medix Healthcare</p>
      </div>

      {/* Quick stat */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <div className="bg-sky-500/10 border border-sky-500/20 rounded-2xl p-5">
          <p className="text-sky-400 font-black text-3xl">{count ?? 0}</p>
          <p className="text-white/50 text-sm mt-1">منتج نشط</p>
        </div>
        <div className="bg-teal-500/10 border border-teal-500/20 rounded-2xl p-5">
          <p className="text-teal-400 font-black text-3xl">6</p>
          <p className="text-white/50 text-sm mt-1">أقسام قابلة للتعديل</p>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5 col-span-2">
          <p className="text-emerald-400 font-black text-lg leading-snug">AR + EN</p>
          <p className="text-white/50 text-sm mt-1">دعم اللغتين عربي وإنجليزي</p>
        </div>
      </div>

      {/* Section cards */}
      <h2 className="text-white/60 text-xs font-black uppercase tracking-widest mb-4">الأقسام</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SECTIONS.map(({ href, label, icon: Icon, color, desc }) => (
          <Link
            key={href}
            href={href}
            className="group bg-white/4 border border-white/8 hover:bg-white/7 hover:border-white/15 rounded-2xl p-6 transition-all duration-200 flex flex-col gap-4"
          >
            <div className="flex items-start justify-between">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <ArrowLeft className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors duration-200" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm mb-1">{label}</h3>
              <p className="text-white/35 text-xs leading-relaxed">{desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* View site link */}
      <div className="mt-10 pt-6 border-t border-white/8">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 text-sm font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4 rotate-180" />
          عرض الموقع
        </a>
      </div>
    </div>
  );
}
