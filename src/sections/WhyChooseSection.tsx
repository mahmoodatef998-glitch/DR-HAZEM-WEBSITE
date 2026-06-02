"use client";

import {
  ShieldCheck,
  Microscope,
  Clock,
  HeartHandshake,
  Globe2,
  Zap,
  ArrowRight,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Internationally Trained",
    description:
      "Fellowship-trained at world-renowned institutions including Johns Hopkins, bringing global best practices to every patient.",
    gradient: "from-sky-500 to-blue-600",
    lightBg: "bg-sky-50",
    lightText: "text-sky-600",
  },
  {
    icon: Microscope,
    title: "Evidence-Based Medicine",
    description:
      "Every treatment decision is grounded in the latest clinical research and medical literature for optimal outcomes.",
    gradient: "from-teal-500 to-emerald-600",
    lightBg: "bg-teal-50",
    lightText: "text-teal-600",
  },
  {
    icon: Clock,
    title: "Prompt & Accessible",
    description:
      "Same-day appointments available for urgent cases. Minimal wait times and flexible scheduling for your convenience.",
    gradient: "from-violet-500 to-purple-600",
    lightBg: "bg-violet-50",
    lightText: "text-violet-600",
  },
  {
    icon: HeartHandshake,
    title: "Patient-Centered Approach",
    description:
      "Your voice matters. Dr. Hazem listens thoroughly, explains clearly, and involves you in every decision about your health.",
    gradient: "from-rose-500 to-pink-600",
    lightBg: "bg-rose-50",
    lightText: "text-rose-600",
  },
  {
    icon: Globe2,
    title: "Multilingual Care",
    description:
      "Consultations available in English and Arabic, ensuring every patient fully understands their diagnosis and treatment plan.",
    gradient: "from-amber-500 to-orange-600",
    lightBg: "bg-amber-50",
    lightText: "text-amber-600",
  },
  {
    icon: Zap,
    title: "Advanced Technology",
    description:
      "Equipped with state-of-the-art diagnostic tools and digital health records for faster, more accurate medical care.",
    gradient: "from-indigo-500 to-blue-700",
    lightBg: "bg-indigo-50",
    lightText: "text-indigo-600",
  },
];

export default function WhyChooseSection() {
  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="why-choose" className="section-padding relative overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-sky-950 to-teal-950" />
      <div className="absolute inset-0 medical-pattern opacity-[0.03]" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 via-teal-400 to-sky-500" />

      {/* Orbs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Why Dr. Hazem"
          title="What Sets Us "
          highlight="Apart"
          description="Choosing the right doctor is one of the most important decisions you'll make. Here's why thousands of patients across the UAE trust Dr. Hazem."
          className="[&_h2]:text-white [&_p]:text-white/60"
        />

        {/* Reasons Grid */}
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <div
                key={i}
                className="group relative bg-white/5 backdrop-blur-sm rounded-3xl p-7 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-[400ms]"
              >
                {/* Gradient accent */}
                <div className={`absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl bg-gradient-to-r ${reason.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-[400ms]`} />

                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${reason.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-sky-300 transition-colors duration-300">
                  {reason.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA banner */}
        <div className="mt-16 relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-teal-500/10 rounded-3xl" />
          <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-sky-500/20 rounded-full blur-3xl" />

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Ready to experience the difference?
              </h3>
              <p className="text-white/60 text-lg">
                Join over 12,000 patients who chose excellence.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <Button
                variant="primary"
                size="lg"
                onClick={() => scrollToSection("#appointment")}
                className="group"
              >
                Book Your Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection("#services")}
              >
                View Services
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
