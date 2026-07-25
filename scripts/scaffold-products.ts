import fs from "fs";
import path from "path";

interface ProductSeed {
  brand: string;
  model: string;
  tier: string;
  clinicalUnits: string[];
  competitors: Record<string, string>;
}

interface SeedData {
  note?: string;
  products: ProductSeed[];
}

export function toKebabCase(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatYaml(p: ProductSeed): string {
  const lines: string[] = [
    "# TODO: teknik specler üretici datasheet'inden eklenecek",
    `brand: "${p.brand.replace(/"/g, '\\"')}"`,
    `model: "${p.model.replace(/"/g, '\\"')}"`,
    `tier: "${p.tier}"`,
    "clinicalUnits:",
  ];

  for (const unit of p.clinicalUnits) {
    lines.push(`  - ${unit}`);
  }

  lines.push("competitors:");
  const competitorEntries = Object.entries(p.competitors);
  if (competitorEntries.length === 0) {
    lines[lines.length - 1] = "competitors: {}";
  } else {
    for (const [compBrand, compModel] of competitorEntries) {
      lines.push(`  "${compBrand}": "${compModel.replace(/"/g, '\\"')}"`);
    }
  }

  return lines.join("\n") + "\n";
}

function main() {
  const seedPath = path.join(process.cwd(), "urun-katalogu-seed.json");
  if (!fs.existsSync(seedPath)) {
    console.error(`❌ Seed file not found: ${seedPath}`);
    process.exit(1);
  }

  const rawData = fs.readFileSync(seedPath, "utf-8");
  const data: SeedData = JSON.parse(rawData);

  console.log(`📦 Found ${data.products.length} products in seed file.`);

  const baseContentDir = path.join(process.cwd(), "content", "products");

  let createdCount = 0;
  for (const product of data.products) {
    const brandSlug = toKebabCase(product.brand);
    const modelSlug = toKebabCase(product.model);

    const productDir = path.join(baseContentDir, brandSlug, modelSlug);
    const imagesDir = path.join(productDir, "images");
    const docsDir = path.join(productDir, "docs");

    fs.mkdirSync(imagesDir, { recursive: true });
    fs.mkdirSync(docsDir, { recursive: true });

    // Add .gitkeep to keep empty folders tracked
    fs.writeFileSync(path.join(imagesDir, ".gitkeep"), "");
    fs.writeFileSync(path.join(docsDir, ".gitkeep"), "");

    const specsPath = path.join(productDir, "specs.yaml");
    const yamlContent = formatYaml(product);

    fs.writeFileSync(specsPath, yamlContent, "utf-8");
    createdCount++;
    console.log(`  └─ Scaffolded: content/products/${brandSlug}/${modelSlug}/specs.yaml`);
  }

  console.log(`✅ Successfully scaffolded ${createdCount} products.`);
}

if (require.main === module) {
  main();
}
