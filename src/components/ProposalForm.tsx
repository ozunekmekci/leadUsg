"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { setConsentStatus, trackEvent } from "@/lib/tracking";

// Client Form Zod Schema
const phoneRegex = /^(\+?90|0)?[5][0-9]{9}$/;

export const leadFormSchema = z.object({
  name: z.string().min(2, "Ad soyad en az 2 karakter olmalıdır."),
  company: z.string().min(2, "Kurum / klinik adı en az 2 karakter olmalıdır."),
  phone: z
    .string()
    .transform((val) => val.replace(/\s+/g, ""))
    .refine((val) => phoneRegex.test(val), {
      message: "Geçerli bir telefon numarası giriniz (örn: 0532 000 00 00).",
    }),
  email: z
    .string()
    .optional()
    .refine((val) => !val || z.string().email().safeParse(val).success, {
      message: "Geçerli bir e-posta adresi giriniz.",
    }),
  budgetRange: z.string().optional(),
  message: z.string().optional(),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

export default function ProposalForm() {
  const searchParams = useSearchParams();
  const selectedProductIds = searchParams.get("products") || "";
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      company: "",
      phone: "",
      email: "",
      budgetRange: "",
      message: "",
    },
  });

  const onSubmit = async (data: LeadFormData) => {
    setServerError(null);
    try {
      const sessionId = typeof window !== "undefined" ? localStorage.getItem("leadusg_session_id") : null;

      const payload = {
        ...data,
        sessionId,
        selectedProducts: selectedProductIds ? selectedProductIds.split(",") : [],
      };

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        setServerError(result.error || "Form gönderimi sırasında bir hata oluştu.");
        return;
      }

      await setConsentStatus("full");

      trackEvent("lead_form_submitted", {
        company: data.company,
        hasEmail: Boolean(data.email),
        hasBudget: Boolean(data.budgetRange),
        selectedProducts: selectedProductIds,
      });

      setIsSubmitted(true);
    } catch (err) {
      console.error("Lead form submit error:", err);
      setServerError("Sunucuya bağlanırken bir hata oluştu. Lütfen tekrar deneyiniz.");
    }
  };

  if (isSubmitted) {
    return (
      <div className="rounded border border-cyan-800 bg-slate-950 p-8 text-center flex flex-col items-center gap-4 shadow-2xl font-mono-tech">
        <div className="w-16 h-16 rounded-full bg-cyan-950 text-cyan-400 flex items-center justify-center border border-cyan-800">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="space-y-2">
          <h2 className="font-display text-2xl font-bold text-white tracking-tight">Teklif Talebiniz Alındı!</h2>
          <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            Uzman Biyomedikal Account Manager ekibimiz talebinizi inceleyerek en kısa sürede teknik detaylı teklif sunacaktır.
          </p>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-400">
          Referans Numaranız: <span className="font-mono-tech text-cyan-400 font-bold">L-USG-{Math.floor(100000 + Math.random() * 900000)}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl font-mono-tech">
      <div className="flex flex-col gap-2 border-b border-slate-800 pb-6 mb-6">
        <h1 className="font-display text-2xl font-bold text-white tracking-tight">Biyomedikal Danışmanlık & Teklif Talebi</h1>
        <p className="text-xs text-slate-400">
          Klinik ve bütçe hedeflerinize uygun ultrason ve görüntüleme sistemi tekliflerini hazırlayalım.
        </p>
        {selectedProductIds && (
          <div className="mt-2 inline-flex items-center gap-2 rounded bg-cyan-950 px-3 py-1.5 text-xs text-cyan-300 border border-cyan-800">
            <span>Seçili Cihaz Kodu:</span>
            <span className="font-bold text-white">{selectedProductIds}</span>
          </div>
        )}
      </div>

      {serverError && (
        <div className="mb-6 rounded border border-rose-800 bg-rose-950/60 p-4 text-xs text-rose-300 flex items-center gap-3">
          <span>{serverError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {/* Name Field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Ad Soyad / Unvan <span className="text-cyan-400">*</span>
          </label>
          <input
            {...register("name")}
            type="text"
            placeholder="Dr. Ahmet Yılmaz"
            className={`rounded border bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none transition-colors ${
              errors.name ? "border-rose-500 focus:border-rose-400" : "border-slate-800 focus:border-cyan-500"
            }`}
          />
          {errors.name && <span className="text-xs text-rose-400">{errors.name.message}</span>}
        </div>

        {/* Company Field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Kurum / Klinik Adı <span className="text-cyan-400">*</span>
          </label>
          <input
            {...register("company")}
            type="text"
            placeholder="XYZ Kadın Doğum Kliniği"
            className={`rounded border bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none transition-colors ${
              errors.company ? "border-rose-500 focus:border-rose-400" : "border-slate-800 focus:border-cyan-500"
            }`}
          />
          {errors.company && <span className="text-xs text-rose-400">{errors.company.message}</span>}
        </div>

        {/* Phone Field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Telefon Numarası <span className="text-cyan-400">*</span>
          </label>
          <input
            {...register("phone")}
            type="tel"
            placeholder="0532 000 00 00"
            className={`rounded border bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none transition-colors ${
              errors.phone ? "border-rose-500 focus:border-rose-400" : "border-slate-800 focus:border-cyan-500"
            }`}
          />
          {errors.phone && <span className="text-xs text-rose-400">{errors.phone.message}</span>}
        </div>

        {/* Email Field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            E-posta Adresi <span className="text-slate-500 font-normal">(Opsiyonel)</span>
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="ahmet@klinik.com"
            className={`rounded border bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none transition-colors ${
              errors.email ? "border-rose-500 focus:border-rose-400" : "border-slate-800 focus:border-cyan-500"
            }`}
          />
          {errors.email && <span className="text-xs text-rose-400">{errors.email.message}</span>}
        </div>

        {/* Budget Range Field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Bütçe Aralığı <span className="text-slate-500 font-normal">(Opsiyonel)</span>
          </label>
          <select
            {...register("budgetRange")}
            className="rounded border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none transition-colors"
          >
            <option value="">Bütçe Aralığı Seçiniz</option>
            <option value="500K-1M TL">500K - 1M ₺</option>
            <option value="1M-2M TL">1M - 2M ₺</option>
            <option value="2M-3M TL">2M - 3M ₺</option>
            <option value="3M+ TL">3M+ ₺</option>
          </select>
        </div>

        {/* Message Field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Not / Özel İhtiyaçlar <span className="text-slate-500 font-normal">(Opsiyonel)</span>
          </label>
          <textarea
            {...register("message")}
            rows={3}
            placeholder="Cihazın teslimat süresi, prob tercihleri veya finansman desteği beklentilerinizi belirtebilirsiniz."
            className="rounded border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 w-full rounded bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 px-6 py-3.5 text-sm font-bold text-white transition-all shadow-lg shadow-cyan-600/20 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <span>Gönderiliyor...</span>
          ) : (
            <span>Biyomedikal Danışmanlık Talebi Gönder →</span>
          )}
        </button>
      </form>
    </div>
  );
}
