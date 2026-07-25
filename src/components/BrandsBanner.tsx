import Image from "next/image";

export default function BrandsBanner() {
  return (
    <section id="markalar" className="py-section-sm md:py-section-md bg-surface-canvas border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 lg:mb-10">
          <span className="text-eyebrow font-semibold uppercase tracking-widest text-brand-teal">
            ÖNDE GELEN ÜRETİCİLER
          </span>
          <h2 className="font-display text-section-title font-semibold text-text-primary mt-2">
            Çalıştığımız Üretici Markalar
          </h2>
          <p className="text-text-muted text-sm mt-2 max-w-xl mx-auto">
            Listelediğimiz her cihaz, yetkili distribütör garantisi ve güncel teknik servis desteğiyle gelir.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {/* BRAND 1: GE HEALTHCARE */}
          <div className="p-5 rounded border border-border-subtle bg-white hover:border-brand-teal hover:shadow-card-hover transition-all flex flex-col justify-between items-center text-center group h-36">
            <div className="w-full h-14 flex items-center justify-center p-2">
              <Image src="/brands/ge.svg" alt="GE HealthCare Logo" width={80} height={40} className="max-h-10 max-w-full object-contain filter group-hover:scale-105 transition-transform" />
            </div>
            <div>
              <div className="font-sans text-xs font-semibold text-text-primary group-hover:text-brand-teal">GE HealthCare</div>
              <div className="text-[10px] font-mono-tech text-text-muted">Voluson · Logiq · Vivid</div>
            </div>
          </div>

          {/* BRAND 2: PHILIPS */}
          <div className="p-5 rounded border border-border-subtle bg-white hover:border-brand-teal hover:shadow-card-hover transition-all flex flex-col justify-between items-center text-center group h-36">
            <div className="w-full h-14 flex items-center justify-center p-2">
              <Image src="/brands/philips.svg" alt="Philips Logo" width={80} height={40} className="max-h-8 max-w-full object-contain filter group-hover:scale-105 transition-transform" />
            </div>
            <div>
              <div className="font-sans text-xs font-semibold text-text-primary group-hover:text-brand-teal">Philips</div>
              <div className="text-[10px] font-mono-tech text-text-muted">EPIQ · Affiniti · InnoSight</div>
            </div>
          </div>

          {/* BRAND 3: SAMSUNG MEDISON */}
          <div className="p-5 rounded border border-border-subtle bg-white hover:border-brand-teal hover:shadow-card-hover transition-all flex flex-col justify-between items-center text-center group h-36">
            <div className="w-full h-14 flex items-center justify-center p-2">
              <Image src="/brands/samsung.svg" alt="Samsung Medison Logo" width={80} height={40} className="max-h-8 max-w-full object-contain filter group-hover:scale-105 transition-transform" />
            </div>
            <div>
              <div className="font-sans text-xs font-semibold text-text-primary group-hover:text-brand-teal">Samsung Medison</div>
              <div className="text-[10px] font-mono-tech text-text-muted">HERA · V8 · RS85</div>
            </div>
          </div>

          {/* BRAND 4: SIEMENS HEALTHINEERS */}
          <div className="p-5 rounded border border-border-subtle bg-white hover:border-brand-teal hover:shadow-card-hover transition-all flex flex-col justify-between items-center text-center group h-36">
            <div className="w-full h-14 flex items-center justify-center p-2">
              <Image src="/brands/siemens.svg" alt="Siemens Healthineers Logo" width={80} height={40} className="max-h-12 max-w-full object-contain filter group-hover:scale-105 transition-transform" />
            </div>
            <div>
              <div className="font-sans text-xs font-semibold text-text-primary group-hover:text-brand-teal">Siemens Healthineers</div>
              <div className="text-[10px] font-mono-tech text-text-muted">ACUSON Sequoia</div>
            </div>
          </div>

          {/* BRAND 5: CANON MEDICAL */}
          <div className="p-5 rounded border border-border-subtle bg-white hover:border-brand-teal hover:shadow-card-hover transition-all flex flex-col justify-between items-center text-center group h-36">
            <div className="w-full h-14 flex items-center justify-center p-2">
              <Image src="/brands/canon.svg" alt="Canon Medical Logo" width={80} height={40} className="max-h-8 max-w-full object-contain filter group-hover:scale-105 transition-transform" />
            </div>
            <div>
              <div className="font-sans text-xs font-semibold text-text-primary group-hover:text-brand-teal">Canon Medical</div>
              <div className="text-[10px] font-mono-tech text-text-muted">Aplio i800 · Aplio a</div>
            </div>
          </div>

          {/* BRAND 6: MINDRAY */}
          <div className="p-5 rounded border border-border-subtle bg-white hover:border-brand-teal hover:shadow-card-hover transition-all flex flex-col justify-between items-center text-center group h-36">
            <div className="w-full h-14 flex items-center justify-center p-2">
              <Image src="/brands/mindray.svg" alt="Mindray Logo" width={80} height={40} className="max-h-10 max-w-full object-contain filter group-hover:scale-105 transition-transform" />
            </div>
            <div>
              <div className="font-sans text-xs font-semibold text-text-primary group-hover:text-brand-teal">Mindray</div>
              <div className="text-[10px] font-mono-tech text-text-muted">Resona 7 · Nuewa I9</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
