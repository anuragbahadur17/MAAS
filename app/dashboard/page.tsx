'use client';
import Link from 'next/link';
import Image from 'next/image';

const features = [
  { icon: '📄', title: 'Resume Banao', desc: '2 minute mein professional resume', href: '/resume', color: 'bg-orange-50 border-orange-200', btnColor: 'bg-orange-500 hover:bg-orange-600' },
  { icon: '✉️', title: 'Government Letter', desc: 'RTI, complaint, application', href: '/letter', color: 'bg-blue-50 border-blue-200', btnColor: 'bg-blue-500 hover:bg-blue-600' },
  { icon: '🏛️', title: 'Scheme Finder', desc: 'Aapke liye sarkari schemes', href: '/schemes', color: 'bg-green-50 border-green-200', btnColor: 'bg-green-500 hover:bg-green-600' },
  { icon: '📚', title: 'Exam Helper', desc: 'SSC, UPSC, Board preparation', href: '/exam', color: 'bg-purple-50 border-purple-200', btnColor: 'bg-purple-500 hover:bg-purple-600' },
  { icon: '🎓', title: 'Board Exam Prep', desc: 'Class 10 & 12 — Sab Boards', href: '/board-exam', color: 'bg-red-50 border-red-200', btnColor: 'bg-red-500 hover:bg-red-600' },
  { icon: '🧾', title: 'Business Docs', desc: 'GST invoice, quotation, letter', href: '/business', color: 'bg-yellow-50 border-yellow-200', btnColor: 'bg-yellow-500 hover:bg-yellow-600' },
  { icon: '🎒', title: 'Student Project', desc: 'YouTube + Notes + Project File', href: '/student-project', color: 'bg-pink-50 border-pink-200', btnColor: 'bg-pink-500 hover:bg-pink-600' },
  { icon: '🎤', title: 'Voice Assistant', desc: 'Hindi mein bolo — jald aayega', href: '#', color: 'bg-gray-50 border-gray-200', btnColor: 'bg-gray-400 cursor-not-allowed' },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen" style={{ background: 'transparent' }}>

      {/* Welcome Banner */}
      <div className="px-6 py-8 max-w-4xl mx-auto">
        <div style={{ background: 'linear-gradient(135deg, rgba(30,58,95,0.92), rgba(234,88,12,0.88))', backdropFilter: 'blur(12px)', borderRadius: '16px', padding: '24px 32px', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ position: 'relative', width: '56px', height: '56px', flexShrink: 0 }}>
            <Image src="/maas-logo.png" alt="MAAS" fill sizes="56px" style={{ objectFit: 'contain' }} />
          </div>
          <div>
            <h1 style={{ color: '#fff', fontSize: '20px', fontWeight: '800', margin: 0, fontFamily: 'Georgia, serif', letterSpacing: '1px' }}>
              MAAS — Maa AI Studio
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '12px', margin: '4px 0 0', letterSpacing: '0.5px' }}>
              AI For All Indians | Care • Empower • Elevate
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-1">Kya karna hai aaj?</h2>
        <p className="text-gray-500 text-sm mb-6">Apna tool choose karo — bilkul free!</p>
      </div>

      {/* Features Grid */}
      <div className="px-6 pb-16 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className={`rounded-2xl border p-6 flex flex-col gap-3`}
              style={{ background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(8px)', borderColor: 'rgba(0,0,0,0.08)' }}
            >
              <div className="text-4xl">{f.icon}</div>
              <div>
                <h2 className="font-bold text-gray-800 text-lg">{f.title}</h2>
                <p className="text-gray-500 text-sm mt-1">{f.desc}</p>
              </div>
              <Link
                href={f.href}
                className={`mt-auto text-center text-white text-sm font-medium py-2 rounded-xl transition-all ${f.btnColor}`}
              >
                Shuru Karo →
              </Link>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}