'use client';

import { useState } from 'react';
import Link from 'next/link';

const boards = [
  { id: 'cbse', label: 'CBSE', color: 'bg-blue-500' },
  { id: 'icse', label: 'ICSE', color: 'bg-green-500' },
  { id: 'up', label: 'UP Board', color: 'bg-orange-500' },
  { id: 'mp', label: 'MP Board', color: 'bg-purple-500' },
  { id: 'bihar', label: 'Bihar Board', color: 'bg-red-500' },
  { id: 'rajasthan', label: 'Rajasthan Board', color: 'bg-pink-500' },
  { id: 'maharashtra', label: 'Maharashtra Board', color: 'bg-yellow-500' },
  { id: 'other', label: 'Other State', color: 'bg-gray-500' },
];

const classes = [
  { id: '10', label: 'Class 10', desc: 'Matric / SSC' },
  { id: '12', label: 'Class 12', desc: 'Inter / HSC' },
];

const subjects10 = [
  { id: 'math', label: '🔢 Mathematics' },
  { id: 'science', label: '🔬 Science' },
  { id: 'social', label: '🌍 Social Science' },
  { id: 'hindi', label: '📝 Hindi' },
  { id: 'english', label: '🔤 English' },
  { id: 'sanskrit', label: '📖 Sanskrit' },
];

const subjects12 = [
  { id: 'physics', label: '⚡ Physics' },
  { id: 'chemistry', label: '🧪 Chemistry' },
  { id: 'math', label: '🔢 Mathematics' },
  { id: 'biology', label: '🌿 Biology' },
  { id: 'history', label: '🏛️ History' },
  { id: 'economics', label: '💹 Economics' },
  { id: 'accountancy', label: '📊 Accountancy' },
  { id: 'english', label: '🔤 English' },
  { id: 'hindi', label: '📝 Hindi' },
  { id: 'polscience', label: '🗳️ Pol. Science' },
];

const modes = [
  { id: 'topics', icon: '📌', label: 'Important Topics', desc: 'Kya padhna hai — kya nahi' },
  { id: 'paper', icon: '📝', label: 'Practice Paper', desc: 'AI paper generate kare' },
  { id: 'analyze', icon: '🔍', label: 'Answer Analysis', desc: 'Apna answer submit karo' },
  { id: 'pattern', icon: '📊', label: '10 Year Pattern', desc: 'Kaunse topics zyada aate hain' },
  { id: 'chat', icon: '💬', label: 'Doubt Clear Karo', desc: 'Koi bhi sawaal poochho' },
];

type Message = { role: 'user' | 'ai'; text: string };

