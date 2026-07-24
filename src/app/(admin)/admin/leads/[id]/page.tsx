"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LeadTimeline, { EventItem, ResolvedProduct } from "@/components/admin/LeadTimeline";
import LeadNotesSection, { NoteItem } from "@/components/admin/LeadNotesSection";

interface LeadDetailData {
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

interface BehavioralMetrics {
  totalEvents: number;
  sessionCount: number;
  comparedProducts: string[];
  firstVisitDate: string;
  lastVisitDate: string;
  activeDaysSpan: number;
  consentStatus: string;
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

export default function AdminLeadDetailPage({ params }: { params: { id: string } }) {
  const { id: leadId } = params;
  const router = useRouter();

  const [lead, setLead] = useState<LeadDetailData | null>(null);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [productMap, setProductMap] = useState<Record<number, ResolvedProduct>>({});
  const [metrics, setMetrics] = useState<BehavioralMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const fetchLeadData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/leads/${leadId}`);
      if (res.status === 401) {
        router.push("/admin");
        return;
      }

      const data = await res.json();
      if (!res.ok) {
        setNotification({ type: "error", message: data.error || "Lead verisi yüklenemedi." });
        return;
      }

      setLead(data.lead);
      setEvents(data.events);
      setNotes(data.notes);
      setProductMap(data.productMap);
      setMetrics(data.metrics);
    } catch (err) {
      console.error("Failed to load lead details:", err);
      setNotification({ type: "error", message: "Bağlantı hatası oluştu." });
    } finally {
      setLoading(false);
    }
  }, [leadId, router]);

  useEffect(() => {
    fetchLeadData();
  }, [fetchLeadData]);

  const handleStatusChange = async (nextStatus: string) => {
    setNotification(null);
    try {
      const res = await fetch(`/api/admin/leads/${leadId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });

      const data = await res.json();

      if (!res.ok) {
        setNotification({ type: "error", message: data.error || "Statü değiştirilemedi." });
        return;
      }

      setNotification({
        type: "success",
        message: `Lead statüsü '${STATUS_MAP[nextStatus]?.label}' olarak güncellendi.`,
      });
      fetchLeadData();
    } catch (err) {
      console.error("Status update error:", err);
      setNotification({ type: "error", message: "Statü değiştirilirken bağlantı hatası oluştu." });
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-400 text-sm">
        Birleşik Lead Kartı yükleniyor...
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-400 text-sm">
        Lead kaydı bulunamadı.
      </div>
    );
  }

  const statusInfo = STATUS_MAP[lead.status] || STATUS_MAP.new;
  const allowedActions = ALLOWED_NEXT_STATES[lead.status] || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8">
      {/* Top Navigation */}
      <div>
        <Link
          href="/admin/leads"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-4"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Lead Listesine Dön
        </Link>

        {/* Lead Header Title & Status Controls */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-white">{lead.company}</h1>
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold border ${statusInfo.bg} ${statusInfo.text} ${statusInfo.border}`}
              >
                {statusInfo.label}
              </span>
            </div>
            <p className="text-sm font-medium text-slate-400 mt-1">
              Yetkili: <span className="text-slate-200 font-semibold">{lead.name}</span>
            </p>
          </div>

          {/* State Machine Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {allowedActions.map((action) => (
              <button
                key={action.status}
                onClick={() => handleStatusChange(action.status)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${action.color}`}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notification Banner */}
      {notification && (
        <div
          className={`rounded-xl border p-4 text-xs sm:text-sm flex items-center justify-between gap-3 ${
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

      {/* Form Data & Behavioral Intelligence Summary Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form Data Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl flex flex-col gap-4">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-3">
            📋 İletişim & Form Verisi
          </h3>
          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Telefon:</span>
              <span className="font-mono font-bold text-white bg-slate-800 px-2.5 py-1 rounded border border-slate-700">
                {lead.phone}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">E-posta:</span>
              <span className="font-mono text-slate-200">{lead.email || "Belirtilmedi"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Bütçe Aralığı:</span>
              <span className="font-bold text-emerald-400">{lead.budgetRange || "Belirtilmedi"}</span>
            </div>
            <div className="flex flex-col gap-1 border-t border-slate-800 pt-2">
              <span className="text-slate-400">Not / Özel İstek:</span>
              <p className="text-slate-300 bg-slate-950 p-2.5 rounded-lg border border-slate-850 italic">
                {lead.message || "Özel not bırakılmadı."}
              </p>
            </div>
          </div>
        </div>

        {/* Behavioral Intelligence Card */}
        <div className="rounded-2xl border border-blue-500/30 bg-blue-950/20 p-6 shadow-xl flex flex-col gap-4">
          <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider border-b border-blue-500/20 pb-3 flex items-center justify-between">
            <span>🧠 Davranışsal Zeka Sinyalleri</span>
            <span className="text-[10px] font-mono bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded border border-blue-500/30">
              Consent: {metrics?.consentStatus.toUpperCase()}
            </span>
          </h3>
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Karşılaştırılan Cihazlar:</span>
              <span className="font-bold text-white text-right">
                {metrics?.comparedProducts.length ? metrics.comparedProducts.join(", ") : "Karşılaştırma yapılmadı"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Ziyaret & Olay Sıklığı:</span>
              <span className="font-bold text-slate-200">
                {metrics?.totalEvents || 0} Olay ({metrics?.sessionCount || 1} Oturum)
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Aktiflik Süresi:</span>
              <span className="font-mono text-emerald-400 font-bold">
                {metrics?.activeDaysSpan || 1} Gün ({metrics?.sessionCount || 1} Ziyaret)
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 border-t border-blue-500/20 pt-2">
              <span>İlk Ziyaret: {metrics?.firstVisitDate ? new Date(metrics.firstVisitDate).toLocaleDateString("tr-TR") : "-"}</span>
              <span>Son Ziyaret: {metrics?.lastVisitDate ? new Date(metrics.lastVisitDate).toLocaleDateString("tr-TR") : "-"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: AM Notes (Left) & Event Timeline (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Optimistic AM Notes Section */}
        <div className="lg:col-span-1">
          <LeadNotesSection leadId={lead.id} initialNotes={notes} />
        </div>

        {/* Right Column: Behavioral Events Timeline */}
        <div className="lg:col-span-2">
          <LeadTimeline events={events} productMap={productMap} />
        </div>
      </div>
    </div>
  );
}
