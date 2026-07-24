# 🏥 leadUsg — Medikal Cihaz Broker Platformu

**leadUsg**, Türkiye'deki klinik ve hastaneler için medikal görüntüleme cihazlarının (ultrason, MR, BT, röntgen) şeffaf karşılaştırılmasını sağlayan, arka planda KVKK uyumlu consent-gated davranışsal veri toplayarak Account Manager ekibine zenginleştirilmiş **Birleşik Lead Kartları** sunan B2B medikal cihaz brokerlik platformudur.

---

## 🛠️ Teknolojiler (Tech Stack)

- **Frontend & Server Components:** Next.js 14 (App Router, TypeScript)
- **Styling & UI:** Tailwind CSS, shadcn/ui ilhamlı modern B2B karanlık tema
- **Veritabanı & ORM:** PostgreSQL (Prisma ORM)
- **Önbellek & Rate Limiter:** Redis (ioredis)
- **Form & Validasyon:** React Hook Form + Zod
- **Kimlik Doğrulama:** Edge-compatible Web Crypto JWT & HTTP-Only Cookie (`am_session`)
- **Deployment:** Docker & Docker Compose (Multi-stage production build)

---

## 🌟 Ana Özellikler & Modüller

1. **Cihaz Kataloğu (`/urunler/ultrason`):**
   - Marka ve bütçe segmentine göre anlık URL paylaşılabilir filtreleme.
   - Detaylı biyomedikal parametre kartları.

2. **Yan Yana Karşılaştırma Modülü (`/karsilastir?ids=1,2,3`):**
   - 2 ila 4 cihaz yan yana fark vurgulamalı `<SpecTable />` karşılaştırma matrisi.

3. **Consent-Gated Davranışsal Tracking (`lib/tracking.ts` & `ConsentBanner`):**
   - KVKK ve rıza mimarisine tam uyum: Açık onay vermeden önce hiçbir cihaz parmak izi, çerez veya localStorage ID'si üretilmez.
   - İzin sonrasında 5 saniyede bir veya sayfa kapatılırken batch event gönderimi.

4. **Teklif Al Formu (`/teklif-al`):**
   - İstemci ve sunucu tarafı Zod validasyonu, Redis spam koruması (3 req/min) ve otomatik rıza seviyesi yükseltmesi (`consent_status = "full"`).

5. **Account Manager Admin Paneli (`/admin/leads`):**
   - Şifreli AM girişi, canlı istatistik özet kartları, arama/filtreleme ve sunucu doğrulamalı AM State Machine (`Lead Geldi` &rarr; `Arandı` &rarr; `Sıcak` &rarr; `Satış`).

6. **Birleşik Lead Detay Kartı (`/admin/leads/[id]`):**
   - Müşteri iletişim bilgileri, rıza durumuna göre birleştirilmiş oturumların kronolojik zaman çizelgesi, ürün adı çözümlemesi ve Optimistic UI destekli AM not modülü.

---

## 🚀 Hızlı Başlangıç (Local Development)

### 1. Projeyi Klonlayın ve Bağımlılıkları Yükleyin
```bash
cd leadUsg
npm install
```

### 2. Ortam Değişkenlerini Ayarlayın
`.env.example` dosyasını `.env` olarak kopyalayın:
```bash
cp .env.example .env
```

### 3. Veritabanı Seed ve Geliştirici Sunucusu
```bash
# Veritabanını tohumlayın (Ultrason cihazları + varsayılan AM kullanıcısı)
npx prisma db seed

# Geliştirici sunucusunu başlatın
npm run dev
```
Uygulamaya [http://localhost:3000](http://localhost:3000) adresinden erişebilirsiniz.

- **AM Kullanıcı Girişi:** `admin@leadusg.com`
- **AM Şifresi:** `LeadUsg2026!`

---

## 🐳 Docker ile Prodüksiyon Deployment (VPS)

Platform; Next.js uygulaması, PostgreSQL 16 ve Redis 7 servislerini içeren Docker Compose yapılandırmasına sahiptir.

```bash
# Servisleri oluşturup arka planda başlatın
docker-compose up -d --build

# Sistem sağlık kontrolü yapın
curl http://localhost:3000/api/health
```

---

## 🧪 Entegrasyon Testlerini Çalıştırma

8 halkalı uçtan uca entegrasyon test paketini çalıştırmak için:

```bash
npx tsx scripts/integration_test.ts
```

---

## 📡 API Endpoint'leri Referansı

- `POST /api/events` — Davranışsal olayların batch gönderimi (Redis rate limit: 60/min).
- `POST /api/leads` — Teklif formu gönderimi (Redis rate limit: 3/min).
- `POST /api/admin/login` — AM kullanıcı girişi.
- `POST /api/admin/logout` — AM oturum kapatma.
- `GET /api/admin/leads` — Korumalı AM lead listesi sorgulama ve filtreleme.
- `GET /api/admin/leads/[id]` — Birleşik lead kartı ve zaman çizelgesi verileri.
- `PATCH /api/admin/leads/[id]/status` — AM State Machine statü güncellemesi.
- `POST /api/admin/leads/[id]/notes` — AM not ekleme.
- `GET /api/health` — PostgreSQL ve Redis servis canlılık kontrolü.
