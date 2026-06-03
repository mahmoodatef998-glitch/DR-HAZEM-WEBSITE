"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Button from "./ui/Button";
import { useTranslation } from "@/contexts/LanguageContext";

export default function Navbar() {
  const { t, locale, setLocale, isRTL } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");

  const navLinks = [
    { label: t.nav.home,     href: "#home"         },
    { label: t.nav.products, href: "#products"     },
    { label: t.nav.howToBuy, href: "#how-to-order" },
    { label: t.nav.about,    href: "#about"        },
    { label: t.nav.reviews,  href: "#testimonials" },
    { label: t.nav.contact,  href: "#contact"      },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setActiveLink(href);
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleLanguage = () => setLocale(locale === "en" ? "ar" : "en");

  /* Language toggle pill */
  const LangToggle = ({ mobile }: { mobile?: boolean }) => (
    <button
      onClick={toggleLanguage}
      className={cn(
        "flex items-center gap-1.5 rounded-full border font-semibold transition-all duration-300",
        mobile
          ? "px-4 py-2.5 text-sm w-full justify-center border-sky-200 text-sky-600 hover:bg-sky-50"
          : scrolled
          ? "px-3 py-1.5 text-xs border-slate-200 text-slate-600 hover:border-sky-400 hover:text-sky-600"
          : "px-3 py-1.5 text-xs border-white/30 text-white/80 hover:border-white hover:text-white"
      )}
      aria-label={`Switch to ${locale === "en" ? "Arabic" : "English"}`}
    >
      <span>{locale === "en" ? "🌐" : "🌐"}</span>
      <span>{t.nav.language}</span>
    </button>
  );

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-[background-color,padding,box-shadow,backdrop-filter] duration-500",
          scrolled ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-slate-200/50 py-3" : "bg-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }} className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl overflow-hidden group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                <Image src="/logo.png" alt="Medix Healthcare Trading" width={40} height={40} className="w-full h-full object-contain" priority />
              </div>
              <div>
                <span className={cn("font-black text-base leading-none block transition-colors duration-300 tracking-tight", scrolled ? "text-slate-900" : "text-white")}>
                  Medix Healthcare
                </span>
                <span className={cn("text-[10px] font-semibold transition-colors duration-300 uppercase tracking-wide", scrolled ? "text-sky-500" : "text-sky-200")}>
                  {isRTL ? "استيراد وتوزيع طبي" : "Medical Import · Distribution"}
                </span>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  aria-current={activeLink === link.href ? "page" : undefined}
                  className={cn(
                    "relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200",
                    activeLink === link.href
                      ? scrolled ? "text-sky-600" : "text-white"
                      : scrolled ? "text-slate-600 hover:text-sky-600" : "text-white/80 hover:text-white"
                  )}
                >
                  {activeLink === link.href && (
                    <motion.span
                      layoutId="nav-pill"
                      className={cn("absolute inset-0 rounded-full -z-10", scrolled ? "bg-sky-50" : "bg-white/20")}
                      transition={{ type: "spring", stiffness: 380, damping: 35 }}
                    />
                  )}
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Desktop CTA + Language */}
            <div className="hidden lg:flex items-center gap-3">
              <LangToggle />
              <a href="tel:+971500000000" className={cn("flex items-center gap-2 text-sm font-medium transition-colors duration-300", scrolled ? "text-slate-600 hover:text-sky-600" : "text-white/80 hover:text-white")}>
                <Phone className="w-4 h-4" aria-hidden="true" />
                <span>+971 50 000 0000</span>
              </a>
              <Button variant={scrolled ? "primary" : "outline"} size="sm" onClick={() => handleNavClick("#contact")}>
                {t.nav.orderNow}
              </Button>
            </div>

            {/* Mobile Toggle */}
            <button
              className={cn("lg:hidden p-2 rounded-lg transition-colors duration-300", scrolled ? "text-slate-700 hover:bg-slate-100" : "text-white hover:bg-white/10")}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={cn("lg:hidden overflow-hidden transition-all duration-[400ms] ease-in-out", menuOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0")}>
          <div className="bg-white/95 backdrop-blur-xl border-t border-slate-100 px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={cn(
                  "w-full px-4 py-3 rounded-xl font-medium transition-colors duration-200",
                  isRTL ? "text-right" : "text-left",
                  "text-slate-700 hover:bg-sky-50 hover:text-sky-600"
                )}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <LangToggle mobile />
              <Button variant="primary" size="md" className="w-full" onClick={() => handleNavClick("#contact")}>
                {t.nav.orderNow}
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
