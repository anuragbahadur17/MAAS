import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">

      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold text-orange-500">MAAS</div>
        </div>
        <div className="flex gap-2">
          <Link href="/auth" className="px-4 py-2 text-sm text-orange-600 border border-orange-300 rounded-full hover:bg-orange-50">
            Login
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="text-center px-6 py-16">
        <div className="inline-block bg-orange-100 text-orange-700 text-sm px-4 py-1 rounded-full mb-4">
          Free — No Payment Required
        </div>
        <h2 className="text-4xl font-bold text-gray-800 mb-4 leading-tight">
          Har Indian Ka<br/>
          <span className="text-orange-500">AI Saathi</span>
        </h2>
        <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
          Resume banao, government letter likho, sarkari schemes dhundho — sab kuch Hindi mein, bilkul free!
        </p>
        <Link href="/dashboard" className="inline-block px-8 py-4 bg-orange-500 text-white text-lg font-semibold rounded-full hover:bg-orange-600 shadow-lg">
          Abhi Shuru Karo — Free Hai!
        </Link>
      </section>

      {/* Features */}
      <section className="px-6 py-8 max-w-4xl mx-auto">
        <h3 className="text-center text-2xl font-bold text-gray-700 mb-8">
          MAAS Kya Kar Sakta Hai?
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

          <Link href="/resume" className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-3">📄</div>
            <h4 className="font-bold text-gray-800 mb-2">Resume Banao</h4>
            <p className="text-gray-500 text-sm">2 minute mein professional resume — Indian format mein, Hindi ya English mein</p>
            <div className="mt-4 text-orange-500 text-sm font-medium">Abhi Banao →</div>
          </Link>

          <Link href="/letter" className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-3">✉️</div>
            <h4 className="font-bold text-gray-800 mb-2">Government Letter</h4>
            <p className="text-gray-500 text-sm">RTI, complaint, application — AI likhega, tum sirf print karo</p>
            <div className="mt-4 text-orange-500 text-sm font-medium">Letter Likho →</div>
          </Link>

          <Link href="/schemes" className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-3">🏛️</div>
            <h4 className="font-bold text-gray-800 mb-2">Scheme Finder</h4>
            <p className="text-gray-500 text-sm">Tumhare liye kaunsi sarkari schemes hain — PM Awas, Kisan, Ujjwala sab ek jagah</p>
            <div className="mt-4 text-orange-500 text-sm font-medium">Scheme Dhundho →</div>
          </Link>

          <Link href="/exam" className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-3">📚</div>
            <h4 className="font-bold text-gray-800 mb-2">Exam Helper</h4>
            <p className="text-gray-500 text-sm">SSC, UPSC, Board — Hindi mein sawaal poochho, detailed jawab pao</p>
            <div className="mt-4 text-orange-500 text-sm font-medium">Padhai Karo →</div>
          </Link>

          <Link href="/board-exam" className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-3">🎓</div>
            <h4 className="font-bold text-gray-800 mb-2">Board Exam Prep</h4>
            <p className="text-gray-500 text-sm">Class 10 & 12 — CBSE, ICSE, State Boards — AI Teacher</p>
            <div className="mt-4 text-orange-500 text-sm font-medium">Taiyari Karo →</div>
          </Link>

          <Link href="/business" className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-3">🧾</div>
            <h4 className="font-bold text-gray-800 mb-2">Business Docs</h4>
            <p className="text-gray-500 text-sm">GST invoice, quotation, business letter — chhote vyapariyon ke liye</p>
            <div className="mt-4 text-orange-500 text-sm font-medium">Doc Banao →</div>
          </Link>

          {/* NEW: Student Project */}
          <Link href="/student-project" className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-3">🎒</div>
            <h4 className="font-bold text-gray-800 mb-2">Student Project Helper</h4>
            <p className="text-gray-500 text-sm">Topic daalo — YouTube video + editable AI notes ek saath milenge</p>
            <div className="mt-4 text-orange-500 text-sm font-medium">Project Banao →</div>
          </Link>

          {/* Coming Soon: Voice */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100 opacity-60 cursor-not-allowed">
            <div className="text-4xl mb-3">🎤</div>
            <h4 className="font-bold text-gray-800 mb-2">Voice Assistant</h4>
            <p className="text-gray-500 text-sm">Hindi mein bolo — MAAS samjhega aur jawab dega</p>
            <div className="mt-4 text-gray-400 text-sm font-medium">Jald Aayega...</div>
          </div>

        </div>
      </section>

    </div>
  );
}