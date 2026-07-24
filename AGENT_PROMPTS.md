# AGENT_PROMPTS.md — Medikal Cihaz Broker Platformu

Bu dosyadaki her bölüm, bir kodlama agent'ına (Claude Code, OpenCode vb.) olduğu gibi
kopyalanıp verilebilecek şekilde yazıldı. Her prompt kendi bağlamını taşır — agent'ın
önceki konuşmayı hatırlamasına gerek yoktur.

Sıra: CP-005 → CP-006 → CP-007 → CP-008 → CP-009 → CP-010 → CP-011 → CP-012.
Her checkpoint bitince agent'tan kısa bir özet + değişen dosya listesi iste, sonra
sıradakine geç.

---

## CP-005 — Next.js Scaffold

```
Sen bir full-stack Next.js developer'sın. "Medikal Cihaz Broker Platformu" adlı bir
B2B lead-gen sitesinin iskeletini kuruyorsun.

TECH STACK (kesin, değiştirme):
- Next.js 14, App Router
- TypeScript
- Tailwind CSS + shadcn/ui
- PostgreSQL (Prisma ORM kullan)
- Redis (ioredis client)

GÖREV:
1. Next.js projesini App Router ile başlat.
2. Şu route yapısını kur (henüz içerik dolu olmasın, sadece placeholder sayfalar):
   /                          → landing
   /urunler/[kategori]        → kategori bazlı ürün listesi (örn: /urunler/ultrason)
   /urunler/[kategori]/[slug] → ürün detay
   /karsilastir               → karşılaştırma sayfası (?ids=1,2,3 query param ile)
   /teklif-al                 → CTA sonrası form (aslında modal olabilir, ayrı route da olur)
   /admin                     → AM login (route group: (admin), middleware ile korunan)
   /admin/leads               → lead listesi
   /admin/leads/[id]          → lead detay kartı
3. Prisma şemasını başlat, şu tabloları tanımla (alan tiplerini sen belirle, mantıklı
   defaultlar kullan): products, sessions, events, leads, lead_notes, am_users.
   events tablosunu created_at üzerinden aylık partition'a uygun tasarla (Prisma native
   partition desteklemiyor, o yüzden migration'ı raw SQL ile yazman gerekebilir — bunu
   TODO olarak işaretle, CP-009'da detaylandıracağız).
4. .env.example dosyası oluştur: DATABASE_URL, REDIS_URL, SESSION_SECRET.
5. Temel layout: header (logo + kategori nav), footer. Tasarım şimdilik minimal olsun,
   görsel detaylandırmayı sonraki checkpoint'lerde yapacağız.

KABUL KRİTERLERİ:
- `npm run build` hatasız geçmeli.
- Tüm route'lar 404 vermeden render olmalı (placeholder içerik yeterli).
- Prisma migrate dev çalışmalı.

Bittiğinde: değiştirdiğin/oluşturduğun dosyaların listesini ve kısa bir özet ver.
```

---

## CP-006 — Ürün Listeleme Sayfası (Ultrason Kategorisi)

```
Bağlam: Next.js 14 + Prisma + PostgreSQL scaffold'u zaten kurulu (products tablosu var).

GÖREV:
1. /urunler/ultrason sayfasını doldur: server component, Prisma ile category="ultrason"
   olan ürünleri çek.
2. Ürün kartı komponenti: görsel, marka, model adı, kısa özellik özeti (2-3 madde),
   "Karşılaştırmaya Ekle" checkbox/buton, "Detay" linki.
3. Filtreleme: marka (checkbox grubu) ve fiyat aralığı (slider veya select) — client-side
   state, URL query param'a yansısın (paylaşılabilir link olsun: ?brand=GE&budget=2-3M).
4. Seed script yaz (prisma/seed.ts): en az 8 gerçekçi ama telif riski taşımayan ultrason
   cihazı verisi. ÖNEMLİ: üretici web sitelerinden pazarlama metnini kopyalama — spec
   tablosu (ölçülebilir teknik değerler: ekran boyutu, prob sayısı, portatiflik vb.) telif
   sorunu yaratmaz, ama açıklama metinlerini kendi cümlelerinle yaz.
5. Boş state (filtre sonucu 0 ürün): kullanıcı dostu bir mesaj.

KABUL KRİTERLERİ:
- Filtre değiştiğinde sayfa yeniden yüklenmeden liste güncellenmeli.
- Seed script çalıştırıldığında en az 8 ürün DB'de olmalı.
- Mobilde (375px) kart grid'i tek sütuna düşmeli.

Bittiğinde: değiştirdiğin dosyaları ve seed'lediğin ürün sayısını raporla.
```

