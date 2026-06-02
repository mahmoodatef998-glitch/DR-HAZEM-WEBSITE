"use client";

import { motion } from "framer-motion";
import { Search, MessageCircle, PackageCheck, ArrowRight } from "lucide-react";

const WHATSAPP_NUMBER = "971500000000";
const WHATSAPP_MSG = encodeURIComponent("Hello Dr. Hazem, I'd like to place an order.");

const steps = [
  {
    step: "01",
    icon: Search,
    title: "Browse Products",
    description: "Explore our full catalogue of certified European pharmaceuticals imported directly from Spain and Italy.",
    color: "from-sky-500 to-blue-600",
    glow: "bg-sky-500/20",
  },
  {
    step: "02",
    icon: MessageCircle,
    title: "Send via WhatsApp",
    description: "Message us the product name and quantity. We'll confirm availability and pricing instantly.",
    color: "from-[#25D366] to-emerald-600",
    glow: "bg-emerald-500/20",
  },
  {
    step: "03",
    icon: PackageCheck,
    title: "Fast Delivery",
    description: "Your order is packed and shipped directly to your door anywhere in Dubai, Abu Dhabi, and across the UAE.",
    color: "from-teal-500 to-cyan-600",
    glow: "bg-teal-500/20",
  },
];

const E = [0.22, 1, 0.36, 1] as const;

export default function HowToOrderSection() {
  return (
    <section id="how-to-order" className="section-padding bg-slate-950 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 medical-pattern opacity-[0.02]" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: E }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 rounded-full px-4 py-1.5 text-xs font-black text-sky-400 uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 inline-block" />
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            How to{" "}
            <span className="bg-gradient-to-r from-sky-400 to-teal-400 bg-clip-text text-transparent">
              Order
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Ordering is simple — browse, message, receive. No complicated forms.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-px bg-gradient-to-r from-sky-500/40 to-teal-500/40 z-0" />

          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: E }}
                className="relative z-10 flex flex-col items-center text-center p-8 bg-white/4 border border-white/8 rounded-3xl hover:bg-white/6 hover:border-white/14 transition-colors duration-300 group"
              >
                {/* Step number */}
                <div className="absolute -top-4 left-8 bg-slate-950 border border-white/10 rounded-full px-3 py-0.5">
                  <span className="text-white/30 text-xs font-black tracking-widest">{s.step}</span>
                </div>

                {/* Icon */}
                <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                  <div className={`absolute inset-0 rounded-2xl ${s.glow} blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  <Icon className="w-9 h-9 text-white relative z-10" />
                </div>

                <h3 className="text-white font-bold text-xl mb-3">{s.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{s.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.4, ease: E }}
          className="mt-14 text-center"
        >
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-[#25D366] text-white font-bold text-lg shadow-xl shadow-[#25D366]/30 hover:shadow-[#25D366]/50 hover:-translate-y-1 transition-[transform,box-shadow] duration-300"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Start Your Order Now
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
