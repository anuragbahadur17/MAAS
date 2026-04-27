"use client";
import { useState } from "react";
import Link from "next/link";

export default function ExamHelper() {
  const [sawaal, setSawaal] = useState("");
  const [jawab, setJawab] = useState("");
  const [loading, setLoading] = useState(false);

  async function poochho() {
    if (!sawaal.trim()) return;
    setLoading(true);
    setJawab("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Tum ek expert Indian exam teacher ho. Student ne yeh sawaal pucha hai: "${sawaal}". Iska detailed jawab Hindi mein do. Examples ke saath samjhao. SSC, UPSC, Board exams ke liye helpful tarike se likho.`
        }),
      });
      const data = await res.json();
      setJawab(data.result);
    } catch {
      setJawab("Network error. Dobara try karo.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">

      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-orange-500">MAAS</Link>
        <Link href="/" className="text-sm text-gray-500 hover:text-orange-500">← Wapas</Link>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-10">

        {/* Title */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">📚</div>
          <h1 className="text-3xl font-bold text-gray-800">Exam Helper</h1>
          <p className="text-gray-500 mt-2">SSC, UPSC, Board — koi bhi sawaal poochho, Hindi mein jawab pao</p>
        </div>

        {/* Exam Type Buttons */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {["SSC CGL", "UPSC", "Class 10", "Class 12", "Railway", "Police"].map((exam) => (
            <button
              key={exam}
              onClick={() => setSawaal(`${exam} ke liye: `)}
              className="px-4 py-2 bg-white border border-orange-200 text-orange-600 rounded-full text-sm hover:bg-orange-50"
            >
              {exam}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-6 mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Apna Sawaal Likho (Hindi ya English mein)
          </label>
          <textarea
            value={sawaal}
            onChange={(e) => setSawaal(e.target.value)}
            placeholder="Jaise: Bharat ka pehla Prime Minister kaun tha? Ya: What is photosynthesis?"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none"
            rows={3}
          />
          <button
            onClick={poochho}
            disabled={loading || !sawaal.trim()}
            className="mt-3 w-full py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Jawab Dhundh Raha Hoon... ⏳" : "Jawab Batao →"}
          </button>
        </div>

        {/* Answer */}
        {jawab && (
          <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"/>
              <span className="text-sm font-medium text-green-700">Jawab Taiyaar!</span>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{jawab}</p>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => navigator.clipboard.writeText(jawab)}
                className="flex-1 py-2 border border-gray-200 text-gray-600 rounded-xl text-sm hover:bg-gray-50"
              >
                Copy Karo
              </button>
              <button
                onClick={() => { setSawaal(""); setJawab(""); }}
                className="flex-1 py-2 bg-orange-500 text-white rounded-xl text-sm hover:bg-orange-600"
              >
                Naya Sawaal
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}