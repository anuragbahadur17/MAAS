'use client';
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";

const toolsData = {
  en: [
    { title: "Resume Builder", desc: "Professional resume in Indian format — Hindi or English — in minutes.", href: "/resume", tag: "Most Used" },
    { title: "Government Letter", desc: "RTI applications, complaints, official letters — AI drafts, you submit.", href: "/letter", tag: null },
    { title: "Scheme Finder", desc: "Discover government schemes — PM Awas, Kisan, Ujjwala, and more.", href: "/schemes", tag: null },
    { title: "Exam Helper", desc: "SSC, UPSC, Board exams — ask in Hindi or English, get detailed answers.", href: "/exam", tag: null },
    { title: "Board Exam Prep", desc: "Class 10 & 12 — CBSE, ICSE, State Boards — AI-powered preparation.", href: "/board-exam", tag: null },
    { title: "Business Documents", desc: "GST invoices, quotations, business letters for small businesses.", href: "/business", tag: null },
    { title: "Student Project Helper", desc: "Enter a topic — get video resources and AI-generated study notes.", href: "/student-project", tag: null },
    { title: "Voice Assistant", desc: "Speak in Hindi — coming soon.", href: "#", tag: "Coming Soon" },
  ],
  hi: [
    { title: "रिज़्यूमे बनाओ", desc: "भारतीय फॉर्मेट में प्रोफेशनल रिज़्यूमे — हिंदी या अंग्रेज़ी में — मिनटों में।", href: "/resume", tag: "सबसे लोकप्रिय" },
    { title: "सरकारी पत्र", desc: "RTI, शिकायत, आवेदन — AI लिखेगा, आप जमा करो।", href: "/letter", tag: null },
    { title: "योजना खोजें", desc: "आपके लिए सरकारी योजनाएं — PM आवास, किसान, उज्ज्वला और अधिक।", href: "/schemes", tag: null },
    { title: "परीक्षा सहायक", desc: "SSC, UPSC, बोर्ड परीक्षा — हिंदी या अंग्रेज़ी में पूछो, विस्तृत जवाब पाओ।", href: "/exam", tag: null },
    { title: "बोर्ड परीक्षा तैयारी", desc: "Class 10 & 12 — CBSE, ICSE, State Boards — AI शिक्षक के साथ।", href: "/board-exam", tag: null },
    { title: "बिज़नेस डॉक्यूमेंट", desc: "GST invoice, quotation, business letter — छोटे व्यापारियों के लिए।", href: "/business", tag: null },
    { title: "स्टूडेंट प्रोजेक्ट", desc: "Topic डालो — YouTube videos और AI notes एक साथ मिलेंगे।", href: "/student-project", tag: null },
    { title: "वॉयस असिस्टेंट", desc: "हिंदी में बोलो — जल्द आएगा।", href: "#", tag: "जल्द आएगा" },
  ],
};

const content = {
  en: {
    badge: "Free for every Indian — always",
    h1a: "AI tools built",
    h1b: "for Bharat.",
    desc: "Resume, government letters, scheme discovery, exam preparation — in Hindi and English. No cost. No registration.",
    cta1: "Explore Tools",
    cta2: "About MAAS",
    stat1: "Free", stat2: "AI Tools", stat3: "Languages", stat4: "No Login Required",
    toolsLabel: "What MAAS Offers",
    toolsTitle: "Eight tools. Zero cost.",
    ctaTitle: "Built for Bharat.\nFree for all.",
    ctaDesc: "No subscriptions. No paywalls. No registration required. Ever.",
    ctaBtn: "Start Using MAAS",
    disclaimer: "AI-generated content is for reference only. Always verify important information with qualified professionals.",
  },
  hi: {
    badge: "हर भारतीय के लिए मुफ्त — हमेशा",
    h1a: "AI टूल्स बने हैं",
    h1b: "भारत के लिए।",
    desc: "रिज़्यूमे, सरकारी पत्र, योजना खोज, परीक्षा तैयारी — हिंदी और अंग्रेज़ी में। कोई खर्च नहीं। कोई रजिस्ट्रेशन नहीं।",
    cta1: "सभी टूल्स देखें",
    cta2: "MAAS के बारे में",
    stat1: "मुफ्त", stat2: "AI टूल्स", stat3: "भाषाएं", stat4: "लॉगिन ज़रूरी नहीं",
    toolsLabel: "MAAS क्या देता है",
    toolsTitle: "आठ टूल्स। शून्य खर्च।",
    ctaTitle: "भारत के लिए बना।\nसबके लिए मुफ्त।",
    ctaDesc: "कोई सब्सक्रिप्शन नहीं। कोई पेवॉल नहीं। कभी भी रजिस्ट्रेशन नहीं।",
    ctaBtn: "MAAS इस्तेमाल करें",
    disclaimer: "AI द्वारा उत्पन्न सामग्री केवल संदर्भ के लिए है। महत्वपूर्ण जानकारी को विशेषज्ञों से सत्यापित करें।",
  },
};

