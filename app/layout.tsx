import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MAAS — Multilingual AI Assistant for All",
  description: "Har Indian Ka AI Saathi — Resume banao, Government Letter likho, Sarkari Schemes dhundho — Hindi mein, bilkul free!",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hi" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <footer className="bg-gray-900 text-white mt-auto">

          {/* Main Footer */}
          <div className="max-w-4xl mx-auto px-6 py-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">

              {/* Brand */}
              <div>
                <p className="text-2xl font-bold text-orange-400 mb-2">MAAS</p>
                <p className="text-gray-400 text-sm mb-3">MAA AI Studio — Har Indian Ka AI Saathi</p>
                <p className="text-gray-500 text-xs leading-relaxed">
                  MAA jaise care karti hai apne bachon ka — waise hum India ke 140 crore nagarikon ka khayal rakhte hain. Bilkul free.
                </p>
              </div>

              {/* Links */}
              <div>
                <p className="font-bold text-gray-300 mb-3">Quick Links</p>
                <div className="space-y-2">
                  {[
                    { href: "/resume", label: "Resume Banao" },
                    { href: "/letter", label: "Government Letter" },
                    { href: "/schemes", label: "Scheme Finder" },
                    { href: "/exam", label: "Exam Helper" },
                    { href: "/suggest", label: "💡 Suggestion Do" },
                  ].map(link => (
                    <Link key={link.href} href={link.href}
                      className="block text-gray-400 text-sm hover:text-orange-400 transition-colors">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Legal + Contact */}
              <div>
                <p className="font-bold text-gray-300 mb-3">Company</p>
                <div className="space-y-2">
                  {[
                    { href: "/about", label: "About Us" },
                    { href: "/contact", label: "Contact" },
                    { href: "/privacy", label: "Privacy Policy" },
                    { href: "/terms", label: "Terms of Service" },
                    { href: "/suggest", label: "Rate Us ⭐" },
                  ].map(link => (
                    <Link key={link.href} href={link.href}
                      className="block text-gray-400 text-sm hover:text-orange-400 transition-colors">
                      {link.label}
                    </Link>
                  ))}
                </div>
                <div className="mt-4">
                  <p className="text-gray-400 text-xs">📧 anuragbahadur.17@gmail.com</p>
                  <p className="text-gray-400 text-xs mt-1">📍 Sonipat, Haryana, India</p>
                </div>
              </div>

            </div>

            {/* Divider */}
            <div className="border-t border-gray-800 pt-6 text-center">
              <p className="text-orange-400 font-bold mb-1">
                "MAA cares for every citizen of India" 🇮🇳
              </p>
              <p className="text-gray-500 text-xs mt-2">
                Created with ❤️ by <span className="text-orange-300">Anurag Bahadur</span> | Sonipat, Haryana
              </p>
              <p className="text-gray-600 text-xs mt-1">
                © 2026 MAAS — MAA AI Assistant for All | All Rights Reserved
              </p>
            </div>
          </div>

        </footer>
      </body>
    </html>
  );
}