"use client";
import { useState } from "react";

export default function ResumePage() {
  const [step, setStep] = useState(1);
  const [lang, setLang] = useState("hindi");
  const [loading, setLoading] = useState(false);
  const [resume, setResume] = useState("");
  const [copied, setCopied] = useState(false);

  const [form, setForm] = useState({
    name: "", phone: "", email: "", city: "", linkedin: "", objective: "",
    degree: "", college: "", gradYear: "", marks: "",
    skills: "", languages: "", achievements: "", experience: ""
  });

  const update = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const generateResume = async () => {
    if (!form.name) { alert("Naam zaroor bharo!"); return; }
    setLoading(true);
    setStep(4);

    const langInst = lang === "hindi"
      ? "Poora resume Hindi mein likho."
      : lang === "hinglish"
      ? "Resume Hinglish mein likho (Hindi + English mix)."
      : "Write the resume in professional English.";

    const prompt = `Tum ek professional Indian resume writer ho. Neeche diye details se ek professional resume banao.

${langInst}

Details:
- Naam: ${form.name}
- Phone: ${form.phone}
- Email: ${form.email}
- City: ${form.city}
- LinkedIn: ${form.linkedin}
- Career Objective: ${form.objective || "AI khud likhega"}
- Education: ${form.degree} from ${form.college}, Year: ${form.gradYear}, Marks: ${form.marks}
- Skills: ${form.skills}
- Languages Known: ${form.languages}
- Work Experience: ${form.experience || "Fresher"}
- Achievements: ${form.achievements}

Instructions:
1. Pehle ek strong Career Objective likho (2-3 lines)
2. Sections: Education, Skills, Work Experience, Achievements, Languages
3. Indian job market ke liye optimize karo
4. Professional aur impressive banao
5. Sirf resume text do, koi explanation nahi`;

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      setResume(data.result || "Error aaya, dobara try karo.");
    } catch {
      setResume("Network error. Check karo aur dobara try karo.");
    }
    setLoading(false);
  };

  const copyText = () => {
    navigator.clipboard.writeText(resume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <header className="bg-white shadow-sm px-6 py-4 flex items-center gap-3">
        <a href="/" className="text-orange-500 text-xl">←</a>
        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">M</div>
        <div>
          <h1 className="text-lg font-bold text-gray-800">Resume Builder</h1>
          <p className="text-xs text-gray-500">AI se 2 minute mein professional resume</p>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Progress Steps */}
        <div className="flex items-center gap-2 mb-8">
          {[1,2,3,4].map(n => (
            <div key={n} className="flex items-center gap-2 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                step > n ? "bg-green-500 text-white" :
                step === n ? "bg-orange-500 text-white" :
                "bg-gray-200 text-gray-400"
              }`}>{step > n ? "✓" : n}</div>
              {n < 4 && <div className={`h-1 flex-1 rounded ${step > n ? "bg-green-400" : "bg-gray-200"}`}></div>}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-400 mb-8 -mt-6">
          <span>Personal</span><span>Education</span><span>Experience</span><span>Resume</span>
        </div>

        {/* Step 1 — Personal Info */}
        {step === 1 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100">
            <h2 className="text-lg font-bold text-gray-800 mb-1">Personal Information</h2>
            <p className="text-sm text-gray-500 mb-5">Apni basic details bharo</p>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2 font-medium">Resume ki language:</p>
              <div className="flex gap-2">
                {["hindi","english","hinglish"].map(l => (
                  <button key={l} onClick={() => setLang(l)}
                    className={`flex-1 py-2 rounded-full text-sm border transition-colors ${
                      lang === l ? "bg-orange-500 text-white border-orange-500" : "border-gray-300 text-gray-600 hover:border-orange-300"
                    }`}>
                    {l === "hindi" ? "Hindi" : l === "english" ? "English" : "Hinglish"}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Poora Naam *</label>
                <input value={form.name} onChange={e => update("name", e.target.value)}
                  placeholder="Ramesh Kumar" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Mobile *</label>
                <input value={form.phone} onChange={e => update("phone", e.target.value)}
                  placeholder="+91 98765 43210" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Email</label>
                <input value={form.email} onChange={e => update("email", e.target.value)}
                  placeholder="ramesh@gmail.com" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">City</label>
                <input value={form.city} onChange={e => update("city", e.target.value)}
                  placeholder="Delhi, Lucknow..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400" />
              </div>
            </div>
            <div className="mb-3">
              <label className="text-xs text-gray-500 mb-1 block">LinkedIn (optional)</label>
              <input value={form.linkedin} onChange={e => update("linkedin", e.target.value)}
                placeholder="linkedin.com/in/ramesh" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400" />
            </div>
            <div className="mb-5">
              <label className="text-xs text-gray-500 mb-1 block">Career Objective (optional — AI likhega)</label>
              <textarea value={form.objective} onChange={e => update("objective", e.target.value)}
                placeholder="Mujhe accounts field mein kaam karna hai..." rows={3}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400 resize-none" />
            </div>
            <button onClick={() => setStep(2)}
              className="w-full bg-orange-500 text-white py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors">
              Aage Badho →
            </button>
          </div>
        )}

        {/* Step 2 — Education + Skills */}
        {step === 2 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100">
            <h2 className="text-lg font-bold text-gray-800 mb-1">Education & Skills</h2>
            <p className="text-sm text-gray-500 mb-5">Padhai aur skills ki details</p>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Highest Degree *</label>
                <select value={form.degree} onChange={e => update("degree", e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400">
                  <option value="">Select karo</option>
                  <option>10th (Matric)</option>
                  <option>12th (Intermediate)</option>
                  <option>ITI / Diploma</option>
                  <option>BA / B.Com / B.Sc</option>
                  <option>BCA / B.Tech / BE</option>
                  <option>MBA</option>
                  <option>MA / M.Com / M.Sc</option>
                  <option>PhD</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">College / School</label>
                <input value={form.college} onChange={e => update("college", e.target.value)}
                  placeholder="Delhi University..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Passing Year</label>
                <input value={form.gradYear} onChange={e => update("gradYear", e.target.value)}
                  placeholder="2023" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Marks / CGPA</label>
                <input value={form.marks} onChange={e => update("marks", e.target.value)}
                  placeholder="75% ya 7.5 CGPA" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400" />
              </div>
            </div>
            <div className="mb-3">
              <label className="text-xs text-gray-500 mb-1 block">Skills (comma se alag karo)</label>
              <input value={form.skills} onChange={e => update("skills", e.target.value)}
                placeholder="MS Excel, Tally, Python, Driving..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400" />
            </div>
            <div className="mb-5">
              <label className="text-xs text-gray-500 mb-1 block">Languages Known</label>
              <input value={form.languages} onChange={e => update("languages", e.target.value)}
                placeholder="Hindi, English, Punjabi..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400" />
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)}
                className="flex-1 border border-gray-300 text-gray-600 py-3 rounded-full font-semibold hover:bg-gray-50">
                ← Wapas
              </button>
              <button onClick={() => setStep(3)}
                className="flex-1 bg-orange-500 text-white py-3 rounded-full font-semibold hover:bg-orange-600">
                Aage Badho →
              </button>
            </div>
          </div>
        )}

        {/* Step 3 — Experience */}
        {step === 3 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100">
            <h2 className="text-lg font-bold text-gray-800 mb-1">Experience & Achievements</h2>
            <p className="text-sm text-gray-500 mb-5">Kaam ka experience aur achievements</p>

            <div className="mb-4">
              <label className="text-xs text-gray-500 mb-1 block">Work Experience</label>
              <textarea value={form.experience} onChange={e => update("experience", e.target.value)}
                placeholder="Company: XYZ Ltd, Role: Accountant, 2021-2023, Kaam: billing, GST filing...&#10;&#10;Fresher ho toh khali chhod do" rows={5}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400 resize-none" />
            </div>
            <div className="mb-6">
              <label className="text-xs text-gray-500 mb-1 block">Achievements / Hobbies (optional)</label>
              <textarea value={form.achievements} onChange={e => update("achievements", e.target.value)}
                placeholder="NCC Certificate, Cricket team captain, Best Employee award..." rows={3}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400 resize-none" />
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(2)}
                className="flex-1 border border-gray-300 text-gray-600 py-3 rounded-full font-semibold hover:bg-gray-50">
                ← Wapas
              </button>
              <button onClick={generateResume}
                className="flex-1 bg-orange-500 text-white py-3 rounded-full font-semibold hover:bg-orange-600">
                ✨ Resume Banao!
              </button>
            </div>
          </div>
        )}

        {/* Step 4 — Result */}
        {step === 4 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100">
            {loading ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600 font-medium">AI aapka resume bana rahi hai...</p>
                <p className="text-gray-400 text-sm mt-2">Bas 30 second rukiye ☕</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-800">✅ Resume Taiyaar!</h2>
                  <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">AI Generated</span>
                </div>
                <pre className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 whitespace-pre-wrap font-mono max-h-96 overflow-y-auto border border-gray-100 mb-4">
                  {resume}
                </pre>
                <div className="flex gap-3">
                  <button onClick={copyText}
                    className={`flex-1 py-3 rounded-full font-semibold transition-colors ${
                      copied ? "bg-green-500 text-white" : "bg-orange-500 text-white hover:bg-orange-600"
                    }`}>
                    {copied ? "✓ Copied!" : "Copy Resume"}
                  </button>
                  <button onClick={() => { setStep(1); setResume(""); }}
                    className="flex-1 border border-gray-300 text-gray-600 py-3 rounded-full font-semibold hover:bg-gray-50">
                    Dobara Banao
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-3 text-center">
                  💡 Copy karke Word ya Google Docs mein paste karo
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}