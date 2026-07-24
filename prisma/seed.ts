import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import * as dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const products = [
  {
    slug: "ge-voluson-e10",
    name: "Voluson E10",
    brand: "GE",
    category: "ultrason",
    price: 3200000, // 3.2M TL
    specs: {
      monitor_size: '23" OLED',
      probe_ports: 4,
      application: "Kadın Doğum / 4D",
      type: "Konsol",
      transducers: "Konveks, Vajinal, 4D Volüm, Lineer",
    },
    description: "Yüksek çözünürlüklü 4D görüntüleme teknolojisine sahip üst düzey kadın doğum ultrason sistemi. Riskli gebelik takipleri ve detaylı fetal incelemeler için klinikler tarafından yaygın olarak tercih edilir.",
  },
  {
    slug: "ge-logiq-e10",
    name: "Logiq E10",
    brand: "GE",
    category: "ultrason",
    price: 2800000, // 2.8M TL
    specs: {
      monitor_size: '23" LCD',
      probe_ports: 4,
      application: "Genel Radyoloji / Radyoloji",
      type: "Konsol",
      transducers: "Konveks, Lineer, Vajinal, Sektör",
    },
    description: "Yapay zeka destekli görüntü optimizasyonu sunan genel radyoloji ultrason cihazı. Derin dokularda net görüntü elde edilmesini sağlayan XDclear prob teknolojisi ile donatılmıştır.",
  },
  {
    slug: "philips-epiq-elite",
    name: "Epiq Elite",
    brand: "Philips",
    category: "ultrason",
    price: 3100000, // 3.1M TL
    specs: {
      monitor_size: '24" LCD',
      probe_ports: 4,
      application: "Kardiyoloji / Genel Radyoloji",
      type: "Konsol",
      transducers: "Sektör, Konveks, Lineer, TEE",
    },
    description: "Kardiyoloji ve vasküler görüntülemede endüstri standardı haline gelen üst düzey tanı sistemi. nSIGHT Plus mimarisi sayesinde yüksek kare hızlarında yüksek çözünürlük sağlar.",
  },
  {
    slug: "philips-affiniti-70",
    name: "Affiniti 70",
    brand: "Philips",
    category: "ultrason",
    price: 1850000, // 1.85M TL
    specs: {
      monitor_size: '21.5" LCD',
      probe_ports: 4,
      application: "Genel Radyoloji / Kadın Doğum",
      type: "Konsol",
      transducers: "Konveks, Lineer, Sektör, Vajinal",
    },
    description: "Yoğun hasta sirkülasyonu olan klinikler için tasarlanmış orta-üst segment ultrason cihazı. Hızlı iş akışı araçları ve düşük enerji tüketimi ile operasyonel kolaylık sunar.",
  },
  {
    slug: "mindray-resona-7",
    name: "Resona 7",
    brand: "Mindray",
    category: "ultrason",
    price: 2100000, // 2.1M TL
    specs: {
      monitor_size: '21.5" LCD',
      probe_ports: 4,
      application: "Genel Radyoloji / Kadın Doğum",
      type: "Konsol",
      transducers: "Konveks, Lineer, Vajinal, Sektör",
    },
    description: "Zone Sonography (ZST+) teknolojisi kullanan yüksek performanslı ultrason platformu. Geleneksel cihazlara göre kan akışı analizlerinde ve elastografi ölçümlerinde daha stabil veriler üretir.",
  },
  {
    slug: "mindray-dc-80",
    name: "DC-80",
    brand: "Mindray",
    category: "ultrason",
    price: 1450000, // 1.45M TL
    specs: {
      monitor_size: '21.5" LCD',
      probe_ports: 4,
      application: "Genel / OB-GYN",
      type: "Konsol",
      transducers: "Konveks, Lineer, Vajinal",
    },
    description: "X-Insight teknolojisine sahip bütçe dostu orta segment klinik ultrasonu. Kolay kullanılabilir arayüzü ve dokunmatik kontrol paneliyle günlük tanı işlemlerini hızlandırır.",
  },
  {
    slug: "samsung-hera-w9",
    name: "Hera W9",
    brand: "Samsung",
    category: "ultrason",
    price: 2400000, // 2.4M TL
    specs: {
      monitor_size: '23" LCD',
      probe_ports: 4,
      application: "Kadın Doğum / Radyoloji",
      type: "Konsol",
      transducers: "Konveks, Vajinal, 4D Volüm",
    },
    description: "Crystal Architecture görüntüleme motoruna sahip, kadın doğum odaklı premium ultrason sistemi. Ergonomik mekanik kolu ve hekim konforunu artıran kontrol konsolu ile öne çıkar.",
  },
  {
    slug: "samsung-hs40",
    name: "HS40",
    brand: "Samsung",
    category: "ultrason",
    price: 950000, // 950k TL
    specs: {
      monitor_size: '21.5" LCD',
      probe_ports: 3,
      application: "Kadın Doğum / Genel Pratisyen",
      type: "Konsol / Giriş Seviyesi",
      transducers: "Konveks, Vajinal, Lineer",
    },
    description: "Kısıtlı alana ve bütçeye sahip poliklinikler için ideal giriş seviyesi ultrason cihazı. Temel 2D ve renkli Doppler modlarında tatmin edici görüntü performansı sunar.",
  },
];

async function main() {
  console.log("Database seeding started...");
  
  // Clean existing products
  await prisma.product.deleteMany({
    where: {
      category: "ultrason",
    },
  });

  for (const product of products) {
    const created = await prisma.product.create({
      data: product,
    });
    console.log(`Created product: ${created.brand} ${created.name}`);
  }

  console.log("Database seeding finished successfully.");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
