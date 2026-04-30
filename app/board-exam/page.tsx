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

const languages = [
  { id: 'hindi', label: '🇮🇳 Hindi', desc: 'हिंदी में' },
  { id: 'english', label: '🇬🇧 English', desc: 'In English' },
  { id: 'urdu', label: '🕌 Urdu', desc: 'اردو میں' },
  { id: 'bengali', label: '🌸 Bengali', desc: 'বাংলায়' },
  { id: 'tamil', label: '🌺 Tamil', desc: 'தமிழில்' },
  { id: 'telugu', label: '🌻 Telugu', desc: 'తెలుగులో' },
  { id: 'marathi', label: '🦁 Marathi', desc: 'मराठीत' },
  { id: 'gujarati', label: '🎨 Gujarati', desc: 'ગુજરાતીમાં' },
];

const subjects10 = [
  { id: 'math', label: '📢 Mathematics' },
  { id: 'science', label: '🔬 Science' },
  { id: 'social', label: '🌍 Social Science' },
  { id: 'history', label: '📛 History' },
  { id: 'economics', label: '💹 Economics' },
  { id: 'english', label: '📤 English' },
  { id: 'hindi', label: '📝 Hindi' },
  { id: 'polscience', label: '📝 Pol. Science' },
];

const subjects12 = [
  { id: 'math', label: '📢 Mathematics' },
  { id: 'physics', label: '⚡ Physics' },
  { id: 'chemistry', label: '🧪 Chemistry' },
  { id: 'biology', label: '🌱 Biology' },
  { id: 'history', label: '📛 History' },
  { id: 'economics', label: '💹 Economics' },
  { id: 'accountancy', label: '📊 Accountancy' },
  { id: 'english', label: '📤 English' },
  { id: 'hindi', label: '📝 Hindi' },
  { id: 'polscience', label: '📝 Pol. Science' },
];

const modes = [
  { id: 'topics', icon: '📌', label: 'Important Topics', desc: 'Kya padhna hai — kya nahi' },
  { id: 'paper', icon: '📝', label: 'Practice Paper', desc: 'Full practice paper banao' },
  { id: 'pattern', icon: '📊', label: '10 Year Pattern', desc: 'Kaunse topics zyada aate hain' },
  { id: 'chat', icon: '💬', label: 'Doubt Clear Karo', desc: 'Koi bhi sawaal poochho' },
];

const langInstructions: Record<string, string> = {
  hindi: 'Poora jawab SIRF Hindi mein do. Koi English mat use karo.',
  english: 'Answer ONLY in English. Do not use any other language.',
  urdu: 'پورا جواب صرف اردو میں دو۔',
  bengali: 'সম্পূর্ণ উত্তর শুধুমাত্র বাংলায় দাও।',
  tamil: 'முழு பதிலையும் தமிழில் மட்டும் கொடு.',
  telugu: 'మొత్తం సమాధానం తెలుగులో మాత్రమే ఇవ్వు.',
  marathi: 'संपूर्ण उत्तर फक्त मराठीत द्या.',
  gujarati: 'સંપૂર્ણ જવાબ માત્ર ગુજરાતીમાં આપો.',
};

type Message = { role: 'user' | 'ai'; text: string };
type Note = { tag: string; text: string };