---

## CP-007 — Ürün Detay Sayfası + Spec Tablosu

```
Bağlam: Ürün listeleme sayfası hazır, products tablosu dolu.

GÖREV:
1. /urunler/[kategori]/[slug] sayfasını doldur: ürün görselleri (galeri, en az 2 görsel
   slotu), başlık, marka, kısa açıklama.
2. Yeniden kullanılabilir bir <SpecTable /> komponenti yaz — bu komponent CP-008'de
   karşılaştırma sayfasında da kullanılacak, o yüzden props'unu şimdiden esnek tasarla:
   ürün(ler) array olarak alabilmeli (tek ürün detayda, çoklu ürün karşılaştırmada).
3. Sayfada iki CTA: "Karşılaştırmaya Ekle" ve "Teklif Al" (öne çıkan, sabit pozisyonlu
   olabilir — sticky button).
4. related products: aynı kategoriden 3 ürün önerisi (basit query, aynı category, farklı
   id, limit 3).

KABUL KRİTERLERİ:
- Olmayan bir slug için 404 (Next.js notFound()).
- SpecTable komponenti hem [ürün] hem [ürün, ürün, ürün] input'uyla test edilmiş olmalı.

Bittiğinde: SpecTable'ın prop tipini ve dosya yollarını raporla.
```

---

## CP-008 — Karşılaştırma Modülü

```
Bağlam: SpecTable komponenti CP-007'de yeniden kullanılabilir şekilde yazıldı.

GÖREV:
1. /karsilastir?ids=1,2,3 sayfası: query param'daki id'lere göre ürünleri çek (2-4 ürün
   arası, fazlasını kes ve kullanıcıya "en fazla 4 ürün" uyarısı ver).
2. SpecTable'ı çoklu-ürün modunda kullan, yan yana kolonlar. Farklı olan satırları
   vurgula (örn: subtle background renk farkı) — kullanıcı hangi speclerin farklı
   olduğunu bir bakışta görebilmeli.
3. Bu sayfaya girişte ve çıkışta iki event fırlatılacak: compare_start / compare_end
   (süre farkı = karşılaştırmada geçirilen zaman). Event gönderme kodunu şimdilik bir
   stub fonksiyon olarak yaz (trackEvent(name, metadata)) — gerçek implementasyonu
   CP-009'da yapacağız, şimdiden yanlış bir tracking mimarisi kurma.
4. Sayfanın altında "Teklif Al" CTA'sı, seçili ürünlerin id'lerini forma taşısın.

KABUL KRİTERLERİ:
- 2, 3 ve 4 ürünle test edilmiş olmalı, layout kırılmamalı.
- 1 veya 0 ürün id'si verilirse kullanıcıyı /urunler'e yönlendiren bir fallback olmalı.

Bittiğinde: trackEvent stub'ının imzasını ve nerede çağrıldığını raporla.
```

---

## CP-009 — Event Tracking Altyapısı (Consent-Gated) — KRİTİK

