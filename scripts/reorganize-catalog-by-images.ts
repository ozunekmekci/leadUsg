import fs from "fs";
import path from "path";
import { PrismaClient, DeviceTier, ClinicalUnit } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export function toKebabCase(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

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
    signalProcessing: "CrystalBeam, S-Vision & Crystal Architecture",
    probeTechnology: "S-Vue Transducers, Matrix Array Probes",
    autoOptimization: "QuickScan, Auto Biometry",
    compoundImaging: "MultiVision",
    speckleReduction: "ClearVision, HQ-Vision",
    flowImaging: "S-Flow, MV-Flow, LumiFlow",
    workflowProtocol: "EZ Exam+, BiometryAssist",
    shearwave: "Point & 2D Shearwave (S-Shearwave)",
    fusionImaging: "S-Fusion",
    fourDImaging: "Realistic Vue, Crystal Vue, 3D XI",
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

const ACTIVE_PRODUCTS = [
  {
    brand: "Samsung",
    model: "V5",
    tier: "MID_RANGE",
    clinicalUnits: ["OBGYN", "RADIOLOGY"],
    competitors: { GE: "Voluson S6 / Logiq P7", Siemens: "Juniper" },
    targetExt: "png",
    description: "Samsung V5 çok branşlı kadın doğum ve genel radyoloji ultrasonu.",
  },
  {
    brand: "Samsung",
    model: "V8",
    tier: "HIGH_END",
    clinicalUnits: ["OBGYN", "RADIOLOGY"],
    competitors: { GE: "Voluson E8 / Logiq S8", Philips: "EPIQ 7" },
    targetExt: "jpg",
    description: "Samsung V8 üst segment kristal görüntüleme teknolojili tanı ultrasonu.",
  },
  {
    brand: "Samsung",
    model: "Z20",
    tier: "HIGH_END",
    clinicalUnits: ["OBGYN", "RADIOLOGY"],
    competitors: { GE: "Voluson E10 / Voluson Signature", Philips: "EPIQ 7W" },
    targetExt: "jpg",
    description: "Samsung Z20 Kadın Sağlığı ve Perinatoloji odaklı gelişmiş 3D/4D akıllı ultrason konsolu.",
  },
  {
    brand: "Samsung",
    model: "HS40",
    tier: "MID_RANGE",
    clinicalUnits: ["RADIOLOGY", "OBGYN", "CARDIOLOGY"],
    competitors: { GE: "Logiq P7", Siemens: "Juniper", Philips: "Affiniti 50" },
    targetExt: "jpg",
    description: "Samsung HS40 günlük klinik teşhisler için kompakt ve güçlü ultrason ünitesi.",
  },
  {
    brand: "GE",
    model: "Logiq E10",
    tier: "PREMIUM",
    clinicalUnits: ["RADIOLOGY"],
    competitors: { Samsung: "RS85 Prestige", Siemens: "Acuson Sequoia" },
    targetExt: "webp",
    description: "GE Logiq E10 genel radyoloji ve girişimsel biyopsi amiral gemisi konsol ultrasonu.",
  },
  {
    brand: "GE",
    model: "Voluson E10",
    tier: "PREMIUM",
    clinicalUnits: ["OBGYN"],
    competitors: { Samsung: "HERA W10 / Z20", Philips: "EPIQ Elite w/xMatrix" },
    targetExt: "jpg",
    description: "GE Voluson E10 perinatoloji ve yüksek riskli gebelik 4D Matrix ultrason sistemi.",
  },
  {
    brand: "GE",
    model: "Vivid T8",
    tier: "MID_RANGE",
    clinicalUnits: ["CARDIOLOGY", "RADIOLOGY"],
    competitors: { Philips: "Affiniti 50", Siemens: "Acuson NX3 Elite", Samsung: "HS40-CV" },
    targetExt: "png",
    description: "GE Vivid T8 kardiyoloji odaklı ve genel dahiliye hibrit konsol ultrason ünitesi.",
  },
  {
    brand: "Philips",
    model: "EPIQ Elite",
    tier: "PREMIUM",
    clinicalUnits: ["RADIOLOGY", "OBGYN", "CARDIOLOGY"],
    competitors: { Samsung: "RS85 / Z20", GE: "Logiq E10 / Voluson E10" },
    targetExt: "png",
    description: "Philips EPIQ Elite nSIGHT mimarili amiral gemisi tıbbi görüntüleme çözümü.",
  },
  {
    brand: "Philips",
    model: "Affiniti 50",
    tier: "MID_RANGE",
    clinicalUnits: ["RADIOLOGY", "CARDIOLOGY", "OBGYN"],
    competitors: { Samsung: "HS50 / HS40", GE: "Logiq P9 / P7", Siemens: "Juniper" },
    targetExt: "jpg",
    description: "Philips Affiniti 50 hassas akustik performanslı çok branşlı muayene ultrasonu.",
  },
  {
    brand: "Canon",
    model: "Aplio i800",
    tier: "HIGH_END",
    clinicalUnits: ["RADIOLOGY", "OBGYN"],
    competitors: { Samsung: "RS80 Evo / Z20", GE: "Logiq E9 / Voluson E8" },
    targetExt: "png",
    description: "Canon Aplio i800 mikro damarlanma (SMI) odaklı yüksek frekanslı konsol ultrasonu.",
  },
  {
    brand: "Siemens",
    model: "Acuson Sequoia",
    tier: "PREMIUM",
    clinicalUnits: ["RADIOLOGY"],
    competitors: { Samsung: "RS85 Prestige", GE: "Logiq E10" },
    targetExt: "jpg",
    description: "Siemens Acuson Sequoia derin doku ve bariatrik penetrasyon amiral gemisi ultrason platformu.",
  },
  {
    brand: "Siemens",
    model: "Acuson Juniper",
    tier: "MID_RANGE",
    clinicalUnits: ["RADIOLOGY", "OBGYN"],
    competitors: { Samsung: "HS50 / HS40", GE: "Logiq P9 / P7" },
    targetExt: "png",
    description: "Siemens Acuson Juniper esnek ve sessiz çalışan genel tanı ultrason ünitesi.",
  },
];

async function main() {
  console.log(`🧹 Reorganizing product catalog for ${ACTIVE_PRODUCTS.length} active devices with images...`);

  const baseContentDir = path.join(process.cwd(), "content", "products");
  const publicProductsDir = path.join(process.cwd(), "public", "products");

  // Read and buffer images before wiping
  const imageBuffers: Record<string, { buffer: Buffer; ext: string }> = {};

  for (const item of ACTIVE_PRODUCTS) {
    const brandSlug = toKebabCase(item.brand);
    const modelSlug = toKebabCase(item.model);
    const slug = `${brandSlug}-${modelSlug}`;

    // Search anywhere under content or public or mindray folder for Z20/HS40 images
    const searchDirs = [
      path.join(baseContentDir, brandSlug, modelSlug, "images"),
      path.join(baseContentDir, "mindray", modelSlug, "images"),
      path.join(publicProductsDir, brandSlug, modelSlug),
      path.join(publicProductsDir, "mindray", modelSlug),
    ];

    let foundFile: string | null = null;

    for (const sDir of searchDirs) {
      if (fs.existsSync(sDir)) {
        const files = fs.readdirSync(sDir);
        const imgFile = files.find((f) => /\.(png|jpg|jpeg|webp)$/i.test(f));
        if (imgFile) {
          foundFile = path.join(sDir, imgFile);
          break;
        }
      }
    }

    if (foundFile && fs.existsSync(foundFile)) {
      const ext = path.extname(foundFile).replace(".", "").toLowerCase();
      imageBuffers[slug] = {
        buffer: fs.readFileSync(foundFile),
        ext,
      };
      console.log(`  ✓ Saved image buffer for ${slug} (${foundFile})`);
    } else {
      console.warn(`  ⚠️ Source image missing for ${slug}`);
    }
  }

  // Wipe content/products
  if (fs.existsSync(baseContentDir)) {
    fs.rmSync(baseContentDir, { recursive: true, force: true });
  }
  fs.mkdirSync(baseContentDir, { recursive: true });

  // Wipe public/products
  if (fs.existsSync(publicProductsDir)) {
    fs.rmSync(publicProductsDir, { recursive: true, force: true });
  }
  fs.mkdirSync(publicProductsDir, { recursive: true });

  const fallbackList: any[] = [];
  const keepSlugs = new Set<string>();

  let idCounter = 1;

  for (const item of ACTIVE_PRODUCTS) {
    const brandSlug = toKebabCase(item.brand);
    const modelSlug = toKebabCase(item.model);
    const slug = `${brandSlug}-${modelSlug}`;
    keepSlugs.add(slug);

    const productDir = path.join(baseContentDir, brandSlug, modelSlug);
    const imagesDir = path.join(productDir, "images");
    const docsDir = path.join(productDir, "docs");

    fs.mkdirSync(imagesDir, { recursive: true });
    fs.mkdirSync(docsDir, { recursive: true });
    fs.writeFileSync(path.join(docsDir, ".gitkeep"), "");

    const publicProductDir = path.join(publicProductsDir, brandSlug, modelSlug);
    fs.mkdirSync(publicProductDir, { recursive: true });

    let ext = item.targetExt;
    let imageUrl = `/products/${brandSlug}/${modelSlug}/main.${ext}`;

    if (imageBuffers[slug]) {
      const imgData = imageBuffers[slug];
      ext = imgData.ext;
      // Save inside content/products/
      const contentImgPath = path.join(imagesDir, `main.${ext}`);
      fs.writeFileSync(contentImgPath, imgData.buffer);

      // Save inside public/products/ for Next.js static serving
      const publicImgPath = path.join(publicProductDir, `main.${ext}`);
      fs.writeFileSync(publicImgPath, imgData.buffer);

      imageUrl = `/products/${brandSlug}/${modelSlug}/main.${ext}`;
    }

    const techSpecs = BRAND_SPECS[item.brand] || {};

    const yamlContent = `# Samsung & Medikal ultrason teknik parametreleri
brand: "${item.brand}"
model: "${item.model}"
tier: "${item.tier}"
clinicalUnits:
${item.clinicalUnits.map((u) => `  - ${u}`).join("\n")}
competitors:
${
  Object.keys(item.competitors).length === 0
    ? "  {}"
    : Object.entries(item.competitors)
        .map(([k, v]) => `  "${k}": "${v}"`)
        .join("\n")
}
specs:
  signalProcessing: "${techSpecs.signalProcessing || ""}"
  probeTechnology: "${techSpecs.probeTechnology || ""}"
  autoOptimization: "${techSpecs.autoOptimization || ""}"
  compoundImaging: "${techSpecs.compoundImaging || ""}"
  speckleReduction: "${techSpecs.speckleReduction || ""}"
  flowImaging: "${techSpecs.flowImaging || ""}"
  workflowProtocol: "${techSpecs.workflowProtocol || ""}"
  shearwave: "${techSpecs.shearwave || ""}"
  fusionImaging: "${techSpecs.fusionImaging || ""}"
  fourDImaging: "${techSpecs.fourDImaging || ""}"
`;

    fs.writeFileSync(path.join(productDir, "specs.yaml"), yamlContent, "utf-8");

    // Upsert into DB
    await prisma.product.upsert({
      where: { slug },
      update: {
        name: item.model,
        brand: item.brand,
        category: "ultrason",
        tier: item.tier as DeviceTier,
        clinicalUnits: item.clinicalUnits as ClinicalUnit[],
        competitors: item.competitors,
        description: item.description,
        specs: {
          ...techSpecs,
          imageUrl,
          priceSegment: item.tier,
          clinicalUnits: item.clinicalUnits,
          competitors: item.competitors,
        },
      },
      create: {
        slug,
        name: item.model,
        brand: item.brand,
        category: "ultrason",
        specs: {
          ...techSpecs,
          imageUrl,
          priceSegment: item.tier,
          clinicalUnits: item.clinicalUnits,
          competitors: item.competitors,
        },
        description: item.description,
        tier: item.tier as DeviceTier,
        clinicalUnits: item.clinicalUnits as ClinicalUnit[],
        competitors: item.competitors,
      },
    });

    fallbackList.push({
      id: idCounter++,
      slug,
      name: item.model,
      brand: item.brand,
      category: "ultrason",
      createdAt: new Date().toISOString(),
      specs: {
        ...techSpecs,
        imageUrl,
        priceSegment: item.tier,
        clinicalUnits: item.clinicalUnits,
        competitors: item.competitors,
      },
      description: item.description,
    });

    console.log(`  ✓ Restructured & Saved: ${slug} (${imageUrl})`);
  }

  // Delete non-active products from DB
  await prisma.product.deleteMany({
    where: {
      slug: {
        notIn: Array.from(keepSlugs),
      },
    },
  });

  const totalInDb = await prisma.product.count();
  console.log(`\n🎉 DB cleanup complete: ${totalInDb} products in database.`);

  // Write updated src/lib/fallbackProducts.ts
  const fallbackTsContent = `export interface ProductSpecs {
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

export const FALLBACK_PRODUCTS: FallbackProduct[] = ${JSON.stringify(fallbackList, null, 2)};
`;

  const fallbackPath = path.join(process.cwd(), "src", "lib", "fallbackProducts.ts");
  fs.writeFileSync(fallbackPath, fallbackTsContent, "utf-8");
  console.log(`✅ Updated ${fallbackPath} with ${fallbackList.length} products with images!`);
}

main()
  .catch((e) => {
    console.error("❌ Reorganization error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
