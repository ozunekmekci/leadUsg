# PROGRESS.md — Medikal Cihaz Broker Platformu

## ✅ CP-001 TAMAMLANDI — Proje Başlangıcı ve Keşif

**Yapılanlar:**

1. **İş modeli özeti çıkarıldı.** Platform, "Moving Broker" modelinin medikal görüntüleme
   cihazları versiyonu olarak tanımlandı: kullanıcıya tarafsız bir karşılaştırma kaynağı
   gibi görünen, ama asıl amacı açık (form) + örtülü (davranışsal) veri toplamak olan bir
   sistem. Tek authenticated aktör Account Manager. Değerli varlık: birleşik lead kartı
   (form verisi + davranışsal sinyal).

2. **SWOT analizi yapıldı.**
   - Güçlü yönler: yüksek niyetli trafik, zengin davranışsal sinyal, sahibinin biyomedikal
     geçmişi, düşük marjinal genişleme maliyeti.
   - Zayıf yönler: tek-AM'e bağımlı dönüşüm huni, içerik/spec bakım yükü, tavuk-yumurta
     problemi (trafik ↔ distribütör güveni).
   - Fırsatlar: Faz 3 veri ürünü, çoklu distribütörlü marketplace'e evrilme.
   - Tehditler: **KVKK uyum riski** (rızasız davranışsal tracking + fingerprint ile oturum
     birleştirme — yasal risk, açık onay/aydınlatma metni önerildi), şeffaflık/çıkar
     çatışması riski, tek nokta arıza riski.

3. **Gelir modelleri sıralandı** (6 model, MVP uygunluğuna göre):
   lead komisyonu > başarı primi > hibrit > veri satışı > abonelik > reklam/sponsorluk.

**Notlar:**
- ASSUMPTION: MVP'nin tek-distribütör senaryosu (mevcut Promedis rolüne benzer) etrafında
  başlayacağı varsayıldı.
- AMBIGUOUS: Platformun bağımsız girişim mi yoksa Promedis dahili aracı mı olacağı henüz
  netleşmedi. Bu, KVKK veri sorumlusu kimliğini ve çıkar çatışması riskini doğrudan
  etkiliyor — CP-002 öncesi netleştirilmesi önerilir.

**Sıradaki adım:** CP-002 — Sistem mimarisi, tech stack kararı, veri modeli.

## ✅ CP-002 TAMAMLANDI — Sistem Mimarisi

**Yapılanlar:**

1. **Mimari diyagram çizildi.** Ziyaretçi → Next.js frontend → Backend API (Route Handlers)
   → PostgreSQL + Redis → AM admin panel akışı görselleştirildi.

2. **Tech stack kararlaştırıldı:** Next.js 14 (App Router) + Tailwind + shadcn/ui frontend;
   MVP'de ayrı backend servisi yerine Next.js Route Handlers; PostgreSQL + Redis; kendi
   custom event pipeline'ı (PostHog yerine, consent kontrolünü kendi elimizde tutmak için);
   Docker Compose + VPS deployment (public site homelab arkasında olamaz).

3. **Veri modeli çıkarıldı:** `products`, `sessions`, `events` (aylık partition'lı),
   `leads`, `lead_notes`, `am_users` tabloları ve aralarındaki ilişkiler tanımlandı.

4. **Event tracking stratejisi + consent mimarisi belirlendi.** `sessions.consent_status`
   alanı üç kademeli (`none` / `analytics` / `full`) tasarlandı — fingerprint tabanlı
   cross-session eşleştirme sadece kullanıcı onayından sonra aktifleşiyor. Bu, CP-001'de
   işaretlenen KVKK riskini mimari seviyesinde (sonradan eklenen özellik değil, veri
   modelinin birinci sınıf parçası olarak) ele alıyor.

## ✅ CP-003 & CP-004 TAMAMLANDI — State Machine ve Kapsam Tanımı

**Yapılanlar:**
1. **AM State Machine belirlendi:** Lead Geldi → İnceleniyor → Arandı → Sıcak/Soğuk → Satış/Kapalı akışı ve tetikleyiciler PROGRESS.md'de kararlaştırıldı.
2. **Kapsam ve Öncelikler belirlendi:** MVP için kritik sayfalar ve aşamalı geçişler netleştirildi.

## ✅ CP-005 TAMAMLANDI — Next.js Scaffold

**Yapılanlar:**
1. **Next.js 14 App Router Projesi Kuruldu:** TypeScript, Tailwind CSS ve ESLint entegrasyonu ile boş proje başlatıldı.
2. **Prisma 7 & PostgreSQL Konfigüre Edildi:** Veritabanı modeli (`schema.prisma` ve `prisma.config.ts`) tanımlandı ve Prisma Client oluşturuldu.
3. **Redis & ioredis Kuruldu:** Hızlı önbellek ve rate-limiting altyapısı için Redis client tanımlandı.
4. **Layout ve Placeholder Rotalar Tanımlandı:** Ürünler, detay, karşılaştırma, teklif alma ve AM admin panel placeholder sayfaları ile Header/Footer tasarlandı.
5. **Derleme Doğrulandı:** `npm run build` komutunun sorunsuz çalıştığı doğrulandı.

## ✅ CP-006 TAMAMLANDI — Ürün Listeleme Sayfası (Ultrason Kategorisi)

**Yapılanlar:**
1. **Seed Script Yazıldı (`prisma/seed.ts`):** 8 adet gerçekçi ultrason cihazı (GE Voluson E10, Logiq E10, Philips EPIQ Elite, Samsung Hera W9, Mindray Resona 7, Canon Aplio i800, Siemens ACUSON Sequoia, Sonosite LX) detaylı spec tabloları ve doğal Türkçe açıklamalarıyla DB'ye seed edildi. Toplam 11 ürün DB'de doğrulandı.
2. **Ürün Kartı Komponenti (`ProductCard.tsx`):** Görsel alanı, marka etiketi, bütçe segmenti, öne çıkan 2-3 teknik özellik maddesi, prob ve ekran cip'leri, "Karşılaştırmaya Ekle" checkbox'ı ve "Detay" butonu ile oluşturuldu.
3. **Dinamik Filtreleme (`ProductFilters.tsx`):** İstemci taraflı marka ve bütçe filtreleme yazıldı. Filtre durumları anlık olarak URL query parametrelerine (`?brand=GE+HealthCare&budget=2-3M+TL`) yansıtıldı.
4. **Boş Durum (`EmptyState.tsx`):** Filtre sonucu 0 ürün kaldığında temiz bir uyarı ve filtre sıfırlama butonu tasarlandı.
5. **Duyarlı Tasarım ve Derleme:** 375px mobil ekranlarda tek sütun grid ve mobil filtre çekmecesi sağlandı. `npm run build` komutunun sorunsuz çalıştığı doğrulandı.

**Sıradaki adım:** CP-007 — Ürün detay sayfası + spec tablosu.
