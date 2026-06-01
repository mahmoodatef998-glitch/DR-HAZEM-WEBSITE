"use client";

import { Award, BookOpen, GraduationCap, Star, CheckCircle2, ArrowRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";

const credentials = [
  {
    icon: GraduationCap,
    title: "Medical Education",
    items: [
      "MD – Cairo University School of Medicine",
      "Specialist Residency – Royal College of Physicians",
      "Fellowship – Johns Hopkins Medical Center",
    ],
    color: "sky",
  },
  {
    icon: Award,
    title: "Certifications",
    items: [
      "DHA Licensed Specialist – Dubai Health Authority",
      "Board Certified – Arab Board of Medical Specializations",
      "ISO Certified Practice Management",
    ],
    color: "teal",
  },
  {
    icon: BookOpen,
    title: "Research & Publications",
    items: [
      "20+ peer-reviewed medical publications",
      "Speaker at 15+ International Medical Conferences",
      "Contributing editor — Gulf Medical Journal",
    ],
    color: "indigo",
  },
];

const achievementStats = [
  { value: "15+", label: "Years of Excellence", sub: "In specialized practice" },
  { value: "12K+", label: "Patients Treated", sub: "Across UAE & MENA" },
  { value: "98%", label: "Satisfaction Rate", sub: "Verified patient reviews" },
  { value: "50+", label: "Awards & Honors", sub: "Regional & international" },
];

export default function AboutSection() {
  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="about" className="section-padding bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-sky-50/80 to-transparent pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-teal-50 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader
          badge="About Dr. Hazem"
          title="A Dedication to "
          highlight="Medical Excellence"
          description="Combining world-class training with compassionate care, Dr. Hazem has built a reputation as one of the UAE's most trusted medical specialists."
        />

        {/* Main content */}
        <div className="mt-16 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Bio + Photo */}
          <div className="space-y-8">
            {/* Profile card */}
            <div className="relative bg-gradient-to-br from-slate-900 to-sky-950 rounded-3xl p-8 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl" />
              <div className="relative flex gap-6 items-start">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-sky-400 to-teal-500 flex items-center justify-center shadow-xl shadow-sky-500/30">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="8" r="4" fill="white" opacity="0.9"/>
                      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="white" opacity="0.9"/>
                    </svg>
                  </div>
                  <div className="mt-3 flex items-center justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                {/* Info */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white">Dr. Hazem</h3>
                  <p className="text-sky-400 font-semibold text-sm mt-0.5">Medical Specialist & Senior Consultant</p>
                  <p className="text-white/50 text-sm mt-0.5">Dubai, United Arab Emirates</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="bg-sky-500/20 text-sky-300 text-xs px-3 py-1 rounded-full border border-sky-500/30">DHA Licensed</span>
                    <span className="bg-teal-500/20 text-teal-300 text-xs px-3 py-1 rounded-full border border-teal-500/30">Board Certified</span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="relative text-white/70 text-sm leading-relaxed mt-6">
                With over 15 years of specialist practice, Dr. Hazem is renowned for his patient-centered approach,
                diagnostic precision, and commitment to staying at the forefront of medical innovation. He has trained
                at some of the world's most prestigious institutions and brings international expertise to every consultation.
              </p>

              {/* Quote */}
              <div className="relative mt-6 pl-4 border-l-2 border-sky-500">
                <p className="text-white/80 text-sm italic">
                  "My mission is simple: to provide every patient with the highest quality care, treating them
                  with the dignity and attention they deserve."
                </p>
                <p className="text-sky-400 text-xs font-semibold mt-1">— Dr. Hazem</p>
              </div>
            </div>

            {/* CTA */}
            <Button
              variant="primary"
              size="lg"
              onClick={() => scrollToSection("#appointment")}
              className="group"
            >
              Schedule a Consultation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Right — Credentials + Stats */}
          <div className="space-y-6">
            {/* Credentials */}
            {credentials.map((cred, i) => {
              const Icon = cred.icon;
              const colorMap: Record<string, string> = {
                sky: "bg-sky-100 text-sky-600",
                teal: "bg-teal-100 text-teal-600",
                indigo: "bg-indigo-100 text-indigo-600",
              };
              const borderMap: Record<string, string> = {
                sky: "border-sky-100 hover:border-sky-200",
                teal: "border-teal-100 hover:border-teal-200",
                indigo: "border-indigo-100 hover:border-indigo-200",
              };
              return (
                <div
                  key={i}
                  className={`bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group ${borderMap[cred.color]}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[cred.color]}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-slate-800">{cred.title}</h4>
                  </div>
                  <ul className="space-y-2">
                    {cred.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Achievement Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {achievementStats.map((stat, i) => (
            <div
              key={i}
              className="text-center p-6 bg-gradient-to-br from-sky-50 to-teal-50 rounded-2xl border border-sky-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="text-4xl font-black bg-gradient-to-r from-sky-600 to-teal-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-slate-800 font-semibold text-sm mt-2">{stat.label}</div>
              <div className="text-slate-500 text-xs mt-1">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
