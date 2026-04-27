import Link from 'next/link';

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-4xl font-bold text-orange-500 mb-2">MAAS</div>
          <p className="text-sm text-gray-500 mt-1">Multilingual AI Assistant for All</p>
        </div>

        {/* Tabs */}
        <div className="flex bg-orange-50 rounded-full p-1 mb-6">
          <button className="flex-1 py-2 text-sm font-medium bg-white text-orange-600 rounded-full shadow-sm">
            Login
          </button>
          <button className="flex-1 py-2 text-sm font-medium text-gray-500 hover:text-orange-500">
            Register
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email ya Mobile Number
            </label>
            <input
              type="text"
              placeholder="aapka@email.com ya 9876543210"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
          </div>
          <Link
            href="/dashboard"
            className="block w-full py-3 bg-orange-500 text-white text-center font-semibold rounded-xl hover:bg-orange-600 transition-colors"
          >
            Login Karo
          </Link>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-200"/>
          <span className="text-xs text-gray-400">ya</span>
          <div className="flex-1 h-px bg-gray-200"/>
        </div>

        {/* Free Use */}
        <Link
          href="/dashboard"
          className="block w-full py-3 border-2 border-orange-400 text-orange-500 text-center font-semibold rounded-xl hover:bg-orange-50 transition-colors"
        >
          🚀 Bina Login Ke Free Use Karo
        </Link>

        <p className="text-center text-xs text-gray-400 mt-4">
          Login karne se tumhara data save rehta hai
        </p>

      </div>
    </div>
  );
}