import { Suspense } from "react";
import ProposalForm from "@/components/ProposalForm";

export default function ProposalPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <Suspense
        fallback={
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-8 text-center text-slate-400">
            Form yükleniyor...
          </div>
        }
      >
        <ProposalForm />
      </Suspense>
    </div>
  );
}
