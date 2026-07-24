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

## ✅ CP-007 TAMAMLANDI — Ürün Detay Sayfası + Spec Tablosu

**Yapılanlar:**
1. **Design System Spec (`DESIGN.md`):** Google `@google/design.md` açık spesifikasyon formatında `leadUsg` renk, tipografi, köşe yumuşatma, aralık ve bileşen token'ları yazıldı. `npx @google/design.md lint` ile 0 hata ve 0 uyarı ile doğrulandı.
2. **Esnek SpecTable Komponenti (`SpecTable.tsx`):** Tek ürün detay görüntüsü (`[product]`) veya çoklu ürün karşılaştırma matrisi (`[p1, p2, p3]`) alabilen modüler teknik özellik tablosu tasarlandı. Biyomedikal parametreler 5 ana grup altında toplandı.
3. **Ürün Detay Sayfası (`/urunler/[kategori]/[slug]`):** Prisma ile dinamik sunucu taraflı sorgulama yapıldı. Geçersiz/olmayan slug'lar için `notFound()` (404) fırlatma mekanizması kuruldu.
4. **Galeri & CTA Yapısı:** En az 2 görsellik galeri alanı (1 ana görsel + 3 küçük slot), "Teklif Al" ve "Karşılaştırmaya Ekle" yapışkan (sticky) butonları eklendi.
5. **Önerilen Cihazlar (`RelatedProducts.tsx`):** Sayfa altına aynı kategoriden 3 adet alternatif ürün öneri alanı entegre edildi. `npm run build` ile doğrulandı.

## ✅ CP-008 TAMAMLANDI — Karşılaştırma Modülü (2-4 Cihaz Yan Yana)

**Yapılanlar:**
1. **Event Tracking Taslağı (`src/lib/tracking.ts`):** `trackEvent(name, metadata)` stub fonksiyonu oluşturuldu. `CompareView` komponentinin mount edilmesinde `compare_start`, unmount edilmesinde ise geçirilen saniye cinsinden süre hesaplanarak `compare_end` event'i tetiklendi.
2. **Çoklu Karşılaştırma Mantığı & Sınır Kontrolü (`/karsilastir?ids=1,2,3`):**
   - Query parametresindeki ID'ler ayrıştırıldı. 0 veya 1 geçerli ID verilmesi durumunda otomatik olarak `/urunler/ultrason` kataloğuna yönlendiren fallback yazıldı.
   - 4'ten fazla ID verilmesi durumunda liste ilk 4 cihaza kesilerek uyarı banner'ı gösterildi (*"En fazla 4 cihaz yan yana karşılaştırılabilir."*).
3. **Fark Vurgulamalı SpecTable:** `SpecTable` komponentinde `highlightDifferences={true}` modunda, ürünler arasında farklılık gösteren spesifikasyon satırları vurgulu bir arka planla öne çıkarıldı.
4. **Forma Yönlendiren Teklif CTA'sı:** Sayfa altında seçili cihaz ID'lerini `/teklif-al?products=1,2,3` şeklinde forma taşıyan "Seçili Cihazlar İçin Teklif Al" paneli entegre edildi.
5. **Derleme Doğrulaması:** `npm run build` komutu çalıştırılarak tüm rotaların sorunsuz derlendiği doğrulandı.

## ✅ CP-009 TAMAMLANDI — Event Tracking Altyapısı (Consent-Gated)

**Yapılanlar:**
1. **İstemci Rıza Yönetimi & Sıkı Kısıtlar (`ConsentBanner.tsx`):**
   - Eşit görünürlükte "Kabul Et" ve "Sadece Gerekli" seçenekleri sunan rıza bildirim bileşeni eklendi.
   - Onay öncesinde/red durumunda parmak izi, cookie veya kişisel cihaz ID'si üretilmesi/saklanması kesin olarak engellendi.
2. **Anonim Parmak İzi Üretimi (`src/lib/fingerprint.ts`):**
   - Yalnızca "analytics" veya "full" onayı sonrasında çalışan Canvas + UserAgent + Ekran çözünürlüğü tabanlı SHA-256 parmak izi üreteci yazıldı.
