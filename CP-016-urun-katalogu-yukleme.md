# CP-016 — Ürün Kataloğu Yükleme (Gerçek Marka Verisi)

Bu bir seçenek listesi değil, direkt talimat. Sırayla uygula.

```
Bağlam: `urun-katalogu-seed.json` dosyası 27 gerçek ultrason cihazı (marka, model,
tier, klinik birim, muadil cihaz bilgisi) içeriyor. Bunu veritabanına yükle.

GÖREV:
1. `prisma/schema.prisma`'ya ekle:
   enum DeviceTier { PREMIUM HIGH_END MID_RANGE LOW_END }
   enum ClinicalUnit { RADIOLOGY OBGYN CARDIOLOGY PORTABLE }
   Product modeline: tier (DeviceTier), clinicalUnits (ClinicalUnit[]),
   competitors (Json?, nullable) alanlarını ekle.
2. `npx prisma migrate dev --name add-tier-clinical-units` çalıştır (push DEĞİL,
   migrate — CP-015-D'deki veri kaybı olayını tekrarlamamak için).
3. `content/products/{brand-kebab}/{model-kebab}/specs.yaml` klasör ağacını
   `urun-katalogu-seed.json`'daki 27 ürün için otomatik oluşturan bir script yaz
   (`scripts/scaffold-products.ts`). Her specs.yaml şunu içersin:
   brand, model, tier, clinicalUnits, competitors — JSON'daki veriyle birebir.
   Teknik spec alanları (ekran, port sayısı vb.) YOK, sadece "# TODO: teknik
   specler üretici datasheet'inden eklenecek" yorumu bırak.
   images/ ve docs/ klasörlerini de boş oluştur (sonra dosya ekleyeceğiz).
4. `scripts/ingest-products.ts` yaz: `content/products/` ağacını okur, her
   specs.yaml'ı zod ile doğrular, `prisma.product.upsert()` ile DB'ye yazar
   (create/deleteMany DEĞİL — slug'a göre upsert).
5. Scripti çalıştır, 27 ürünün DB'ye girdiğini `prisma.product.count()` ile
   doğrula ve bana rakamı raporla.

KABUL KRİTERİ: DB'de 27 ürün olmalı, hepsi tier + clinicalUnits dolu, migrate
dosyası git'e eklenmiş olmalı.
```

Bittiğinde görsel/broşür yükleme adımına (images/, docs/ klasörlerini doldurma)
geçeriz — o ayrı, senin elle görsel/PDF atman gereken bir iş, agent'ın işi değil.
