"use client";

import { useState, useEffect } from "react";
import { Phone, MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

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
        <a
          href="tel:+971500000000"
          className="flex items-center gap-3 bg-white text-slate-800 px-5 py-3 rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 text-sm font-semibold whitespace-nowrap"
        >
          <div className="w-8 h-8 rounded-xl bg-sky-100 flex items-center justify-center">
            <Phone className="w-4 h-4 text-sky-600" />
          </div>
          Call Now
        </a>
        <button
          onClick={() => {
            const el = document.querySelector("#appointment");
            if (el) el.scrollIntoView({ behavior: "smooth" });
            setExpanded(false);
          }}
          className="flex items-center gap-3 bg-white text-slate-800 px-5 py-3 rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 text-sm font-semibold whitespace-nowrap"
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
        className={cn(
          "w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300",
          expanded
            ? "bg-slate-700 hover:bg-slate-600 shadow-slate-400/30 rotate-45"
            : "bg-gradient-to-br from-sky-500 to-teal-500 hover:shadow-sky-500/40 hover:scale-110 shadow-sky-500/30"
        )}
        aria-label="Contact options"
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
