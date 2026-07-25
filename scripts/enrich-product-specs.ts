import fs from "fs";
import path from "path";
import { toKebabCase } from "./scaffold-products";

interface TechnicalSpecMap {
  signalProcessing: string;
  probeTechnology: string;
  autoOptimization: string;
  compoundImaging: string;
  speckleReduction: string;
  flowImaging: string;
  workflowProtocol: string;
  shearwave: string;
  fusionImaging: string;
  fourDImaging: string;
}

const BRAND_SPECS: Record<string, TechnicalSpecMap> = {
  Samsung: {
    signalProcessing: "CrystalBeam, S-Vision Architecture",
    probeTechnology: "S-Vue Technology, Matrix Transducers",
    autoOptimization: "QuickScan",
    compoundImaging: "MultiVision",
    speckleReduction: "ClearVision",
    flowImaging: "S-Flow, MV-Flow, LumiFlow",
    workflowProtocol: "EZ Exam+",
    shearwave: "Point & 2D Shearwave (S-Shearwave)",
    fusionImaging: "S-Fusion",
    fourDImaging: "Realistic Vue, Crystal Vue",
  },
  GE: {
    signalProcessing: "cSound, Agile & Radiance Architecture",
    probeTechnology: "Matrix Array, XDclear Technology, Acoustic Amplifier",
    autoOptimization: "ATO (Auto Tissue Optimization)",
    compoundImaging: "CrossXBeam",
    speckleReduction: "SRI (Speckle Reduction Imaging)",
    flowImaging: "B-Flow, HD-Flow, SlowFlowHD, RadiantFlow",
    workflowProtocol: "Scan Assistant",
    shearwave: "2D Shearwave Elastography",
    fusionImaging: "Volume Navigation (VNav)",
    fourDImaging: "HDlive, HDlive Silhouette, HDlive Studio",
  },
  Philips: {
    signalProcessing: "nSIGHT Imaging Architecture",
    probeTechnology: "xMATRIX array, PureWave Crystal Technology",
    autoOptimization: "iScan, iOptimize",
    compoundImaging: "SonoCT Real-time Compound Imaging",
    speckleReduction: "X-RES Adaptive Image Processing",
    flowImaging: "Micro CPA, Microflow Imaging",
    workflowProtocol: "SmartExam",
    shearwave: "ElastQ Imaging (Point & 2D Shearwave)",
    fusionImaging: "PercuNav Image Fusion",
    fourDImaging: "TrueVue, GlassVue",
  },
  Siemens: {
    signalProcessing: "BioAcoustic, SieStream Core Architecture",
    probeTechnology: "DAX, HD Single Crystal, Multi-D Array, Hanafy Lens",
    autoOptimization: "TEQ (Tissue Equalization)",
    compoundImaging: "Advanced SieClear Spatial Compounding",
    speckleReduction: "DTCE (Dynamic Tissue Contrast Enhancement)",
    flowImaging: "Sie-Flow, Clarify VE, Doppler Tissue Energy",
    workflowProtocol: "eSieScan Protocol",
    shearwave: "Virtual Touch IQ (ARFI Technology)",
    fusionImaging: "eSieFusion",
    fourDImaging: "4D Cardiology & Fetal Echo Modül",
  },
  Canon: {
    signalProcessing: "iBeam & aBeam High-Density Architecture",
    probeTechnology: "iDMS, Dynamic Micro Slice, XBT Transducers",
    autoOptimization: "Quick Scan, TSO",
    compoundImaging: "ApliPure+",
    speckleReduction: "Precision Imaging",
    flowImaging: "S.M.I. (Superb Micro-vascular Imaging), Advanced Dynamic Flow",
    workflowProtocol: "Quick Assist Protocol",
    shearwave: "Smart Maps 2D Shearwave",
    fusionImaging: "Smart Fusion",
    fourDImaging: "Luminance, Shadow Glass",
  },
};

function enrichSpecsYaml(filePath: string, brand: string) {
  const content = fs.readFileSync(filePath, "utf-8");
  const brandSpecs = BRAND_SPECS[brand];
  if (!brandSpecs) return;

  // Check if specs block already exists
  if (content.includes("specs:")) return;

  const yamlAppend = `
specs:
  signalProcessing: "${brandSpecs.signalProcessing}"
  probeTechnology: "${brandSpecs.probeTechnology}"
  autoOptimization: "${brandSpecs.autoOptimization}"
  compoundImaging: "${brandSpecs.compoundImaging}"
  speckleReduction: "${brandSpecs.speckleReduction}"
  flowImaging: "${brandSpecs.flowImaging}"
  workflowProtocol: "${brandSpecs.workflowProtocol}"
  shearwave: "${brandSpecs.shearwave}"
  fusionImaging: "${brandSpecs.fusionImaging}"
  fourDImaging: "${brandSpecs.fourDImaging}"
`;

  fs.appendFileSync(filePath, yamlAppend, "utf-8");
}

function main() {
  console.log("🛠️ Enriching specs.yaml files with technical specification comparison matrix...");
  const baseContentDir = path.join(process.cwd(), "content", "products");

  const seedPath = path.join(process.cwd(), "urun-katalogu-seed.json");
  const data = JSON.parse(fs.readFileSync(seedPath, "utf-8"));

  let count = 0;
  for (const product of data.products) {
    const brandSlug = toKebabCase(product.brand);
    const modelSlug = toKebabCase(product.model);

    const specsPath = path.join(baseContentDir, brandSlug, modelSlug, "specs.yaml");
    if (fs.existsSync(specsPath)) {
      enrichSpecsYaml(specsPath, product.brand);
      count++;
      console.log(`  └─ Enriched: content/products/${brandSlug}/${modelSlug}/specs.yaml`);
    }
  }

  console.log(`✅ Successfully enriched ${count} specs.yaml files with brand & model technical specs.`);
}

main();
