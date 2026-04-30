'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Lang = "en" | "hi";

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (en: string, hi: string) => string;
}

const LanguageContext = createContext<LangContextType>({
  lang: "en",
  setLang: () => {},
  t: (en) => en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("maas-lang") as Lang;
    if (saved === "hi" || saved === "en") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("maas-lang", l);
  };

  const t = (en: string, hi: string) => lang === "hi" ? hi : en;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);