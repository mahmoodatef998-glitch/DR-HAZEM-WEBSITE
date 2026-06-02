"use client";

import { useState } from "react";
import {
  Heart, Brain, Activity, Eye, Microscope, Stethoscope, ArrowRight, CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";

const services = [
  {
    icon: Heart,
    title: "Preventive Care",
    description:
      "Comprehensive health screenings and personalized prevention plans to keep you ahead of potential health issues.",
    features: ["Full health assessment", "Risk factor analysis", "Lifestyle planning"],
    color: "rose",
    gradient: "from-rose-500 to-pink-600",
    lightBg: "bg-rose-50",
    lightIcon: "text-rose-500",
    lightBorder: "border-rose-100",
  },
  {
    icon: Brain,
    title: "Specialist Consultation",
    description:
      "In-depth expert consultations backed by advanced diagnostics and years of specialized clinical experience.",
    features: ["Detailed examination", "Advanced diagnostics", "Treatment planning"],
    color: "sky",
    gradient: "from-sky-500 to-blue-600",
    lightBg: "bg-sky-50",
    lightIcon: "text-sky-500",
    lightBorder: "border-sky-100",
    featured: true,
  },
  {
    icon: Activity,
    title: "Chronic Disease Management",
    description:
      "Long-term care strategies for chronic conditions, focused on improving quality of life and minimizing complications.",
    features: ["Continuous monitoring", "Medication management", "Lifestyle coaching"],
    color: "violet",
    gradient: "from-violet-500 to-purple-600",
    lightBg: "bg-violet-50",
    lightIcon: "text-violet-500",
    lightBorder: "border-violet-100",
  },
  {
    icon: Microscope,
    title: "Advanced Diagnostics",
    description:
      "State-of-the-art diagnostic testing including labs, imaging, and specialized assessments for accurate diagnoses.",
    features: ["Lab & imaging analysis", "Rapid reporting", "Second opinions"],
    color: "teal",
    gradient: "from-teal-500 to-emerald-600",
    lightBg: "bg-teal-50",
    lightIcon: "text-teal-500",
    lightBorder: "border-teal-100",
  },
  {
    icon: Eye,
    title: "Follow-up & Monitoring",
    description:
      "Structured follow-up programs ensuring treatment effectiveness and ongoing patient health optimization.",
    features: ["Progress tracking", "Plan adjustments", "Regular check-ins"],
    color: "amber",
    gradient: "from-amber-500 to-orange-600",
    lightBg: "bg-amber-50",
    lightIcon: "text-amber-500",
    lightBorder: "border-amber-100",
  },
  {
    icon: Stethoscope,
    title: "Urgent Consultations",
    description:
      "Priority consultations for acute health concerns with same-day availability for urgent medical needs.",
    features: ["Same-day availability", "Rapid assessment", "Emergency referrals"],
    color: "indigo",
    gradient: "from-indigo-500 to-blue-700",
    lightBg: "bg-indigo-50",
    lightIcon: "text-indigo-500",
    lightBorder: "border-indigo-100",
  },
];

export default function ServicesSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const scrollToAppointment = () => {
    const el = document.querySelector("#appointment");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="section-padding bg-slate-50 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-sky-500 via-teal-500 to-sky-500" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-sky-100 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-100 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Medical Services"
          title="Comprehensive Care "
          highlight="Tailored for You"
          description="From preventive care to specialized treatment, Dr. Hazem offers a full spectrum of medical services designed around your unique health needs."
        />

        {/* Services Grid — staggered whileInView */}
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            const isHovered = hoveredIdx === i;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: (i % 3) * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`group relative bg-white rounded-3xl p-7 border-2 transition-all duration-400 cursor-default
                  ${service.featured
                    ? "border-sky-200 shadow-xl shadow-sky-100/50 ring-2 ring-sky-500/20"
                    : isHovered
                    ? `border-transparent shadow-xl -translate-y-2`
                    : "border-transparent shadow-sm hover:shadow-lg"
                  }`}
              >
                {/* Featured badge */}
                {service.featured && (
                  <div className="absolute -top-3 left-6">
                    <span className="bg-gradient-to-r from-sky-500 to-teal-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-sky-500/30">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-400`} />

                {/* Icon */}
                <div
                  className={`relative w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300
                    ${isHovered
                      ? `bg-gradient-to-br ${service.gradient} shadow-lg`
                      : `${service.lightBg}`
                    }`}
                >
                  <Icon
                    className={`w-7 h-7 transition-colors duration-300 ${
                      isHovered ? "text-white" : service.lightIcon
                    }`}
                  />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-sky-700 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feat, j) => (
                    <li key={j} className="flex items-center gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={scrollToAppointment}
                  className={`flex items-center gap-1.5 text-sm font-semibold transition-all duration-300
                    ${isHovered ? service.lightIcon : "text-slate-400"}
                    group-hover:gap-2.5`}
                >
                  Book This Service
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 text-center"
        >
          <p className="text-slate-500 text-sm mb-4">
            Not sure which service you need?{" "}
            <span className="font-semibold text-sky-600">
              Start with a general consultation.
            </span>
          </p>
          <Button variant="primary" size="lg" onClick={scrollToAppointment} className="group">
            Request Your Appointment
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
