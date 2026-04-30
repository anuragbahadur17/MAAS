"use client";
import Link from "next/link";
import { useState } from "react";

const content = {
  en: {
    tagline: "Multilingual AI Assistant for All",
    subtitle: "A platform built with the vision that every Indian — regardless of background, education, or income — deserves access to world-class AI tools, completely free.",
    missionTitle: "Our Mission",
    missionText: "Across India, millions of students, workers, and citizens are held back not by lack of ambition, but by lack of access. MAAS was built to bridge this gap — offering powerful AI-driven tools at zero cost. From crafting professional resumes to navigating government schemes, MAAS stands beside every Indian as a trusted guide.",
    whyFreeTitle: "Why Free? Always.",
    whyFreeItems: [
      { title: "For the Student", desc: "After paying tuition, students have little left for premium tools. Every feature on MAAS is free — so their potential is never limited by their wallet." },
      { title: "For the Worker", desc: "Professionals and daily-wage workers alike need polished documents and guidance. MAAS delivers that — without subscription fees or paywalls." },
      { title: "For the Farmer & Rural Citizen", desc: "Millions are unaware of government schemes meant for them. MAAS helps them discover and access benefits they rightfully deserve." },
      { title: "For Digital India", desc: "We align with the Government mission to create an inclusive digital ecosystem. Technology should uplift, not exclude." },
      { title: "For Bharat", desc: "As Indians, helping fellow citizens grow is not charity — it is our responsibility. MAAS is that commitment, made real." },
    ],
    founderTitle: "The Founder",
    founderName: "Anurag Bahadur",
    founderRole: "Founder, MAA AI Studio · Sonipat, Haryana",
    founderBio: [
      "Anurag comes from a non-technical background, currently serving as Director at Hyoxen & Edificio. His proximity to real India — students, laborers, small business owners — gave him an unfiltered view of the digital divide.",
      "The idea was simple: if a mother cares for her children unconditionally, why cannot a platform do the same for 1.4 billion Indians? That question became MAAS.",
      "This is not just a product. It is a movement — a belief that AI can be the great equalizer if built with the right intent.",
    ],
    statsLabels: ["Free, Forever", "AI Features", "Citizens Served"],
    ctaText: "Start Using MAAS — It is Free",
    ctaSub: "No registration required. No payment. Ever.",
    toggleLabel: "हिंदी में पढ़ें",
    disclaimer: "AI-generated content is provided for informational purposes only. MAAS makes no warranties, express or implied, regarding accuracy or completeness. Users assume full responsibility for decisions made based on this content. For medical, legal, financial, or governmental matters, consult a qualified professional.",
  },
  hi: {
    tagline: "सभी के लिए बहुभाषी AI सहायक",
    subtitle: "एक ऐसा मंच जो इस विश्वास के साथ बना है कि हर भारतीय विश्व स्तरीय AI टूल्स का उपयोग बिल्कुल मुफ्त में कर सकता है।",
    missionTitle: "हमारा उद्देश्य",
    missionText: "पूरे भारत में लाखों छात्र, कामगार और नागरिक पहुंच की कमी से पीछे रह जाते हैं। MAAS इसी अंतर को पाटने के लिए बना है।",
    whyFreeTitle: "मुफ्त क्यों? हमेशा के लिए।",
    whyFreeItems: [
      { title: "छात्रों के लिए", desc: "MAAS पर हर सुविधा मुफ्त है — ताकि उनकी क्षमता कभी उनकी जेब से न मापी जाए।" },
      { title: "कामगारों के लिए", desc: "MAAS प्रोफेशनल दस्तावेज़ और मार्गदर्शन देता है — बिना किसी सब्सक्रिप्शन के।" },
      { title: "किसान और ग्रामीण नागरिक के लिए", desc: "MAAS उन्हें सरकारी योजनाओं के अधिकार दिलाने में मदद करता है।" },
      { title: "डिजिटल इंडिया के लिए", desc: "तकनीक को उठाना चाहिए, बाहर नहीं करना चाहिए।" },
      { title: "भारत के लिए", desc: "साथी नागरिकों की मदद करना हमारी जिम्मेदारी है। MAAS उसी प्रतिबद्धता का साकार रूप है।" },
    ],
    founderTitle: "संस्थापक की कहानी",
    founderName: "अनुराग बहादुर",
    founderRole: "संस्थापक, MAA AI Studio · सोनीपत, हरियाणा",
    founderBio: [
      "अनुराग एक गैर-तकनीकी पृष्ठभूमि से आते हैं और वर्तमान में Hyoxen & Edificio में निदेशक के रूप में कार्यरत हैं।",
      "विचार सरल था: अगर एक माँ अपने बच्चों की देखभाल करती है, तो क्या एक मंच 140 करोड़ भारतीयों के लिए ऐसा नहीं कर सकता? यही प्रश्न MAAS बन गया।",
      "यह एक आंदोलन है — एक विश्वास कि AI सही इरादे से बनाया जाए तो महान समानताकारक बन सकता है।",
    ],
    statsLabels: ["मुफ्त, हमेशा के लिए", "AI सुविधाएं", "नागरिकों की सेवा"],
    ctaText: "MAAS उपयोग करें — निःशुल्क",
    ctaSub: "कोई पंजीकरण नहीं। कोई भुगतान नहीं। कभी नहीं।",
    toggleLabel: "Read in English",
    disclaimer: "AI द्वारा उत्पन्न सामग्री केवल सूचनात्मक उद्देश्यों के लिए है। MAAS किसी भी सटीकता की गारंटी नहीं देता। चिकित्सा, कानूनी, वित्तीय या सरकारी मामलों के लिए योग्य विशेषज्ञ से परामर्श लें।",
  },
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
      <p style={{ fontSize: "11px", letterSpacing: "4px", color: "#c2410c", fontFamily: "Georgia, serif", textTransform: "uppercase" as const, margin: 0, whiteSpace: "nowrap" as const }}>{children}</p>
      <div style={{ flex: 1, height: "1px", background: "rgba(194,65,12,0.2)" }} />
    </div>
  );
}

