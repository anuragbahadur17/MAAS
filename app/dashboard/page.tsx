'use client';

import Link from 'next/link';

const features = [
  {
    icon: '📄',
    title: 'Resume Banao',
    desc: '2 minute mein professional resume',
    href: '/resume',
    color: 'bg-orange-50 border-orange-200',
    btnColor: 'bg-orange-500 hover:bg-orange-600',
  },
  {
    icon: '✉️',
    title: 'Government Letter',
    desc: 'RTI, complaint, application',
    href: '/letter',
    color: 'bg-blue-50 border-blue-200',
    btnColor: 'bg-blue-500 hover:bg-blue-600',
  },
  {
    icon: '🏛️',
    title: 'Scheme Finder',
    desc: 'Aapke liye sarkari schemes',
    href: '/schemes',
    color: 'bg-green-50 border-green-200',
    btnColor: 'bg-green-500 hover:bg-green-600',
  },
  {
    icon: '📚',
    title: 'Exam Helper',
    desc: 'SSC, UPSC, Board preparation',
    href: '/exam',
    color: 'bg-purple-50 border-purple-200',
    btnColor: 'bg-purple-500 hover:bg-purple-600',
  },
  {
    icon: '🎓',
    title: 'Board Exam Prep',
    desc: 'Class 10 & 12 — Sab Boards',
    href: '/board-exam',
    color: 'bg-red-50 border-red-200',
    btnColor: 'bg-red-500 hover:bg-red-600',
  },
  {
    icon: '🧾',
    title: 'Business Docs',
    desc: 'GST invoice, quotation, letter',
    href: '/business',
    color: 'bg-yellow-50 border-yellow-200',
    btnColor: 'bg-yellow-500 hover:bg-yellow-600',
  },
  {
    icon: '🎒',
    title: 'Student Project',
    desc: 'YouTube + Notes + Project File',
    href: '/student-project',
    color: 'bg-pink-50 border-pink-200',
    btnColor: 'bg-pink-500 hover:bg-pink-600',
  },
  {
    icon: '🎤',
    title: 'Voice Assistant',
    desc: 'Hindi mein bolo — jald aayega',
    href: '#',
    color: 'bg-gray-50 border-gray-200',
    btnColor: 'bg-gray-400 cursor-not-allowed',
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50">

      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-orange-500">
          MAAS
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Namaste! 👋</span>
          <Link href="/auth" className="text-sm text-red-500 hover:text-red-600 font-medium">
            Logout
          </Link>
        </div>
      </div>

      {/* Welcome */}
      <div className="px-6 py-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          Aapka Dashboard 🎉
        </h1>
        <p className="text-gray-500 text-sm">
          Kya karna hai aaj? Neeche se choose karo!
        </p>
      </div>

      {/* Features Grid */}
      <div className="px-6 pb-12 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className={`rounded-2xl border p-6 ${f.color} flex flex-col gap-3`}
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