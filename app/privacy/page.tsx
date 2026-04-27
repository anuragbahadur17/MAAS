import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <header className="bg-white shadow-sm px-6 py-4 flex items-center gap-3">
        <Link href="/" className="text-gray-400 text-xl">←</Link>
        <span className="text-xl font-bold text-orange-500">MAAS</span>
      </header>
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Privacy Policy</h1>
        <p className="text-gray-400 text-sm mb-8">Last Updated: April 2026 | Indian IT Act 2000 & DPDP Act 2023 Compliant</p>

        {[
          {
            title: "1. Kaun Hain Hum",
            content: "MAA AI Studio (MAAS) ek free AI platform hai jo India ke students, workers, aur nagarikon ke liye banaya gaya hai. Founder: Anurag Bahadur, Sonipat, Haryana, India."
          },
          {
            title: "2. Kya Data Collect Karte Hain",
            content: "Hum collect karte hain: aapka naam, email (agar login karein), aur aapke dwara generate kiye gaye documents. Hum kabhi bhi aapka Aadhaar, PAN, bank details ya koi sensitive personal information nahi maangta."
          },
          {
            title: "3. Data Ka Use Kaise Hota Hai",
            content: "Aapka data sirf aapki service dene ke liye use hota hai. Hum aapka data kisi third party ko nahi bechte, nahi share karte. Aapke documents sirf aapke device pe save hote hain."
          },
          {
            title: "4. AI Processing",
            content: "Aapke inputs Google Gemini AI ko bheje jaate hain response generate karne ke liye. Google ki apni Privacy Policy apply hoti hai. Hum aapke prompts store nahi karte."
          },
          {
            title: "5. Cookies",
            content: "Hum sirf zaroori session cookies use karte hain. Koi tracking cookies nahi, koi advertising cookies nahi."
          },
          {
            title: "6. Aapke Adhikar (DPDP Act 2023)",
            content: "Aap kabhi bhi apna data delete karwa sakte hain. Aap apna data access kar sakte hain. Aap data processing se opt-out kar sakte hain. Contact: maastudio.in@gmail.com"
          },
          {
            title: "7. Data Security",
            content: "Hum industry-standard encryption use karte hain. Aapka data Supabase ke secure servers pe store hota hai. Koi bhi unauthorized access block kiya jaata hai."
          },
          {
            title: "8. Contact",
            content: "Privacy se related koi bhi sawaal ke liye: maastudio.in@gmail.com | Anurag Bahadur, Sonipat, Haryana - 131001"
          },
        ].map((section, i) => (
          <div key={i} className="mb-6 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-3">{section.title}</h2>
            <p className="text-gray-600 leading-relaxed">{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}