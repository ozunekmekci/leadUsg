import fs from "fs";
import path from "path";
import { toKebabCase } from "./scaffold-products";

interface ProductSeed {
  brand: string;
  model: string;
  tier: string;
  clinicalUnits: string[];
  competitors: Record<string, string>;
}

function parseSpecsYaml(yamlText: string): Record<string, any> {
  const lines = yamlText.split("\n");
  const result: Record<string, any> = {
    brand: "",
    model: "",
    tier: "",
    clinicalUnits: [],
    competitors: {},
    specs: {},
  };

  let currentKey = "";
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    if (trimmed.startsWith("brand:")) {
      result.brand = trimmed.replace(/^brand:\s*/, "").replace(/^"|"$/g, "");
    } else if (trimmed.startsWith("model:")) {
      result.model = trimmed.replace(/^model:\s*/, "").replace(/^"|"$/g, "");
    } else if (trimmed.startsWith("tier:")) {
      result.tier = trimmed.replace(/^tier:\s*/, "").replace(/^"|"$/g, "");
    } else if (trimmed.startsWith("clinicalUnits:")) {
      currentKey = "clinicalUnits";
    } else if (trimmed.startsWith("competitors:")) {
      currentKey = "competitors";
      if (trimmed.includes("{}")) result.competitors = {};
    } else if (trimmed.startsWith("specs:")) {
      currentKey = "specs";
    } else if (line.startsWith("  - ") && currentKey === "clinicalUnits") {
      result.clinicalUnits.push(trimmed.replace(/^- \s*/, "").trim());
    } else if (line.startsWith("  ") && currentKey === "competitors") {
      const colonIdx = trimmed.indexOf(":");
      if (colonIdx !== -1) {
        const k = trimmed.slice(0, colonIdx).trim().replace(/^"|"$/g, "");
        const v = trimmed.slice(colonIdx + 1).trim().replace(/^"|"$/g, "");
        result.competitors[k] = v;
      }
    } else if (line.startsWith("  ") && currentKey === "specs") {
      const colonIdx = trimmed.indexOf(":");
      if (colonIdx !== -1) {
        const k = trimmed.slice(0, colonIdx).trim().replace(/^"|"$/g, "");
        const v = trimmed.slice(colonIdx + 1).trim().replace(/^"|"$/g, "");
        result.specs[k] = v;
      }
    }
  }

  return result;
}

function main() {
  console.log("⚙️ Generating fallbackProducts.ts from content/products/...");
  const seedPath = path.join(process.cwd(), "urun-katalogu-seed.json");
  const data = JSON.parse(fs.readFileSync(seedPath, "utf-8"));
  const baseContentDir = path.join(process.cwd(), "content", "products");

  const products: any[] = [];
  let idCount = 1;

  for (const product of data.products) {
    const brandSlug = toKebabCase(product.brand);
    const modelSlug = toKebabCase(product.model);
    const slug = `${brandSlug}-${modelSlug}`;
    const specsPath = path.join(baseContentDir, brandSlug, modelSlug, "specs.yaml");

    let specsObj: any = {
      priceSegment: product.tier,
      clinicalUnits: product.clinicalUnits,
      competitors: product.competitors,
    };

    if (fs.existsSync(specsPath)) {
      const parsed = parseSpecsYaml(fs.readFileSync(specsPath, "utf-8"));
      specsObj = {
        ...specsObj,
        ...parsed.specs,
      };
    }

    products.push({
      id: idCount++,
      slug,
      name: product.model,
      brand: product.brand,
      category: "ultrason",
      createdAt: new Date().toISOString(),
      specs: specsObj,
      description: `${product.brand} ${product.model} medikal ultrason görüntüleme sistemi.`,
    });
  }

  const tsContent = `export interface ProductSpecs {
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

export const FALLBACK_PRODUCTS: FallbackProduct[] = ${JSON.stringify(products, null, 2)};
`;

  const outputPath = path.join(process.cwd(), "src", "lib", "fallbackProducts.ts");
  fs.writeFileSync(outputPath, tsContent, "utf-8");
  console.log(`✅ Successfully updated ${outputPath} with ${products.length} products!`);
}

main();
