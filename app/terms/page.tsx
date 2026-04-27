import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <header className="bg-white shadow-sm px-6 py-4 flex items-center gap-3">
        <Link href="/" className="text-gray-400 text-xl">←</Link>
        <span className="text-xl font-bold text-orange-500">MAAS</span>
      </header>
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Terms of Service</h1>
        <p className="text-gray-400 text-sm mb-8">Last Updated: April 2026</p>

        {[
          {
            title: "1. Service Description",
            content: "MAA AI Studio (MAAS) ek free AI platform hai. Hum resume builder, government letter writer, scheme finder, exam helper, aur business docs generator provide karte hain — bilkul free."
          },
          {
            title: "2. Free Service Guarantee",
            content: "MAAS hamesha free rahega basic features ke liye. Yeh hamara commitment hai India ke students aur workers ke saath."
          },
          {
            title: "3. User Responsibilities",
            content: "Aap agree karte hain ki: MAAS ka use sirf legal purposes ke liye karenge. Galat ya harmful content generate karne ki koshish nahi karenge. Doosron ke personal information ka misuse nahi karenge."
          },
          {
            title: "4. AI Content Disclaimer",
            content: "AI-generated content reference ke liye hai. Kisi bhi legal, medical, ya financial decision ke liye professional se consult karein. MAAS AI output ki accuracy ki guarantee nahi deta."
          },
          {
            title: "5. Intellectual Property",
            content: "Aapke dwara generate kiye gaye documents aapke hain. MAAS ka logo, naam, aur design copyright protected hai."
          },
          {
            title: "6. Limitation of Liability",
            content: "MAAS kisi bhi direct ya indirect loss ke liye liable nahi hai. Service interruption ke liye hum apologize karte hain lekin guarantee nahi de sakte."
          },
          {
            title: "7. Governing Law",
            content: "Yeh terms Indian law ke hisaab se govern hoti hain. Koi bhi dispute Sonipat, Haryana ki courts mein settle hoga."
          },
          {
            title: "8. Contact",
            content: "Terms se related sawaal: maastudio.in@gmail.com | Anurag Bahadur, Sonipat, Haryana"
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