```
Bağlam: CP-002'de mimari karar olarak sessions.consent_status alanı üç kademeli
tasarlandı: "none" / "analytics" / "full". Bu checkpoint'in tamamı bu kararı
implemente etmek için var.

SERT KISIT (bunu atlama, kısaltma, "sonra ekleriz" deme):
- Kullanıcı consent banner'ında AÇIKÇA onay vermeden ÖNCE: fingerprint hash
  üretilmeyecek, cihaz/tarayıcı parmak izi alınmayacak, hiçbir kalıcı kimlik
  (localStorage id, cookie id) yazılmayacak. Bu aşamada SADECE anonim, tekil,
  kimliksiz bir sayfa-görüntüleme sayacı çalışabilir (session'sız aggregate count).
- Consent banner'ı ilk ziyarette gösterilecek, "Kabul Et" ve "Sadece Gerekli" (reddet)
  seçenekleri net ve eşit görünürlükte olacak (biri büyük buton biri küçük link gibi
  dark-pattern yapma — ikisi de aynı boyutta buton olsun).
- Kullanıcı "Kabul Et" derse: consent_status "analytics" olur, fingerprint hash
  üretilir (basit bir client-side hash: canvas+userAgent+screen — üçüncü parti
  fingerprint.js kullanmak istersen kullanabilirsin), session tablosuna yazılır,
  bundan sonraki tüm event'ler (product_view, compare_start/end, filter_applied,
  cta_click, spec_hover, scroll_depth) toplanır.
- Kullanıcı form doldurup submit ederse (CP-010'da işlenecek): consent_status "full"
  olur — bu zaten kullanıcının kendi rızasıyla iletişim bilgisi verdiği an.
- "Reddet" derse: consent_status "none" kalır, hiçbir davranışsal event toplanmaz,
  site normal çalışmaya devam eder (consent vermemek kullanıcı deneyimini bozmamalı).

TEKNİK GÖREV:
1. Client-side event SDK yaz (lib/tracking.ts): trackEvent(name, metadata) fonksiyonu,
   consent_status'u kontrol eder, izin yoksa no-op, izin varsa event'i bir buffer'a
   ekler, her 5 saniyede bir veya sayfa kapanırken (navigator.sendBeacon) backend'e
   batch gönderir.
2. Backend endpoint: POST /api/events — payload'ı zod ile validate et, Redis üzerinden
   IP başına rate limit uygula (örn: dakikada 60 event), events tablosuna yaz.
3. Consent banner komponenti: iki eşit buton, localStorage'da tercihi sakla, tercih
   varsa banner tekrar gösterilmesin.
4. CP-008'deki trackEvent stub'ını bu gerçek implementasyonla değiştir.
5. Structured logging ekle (pino veya benzeri) — ama loglarda PII (ip, fingerprint
   hash) plaintext yazma, hash'lenmiş/kısaltılmış halini logla.

KABUL KRİTERLERİ:
- Consent reddedilmişken network tab'de hiçbir /api/events çağrısı (aggregate
  pageview hariç) görünmemeli — bunu manuel test et ve sonucu raporla.
- Consent kabul edildikten sonra ürün sayfasında gezinip event'lerin DB'ye düştüğünü
  doğrula (SQL sorgusuyla göster).

Bittiğinde: yukarıdaki iki kabul kriterini nasıl test ettiğini ve sonucunu raporla.
```

---

## CP-010 — "Teklif Al" Formu + Lead Kaydı

```
Bağlam: Event tracking altyapısı hazır, sessions tablosu consent_status ile çalışıyor.

GÖREV:
1. Teklif Al formu: zorunlu alanlar minimumda tutulsun (ad soyad, kurum, telefon),
   opsiyonel (email, bütçe aralığı, mesaj). React Hook Form + zod validation.
2. POST /api/leads endpoint: mevcut session_id ile eşleştir (yoksa yeni session
   oluştur), leads tablosuna yaz, sessions.consent_status = "full" yap.
3. Form submit sonrası kullanıcıya kısa bir teşekkür/onay ekranı (yönlendirme değil,
   kullanıcıyı sitede tutmak için aynı sayfada state değişimi yeterli).
4. AM'e bildirim: MVP'de basit bir email (nodemailer) veya webhook (n8n'e post) yeterli
   — hangisini istersen seç, ama hangisini seçtiğini ve neden seçtiğini raporda belirt.
5. Server-side: telefon/email formatı validate et, spam koruması için Redis rate limit
   (aynı IP'den dakikada max 3 form submit).

KABUL KRİTERLERİ:
- Geçersiz telefon/email formatıyla submit denemesi server-side reddedilmeli (client
  validation bypass edilse bile).
- Aynı session iki kez form doldurursa (örn. kullanıcı sayfayı yenileyip tekrar
  gönderirse) leads tablosunda duplicate değil, update olmalı.

Bittiğinde: bildirim mekanizması seçimini ve test sonuçlarını raporla.
```