3. **Structured Logger & PII Maskeleme (`src/lib/logger.ts`):**
   - IP adresi ve parmak izi gibi kişisel verilerin (PII) düz metin yerine maskelenip/kısaltılarak (SHA-256 prefix) loglanmasını sağlayan güvenli loglama altyapısı kuruldu.
4. **Client Event Tracking SDK (`src/lib/tracking.ts`):**
   - Rıza durumunu kontrol eden (`none` ise no-op), event'leri yerel tampona ekleyen, 5 saniyede bir veya sayfa kapatılırken `navigator.sendBeacon` / `fetch` ile `/api/events` endpoint'ine toplu gönderen SDK yazıldı.
5. **Backend Endpoint & Güvenlik (`POST /api/events`):**
   - Gelen payload Zod şeması ile doğrulandı.
   - Redis üzerinden IP başına dakikada max 60 istek sınırı (rate limit) uygulandı.
   - Session ve event verileri Prisma üzerinden PostgreSQL veritabanına kaydedildi.
6. **Bileşen Entegrasyonları & Derleme Doğrulaması:**
   - `CompareView`, `ProductCard`, `ProductFilters` bileşenleri `trackEvent` çağrılarıyla donatıldı.
   - `npm run build` komutunun hatasız tamamlandığı ve veritabanı yazma testlerinin başarılı olduğu doğrulandı.

**Sıradaki adım:** CP-010 — "Teklif Al" Formu + Lead Kaydı.

## ✅ CP-010 TAMAMLANDI — "Teklif Al" Formu + Lead Kaydı

**Yapılanlar:**
1. **İstemci Formu (`ProposalForm.tsx`):**
   - React Hook Form + `@hookform/resolvers` + `zod` kullanılarak istemci tarafında zengin validasyonlu teklif alma formu yazıldı.
   - Ad Soyad (min 2 harf), Kurum Adı (min 2 harf) ve Telefon (Türkiye cep tel regex formatı) alanları zorunlu kılındı.
   - E-posta, Bütçe Aralığı ve Mesaj alanları opsiyonel olarak sunuldu.
   - Form gönderildikten sonra sayfa yönlendirmesi yapılmaksızın aynı sayfada onay/teşekkür kartı state değişimi sağlandı.
2. **Sunucu API & Güvenlik Koruması (`POST /api/leads`):**
   - Sunucu tarafında sert Zod validasyonu uygulandı; istemci validasyonu bypass edilse bile geçersiz veriler HTTP 400 ile reddedildi.
   - Redis üzerinden IP bazlı dakikada maks 3 form gönderim sınırı (anti-spam rate limit) kuruldu.
3. **Session Consent Upgrade (`consent_status = "full"`):**
   - Kullanıcı iletişim bilgilerini kendi rızasıyla gönderdiği anda `sessions.consent_status` değeri `"full"` seviyesine yükseltildi.
4. **Duplicate Engelleme / Upsert Mantığı:**
   - Aynı session içinden tekrar form doldurulması durumunda mükerrer kayıt oluşturmak yerine mevcut `Lead` kaydının güncellenmesi (`update`) sağlandı ve doğrulandı.
5. **Account Manager Bildirim Altyapısı:**
   - Yeni gelen lead'ler için ortama göre Webhook (n8n/Slack) çağrısı atan ve sunucu tarafında maskelenmiş PII alert logu düşüren asenkron bildirim dağıtıcısı entegre edildi.

**Sıradaki adım:** CP-011 — Account Manager Admin Panel (Auth + Lead Listesi).

## ✅ CP-011 TAMAMLANDI — Account Manager Admin Panel (Auth + Lead Listesi)

**Yapılanlar:**
1. **Güvenli Kimlik Doğrulama (`src/lib/auth.ts` & `src/middleware.ts`):**
   - Web Crypto API tabanlı Edge-uyumlu JWT imzalama/doğrulama modülü ve `scrypt` şifre hashleme yapısı kuruldu.
   - HTTP-Only `am_session` cookie mekanizması yazıldı.
   - `src/middleware.ts` güncellenerek `/admin/leads` rotaları koruma altına alındı (giriş yapmamış kullanıcılar doğrudan `/admin` login sayfasına yönlendirilir).
