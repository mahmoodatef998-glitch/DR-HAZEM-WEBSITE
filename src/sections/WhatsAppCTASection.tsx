"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const WHATSAPP_NUMBER = "971500000000";

const contactItems = [
  { icon: Phone,   label: "WhatsApp / Phone", value: "+971 50 000 0000", href: `https://wa.me/${WHATSAPP_NUMBER}`, color: "text-green-400" },
  { icon: Mail,    label: "Email",             value: "info@drhazem.ae",   href: "mailto:info@drhazem.ae",         color: "text-sky-400"   },
  { icon: MapPin,  label: "Location",          value: "Dubai, UAE",        href: "#",                              color: "text-teal-400"  },
  { icon: Clock,   label: "Working Hours",     value: "Sun–Thu: 9AM–6PM",  href: "#",                              color: "text-amber-400" },
];

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const E = [0.22, 1, 0.36, 1] as const;

export default function WhatsAppCTASection() {
  return (
    <section id="contact" className="section-padding bg-slate-950 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/40 via-slate-950 to-sky-950/30" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#25D366]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: E }}
          className="relative bg-gradient-to-br from-[#25D366]/10 to-emerald-900/10 border border-[#25D366]/20 rounded-3xl p-10 md:p-14 text-center overflow-hidden mb-12"
        >
          {/* Background WhatsApp icon (decorative) */}
          <div className="absolute -right-8 -bottom-8 opacity-[0.04]">
            <WhatsAppIcon className="w-64 h-64" />
          </div>

          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5, ease: E }}
            className="inline-flex items-center gap-2 bg-[#25D366]/15 border border-[#25D366]/25 rounded-full px-4 py-1.5 text-xs font-black text-[#25D366] uppercase tracking-widest mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] inline-block animate-pulse" />
            We reply instantly
          </motion.span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
            Ready to Order?
            <br />
            <span className="bg-gradient-to-r from-[#25D366] to-teal-400 bg-clip-text text-transparent">
              Message Us Now
            </span>
          </h2>

          <p className="text-white/55 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Just send the <strong className="text-white/80">product name</strong> and{" "}
            <strong className="text-white/80">quantity</strong> — we'll confirm price,
            availability, and delivery time within minutes.
          </p>

          {/* Main WhatsApp button */}
          <motion.a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Dr. Hazem, I'd like to order a product.")}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-12 py-5 rounded-full bg-[#25D366] text-white font-black text-xl shadow-2xl shadow-[#25D366]/40 hover:shadow-[#25D366]/60 transition-shadow duration-300"
          >
            <WhatsAppIcon className="w-7 h-7" />
            Open WhatsApp Chat
          </motion.a>

          <p className="text-white/25 text-xs mt-4 font-medium">
            +971 50 000 0000 · Available Sun–Thu 9AM–8PM
          </p>
        </motion.div>

        {/* Contact info row */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={i}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: E }}
                className="flex items-start gap-3 p-5 bg-white/4 border border-white/8 rounded-2xl hover:bg-white/6 hover:border-white/14 transition-colors duration-300 group"
              >
                <div className={`w-9 h-9 rounded-xl bg-white/6 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-4 h-4 ${item.color}`} />
                </div>
                <div>
                  <p className="text-white/35 text-[10px] font-bold uppercase tracking-wider">{item.label}</p>
                  <p className="text-white/80 text-sm font-semibold mt-0.5">{item.value}</p>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
