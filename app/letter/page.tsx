'use client';

import { useState } from 'react';
import Link from 'next/link';

const letterTypes = [
  { id: 'rti', label: '📋 RTI Application', desc: 'Suchna Ka Adhikar' },
  { id: 'complaint', label: '😤 Complaint Letter', desc: 'Shikayat Patra' },
  { id: 'income', label: '📄 Income Certificate', desc: 'Aay Praman Patra' },
  { id: 'domicile', label: '🏠 Domicile Certificate', desc: 'Niwas Praman Patra' },
  { id: 'job', label: '💼 Job Application', desc: 'Naukri Aavedan' },
  { id: 'bank', label: '🏦 Bank Letter', desc: 'Bank Sambandhi Patra' },
  { id: 'school', label: '🏫 School/College Letter', desc: 'Vidyalay Patra' },
  { id: 'custom', label: '✏️ Custom Letter', desc: 'Apna Letter' },
];

export default function LetterPage() {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState('');
  const [lang, setLang] = useState('hindi');
  const [loading, setLoading] = useState(false);
  const [letter, setLetter] = useState('');
  const [copied, setCopied] = useState(false);

  const [form, setForm] = useState({
    applicantName: '',
    applicantAddress: '',
    toName: '',
    toDesignation: '',
    toDept: '',
    subject: '',
    details: '',
  });

  const update = (field: string, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const generateLetter = async () => {
    if (!form.applicantName || !selectedType) {
      alert('Naam aur letter type zaroori hai!');
      return;
    }
    setLoading(true);
    setStep(3);

    const langInst = lang === 'hindi'
      ? 'Poora letter formal Hindi mein likho.'
      : lang === 'hinglish'
      ? 'Letter Hinglish mein likho.'
      : 'Write the letter in formal English.';

    const typeLabel = letterTypes.find(t => t.id === selectedType)?.label || selectedType;

    const prompt = `Tum ek expert Indian government letter writer ho. Neeche diye details se ek formal ${typeLabel} banao. ${langInst}

Details:
- Letter Type: ${typeLabel}
- Aavedan Karta: ${form.applicantName}
- Pata: ${form.applicantAddress}
- Prapt Karta: ${form.toName || 'Sambhit Adhikari'}
- Designation: ${form.toDesignation || 'Adhikari'}
- Department: ${form.toDept || 'Sambhit Vibhag'}
- Vishay: ${form.subject}
- Vivaran: ${form.details}
- Tarikh: ${new Date().toLocaleDateString('hi-IN')}

Proper formal letter format use karo. Sirf letter do, koi explanation nahi.`;

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setLetter(data.result || 'Error aaya, dobara try karo.');
    } catch {
      setLetter('Network error. Dobara try karo.');
    }
    setLoading(false);
  };

  const copyText = () => {
    navigator.clipboard.writeText(letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow-sm px-6 py-4 flex items-center gap-3">
        <Link href="/dashboard" className="text-gray-400 text-xl">←</Link>
        <span className="text-xl font-bold text-orange-500">MAAS</span>
        <div className="ml-2">
          <h1 className="text-lg font-bold text-gray-800">Government Letter</h1>
          <p className="text-xs text-gray-500">AI se professional letter — bilkul free</p>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-8">

        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-1">Kaun sa letter chahiye?</h2>
            <p className="text-sm text-gray-500 mb-6">Letter type choose karo</p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {letterTypes.map(t => (
                <button key={t.id} onClick={() => setSelectedType(t.id)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    selectedType === t.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-blue-300'}`}>
                  <div className="text-lg mb-1">{t.label}</div>
                  <div className="text-xs text-gray-500">{t.desc}</div>
                </button>
              ))}
            </div>
            <div className="bg-white rounded-2xl p-4 border border-gray-200 mb-6">
              <p className="text-sm font-medium text-gray-700 mb-3">Letter ki language:</p>
              <div className="flex gap-2">
                {['hindi', 'english', 'hinglish'].map(l => (
                  <button key={l} onClick={() => setLang(l)}
                    className={`flex-1 py-2 rounded-full text-sm border transition-colors ${
                      lang === l ? 'bg-blue-500 text-white border-blue-500' : 'border-gray-300 text-gray-600 hover:border-blue-300'}`}>
                    {l === 'hindi' ? 'Hindi' : l === 'english' ? 'English' : 'Hinglish'}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={() => { if (!selectedType) { alert('Letter type choose karo!'); return; } setStep(2); }}
              className="w-full bg-blue-500 text-white py-3 rounded-full font-semibold hover:bg-blue-600 transition-colors">
              Aage Badho →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100">
            <h2 className="text-lg font-bold text-gray-800 mb-1">Details Bharo</h2>
            <p className="text-sm text-gray-500 mb-5">Jitna zyada likhoge, utna better letter</p>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Aapka Naam *</label>
                <input value={form.applicantName} onChange={e => update('applicantName', e.target.value)}
                  placeholder="Ram Kumar Sharma"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"/>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Aapka Pata</label>
                <input value={form.applicantAddress} onChange={e => update('applicantAddress', e.target.value)}
                  placeholder="123, Gandhi Nagar, Delhi"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"/>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Ko (To)</label>
                  <input value={form.toName} onChange={e => update('toName', e.target.value)}
                    placeholder="Shri Arvind Kumar"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"/>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Designation</label>
                  <input value={form.toDesignation} onChange={e => update('toDesignation', e.target.value)}
                    placeholder="Block Development Officer"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"/>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Department / Office</label>
                <input value={form.toDept} onChange={e => update('toDept', e.target.value)}
                  placeholder="Gram Panchayat, Tehsil Office"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"/>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Vishay (Subject) *</label>
                <input value={form.subject} onChange={e => update('subject', e.target.value)}
                  placeholder="Bijli connection ke liye aavedan"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"/>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Poori Baat *</label>
                <textarea value={form.details} onChange={e => update('details', e.target.value)}
                  placeholder="Yahan apni poori baat likho..." rows={4}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 resize-none"/>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setStep(1)}
                className="flex-1 border border-gray-300 text-gray-600 py-3 rounded-full font-semibold hover:bg-gray-50">
                ← Wapas
              </button>
              <button onClick={generateLetter}
                className="flex-1 bg-blue-500 text-white py-3 rounded-full font-semibold hover:bg-blue-600">
                ✨ Letter Banao!
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100">
            {loading ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"/>
                <p className="text-gray-600 font-medium">AI aapka letter likh rahi hai...</p>
                <p className="text-gray-400 text-sm mt-2">Bas 30 second rukiye ☕</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-800">✅ Letter Taiyaar!</h2>
                  <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">AI Generated</span>
                </div>
                <pre className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 whitespace-pre-wrap font-mono max-h-96 overflow-y-auto border border-gray-100 mb-4">
                  {letter}
                </pre>
                <div className="flex gap-3">
                  <button onClick={copyText}
                    className={`flex-1 py-3 rounded-full font-semibold transition-colors ${
                      copied ? 'bg-green-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>
                    {copied ? '✓ Copied!' : 'Copy Letter'}
                  </button>
                  <button onClick={() => { setStep(1); setLetter(''); setSelectedType(''); }}
                    className="flex-1 border border-gray-300 text-gray-600 py-3 rounded-full font-semibold hover:bg-gray-50">
                    Naya Letter
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-3 text-center">
                  Copy karke Word ya Google Docs mein paste karo
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}