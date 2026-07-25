# CP-015 — Anasayfa Hibrit Redesign: Agent Promptları

Bağlam: `AGENT_PROMPTS.md`'deki CP-005–012 zaten uygulandı (bkz. PROGRESS.md).
Mevcut kod tabanında `ProductCard`, `SpecTable`, teal/amber DESIGN.md tokenleri ve
hero'daki tarama-konisi/HUD bileşeni zaten var. Bu 5 alt-checkpoint, Ever Vessel +
Shared Wines + Switch Nails + Koox sentezinden çıkan yapısal eklemeleri, MEVCUT
görsel kimliği bozmadan koda döküyor. Her birini sırayla ver, aralarında build'in
kırılmadığını doğrulat.

---

## CP-015-A — "Yeni Eklenen Cihazlar" Şeridi

```
Bağlam: Next.js 14 + Prisma + PostgreSQL. `products` tablosunda `createdAt` alanı zaten
var (yoksa migration ile ekle). Mevcut DESIGN.md tokenlerini (teal #0E7C74, amber
#D97B29, Space Grotesk, IBM Plex Mono/Sans) kullan — yeni renk EKLEME.

GÖREV:
1. Yeni bir server component yaz: `components/NewArrivalsStrip.tsx`
   - `products` tablosundan `createdAt DESC` sıralı, en fazla 10 kayıt çek
   - Yatay scroll container: masaüstünde ok butonlu (sol/sağ), mobilde native
     touch-swipe (scroll-snap-x kullan, JS gerekmez)
2. Her kart: ürün görseli (16:9 veya kare, mevcut ProductCard'ın görsel oranına uy),
   marka/model, tek satır teknik özet (örn: "4D volumetrik prob · elastografi"),
   ve sağ üstte küçük bir "eklendi: {X} gün önce" etiketi (amber-faint arkaplan,
   mevcut `.eyebrow` stilini referans al)
3. Şerit başlığı: "Yeni Eklenen Cihazlar" (Space Grotesk H2) + alt yazı: "Kataloğumuza
   son eklenen sistemler" (ink-soft renk)
4. Sağ üstte "Tüm Kataloğu Gör →" linki, `/urunler/ultrason`'a gider
5. Bu bileşeni anasayfada hero'nun HEMEN ALTINA, marka portföyünden ÖNCE yerleştir

KABUL KRİTERLERİ:
- 10'dan az ürün olsa bile layout kırılmamalı (örn. 3 ürün varsa scroll gerekmemeli,
  sola yaslanmalı)
- Mobilde swipe ile kaydırılabilmeli, masaüstünde ok butonları görünür olmalı
- Ürün yoksa (boş DB durumu) bileşen sessizce render edilmemeli (null döndür)

Bittiğinde: dosya yollarını ve kaç üründe test ettiğini raporla.
```

---

## CP-015-B — "Önce/Sonra" Karşılaştırma Teaser Bloğu

```
Bağlam: `/karsilastir` aracı zaten çalışıyor (CP-008). Bu, anasayfada o araca giden
bir teaser/vitrin bloğu — kendisi fonksiyonel bir karşılaştırma yapmıyor, sadece
değer önerisini görsel olarak anlatıyor.

GÖREV:
1. Yeni component: `components/BeforeAfterTeaser.tsx`
2. İki kolonlu (masaüstünde 50/50, mobilde alt alta) statik bir karşılaştırma:
   - SOL KART, başlık "Pazarlama Broşürü" (ink-soft, küçük, biraz "silik" hissettir):
     İçinde JENERİK/KURGUSAL bir üretici pazarlama cümlesi — GERÇEK bir üreticiden
     alıntı YAPMA, uydur ama gerçekçi bir örnek yaz (örn: "Üstün görüntü kalitesi ve
     sezgisel arayüzle klinik iş akışınızı dönüştürün.") — belirsiz, sayısız,
     pazarlama klişesi dolu olsun, bu BİLEREK böyle.
   - SAĞ KART, başlık "leadUsg Analizi" (teal vurgulu, öne çıkan): Aynı (kurgusal)
     cihazın SpecTable bileşenini kullanarak somut sayılarla dolu bir tablo —
     frame rate, prob sayısı, elastografi tipi gibi gerçek ölçülebilir alanlar
   - Ortada veya altta küçük bir "→" veya "vs" ayracı
3. Alt satırda tek CTA: "Kendi Karşılaştırmanı Yap →" → `/karsilastir`'a gider
4. Bu bloğu marka portföyü ile klinik uzmanlık alanları arasına yerleştir

KABUL KRİTERLERİ:
- Sol karttaki metnin gerçek hiçbir üretici/marka adı içermediğini kontrol et
  (telif + yanlış atıf riski)
- Sağ kart SpecTable'ın MEVCUT komponentini yeniden kullanmalı, yeni bir tablo
  komponenti yazma

Bittiğinde: kurgusal örnek metni ve hangi SpecTable prop'larını kullandığını raporla.
```

---

## CP-015-C — Sayısal Güven Şeridi