2. **Account Manager Seed Script (`prisma/seed.ts`):**
   - `.env` dosyasından okunan e-posta (`AM_EMAIL`) ve şifre (`AM_PASSWORD`) ile varsayılan Biyomedikal Account Manager kullanıcısı (`am_users` tablosuna) seed edildi.
3. **Login & Logout API Rotaları (`/api/admin/login`, `/api/admin/logout`):**
   - Şifre doğrulaması yapan login API'si ve güvenli çıkış yapan logout API'si yazıldı.
4. **AM Yönetim Paneli & Filtreleme (`/admin/leads/page.tsx` & `/api/admin/leads`):**
   - İstatistik özet kartları (Toplam Lead, Lead Geldi, Arandı, Sıcak, Satış) eklendi.
   - Statüye göre filtreleme pills (Lead Geldi, Arandı, Sıcak, Soğuk, Satış, Kapalı) ve kurum/isim/telefon ile canlı arama çubuğu kuruldu.
5. **Server-side AM State Machine Doğrulaması (`/api/admin/leads/[id]/status`):**
   - Statü değişiklikleri CP-003 kurallarına göre sunucu API'sinde sert doğrulamaya tabi tutuldu.
   - Örneğin "Lead Geldi" (`new`) durumundaki bir kaydı direkt "Satış" (`sold`) yapma denemeleri HTTP 400 Bad Request hatası ile reddedildi ve doğrulandı.

**Sıradaki adım:** CP-012 — Lead Detay Kartı (Davranışsal Veri + Form Verisi Birleşik).

## ✅ CP-012 TAMAMLANDI — Lead Detay Kartı (Davranışsal Veri + Form Verisi Birleşik)

**Yapılanlar:**
1. **Birleşik Lead Detay API (`GET /api/admin/leads/[id]`):**
   - Müşteri form verileri, ilişkili oturum(lar) ve davranışsal etkinlikler birleştirilerek tek API çıktısında sunuldu.
   - Parmak izi (`fingerprintHash`) eşleşen tüm oturumlara ait event'ler ortak zaman çizelgesinde birleştirildi.
   - Event metadata'larındaki ürün ID'leri `products` tablosu üzerinden `brand + name` olarak çözüldü (ör. "GE HealthCare Logiq E10 vs Samsung Hera W9").
   - Davranışsal zeka metrikleri (toplam olay, aktif gün sayısı "3 ziyaret, son 7 gün", rıza durumu, karşılaştırılan ürünler özeti) hesaplandı.
2. **Optimistic UI AM Not Sistemi (`LeadNotesSection.tsx` & `/api/admin/leads/[id]/notes`):**
   - Account Manager not eklediğinde arayüz milisaniyeler içerisinde (optimistic update) güncellenecek şekilde tasarlandı.
   - Sunucu veya ağ hatası durumunda yazılan notun geri alınması (rollback) ve hata uyarısı gösterilmesi sağlandı.
3. **Davranışsal Etkinlik Zaman Çizelgesi (`LeadTimeline.tsx`):**
   - Karşılaştırma başlatma/sonlandırma, cihaz detay tıklamaları, filtre tercihleri ve teklif formu gönderim anını özel simge ve renklerle kronolojik sırayla gösteren timeline bileşeni geliştirildi.
4. **AM State Machine Entegrasyonu & Derleme Doğrulaması:**
   - Detay kartı sayfasında (`/admin/leads/[id]`) da CP-011'de kurulan sunucu doğrulamalı AM state machine geçiş butonları sağlandı.
   - `npm run build` komutunun sorunsuz tamamlandığı ve veritabanı çözümleme testlerinin başarılı olduğu doğrulandı.

**Sıradaki adım:** CP-013 — Entegrasyon Testleri + Deployment Hazırlığı.

## ✅ CP-013 TAMAMLANDI — Entegrasyon Testleri + Deployment Hazırlığı

**Yapılanlar:**
1. **Sağlık Kontrolü Endpoint'i (`GET /api/health`):**
   - PostgreSQL (`prisma.$queryRaw`) ve Redis (`redis.ping()`) servis canlılıklarını kontrol eden, `status`, `uptime` ve servis durumlarını içeren HTTP 200/503 JSON endpoint'i kuruldu.