export default function HomePage() {
  const { lang } = useLang();
  const c = content[lang];
  const tools = toolsData[lang];

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: "transparent" }}>

      {/* Hero */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "120px 32px 100px" }}>
        <div style={{ maxWidth: "680px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,247,237,0.9)", border: "1px solid #fed7aa", borderRadius: "100px", padding: "6px 16px", marginBottom: "28px", backdropFilter: "blur(8px)" }}>
            <span style={{ width: "6px", height: "6px", background: "#ea580c", borderRadius: "50%", display: "inline-block" }} />
            <span style={{ fontSize: "12px", color: "#c2410c", fontWeight: "500" }}>{c.badge}</span>
          </div>
          <h1 style={{ fontSize: "clamp(40px, 5vw, 68px)", fontWeight: "700", color: "#0f172a", lineHeight: 1.08, letterSpacing: "-2.5px", margin: "0 0 28px" }}>
            {c.h1a}<br />
            <span style={{ color: "#ea580c" }}>{c.h1b}</span>
          </h1>
          <p style={{ fontSize: "17px", color: "#64748b", lineHeight: 1.85, maxWidth: "520px", marginBottom: "48px" }}>
            {c.desc}
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" as const }}>
            <Link href="/dashboard" style={{ display: "inline-block", padding: "13px 28px", background: "#ea580c", color: "#fff", fontWeight: "600", fontSize: "14px", textDecoration: "none", borderRadius: "6px" }}>
              {c.cta1}
            </Link>
            <Link href="/about" style={{ display: "inline-block", padding: "13px 28px", background: "rgba(248,250,252,0.8)", color: "#374151", fontWeight: "500", fontSize: "14px", textDecoration: "none", borderRadius: "6px", border: "1px solid #d1d5db", backdropFilter: "blur(8px)" }}>
              {c.cta2}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ borderTop: "1px solid rgba(0,0,0,0.06)", borderBottom: "1px solid rgba(0,0,0,0.06)", padding: "16px 32px", background: "rgba(255,255,255,0.6)", backdropFilter: "blur(8px)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center" }}>
          {[
            { num: "100%", label: c.stat1 },
            { num: "8", label: c.stat2 },
            { num: "2", label: c.stat3 },
            { num: "✓", label: c.stat4 },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <div style={{ padding: "0 32px" }}>
                <p style={{ fontSize: "20px", fontWeight: "700", color: "#0f172a", margin: "0 0 2px", letterSpacing: "-0.5px" }}>{s.num}</p>
                <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0 }}>{s.label}</p>
              </div>
              {i < 3 && <div style={{ width: "1px", height: "32px", background: "#e2e8f0" }} />}
            </div>
          ))}
        </div>
      </section>

      {/* Tools */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 32px" }}>
        <div style={{ marginBottom: "40px" }}>
          <p style={{ fontSize: "11px", letterSpacing: "3px", color: "#ea580c", textTransform: "uppercase" as const, fontWeight: "600", marginBottom: "10px" }}>{c.toolsLabel}</p>
          <h2 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: "700", color: "#0f172a", letterSpacing: "-1px", margin: 0 }}>{c.toolsTitle}</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1px", background: "rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.06)" }}>
          {tools.map((tool, i) => (
            <Link
              key={i}
              href={tool.href}
              style={{ textDecoration: "none", background: "rgba(255,255,255,0.75)", backdropFilter: "blur(8px)", padding: "28px 24px", display: "block" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,247,237,0.92)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.75)")}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                <h3 style={{ fontSize: "14px", fontWeight: "600", color: "#0f172a", margin: 0 }}>{tool.title}</h3>
                {tool.tag && (
                  <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: "1px", padding: "3px 8px", borderRadius: "100px", background: "rgba(255,247,237,0.9)", color: "#ea580c", whiteSpace: "nowrap" as const, marginLeft: "8px", textTransform: "uppercase" as const }}>
                    {tool.tag}
                  </span>
                )}
              </div>
              <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.65, margin: "0 0 14px" }}>{tool.desc}</p>
              <span style={{ fontSize: "12px", color: "#ea580c", fontWeight: "500" }}>→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px 32px" }}>
        <div style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(8px)", border: "1px solid rgba(234,88,12,0.15)", borderLeft: "3px solid #ea580c", padding: "12px 20px", borderRadius: "0 8px 8px 0" }}>
          <p style={{ fontSize: "11px", color: "#64748b", margin: 0, lineHeight: 1.6 }}>
            <span style={{ color: "#ea580c", fontWeight: "700", letterSpacing: "1px", fontSize: "10px", textTransform: "uppercase" as const }}>Disclaimer </span>
            {c.disclaimer}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 32px", background: "rgba(15,23,42,0.92)", backdropFilter: "blur(12px)" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" as const }}>
          <h2 style={{ fontSize: "clamp(22px, 3vw, 38px)", fontWeight: "700", color: "#fff", letterSpacing: "-1px", marginBottom: "14px", whiteSpace: "pre-line" as const }}>
            {c.ctaTitle}
          </h2>
          <p style={{ fontSize: "15px", color: "#94a3b8", lineHeight: 1.8, marginBottom: "32px" }}>{c.ctaDesc}</p>
          <Link href="/dashboard" style={{ display: "inline-block", padding: "13px 32px", background: "#ea580c", color: "#fff", fontWeight: "600", fontSize: "14px", textDecoration: "none", borderRadius: "6px" }}>
            {c.ctaBtn}
          </Link>
        </div>
      </section>

    </div>
  );
}