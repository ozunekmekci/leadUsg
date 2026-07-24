# ROADMAP.md — Medikal Cihaz Broker Platformu

Son güncelleme: CP-001 tamamlandı

## Faz Yapısı

### 🟢 FAZ 1 — MVP
| CP | Açıklama | Durum |
|----|----------|-------|
| CP-001 | Proje başlangıcı, iş modeli analizi, gelir modeli sıralaması | ✅ TAMAMLANDI |
| CP-002 | Sistem mimarisi, tech stack kararı, veri modeli | ✅ TAMAMLANDI |
| CP-003 | State machine çıkarımı (alıcı + AM) | ⏳ Beklemede |
| CP-004 | Önceliklendirme, MVP kapsamı, sayfa listesi | ⏳ Beklemede |
| CP-005 | Next.js scaffold, routing, temel layout | ⏳ Beklemede |
| CP-006 | Ürün listeleme sayfaları (ultrason kategorisi) | ⏳ Beklemede |
| CP-007 | Ürün detay sayfası + teknik özellik tablosu | ⏳ Beklemede |
| CP-008 | Karşılaştırma modülü (2-4 cihaz yan yana) | ⏳ Beklemede |
| CP-009 | Event tracking altyapısı (davranışsal veri toplama) | ✅ TAMAMLANDI |
| CP-010 | Teklif Al butonu + formu + lead kaydı | ✅ TAMAMLANDI |
| CP-011 | Account Manager admin panel (giriş + lead listesi) | ✅ TAMAMLANDI |
| CP-012 | Lead detay kartı (davranışsal veri + form verisi birleşik) | ✅ TAMAMLANDI |
| CP-013 | Entegrasyon testleri + deployment hazırlığı | ✅ TAMAMLANDI |
| CP-014 | MVP lansmanı | ⏳ Beklemede |

### 🔵 FAZ 2 — Genişleme
- MR, BT, Röntgen kategorilerinin eklenmesi
- Filtreleme / arama geliştirmeleri
- AM bildirim sistemi (email/Slack/webhook)
- Lead puanlama (scoring) modeli
- A/B test altyapısı

### 🟣 FAZ 3 — Veri Ürünü
- Pazar trend raporları
- Fiyatlandırma analizi
- Distribütörlere satılabilir veri paketleri
- API: lead çıkışı

### ⚪ FAZ 4 — Ölçek
- Yeni kategoriler (sarf malzeme, monitör, ventilatör)
- Çoklu AM desteği
- Çoklu dil / bölge desteği
- Mobil uygulama

## Gelir Modeli Sıralaması (CP-001'de belirlendi)

1. Lead başına komisyon — MVP başlangıcı için en uygun
2. Başarı primi (%3-5) — yüksek biletli satışlarda en yüksek getiri potansiyeli
3. Hibrit (abonelik + komisyon) — çoklu distribütör aşamasında
4. Veri satışı — Faz 3, hacim/güvenilirlik gerektirir
5. Saf abonelik — erken aşamada riskli
6. Reklam/Sponsorluk — konumlandırmayı zedeleyebilir, en düşük öncelik

## Açık Riskler / Takip Edilecek Konular

- **KVKK uyumu:** Davranışsal tracking + fingerprint tabanlı oturum birleştirme, açık rıza/aydınlatma metni olmadan yapılırsa yasal risk taşıyor. CP-002/CP-009'da consent mekanizması mimariye dahil edilmeli.
- **AMBIGUOUS (CP-001):** Platform bağımsız girişim mi, Promedis dahili aracı mı? Veri sorumlusu kimliği ve çıkar çatışması riski buna bağlı — CP-002 öncesi netleştirilmeli.
