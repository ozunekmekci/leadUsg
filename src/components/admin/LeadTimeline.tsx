"use client";

export interface EventItem {
  id: string;
  eventName: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface ResolvedProduct {
  id: number;
  slug: string;
  name: string;
  brand: string;
  fullName: string;
}

interface LeadTimelineProps {
  events: EventItem[];
  productMap: Record<number, ResolvedProduct>;
}

export default function LeadTimeline({ events, productMap }: LeadTimelineProps) {
  if (events.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-8 text-center text-slate-500 text-xs sm:text-sm">
        Bu oturuma ait henüz davranışsal veri kaydı (event) bulunmuyor.
      </div>
    );
  }

  const renderEventDetails = (evt: EventItem) => {
    const meta = evt.metadata || {};

    switch (evt.eventName) {
      case "compare_start": {
        const productIds = Array.isArray(meta.productIds) ? meta.productIds : [];
        const names = productIds
          .map((id) => productMap[Number(id)]?.fullName || meta.productNames || `#${id}`)
          .filter(Boolean);
        const resolvedText = names.length > 0 ? names.join(" ⚡ ") : "Seçili cihazlar";

        return (
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-blue-300">Karşılaştırma Başlatıldı</span>
            <p className="text-xs text-slate-300">
              <span className="text-slate-400">Karşılaştırılan Cihazlar:</span>{" "}
              <span className="font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                {resolvedText}
              </span>
            </p>
          </div>
        );
      }

      case "compare_end": {
        const duration = meta.durationSeconds ? `${meta.durationSeconds} saniye` : "süre belirtilmedi";
        return (
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-indigo-300">Karşılaştırma İncelemesi Tamamlandı</span>
            <p className="text-xs text-slate-400">
              Karşılaştırma modülünde <span className="font-bold text-slate-200">{duration}</span> vakit geçirildi.
            </p>
          </div>
        );
      }

      case "compare_toggle": {
        const pid = Number(meta.productId);
        const prodName = String(productMap[pid]?.fullName || meta.productName || `Cihaz #${meta.productId}`);
        const actionText = meta.action === "add" ? "Karşılaştırmaya eklendi" : "Karşılaştırmadan çıkarıldı";

        return (
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-sky-300">Karşılaştırma Seçimi Değişti</span>
            <p className="text-xs text-slate-300">
              <span className="font-bold text-white">{prodName}</span> &rarr; {actionText}
            </p>
          </div>
        );
      }

      case "product_view":
      case "product_card_click": {
        const pid = Number(meta.productId);
        const prodName = String(productMap[pid]?.fullName || meta.productName || meta.productSlug || "Ürün Detayı");
        return (
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-emerald-300">Ürün İnceleme Görünümü</span>
            <p className="text-xs text-slate-300">
              <span className="font-bold text-white">{prodName}</span> detay kartı tıklandı/incelendi.
            </p>
          </div>
        );
      }

      case "filter_applied": {
        const filterType = meta.filterType === "brand" ? "Marka Filtresi" : "Bütçe Filtresi";
        const val = meta.brand || meta.budget || "Tüm Filtreler";
        return (
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-amber-300">Katalog Filtresi Uygulandı</span>
            <p className="text-xs text-slate-300">
              {filterType}: <span className="font-bold text-white">{String(val)}</span>
            </p>
          </div>
        );
      }

      case "lead_form_submitted": {
        return (
          <div className="flex flex-col gap-1">
            <span className="font-bold text-emerald-400 flex items-center gap-1.5">
              <span>🎯 Teklif Formu Gönderildi</span>
            </span>
            <p className="text-xs text-slate-300">
              Kullanıcı iletişim bilgilerini gönderdi, rıza durumu <span className="font-bold text-emerald-300">FULL</span> yapıldı.
            </p>
          </div>
        );
      }

      default:
        return (
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-slate-300">{evt.eventName}</span>
            <p className="text-xs font-mono text-slate-400">{JSON.stringify(meta)}</p>
          </div>
        );
    }
  };

  const getEventBadgeColor = (eventName: string) => {
    switch (eventName) {
      case "compare_start":
      case "compare_toggle":
        return "bg-blue-500 border-blue-400 shadow-blue-500/50";
      case "compare_end":
        return "bg-indigo-500 border-indigo-400 shadow-indigo-500/50";
      case "product_view":
      case "product_card_click":
        return "bg-emerald-500 border-emerald-400 shadow-emerald-500/50";
      case "lead_form_submitted":
        return "bg-amber-400 border-amber-300 shadow-amber-400/80 animate-pulse";
      default:
        return "bg-slate-600 border-slate-500";
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-bold text-white tracking-wide">Davranışsal Etkinlik Zaman Çizelgesi</h3>
          <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-xs font-mono text-slate-300">
            {events.length} Olay
          </span>
        </div>
      </div>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
        {events.map((evt) => (
          <div key={evt.id} className="relative flex flex-col gap-1 group">
            {/* Timeline Dot */}
            <div
              className={`absolute -left-[21px] top-1 h-3.5 w-3.5 rounded-full border-2 shadow-md transition-transform group-hover:scale-125 ${getEventBadgeColor(
                evt.eventName
              )}`}
            />

            {/* Event Header & Timestamp */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-0.5">
              <span>{evt.eventName}</span>
              <span>
                {new Date(evt.createdAt).toLocaleDateString("tr-TR", {
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </span>
            </div>

            {/* Event Body */}
            <div className="rounded-xl border border-slate-800/80 bg-slate-950/70 p-3.5 text-xs shadow-inner">
              {renderEventDetails(evt)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
