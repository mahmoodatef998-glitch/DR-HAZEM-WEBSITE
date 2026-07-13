"use client";

import { useState, useEffect } from "react";
import { Phone, MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "971585335516";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello Admin, I'd like to inquire about your products."
);

const WhatsAppIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-8 right-6 z-50 flex flex-col items-end gap-3 transition-all duration-500",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
      )}
    >
      {/* Expanded options */}
      <div
        className={cn(
          "flex flex-col gap-2 transition-all duration-300",
          expanded ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        )}
      >
        {/* WhatsApp — primary CTA for UAE market */}
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-[#25D366] text-white px-5 py-3 rounded-2xl shadow-xl shadow-[#25D366]/30 hover:shadow-2xl hover:shadow-[#25D366]/40 hover:-translate-y-0.5 transition-[transform,box-shadow] duration-300 text-sm font-semibold whitespace-nowrap"
        >
          <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
            <WhatsAppIcon />
          </div>
          WhatsApp Us
        </a>

        {/* Phone call */}
        <a
          href="tel:+971585335516"
          className="flex items-center gap-3 bg-white text-slate-800 px-5 py-3 rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 hover:shadow-2xl hover:-translate-y-0.5 transition-[transform,box-shadow] duration-300 text-sm font-semibold whitespace-nowrap"
        >
          <div className="w-8 h-8 rounded-xl bg-sky-100 flex items-center justify-center">
            <Phone className="w-4 h-4 text-sky-600" />
          </div>
          Call Now
        </a>

        {/* Book appointment */}
        <button
          onClick={() => {
            const el = document.querySelector("#appointment");
            if (el) el.scrollIntoView({ behavior: "smooth" });
            setExpanded(false);
          }}
          className="flex items-center gap-3 bg-white text-slate-800 px-5 py-3 rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 hover:shadow-2xl hover:-translate-y-0.5 transition-[transform,box-shadow] duration-300 text-sm font-semibold whitespace-nowrap"
        >
          <div className="w-8 h-8 rounded-xl bg-teal-100 flex items-center justify-center">
            <MessageCircle className="w-4 h-4 text-teal-600" />
          </div>
          Book Appointment
        </button>
      </div>

      {/* Main FAB button */}
      <button
        onClick={() => setExpanded(!expanded)}
        aria-label={expanded ? "Close contact options" : "Open contact options"}
        aria-expanded={expanded}
        className={cn(
          "w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300",
          expanded
            ? "bg-slate-700 hover:bg-slate-600 shadow-slate-400/30 rotate-45"
            : "bg-gradient-to-br from-sky-500 to-teal-500 hover:shadow-sky-500/40 hover:scale-110 shadow-sky-500/30"
        )}
      >
        {expanded ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Phone className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  );
}
