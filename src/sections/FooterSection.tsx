"use client";

import { Phone, Mail, MapPin, ArrowUp, Heart, Settings } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const socialLinks = [
  { label: "LinkedIn", href: "#", icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.27c-.97 0-1.75-.79-1.75-1.76s.78-1.74 1.75-1.74 1.75.78 1.75 1.74-.78 1.76-1.75 1.76zm13.5 12.27h-3v-5.6c0-3.37-4-3.11-4 0v5.6h-3v-11h3v1.77c1.39-2.59 7-2.78 7 2.47v6.76z"/></svg> },
  { label: "Instagram", href: "#", icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
  { label: "Facebook", href: "#", icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
  { label: "WhatsApp", href: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "971585335516"}`, icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> },
];

export default function FooterSection() {
  const { t, isRTL } = useTranslation();
  const f = t.footer;

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollTo = (href: string) => {
    if (href === "#") return;
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const cols = [f.columns.quickLinks, f.columns.products, f.columns.info];

  return (
    <footer className="bg-slate-900 relative overflow-hidden" aria-label="Site footer">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand column */}
          <div className={cn("lg:col-span-1 space-y-6", isRTL && "text-right")}>
            <div className={cn("flex items-center gap-3", isRTL && "flex-row-reverse")}>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-teal-500 flex items-center justify-center shadow-lg shadow-sky-500/30">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3" y="10" width="18" height="4" rx="2" fill="white" opacity="0.9"/>
                  <rect x="10" y="3" width="4" height="18" rx="2" fill="white" opacity="0.9"/>
                </svg>
              </div>
              <div>
                <span className="font-bold text-xl text-white block leading-none">Medix Healthcare</span>
                <span className="text-sky-400 text-xs font-medium">{f.tagline}</span>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed">{f.description}</p>

            {/* Contacts */}
            <div className="space-y-3">
              <a href="tel:+971585335516" className={cn("flex items-center gap-2 text-slate-400 hover:text-sky-400 transition-colors duration-200 text-sm group", isRTL && "flex-row-reverse")}>
                <Phone className="w-4 h-4 text-sky-500 group-hover:scale-110 transition-transform flex-shrink-0" aria-hidden="true" />
                +971 58 533 5516
              </a>
              <a href="mailto:info@drhazem.ae" className={cn("flex items-center gap-2 text-slate-400 hover:text-sky-400 transition-colors duration-200 text-sm group", isRTL && "flex-row-reverse")}>
                <Mail className="w-4 h-4 text-sky-500 group-hover:scale-110 transition-transform flex-shrink-0" aria-hidden="true" />
                info@drhazem.ae
              </a>
              <div className={cn("flex items-start gap-2 text-slate-400 text-sm", isRTL && "flex-row-reverse")}>
                <MapPin className="w-4 h-4 text-sky-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>{isRTL ? "دبي، الإمارات العربية المتحدة" : "Dubai, United Arab Emirates"}</span>
              </div>
            </div>

            {/* Social */}
            <div className={cn("flex gap-3", isRTL && "flex-row-reverse")}>
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label} target={s.href.startsWith("http") ? "_blank" : undefined} rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-sky-500/20 border border-white/10 hover:border-sky-500/30 flex items-center justify-center text-slate-400 hover:text-sky-400 transition-[background-color,border-color,color] duration-300">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.title} className={isRTL ? "text-right" : ""}>
              <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-wider">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <button onClick={() => scrollTo(link.href)}
                      className={cn("text-slate-400 hover:text-sky-400 text-sm transition-all duration-200 inline-block", isRTL ? "hover:-translate-x-1" : "hover:translate-x-1")}>
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className={cn("border-t border-white/5 py-6 flex flex-col sm:flex-row items-center justify-between gap-4", isRTL && "sm:flex-row-reverse")}>
          <p className="text-slate-500 text-sm flex items-center gap-1.5">
            © {new Date().getFullYear()} {f.copyright}
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 mx-1" aria-hidden="true" />
            {f.madeIn}
          </p>
          <div className={cn("flex items-center gap-3", isRTL && "flex-row-reverse")}>
            <span className="text-slate-600 text-xs">{f.dha}</span>
            {/* Admin dashboard link — subtle, only visible on hover */}
            <Link
              href="/admin"
              aria-label="Admin dashboard"
              className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-800 hover:text-slate-400 hover:bg-white/5 transition-all duration-300 opacity-30 hover:opacity-100"
            >
              <Settings className="w-3.5 h-3.5" />
            </Link>
            <button onClick={scrollToTop} aria-label="Scroll to top"
              className="w-9 h-9 rounded-xl bg-sky-500/20 hover:bg-sky-500/40 border border-sky-500/20 flex items-center justify-center text-sky-400 hover:text-sky-300 transition-all duration-300 hover:-translate-y-1 group">
              <ArrowUp className="w-4 h-4 group-hover:scale-110 transition-transform" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
