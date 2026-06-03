"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Package, Image, Phone, User,
  MessageSquare, Star, LogOut, ChevronRight,
} from "lucide-react";

const NAV = [
  { href: "/admin",            label: "الرئيسية",        icon: LayoutDashboard },
  { href: "/admin/products",   label: "المنتجات",         icon: Package         },
  { href: "/admin/hero",       label: "الصفحة الرئيسية",  icon: Image           },
  { href: "/admin/about",      label: "عن د. حازم",       icon: User            },
  { href: "/admin/contact",    label: "بيانات التواصل",   icon: Phone           },
  { href: "/admin/testimonials",label: "التقييمات",        icon: Star            },
  { href: "/admin/why-choose", label: "لماذا نحن",        icon: MessageSquare   },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router   = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside
      className="w-64 min-h-screen bg-slate-900 border-l border-white/8 flex flex-col"
      dir="rtl"
    >
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-teal-500 flex items-center justify-center shadow-lg shadow-sky-500/20 flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="10" width="18" height="4" rx="2" fill="white" opacity="0.9"/>
              <rect x="10" y="3" width="4" height="18" rx="2" fill="white" opacity="0.9"/>
            </svg>
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-none">Medix Healthcare</p>
            <p className="text-sky-400 text-[10px] mt-0.5">لوحة التحكم</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5" aria-label="Admin navigation">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group",
                active
                  ? "bg-sky-500/15 text-sky-400 border border-sky-500/20"
                  : "text-white/50 hover:text-white/80 hover:bg-white/5"
              )}
            >
              <Icon className={cn("w-4 h-4 flex-shrink-0", active ? "text-sky-400" : "text-white/40 group-hover:text-white/60")} />
              <span className="flex-1">{label}</span>
              {active && <ChevronRight className="w-3 h-3 text-sky-400/60" />}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-6 border-t border-white/8 pt-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-150 group"
        >
          <LogOut className="w-4 h-4 flex-shrink-0 group-hover:text-rose-400" />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  );
}
