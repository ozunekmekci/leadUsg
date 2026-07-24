"use client";

import { useState } from "react";

export interface NoteItem {
  id: string;
  content: string;
  createdAt: string;
  amUser?: {
    name?: string | null;
    email?: string | null;
  } | null;
}

interface LeadNotesSectionProps {
  leadId: string;
  initialNotes: NoteItem[];
}

export default function LeadNotesSection({ leadId, initialNotes }: LeadNotesSectionProps) {
  const [notes, setNotes] = useState<NoteItem[]>(initialNotes);
  const [newNoteContent, setNewNoteContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorNotification, setErrorNotification] = useState<string | null>(null);

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = newNoteContent.trim();
    if (!content) return;

    setErrorNotification(null);
    setNewNoteContent("");

    // 1. Prepare Optimistic Note Object
    const tempId = `temp_${Date.now()}`;
    const optimisticNote: NoteItem = {
      id: tempId,
      content,
      createdAt: new Date().toISOString(),
      amUser: {
        name: "Siz (Account Manager)",
      },
    };

    // 2. Optimistic Update: Prepend note immediately to UI
    setNotes((prevNotes) => [optimisticNote, ...prevNotes]);
    setIsSubmitting(true);

    try {
      // 3. Send POST Request to Server API
      const res = await fetch(`/api/admin/leads/${leadId}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Rollback Optimistic Change on Server Error
        setNotes((prevNotes) => prevNotes.filter((n) => n.id !== tempId));
        setNewNoteContent(content); // Restore draft text
        setErrorNotification(data.error || "Not kaydedilemedi, değişiklik geri alındı.");
        return;
      }

      // Replace temp note with saved note from server
      setNotes((prevNotes) =>
        prevNotes.map((n) => (n.id === tempId ? data.note : n))
      );
    } catch (err) {
      console.error("Error adding note:", err);
      // Rollback Optimistic Change on Network Error
      setNotes((prevNotes) => prevNotes.filter((n) => n.id !== tempId));
      setNewNoteContent(content); // Restore draft text
      setErrorNotification("Bağlantı hatası oluştu, not eklenemedi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl flex flex-col gap-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <h3 className="text-base font-bold text-white tracking-wide">Account Manager Notları</h3>
        <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-xs font-mono text-slate-300">
          {notes.length} Not
        </span>
      </div>

      {errorNotification && (
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300 flex items-center justify-between">
          <span>{errorNotification}</span>
          <button onClick={() => setErrorNotification(null)} className="font-bold hover:underline">
            Kapat
          </button>
        </div>
      )}

      {/* Add Note Input Form */}
      <form onSubmit={handleAddNote} className="flex flex-col gap-3">
        <textarea
          rows={3}
          value={newNoteContent}
          onChange={(e) => setNewNoteContent(e.target.value)}
          placeholder="Müşteri görüşmesi, teklif revizyonu veya takip notu giriniz..."
          className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors resize-none"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !newNoteContent.trim()}
            className="rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 px-4 py-2 text-xs font-bold text-white transition-all shadow-md shadow-blue-500/20"
          >
            {isSubmitting ? "Kaydediliyor..." : "Not Ekle"}
          </button>
        </div>
      </form>

      {/* Notes List */}
      <div className="space-y-3 mt-2">
        {notes.length === 0 ? (
          <p className="text-xs text-slate-500 text-center py-4">Henüz girilmiş bir AM notu bulunmuyor.</p>
        ) : (
          notes.map((note) => {
            const isTemp = note.id.startsWith("temp_");
            return (
              <div
                key={note.id}
                className={`rounded-xl border p-4 transition-all ${
                  isTemp
                    ? "border-blue-500/40 bg-blue-950/20 animate-pulse"
                    : "border-slate-800 bg-slate-950/70"
                }`}
              >
                <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800/60 pb-2 mb-2">
                  <span className="font-bold text-slate-200">{note.amUser?.name || "Account Manager"}</span>
                  <span className="font-mono">
                    {new Date(note.createdAt).toLocaleDateString("tr-TR", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">{note.content}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