function Divider() {
  return <div style={{ height: "1px", background: "linear-gradient(to right, transparent, rgba(194,65,12,0.2), transparent)" }} />;
}

export default function AboutPage() {
  const [lang, setLang] = useState<"en" | "hi">("en");
  const t = content[lang];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #fff8f2 0%, #ffffff 50%, #fff4ee 100%)", fontFamily: "Georgia, Times New Roman, serif", position: "relative", overflowX: "hidden" as const }}>

      <div aria-hidden="true" style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <svg width="900" height="900" viewBox="0 0 900 900" style={{ opacity: 0.032, userSelect: "none" as const }}>
          <text x="50%" y="44%" dominantBaseline="middle" textAnchor="middle" fontSize="260" fontWeight="900" fontFamily="Georgia, serif" letterSpacing="-10" fill="#c2410c">MAAS</text>
          <text x="50%" y="67%" dominantBaseline="middle" textAnchor="middle" fontSize="68" fontWeight="400" fontFamily="Georgia, serif" fill="#c2410c" letterSpacing="16">MAA AI STUDIO</text>
        </svg>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(135deg, transparent, transparent 80px, rgba(234,88,12,0.018) 80px, rgba(234,88,12,0.018) 82px)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>

        <header style={{ borderBottom: "1px solid rgba(234,88,12,0.12)", background: "rgba(255,255,255,0.88)", backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 50 }}>
          <div style={{ maxWidth: "900px", margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <Link href="/" style={{ color: "#9a3412", fontSize: "12px", letterSpacing: "2px", textDecoration: "none", opacity: 0.6, fontFamily: "Georgia, serif" }}>← BACK</Link>
              <div style={{ width: "1px", height: "20px", background: "rgba(194,65,12,0.3)" }} />
              <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "36px", height: "36px", background: "#c2410c", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "#fff", fontWeight: "900", fontSize: "13px", fontFamily: "Georgia, serif", letterSpacing: "1px" }}>M</span>
                </div>
                <div>
                  <div style={{ fontFamily: "Georgia, serif", fontWeight: "900", fontSize: "16px", color: "#c2410c", letterSpacing: "3px", lineHeight: 1 }}>MAAS</div>
                  <div style={{ fontFamily: "Georgia, serif", fontSize: "8px", color: "#9a3412", letterSpacing: "2px", opacity: 0.7, lineHeight: 1.2 }}>MAA AI STUDIO</div>
                </div>
              </Link>
            </div>
            <button onClick={() => setLang(lang === "en" ? "hi" : "en")} style={{ padding: "7px 18px", border: "1px solid #c2410c", borderRadius: "2px", background: "transparent", color: "#c2410c", cursor: "pointer", fontSize: "11px", letterSpacing: "2px", fontFamily: "Georgia, serif" }}>{t.toggleLabel}</button>
          </div>
        </header>

        <main style={{ maxWidth: "860px", margin: "0 auto", padding: "0 24px 80px" }}>

          <section style={{ padding: "80px 0 60px", textAlign: "center" as const }}>
            <p style={{ fontSize: "11px", letterSpacing: "5px", color: "#c2410c", marginBottom: "24px", fontFamily: "Georgia, serif", opacity: 0.8 }}>MAA AI STUDIO · EST. 2024</p>
            <h1 style={{ fontSize: "clamp(32px, 6vw, 60px)", fontWeight: "700", color: "#1a1a1a", fontFamily: "Georgia, serif", lineHeight: 1.15, marginBottom: "16px", letterSpacing: "-1px" }}>About MAAS</h1>
            <div style={{ width: "60px", height: "2px", background: "#c2410c", margin: "0 auto 32px" }} />
            <p style={{ fontSize: "clamp(15px, 2.5vw, 18px)", color: "#555", lineHeight: 1.85, maxWidth: "640px", margin: "0 auto", fontFamily: "Georgia, serif", fontStyle: "italic" }}>{t.tagline}</p>
            <p style={{ fontSize: "15px", color: "#777", lineHeight: 1.9, maxWidth: "620px", margin: "20px auto 0", fontFamily: "Georgia, serif" }}>{t.subtitle}</p>
          </section>

          <Divider />

          <section style={{ padding: "56px 0" }}>
            <SectionLabel>{t.missionTitle}</SectionLabel>
            <div style={{ borderLeft: "3px solid #c2410c", paddingLeft: "32px", marginTop: "28px" }}>
              <p style={{ fontSize: "17px", color: "#2d2d2d", lineHeight: 2, fontFamily: "Georgia, serif" }}>{t.missionText}</p>
            </div>
          </section>

          <Divider />

          <section style={{ padding: "56px 0" }}>
            <SectionLabel>{t.whyFreeTitle}</SectionLabel>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", marginTop: "32px", border: "1px solid rgba(194,65,12,0.15)" }}>
              {t.whyFreeItems.map((item, i) => (
                <div key={i} style={{ padding: "28px 24px", borderRight: i % 2 === 0 ? "1px solid rgba(194,65,12,0.15)" : "none", borderBottom: i < t.whyFreeItems.length - 1 ? "1px solid rgba(194,65,12,0.15)" : "none", background: i === 0 ? "rgba(194,65,12,0.03)" : "transparent" }}>
                  <h3 style={{ fontSize: "11px", letterSpacing: "2.5px", color: "#c2410c", fontFamily: "Georgia, serif", marginBottom: "10px", textTransform: "uppercase" as const }}>{item.title}</h3>
                  <p style={{ fontSize: "15px", color: "#555", lineHeight: 1.85, fontFamily: "Georgia, serif", margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <Divider />

          <section style={{ padding: "56px 0" }}>
            <SectionLabel>{t.founderTitle}</SectionLabel>
            <div style={{ marginTop: "36px", display: "grid", gridTemplateColumns: "auto 1fr", gap: "36px", alignItems: "start" }}>
              <div style={{ width: "88px", height: "88px", border: "2px solid #c2410c", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: "28px", fontWeight: "700", color: "#c2410c", fontFamily: "Georgia, serif" }}>AB</span>
              </div>
              <div>
                <h3 style={{ fontSize: "22px", fontWeight: "700", color: "#1a1a1a", fontFamily: "Georgia, serif", marginBottom: "4px" }}>{t.founderName}</h3>
                <p style={{ fontSize: "11px", letterSpacing: "1.5px", color: "#c2410c", fontFamily: "Georgia, serif", marginBottom: "24px", textTransform: "uppercase" as const }}>{t.founderRole}</p>
                {t.founderBio.map((para, i) => (
                  <p key={i} style={{ fontSize: "15.5px", color: "#444", lineHeight: 1.95, fontFamily: "Georgia, serif", marginBottom: i < t.founderBio.length - 1 ? "16px" : 0 }}>{para}</p>
                ))}
              </div>
            </div>
          </section>

          <Divider />

          <section style={{ padding: "56px 0" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", border: "1px solid rgba(194,65,12,0.2)" }}>
              {[{ num: "100%", label: t.statsLabels[0] }, { num: "6+", label: t.statsLabels[1] }, { num: "140Cr+", label: t.statsLabels[2] }].map((stat, i) => (
                <div key={i} style={{ padding: "40px 16px", textAlign: "center" as const, borderRight: i < 2 ? "1px solid rgba(194,65,12,0.2)" : "none" }}>
                  <div style={{ fontSize: "36px", fontWeight: "700", color: "#c2410c", fontFamily: "Georgia, serif", lineHeight: 1, marginBottom: "10px" }}>{stat.num}</div>
                  <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#888", fontFamily: "Georgia, serif", textTransform: "uppercase" as const }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </section>

          <section style={{ textAlign: "center" as const, padding: "20px 0 40px" }}>
            <Link href="/dashboard" style={{ display: "inline-block", padding: "16px 48px", background: "#c2410c", color: "#fff", fontFamily: "Georgia, serif", fontSize: "13px", letterSpacing: "3px", textDecoration: "none", textTransform: "uppercase" as const }}>{t.ctaText}</Link>
            <p style={{ marginTop: "14px", fontSize: "12px", color: "#aaa", letterSpacing: "1.5px", fontFamily: "Georgia, serif" }}>{t.ctaSub}</p>
          </section>

        </main>

        <footer style={{ borderTop: "1px solid rgba(194,65,12,0.12)", padding: "32px 24px 24px" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <div style={{ background: "rgba(194,65,12,0.04)", border: "1px solid rgba(194,65,12,0.12)", padding: "16px 20px", marginBottom: "20px", display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <span style={{ fontSize: "10px", letterSpacing: "2px", color: "#c2410c", fontFamily: "Georgia, serif", whiteSpace: "nowrap" as const, marginTop: "1px", fontWeight: "700" }}>DISCLAIMER</span>
              <p style={{ fontSize: "11px", color: "#888", fontFamily: "Georgia, serif", lineHeight: 1.7, margin: 0 }}>{t.disclaimer}</p>
            </div>
            <p style={{ fontSize: "11px", color: "#ccc", letterSpacing: "2px", fontFamily: "Georgia, serif", margin: 0, textAlign: "center" as const }}>MAA AI STUDIO · SONIPAT, HARYANA · INDIA · © 2024</p>
          </div>
        </footer>

      </div>
    </div>
  );
}
