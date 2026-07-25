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
    "slug": "samsung-rs85-prestige",
    "name": "RS85 Prestige",
    "brand": "Samsung",
    "category": "ultrason",
    "createdAt": "2026-07-25T21:19:23.954Z",
    "specs": {
      "priceSegment": "PREMIUM",
      "clinicalUnits": [
        "RADIOLOGY"
      ],
      "competitors": {
        "GE": "Logiq E10",
        "Siemens": "Acuson Sequoia"
      },
      "signalProcessing": "CrystalBeam, S-Vision Architecture",
      "probeTechnology": "S-Vue Technology, Matrix Transducers",
      "autoOptimization": "QuickScan",
      "compoundImaging": "MultiVision",
      "speckleReduction": "ClearVision",
      "flowImaging": "S-Flow, MV-Flow, LumiFlow",
      "workflowProtocol": "EZ Exam+",
      "shearwave": "Point & 2D Shearwave (S-Shearwave)",
      "fusionImaging": "S-Fusion",
      "fourDImaging": "Realistic Vue, Crystal Vue"
    },
    "description": "Samsung RS85 Prestige medikal ultrason görüntüleme sistemi."
  },
  {
    "id": 2,
    "slug": "samsung-rs85",
    "name": "RS85",
    "brand": "Samsung",
    "category": "ultrason",
    "createdAt": "2026-07-25T21:19:23.954Z",
    "specs": {
      "priceSegment": "PREMIUM",
      "clinicalUnits": [
        "RADIOLOGY"
      ],
      "competitors": {
        "GE": "Logiq E10",
        "Siemens": "Acuson Sequoia",
        "Philips": "EPIQ Elite w/xMatrix"
      },
      "signalProcessing": "CrystalBeam, S-Vision Architecture",
      "probeTechnology": "S-Vue Technology, Matrix Transducers",
      "autoOptimization": "QuickScan",
      "compoundImaging": "MultiVision",
      "speckleReduction": "ClearVision",
      "flowImaging": "S-Flow, MV-Flow, LumiFlow",
      "workflowProtocol": "EZ Exam+",
      "shearwave": "Point & 2D Shearwave (S-Shearwave)",
      "fusionImaging": "S-Fusion",
      "fourDImaging": "Realistic Vue, Crystal Vue"
    },
    "description": "Samsung RS85 medikal ultrason görüntüleme sistemi."
  },
  {
    "id": 3,
    "slug": "samsung-rs80-evo",
    "name": "RS80 Evo",
    "brand": "Samsung",
    "category": "ultrason",
    "createdAt": "2026-07-25T21:19:23.954Z",
    "specs": {
      "priceSegment": "HIGH_END",
      "clinicalUnits": [
        "RADIOLOGY"
      ],
      "competitors": {
        "GE": "Logiq E9 / S8 XDClear",
        "Siemens": "Acuson Redwood",
        "Philips": "EPIQ 7 w/xMatrix",
        "Canon": "Aplio i800"
      },
      "signalProcessing": "CrystalBeam, S-Vision Architecture",
      "probeTechnology": "S-Vue Technology, Matrix Transducers",
      "autoOptimization": "QuickScan",
      "compoundImaging": "MultiVision",
      "speckleReduction": "ClearVision",
      "flowImaging": "S-Flow, MV-Flow, LumiFlow",
      "workflowProtocol": "EZ Exam+",
      "shearwave": "Point & 2D Shearwave (S-Shearwave)",
      "fusionImaging": "S-Fusion",
      "fourDImaging": "Realistic Vue, Crystal Vue"
    },
    "description": "Samsung RS80 Evo medikal ultrason görüntüleme sistemi."
  },
  {
    "id": 4,
    "slug": "samsung-hs70a",
    "name": "HS70A",
    "brand": "Samsung",
    "category": "ultrason",
    "createdAt": "2026-07-25T21:19:23.954Z",
    "specs": {
      "priceSegment": "HIGH_END",
      "clinicalUnits": [
        "RADIOLOGY",
        "CARDIOLOGY"
      ],
      "competitors": {
        "GE": "Logiq S8 XDClear",
        "Siemens": "Acuson S3000",
        "Philips": "EPIQ 5 w/xMatrix",
        "Canon": "Aplio i600"
      },
      "signalProcessing": "CrystalBeam, S-Vision Architecture",
      "probeTechnology": "S-Vue Technology, Matrix Transducers",
      "autoOptimization": "QuickScan",
      "compoundImaging": "MultiVision",
      "speckleReduction": "ClearVision",
      "flowImaging": "S-Flow, MV-Flow, LumiFlow",
      "workflowProtocol": "EZ Exam+",
      "shearwave": "Point & 2D Shearwave (S-Shearwave)",
      "fusionImaging": "S-Fusion",
      "fourDImaging": "Realistic Vue, Crystal Vue"
    },
    "description": "Samsung HS70A medikal ultrason görüntüleme sistemi."
  },
  {
    "id": 5,
    "slug": "samsung-hs60",
    "name": "HS60",
    "brand": "Samsung",
    "category": "ultrason",
    "createdAt": "2026-07-25T21:19:23.954Z",
    "specs": {
      "priceSegment": "HIGH_END",
      "clinicalUnits": [
        "RADIOLOGY",
        "OBGYN"
      ],
      "competitors": {
        "GE": "Logiq S7 Expert",
        "Siemens": "Acuson S2000",
        "Philips": "Affiniti 70"
      },
      "signalProcessing": "CrystalBeam, S-Vision Architecture",
      "probeTechnology": "S-Vue Technology, Matrix Transducers",
      "autoOptimization": "QuickScan",
      "compoundImaging": "MultiVision",
      "speckleReduction": "ClearVision",
      "flowImaging": "S-Flow, MV-Flow, LumiFlow",
      "workflowProtocol": "EZ Exam+",
      "shearwave": "Point & 2D Shearwave (S-Shearwave)",
      "fusionImaging": "S-Fusion",
      "fourDImaging": "Realistic Vue, Crystal Vue"
    },
    "description": "Samsung HS60 medikal ultrason görüntüleme sistemi."
  },
  {
    "id": 6,
    "slug": "samsung-hs50",
    "name": "HS50",
    "brand": "Samsung",
    "category": "ultrason",
    "createdAt": "2026-07-25T21:19:23.954Z",
    "specs": {
      "priceSegment": "MID_RANGE",
      "clinicalUnits": [
        "RADIOLOGY",
        "OBGYN"
      ],
      "competitors": {
        "GE": "Logiq P9",
        "Siemens": "Juniper",
        "Philips": "Affiniti 70",
        "Canon": "Aplio a550"
      },
      "signalProcessing": "CrystalBeam, S-Vision Architecture",
      "probeTechnology": "S-Vue Technology, Matrix Transducers",
      "autoOptimization": "QuickScan",
      "compoundImaging": "MultiVision",
      "speckleReduction": "ClearVision",
      "flowImaging": "S-Flow, MV-Flow, LumiFlow",
      "workflowProtocol": "EZ Exam+",
      "shearwave": "Point & 2D Shearwave (S-Shearwave)",
      "fusionImaging": "S-Fusion",
      "fourDImaging": "Realistic Vue, Crystal Vue"
    },
    "description": "Samsung HS50 medikal ultrason görüntüleme sistemi."
  },
  {
    "id": 7,
    "slug": "samsung-hs40",
    "name": "HS40",
    "brand": "Samsung",
    "category": "ultrason",
    "createdAt": "2026-07-25T21:19:23.954Z",
    "specs": {
      "priceSegment": "MID_RANGE",
      "clinicalUnits": [
        "RADIOLOGY",
        "OBGYN",
        "CARDIOLOGY"
      ],
      "competitors": {
        "GE": "Logiq P7",
        "Siemens": "Juniper",
        "Philips": "Affiniti 50",
        "Canon": "Aplio a450"
      },
      "signalProcessing": "CrystalBeam, S-Vision Architecture",
      "probeTechnology": "S-Vue Technology, Matrix Transducers",
      "autoOptimization": "QuickScan",
      "compoundImaging": "MultiVision",
      "speckleReduction": "ClearVision",
      "flowImaging": "S-Flow, MV-Flow, LumiFlow",
      "workflowProtocol": "EZ Exam+",
      "shearwave": "Point & 2D Shearwave (S-Shearwave)",
      "fusionImaging": "S-Fusion",
      "fourDImaging": "Realistic Vue, Crystal Vue"
    },
    "description": "Samsung HS40 medikal ultrason görüntüleme sistemi."
  },
  {
    "id": 8,
    "slug": "samsung-hs30",
    "name": "HS30",
    "brand": "Samsung",
    "category": "ultrason",
    "createdAt": "2026-07-25T21:19:23.954Z",
    "specs": {
      "priceSegment": "LOW_END",
      "clinicalUnits": [
        "RADIOLOGY",
        "OBGYN"
      ],
      "competitors": {
        "GE": "Logiq F8",
        "Siemens": "Acuson NX3",
        "Philips": "Affiniti 30"
      },
      "signalProcessing": "CrystalBeam, S-Vision Architecture",
      "probeTechnology": "S-Vue Technology, Matrix Transducers",
      "autoOptimization": "QuickScan",
      "compoundImaging": "MultiVision",
      "speckleReduction": "ClearVision",
      "flowImaging": "S-Flow, MV-Flow, LumiFlow",
      "workflowProtocol": "EZ Exam+",
      "shearwave": "Point & 2D Shearwave (S-Shearwave)",
      "fusionImaging": "S-Fusion",
      "fourDImaging": "Realistic Vue, Crystal Vue"
    },
    "description": "Samsung HS30 medikal ultrason görüntüleme sistemi."
  },
  {
    "id": 9,
    "slug": "samsung-hera-i10",
    "name": "HERA i10",
    "brand": "Samsung",
    "category": "ultrason",
    "createdAt": "2026-07-25T21:19:23.954Z",
    "specs": {
      "priceSegment": "PREMIUM",
      "clinicalUnits": [
        "OBGYN"
      ],
      "competitors": {},
      "signalProcessing": "CrystalBeam, S-Vision Architecture",
      "probeTechnology": "S-Vue Technology, Matrix Transducers",
      "autoOptimization": "QuickScan",
      "compoundImaging": "MultiVision",
      "speckleReduction": "ClearVision",
      "flowImaging": "S-Flow, MV-Flow, LumiFlow",
      "workflowProtocol": "EZ Exam+",
      "shearwave": "Point & 2D Shearwave (S-Shearwave)",
      "fusionImaging": "S-Fusion",
      "fourDImaging": "Realistic Vue, Crystal Vue"
    },
    "description": "Samsung HERA i10 medikal ultrason görüntüleme sistemi."
  },
  {
    "id": 10,
    "slug": "samsung-hera-w10",
    "name": "HERA W10",
    "brand": "Samsung",
    "category": "ultrason",
    "createdAt": "2026-07-25T21:19:23.955Z",
    "specs": {
      "priceSegment": "PREMIUM",
      "clinicalUnits": [
        "OBGYN"
      ],
      "competitors": {
        "GE": "Voluson E10"
      },
      "signalProcessing": "CrystalBeam, S-Vision Architecture",
      "probeTechnology": "S-Vue Technology, Matrix Transducers",
      "autoOptimization": "QuickScan",
      "compoundImaging": "MultiVision",
      "speckleReduction": "ClearVision",
      "flowImaging": "S-Flow, MV-Flow, LumiFlow",
      "workflowProtocol": "EZ Exam+",
      "shearwave": "Point & 2D Shearwave (S-Shearwave)",
      "fusionImaging": "S-Fusion",
      "fourDImaging": "Realistic Vue, Crystal Vue"
    },
    "description": "Samsung HERA W10 medikal ultrason görüntüleme sistemi."
  },
  {
    "id": 11,
    "slug": "samsung-hera-w9",
    "name": "HERA W9",
    "brand": "Samsung",
    "category": "ultrason",
    "createdAt": "2026-07-25T21:19:23.955Z",
    "specs": {
      "priceSegment": "PREMIUM",
      "clinicalUnits": [
        "OBGYN"
      ],
      "competitors": {
        "GE": "Voluson E8"
      },
      "signalProcessing": "CrystalBeam, S-Vision Architecture",
      "probeTechnology": "S-Vue Technology, Matrix Transducers",
      "autoOptimization": "QuickScan",
      "compoundImaging": "MultiVision",
      "speckleReduction": "ClearVision",
      "flowImaging": "S-Flow, MV-Flow, LumiFlow",
      "workflowProtocol": "EZ Exam+",
      "shearwave": "Point & 2D Shearwave (S-Shearwave)",
      "fusionImaging": "S-Fusion",
      "fourDImaging": "Realistic Vue, Crystal Vue"
    },
    "description": "Samsung HERA W9 medikal ultrason görüntüleme sistemi."
  },
  {
    "id": 12,
    "slug": "samsung-ws80a-elite",
    "name": "WS80A Elite",
    "brand": "Samsung",
    "category": "ultrason",
    "createdAt": "2026-07-25T21:19:23.955Z",
    "specs": {
      "priceSegment": "HIGH_END",
      "clinicalUnits": [
        "OBGYN"
      ],
      "competitors": {
        "GE": "Voluson E8",
        "Philips": "EPIQ Elite w/xMatrix",
        "Canon": "Aplio i800"
      },
      "signalProcessing": "CrystalBeam, S-Vision Architecture",
      "probeTechnology": "S-Vue Technology, Matrix Transducers",
      "autoOptimization": "QuickScan",
      "compoundImaging": "MultiVision",
      "speckleReduction": "ClearVision",
      "flowImaging": "S-Flow, MV-Flow, LumiFlow",
      "workflowProtocol": "EZ Exam+",
      "shearwave": "Point & 2D Shearwave (S-Shearwave)",
      "fusionImaging": "S-Fusion",
      "fourDImaging": "Realistic Vue, Crystal Vue"
    },
    "description": "Samsung WS80A Elite medikal ultrason görüntüleme sistemi."
  },
  {
    "id": 13,
    "slug": "samsung-hs70a-with-prime",
    "name": "HS70A with Prime",
    "brand": "Samsung",
    "category": "ultrason",
    "createdAt": "2026-07-25T21:19:23.955Z",
    "specs": {
      "priceSegment": "HIGH_END",
      "clinicalUnits": [
        "OBGYN"
      ],
      "competitors": {
        "GE": "Voluson E6",
        "Philips": "EPIQ 5 w/xMatrix"
      },
      "signalProcessing": "CrystalBeam, S-Vision Architecture",
      "probeTechnology": "S-Vue Technology, Matrix Transducers",
      "autoOptimization": "QuickScan",
      "compoundImaging": "MultiVision",
      "speckleReduction": "ClearVision",
      "flowImaging": "S-Flow, MV-Flow, LumiFlow",
      "workflowProtocol": "EZ Exam+",
      "shearwave": "Point & 2D Shearwave (S-Shearwave)",
      "fusionImaging": "S-Fusion",
      "fourDImaging": "Realistic Vue, Crystal Vue"
    },
    "description": "Samsung HS70A with Prime medikal ultrason görüntüleme sistemi."
  },
  {
    "id": 14,
    "slug": "samsung-hm70a",
    "name": "HM70A",
    "brand": "Samsung",
    "category": "ultrason",
    "createdAt": "2026-07-25T21:19:23.955Z",
    "specs": {
      "priceSegment": "HIGH_END",
      "clinicalUnits": [
        "PORTABLE"
      ],
      "competitors": {
        "Philips": "CX50 w/Purewave"
      },
      "signalProcessing": "CrystalBeam, S-Vision Architecture",
      "probeTechnology": "S-Vue Technology, Matrix Transducers",
      "autoOptimization": "QuickScan",
      "compoundImaging": "MultiVision",
      "speckleReduction": "ClearVision",
      "flowImaging": "S-Flow, MV-Flow, LumiFlow",
      "workflowProtocol": "EZ Exam+",
      "shearwave": "Point & 2D Shearwave (S-Shearwave)",
      "fusionImaging": "S-Fusion",
      "fourDImaging": "Realistic Vue, Crystal Vue"
    },
    "description": "Samsung HM70A medikal ultrason görüntüleme sistemi."
  },
  {
    "id": 15,
    "slug": "ge-logiq-e10",
    "name": "Logiq E10",
    "brand": "GE",
    "category": "ultrason",
    "createdAt": "2026-07-25T21:19:23.955Z",
    "specs": {
      "priceSegment": "PREMIUM",
      "clinicalUnits": [
        "RADIOLOGY"
      ],
      "competitors": {},
      "signalProcessing": "cSound, Agile & Radiance Architecture",
      "probeTechnology": "Matrix Array, XDclear Technology, Acoustic Amplifier",
      "autoOptimization": "ATO (Auto Tissue Optimization)",
      "compoundImaging": "CrossXBeam",
      "speckleReduction": "SRI (Speckle Reduction Imaging)",
      "flowImaging": "B-Flow, HD-Flow, SlowFlowHD, RadiantFlow",
      "workflowProtocol": "Scan Assistant",
      "shearwave": "2D Shearwave Elastography",
      "fusionImaging": "Volume Navigation (VNav)",
      "fourDImaging": "HDlive, HDlive Silhouette, HDlive Studio"
    },
    "description": "GE Logiq E10 medikal ultrason görüntüleme sistemi."
  },
  {
    "id": 16,
    "slug": "ge-voluson-e10",
    "name": "Voluson E10",
    "brand": "GE",
    "category": "ultrason",
    "createdAt": "2026-07-25T21:19:23.955Z",
    "specs": {
      "priceSegment": "PREMIUM",
      "clinicalUnits": [
        "OBGYN"
      ],
      "competitors": {},
      "signalProcessing": "cSound, Agile & Radiance Architecture",
      "probeTechnology": "Matrix Array, XDclear Technology, Acoustic Amplifier",
      "autoOptimization": "ATO (Auto Tissue Optimization)",
      "compoundImaging": "CrossXBeam",
      "speckleReduction": "SRI (Speckle Reduction Imaging)",
      "flowImaging": "B-Flow, HD-Flow, SlowFlowHD, RadiantFlow",
      "workflowProtocol": "Scan Assistant",
      "shearwave": "2D Shearwave Elastography",
      "fusionImaging": "Volume Navigation (VNav)",
      "fourDImaging": "HDlive, HDlive Silhouette, HDlive Studio"
    },
    "description": "GE Voluson E10 medikal ultrason görüntüleme sistemi."
  },
  {
    "id": 17,
    "slug": "ge-vivid-e95",
    "name": "Vivid E95",
    "brand": "GE",
    "category": "ultrason",
    "createdAt": "2026-07-25T21:19:23.955Z",
    "specs": {
      "priceSegment": "PREMIUM",
      "clinicalUnits": [
        "CARDIOLOGY"
      ],
      "competitors": {
        "Philips": "EPIQ Elite CVx",
        "Canon": "Aplio i900 CV"
      },
      "signalProcessing": "cSound, Agile & Radiance Architecture",
      "probeTechnology": "Matrix Array, XDclear Technology, Acoustic Amplifier",
      "autoOptimization": "ATO (Auto Tissue Optimization)",
      "compoundImaging": "CrossXBeam",
      "speckleReduction": "SRI (Speckle Reduction Imaging)",
      "flowImaging": "B-Flow, HD-Flow, SlowFlowHD, RadiantFlow",
      "workflowProtocol": "Scan Assistant",
      "shearwave": "2D Shearwave Elastography",
      "fusionImaging": "Volume Navigation (VNav)",
      "fourDImaging": "HDlive, HDlive Silhouette, HDlive Studio"
    },
    "description": "GE Vivid E95 medikal ultrason görüntüleme sistemi."
  },
  {
    "id": 18,
    "slug": "ge-voluson-s10-expert",
    "name": "Voluson S10 Expert",
    "brand": "GE",
    "category": "ultrason",
    "createdAt": "2026-07-25T21:19:23.955Z",
    "specs": {
      "priceSegment": "HIGH_END",
      "clinicalUnits": [
        "OBGYN"
      ],
      "competitors": {},
      "signalProcessing": "cSound, Agile & Radiance Architecture",
      "probeTechnology": "Matrix Array, XDclear Technology, Acoustic Amplifier",
      "autoOptimization": "ATO (Auto Tissue Optimization)",
      "compoundImaging": "CrossXBeam",
      "speckleReduction": "SRI (Speckle Reduction Imaging)",
      "flowImaging": "B-Flow, HD-Flow, SlowFlowHD, RadiantFlow",
      "workflowProtocol": "Scan Assistant",
      "shearwave": "2D Shearwave Elastography",
      "fusionImaging": "Volume Navigation (VNav)",
      "fourDImaging": "HDlive, HDlive Silhouette, HDlive Studio"
    },
    "description": "GE Voluson S10 Expert medikal ultrason görüntüleme sistemi."
  },
  {
    "id": 19,
    "slug": "ge-voluson-e6",
    "name": "Voluson E6",
    "brand": "GE",
    "category": "ultrason",
    "createdAt": "2026-07-25T21:19:23.955Z",
    "specs": {
      "priceSegment": "HIGH_END",
      "clinicalUnits": [
        "OBGYN"
      ],
      "competitors": {},
      "signalProcessing": "cSound, Agile & Radiance Architecture",
      "probeTechnology": "Matrix Array, XDclear Technology, Acoustic Amplifier",
      "autoOptimization": "ATO (Auto Tissue Optimization)",
      "compoundImaging": "CrossXBeam",
      "speckleReduction": "SRI (Speckle Reduction Imaging)",
      "flowImaging": "B-Flow, HD-Flow, SlowFlowHD, RadiantFlow",
      "workflowProtocol": "Scan Assistant",
      "shearwave": "2D Shearwave Elastography",
      "fusionImaging": "Volume Navigation (VNav)",
      "fourDImaging": "HDlive, HDlive Silhouette, HDlive Studio"
    },
    "description": "GE Voluson E6 medikal ultrason görüntüleme sistemi."
  },
  {
    "id": 20,
    "slug": "philips-epiq-elite",
    "name": "EPIQ Elite",
    "brand": "Philips",
    "category": "ultrason",
    "createdAt": "2026-07-25T21:19:23.955Z",
    "specs": {
      "priceSegment": "PREMIUM",
      "clinicalUnits": [
        "RADIOLOGY",
        "OBGYN"
      ],
      "competitors": {},
      "signalProcessing": "nSIGHT Imaging Architecture",
      "probeTechnology": "xMATRIX array, PureWave Crystal Technology",
      "autoOptimization": "iScan, iOptimize",
      "compoundImaging": "SonoCT Real-time Compound Imaging",
      "speckleReduction": "X-RES Adaptive Image Processing",
      "flowImaging": "Micro CPA, Microflow Imaging",
      "workflowProtocol": "SmartExam",
      "shearwave": "ElastQ Imaging (Point & 2D Shearwave)",
      "fusionImaging": "PercuNav Image Fusion",
      "fourDImaging": "TrueVue, GlassVue"
    },
    "description": "Philips EPIQ Elite medikal ultrason görüntüleme sistemi."
  },
  {
    "id": 21,
    "slug": "philips-affiniti-70",
    "name": "Affiniti 70",
    "brand": "Philips",
    "category": "ultrason",
    "createdAt": "2026-07-25T21:19:23.955Z",
    "specs": {
      "priceSegment": "MID_RANGE",
      "clinicalUnits": [
        "RADIOLOGY",
        "OBGYN",
        "CARDIOLOGY"
      ],
      "competitors": {},
      "signalProcessing": "nSIGHT Imaging Architecture",
      "probeTechnology": "xMATRIX array, PureWave Crystal Technology",
      "autoOptimization": "iScan, iOptimize",
      "compoundImaging": "SonoCT Real-time Compound Imaging",
      "speckleReduction": "X-RES Adaptive Image Processing",
      "flowImaging": "Micro CPA, Microflow Imaging",
      "workflowProtocol": "SmartExam",
      "shearwave": "ElastQ Imaging (Point & 2D Shearwave)",
      "fusionImaging": "PercuNav Image Fusion",
      "fourDImaging": "TrueVue, GlassVue"
    },
    "description": "Philips Affiniti 70 medikal ultrason görüntüleme sistemi."
  },
  {
    "id": 22,
    "slug": "philips-affiniti-50",
    "name": "Affiniti 50",
    "brand": "Philips",
    "category": "ultrason",
    "createdAt": "2026-07-25T21:19:23.955Z",
    "specs": {
      "priceSegment": "MID_RANGE",
      "clinicalUnits": [
        "RADIOLOGY",
        "CARDIOLOGY"
      ],
      "competitors": {},
      "signalProcessing": "nSIGHT Imaging Architecture",
      "probeTechnology": "xMATRIX array, PureWave Crystal Technology",
      "autoOptimization": "iScan, iOptimize",
      "compoundImaging": "SonoCT Real-time Compound Imaging",
      "speckleReduction": "X-RES Adaptive Image Processing",
      "flowImaging": "Micro CPA, Microflow Imaging",
      "workflowProtocol": "SmartExam",
      "shearwave": "ElastQ Imaging (Point & 2D Shearwave)",
      "fusionImaging": "PercuNav Image Fusion",
      "fourDImaging": "TrueVue, GlassVue"
    },
    "description": "Philips Affiniti 50 medikal ultrason görüntüleme sistemi."
  },
  {
    "id": 23,
    "slug": "philips-cx50-w-purewave",
    "name": "CX50 w/Purewave",
    "brand": "Philips",
    "category": "ultrason",
    "createdAt": "2026-07-25T21:19:23.955Z",
    "specs": {
      "priceSegment": "HIGH_END",
      "clinicalUnits": [
        "PORTABLE"
      ],
      "competitors": {},
      "signalProcessing": "nSIGHT Imaging Architecture",
      "probeTechnology": "xMATRIX array, PureWave Crystal Technology",
      "autoOptimization": "iScan, iOptimize",
      "compoundImaging": "SonoCT Real-time Compound Imaging",
      "speckleReduction": "X-RES Adaptive Image Processing",
      "flowImaging": "Micro CPA, Microflow Imaging",
      "workflowProtocol": "SmartExam",
      "shearwave": "ElastQ Imaging (Point & 2D Shearwave)",
      "fusionImaging": "PercuNav Image Fusion",
      "fourDImaging": "TrueVue, GlassVue"
    },
    "description": "Philips CX50 w/Purewave medikal ultrason görüntüleme sistemi."
  },
  {
    "id": 24,
    "slug": "canon-aplio-i800",
    "name": "Aplio i800",
    "brand": "Canon",
    "category": "ultrason",
    "createdAt": "2026-07-25T21:19:23.955Z",
    "specs": {
      "priceSegment": "HIGH_END",
      "clinicalUnits": [
        "RADIOLOGY",
        "OBGYN"
      ],
      "competitors": {},
      "signalProcessing": "iBeam & aBeam High-Density Architecture",
      "probeTechnology": "iDMS, Dynamic Micro Slice, XBT Transducers",
      "autoOptimization": "Quick Scan, TSO",
      "compoundImaging": "ApliPure+",
      "speckleReduction": "Precision Imaging",
      "flowImaging": "S.M.I. (Superb Micro-vascular Imaging), Advanced Dynamic Flow",
      "workflowProtocol": "Quick Assist Protocol",
      "shearwave": "Smart Maps 2D Shearwave",
      "fusionImaging": "Smart Fusion",
      "fourDImaging": "Luminance, Shadow Glass"
    },
    "description": "Canon Aplio i800 medikal ultrason görüntüleme sistemi."
  },
  {
    "id": 25,
    "slug": "canon-aplio-i900-cv",
    "name": "Aplio i900 CV",
    "brand": "Canon",
    "category": "ultrason",
    "createdAt": "2026-07-25T21:19:23.955Z",
    "specs": {
      "priceSegment": "PREMIUM",
      "clinicalUnits": [
        "CARDIOLOGY"
      ],
      "competitors": {},
      "signalProcessing": "iBeam & aBeam High-Density Architecture",
      "probeTechnology": "iDMS, Dynamic Micro Slice, XBT Transducers",
      "autoOptimization": "Quick Scan, TSO",
      "compoundImaging": "ApliPure+",
      "speckleReduction": "Precision Imaging",
      "flowImaging": "S.M.I. (Superb Micro-vascular Imaging), Advanced Dynamic Flow",
      "workflowProtocol": "Quick Assist Protocol",
      "shearwave": "Smart Maps 2D Shearwave",
      "fusionImaging": "Smart Fusion",
      "fourDImaging": "Luminance, Shadow Glass"
    },
    "description": "Canon Aplio i900 CV medikal ultrason görüntüleme sistemi."
  },
  {
    "id": 26,
    "slug": "siemens-acuson-sequoia",
    "name": "Acuson Sequoia",
    "brand": "Siemens",
    "category": "ultrason",
    "createdAt": "2026-07-25T21:19:23.955Z",
    "specs": {
      "priceSegment": "PREMIUM",
      "clinicalUnits": [
        "RADIOLOGY"
      ],
      "competitors": {},
      "signalProcessing": "BioAcoustic, SieStream Core Architecture",
      "probeTechnology": "DAX, HD Single Crystal, Multi-D Array, Hanafy Lens",
      "autoOptimization": "TEQ (Tissue Equalization)",
      "compoundImaging": "Advanced SieClear Spatial Compounding",
      "speckleReduction": "DTCE (Dynamic Tissue Contrast Enhancement)",
      "flowImaging": "Sie-Flow, Clarify VE, Doppler Tissue Energy",
      "workflowProtocol": "eSieScan Protocol",
      "shearwave": "Virtual Touch IQ (ARFI Technology)",
      "fusionImaging": "eSieFusion",
      "fourDImaging": "4D Cardiology & Fetal Echo Modül"
    },
    "description": "Siemens Acuson Sequoia medikal ultrason görüntüleme sistemi."
  },
  {
    "id": 27,
    "slug": "siemens-sc2000-prime",
    "name": "SC2000 Prime",
    "brand": "Siemens",
    "category": "ultrason",
    "createdAt": "2026-07-25T21:19:23.955Z",
    "specs": {
      "priceSegment": "HIGH_END",
      "clinicalUnits": [
        "CARDIOLOGY"
      ],
      "competitors": {},
      "signalProcessing": "BioAcoustic, SieStream Core Architecture",
      "probeTechnology": "DAX, HD Single Crystal, Multi-D Array, Hanafy Lens",
      "autoOptimization": "TEQ (Tissue Equalization)",
      "compoundImaging": "Advanced SieClear Spatial Compounding",
      "speckleReduction": "DTCE (Dynamic Tissue Contrast Enhancement)",
      "flowImaging": "Sie-Flow, Clarify VE, Doppler Tissue Energy",
      "workflowProtocol": "eSieScan Protocol",
      "shearwave": "Virtual Touch IQ (ARFI Technology)",
      "fusionImaging": "eSieFusion",
      "fourDImaging": "4D Cardiology & Fetal Echo Modül"
    },
    "description": "Siemens SC2000 Prime medikal ultrason görüntüleme sistemi."
  }
];
