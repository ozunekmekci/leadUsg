# 🚀 leadUsg MVP Lansman Raporu (Faz 1 Tamamlandı)

Medikal Cihaz Broker Platformu (**leadUsg**), Faz 1 MVP kapsamında hedeflenen tüm 14 checkpoint'i eksiksiz tamamlayarak canlıya alınmaya %100 hazır hale getirilmiştir.

---

## 🌟 Platform Mimarisi ve Ana İşlevler

`leadUsg`, Türkiye'deki klinik ve hastaneler için tarafsız medikal görüntüleme cihazı karşılaştırma imkanı sunarken, arka planda KVKK uyumlu consent-gated davranışsal veri toplayan ve Account Manager (AM) ekibine zenginleştirilmiş **Birleşik Lead Kartları** üreten modern bir B2B brokerlik platformudur.

```mermaid
graph TD
    User[Ziyaretçi / Hekim] -->|1. Gezinme & Karşılaştırma| NextFrontend[Next.js 14 App Router]
    NextFrontend -->|2. Rıza Onayı "analytics"| ConsentSDK[Client Tracking SDK lib/tracking.ts]
    ConsentSDK -->|3. Batch Events POST /api/events| EventAPI[API Route Handler]
    EventAPI -->|4. PostgreSQL Persistence| DB[(PostgreSQL Database)]
    User -->|5. Teklif Al Formu| ProposalForm[React Hook Form + Zod]
    ProposalForm -->|6. POST /api/leads & Consent "full"| LeadAPI[Lead API & Webhook Dispatcher]
    LeadAPI --> DB
    AM[Account Manager] -->|7. HTTP-Only Auth & Dashboard| AMAdmin[/admin/leads Admin Panel]
    AMAdmin -->|8. Statü Değişimi & Notlar| StateMachine[AM State Machine Validation API]
```

---

## 📊 Tamamlanan Faz 1 Checkpoint Özetleri

| Checkpoint | Tanım | Çıktı / Durum |
|---|---|---|
| **CP-001** | Proje Başlangıcı & İş Modeli | Moving Broker iş modeli, SWOT analizi & gelir modeli sıralaması kararlaştırıldı. |
| **CP-002** | Sistem Mimarisi & Veri Modeli | Next.js 14, Tailwind, Prisma, PostgreSQL, Redis ve `sessions.consent_status` mimarisi kuruldu. |
| **CP-003 & CP-004** | State Machine & MVP Kapsamı | Lead Geldi &rarr; Arandı &rarr; Sıcak/Soğuk &rarr; Satış/Kapalı AM akışı ve rotalar belirlendi. |
| **CP-005** | Next.js App Router Scaffold | Proje iskeleti, layout'lar, Prisma modelleri ve Redis entegrasyonu oluşturuldu. |
| **CP-006** | Ürün Listeleme Katalog Sayfası | `/urunler/ultrason` kataloğu, dinamik marka/bütçe filtreleme ve 8 telifsiz cihaz seed edildi. |
| **CP-007** | Ürün Detay Sayfası & SpecTable | Dinamik slug route'ları, modüler biyomedikal `<SpecTable />` ve Google `@google/design.md` token'ları yazıldı. |
| **CP-008** | Yan Yana Karşılaştırma Modülü | `/karsilastir?ids=1,2,3` 2-4 cihaz yan yana fark vurgulamalı karşılaştırma matrisi kuruldu. |
| **CP-009** | Consent-Gated Event Tracking | KVKK uyumlu rıza banner'ı, anonim canvas parmak izi, PII maskeleme ve `/api/events` kuruldu. |
| **CP-010** | Teklif Al Formu & Lead Kaydı | React Hook Form + Zod doğrulaması, Redis 3 req/min spam koruması ve consent upgrade yapıldı. |
| **CP-011** | AM Admin Panel & Auth | Edge-compatible JWT auth, HTTP-Only cookies, korumalı `/admin/leads` ve server-side state machine yazıldı. |
| **CP-012** | Birleşik Lead Detay Kartı | Form + Davranışsal zaman çizelgesi, ürün adı çözümleme ve Optimistic UI destekli AM not modülü tamamlandı. |
| **CP-013** | Entegrasyon Testleri & Deployment | `/api/health` endpoint'i, 8/8 yeşil geçen E2E entegrasyon betiği, Multi-stage `Dockerfile` ve `docker-compose.yml` eklendi. |
| **CP-014** | MVP Lansmanı | Final üretim derlemesi doğrulaması, lansman dokümantasyonu ve MVP kapaması yapıldı. |

---

## 🔒 Güvenlik, Privacy ve KVKK Garantileri

> [!IMPORTANT]
> **Consent Architecture:**
> Ziyaretçi rıza banner'ında açık onay vermeden önce **HİÇBİR** cihaz parmak izi, cookie veya localStorage ID'si oluşturulmaz. Onay reddedildiğinde davranışsal event fırlatılmaz. Teklif formu doldurulduğunda oturum rıza seviyesi `full` aşamasına yükseltilir.

> [!TIP]
> **PII Maskeleme & Anti-Spam:**
> IP adresleri ve parmak izi verileri loglarda `192.168.1.***` veya SHA-256 hash prefix ile saklanır. Redis rate limiter ile `/api/events` (60 req/min) ve `/api/leads` (3 req/min) endpoint'leri korunur.

---

## 🛠️ Canlıya Alma ve Çalıştırma Rehberi

### 1. Yerel Geliştirme (Local Dev)
```bash
# Bağımlılıkları yükleyin
npm install

# PostgreSQL & Redis bağlantılarını .env dosyasına ekleyin ve seed çalıştırın
npx prisma db seed

# Geliştirici sunucusunu başlatın
npm run dev
```

### 2. Docker Compose ile Canlı Deployment (Production VPS)
```bash
# Tüm servisleri (Web, PostgreSQL 16, Redis 7) arka planda başlatın
docker-compose up -d --build

# Sistem canlılık durumunu doğrulayın
curl http://localhost:3000/api/health
```

### 3. Entegrasyon Testlerini Çalıştırma
```bash
npx tsx scripts/integration_test.ts
```