---

## CP-011 — Account Manager Admin Panel (Auth + Lead Listesi)

```
Bağlam: leads tablosu dolmaya başladı, am_users tablosu var ama boş.

GÖREV:
1. /admin altına basit credentials-based auth (NextAuth veya kendi JWT implementasyonun
   — hangisini seçersen seç, ama session cookie httpOnly + secure olmalı).
2. Seed: bir tane AM kullanıcısı oluştur (email/password .env'den okunsun, hardcode etme).
3. /admin/leads: lead listesi tablosu — kolon: kurum/isim, statü (CP-003'teki AM state
   machine'inden: Lead Geldi / Arandı / Sıcak / Soğuk / Satış / Kapalı), son aktivite
   tarihi, oluşturulma tarihi. Statüye göre filtre, tarihe göre sırala.
4. Statü değiştirme: dropdown veya buton grubu, CP-003'teki geçişlere uygun (örn.
   "Lead Geldi" durumundaki bir lead direkt "Satış"a atlayamaz, önce "Arandı"dan
   geçmeli — bu iş kuralını backend'de de doğrula, sadece UI'da kısıtlama yapma).

KABUL KRİTERLERİ:
- Login olmadan /admin/leads'e gidildiğinde login sayfasına yönlendirilmeli.
- Geçersiz bir statü geçişi (örn. Lead Geldi → Satış) API seviyesinde reddedilmeli.

Bittiğinde: auth çözümünü ve state geçiş validasyonunun nerede yazıldığını raporla.
```

---

## CP-012 — Lead Detay Kartı

```
Bağlam: Bu checkpoint, projenin en değerli çıktısı olan "birleşik lead kartı"nı
oluşturuyor — orijinal spesifikasyondaki örnek: "XYZ Kadın Doğum Kliniği | Dr. Ahmet |
GE Logiq E10 ile Samsung Hera W9 karşılaştırdı | Bütçe: 2-3M | 3 ziyaret, son 7 gün".

GÖREV:
1. /admin/leads/[id]: form verisi (isim, kurum, telefon, bütçe) üstte, altında o
   session'a (ve varsa merged_into ile birleşmiş diğer session'lara) ait event
   timeline'ı kronolojik sırayla.
2. Timeline'da özellikle vurgulanacak event'ler: hangi ürünleri karşılaştırdı (compare
   event'lerinden ürün id'lerini çözüp isim göster), toplam kaç ziyaret, ilk/son
   ziyaret tarihi arası gün farkı.
3. AM'nin not ekleyebileceği bir alan (lead_notes tablosuna yazar), not geçmişi altta
   listelensin.
4. Statü değiştirme butonu bu sayfada da olsun (CP-011'deki aynı validasyon kuralları
   geçerli).

KABUL KRİTERLERİ:
- Aynı kişinin farklı IP/cihazdan gelmiş ama merge edilmiş session'ları varsa, bunların
  event'leri tek bir timeline'da birleşik gösterilmeli.
- Not ekleme işlemi optimistic UI ile anlık görünsün, ama sunucu hatası durumunda
  kullanıcıya bildirim ver ve geri al.

Bittiğinde: timeline component'inin nasıl event'leri gruplayıp sıraladığını kısaca
anlat.
```
