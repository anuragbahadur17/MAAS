'use client';
import { useLang } from "@/context/LanguageContext";

export function LanguageToggle() {
  const { lang, setLang } = useLang();

  return (
    <div style={{ display: "flex", alignItems: "center", background: "rgba(241,245,249,0.9)", borderRadius: "100px", padding: "3px", border: "1px solid rgba(0,0,0,0.08)", gap: "2px" }}>
      <button
        onClick={() => setLang("en")}
        style={{ padding: "5px 14px", borderRadius: "100px", border: "none", cursor: "pointer", fontSize: "12px", fontWeight: "600", fontFamily: "system-ui, sans-serif", letterSpacing: "0.5px", background: lang === "en" ? "#ea580c" : "transparent", color: lang === "en" ? "#fff" : "#64748b", transition: "all 0.2s ease" }}
      >
        EN
      </button>
      <button
        onClick={() => setLang("hi")}
        style={{ padding: "5px 14px", borderRadius: "100px", border: "none", cursor: "pointer", fontSize: "12px", fontWeight: "600", fontFamily: "system-ui, sans-serif", background: lang === "hi" ? "#ea580c" : "transparent", color: lang === "hi" ? "#fff" : "#64748b", transition: "all 0.2s ease" }}
      >
        हि
      </button>
    </div>
  );
}