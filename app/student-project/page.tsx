'use client';

import { useState } from 'react';
import Link from 'next/link';

type Video = { title: string; videoId: string };
type Note = { tag: string; text: string };

export default function StudentProjectPage() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [projectLoading, setProjectLoading] = useState(false);
  const [videos, setVideos] = useState<Video[]>([]);
  const [activeVideo, setActiveVideo] = useState(0);
  const [notes, setNotes] = useState<Note[]>([]);
  const [editedNotes, setEditedNotes] = useState<Note[]>([]);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');
  const [projectContent, setProjectContent] = useState('');
  const [paperStyle, setPaperStyle] = useState<'lined' | 'plain'>('plain');
  const [showProject, setShowProject] = useState(false);

  const handleSearch = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setSearched(false);
    setError('');
    setNotes([]);
    setVideos([]);
    setEditedNotes([]);
    setProjectContent('');
    setShowProject(false);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: topic, mode: 'student' }),
      });

      if (!res.ok) {
        setError('Server error aaya. Dobara try karo.');
        setLoading(false);
        return;
      }

      const data = await res.json();

      if (data.notes && Array.isArray(data.notes) && data.notes.length > 0) {
        setNotes(data.notes);
        setEditedNotes(data.notes.map((n: Note) => ({ ...n })));
      } else {
        setNotes([{ tag: 'Notes', text: 'Notes generate nahi huye. Dobara try karo.' }]);
        setEditedNotes([{ tag: 'Notes', text: 'Notes generate nahi huye. Dobara try karo.' }]);
      }

      setVideos(data.videos || []);
      setActiveVideo(0);
    } catch {
      setError('Network error. Internet check karo aur dobara try karo.');
    }

    setLoading(false);
    setSearched(true);
  };

  const handleNoteChange = (index: number, newText: string) => {
    setEditedNotes(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], text: newText };
      return updated;
    });
  };

  const generateProject = async () => {
    if (!topic.trim()) return;
    setProjectLoading(true);
    setShowProject(false);

    const prompt = `You are an expert Indian school/college teacher. Create a comprehensive 10-page A4 project report on the topic: "${topic}"

The project must follow standard Indian school/college project format. Write detailed, informative content.

Structure it exactly like this:

PAGE 1 - COVER PAGE
Project Title: ${topic}
Subject: [Relevant Subject]
Submitted by: [Student Name]
Class/Course: [Class]
School/College: [Institution Name]
Academic Year: 2024-2025

PAGE 2 - CERTIFICATE
This is to certify that this project on "${topic}" has been completed by the student under my guidance. The work is original and satisfactory.
Teacher's Signature: _______________
Date: _______________

PAGE 3 - ACKNOWLEDGEMENT
Write a proper acknowledgement of 150 words thanking teachers, parents, and references used.

PAGE 4 - TABLE OF CONTENTS
List all chapters with page numbers.

PAGE 5 - INTRODUCTION
Write a detailed introduction of 400 words about ${topic}, its importance, relevance in India and the world.

PAGE 6 - CHAPTER 1: HISTORY AND BACKGROUND
Write 400 words covering the history, origin, and background of ${topic}.

PAGE 7 - CHAPTER 2: KEY CONCEPTS AND THEORY
Write 400 words explaining the main concepts, theories, and principles related to ${topic}.

PAGE 8 - CHAPTER 3: APPLICATIONS AND IMPORTANCE
Write 400 words on real-world applications and importance of ${topic} especially in Indian context.

PAGE 9 - CONCLUSION AND FUTURE SCOPE
Write 300 words conclusion summarizing findings and future scope.

PAGE 10 - BIBLIOGRAPHY AND REFERENCES
List 10 proper references including books, websites, and journals related to ${topic}.

Write complete, detailed content for each page. Make it suitable for Class 9-12 or college level Indian students.`;

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, mode: 'default' }),
      });

      const data = await res.json();
      setProjectContent(data.result || data.notes || 'Project generate nahi hua. Dobara try karo.');
      setShowProject(true);
    } catch {
      setProjectContent('Error aaya. Dobara try karo.');
      setShowProject(true);
    }

    setProjectLoading(false);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const lineStyle = paperStyle === 'lined'
      ? `body { background-image: repeating-linear-gradient(transparent, transparent 27px, #b3d9ff 27px, #b3d9ff 28px); line-height: 28px; }`
      : '';

    const content = projectContent
      .split('\n')
      .map(line => {
        if (line.startsWith('PAGE ')) return `<h2 style="page-break-before:always;color:#d97706;font-size:18px;margin-top:0;">${line}</h2>`;
        if (line.trim() === '') return '<br/>';
        return `<p>${line}</p>`;
      })
      .join('');

    printWindow.document.write(`
<!DOCTYPE html>
<html>
<head>
  <title>${topic} — Project Report</title>
  <style>
    @page {
      size: A4;
      margin: 2.5cm 2.5cm 2.5cm 3cm;
    }
    * { box-sizing: border-box; }
    body {
      font-family: 'Times New Roman', serif;
      font-size: 12pt;
      color: #000;
      line-height: 1.8;
      ${paperStyle === 'lined' ? "background-image: repeating-linear-gradient(transparent, transparent 27px, #b3d9ff 27px, #b3d9ff 28px);" : ''}
    }
    h1 { font-size: 20pt; text-align: center; margin-bottom: 8px; }
    h2 { font-size: 16pt; color: #d97706; border-bottom: 1px solid #d97706; padding-bottom: 4px; margin-top: 24px; page-break-before: always; }
    h2:first-child { page-break-before: avoid; }
    p { margin: 6px 0; text-align: justify; }
    .cover { text-align: center; padding-top: 80px; }
    .cover h1 { font-size: 28pt; color: #d97706; }
    .cover p { font-size: 14pt; margin: 10px 0; }
    .footer { position: fixed; bottom: 1cm; right: 2.5cm; font-size: 10pt; color: #888; }
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  </style>
</head>
<body>
  <div class="cover">
    <h1>${topic}</h1>
    <p><strong>Project Report</strong></p>
    <p>Academic Year: 2024–2025</p>
    <p style="margin-top:40px;">Prepared using MAAS — AI Project Helper</p>
  </div>
  ${content}
  <div class="footer">MAAS AI Studio | maastudio.in</div>
</body>
</html>`);

    printWindow.document.close();
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 500);
  };

  const handleWordDownload = () => {
    const wordContent = `
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
<meta charset='utf-8'>
<title>${topic} Project</title>
<!--[if gte mso 9]>
<xml><w:WordDocument><w:View>Print</w:View><w:Zoom>90</w:Zoom><w:DoNotOptimizeForBrowser/></w:WordDocument></xml>
<![endif]-->
<style>
  @page { size: 21cm 29.7cm; margin: 2.5cm 2.5cm 2.5cm 3cm; }
  body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.8; color: #000; }
  h1 { font-size: 20pt; text-align: center; }
  h2 { font-size: 16pt; color: #B8860B; border-bottom: 1pt solid #B8860B; page-break-before: always; }
  p { text-align: justify; margin: 6pt 0; }
</style>
</head>
<body>
<h1 style="text-align:center;margin-top:200pt;">${topic}</h1>
<p style="text-align:center;font-size:14pt;">Project Report</p>
<p style="text-align:center;">Academic Year: 2024–2025</p>
<br/><br/>
${projectContent
  .split('\n')
  .map(line => {
    if (line.startsWith('PAGE ')) return `<h2>${line}</h2>`;
    if (line.trim() === '') return '<br/>';
    return `<p>${line}</p>`;
  })
  .join('\n')}
</body>
</html>`;

    const blob = new Blob([wordContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${topic.replace(/\s+/g, '_')}_Project.doc`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">

      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 flex items-center gap-3">
        <Link href="/dashboard" className="text-orange-500 text-xl">←</Link>
        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">M</div>
        <div>
          <h1 className="text-lg font-bold text-gray-800">Student Project Helper</h1>
          <p className="text-xs text-gray-500">Topic daalo — YouTube + Notes + Project File</p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-6">

        {/* Search Bar */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={topic}
            onChange={e => setTopic(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !loading && handleSearch()}
            placeholder="Topic likho... jaise 'Photosynthesis', 'French Revolution', 'Python loops'"
            className="flex-1 border border-gray-200 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-orange-400"
          />
          <button
            onClick={handleSearch}
            disabled={loading || !topic.trim()}
            className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 disabled:opacity-50 transition-colors whitespace-nowrap"
          >
            {loading ? 'Dhundh raha hai...' : 'Dhundho 🔍'}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-2xl px-5 py-3 mb-4">
            ⚠️ {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-16">
            <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500 text-sm">YouTube videos + AI Notes bana raha hai...</p>
            <p className="text-gray-400 text-xs mt-1">10-15 seconds lag sakte hain</p>
          </div>
        )}

        {/* Results */}
        {searched && !loading && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">

              {/* LEFT: YouTube */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
                  <span className="text-red-500">▶</span>
                  <span className="font-bold text-gray-800 text-sm">YouTube Videos</span>
                  <span className="ml-auto bg-red-50 text-red-500 text-xs px-2 py-0.5 rounded-full font-medium">
                    {videos.length} videos
                  </span>
                </div>

                {videos.length > 0 && videos[activeVideo] ? (
                  <div className="aspect-video bg-black">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${videos[activeVideo].videoId}?autoplay=0`}
                      title={videos[activeVideo].title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-gray-100 flex flex-col items-center justify-center gap-2">
                    <span className="text-4xl">📺</span>
                    <p className="text-sm text-gray-400">Videos nahi mile</p>
                  </div>
                )}

                <div className="p-3 space-y-2">
                  {videos.map((v, i) => (
                    <button
                      key={`${v.videoId}-${i}`}
                      onClick={() => setActiveVideo(i)}
                      className={`w-full flex items-start gap-3 p-2 rounded-xl text-left transition-all ${
                        i === activeVideo
                          ? 'bg-orange-50 border border-orange-200'
                          : 'hover:bg-gray-50 border border-transparent'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                        i === activeVideo ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'
                      }`}>{i + 1}</span>
                      <span className="text-xs text-gray-700 leading-relaxed line-clamp-2">{v.title}</span>
                    </button>
                  ))}
                  {videos.length === 0 && (
                    <p className="text-sm text-gray-400 text-center py-3">
                      Dusra keyword try karo ya English mein likhke dekhao
                    </p>
                  )}
                </div>
              </div>

              {/* RIGHT: Editable Notes */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
                  <span className="text-orange-500">✎</span>
                  <span className="font-bold text-gray-800 text-sm">Editable Notes</span>
                  <span className="ml-auto bg-orange-50 text-orange-500 text-xs px-2 py-0.5 rounded-full font-medium">AI Generated</span>
                </div>

                <div className="p-4 space-y-4 overflow-y-auto max-h-[480px]">
                  {editedNotes.map((note, i) => (
                    <div key={i}>
                      <div className="text-xs font-semibold text-orange-500 uppercase tracking-wide mb-1">{note.tag}</div>
                      <textarea
                        value={note.text}
                        onChange={e => handleNoteChange(i, e.target.value)}
                        rows={4}
                        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-orange-400 resize-none leading-relaxed bg-gray-50 focus:bg-white transition-colors"
                      />
                    </div>
                  ))}
                  {editedNotes.length === 0 && (
                    <p className="text-sm text-gray-400 text-center py-8">Notes load nahi huye. Dobara search karo.</p>
                  )}
                </div>
              </div>
            </div>

            {/* PROJECT FILE SECTION */}
            <div className="bg-white rounded-2xl border border-orange-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-orange-100 flex items-center gap-2">
                <span className="text-2xl">📁</span>
                <div>
                  <div className="font-bold text-gray-800">Project File Generator</div>
                  <div className="text-xs text-gray-500">10-page A4 Indian standard project — download ya print karo</div>
                </div>
              </div>

              <div className="p-5">
                {/* Paper Style */}
                <div className="flex gap-3 mb-4">
                  <div className="text-sm font-medium text-gray-700 mr-2 mt-1">Sheet style:</div>
                  <button
                    onClick={() => setPaperStyle('plain')}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                      paperStyle === 'plain'
                        ? 'bg-orange-500 text-white border-orange-500'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300'
                    }`}
                  >
                    📄 Plain Sheet
                  </button>
                  <button
                    onClick={() => setPaperStyle('lined')}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                      paperStyle === 'lined'
                        ? 'bg-orange-500 text-white border-orange-500'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300'
                    }`}
                  >
                    📋 Lined Sheet
                  </button>
                </div>

                {/* Generate Button */}
                {!showProject && (
                  <button
                    onClick={generateProject}
                    disabled={projectLoading}
                    className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                  >
                    {projectLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        10-page project bana raha hai... (30-40 sec)
                      </>
                    ) : (
                      '📁 10-Page Project File Banao'
                    )}
                  </button>
                )}

                {/* Project Preview + Actions */}
                {showProject && projectContent && (
                  <div>
                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 mb-4">
                      <button
                        onClick={handleWordDownload}
                        className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-sm"
                      >
                        📥 Word mein Download karo (.doc)
                      </button>
                      <button
                        onClick={handlePrint}
                        className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-green-700 transition-colors text-sm"
                      >
                        🖨️ Print / PDF Save karo
                      </button>
                      <button
                        onClick={() => { setShowProject(false); setProjectContent(''); }}
                        className="flex items-center gap-2 bg-gray-100 text-gray-600 px-5 py-2.5 rounded-xl font-semibold hover:bg-gray-200 transition-colors text-sm"
                      >
                        🔄 Dobara Banao
                      </button>
                    </div>

                    {/* Word mein paste karne ka instruction */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4 text-sm text-blue-800">
                      <div className="font-bold mb-1">📋 Word mein paste kaise karo:</div>
                      <ol className="list-decimal list-inside space-y-1 text-xs">
                        <li>Neeche content select karo (Ctrl+A)</li>
                        <li>Copy karo (Ctrl+C)</li>
                        <li>Microsoft Word kholo → New Document</li>
                        <li>Page Layout → A4 set karo</li>
                        <li>Paste karo (Ctrl+V)</li>
                        <li>Font: Times New Roman, Size: 12</li>
                        <li>Save as .docx</li>
                      </ol>
                    </div>

                    {/* Content Preview */}
                    <div className={`border border-gray-200 rounded-xl p-6 overflow-y-auto max-h-[600px] text-sm text-gray-700 leading-relaxed font-serif ${
                      paperStyle === 'lined'
                        ? 'bg-white'
                        : 'bg-white'
                    }`}
                    style={paperStyle === 'lined' ? {
                      backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #bfdbfe 27px, #bfdbfe 28px)',
                      lineHeight: '28px',
                    } : {}}>
                      {projectContent.split('\n').map((line, i) => {
                        if (line.startsWith('PAGE ')) {
                          return (
                            <div key={i} className="text-orange-600 font-bold text-base mt-6 mb-2 border-b border-orange-200 pb-1">
                              {line}
                            </div>
                          );
                        }
                        if (line.trim() === '') return <div key={i} className="h-4"></div>;
                        return <div key={i}>{line}</div>;
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Empty State */}
        {!searched && !loading && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎒</div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">Koi bhi topic search karo</h3>
            <p className="text-gray-400 text-sm max-w-sm mx-auto">
              YouTube videos + AI Notes + 10-page Project File — sab ek jagah
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {['Photosynthesis', 'French Revolution', 'Python loops', "Ohm's Law", 'Mughal Empire'].map(t => (
                <button
                  key={t}
                  onClick={() => setTopic(t)}
                  className="text-xs bg-orange-50 text-orange-600 border border-orange-200 px-3 py-1.5 rounded-full hover:bg-orange-100 transition-colors"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}