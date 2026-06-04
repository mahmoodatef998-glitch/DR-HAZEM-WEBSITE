import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Package, Image, Phone, User, MessageSquare, Star, ArrowRight } from "lucide-react";

const SECTIONS = [
  { href: "/admin/products",    label: "Products",        icon: Package,       color: "from-sky-500 to-blue-600",      desc: "Add, edit and delete products, prices, images and categories" },
  { href: "/admin/hero",        label: "Hero Section",    icon: Image,         color: "from-teal-500 to-emerald-600",  desc: "Main headline, description, background and CTA buttons" },
  { href: "/admin/about",       label: "About",           icon: User,          color: "from-violet-500 to-purple-600", desc: "Dr. Hazem biography, quotes and quality guarantees" },
  { href: "/admin/contact",     label: "Contact Info",    icon: Phone,         color: "from-amber-500 to-orange-600",  desc: "WhatsApp number, email, working hours and DHA license" },
  { href: "/admin/testimonials",label: "Testimonials",    icon: Star,          color: "from-rose-500 to-pink-600",     desc: "Add and edit customer reviews" },
  { href: "/admin/why-choose",  label: "Why Choose Us",   icon: MessageSquare, color: "from-indigo-500 to-blue-700",   desc: "Edit the 6 reasons to choose Medix Healthcare" },
];

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { count } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true })
    .eq("active", true);

  return (
    <div className="p-8 max-w-5xl">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-white font-black text-2xl mb-1">Dashboard</h1>
        <p className="text-white/40 text-sm">Manage your Medix Healthcare website content</p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <div className="bg-sky-500/10 border border-sky-500/20 rounded-2xl p-5">
          <p className="text-sky-400 font-black text-3xl">{count ?? 0}</p>
          <p className="text-white/50 text-sm mt-1">Active Products</p>
        </div>
        <div className="bg-teal-500/10 border border-teal-500/20 rounded-2xl p-5">
          <p className="text-teal-400 font-black text-3xl">6</p>
          <p className="text-white/50 text-sm mt-1">Editable Sections</p>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5 col-span-2">
          <p className="text-emerald-400 font-black text-lg">AR + EN</p>
          <p className="text-white/50 text-sm mt-1">Bilingual content support</p>
        </div>
      </div>

      {/* Section cards */}
      <p className="text-white/40 text-xs font-black uppercase tracking-widest mb-4">Sections</p>
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
              <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors duration-200" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm mb-1">{label}</h3>
              <p className="text-white/35 text-xs leading-relaxed">{desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
