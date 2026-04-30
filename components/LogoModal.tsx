'use client';
import Image from "next/image";

const logoDetails = [
  { icon: "👩‍👧", title: "Maa & Child", color: "#3b82f6", desc: "Represents Maa (Mother) — love, care, protection, nurturing and guidance. Core value of caring for every individual like a mother." },
  { icon: "🤖", title: "AI & Technology", color: "#8b5cf6", desc: "The circuit design represents Artificial Intelligence, innovation, and the power of technology to solve real-life problems." },
  { icon: "⭐", title: "Star / Sparkle", color: "#f59e0b", desc: "Symbolizes hope, new opportunities, bright future and endless possibilities through AI and education." },
  { icon: "👥", title: "People Icon", color: "#10b981", desc: "Represents all Indians. Tricolor (saffron, white, green) reflects unity, diversity and inclusivity of Bharat." },
  { icon: "🤝", title: "Helping Hand", color: "#ea580c", desc: "Shows support, help, and empowerment. We uplift and support every needy person in every possible way." },
];

const colors = [
  { bg: "#1e3a8a", name: "Blue", meaning: "Trust, Technology, Stability, Intelligence" },
  { bg: "#ea580c", name: "Saffron Orange", meaning: "Energy, Strength, Positivity, Courage" },
  { bg: "#16a34a", name: "Green", meaning: "Growth, Harmony, Hope, Better Tomorrow" },
  { bg: "#38bdf8", name: "Light Blue", meaning: "Innovation, Clarity, Future Thinking" },
];

export default function LogoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, backdropFilter: "blur(4px)" }}>
      <div style={{ background: "#fff", borderRadius: "20px", padding: "28px", width: "92%", maxWidth: "500px", maxHeight: "85vh", overflowY: "auto", boxShadow: "0 25px 60px rgba(0,0,0,0.3)", position: "relative" }}>

        {/* Close */}
        <button onClick={onClose} style={{ position: "absolute", top: "16px", right: "16px", background: "#f1f5f9", border: "none", borderRadius: "50%", width: "32px", height: "32px", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b" }}>✕</button>

        {/* Logo + Title */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div style={{ position: "relative", width: "80px", height: "80px", margin: "0 auto 12px" }}>
            <Image src="/maas-logo.png" alt="MAAS" fill sizes="80px" style={{ objectFit: "contain" }} />
          </div>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "22px", fontWeight: "900", color: "#1e3a5f", margin: "0 0 4px", letterSpacing: "2px" }}>MAAS</h2>
          <p style={{ fontSize: "11px", color: "#64748b", margin: "0 0 6px", letterSpacing: "2px" }}>MAA AI STUDIO</p>
          <p style={{ fontSize: "12px", color: "#ea580c", margin: 0, fontStyle: "italic" }}>"AI For All Indians | Care • Empower • Elevate"</p>
        </div>

        {/* Complete Logo */}
        <div style={{ textAlign: "center", marginBottom: "20px", padding: "12px", background: "#f8fafc", borderRadius: "12px" }}>
          <Image src="/maas-logo-complete.png" alt="MAAS Complete" width={300} height={200} style={{ objectFit: "contain", maxWidth: "100%" }} />
        </div>

        <div style={{ height: "1px", background: "#e2e8f0", marginBottom: "16px" }} />

        {/* Elements */}
        <p style={{ fontSize: "10px", letterSpacing: "3px", color: "#ea580c", textTransform: "uppercase" as const, fontWeight: "700", margin: "0 0 12px" }}>Logo Ke Elements</p>
        <div style={{ display: "flex", flexDirection: "column" as const, gap: "8px", marginBottom: "18px" }}>
          {logoDetails.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", padding: "10px", background: "#f8fafc", borderRadius: "10px" }}>
              <div style={{ width: "34px", height: "34px", borderRadius: "8px", background: `${item.color}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", flexShrink: 0 }}>{item.icon}</div>
              <div>
                <p style={{ fontSize: "13px", fontWeight: "700", color: "#1e293b", margin: "0 0 2px" }}>{item.title}</p>
                <p style={{ fontSize: "11px", color: "#64748b", margin: 0, lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ height: "1px", background: "#e2e8f0", marginBottom: "16px" }} />

        {/* Colors */}
        <p style={{ fontSize: "10px", letterSpacing: "3px", color: "#ea580c", textTransform: "uppercase" as const, fontWeight: "700", margin: "0 0 12px" }}>Colors Ka Matlab</p>
        <div style={{ display: "flex", flexDirection: "column" as const, gap: "8px", marginBottom: "18px" }}>
          {colors.map((c, i) => (
            <div key={i} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <div style={{ width: "20px", height: "20px", borderRadius: "4px", background: c.bg, flexShrink: 0 }} />
              <p style={{ fontSize: "12px", color: "#374151", margin: 0 }}><strong style={{ color: c.bg }}>{c.name}</strong> — {c.meaning}</p>
            </div>
          ))}
        </div>

        {/* Message */}
        <div style={{ padding: "12px 16px", background: "#fff7ed", borderRadius: "10px", border: "1px solid #fed7aa" }}>
          <p style={{ fontSize: "12px", color: "#c2410c", margin: 0, textAlign: "center" as const, lineHeight: 1.7 }}>
            <strong>MAAS</strong> = Motherly Care + AI Power = Free tools for every Indian 🇮🇳
          </p>
        </div>

      </div>
    </div>
  );
}