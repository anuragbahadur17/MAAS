'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function SuggestPage() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [form, setForm] = useState({ name: '', suggestion: '', feature: '' });
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <header className="bg-white shadow-sm px-6 py-4 flex items-center gap-3">
        <Link href="/" className="text-gray-400 text-xl">←</Link>
        <span className="text-xl font-bold text-orange-500">MAAS</span>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">💡</div>
          <h1 className="text-3xl font-bold text-gray-800">Suggestion & Rating</h1>
          <p className="text-gray-500 mt-2">Aapki baat se hum behtar bante hain 🙏</p>
        </div>

        {!sent ? (
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-orange-100">

            {/* Star Rating */}
            <div className="text-center mb-6">
              <p className="font-bold text-gray-700 mb-3">MAAS ko kitne stars denge?</p>
              <div className="flex justify-center gap-2">
                {[1,2,3,4,5].map(star => (
                  <button key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    className="text-4xl transition-transform hover:scale-125">
                    {star <= (hover || rating) ? '⭐' : '☆'}
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-orange-500 font-medium mt-2">
                  {rating === 5 ? 'Bahut Shukriya! 🙏' :
                   rating === 4 ? 'Acha laga! 😊' :
                   rating === 3 ? 'Theek hai, improve karenge!' :
                   rating === 2 ? 'Hum behtar karenge!' :
                   'Sorry! Batao kaise sudhaarein?'}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <input
                value={form.name}
                onChange={e => setForm(p => ({...p, name: e.target.value}))}
                placeholder="Aapka naam (optional)"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-300"
              />
              <select
                value={form.feature}
                onChange={e => setForm(p => ({...p, feature: e.target.value}))}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-300">
                <option value="">Kaun sa feature chahiye? (optional)</option>
                <option>Voice Assistant Hindi mein</option>
                <option>Aadhaar/PAN Card Help</option>
                <option>Job Portal Integration</option>
                <option>Regional Language Support</option>
                <option>Mobile App (Android)</option>
                <option>Video Tutorial Feature</option>
                <option>Kuch aur...</option>
              </select>
              <textarea
                value={form.suggestion}
                onChange={e => setForm(p => ({...p, suggestion: e.target.value}))}
                placeholder="Aapka suggestion ya feedback yahan likho... Hum zaroor padhenge! 🙏"
                rows={4}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-300 resize-none"
              />
              <button
                onClick={() => { if(!form.suggestion && !rating){ alert('Rating ya suggestion zaroor do!'); return; } setSent(true); }}
                className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600">
                Submit Karo 🙏
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-3xl p-8 text-center">
            <div className="text-5xl mb-3">🙏</div>
            <h2 className="text-xl font-bold text-green-700 mb-2">Bahut Shukriya!</h2>
            <p className="text-green-600 mb-2">Aapka feedback hamare liye bahut important hai.</p>
            <p className="text-gray-500 text-sm">Hum MAAS ko aur behtar banate rahenge — aapke liye!</p>
            <Link href="/" className="inline-block mt-4 px-6 py-2 bg-orange-500 text-white rounded-full text-sm font-medium">
              Wapas Jao
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}