export default function BoardExamPage() {
  const [board, setBoard] = useState('');
  const [cls, setCls] = useState('');
  const [subject, setSubject] = useState('');
  const [language, setLanguage] = useState('hindi');
  const [mode, setMode] = useState('');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [paper, setPaper] = useState('');
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [step, setStep] = useState(1);
  const [copied, setCopied] = useState(false);

  const subjects = cls === '10' ? subjects10 : subjects12;
  const langInstruction = langInstructions[language] || langInstructions['hindi'];

  const resetMode = () => {
    setMode('');
    setMessages([]);
    setNotes([]);
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

  const textToNotes = (text: string): Note[] => {
    const lines = text.split('\n').filter((l: string) => l.trim());
    const notesList: Note[] = [];
    let currentTag = '';
    let currentText = '';
    for (const line of lines) {
      if (line.match(/^#+\s/) || line.match(/^\*\*.*\*\*$/) || line.endsWith(':')) {
        if (currentTag && currentText) {
          notesList.push({ tag: currentTag, text: currentText.trim() });
        }
        currentTag = line.replace(/^#+\s/, '').replace(/\*\*/g, '').replace(/:$/, '').trim();
        currentText = '';
      } else {
        currentText += line + '\n';
      }
    }
    if (currentTag && currentText) {
      notesList.push({ tag: currentTag, text: currentText.trim() });
    }
    if (notesList.length === 0) {
      notesList.push({ tag: 'Notes', text: text });
    }
    return notesList;
  };

  const handleCopy = (text: string) => {
    const allText = notes.length > 0
      ? notes.map((n: Note) => `${n.tag}\n${n.text}`).join('\n\n')
      : text;
    navigator.clipboard.writeText(allText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    const printContent = notes.length > 0
      ? notes.map((n: Note) => `<h3>${n.tag}</h3><p>${n.text.replace(/\n/g, '<br/>')}</p>`).join('')
      : messages.map((m: Message) => `<p>${m.text.replace(/\n/g, '<br/>')}</p>`).join('');
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(`
      <html><head><title>Board Exam Notes - MAAS Studio</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 30px; max-width: 800px; margin: 0 auto; }
        h1 { color: #dc2626; border-bottom: 2px solid #dc2626; padding-bottom: 10px; }
        h3 { color: #1d4ed8; background: #eff6ff; padding: 8px 12px; border-radius: 6px; }
        p { line-height: 1.8; color: #374151; }
        .meta { color: #6b7280; font-size: 14px; margin-bottom: 20px; }
      </style></head>
      <body>
        <h1>📚 Board Exam Notes</h1>
        <div class="meta">Board: ${board.toUpperCase()} | Class: ${cls} | Subject: ${subject} | Language: ${language}</div>
        ${printContent}
        <script>window.onload = function(){ window.print(); }</script>
      </body></html>
    `);
    win.document.close();
  };

  const getTopics = async () => {
    setLoading(true);
    setMode('topics');
    setNotes([]);
    const prompt = `${langInstruction}
Tum ek expert ${board.toUpperCase()} board teacher ho. Class: ${cls}, Subject: ${subject}.
Top 10 important topics do jo exam mein zaroor aate hain.
Har topic ke liye: topic name, kyu important hai, kaise likhna hai.
Writing tips, common mistakes, aur last minute tips bhi do.
Notes format mein headings ke saath do.`;
    const result = await callAI(prompt);
    const parsedNotes = textToNotes(result);
    setNotes(parsedNotes);
    setMessages([{ role: 'ai', text: result }]);
    setLoading(false);
  };

  const generatePaper = async () => {
    setLoading(true);
    setMode('paper');
    const prompt = `${langInstruction}
Tum ek expert ${board.toUpperCase()} board examiner ho. Class: ${cls}, Subject: ${subject}.
Ek complete practice paper banao — ${cls === '10' ? '80' : '70'} marks, 3 hours.
Section A: MCQ (20 marks)
Section B: Short Answer (30 marks)
Section C: Long Answer (${cls === '10' ? '30' : '20'} marks)
Real board exam jaisa format rakho.`;
    const result = await callAI(prompt);
    setPaper(result);
    setMessages([{ role: 'ai', text: result }]);
    setLoading(false);
  };

  const analyzeAnswer = async () => {
    if (!answer.trim()) { alert('Pehle apna jawab likho!'); return; }
    setLoading(true);
    const prompt = `${langInstruction}
Tum ek ${board.toUpperCase()} board examiner ho. Class: ${cls}, Subject: ${subject}.
Student ka jawab: "${answer}"
Ye do:
1. Marks estimate (out of 10)
2. Kya acha likha
3. Kya improve karo
4. Better answer example
Friendly tone mein do.`;
    const result = await callAI(prompt);
    setFeedback(result);
    setLoading(false);
  };

  const getPattern = async () => {
    setLoading(true);
    setMode('pattern');
    setNotes([]);
    const prompt = `${langInstruction}
Tum ek ${board.toUpperCase()} board expert ho. Class: ${cls}, Subject: ${subject}.
Pichle 10 saal ka pattern analysis do:
1. Most repeated topics (year wise)
2. Important questions jo baar baar aate hain
3. 2025 prediction
4. Topper strategy
5. Time management tips
Headings ke saath structured format mein do.`;
    const result = await callAI(prompt);
    const parsedNotes = textToNotes(result);
    setNotes(parsedNotes);
    setMessages([{ role: 'ai', text: result }]);
    setLoading(false);
  };

  const askDoubt = async () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    const prompt = `${langInstruction}
Tum ek ${board.toUpperCase()} Class ${cls} ${subject} teacher ho.
Student ka sawaal: "${input}"
Simple language mein step by step samjhao.
Real life example do.
Exam mein kaise likhna hai bhi batao.`;
    const result = await callAI(prompt);
    setMessages(prev => [...prev, { role: 'ai', text: result }]);
    setLoading(false);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); askDoubt(); }
  };

  const allText = notes.length > 0
    ? notes.map((n: Note) => `${n.tag}\n${n.text}`).join('\n\n')
    : messages.filter((m: Message) => m.role === 'ai').map((m: Message) => m.text).join('\n\n');

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <header className="bg-white shadow-sm px-6 py-4 flex items-center gap-3">
        <Link href="/dashboard" className="text-gray-400 text-xl">←</Link>
        <div>
          <h1 className="text-xl font-bold text-gray-800">🎓 Board Exam Prep</h1>
          <p className="text-xs text-gray-500">AI se padho, board mein top karo</p>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6">

        {step >= 1 && (
          <div className="mb-6">
            <h2 className="font-bold text-gray-700 mb-3">1️⃣ Apna Board Chuno</h2>
            <div className="grid grid-cols-4 gap-2">
              {boards.map(b => (
                <button key={b.id} onClick={() => { setBoard(b.id); setStep(2); }}
                  className={`py-2 px-3 rounded-xl text-white text-sm font-semibold transition-all ${b.color} ${board === b.id ? 'ring-2 ring-offset-2 ring-gray-400 scale-105' : 'opacity-80 hover:opacity-100'}`}>
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step >= 2 && board && (
          <div className="mb-6">
            <h2 className="font-bold text-gray-700 mb-3">2️⃣ Class Chuno</h2>
            <div className="grid grid-cols-2 gap-3">
              {classes.map(c => (
                <button key={c.id} onClick={() => { setCls(c.id); setStep(3); }}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${cls === c.id ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-red-300'}`}>
                  <div className="font-bold text-gray-800">{c.label}</div>
                  <div className="text-xs text-gray-500">{c.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step >= 3 && cls && (
          <div className="mb-6">
            <h2 className="font-bold text-gray-700 mb-3">3️⃣ Subject Chuno</h2>
            <div className="grid grid-cols-2 gap-2">
              {subjects.map(s => (
                <button key={s.id + s.label} onClick={() => { setSubject(s.label); setStep(4); }}
                  className={`p-3 rounded-xl border-2 text-left text-sm transition-all ${subject === s.label ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-red-300'}`}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step >= 4 && subject && (
          <div className="mb-6">
            <h2 className="font-bold text-gray-700 mb-3">4️⃣ Language Chuno 🌐</h2>
            <div className="grid grid-cols-4 gap-2">
              {languages.map(l => (
                <button key={l.id} onClick={() => { setLanguage(l.id); setStep(5); }}
                  className={`p-3 rounded-xl border-2 text-center transition-all ${language === l.id ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-red-300'}`}>
                  <div className="text-lg">{l.label.split(' ')[0]}</div>
                  <div className="text-xs font-semibold text-gray-700">{l.label.split(' ')[1]}</div>
                  <div className="text-xs text-gray-400">{l.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step >= 5 && language && (
          <div className="mb-6">
            <h2 className="font-bold text-gray-700 mb-3">5️⃣ Kya Karna Hai?</h2>
            <div className="grid grid-cols-2 gap-3">
              {modes.map(m => (
                <button key={m.id} onClick={() => {
                  resetMode();
                  if (m.id === 'topics') getTopics();
                  else if (m.id === 'paper') generatePaper();
                  else if (m.id === 'pattern') getPattern();
                  else if (m.id === 'chat') setMode('chat');
                }}
                  className="p-4 rounded-xl border-2 border-gray-200 hover:border-red-300 text-left transition-all hover:bg-red-50">
                  <div className="text-2xl mb-1">{m.icon}</div>
                  <div className="font-bold text-gray-800 text-sm">{m.label}</div>
                  <div className="text-xs text-gray-500">{m.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div className="text-center py-10">
            <div className="w-14 h-14 border-4 border-red-200 border-t-red-500 rounded-full animate-spin mx-auto mb-4"/>
            <p className="text-gray-500">AI soch raha hai... 🤔</p>
          </div>
        )}

        {!loading && notes.length > 0 && (
          <div className="mt-4">
            <div className="flex gap-2 mb-4">
              <button onClick={() => handleCopy(allText)}
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-xl font-semibold hover:bg-blue-600 transition-colors text-sm">
                {copied ? '✅ Copied!' : '📋 Copy Notes'}
              </button>
              <button onClick={handlePrint}
                className="flex-1 bg-green-500 text-white py-2 px-4 rounded-xl font-semibold hover:bg-green-600 transition-colors text-sm">
                🖨️ Print Notes
              </button>
            </div>
            {notes.map((note, i) => (
              <div key={i} className="mb-3 bg-white border border-blue-100 rounded-2xl p-4 shadow-sm">
                <div className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-2">
                  {note.tag}
                </div>
                <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{note.text}</p>
              </div>
            ))}
          </div>
        )}

        {!loading && mode === 'paper' && paper && (
          <div className="mt-4">
            <div className="flex gap-2 mb-4">
              <button onClick={() => handleCopy(paper)}
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-xl font-semibold hover:bg-blue-600 text-sm">
                {copied ? '✅ Copied!' : '📋 Copy Paper'}
              </button>
              <button onClick={handlePrint}
                className="flex-1 bg-green-500 text-white py-2 px-4 rounded-xl font-semibold hover:bg-green-600 text-sm">
                🖨️ Print Paper
              </button>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">{paper}</pre>
            </div>
            <div className="mt-4">
              <h3 className="font-bold text-gray-700 mb-2">✍️ Apna Jawab Yahan Likho</h3>
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

        {!loading && mode === 'chat' && (
          <div className="mt-4">
            {messages.length > 0 && (
              <div className="mb-4">
                <div className="flex gap-2 mb-3">
                  <button onClick={() => handleCopy(allText)}
                    className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-xl font-semibold hover:bg-blue-600 text-sm">
                    {copied ? '✅ Copied!' : '📋 Copy'}
                  </button>
                  <button onClick={handlePrint}
                    className="flex-1 bg-green-500 text-white py-2 px-4 rounded-xl font-semibold hover:bg-green-600 text-sm">
                    🖨️ Print
                  </button>
                </div>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {messages.map((msg, i) => (
                    <div key={i} className={`p-4 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-red-50 text-right' : 'bg-white border border-gray-200'}`}>
                      <pre className="whitespace-pre-wrap font-sans">{msg.text}</pre>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex gap-2">
              <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey}
                placeholder="Apna doubt yahan likho... (Enter to send)"
                rows={3} className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-400 resize-none"/>
              <button onClick={askDoubt} disabled={loading || !input.trim()}
                className="bg-red-500 text-white px-4 rounded-xl font-semibold hover:bg-red-600 disabled:opacity-50">
                ➤
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}