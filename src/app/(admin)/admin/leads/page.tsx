"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export interface LeadItem {
  id: string;
  name: string;
  company: string;
  phone: string;
  email?: string | null;
  budgetRange?: string | null;
  message?: string | null;
  status: "new" | "called" | "warm" | "cold" | "sold" | "closed";
  sessionId?: string | null;
  createdAt: string;
  updatedAt: string;
  session?: {
    consentStatus: string;
    createdAt: string;
    ipHash?: string | null;
  } | null;
}

const STATUS_MAP: Record<string, { label: string; bg: string; text: string; border: string }> = {
  new: { label: "Lead Geldi", bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/30" },
  called: { label: "Arandı", bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/30" },
  warm: { label: "Sıcak", bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30" },
  cold: { label: "Soğuk", bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/30" },
  sold: { label: "Satış Yapıldı", bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/30" },
  closed: { label: "Kapalı", bg: "bg-slate-800", text: "text-slate-400", border: "border-slate-700" },
};

const ALLOWED_NEXT_STATES: Record<string, { status: string; label: string; color: string }[]> = {
  new: [
    { status: "called", label: "Arandı İşaretle", color: "bg-amber-600 hover:bg-amber-500 text-white" },
    { status: "closed", label: "Kapat", color: "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700" },
  ],
  called: [
    { status: "warm", label: "Sıcak Lead", color: "bg-emerald-600 hover:bg-emerald-500 text-white" },
    { status: "cold", label: "Soğuk Lead", color: "bg-cyan-600 hover:bg-cyan-500 text-white" },
    { status: "closed", label: "Kapat", color: "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700" },
  ],
  warm: [
    { status: "sold", label: "Satış Tamamlandı 🎉", color: "bg-purple-600 hover:bg-purple-500 text-white" },
    { status: "cold", label: "Soğuk Lead", color: "bg-cyan-600 hover:bg-cyan-500 text-white" },
    { status: "closed", label: "Kapat", color: "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700" },
  ],
  cold: [
    { status: "warm", label: "Sıcak Lead", color: "bg-emerald-600 hover:bg-emerald-500 text-white" },
    { status: "closed", label: "Kapat", color: "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700" },
  ],
  sold: [
    { status: "closed", label: "Kapat", color: "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700" },
  ],
  closed: [
    { status: "new", label: "Yeniden Aç", color: "bg-blue-600 hover:bg-blue-500 text-white" },
  ],
};

export default function AdminLeadsPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (selectedStatus !== "all") queryParams.set("status", selectedStatus);
      if (searchQuery) queryParams.set("search", searchQuery);

      const res = await fetch(`/api/admin/leads?${queryParams.toString()}`);
      if (res.status === 401) {
        router.push("/admin");
        return;
      }
      const data = await res.json();
      if (data.success) {
        setLeads(data.leads);
      }
    } catch (err) {
      console.error("Failed to fetch leads:", err);
    } finally {
      setLoading(false);
    }
  }, [selectedStatus, searchQuery, router]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleStatusChange = async (leadId: string, nextStatus: string) => {
    setNotification(null);
    try {
      const res = await fetch(`/api/admin/leads/${leadId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });

      const data = await res.json();

      if (!res.ok) {
        setNotification({ type: "error", message: data.error || "Statü güncellenemedi." });
        return;
      }

      setNotification({ type: "success", message: `Lead statüsü '${STATUS_MAP[nextStatus]?.label}' olarak güncellendi.` });
      fetchLeads();
    } catch (err) {
      console.error("Status change error:", err);
      setNotification({ type: "error", message: "Bağlantı hatası oluştu." });
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  };

  // Summary counts
  const totalCount = leads.length;
  const newCount = leads.filter((l) => l.status === "new").length;
  const calledCount = leads.filter((l) => l.status === "called").length;
  const warmCount = leads.filter((l) => l.status === "warm").length;
  const soldCount = leads.filter((l) => l.status === "sold").length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Admin Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white tracking-tight">Account Manager Yönetim Paneli</h1>
            <span className="inline-flex items-center rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-400 border border-blue-500/30">
              AM Active Session
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Gelen lead taleplerini ve AM state machine süreçlerini yönetin.
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 px-4 py-2 text-xs font-semibold text-slate-300 transition-colors border border-slate-700"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Çıkış Yap
        </button>
      </div>

      {/* Notification Banner */}
      {notification && (
        <div
          className={`mb-6 rounded-xl border p-4 text-xs sm:text-sm flex items-center justify-between gap-3 ${
            notification.type === "success"
              ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-300"
              : "bg-rose-950/40 border-rose-500/30 text-rose-300"
          }`}
        >
          <span>{notification.message}</span>
          <button onClick={() => setNotification(null)} className="text-xs font-bold hover:underline">
            Kapat
          </button>
        </div>
      )}

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
        <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-4 flex flex-col gap-1 shadow-lg">
          <span className="text-xs font-bold text-slate-400 uppercase">Toplam Lead</span>
          <span className="text-2xl font-extrabold text-white">{totalCount}</span>
        </div>
        <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-4 flex flex-col gap-1 shadow-lg">
          <span className="text-xs font-bold text-blue-400 uppercase">Lead Geldi</span>
          <span className="text-2xl font-extrabold text-blue-300">{newCount}</span>
        </div>
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 flex flex-col gap-1 shadow-lg">
          <span className="text-xs font-bold text-amber-400 uppercase">Arandı</span>
          <span className="text-2xl font-extrabold text-amber-300">{calledCount}</span>
        </div>
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 flex flex-col gap-1 shadow-lg">
          <span className="text-xs font-bold text-emerald-400 uppercase">Sıcak Lead</span>
          <span className="text-2xl font-extrabold text-emerald-300">{warmCount}</span>
        </div>
        <div className="rounded-xl border border-purple-500/30 bg-purple-500/10 p-4 flex flex-col gap-1 shadow-lg col-span-2 sm:col-span-1">
          <span className="text-xs font-bold text-purple-400 uppercase">Satış</span>
          <span className="text-2xl font-extrabold text-purple-300">{soldCount}</span>
        </div>
      </div>

      {/* Filters & Search Controls */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Kurum, isim veya telefon ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 pl-10 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
          />
          <svg className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {[
            { key: "all", label: "Tümü" },
            { key: "new", label: "Lead Geldi" },
            { key: "called", label: "Arandı" },
            { key: "warm", label: "Sıcak" },
            { key: "cold", label: "Soğuk" },
            { key: "sold", label: "Satış" },
            { key: "closed", label: "Kapalı" },
          ].map((pill) => (
            <button
              key={pill.key}
              onClick={() => setSelectedStatus(pill.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                selectedStatus === pill.key
                  ? "bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/20"
                  : "bg-slate-800/80 text-slate-400 border-slate-700/60 hover:text-white hover:border-slate-600"
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Lead Table Container */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-2xl">
        {loading ? (
          <div className="p-12 text-center text-slate-400 text-sm">Lead verileri yükleniyor...</div>
        ) : leads.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-sm">Filtre kriterlerine uygun lead bulunamadı.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase font-bold tracking-wider">
                <tr>
                  <th className="px-6 py-4">Kurum / Yetkili</th>
                  <th className="px-6 py-4">İletişim</th>
                  <th className="px-6 py-4">Mevcut Statü</th>
                  <th className="px-6 py-4">Bütçe</th>
                  <th className="px-6 py-4">Tarih</th>
                  <th className="px-6 py-4 text-right">Statü Güncelleme (State Machine)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {leads.map((lead) => {
                  const statusInfo = STATUS_MAP[lead.status] || STATUS_MAP.new;
                  const allowedActions = ALLOWED_NEXT_STATES[lead.status] || [];

                  return (
                    <tr key={lead.id} className="hover:bg-slate-850/50 transition-colors">
                      {/* Name & Company */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-0.5">
                          <Link href={`/admin/leads/${lead.id}`} className="font-bold text-white text-sm hover:text-blue-400 transition-colors">
                            {lead.company}
                          </Link>
                          <span className="text-slate-400 text-xs font-medium">{lead.name}</span>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-0.5 font-mono text-xs">
                          <span className="text-slate-200">{lead.phone}</span>
                          {lead.email && <span className="text-slate-400">{lead.email}</span>}
                        </div>
                      </td>

                      {/* Status Badge */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold border ${statusInfo.bg} ${statusInfo.text} ${statusInfo.border}`}>
                          {statusInfo.label}
                        </span>
                      </td>

                      {/* Budget */}
                      <td className="px-6 py-4 font-medium text-slate-300">
                        {lead.budgetRange || "Belirtilmedi"}
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 text-slate-400 font-mono text-[11px]">
                        {new Date(lead.createdAt).toLocaleDateString("tr-TR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>

                      {/* Action Buttons */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 flex-wrap">
                          {allowedActions.map((action) => (
                            <button
                              key={action.status}
                              onClick={() => handleStatusChange(lead.id, action.status)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${action.color}`}
                            >
                              {action.label}
                            </button>
                          ))}
                          <Link
                            href={`/admin/leads/${lead.id}`}
                            className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 text-xs font-semibold border border-blue-500/30 transition-colors"
                          >
                            Detay Kartı &rarr;
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
