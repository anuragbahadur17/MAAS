'use client';
import Image from "next/image";
import { useState } from "react";
import LogoModal from "./LogoModal";
import Link from "next/link";
import { LanguageToggle } from "./LanguageToggle";

export default function Navbar() {
  const [hover, setHover] = useState(false);
  const [modal, setModal] = useState(false);

  return (
    <>
      <nav style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
        height: "72px",
        background: "rgba(255,255,255,0.85)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        backdropFilter: "blur(20px)",
      }}>

        {/* Logo */}
        <div style={{ position: "relative", display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => setModal(true)}
            style={{ position: "relative", width: "52px", height: "52px", cursor: "pointer", flexShrink: 0 }}
          >
            <Image src="/maas-logo.png" alt="MAAS Logo" fill sizes="52px" loading="eager" style={{ objectFit: "contain" }} />
          </div>

          {hover && (
            <div style={{ position: "absolute", top: "60px", left: 0, width: "240px", background: "rgba(255,255,255,0.95)", padding: "12px 14px", borderRadius: "12px", boxShadow: "0 8px 24px rgba(0,0,0,0.12)", fontSize: "12px", zIndex: 500, border: "1px solid rgba(0,0,0,0.08)", backdropFilter: "blur(8px)" }}>
              <p style={{ fontWeight: "700", color: "#1e3a5f", margin: "0 0 4px", fontSize: "13px" }}>MAAS — Maa AI Studio</p>
              <p style={{ color: "#64748b", margin: 0, lineHeight: 1.5 }}>AI for all Indians | Care • Empower • Elevate</p>
              <p style={{ color: "#ea580c", margin: "6px 0 0", fontSize: "11px" }}>👆 Click for details</p>
            </div>
          )}

          <div style={{ lineHeight: 1.2 }}>
            <div style={{ fontFamily: "Georgia, serif", fontWeight: "900", fontSize: "18px", color: "#1e3a5f", letterSpacing: "2px" }}>MAAS</div>
            <div style={{ fontSize: "10px", color: "#64748b", letterSpacing: "1.5px" }}>Maa AI Studio</div>
          </div>
        </div>

        {/* Nav Links + Language Toggle + CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          {[
            { label: "Resume", href: "/resume" },
            { label: "Schemes", href: "/schemes" },
            { label: "Exam", href: "/exam" },
            { label: "Dashboard", href: "/dashboard" },
            { label: "About", href: "/about" },
          ].map((item) => (
            <Link key={item.href} href={item.href} style={{ fontFamily: "system-ui, sans-serif", fontSize: "13px", color: "#374151", textDecoration: "none", padding: "8px 10px", borderRadius: "6px" }}>
              {item.label}
            </Link>
          ))}

          {/* Language Toggle - EN / HI */}
          <div style={{ margin: "0 8px" }}>
            <LanguageToggle />
          </div>

          <Link href="/dashboard" style={{ fontFamily: "system-ui, sans-serif", fontSize: "13px", fontWeight: "600", color: "#fff", textDecoration: "none", background: "#ea580c", padding: "9px 16px", borderRadius: "8px", whiteSpace: "nowrap" as const }}>
            Get Started
          </Link>
        </div>

      </nav>

      <LogoModal isOpen={modal} onClose={() => setModal(false)} />
    </>
  );
}