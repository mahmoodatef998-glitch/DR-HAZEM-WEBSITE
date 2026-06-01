"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "./ui/Button";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#appointment" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setActiveLink(href);
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-slate-200/50 py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-teal-500 flex items-center justify-center shadow-lg shadow-sky-500/30 group-hover:scale-105 transition-transform duration-300">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="white" opacity="0.3"/>
                  <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7z" fill="white"/>
                </svg>
              </div>
              <div>
                <span className={cn("font-bold text-lg leading-none block transition-colors duration-300", scrolled ? "text-slate-900" : "text-white")}>
                  Dr. Hazem
                </span>
                <span className={cn("text-xs font-medium transition-colors duration-300", scrolled ? "text-sky-500" : "text-sky-200")}>
                  Medical Specialist
                </span>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                    activeLink === link.href
                      ? scrolled
                        ? "bg-sky-50 text-sky-600"
                        : "bg-white/20 text-white"
                      : scrolled
                      ? "text-slate-600 hover:text-sky-600 hover:bg-sky-50"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  )}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:+971500000000"
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors duration-300",
                  scrolled ? "text-slate-600 hover:text-sky-600" : "text-white/80 hover:text-white"
                )}
              >
                <Phone className="w-4 h-4" />
                +971 50 000 0000
              </a>
              <Button
                variant={scrolled ? "primary" : "outline"}
                size="sm"
                onClick={() => handleNavClick("#appointment")}
              >
                Book Consultation
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className={cn(
                "lg:hidden p-2 rounded-lg transition-colors duration-300",
                scrolled ? "text-slate-700 hover:bg-slate-100" : "text-white hover:bg-white/10"
              )}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-400 ease-in-out",
            menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="bg-white/95 backdrop-blur-xl border-t border-slate-100 px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="w-full text-left px-4 py-3 rounded-xl text-slate-700 font-medium hover:bg-sky-50 hover:text-sky-600 transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 border-t border-slate-100">
              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => handleNavClick("#appointment")}
              >
                Book Consultation
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
