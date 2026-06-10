"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Package, Image, Phone, User,
  MessageSquare, Star, LogOut, ChevronRight, ExternalLink, Tag,
} from "lucide-react";
import MedixWordmark from "@/components/ui/MedixWordmark";

const NAV = [
  { href: "/admin",             label: "Dashboard",       icon: LayoutDashboard },
  { href: "/admin/products",    label: "Products",        icon: Package         },
  { href: "/admin/hero",        label: "Hero Section",    icon: Image           },
  { href: "/admin/about",       label: "About",           icon: User            },
  { href: "/admin/contact",     label: "Contact Info",    icon: Phone           },
  { href: "/admin/offers",       label: "Offers",          icon: Tag             },
  { href: "/admin/testimonials",label: "Testimonials",    icon: Star            },
  { href: "/admin/why-choose",  label: "Why Choose Us",   icon: MessageSquare   },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router   = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/"); // → back to main site
    router.refresh();
  };

  return (
    <aside className="w-60 min-h-screen bg-slate-900 border-r border-white/8 flex flex-col flex-shrink-0">

      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/8">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 bg-white shadow-lg">
            <img src="/logo.png" alt="Medix Healthcare" className="w-full h-full object-contain" />
          </div>
          <div>
            <MedixWordmark size="sm" variant="light" showTagline={false} />
            <p className="text-sky-400 text-[10px] mt-0.5 font-medium">Admin Panel</p>
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
              <Icon className={cn("w-4 h-4 flex-shrink-0", active ? "text-sky-400" : "text-white/35 group-hover:text-white/60")} />
              <span className="flex-1">{label}</span>
              {active && <ChevronRight className="w-3 h-3 text-sky-400/60" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="px-3 pb-5 space-y-1 border-t border-white/8 pt-4">
        {/* View site */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-white/70 hover:bg-white/5 transition-all duration-150 group"
        >
          <ExternalLink className="w-4 h-4 flex-shrink-0 group-hover:text-white/60" />
          <span>View Website</span>
        </a>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-150 group"
        >
          <LogOut className="w-4 h-4 flex-shrink-0 group-hover:text-rose-400" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
