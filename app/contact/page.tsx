'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = () => {
    if (!form.name || !form.message) { alert('Naam aur message zaroori hai!'); return; }
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <header className="bg-white shadow-sm px-6 py-4 flex items-center gap-3">
        <Link href="/" className="text-gray-400 text-xl">←</Link>
        <span className="text-xl font-bold text-orange-500">MAAS</span>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">📞</div>
          <h1 className="text-3xl font-bold text-gray-800">Humse Baat Karo</h1>
          <p className="text-gray-500 mt-2">Hum hamesha sunne ke liye taiyaar hain 🙏</p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 gap-4 mb-8">

          <a href="tel:+919999999999"
            className="bg-white rounded-2xl p-5 shadow-sm border border-orange-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">📱</div>
            <div>
              <p className="font-bold text-gray-800">WhatsApp / Call</p>
              <p className="text-orange-500 font-medium">+91 8010312856</p>
              <p className="text-gray-400 text-xs">Mon-Sat, 10am - 6pm</p>
            </div>
          </a>

          <a href="mailto:maastudio.in@gmail.com"
            className="bg-white rounded-2xl p-5 shadow-sm border border-orange-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">✉️</div>
            <div>
              <p className="font-bold text-gray-800">Email</p>
              <p className="text-orange-500 font-medium">anuragbahadur.17@gmail.com</p>
              <p className="text-gray-400 text-xs">24-48 hours mein reply</p>
            </div>
          </a>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-orange-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-2xl">📍</div>
            <div>
              <p className="font-bold text-gray-800">Address</p>
              <p className="text-gray-600">Sonipat, Haryana, India</p>
              <p className="text-gray-400 text-xs">131001</p>
            </div>
          </div>

        </div>

        {/* Message Form */}
        {!sent ? (
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-orange-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Message Bhejo</h2>
            <div className="space-y-3">
              <input
                value={form.name}
                onChange={e => setForm(p => ({...p, name: e.target.value}))}
                placeholder="Aapka naam *"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-300"
              />
              <input
                value={form.email}
                onChange={e => setForm(p => ({...p, email: e.target.value}))}
                placeholder="Email (optional)"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-300"
              />
              <textarea
                value={form.message}
                onChange={e => setForm(p => ({...p, message: e.target.value}))}
                placeholder="Aapka suggestion, feedback ya problem *"
                rows={4}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-300 resize-none"
              />
              <button onClick={handleSubmit}
                className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600">
                Message Bhejo 📨
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-3xl p-8 text-center">
            <div className="text-5xl mb-3">🙏</div>
            <h2 className="text-xl font-bold text-green-700 mb-2">Shukriya {form.name} ji!</h2>
            <p className="text-green-600">Aapka message mil gaya. Hum jald reply karenge.</p>
            <Link href="/" className="inline-block mt-4 px-6 py-2 bg-orange-500 text-white rounded-full text-sm font-medium">
              Wapas Jao
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}