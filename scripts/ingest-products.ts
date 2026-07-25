import fs from "fs";
import path from "path";
import { z } from "zod";
import { PrismaClient, DeviceTier, ClinicalUnit } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const productSpecSchema = z.object({
  brand: z.string().min(1),
  model: z.string().min(1),
  tier: z.enum(["PREMIUM", "HIGH_END", "MID_RANGE", "LOW_END"]),
  clinicalUnits: z.array(z.enum(["RADIOLOGY", "OBGYN", "CARDIOLOGY", "PORTABLE"])).min(1),
  competitors: z.record(z.string(), z.string()).optional().default({}),
});

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
      if (trimmed.includes("{}")) {
        result.competitors = {};
      }
    } else if (trimmed.startsWith("specs:")) {
      currentKey = "specs";
    } else if (line.startsWith("  - ") && currentKey === "clinicalUnits") {
      const val = trimmed.replace(/^- \s*/, "").trim();
      result.clinicalUnits.push(val);
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

function getAllSpecsFiles(dirPath: string): string[] {
  const files: string[] = [];
  if (!fs.existsSync(dirPath)) return files;

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllSpecsFiles(fullPath));
    } else if (entry.isFile() && entry.name === "specs.yaml") {
      files.push(fullPath);
    }
  }

  return files;
}

async function main() {
  console.log("🚀 Ingesting products from content/products/ into database...");

  const baseContentDir = path.join(process.cwd(), "content", "products");
  const specsFiles = getAllSpecsFiles(baseContentDir);

  console.log(`📂 Found ${specsFiles.length} specs.yaml files.`);

  let ingestedCount = 0;

  for (const filePath of specsFiles) {
    const relativePath = path.relative(baseContentDir, filePath);
    const pathParts = relativePath.split(path.sep);

    if (pathParts.length < 3) {
      console.warn(`⚠️ Unexpected file path structure: ${relativePath}`);
      continue;
    }

    const brandSlug = pathParts[0];
    const modelSlug = pathParts[1];
    const slug = `${brandSlug}-${modelSlug}`;

    const rawContent = fs.readFileSync(filePath, "utf-8");
    const parsedData = parseSpecsYaml(rawContent);

    // Validate with Zod
    const validatedData = productSpecSchema.parse(parsedData);

    await prisma.product.upsert({
      where: { slug },
      update: {
        name: validatedData.model,
        brand: validatedData.brand,
        category: "ultrason",
        tier: validatedData.tier as DeviceTier,
        clinicalUnits: validatedData.clinicalUnits as ClinicalUnit[],
        competitors: validatedData.competitors,
        specs: parsedData.specs,
      },
      create: {
        slug,
        name: validatedData.model,
        brand: validatedData.brand,
        category: "ultrason",
        specs: parsedData.specs,
        description: `${validatedData.brand} ${validatedData.model} ultrason cihazı.`,
        tier: validatedData.tier as DeviceTier,
        clinicalUnits: validatedData.clinicalUnits as ClinicalUnit[],
        competitors: validatedData.competitors,
      },
    });

    ingestedCount++;
    console.log(`  ✓ Ingested: ${slug} (${validatedData.brand} ${validatedData.model})`);
  }

  const totalInDb = await prisma.product.count();
  console.log(`\n🎉 Ingestion complete!`);
  console.log(`   - Processed from content/: ${ingestedCount}`);
  console.log(`   - Total products in database: ${totalInDb}`);
}

main()
  .catch((e) => {
    console.error("❌ Ingestion error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
