"use client";

export default function AdminLoginPage() {
  return (
    <div className="max-w-md mx-auto px-4 py-24">
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
        <h2 className="text-xl font-bold text-white text-center">Account Manager Girişi</h2>
        <form className="flex flex-col gap-4 mt-6" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-400">E-posta</label>
            <input
              type="email"
              placeholder="am@domain.com"
              className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-white focus:border-blue-500 focus:ring-0 outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-400">Şifre</label>
            <input
              type="password"
              placeholder="••••••••"
              className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-white focus:border-blue-500 focus:ring-0 outline-none"
            />
          </div>
          <button className="mt-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition-colors">
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
}
