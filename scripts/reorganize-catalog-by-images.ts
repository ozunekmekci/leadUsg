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

const PRODUCTS_WITH_IMAGES = [
  {
    brand: "Samsung",
    model: "V5",
    tier: "MID_RANGE",
    clinicalUnits: ["OBGYN", "RADIOLOGY"],
    competitors: { GE: "Voluson S6 / Logiq P7", Siemens: "Juniper" },
    sourceImage: "content/products/samsung/v5.png",
    targetExt: "png",
  },
  {
    brand: "Samsung",
    model: "V8",
    tier: "HIGH_END",
    clinicalUnits: ["OBGYN", "RADIOLOGY"],
    competitors: { GE: "Voluson E8 / Logiq S8", Philips: "EPIQ 7" },
    sourceImage: "content/products/samsung/v8.jpg",
    targetExt: "jpg",
  },
  {
    brand: "GE",
    model: "Logiq E10",
    tier: "PREMIUM",
    clinicalUnits: ["RADIOLOGY"],
    competitors: { Samsung: "RS85 Prestige", Siemens: "Acuson Sequoia" },
    sourceImage: "content/products/ge/GE-Logiq-E10.webp",
    targetExt: "webp",
  },
  {
    brand: "Philips",
    model: "EPIQ Elite",
    tier: "PREMIUM",
    clinicalUnits: ["RADIOLOGY", "OBGYN", "CARDIOLOGY"],
    competitors: { Samsung: "RS85 / HERA W10", GE: "Logiq E10 / Voluson E10" },
    sourceImage: "content/products/philips/Epiq Elite w⁄xMatrix.png",
    targetExt: "png",
  },
  {
    brand: "Canon",
    model: "Aplio i800",
    tier: "HIGH_END",
    clinicalUnits: ["RADIOLOGY", "OBGYN"],
    competitors: { Samsung: "RS80 Evo", GE: "Logiq E9 / Voluson E8" },
    sourceImage: "content/products/canon/aplio-i800/images/main.png",
    targetExt: "png",
  },
  {
    brand: "Siemens",
    model: "Acuson Sequoia",
    tier: "PREMIUM",
    clinicalUnits: ["RADIOLOGY"],
    competitors: { Samsung: "RS85 Prestige", GE: "Logiq E10" },
    sourceImage: "content/products/siemens/acuson-sequoia/images/main.jpg",
    targetExt: "jpg",
  },
  {
    brand: "Siemens",
    model: "Acuson Juniper",
    tier: "MID_RANGE",
    clinicalUnits: ["RADIOLOGY", "OBGYN"],
    competitors: { Samsung: "HS50 / HS40", GE: "Logiq P9 / P7" },
    sourceImage: "content/products/siemens/acoson-juniper/SIEMENS-ACUSON-JUNIPER-2.png",
    targetExt: "png",
  },
];

async function main() {
  console.log("🧹 Reorganizing product catalog: keeping only 7 products with images...");

  const baseContentDir = path.join(process.cwd(), "content", "products");
  const publicProductsDir = path.join(process.cwd(), "public", "products");

  // Temp save image buffers before cleanup
  const imageBuffers: Record<string, { buffer: Buffer; ext: string }> = {};

  for (const item of PRODUCTS_WITH_IMAGES) {
    const slug = `${toKebabCase(item.brand)}-${toKebabCase(item.model)}`;
    const fullSourcePath = path.join(process.cwd(), item.sourceImage);
    if (fs.existsSync(fullSourcePath)) {
      imageBuffers[slug] = {
        buffer: fs.readFileSync(fullSourcePath),
        ext: item.targetExt,
      };
      console.log(`  ✓ Saved image buffer for ${slug} (${fullSourcePath})`);
    } else {
      console.warn(`  ⚠️ Source image missing: ${fullSourcePath}`);
    }
  }

  // Wipe content/products directory
  if (fs.existsSync(baseContentDir)) {
    fs.rmSync(baseContentDir, { recursive: true, force: true });
  }
  fs.mkdirSync(baseContentDir, { recursive: true });

  // Wipe public/products directory
  if (fs.existsSync(publicProductsDir)) {
    fs.rmSync(publicProductsDir, { recursive: true, force: true });
  }
  fs.mkdirSync(publicProductsDir, { recursive: true });

  const fallbackList: any[] = [];
  const keepSlugs = new Set<string>();

  let idCounter = 1;

  for (const item of PRODUCTS_WITH_IMAGES) {
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

    let imageUrl = `/products/${brandSlug}/${modelSlug}/main.${item.targetExt}`;

    if (imageBuffers[slug]) {
      const { buffer, ext } = imageBuffers[slug];
      // Save inside content/products/
      const contentImgPath = path.join(imagesDir, `main.${ext}`);
      fs.writeFileSync(contentImgPath, buffer);

      // Save inside public/products/ for Next.js static serving
      const publicImgPath = path.join(publicProductDir, `main.${ext}`);
      fs.writeFileSync(publicImgPath, buffer);

      imageUrl = `/products/${brandSlug}/${modelSlug}/main.${ext}`;
    }

    const techSpecs = BRAND_SPECS[item.brand] || {};

    const yamlContent = `# TODO: teknik specler üretici datasheet'inden eklenecek
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
        specs: {
          ...techSpecs,
          imageUrl,
          priceSegment: item.tier,
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
        },
        description: `${item.brand} ${item.model} medikal ultrason görüntüleme sistemi.`,
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
      },
      description: `${item.brand} ${item.model} medikal ultrason görüntüleme sistemi.`,
    });

    console.log(`  ✓ Restructured & Saved: ${slug} (${imageUrl})`);
  }

  // Delete products from DB that are not in the 7 image products
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
