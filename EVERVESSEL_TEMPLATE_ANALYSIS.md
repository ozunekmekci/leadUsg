# EVERVESSEL TEMPLATE & DESIGN SYSTEM ANALYSIS
**Kaynak:** [evervessel.com](https://evervessel.com/)  
**Hedef Proje:** `leadUsg` (Medikal Cihaz Broker Platformu)  
**Analiz Tarihi:** Temmuz 2026 (Nuxt.js + Tailwind CSS + Custom Serif/Sans Typography Deconstruct edilmiş Hali)

---

## 1. Tasarım Felsefesi ve Görsel Kimlik Özeti

EverVessel, **Premium DTC (Direct-To-Consumer)** e-ticaret sitelerinin günümüzdeki en rafine örneklerinden biridir. Marka tasarım dili şu temel ilkelere dayanır:

1. **Tipografik Kontrast (Serif + Sans-Serif İkilisi):**
   - Başlıklarda ve H2 başlıklarında **Serif (PT Serif / Source Serif 4)** kullanarak editoryal, lüks, güven veren ve "dergi kalitesinde" bir his yaratır.
   - UI ögeleri, butonlar, ürün isimleri ve gövde metinlerinde **Sans-Serif (Lato)** kullanarak yüksek okunabilirlik ve modern bir dijital arayüz sunar.
2. **Disiplinli İçerik Hiyerarşisi (Asla 2 CTA Yok):**
   - Her içerik bloğu tek bir odak noktasına sahiptir: `[KÜÇÜK EYEBROW ETİKET] -> [SERİF H2 BAŞLIK] -> [2-3 CÜMLE PARAGRAF] -> [TEK CTA LINK/BUTON]`.
3. **Cömert Boşluk Ritmi (Breathing Space / Nefes Alan Düzen):**
   - Masaüstünde `90px - 120px` arasında değişen dikey dolgu (`py-[90px]`) ile bölümler arası yüksek nefes alanı bırakılır. Bu düzen tasarımı sıkışık MVP görünümünden çıkarıp premium bir seviyeye taşır.
4. **Karma/Nötr Renk Paleti:**
   - Dominant ton koyu lacivert/gri (`#2D3347`), ikincil tonlar pastel slate mavi (`#6A76A0`) ve kiremit/terrakotta vurgu rengi (`#C45A34`).
   - Arka planlar tamamen beyaz değil; yer yer hafif krem/kırık beyaz (`#F8F8F8`, `#F2F2F2`) ile katmanlandırılmıştır.

---

## 2. Eksiksiz Renk Paleti (Color Tokens)

EverVessel'ın CSS kaynak kodlarından doğrudan çıkarılan kesin Hex, RGB ve kullanım alanları:

### Primary & Brand Colors (Ana & Marka Renkleri)
| Token Adı | Hex Kodu | RGB Değeri | Kullanım Alanı |
|---|---|---|---|
| `--color-brand-primary` | `#2D3347` | `rgb(45, 51, 71)` | Ana gövde metinleri, birincil butonlar, koyu kartlar, odak çizgileri (`0 0 0 2px #2D3347`) |
| `--color-brand-accent` | `#C45A34` | `rgb(196, 90, 52)` | Sıcak kiremit/terrakotta vurgu. Rozetler, aktif durumlar, aksiyon bildirimleri |
| `--color-slate-blue-1` | `#6A76A0` | `rgb(106, 118, 160)` | Animasyonlu gradient üst şerit, ikincil vurgu tonları |
| `--color-slate-blue-2` | `#5F6B95` | `rgb(95, 107, 149)` | Gradient ara geçiş tonu |

### Neutral & Text Colors (Metin & Nötr Tonlar)
| Token Adı | Hex Kodu | RGB Değeri | Kullanım Alanı |
|---|---|---|---|
| `--color-text-dark` | `#2E3347` | `rgb(46, 51, 71)` | Yüksek kontrastlı başlıklar |
| `--color-text-body` | `#2B2E2E` | `rgb(43, 46, 46)` | Ana okuma paragrafları |
| `--color-text-muted` | `#757575` | `rgb(117, 117, 117)` | Yardımcı metinler, pasif ikonlar, pasif placeholder |
| `--color-text-subtle` | `#6C6C6C` | `rgb(108, 108, 108)` | Kart alt yazıları, kapasite etiketleri |
| `--color-text-light-gray`| `#9CA3AF` | `rgb(156, 163, 175)`| İkincil eyebrow metinleri (`text-grey-web-300`) |

### Backgrounds & Surfaces (Arka Plan & Katmanlar)
| Token Adı | Hex Kodu | RGB Değeri | Kullanım Alanı |
|---|---|---|---|
| `--color-bg-white` | `#FFFFFF` | `rgb(255, 255, 255)`| Ana sayfa gövdesi, kart arka planları |
| `--color-bg-canvas` | `#F8F8F8` | `rgb(248, 248, 248)`| Alternatif bölüm arka planları (kırık beyaz canvas) |
| `--color-bg-surface-light`| `#F2F2F2` | `rgb(242, 242, 242)`| Ürün kartı arka planı, input içi |
| `--color-bg-surface-soft` | `#EEEEEE` | `rgb(238, 238, 238)`| İkincil butonlar, rozet zeminleri |
| `--color-bg-tint-warm` | `#F7EDED` | `rgb(247, 237, 237)`| Özel ürün/detay vurgu kutusu zemini |

### Border Neutrals (Çerçeve & Sınır Renkleri)
| Token Adı | Hex Kodu | Kullanım Alanı |
|---|---|---|
| `--color-border-subtle` | `#E7E7E7` | İnce ayırıcı çizgiler |
| `--color-border-medium` | `#D9D9D9` | Kart kenarlıkları, input border |
| `--color-border-strong` | `#C5C5C5` | Hover sınır çizgisi (`hover:border-[#C5C5C5]`) |

---

## 3. Tipografi Hiyerarşisi (Typography System)

### Font Aileleri
- **Serif Font (Headings / Editorial):** `PT Serif` veya `Source Serif 4` (Yedek: `serif`)
- **Sans-Serif Font (UI / Body / Controls):** `Lato` (Yedek: `-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif`)

### Responsive Tipografi Ölçeği (CSS Variables)

| Büyüklük Token'ı | Desktop (1280px+) | Tablet (768px-1024px) | Mobile (<768px) | Kullanım Yeri |
|---|---|---|---|---|
| `--text-3xl` | **44px** | 36px | 30px - 34px | Hero H1 Başlığı |
| `--text-2xl` | **32px** | 28px | 24px - 26px | Bölüm H2 Başlıkları |
| `--text-xl` | **30px** | 28px | 22px - 24px | Kart Başlıkları / Vurgulu H3 |
| `--text-lg` | **24px** | 23px | 20px | Mega-menü grup başlıkları, alt başlıklar |
| `--text-md` | **18px** | 17px | 16px | Vurgulu paragraf / Buton metinleri |
| `--text-sm` | **16px** | 15px | 15px | Gövde paragrafı (Body copy) |
| `--text-base` | **14px** | 13px | 13px | Navigasyon elemanları, footer linkleri |
| `--text-xs` | **13px** | 12px | 10px - 12px | Eyebrow etiketler (`uppercase tracking-wider font-bold`) |

---

## 4. Düzen, Izgara ve Boşluk Ritmi (Layout & Spacing Rhythm)

### Container Genişlikleri
- **Full Media Container (Hero/Banner):** `max-w-[2560px]`
- **Main Content Container:** `max-w-[1440px]` veya `max-w-7xl` (1280px)
- **Editorial Text Block Width:** `max-w-[540px]` (Metinlerin çok uzayıp okunabilirliği düşürmesini engeller)

### Dikey Bölüm Boşlukları (Section Vertical Spacing)
- **Masaüstü (Desktop):** `py-[90px]` (veya `py-24` / `90px`)
- **Tablet:** `py-[60px]`
- **Mobil:** `py-10` (40px)
- **Bölüm içi ögeler arası dikey marjin (Element Margin Bottom):**
  - Eyebrow -> H2: `mb-3` (12px)
  - H2 -> Paragraf: `mb-4` (16px) veya `mb-6` (24px)
  - Paragraf -> CTA: `mb-6` (24px) veya `mb-8` (32px)

---

## 5. UI Bileşen Spesifikasyonları (Component Design Specs)

### A. Üst Duyuru Şeridi (Promo Bar)
- **Arka Plan:** Animasyonlu Özel Gradient: `linear-gradient(90deg, #2d3347, #6a76a0, #2d3347, #5f6b95, #2d3347)`
- **Animasyon:** `background-size: 300% 300%`, 6 saniyede bir `infinite ease` yumuşak renk akışı.
- **Tipografi:** `text-xs text-white font-medium tracking-wide uppercase`, merkezlenmiş.

### B. Header & Navigasyon Barı
- **Yükseklik:** Mobil `h-[60px]`, Masaüstü `lg:h-[80px]`
- **Arka Plan & Gölge:** Beyaz (`#FFFFFF`), `shadow-[0_0_20px_9px_rgba(50,50,50,0.1)]`
- **Yerleşim:** 
  - Sol: Kategori linkleri (`Products`, `About`)
  - Orta: Minimalist Marka Logosu
  - Sağ: Para birimi seçici (`USD/AUD/EUR`) + Sepet/Teklif Al ikonu

### C. Editoryal İkili Blok Kalıbı ("Split Section")
- **Yapı:** 50/50 Çift Kolonlu Grid / Flex. Bir tarafta yüksek çözünürlüklü görsel veya klip, diğer tarafta metin kartı.
- **Hiyerarşi:**
  ```html
  <div class="flex flex-col justify-center px-6 lg:px-16">
    <span class="text-xs font-bold uppercase tracking-widest text-[#2D3347] mb-3">
      EYEBROW KATEGORİ ETİKETİ
    </span>
    <h2 class="font-serif text-2xl lg:text-3xl text-[#2D3347] mb-4 leading-tight">
      Editoryal Serif Başlık Buraya Gelir
    </h2>
    <p class="font-sans text-sm lg:text-base text-gray-600 mb-6 leading-relaxed max-w-[500px]">
      Maksimum 2-3 cümlelik net, ikna edici açıklama metni. Gereksiz uzun paragraflardan kaçınılır.
    </p>
    <div>
      <a href="#" class="inline-flex items-center text-xs font-bold uppercase tracking-wider text-[#2D3347] hover:underline">
        Eyleme Çağrı (CTA) Linki →
      </a>
    </div>
  </div>
  ```

### D. Butonlar & Radius Standartları
- **Köşe Yuvarlatma (Border Radius):**
  - **Pill Butonlar (Varsayılan CTA):** `rounded-full` (9999px)
  - **Kartlar & Modallar:** `rounded-[10px]` (10px) veya `rounded-[20px]` (20px)
  - **Mikro Etiketler:** `rounded-sm` (4px)
- **Primary Button Stili:**
  - Arka plan `#2D3347`, Metin `#FFFFFF`, `px-6 py-3.5`, `text-xs font-bold uppercase tracking-wider`, `rounded-full`.
  - Hover: `opacity-90 transition-opacity duration-200`.
- **Secondary / Outline Button Stili:**
  - Arka plan `transparent`, Çerçeve `border border-[#2D3347]`, Metin `#2D3347`, `rounded-full`.
  - Hover: `bg-[#2D3347] text-white transition-colors duration-200`.

### E. Ödül & Güven Rozetleri Bölümü (Award / Trust Badges)
- **Arka Plan:** `#F8F8F8` (Canvas Off-white)
- **Düzen:** Yan yana 3-4 eşit rozet (Örn: "Red Dot Design Award", "FDA/CE Onaylı", "KVKK Uyumlu Güvenli Altyapı").
- **Görsel Dil:** Renkli ve göz yoran logolar yerine monokrom veya koyu gri (`#757575`) minimalist vektor rozetler.

---

## 6. Mikro-Etkileşimler ve Animasyonlar

1. **Top Bar Gradient Animation:**
   ```css
   @keyframes gradient {
     0% { background-position: 0% 50%; }
     50% { background-position: 100% 50%; }
     100% { background-position: 0% 50%; }
   }
   ```
2. **Yumuşak Geçişler (Transitions):**
   - Butonlar ve linkler: `transition-all 0.2s ease-out`
   - Modallar ve Çekmeceler (Cart Drawer): `transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)`
3. **Kart Hover Efekti:**
   - Kartlarda `transform: translateY(-4px)` ve `shadow-[0px_8px_14px_rgba(0,0,0,0.15)]` ile hafif yükselme hissi.

---

## 7. `leadUsg` (Medikal Cihaz Broker Platformu) Şablon Haritası

EverVessel tasarım dilini `leadUsg` Next.js + Tailwind projemize doğrudan uygulayabileceğimiz şablon eşlemesi:

| EverVessel Elemanı | EverVessel Tasarım Kuralı | `leadUsg` Karşılığı / Şablon Kullanımı |
|---|---|---|
| **Header Mega Menü** | Kategori bazlı küçük thumbnail + marka ismi | Ultrason Kategorileri (Kardiology, Kadın Doğum, Radyoloji) + hızlı seçim menüsü |
| **Hero Bölümü** | Büyük Serif Başlık + Sans Subtitle + Tek CTA | `"Türkiye’nin En Şeffaf Medikal Cihaz Broker Platformu."` + Serif H1 + `"Teklif Al / Karşılaştır"` CTA |
| **Ürün Kartı Izgarası** | Minimal kart, tek özellik etiketi, net fiyat | `/urunler/ultrason` kartları: Cihaz Görseli + Marka/Model + Klinik Branş Etiketi + Fiyat Aralığı |
| **"Build Your Bottle" Konfigüratör** | Navigasyonda ve sayfada en belirgin özel CTA | `/karsilastir` Medikal Cihaz Karşılaştırma Aracı (Header'da en belirgin buton) |
| **5'li Editoryal Split Bloklar** | Görsel + Eyebrow + Serif H2 + 2 cümle + CTA | 1. `NEDEN LEADUSG` (Bağımsız broker tarafsızlığı)<br>2. `KLİNİK BRANŞ UYUMU` (Kardiyoloji & Radyoloji özel)<br>3. `AM DANIŞMANLIĞI` (Doğrudan hesap yöneticisi ataması)<br>4. `KVKK & GÜVENLİ VERİ` (Onaylı iletişim süreci) |
| **Ödül Rozetleri** | Monokrom Red Dot / Good Design rozetleri | CE Onaylı, Sağlık Bakanlığı ÜTS Kayıtlı, Yetkili Servis Garantili Rozet Şeridi |
| **Video Interstitial** | Tam genişlik cihaz kullanım klibi | Karşılaştırma aracının veya cihaz incelemesinin 15 saniyelik sessiz demo klibi |

---

## 8. Tailwind CSS Konfigürasyon Taslağı (`tailwind.config.js`)

`leadUsg` projesinde EverVessel temasını aktif etmek için kullanacağımız Tailwind konfigürasyon taslağı:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#2D3347',
          dark: '#2E3347',
          accent: '#C45A34',
        },
        slate: {
          blue: '#6A76A0',
          darkBlue: '#5F6B95',
        },
        surface: {
          canvas: '#F8F8F8',
          light: '#F2F2F2',
          soft: '#EEEEEE',
          warm: '#F7EDED',
        },
        border: {
          subtle: '#E7E7E7',
          medium: '#D9D9D9',
          strong: '#C5C5C5',
        }
      },
      fontFamily: {
        serif: ['"PT Serif"', '"Source Serif 4"', 'serif'],
        sans: ['Lato', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      fontSize: {
        '3xl': ['var(--text-3xl, 44px)', { lineHeight: '1.15' }],
        '2xl': ['var(--text-2xl, 32px)', { lineHeight: '1.2' }],
        'xl': ['var(--text-xl, 30px)', { lineHeight: '1.25' }],
        'lg': ['var(--text-lg, 24px)', { lineHeight: '1.3' }],
        'md': ['var(--text-md, 18px)', { lineHeight: '1.4' }],
        'sm': ['var(--text-sm, 16px)', { lineHeight: '1.5' }],
        'base': ['var(--text-base, 14px)', { lineHeight: '1.5' }],
        'xs': ['var(--text-xs, 13px)', { lineHeight: '1.4', letterSpacing: '0.05em' }],
      },
      borderRadius: {
        'pill': '9999px',
        'card': '10px',
        'modal': '20px',
      },
      boxShadow: {
        'header': '0 0 20px 9px rgba(50, 50, 50, 0.1)',
        'card-hover': '0px 8px 14px rgba(0, 0, 0, 0.15)',
        'modal': '0px 4px 20px rgba(0, 0, 0, 0.15)',
      }
    },
  },
};
```
