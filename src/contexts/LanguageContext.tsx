"use client";

import {
  createContext, useContext, useState, useEffect,
  type ReactNode,
} from "react";
import { translations, type Locale, type Translations } from "@/lib/translations";

interface LanguageContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Translations;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "en",
  setLocale: () => {},
  t: translations.en,
  isRTL: false,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  /* restore saved preference on mount */
  useEffect(() => {
    const saved = localStorage.getItem("lang") as Locale | null;
    if (saved === "ar" || saved === "en") setLocaleState(saved);
  }, []);

  /* sync html lang + dir whenever locale changes */
  useEffect(() => {
    const html = document.documentElement;
    html.lang = locale;
    html.dir  = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("lang", l);
  };

  return (
    <LanguageContext.Provider
      value={{ locale, setLocale, t: translations[locale], isRTL: locale === "ar" }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

/* convenience hook */
export function useTranslation() {
  return useContext(LanguageContext);
}
