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
    "createdAt": "2026-07-25T21:45:51.043Z",
    "specs": {
      "signalProcessing": "CrystalBeam, S-Vision Architecture",
      "probeTechnology": "S-Vue Technology, Matrix Transducers",
      "autoOptimization": "QuickScan",
      "compoundImaging": "MultiVision",
      "speckleReduction": "ClearVision",
      "flowImaging": "S-Flow, MV-Flow, LumiFlow",
      "workflowProtocol": "EZ Exam+",
      "shearwave": "Point & 2D Shearwave (S-Shearwave)",
      "fusionImaging": "S-Fusion",
      "fourDImaging": "Realistic Vue, Crystal Vue",
      "imageUrl": "/products/samsung/v5/main.png",
      "priceSegment": "MID_RANGE"
    },
    "description": "Samsung V5 medikal ultrason görüntüleme sistemi."
  },
  {
    "id": 2,
    "slug": "samsung-v8",
    "name": "V8",
    "brand": "Samsung",
    "category": "ultrason",
    "createdAt": "2026-07-25T21:45:51.050Z",
    "specs": {
      "signalProcessing": "CrystalBeam, S-Vision Architecture",
      "probeTechnology": "S-Vue Technology, Matrix Transducers",
      "autoOptimization": "QuickScan",
      "compoundImaging": "MultiVision",
      "speckleReduction": "ClearVision",
      "flowImaging": "S-Flow, MV-Flow, LumiFlow",
      "workflowProtocol": "EZ Exam+",
      "shearwave": "Point & 2D Shearwave (S-Shearwave)",
      "fusionImaging": "S-Fusion",
      "fourDImaging": "Realistic Vue, Crystal Vue",
      "imageUrl": "/products/samsung/v8/main.jpg",
      "priceSegment": "HIGH_END"
    },
    "description": "Samsung V8 medikal ultrason görüntüleme sistemi."
  },
  {
    "id": 3,
    "slug": "ge-logiq-e10",
    "name": "Logiq E10",
    "brand": "GE",
    "category": "ultrason",
    "createdAt": "2026-07-25T21:45:51.058Z",
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
      "priceSegment": "PREMIUM"
    },
    "description": "GE Logiq E10 medikal ultrason görüntüleme sistemi."
  },
  {
    "id": 4,
    "slug": "philips-epiq-elite",
    "name": "EPIQ Elite",
    "brand": "Philips",
    "category": "ultrason",
    "createdAt": "2026-07-25T21:45:51.068Z",
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
      "priceSegment": "PREMIUM"
    },
    "description": "Philips EPIQ Elite medikal ultrason görüntüleme sistemi."
  },
  {
    "id": 5,
    "slug": "canon-aplio-i800",
    "name": "Aplio i800",
    "brand": "Canon",
    "category": "ultrason",
    "createdAt": "2026-07-25T21:45:51.076Z",
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
      "priceSegment": "HIGH_END"
    },
    "description": "Canon Aplio i800 medikal ultrason görüntüleme sistemi."
  },
  {
    "id": 6,
    "slug": "siemens-acuson-sequoia",
    "name": "Acuson Sequoia",
    "brand": "Siemens",
    "category": "ultrason",
    "createdAt": "2026-07-25T21:45:51.081Z",
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
      "priceSegment": "PREMIUM"
    },
    "description": "Siemens Acuson Sequoia medikal ultrason görüntüleme sistemi."
  },
  {
    "id": 7,
    "slug": "siemens-acuson-juniper",
    "name": "Acuson Juniper",
    "brand": "Siemens",
    "category": "ultrason",
    "createdAt": "2026-07-25T21:45:51.091Z",
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
      "priceSegment": "MID_RANGE"
    },
    "description": "Siemens Acuson Juniper medikal ultrason görüntüleme sistemi."
  }
];