2. **8 Halka Uçtan Uca Entegrasyon Test Paketi (`scripts/integration_test.ts`):**
   - Katalog ürün doğrulaması, consent session başlatma, event boru hattı, lead formu gönderimi & rıza upgrade'i, AM auth/JWT doğrulaması, birleşik lead kartı ürün çözümlenmesi, AM state machine kısıt doğrulaması ve AM not ekleme halkalarının tümünün yeşil geçtiği otomatik test yazıldı ve başarıyla çalıştırıldı (8/8 PASSED).
3. **Multi-Stage Docker Yapılandırması (`Dockerfile`):**
   - Next.js 14 App Router production ortamı için `deps`, `builder` ve `runner` aşamalarını içeren optimize edilmiş imaj hazırlığı yapıldı.
4. **Docker Compose & Canlıya Alma Yapılandırması (`docker-compose.yml` & `.env.example`):**
   - `web` (Next.js), `postgres` (PostgreSQL 16) ve `redis` (Redis 7) konteyner tanımları, kalıcı volume'lar ve sağlık kontrolleri ile Docker Compose kurulumu tamamlandı.

**Sıradaki adım:** CP-014 — MVP Lansmanı.

## 🚀 ✅ CP-014 TAMAMLANDI — MVP Lansmanı (Faz 1 %100 Tamamlandı)

**Yapılanlar:**
1. **Üretim Derlemesi Doğrulaması:** `npm run build` komutunun tüm dinamik API ve sayfa rotaları için 0 hata ile derlendiği teyit edildi.
2. **Lansman Raporu & Dokümantasyon (`walkthrough.md` & `README.md`):**
   - Tüm platform özelliklerini, rıza güvenliği garantilerini ve çalıştırma rehberini kapsayan [walkthrough.md](file:///home/abc/.gemini/antigravity/brain/1ba2d419-2ae6-4528-bf59-317a4b936c63/walkthrough.md) dokümanı eklendi.
   - [README.md](file:///home/abc/Masa%C3%BCst%C3%BC/leadUsg/README.md) yerel kurulum, Docker Compose VPS canlıya alma ve API endpoint rehberleri ile güncellendi.
3. **Faz 1 Kapanışı:**
   - CP-001'den CP-014'e kadar olan 14 checkpoint tamamlanarak Medikal Cihaz Broker Platformu (`leadUsg`) lansmana hazır hale getirildi.

**Sıradaki Aşama:** Faz 1 Pre-Launch Checklist Doğrulaması.

### 🔒 FAZ 1 PRE-LAUNCH CHECKLIST DÜZELTMELERİ (TAMAMLANDI)

**Yapılanlar:**
1. **HTTP Seviyesi Entegrasyon Test Refaktörü:** `scripts/integration_test.ts` güncellenerek Prisma seviyesini aşan, doğrudan Next.js API Route Handler'larını test eden request/response simülasyon yapısı kuruldu. Consent-gate ("none" consent ile 400/403 hatası) ve AM State Machine geçişleri (new'den direkt sold'a geçiş denemesinde 400 hatası) API sınırlarında başarıyla doğrulandı.
2. **Caddy Reverse Proxy ve TLS:** `docker-compose.yml` güncellenerek HTTPS yönlendirmesi yapan, Let's Encrypt sertifikasını otomatik yöneten Caddy reverse proxy stack'e eklendi. Web portu 3000 dış erişime kapatılarak stack güvenliği artırıldı. Port çakışmalarını önlemek için host portları `.env` üzerinden yapılandırılabilir hale getirildi.
3. **Dockerfile Hata Düzeltmeleri:** Docker build'de `npm ci` esnasında postinstall'da tetiklenen `prisma generate`'in şema dosyalarını bulamaması hatası `prisma` klasörü kopyalanarak çözüldü. Alpine paket yöneticisi apk'daki `--no-co-cache` yazım hatası giderildi.
4. **KVKK Aydınlatma Metni:** Dinamik `/kvkk` rotası oluşturularak detaylı Türkçe KVKK politikası eklendi ve çerez onay banner'ından linklendi.

**Sıradaki Aşama:** Faz 2 — Genişleme (MR, BT, Röntgen kategorileri, email/Slack bildirimleri, lead scoring).
