'use client';

import { useState } from 'react';
import Link from 'next/link';

const schemes = [
  { id: 1, category: 'housing', icon: '🏠', name: 'PM Awas Yojana', desc: 'Garib parivaron ko pakka ghar dene ki yojana', benefit: '1.5 lakh tak sahayata', eligibility: 'BPL parivaar, koi pakka ghar nahi', apply: 'pmayg.nic.in', tag: 'Central' },
  { id: 2, category: 'farming', icon: '🌾', name: 'PM Kisan Samman Nidhi', desc: 'Kisanon ko 6000 per saal seedha bank mein', benefit: '6000/year (3 installments)', eligibility: 'Registered farmer with land', apply: 'pmkisan.gov.in', tag: 'Central' },
  { id: 3, category: 'gas', icon: '🔥', name: 'PM Ujjwala Yojana', desc: 'BPL mahilaon ko free LPG connection', benefit: 'Free LPG connection + cylinder', eligibility: 'BPL mahila (18+)', apply: 'pmuy.gov.in', tag: 'Central' },
  { id: 4, category: 'health', icon: '🏥', name: 'Ayushman Bharat (PMJAY)', desc: '5 lakh tak free hospital treatment', benefit: '5 lakh/year health cover', eligibility: 'SECC list mein naam ho', apply: 'pmjay.gov.in', tag: 'Central' },
  { id: 5, category: 'education', icon: '📚', name: 'PM Scholarship Scheme', desc: 'Fauji aur police ke bachon ke liye scholarship', benefit: '2500/month (boys), 3000/month (girls)', eligibility: 'Ex-servicemen ke ward', apply: 'scholarships.gov.in', tag: 'Central' },
  { id: 6, category: 'business', icon: '💼', name: 'PM Mudra Yojana', desc: 'Chhote business ke liye bina guarantee loan', benefit: '50 hazar se 10 lakh tak loan', eligibility: 'Koi bhi Indian citizen', apply: 'mudra.org.in', tag: 'Central' },
  { id: 7, category: 'women', icon: '👩', name: 'Beti Bachao Beti Padhao', desc: 'Beti ki padhai aur suraksha ke liye', benefit: 'Education support + awareness', eligibility: 'Beti wale parivaar', apply: 'wcd.nic.in', tag: 'Central' },
  { id: 8, category: 'farming', icon: '💧', name: 'PM Fasal Bima Yojana', desc: 'Fasal kharab hone par bima sahayata', benefit: 'Fasal nuksan ka muavza', eligibility: 'Registered farmers', apply: 'pmfby.gov.in', tag: 'Central' },
  { id: 9, category: 'health', icon: '🤱', name: 'Janani Suraksha Yojana', desc: 'Garbhwati mahilaon ko delivery par cash', benefit: '1400 rural, 1000 urban', eligibility: 'BPL garbhwati mahila', apply: 'nhm.gov.in', tag: 'Central' },
  { id: 10, category: 'employment', icon: '⚒️', name: 'MGNREGA', desc: '100 din guaranteed rojgaar gaon mein', benefit: '100 din kaam guaranteed', eligibility: 'Gramin parivaar ka adult', apply: 'nrega.nic.in', tag: 'Central' },
  { id: 11, category: 'education', icon: '🎓', name: 'NSP Scholarship', desc: 'SC/ST/OBC/Minority students ke liye scholarship', benefit: 'Pre & Post matric scholarship', eligibility: 'SC/ST/OBC/Minority students', apply: 'scholarships.gov.in', tag: 'Central' },
  { id: 12, category: 'business', icon: '🏭', name: 'Startup India', desc: 'Naye business ideas ke liye government support', benefit: 'Tax benefits + funding + mentorship', eligibility: 'Registered startup', apply: 'startupindia.gov.in', tag: 'Central' },
];

const categories = [
  { id: 'all', label: 'Sab' },
  { id: 'farming', label: 'Kisan' },
  { id: 'health', label: 'Swasthya' },
  { id: 'housing', label: 'Aawas' },
  { id: 'education', label: 'Padhai' },
  { id: 'business', label: 'Business' },
  { id: 'women', label: 'Mahila' },
  { id: 'employment', label: 'Rojgaar' },
  { id: 'gas', label: 'Rasoi Gas' },
];

type Scheme = typeof schemes[0];

export default function SchemesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Scheme | null>(null);

  const filtered = schemes.filter((s) => {
    const matchCat = activeCategory === 'all' || s.category === activeCategory;
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <header className="bg-white shadow-sm px-6 py-4 flex items-center gap-3">
        <Link href="/dashboard" className="text-green-500 text-xl">←</Link>
        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">M</div>
        <div>
          <h1 className="text-lg font-bold text-gray-800">Scheme Finder</h1>
          <p className="text-xs text-gray-500">Aapke liye sarkari yojanaen</p>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-6">
        <div className="relative mb-4">
          <span className="absolute left-3 top-3 text-gray-400">🔍</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Scheme dhundho..."
            className="w-full border border-gray-200 rounded-full pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-green-400"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === c.id
                  ? 'bg-green-500 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-green-300'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <p className="text-sm text-gray-500 mb-4">{filtered.length} yojanaen mili</p>

        <div className="space-y-3">
          {filtered.map((s) => (
            <div
              key={s.id}
              className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelected(s)}
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl">{s.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-800">{s.name}</h3>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{s.tag}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{s.desc}</p>
                  <span className="text-xs bg-orange-50 text-orange-600 px-3 py-1 rounded-full font-medium">
                    {s.benefit}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <div className="text-4xl mb-3">🔍</div>
              <p>Koi scheme nahi mili</p>
            </div>
          )}
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-t-3xl w-full max-w-2xl p-6 pb-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6"></div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{selected.icon}</span>
              <div>
                <h2 className="text-xl font-bold text-gray-800">{selected.name}</h2>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{selected.tag}</span>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{selected.desc}</p>
            <div className="space-y-3 mb-6">
              <div className="bg-orange-50 rounded-xl p-3">
                <p className="text-xs text-orange-500 font-medium mb-1">Labh (Benefit)</p>
                <p className="text-sm text-gray-700">{selected.benefit}</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-3">
                <p className="text-xs text-blue-500 font-medium mb-1">Yogyata (Eligibility)</p>
                <p className="text-sm text-gray-700">{selected.eligibility}</p>
              </div>
              <div className="bg-green-50 rounded-xl p-3">
                <p className="text-xs text-green-500 font-medium mb-1">Apply Karo</p>
                <p className="text-sm text-gray-700 font-mono">{selected.apply}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setSelected(null)}
                className="flex-1 border border-gray-300 text-gray-600 py-3 rounded-full font-semibold"
              >
                Wapas
              </button>
              <button
                onClick={() => window.open(`https://${selected.apply}`, '_blank')}
                className="flex-1 bg-green-500 text-white py-3 rounded-full font-semibold hover:bg-green-600"
              >
                Apply Karo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}