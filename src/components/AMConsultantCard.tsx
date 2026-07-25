import Link from "next/link";

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-brand-teal">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted group-hover:text-brand-teal transition-colors">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted group-hover:text-brand-teal transition-colors">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  );
}

export default function AMConsultantCard() {
  return (
    <section className="py-section-sm md:py-section-md lg:py-section-lg bg-surface-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Text Content */}
          <div className="flex flex-col items-start">
            <span className="text-eyebrow font-semibold uppercase tracking-widest text-brand-teal">
              KİŞİSEL DANIŞMANLIK
            </span>
            <h2 className="font-display text-section-title font-semibold text-text-primary mt-3 mb-6">
              Uzman Hesap Yöneticiniz
            </h2>
            <p className="text-base text-text-body leading-relaxed mb-8 max-w-lg">
              Süreç boyunca size özel bir Biyomedikal Hesap Yöneticisi atanır —
              karar aşamasından kurulumun tamamlanmasına kadar yanınızda olur.
            </p>
            
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-teal/10 flex items-center justify-center flex-shrink-0">
                  <CheckIcon />
                </div>
                <span className="text-text-primary text-sm">15 dakika içinde geri dönüş garantisi</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-teal/10 flex items-center justify-center flex-shrink-0">
                  <CheckIcon />
                </div>
                <span className="text-text-primary text-sm">Teknik sorularınıza doğrudan mühendislik desteği</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-teal/10 flex items-center justify-center flex-shrink-0">
                  <CheckIcon />
                </div>
                <span className="text-text-primary text-sm">Yetkili servis ve garanti süreçlerinde rehberlik</span>
              </li>
            </ul>
            
            <Link 
              href="/teklif-al"
              className="inline-flex items-center justify-center bg-brand-teal hover:bg-brand-teal-hover text-white rounded-pill px-8 py-3.5 text-sm font-semibold transition-colors shadow-sm"
            >
              Danışmanla Görüş &rarr;
            </Link>
          </div>
          
          {/* Right AM Card */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-white rounded-xl shadow-card-hover border border-border-subtle overflow-hidden">
              <div className="p-8 pb-6 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-brand-teal flex items-center justify-center mb-5">
                  <span className="font-display text-3xl font-semibold text-white tracking-wide">ÖE</span>
                </div>
                
                <h3 className="font-display text-2xl font-semibold text-text-primary mb-1">
                  Özün Ekmekçi
                </h3>
                <p className="text-sm text-text-muted mb-8">
                  Biyomedikal Hesap Yöneticisi
                </p>
                
                <div className="w-full space-y-3 mb-8">
                  <a href="tel:+905329998877" className="group flex items-center justify-center p-3 rounded-lg bg-surface-light hover:bg-surface-cream transition-colors">
                    <PhoneIcon />
                    <span className="text-sm font-medium text-text-primary ml-3">0532 999 88 77</span>
                  </a>
                  <a href="mailto:info@leadusg.com" className="group flex items-center justify-center p-3 rounded-lg bg-surface-light hover:bg-surface-cream transition-colors">
                    <MailIcon />
                    <span className="text-sm font-medium text-text-primary ml-3">info@leadusg.com</span>
                  </a>
                </div>
              </div>
              
              <div className="bg-surface-canvas py-4 px-6 border-t border-border-subtle flex items-center justify-center">
                <span className="inline-flex items-center rounded-pill bg-brand-teal/10 px-4 py-1.5 text-xs font-medium text-brand-teal">
                  Biyomedikal Mühendis &bull; 5+ Yıl Deneyim
                </span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
