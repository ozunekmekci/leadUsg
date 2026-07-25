export interface ProductSpecs {
  screenSize?: string;
  probePorts?: number;
  portable?: boolean;
  applicationAreas?: string[];
  priceSegment?: string;
  highlights?: string[];
  beamformer?: string;
  elastography?: boolean;
  transducerType?: string;
}

export interface FallbackProduct {
  id: number;
  slug: string;
  name: string;
  brand: string;
  category: string;
  specs: ProductSpecs;
  description: string;
  createdAt: string;
}

export const FALLBACK_PRODUCTS: FallbackProduct[] = [
  {
    id: 1,
    slug: "ge-voluson-e10",
    name: "Voluson E10",
    brand: "GE HealthCare",
    category: "ultrason",
    createdAt: "2026-01-15T10:00:00.000Z",
    specs: {
      screenSize: "23 inç OLED",
      probePorts: 4,
      portable: false,
      applicationAreas: ["Kadın Doğum", "Perinatoloji", "Yüksek Riskli Gebelik"],
      priceSegment: "3M+ TL",
      beamformer: "Matrix Beamformer",
      elastography: true,
      transducerType: "Matrix Prob",
      highlights: [
        "4D Matrix prob mimarisi ve yüksek çözünürlüklü doku ayrımı",
        "HDlive teknolojisi ile gerçekçi 3D/4D hacimsel görüntüleme",
        "23 inç esnek OLED ekran ve ergonomik dokunmatik kontrol paneli"
      ]
    },
    description: "Yüksek riskli gebelik takibi ve perinatoloji uzmanları için geliştirilmiş üst segment ultrason sistemi. Gelişmiş hacimsel görüntüleme algoritmaları sayesinde anne karnındaki bebeğin anatomik detaylarını net bir şekilde incelemeye olanak tanır."
  },
  {
    id: 2,
    slug: "ge-logiq-e10",
    name: "Logiq E10",
    brand: "GE HealthCare",
    category: "ultrason",
    createdAt: "2026-01-20T10:00:00.000Z",
    specs: {
      screenSize: "23 inç OLED",
      probePorts: 4,
      portable: false,
      applicationAreas: ["Radyoloji", "Girişimsel Radyoloji", "Dahiliye"],
      priceSegment: "2-3M TL",
      beamformer: "cSound Mimarisi",
      elastography: true,
      transducerType: "B-Flow Prob",
      highlights: [
        "cSound mimarisi ile anlık veritabanı odaklama",
        "Derin doku mikro damarlanma analizi için B-Flow modülü",
        "Kapasitif dokunmatik ekran ve hızlı hasta kaydı altyapısı"
      ]
    },
    description: "Genel radyoloji ve biyopsi gibi girişimsel işlemler için tasarlanmış amiral gemisi konsol ultrasonu. Farklı hasta yapılarında kanal başına yüksek veri işleme gücü sunarak teşhis süresini kısaltır."
  },
  {
    id: 3,
    slug: "philips-epiq-elite",
    name: "EPIQ Elite",
    brand: "Philips",
    category: "ultrason",
    createdAt: "2026-02-01T10:00:00.000Z",
    specs: {
      screenSize: "24 inç HD Display",
      probePorts: 4,
      portable: false,
      applicationAreas: ["Kardiyoloji", "Radyoloji", "Damar Cerrahisi"],
      priceSegment: "3M+ TL",
      beamformer: "nSIGHT Mimarisi",
      elastography: true,
      transducerType: "PureWave Kristal",
      highlights: [
        "PureWave kristal dönüştürücü teknolojisi",
        "nSIGHT mimarisi ile yüksek kare hızında kesintisiz odaklama",
        "Gelişmiş elastografi ve karaciğer yağlanması ölçüm araçları"
      ]
    },
    description: "Kardiyak ve genel teşhis odaklı klinikler için üretilmiş yüksek çözünürlüklü görüntüleme çözümü. Zorlu hasta tiplerinde dahi yapıyı zorlanmadan netleştiren akustik sinyal işleme mimarisine sahiptir."
  },
  {
    id: 4,
    slug: "samsung-hera-w9",
    name: "Hera W9",
    brand: "Samsung",
    category: "ultrason",
    createdAt: "2026-02-10T10:00:00.000Z",
    specs: {
      screenSize: "21.5 inç LED",
      probePorts: 4,
      portable: false,
      applicationAreas: ["Kadın Doğum", "Jinekoloji", "Radyoloji"],
      priceSegment: "2-3M TL",
      beamformer: "Crystal Architecture",
      elastography: false,
      transducerType: "ShadowHDR Prob",
      highlights: [
        "Crystal Architecture ile net kenar keskinliği",
        "ShadowHDR teknolojisi ile gölgeli alanların aydınlatılması",
        "Ergonomik hareketli kol sistemi ve sezgisel arayüz"
      ]
    },
    description: "Jinekoloji ve genel kadın sağlığı muayenehanelerine yönelik modern tanı platformu. Doku sınırlarını netleştiren yazılım desteği ile rutin muayenelerde güvenilir sonuçlar üretir."
  },
  {
    id: 5,
    slug: "mindray-resona-7",
    name: "Resona 7",
    brand: "Mindray",
    category: "ultrason",
    createdAt: "2026-02-15T10:00:00.000Z",
    specs: {
      screenSize: "21.5 inç Full HD",
      probePorts: 4,
      portable: false,
      applicationAreas: ["Radyoloji", "Vasküler", "Yüzeyel Dokular"],
      priceSegment: "1-2M TL",
      beamformer: "ZONE Sonography",
      elastography: true,
      transducerType: "STE Prob",
      highlights: [
        "ZONARE altyapılı ZONE Sonography teknolojisi",
        "STE Elastografi ile doku sertliği analizi",
        "Hızlı yönlendirilebilir 12.1 inç dokunmatik komuta paneli"
      ]
    },
    description: "Kanal verisini hızlı işleyen mimarisiyle dikkat çeken premium sınıf radyoloji ultrasonu. Yüzeyel organ incelemelerinde ve elastografi değerlendirmelerinde hassas doku kontrastı sağlar."
  },
  {
    id: 6,
    slug: "canon-aplio-i800",
    name: "Aplio i800",
    brand: "Canon Medical",
    category: "ultrason",
    createdAt: "2026-03-01T10:00:00.000Z",
    specs: {
      screenSize: "23 inç Full HD",
      probePorts: 4,
      portable: false,
      applicationAreas: ["Radyoloji", "Kas İskelet", "Pediatri"],
      priceSegment: "2-3M TL",
      beamformer: "iPerformance",
      elastography: true,
      transducerType: "SMI Yüksek Frekans",
      highlights: [
        "iPerformance ultra yüksek frekanslı problar",
        "SMI (Superb Micro-vascular Imaging) yavaş akım görüntüleme",
        "Akıllı ergonomik konsol tasarımı ve doku uyarlamalı odaklama"
      ]
    },
    description: "Mikro damarlanmaları incelemede fark yaratan tıbbi görüntüleme sistemi. Kas-iskelet sistemi ve pediatrik ultrason incelemelerinde yüksek frekanslı prob desteği sunar."
  },
  {
    id: 7,
    slug: "siemens-acuson-sequoia",
    name: "ACUSON Sequoia",
    brand: "Siemens Healthineers",
    category: "ultrason",
    createdAt: "2026-03-10T10:00:00.000Z",
    specs: {
      screenSize: "22 inç OLED",
      probePorts: 4,
      portable: false,
      applicationAreas: ["Dahiliye", "Radyoloji", "Kardiyoloji"],
      priceSegment: "2-3M TL",
      beamformer: "BioAcoustic Mimarisi",
      elastography: true,
      transducerType: "Deep Abdominal Prob",
      highlights: [
        "BioAcoustic teknolojisi ile vücut yapısına uyumlu penetrasyon",
        "Deep Abdominal Transducer desteği",
        "One-touch doku optimizasyon algoritmaları"
      ]
    },
    description: "Bariatrik ve derin doku muayenelerinde çözünürlük kaybını önlemek üzere tasarlanmış biyomedikal ultrason konsolu. Farklı doku tiplerinde penetrasyon derinliğini korur."
  },
  {
    id: 8,
    slug: "sonosite-lx-portable",
    name: "Sonosite LX",
    brand: "Fujifilm Sonosite",
    category: "ultrason",
    createdAt: "2026-03-15T10:00:00.000Z",
    specs: {
      screenSize: "21.3 inç Dikey Dokunmatik",
      probePorts: 2,
      portable: true,
      applicationAreas: ["Acil Servis", "Yoğun Bakım", "Anestezi", "Point-of-Care"],
      priceSegment: "1-2M TL",
      beamformer: "POC Ultra-Rugged",
      elastography: false,
      transducerType: "Armored Prob",
      highlights: [
        "Darbe ve sıvı sıçramasına dayanıklı sağlam gövde",
        "Dikey ekran tasarımı ile ameliyathane uyumu",
        "Hızlı açılış süresi ve dahili batarya desteği"
      ]
    },
    description: "Acil tıp, anestezi ve hasta başı (POC) girişimsel işlemler için tasarlanmış taşınabilir ve dayanıklı ultrason ünitesi. Sterilizasyonu kolay yüzeyi ve dikey ekranı ile yoğun bakım ortamlarına tam uyum sağlar."
  }
];
