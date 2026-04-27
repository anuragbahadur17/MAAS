import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <header className="bg-white shadow-sm px-6 py-4 flex items-center gap-3">
        <Link href="/" className="text-gray-400 text-xl">←</Link>
        <span className="text-xl font-bold text-orange-500">MAAS</span>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-10">

        {/* Hero */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🇮🇳</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            MAA AI Studio
          </h1>
          <p className="text-xl text-orange-500 font-semibold mb-4">
            "MAA jaise care karti hai apne bachon ka — waise yeh app hai India ke liye"
          </p>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Multilingual AI Assistant for All — Har Indian Ka AI Saathi
          </p>
        </div>

        {/* Mission */}
        <div className="bg-orange-500 text-white rounded-3xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">🎯 Hamara Mission</h2>
          <p className="text-orange-50 text-lg leading-relaxed">
            India mein har jagah payment ki problem hai — students ke paas paise nahi, workers ke paas tools nahi, garib ke paas guidance nahi. MAAS ek aisa platform hai jo <strong>bilkul free</strong> mein har Indian ki madad karta hai — resume banane se lekar government schemes dhundhne tak.
          </p>
          <div className="mt-4 bg-white/20 rounded-2xl p-4">
            <p className="text-white font-bold text-xl">
              "MAA cares for every citizen of India" 🙏
            </p>
          </div>
        </div>

        {/* Why Free */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-orange-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">💝 Kyun Free Hai?</h2>
          <div className="space-y-4">
            {[
              { icon: "🎓", text: "Students ke paas fees ke baad paisa nahi bachta — unhe free tools chahiye" },
              { icon: "👷", text: "Workers aur employees ko professional documents chahiye — bina cost ke" },
              { icon: "👩‍🌾", text: "Kisan aur garib nagarik government schemes se anjaan hain — unhe guide karna zaruri hai" },
              { icon: "🏛️", text: "Humare government ke Digital India mission ko support karna hamara farz hai" },
              { icon: "❤️", text: "Ek Indian hone ke naate — apne bhai-behenon ki madad karna hi hamara goal hai" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="text-3xl">{item.icon}</span>
                <p className="text-gray-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Founder */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-orange-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">👨‍💻 Founder Ki Kahani</h2>
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shrink-0">
              A
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Anurag Bahadur</h3>
              <p className="text-orange-500 font-medium mb-3">Founder, MAA AI Studio | Sonipat, Haryana</p>
              <p className="text-gray-600 leading-relaxed mb-3">
                Main ek non-technical background se hoon — Director hoon Hyoxen & Edificio mein. Maine khud dekha hai ki India mein common log — students, workers, kisan — kitni mushkilon ka saamna karte hain sirf isliye kyunki unke paas sahi tools nahi hote.
              </p>
              <p className="text-gray-600 leading-relaxed mb-3">
                Maine socha — agar MAA apne bachon ka khayal rakhti hai bina kisi shart ke — toh kya hum ek aisa platform nahi bana sakte jo India ke 140 crore logon ka khayal rakhe — bilkul free mein?
              </p>
              <p className="text-gray-600 leading-relaxed font-medium">
                Yeh app sirf ek tool nahi hai — yeh ek movement hai. AI ke saath chalo, aage badho! 🚀
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { num: "100%", label: "Free Forever" },
            { num: "6+", label: "AI Features" },
            { num: "∞", label: "Indian Users" },
          ].map((stat, i) => (
            <div key={i} className="bg-orange-50 rounded-2xl p-5 text-center border border-orange-100">
              <div className="text-3xl font-bold text-orange-500">{stat.num}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/dashboard"
            className="inline-block px-8 py-4 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transition-colors shadow-lg">
            MAAS Use Karo — Free Hai! 🚀
          </Link>
          <p className="text-gray-400 text-sm mt-3">Koi registration nahi, koi payment nahi</p>
        </div>

      </div>
    </div>
  );
}