export default function BoardExamPage() {
  const [board, setBoard] = useState('');
  const [cls, setCls] = useState('');
  const [subject, setSubject] = useState('');
  const [mode, setMode] = useState('');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [paper, setPaper] = useState('');
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [step, setStep] = useState(1);

  const subjects = cls === '10' ? subjects10 : subjects12;

  const resetMode = () => {
    setMode('');
    setMessages([]);
    setPaper('');
    setAnswer('');
    setFeedback('');
    setInput('');
  };

  const callAI = async (prompt: string): Promise<string> => {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    return data.result || 'Error aaya, dobara try karo.';
  };

  const getTopics = async () => {
    setLoading(true);
    setMode('topics');
    const prompt = `Tum ek expert ${board.toUpperCase()} board teacher ho. Class: ${cls}, Subject: ${subject}, Board: ${board.toUpperCase()}. Top 10 important topics, writing tips, common mistakes, aur last minute tips Hindi mein do.`;
    const result = await callAI(prompt);
    setMessages([{ role: 'ai', text: result }]);
    setLoading(false);
  };

  const generatePaper = async () => {
    setLoading(true);
    setMode('paper');
    const prompt = `Tum ek expert ${board.toUpperCase()} board examiner ho. Class: ${cls}, Subject: ${subject}. Ek complete practice paper banao — ${cls === '10' ? '80' : '70'} marks, 3 hours, Section A MCQ, Section B Short, Section C Long. Hindi mein banao.`;
    const result = await callAI(prompt);
    setPaper(result);
    setMessages([{ role: 'ai', text: 'Practice paper taiyaar hai! Jawab likhne ke baad submit karo.' }]);
    setLoading(false);
  };

  const analyzeAnswer = async () => {
    if (!answer.trim()) { alert('Pehle apna jawab likho!'); return; }
    setLoading(true);
    const prompt = `Tum ek ${board.toUpperCase()} board examiner ho. Class: ${cls}, Subject: ${subject}. Student ka jawab: "${answer}". Marks estimate, kya acha likha, kya improve karo, better answer example — Hindi mein friendly tone mein do.`;
    const result = await callAI(prompt);
    setFeedback(result);
    setLoading(false);
  };

  const getPattern = async () => {
    setLoading(true);
    setMode('pattern');
    const prompt = `Tum ek ${board.toUpperCase()} board expert ho. Class: ${cls}, Subject: ${subject}. Pichle 10 saal ka pattern analysis, most repeated questions, 2025 prediction, topper strategy — Hindi mein do.`;
    const result = await callAI(prompt);
    setMessages([{ role: 'ai', text: result }]);
    setLoading(false);
  };

  const askDoubt = async () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    const prompt = `Tum ek ${board.toUpperCase()} Class ${cls} ${subject} teacher ho. Student ka sawaal: "${input}". Simple Hindi mein step by step samjhao, real life example do, exam mein kaise likhna hai bhi batao.`;
    const result = await callAI(prompt);
    setMessages(prev => [...prev, { role: 'ai', text: result }]);
    setLoading(false);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); askDoubt(); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <header className="bg-white shadow-sm px-6 py-4 flex items-center gap-3">
        <Link href="/dashboard" className="text-gray-400 text-xl">←</Link>
        <span className="text-xl font-bold text-orange-500">MAAS</span>
        <div className="ml-2">
          <h1 className="text-lg font-bold text-gray-800">Board Exam Prep</h1>
          <p className="text-xs text-gray-500">Class 10 & 12 — Sab Boards — AI Teacher</p>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6">

        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-1">Apna Board Choose Karo</h2>
            <p className="text-sm text-gray-500 mb-5">Kaunse board se ho aap?</p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {boards.map(b => (
                <button key={b.id} onClick={() => { setBoard(b.id); setStep(2); }}
                  className={`p-4 rounded-2xl text-white font-bold text-lg ${b.color} hover:opacity-90 transition-all shadow-sm`}>
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <button onClick={() => setStep(1)} className="text-gray-400 text-sm mb-4 flex items-center gap-1">← Wapas</button>
            <h2 className="text-xl font-bold text-gray-800 mb-1">Class Choose Karo</h2>
            <p className="text-sm text-gray-500 mb-5">{board.toUpperCase()} Board — Konsi class?</p>
            <div className="grid grid-cols-2 gap-4">
              {classes.map(c => (
                <button key={c.id} onClick={() => { setCls(c.id); setStep(3); }}
                  className="p-6 rounded-2xl border-2 border-red-200 bg-red-50 hover:bg-red-100 transition-all text-left">
                  <div className="text-3xl font-bold text-red-600 mb-1">{c.label}</div>
                  <div className="text-sm text-gray-500">{c.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <button onClick={() => setStep(2)} className="text-gray-400 text-sm mb-4 flex items-center gap-1">← Wapas</button>
            <h2 className="text-xl font-bold text-gray-800 mb-1">Subject Choose Karo</h2>
            <p className="text-sm text-gray-500 mb-5">{board.toUpperCase()} Board — Class {cls}</p>
            <div className="grid grid-cols-2 gap-3">
              {subjects.map(s => (
                <button key={s.id} onClick={() => { setSubject(s.label); setStep(4); resetMode(); }}
                  className="p-4 rounded-2xl border border-gray-200 bg-white hover:border-red-300 hover:bg-red-50 transition-all text-left font-medium text-gray-700">
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <div className="bg-red-500 text-white rounded-2xl p-4 mb-6 flex items-center justify-between">
              <div>
                <div className="font-bold text-lg">{subject}</div>
                <div className="text-red-100 text-sm">{board.toUpperCase()} Board • Class {cls}</div>
              </div>
              <button onClick={() => { setStep(1); setBoard(''); setCls(''); setSubject(''); resetMode(); }}
                className="text-red-200 text-sm hover:text-white">Badlo ✕</button>
            </div>

            {!mode && (
              <div>
                <h2 className="text-lg font-bold text-gray-800 mb-4">Kya karna chahte ho?</h2>
                <div className="space-y-3">
                  {modes.map(m => (
                    <button key={m.id} onClick={() => {
                      if (m.id === 'topics') getTopics();
                      else if (m.id === 'paper') generatePaper();
                      else if (m.id === 'pattern') getPattern();
                      else if (m.id === 'analyze') setMode('analyze');
                      else if (m.id === 'chat') setMode('chat');
                    }}
                      className="w-full p-4 rounded-2xl border border-gray-200 bg-white hover:border-red-300 hover:bg-red-50 transition-all text-left flex items-center gap-4">
                      <span className="text-3xl">{m.icon}</span>
                      <div>
                        <div className="font-bold text-gray-800">{m.label}</div>
                        <div className="text-sm text-gray-500">{m.desc}</div>
                      </div>
                      <span className="ml-auto text-gray-300">›</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {(mode === 'topics' || mode === 'pattern' || mode === 'chat') && (
              <div>
                <button onClick={resetMode} className="text-gray-400 text-sm mb-4 flex items-center gap-1">← Wapas</button>
                <div className="space-y-4 mb-4">
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-full px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap ${
                        msg.role === 'user' ? 'bg-red-500 text-white' : 'bg-white border border-gray-100 text-gray-700 shadow-sm'}`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl shadow-sm">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce"/>
                          <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{animationDelay:'0.1s'}}/>
                          <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{animationDelay:'0.2s'}}/>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {mode === 'chat' && (
                  <div className="flex gap-3 items-end mt-4">
                    <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey}
                      placeholder="Koi bhi doubt poochho..." rows={2}
                      className="flex-1 border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-red-400 resize-none"/>
                    <button onClick={askDoubt} disabled={loading || !input.trim()}
                      className="bg-red-500 text-white px-5 py-3 rounded-2xl font-semibold hover:bg-red-600 disabled:opacity-50">
                      Poochho
                    </button>
                  </div>
                )}
              </div>
            )}

            {mode === 'paper' && (
              <div>
                <button onClick={resetMode} className="text-gray-400 text-sm mb-4 flex items-center gap-1">← Wapas</button>
                {messages.length > 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-4 text-sm text-green-700">
                    {messages[0].text}
                  </div>
                )}
                {loading && (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 border-4 border-red-200 border-t-red-500 rounded-full animate-spin mx-auto mb-3"/>
                    <p className="text-gray-500 text-sm">AI paper bana raha hai...</p>
                  </div>
                )}
                {paper && (
                  <div>
                    <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-4">
                      <h3 className="font-bold text-gray-800 mb-3">📝 Practice Paper</h3>
                      <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">{paper}</pre>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-2xl p-5">
                      <h3 className="font-bold text-gray-800 mb-3">✍️ Apna Jawab Yahan Likho</h3>
                      <textarea value={answer} onChange={e => setAnswer(e.target.value)}
                        placeholder="Yahan apna jawab likho..." rows={8}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-400 resize-none"/>
                      <button onClick={analyzeAnswer} disabled={loading || !answer.trim()}
                        className="w-full mt-3 bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 disabled:opacity-50 transition-colors">
                        {loading ? 'Analysis ho rahi hai...' : '🔍 Answer Submit Karo'}
                      </button>
                    </div>
                    {feedback && (
                      <div className="mt-4 bg-white border border-green-200 rounded-2xl p-5">
                        <h3 className="font-bold text-green-700 mb-3">✅ AI Feedback</h3>
                        <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">{feedback}</pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {mode === 'analyze' && !paper && (
              <div>
                <button onClick={resetMode} className="text-gray-400 text-sm mb-4 flex items-center gap-1">← Wapas</button>
                <h3 className="font-bold text-gray-800 mb-3">✍️ Apna Answer Paste Karo</h3>
                <textarea value={answer} onChange={e => setAnswer(e.target.value)}
                  placeholder="Yahan apna jawab paste karo..." rows={10}
                  className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-red-400 resize-none mb-4"/>
                <button onClick={analyzeAnswer} disabled={loading || !answer.trim()}
                  className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 disabled:opacity-50">
                  {loading ? 'Analysis ho rahi hai...' : '🔍 AI Analysis Lo'}
                </button>
                {loading && (
                  <div className="text-center py-6">
                    <div className="w-12 h-12 border-4 border-red-200 border-t-red-500 rounded-full animate-spin mx-auto mb-3"/>
                    <p className="text-gray-500 text-sm">AI analysis kar raha hai...</p>
                  </div>
                )}
                {feedback && (
                  <div className="mt-4 bg-white border border-green-200 rounded-2xl p-5">
                    <h3 className="font-bold text-green-700 mb-3">✅ AI Feedback</h3>
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">{feedback}</pre>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}