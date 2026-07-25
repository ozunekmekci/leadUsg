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
  signalProcessing?: string;
  probeTechnology?: string;
  autoOptimization?: string;
  compoundImaging?: string;
  speckleReduction?: string;
  flowImaging?: string;
  workflowProtocol?: string;
  shearwave?: string;
  fusionImaging?: string;
  fourDImaging?: string;
  clinicalUnits?: string[];
  competitors?: Record<string, string>;
  imageUrl?: string;
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
    "id": 1,
    "slug": "samsung-v5",
    "name": "V5",
    "brand": "Samsung",
    "category": "ultrason",
    "createdAt": "2026-07-25T22:33:10.993Z",
    "specs": {
      "signalProcessing": "CrystalBeam, S-Vision & Crystal Architecture",
      "probeTechnology": "S-Vue Transducers, Matrix Array Probes",
      "autoOptimization": "QuickScan, Auto Biometry",
      "compoundImaging": "MultiVision",
      "speckleReduction": "ClearVision, HQ-Vision",
      "flowImaging": "S-Flow, MV-Flow, LumiFlow",
      "workflowProtocol": "EZ Exam+, BiometryAssist",
      "shearwave": "Point & 2D Shearwave (S-Shearwave)",
      "fusionImaging": "S-Fusion",
      "fourDImaging": "Realistic Vue, Crystal Vue, 3D XI",
      "imageUrl": "/products/samsung/v5/main.png",
      "priceSegment": "MID_RANGE",
      "clinicalUnits": [
        "OBGYN",
        "RADIOLOGY"
      ],
      "competitors": {
        "GE": "Voluson S6 / Logiq P7",
        "Siemens": "Juniper"
      }
    },
    "description": "Samsung V5 çok branşlı kadın doğum ve genel radyoloji ultrasonu."
  },
  {
    "id": 2,
    "slug": "samsung-v8",
    "name": "V8",
    "brand": "Samsung",
    "category": "ultrason",
    "createdAt": "2026-07-25T22:33:10.999Z",
    "specs": {
      "signalProcessing": "CrystalBeam, S-Vision & Crystal Architecture",
      "probeTechnology": "S-Vue Transducers, Matrix Array Probes",
      "autoOptimization": "QuickScan, Auto Biometry",
      "compoundImaging": "MultiVision",
      "speckleReduction": "ClearVision, HQ-Vision",
      "flowImaging": "S-Flow, MV-Flow, LumiFlow",
      "workflowProtocol": "EZ Exam+, BiometryAssist",
      "shearwave": "Point & 2D Shearwave (S-Shearwave)",
      "fusionImaging": "S-Fusion",
      "fourDImaging": "Realistic Vue, Crystal Vue, 3D XI",
      "imageUrl": "/products/samsung/v8/main.jpg",
      "priceSegment": "HIGH_END",
      "clinicalUnits": [
        "OBGYN",
        "RADIOLOGY"
      ],
      "competitors": {
        "GE": "Voluson E8 / Logiq S8",
        "Philips": "EPIQ 7"
      }
    },
    "description": "Samsung V8 üst segment kristal görüntüleme teknolojili tanı ultrasonu."
  },
  {
    "id": 3,
    "slug": "samsung-z20",
    "name": "Z20",
    "brand": "Samsung",
    "category": "ultrason",
    "createdAt": "2026-07-25T22:33:11.004Z",
    "specs": {
      "signalProcessing": "CrystalBeam, S-Vision & Crystal Architecture",
      "probeTechnology": "S-Vue Transducers, Matrix Array Probes",
      "autoOptimization": "QuickScan, Auto Biometry",
      "compoundImaging": "MultiVision",
      "speckleReduction": "ClearVision, HQ-Vision",
      "flowImaging": "S-Flow, MV-Flow, LumiFlow",
      "workflowProtocol": "EZ Exam+, BiometryAssist",
      "shearwave": "Point & 2D Shearwave (S-Shearwave)",
      "fusionImaging": "S-Fusion",
      "fourDImaging": "Realistic Vue, Crystal Vue, 3D XI",
      "imageUrl": "/products/samsung/z20/main.jpg",
      "priceSegment": "HIGH_END",
      "clinicalUnits": [
        "OBGYN",
        "RADIOLOGY"
      ],
      "competitors": {
        "GE": "Voluson E10 / Voluson Signature",
        "Philips": "EPIQ 7W"
      }
    },
    "description": "Samsung Z20 Kadın Sağlığı ve Perinatoloji odaklı gelişmiş 3D/4D akıllı ultrason konsolu."
  },
  {
    "id": 4,
    "slug": "samsung-hs40",
    "name": "HS40",
    "brand": "Samsung",
    "category": "ultrason",
    "createdAt": "2026-07-25T22:33:11.012Z",
    "specs": {
      "signalProcessing": "CrystalBeam, S-Vision & Crystal Architecture",
      "probeTechnology": "S-Vue Transducers, Matrix Array Probes",
      "autoOptimization": "QuickScan, Auto Biometry",
      "compoundImaging": "MultiVision",
      "speckleReduction": "ClearVision, HQ-Vision",
      "flowImaging": "S-Flow, MV-Flow, LumiFlow",
      "workflowProtocol": "EZ Exam+, BiometryAssist",
      "shearwave": "Point & 2D Shearwave (S-Shearwave)",
      "fusionImaging": "S-Fusion",
      "fourDImaging": "Realistic Vue, Crystal Vue, 3D XI",
      "imageUrl": "/products/samsung/hs40/main.jpg",
      "priceSegment": "MID_RANGE",
      "clinicalUnits": [
        "RADIOLOGY",
        "OBGYN",
        "CARDIOLOGY"
      ],
      "competitors": {
        "GE": "Logiq P7",
        "Siemens": "Juniper",
        "Philips": "Affiniti 50"
      }
    },
    "description": "Samsung HS40 günlük klinik teşhisler için kompakt ve güçlü ultrason ünitesi."
  },
  {
    "id": 5,
    "slug": "ge-logiq-e10",
    "name": "Logiq E10",
    "brand": "GE",
    "category": "ultrason",
    "createdAt": "2026-07-25T22:33:11.019Z",
    "specs": {
      "signalProcessing": "cSound, Agile & Radiance Architecture",
      "probeTechnology": "Matrix Array, XDclear Technology, Acoustic Amplifier",
      "autoOptimization": "ATO (Auto Tissue Optimization)",
      "compoundImaging": "CrossXBeam",
      "speckleReduction": "SRI (Speckle Reduction Imaging)",
      "flowImaging": "B-Flow, HD-Flow, SlowFlowHD, RadiantFlow",
      "workflowProtocol": "Scan Assistant",
      "shearwave": "2D Shearwave Elastography",
      "fusionImaging": "Volume Navigation (VNav)",
      "fourDImaging": "HDlive, HDlive Silhouette, HDlive Studio",
      "imageUrl": "/products/ge/logiq-e10/main.webp",
      "priceSegment": "PREMIUM",
      "clinicalUnits": [
        "RADIOLOGY"
      ],
      "competitors": {
        "Samsung": "RS85 Prestige",
        "Siemens": "Acuson Sequoia"
      }
    },
    "description": "GE Logiq E10 genel radyoloji ve girişimsel biyopsi amiral gemisi konsol ultrasonu."
  },
  {
    "id": 6,
    "slug": "ge-voluson-e10",
    "name": "Voluson E10",
    "brand": "GE",
    "category": "ultrason",
    "createdAt": "2026-07-25T22:33:11.025Z",
    "specs": {
      "signalProcessing": "cSound, Agile & Radiance Architecture",
      "probeTechnology": "Matrix Array, XDclear Technology, Acoustic Amplifier",
      "autoOptimization": "ATO (Auto Tissue Optimization)",
      "compoundImaging": "CrossXBeam",
      "speckleReduction": "SRI (Speckle Reduction Imaging)",
      "flowImaging": "B-Flow, HD-Flow, SlowFlowHD, RadiantFlow",
      "workflowProtocol": "Scan Assistant",
      "shearwave": "2D Shearwave Elastography",
      "fusionImaging": "Volume Navigation (VNav)",
      "fourDImaging": "HDlive, HDlive Silhouette, HDlive Studio",
      "imageUrl": "/products/ge/voluson-e10/main.jpg",
      "priceSegment": "PREMIUM",
      "clinicalUnits": [
        "OBGYN"
      ],
      "competitors": {
        "Samsung": "HERA W10 / Z20",
        "Philips": "EPIQ Elite w/xMatrix"
      }
    },
    "description": "GE Voluson E10 perinatoloji ve yüksek riskli gebelik 4D Matrix ultrason sistemi."
  },
  {
    "id": 7,
    "slug": "ge-vivid-t8",
    "name": "Vivid T8",
    "brand": "GE",
    "category": "ultrason",
    "createdAt": "2026-07-25T22:33:11.032Z",
    "specs": {
      "signalProcessing": "cSound, Agile & Radiance Architecture",
      "probeTechnology": "Matrix Array, XDclear Technology, Acoustic Amplifier",
      "autoOptimization": "ATO (Auto Tissue Optimization)",
      "compoundImaging": "CrossXBeam",
      "speckleReduction": "SRI (Speckle Reduction Imaging)",
      "flowImaging": "B-Flow, HD-Flow, SlowFlowHD, RadiantFlow",
      "workflowProtocol": "Scan Assistant",
      "shearwave": "2D Shearwave Elastography",
      "fusionImaging": "Volume Navigation (VNav)",
      "fourDImaging": "HDlive, HDlive Silhouette, HDlive Studio",
      "imageUrl": "/products/ge/vivid-t8/main.png",
      "priceSegment": "MID_RANGE",
      "clinicalUnits": [
        "CARDIOLOGY",
        "RADIOLOGY"
      ],
      "competitors": {
        "Philips": "Affiniti 50",
        "Siemens": "Acuson NX3 Elite",
        "Samsung": "HS40-CV"
      }
    },
    "description": "GE Vivid T8 kardiyoloji odaklı ve genel dahiliye hibrit konsol ultrason ünitesi."
  },
  {
    "id": 8,
    "slug": "philips-epiq-elite",
    "name": "EPIQ Elite",
    "brand": "Philips",
    "category": "ultrason",
    "createdAt": "2026-07-25T22:33:11.038Z",
    "specs": {
      "signalProcessing": "nSIGHT Imaging Architecture",
      "probeTechnology": "xMATRIX array, PureWave Crystal Technology",
      "autoOptimization": "iScan, iOptimize",
      "compoundImaging": "SonoCT Real-time Compound Imaging",
      "speckleReduction": "X-RES Adaptive Image Processing",
      "flowImaging": "Micro CPA, Microflow Imaging",
      "workflowProtocol": "SmartExam",
      "shearwave": "ElastQ Imaging (Point & 2D Shearwave)",
      "fusionImaging": "PercuNav Image Fusion",
      "fourDImaging": "TrueVue, GlassVue",
      "imageUrl": "/products/philips/epiq-elite/main.png",
      "priceSegment": "PREMIUM",
      "clinicalUnits": [
        "RADIOLOGY",
        "OBGYN",
        "CARDIOLOGY"
      ],
      "competitors": {
        "Samsung": "RS85 / Z20",
        "GE": "Logiq E10 / Voluson E10"
      }
    },
    "description": "Philips EPIQ Elite nSIGHT mimarili amiral gemisi tıbbi görüntüleme çözümü."
  },
  {
    "id": 9,
    "slug": "philips-affiniti-50",
    "name": "Affiniti 50",
    "brand": "Philips",
    "category": "ultrason",
    "createdAt": "2026-07-25T22:33:11.043Z",
    "specs": {
      "signalProcessing": "nSIGHT Imaging Architecture",
      "probeTechnology": "xMATRIX array, PureWave Crystal Technology",
      "autoOptimization": "iScan, iOptimize",
      "compoundImaging": "SonoCT Real-time Compound Imaging",
      "speckleReduction": "X-RES Adaptive Image Processing",
      "flowImaging": "Micro CPA, Microflow Imaging",
      "workflowProtocol": "SmartExam",
      "shearwave": "ElastQ Imaging (Point & 2D Shearwave)",
      "fusionImaging": "PercuNav Image Fusion",
      "fourDImaging": "TrueVue, GlassVue",
      "imageUrl": "/products/philips/affiniti-50/main.jpg",
      "priceSegment": "MID_RANGE",
      "clinicalUnits": [
        "RADIOLOGY",
        "CARDIOLOGY",
        "OBGYN"
      ],
      "competitors": {
        "Samsung": "HS50 / HS40",
        "GE": "Logiq P9 / P7",
        "Siemens": "Juniper"
      }
    },
    "description": "Philips Affiniti 50 hassas akustik performanslı çok branşlı muayene ultrasonu."
  },
  {
    "id": 10,
    "slug": "canon-aplio-i800",
    "name": "Aplio i800",
    "brand": "Canon",
    "category": "ultrason",
    "createdAt": "2026-07-25T22:33:11.050Z",
    "specs": {
      "signalProcessing": "iBeam & aBeam High-Density Architecture",
      "probeTechnology": "iDMS, Dynamic Micro Slice, XBT Transducers",
      "autoOptimization": "Quick Scan, TSO",
      "compoundImaging": "ApliPure+",
      "speckleReduction": "Precision Imaging",
      "flowImaging": "S.M.I. (Superb Micro-vascular Imaging), Advanced Dynamic Flow",
      "workflowProtocol": "Quick Assist Protocol",
      "shearwave": "Smart Maps 2D Shearwave",
      "fusionImaging": "Smart Fusion",
      "fourDImaging": "Luminance, Shadow Glass",
      "imageUrl": "/products/canon/aplio-i800/main.png",
      "priceSegment": "HIGH_END",
      "clinicalUnits": [
        "RADIOLOGY",
        "OBGYN"
      ],
      "competitors": {
        "Samsung": "RS80 Evo / Z20",
        "GE": "Logiq E9 / Voluson E8"
      }
    },
    "description": "Canon Aplio i800 mikro damarlanma (SMI) odaklı yüksek frekanslı konsol ultrasonu."
  },
  {
    "id": 11,
    "slug": "siemens-acuson-sequoia",
    "name": "Acuson Sequoia",
    "brand": "Siemens",
    "category": "ultrason",
    "createdAt": "2026-07-25T22:33:11.054Z",
    "specs": {
      "signalProcessing": "BioAcoustic, SieStream Core Architecture",
      "probeTechnology": "DAX, HD Single Crystal, Multi-D Array, Hanafy Lens",
      "autoOptimization": "TEQ (Tissue Equalization)",
      "compoundImaging": "Advanced SieClear Spatial Compounding",
      "speckleReduction": "DTCE (Dynamic Tissue Contrast Enhancement)",
      "flowImaging": "Sie-Flow, Clarify VE, Doppler Tissue Energy",
      "workflowProtocol": "eSieScan Protocol",
      "shearwave": "Virtual Touch IQ (ARFI Technology)",
      "fusionImaging": "eSieFusion",
      "fourDImaging": "4D Cardiology & Fetal Echo Modül",
      "imageUrl": "/products/siemens/acuson-sequoia/main.jpg",
      "priceSegment": "PREMIUM",
      "clinicalUnits": [
        "RADIOLOGY"
      ],
      "competitors": {
        "Samsung": "RS85 Prestige",
        "GE": "Logiq E10"
      }
    },
    "description": "Siemens Acuson Sequoia derin doku ve bariatrik penetrasyon amiral gemisi ultrason platformu."
  },
  {
    "id": 12,
    "slug": "siemens-acuson-juniper",
    "name": "Acuson Juniper",
    "brand": "Siemens",
    "category": "ultrason",
    "createdAt": "2026-07-25T22:33:11.062Z",
    "specs": {
      "signalProcessing": "BioAcoustic, SieStream Core Architecture",
      "probeTechnology": "DAX, HD Single Crystal, Multi-D Array, Hanafy Lens",
      "autoOptimization": "TEQ (Tissue Equalization)",
      "compoundImaging": "Advanced SieClear Spatial Compounding",
      "speckleReduction": "DTCE (Dynamic Tissue Contrast Enhancement)",
      "flowImaging": "Sie-Flow, Clarify VE, Doppler Tissue Energy",
      "workflowProtocol": "eSieScan Protocol",
      "shearwave": "Virtual Touch IQ (ARFI Technology)",
      "fusionImaging": "eSieFusion",
      "fourDImaging": "4D Cardiology & Fetal Echo Modül",
      "imageUrl": "/products/siemens/acuson-juniper/main.png",
      "priceSegment": "MID_RANGE",
      "clinicalUnits": [
        "RADIOLOGY",
        "OBGYN"
      ],
      "competitors": {
        "Samsung": "HS50 / HS40",
        "GE": "Logiq P9 / P7"
      }
    },
    "description": "Siemens Acuson Juniper esnek ve sessiz çalışan genel tanı ultrason ünitesi."
  }
];
