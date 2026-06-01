"use client";

import { Phone, Mail, MapPin, ArrowUp, Heart } from "lucide-react";

const footerLinks = {
  "Quick Links": [
    { label: "Home", href: "#home" },
    { label: "About Dr. Hazem", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Patient Testimonials", href: "#testimonials" },
    { label: "Book Appointment", href: "#appointment" },
  ],
  "Services": [
    { label: "Preventive Care", href: "#services" },
    { label: "Specialist Consultation", href: "#services" },
    { label: "Chronic Disease Management", href: "#services" },
    { label: "Advanced Diagnostics", href: "#services" },
    { label: "Urgent Consultations", href: "#services" },
  ],
  "Information": [
    { label: "Patient Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Insurance Partners", href: "#" },
    { label: "Medical Records", href: "#" },
    { label: "DHA Compliance", href: "#" },
  ],
};

const socialLinks = [
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.27c-.97 0-1.75-.79-1.75-1.76s.78-1.74 1.75-1.74 1.75.78 1.75 1.74-.78 1.76-1.75 1.76zm13.5 12.27h-3v-5.6c0-3.37-4-3.11-4 0v5.6h-3v-11h3v1.77c1.39-2.59 7-2.78 7 2.47v6.76z"/>
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "#",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
];

export default function FooterSection() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleNavClick = (href: string) => {
    if (href === "#") return;
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-teal-500 flex items-center justify-center shadow-lg shadow-sky-500/30">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="white" opacity="0.3"/>
                  <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7z" fill="white"/>
                </svg>
              </div>
              <div>
                <span className="font-bold text-xl text-white block leading-none">Dr. Hazem</span>
                <span className="text-sky-400 text-xs font-medium">Medical Specialist</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Providing world-class specialist healthcare in Dubai, UAE. Compassionate care backed by international expertise.
            </p>
            {/* Contact quick links */}
            <div className="space-y-3">
              <a href="tel:+971500000000" className="flex items-center gap-2 text-slate-400 hover:text-sky-400 transition-colors duration-200 text-sm group">
                <Phone className="w-4 h-4 text-sky-500 group-hover:scale-110 transition-transform" />
                +971 50 000 0000
              </a>
              <a href="mailto:info@drhazem.ae" className="flex items-center gap-2 text-slate-400 hover:text-sky-400 transition-colors duration-200 text-sm group">
                <Mail className="w-4 h-4 text-sky-500 group-hover:scale-110 transition-transform" />
                info@drhazem.ae
              </a>
              <div className="flex items-start gap-2 text-slate-400 text-sm">
                <MapPin className="w-4 h-4 text-sky-500 flex-shrink-0 mt-0.5" />
                <span>Dubai Healthcare City, Dubai, UAE</span>
              </div>
            </div>
            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-sky-500/20 border border-white/10 hover:border-sky-500/30 flex items-center justify-center text-slate-400 hover:text-sky-400 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-wider">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="text-slate-400 hover:text-sky-400 text-sm transition-colors duration-200 hover:translate-x-1 inline-block transition-transform"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm flex items-center gap-1.5">
            © {new Date().getFullYear()} Dr. Hazem. All rights reserved. Made with
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            in Dubai, UAE
          </p>
          <div className="flex items-center gap-4">
            <span className="text-slate-600 text-xs">DHA License: XXXXX</span>
            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-xl bg-sky-500/20 hover:bg-sky-500/40 border border-sky-500/20 flex items-center justify-center text-sky-400 hover:text-sky-300 transition-all duration-300 hover:-translate-y-1 group"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