```
Bağlam: Anasayfada hero altında zaten "12+ Premium Sistem / 06 Global Üretici /
%100 Bağımsız Veri" gibi ayrı ayrı sayılar var (mevcut kodda ara). Bunları TEK bir
şeritte birleştirip Koox'un "100%/0%" çarpıcılığındaki formata çek.

GÖREV:
1. Mevcut istatistik gösterimini bul (muhtemelen hero içinde veya hemen altında)
   ve `components/TrustStatsBar.tsx` adında ayrı, yeniden kullanılabilir bir
   component'e çıkar
2. 4 sayı, tek yatay şerit, aralarında dikey ince ayraç (mevcut `--border` rengi):
   `%100 Bağımsız Veri` · `0₺ Gizli Komisyon` · `12+ Premium Sistem` · `06 Global Üretici`
3. Sayılar IBM Plex Mono, büyük (24-28px), teal-dark renk; etiketler küçük,
   ink-soft renk (mevcut `.stat-num`/`.stat-label` stiline bak, aynısını kullan)
4. Bu şeridi marka portföyü ile CP-015-B'deki "Önce/Sonra" bloğu arasına yerleştir

KABUL KRİTERLERİ:
- Mobilde 4 sayı 2x2 grid'e düşebilir, masaüstünde tek satır
- Sayılar DB'den mi geliyor yoksa sabit mi (hardcoded) — hangisini seçtiysen belirt;
  eğer gerçek ürün/üretici sayısına bağlıysa (12+, 06 gibi) bunları products
  tablosundan COUNT ile hesapla, elle yazma

Bittiğinde: sayıların dinamik mi statik mi olduğunu ve neden öyle seçtiğini raporla.
```

---

## CP-015-D — Video-Önizlemeli Ürün Kartları (Opsiyonel Prop)

```
Bağlam: Mevcut `ProductCard` component'i var (CP-006/007'de yazıldı). Bu checkpoint
ona OPSİYONEL video desteği ekliyor, mevcut davranışı BOZMUYOR.

GÖREV:
1. `ProductCard` props'una opsiyonel `previewVideoUrl?: string` ekle
2. Eğer `previewVideoUrl` varsa: masaüstünde kart hover edildiğinde (`onMouseEnter`),
   mobilde kart viewport'a girdiğinde (IntersectionObserver ile) sessiz, loop,
   muted, 3-6 saniyelik video otomatik oynasın (`<video autoplay muted loop playsinline>`)
3. Eğer `previewVideoUrl` YOKSA: component mevcut statik görsel davranışına aynen
   devam etsin — bu prop'un olmaması hiçbir şeyi kırmamalı (graceful fallback)
4. Video kaynağı için: `products` tablosuna opsiyonel `previewVideoUrl` kolonu ekle
   (nullable), CDN/storage detayını sen seç (Cloudflare R2, S3 vb — env'den okunacak)

ÖNEMLİ KISIT: Bu checkpoint'te GERÇEK bir video dosyası YÜKLEMEYECEKSİN, sadece
altyapıyı kur. Video içeriği (gerçek cihaz demo klipleri) Özün tarafından ayrıca
sağlanacak — sen sadece `previewVideoUrl` null olduğunda düzgün fallback eden,
dolu olduğunda düzgün oynayan component'i yaz.

KABUL KRİTERLERİ:
- `previewVideoUrl` olmayan mevcut ürünlerde site AYNEN eskisi gibi çalışmalı
  (regresyon testi: CP-006'daki ürün listeleme testini tekrar çalıştır)
- Video autoplay tarayıcı politikalarına uygun olmalı (muted + playsinline şart,
  yoksa mobil tarayıcılar engeller)

Bittiğinde: migration dosyasını ve regresyon testinin sonucunu raporla.
```

---

## CP-015-E — Güven Rozeti Şeridi

```
Bağlam: Footer'dan hemen önce, ince bir güven şeridi ekleniyor.

GÖREV:
1. `components/TrustBadgeStrip.tsx` — 3 rozet, yatay, ortalı:
   "TİTUBB Kayıtlı Üreticiler" · "Yetkili Servis Garantili" · "KVKK Uyumlu Veri Politikası"
2. Her rozet: küçük monokrom ikon (lucide-react'tan uygun bir ikon seç, örn. shield-check,
   badge-check) + kısa etiket, `--ink-soft` renk, abartısız — Ever Vessel'ın ödül
   rozeti bölümündeki gibi sade, Koox/Switch Nails'teki gibi büyük/renkli değil
3. Bu şeridi footer'ın hemen üstüne yerleştir

ÖNEMLİ: Bu rozetler GERÇEK bir sertifikayı temsil ediyorsa (TİTUBB kaydı gerçekten
varsa) sorun yok; gerçekte henüz alınmamış bir sertifikayı varmış gibi göstermek
YANILTICI REKLAM riski taşır. Özün'e bu 3 rozetin hangilerinin gerçekten mevcut
olduğunu sor, sadece gerçek olanları yayınla.

KABUL KRİTERLERİ:
- Rozetler tıklanabilir olmasa da en azından `title` attribute ile ne anlama
  geldiğini açıklamalı (accessibility + şeffaflık)
```

---

## Uygulama sırası önerisi
A → C → B → D → E (önce görünürlük/trafik odaklı olanlar, sonra derinlik/detay
gerektirenler, en sona altyapı gerektiren video desteği ve rozet doğrulaması).
