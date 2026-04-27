'use client';

import { useState } from 'react';
import Link from 'next/link';

const docTypes = [
  { id: 'invoice', icon: '🧾', label: 'GST Invoice', desc: 'Tax invoice banana' },
  { id: 'quotation', icon: '📋', label: 'Quotation', desc: 'Price quote banana' },
  { id: 'receipt', icon: '🏦', label: 'Receipt', desc: 'Payment receipt' },
  { id: 'agreement', icon: '🤝', label: 'Agreement', desc: 'Business agreement' },
  { id: 'letterhead', icon: '📄', label: 'Business Letter', desc: 'Official letter' },
  { id: 'custom', icon: '✏️', label: 'Custom Doc', desc: 'Apna document' },
];

export default function BusinessPage() {
  const [selectedDoc, setSelectedDoc] = useState('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const [form, setForm] = useState({
    businessName: '',
    businessAddress: '',
    gstNumber: '',
    clientName: '',
    clientAddress: '',
    items: '',
    amount: '',
    date: new Date().toLocaleDateString('en-IN'),
    notes: '',
  });

  const update = (field: string, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const generateDoc = async () => {
    if (!form.businessName || !selectedDoc) {
      alert('Business naam aur document type zaroori hai!');
      return;
    }
    setLoading(true);
    setStep(3);

    const docLabel = docTypes.find(d => d.id === selectedDoc)?.label || selectedDoc;

    const prompt = `Tum ek expert Indian business document writer ho. Neeche diye details se ek professional ${docLabel} banao.

Details:
- Document Type: ${docLabel}
- Business Name: ${form.businessName}
- Business Address: ${form.businessAddress}
- GST Number: ${form.gstNumber || 'N/A'}
- Client Name: ${form.clientName}
- Client Address: ${form.clientAddress}
- Items/Services: ${form.items}
- Amount: ${form.amount}
- Date: ${form.date}
- Notes: ${form.notes}

Professional Indian business format use karo. GST invoice ho toh CGST/SGST breakdown karo. Sirf document do.`;

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResult(data.result || 'Error aaya, dobara try karo.');
    } catch {
      setResult('Network error. Dobara try karo.');
    }
    setLoading(false);
  };

  const copyText = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      <header className="bg-white shadow-sm px-6 py-4 flex items-center gap-3">
        <Link href="/dashboard" className="text-gray-400 text-xl">←</Link>
        <span className="text-xl font-bold text-orange-500">MAAS</span>
        <div className="ml-2">
          <h1 className="text-lg font-bold text-gray-800">Business Docs</h1>
          <p className="text-xs text-gray-500">GST invoice, quotation — bilkul free</p>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-8">

        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-1">Kaun sa document chahiye?</h2>
            <p className="text-sm text-gray-500 mb-6">Document type choose karo</p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {docTypes.map(d => (
                <button key={d.id} onClick={() => setSelectedDoc(d.id)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    selectedDoc === d.id ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200 bg-white hover:border-yellow-300'}`}>
                  <div className="text-2xl mb-2">{d.icon}</div>
                  <div className="font-semibold text-gray-800 text-sm">{d.label}</div>
                  <div className="text-xs text-gray-500 mt-1">{d.desc}</div>
                </button>
              ))}
            </div>
            <button onClick={() => { if (!selectedDoc) { alert('Document type choose karo!'); return; } setStep(2); }}
              className="w-full bg-yellow-500 text-white py-3 rounded-full font-semibold hover:bg-yellow-600 transition-colors">
              Aage Badho →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-yellow-100">
            <h2 className="text-lg font-bold text-gray-800 mb-1">Business Details</h2>
            <p className="text-sm text-gray-500 mb-5">Apne business ki details bharo</p>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Business Name *</label>
                <input value={form.businessName} onChange={e => update('businessName', e.target.value)}
                  placeholder="Ram Traders, Sharma Enterprises"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-400"/>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Business Address</label>
                <input value={form.businessAddress} onChange={e => update('businessAddress', e.target.value)}
                  placeholder="Shop No. 5, Main Market, Delhi"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-400"/>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">GST Number (optional)</label>
                <input value={form.gstNumber} onChange={e => update('gstNumber', e.target.value)}
                  placeholder="07AAAAA0000A1Z5"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-400"/>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Client Name</label>
                  <input value={form.clientName} onChange={e => update('clientName', e.target.value)}
                    placeholder="Client ka naam"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-400"/>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Client Address</label>
                  <input value={form.clientAddress} onChange={e => update('clientAddress', e.target.value)}
                    placeholder="Client ka pata"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-400"/>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Items / Services</label>
                <textarea value={form.items} onChange={e => update('items', e.target.value)}
                  placeholder="1. Web Design - 5000&#10;2. Logo - 2000" rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-400 resize-none"/>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Total Amount</label>
                  <input value={form.amount} onChange={e => update('amount', e.target.value)}
                    placeholder="8000"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-400"/>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Date</label>
                  <input value={form.date} onChange={e => update('date', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-400"/>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Extra Notes</label>
                <textarea value={form.notes} onChange={e => update('notes', e.target.value)}
                  placeholder="Payment terms, bank details..." rows={2}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-yellow-400 resize-none"/>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setStep(1)}
                className="flex-1 border border-gray-300 text-gray-600 py-3 rounded-full font-semibold hover:bg-gray-50">
                Wapas
              </button>
              <button onClick={generateDoc}
                className="flex-1 bg-yellow-500 text-white py-3 rounded-full font-semibold hover:bg-yellow-600">
                Document Banao!
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-yellow-100">
            {loading ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 border-4 border-yellow-200 border-t-yellow-500 rounded-full animate-spin mx-auto mb-4"/>
                <p className="text-gray-600 font-medium">AI aapka document bana raha hai...</p>
                <p className="text-gray-400 text-sm mt-2">Bas 30 second rukiye ☕</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-800">Document Taiyaar!</h2>
                  <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">AI Generated</span>
                </div>
                <pre className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 whitespace-pre-wrap font-mono max-h-96 overflow-y-auto border border-gray-100 mb-4">
                  {result}
                </pre>
                <div className="flex gap-3">
                  <button onClick={copyText}
                    className={`flex-1 py-3 rounded-full font-semibold transition-colors ${
                      copied ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white hover:bg-yellow-600'}`}>
                    {copied ? 'Copied!' : 'Copy Document'}
                  </button>
                  <button onClick={() => { setStep(1); setResult(''); setSelectedDoc(''); }}
                    className="flex-1 border border-gray-300 text-gray-600 py-3 rounded-full font-semibold hover:bg-gray-50">
                    Naya Document
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