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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* BRAND 1: GE HEALTHCARE */}
          <div className="p-4 rounded-lg border border-slate-200 bg-white hover:border-brand-teal hover:shadow-md transition-all flex items-center justify-center group h-24">
            <Image
              src="/brands/ge.png"
              alt="GE HealthCare Logo"
              width={120}
              height={50}
              className="max-h-14 max-w-[85%] object-contain filter group-hover:scale-105 transition-transform"
            />
          </div>

          {/* BRAND 2: PHILIPS */}
          <div className="p-4 rounded-lg border border-slate-200 bg-white hover:border-brand-teal hover:shadow-md transition-all flex items-center justify-center group h-24">
            <Image
              src="/brands/philips.svg"
              alt="Philips Logo"
              width={120}
              height={50}
              className="max-h-12 max-w-[85%] object-contain filter group-hover:scale-105 transition-transform"
            />
          </div>

          {/* BRAND 3: SAMSUNG MEDISON */}
          <div className="p-4 rounded-lg border border-slate-200 bg-white hover:border-brand-teal hover:shadow-md transition-all flex items-center justify-center group h-24">
            <Image
              src="/brands/samsung.svg"
              alt="Samsung Medison Logo"
              width={120}
              height={50}
              className="max-h-12 max-w-[85%] object-contain filter group-hover:scale-105 transition-transform"
            />
          </div>

          {/* BRAND 4: SIEMENS HEALTHINEERS */}
          <div className="p-4 rounded-lg border border-slate-200 bg-white hover:border-brand-teal hover:shadow-md transition-all flex items-center justify-center group h-24">
            <Image
              src="/brands/siemens.svg"
              alt="Siemens Healthineers Logo"
              width={120}
              height={50}
              className="max-h-14 max-w-[85%] object-contain filter group-hover:scale-105 transition-transform"
            />
          </div>

          {/* BRAND 5: CANON MEDICAL */}
          <div className="p-4 rounded-lg border border-slate-200 bg-white hover:border-brand-teal hover:shadow-md transition-all flex items-center justify-center group h-24">
            <Image
              src="/brands/canon.svg"
              alt="Canon Medical Logo"
              width={120}
              height={50}
              className="max-h-12 max-w-[85%] object-contain filter group-hover:scale-105 transition-transform"
            />
          </div>

          {/* BRAND 6: MINDRAY */}
          <div className="p-4 rounded-lg border border-slate-200 bg-white hover:border-brand-teal hover:shadow-md transition-all flex items-center justify-center group h-24">
            <Image
              src="/brands/mindray.png"
              alt="Mindray Logo"
              width={120}
              height={50}
              className="max-h-14 max-w-[85%] object-contain filter group-hover:scale-105 transition-transform"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
