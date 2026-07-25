# PRE_LAUNCH_CHECKLIST.md — leadUsg Faz 1 Bağımsız Doğrulama

Faz 1 (CP-001–CP-014) agent tarafından "tamamlandı" olarak raporlandı. Bu dosya,
gerçek (public) lansman öncesi insan tarafından manuel doğrulanması gereken maddeleri
listeler — agent'ın kendi self-report'una güvenmeden.

## 🔴 Kritik — lansmandan önce mutlaka doğrula

- [ ] **Consent-gate manuel testi:** Tarayıcı Network tab açık, consent banner'ında
      "Reddet" seç, birkaç ürün sayfasında gezin, karşılaştırma yap. `/api/events`'e
      TEK BİR istek bile gitmemeli. Sonra "Kabul Et" ile aynı akışı tekrarla, bu sefer
      event'lerin gittiğini doğrula.
- [ ] **`scripts/integration_test.ts` içeriğini oku.** Özellikle consent-gate ve AM
      state machine testlerinin gerçekten "yanlış durumu reddediyor" mu yoksa sadece
      "mevcut kodun davranışını mı doğruluyor" olduğunu kontrol et.
- [ ] **TLS / reverse proxy kur.** Docker Compose kurulumunda şu an sadece web/postgres/
      redis var, HTTPS terminasyonu yok. Caddy (otomatik Let's Encrypt) veya nginx +
      certbot ekle — gerçek trafiğe açmadan önce.
- [ ] **KVKK aydınlatma metni / gizlilik politikası sayfası yaz ve consent banner'dan
      linkle.** Banner'ın kendisi yeterli değil, arkasında okunabilir bir metin olmalı.
      (Bu bir hukuki metin — bir avukata göstermeden yayına almamanı öneririm.)

- [ ] **Hero'daki Giphy GIF hotlink'i** (`media4.giphy.com/.../kvKSbXJfQKOY0/giphy.gif`) — Özün kendi lisanslı/telifsiz cihaz demo görseliyle değiştirecek. Şimdilik placeholder olarak kalıyor, bilerek ertelendi.

## 🟡 Önemli — kısa vadede bak

- [ ] `.env` dosyasının `.gitignore`'da olduğunu ve repoya commit edilmediğini doğrula.
- [ ] AM şifresinin (`AM_PASSWORD`) production'da güçlü ve `.env`'de olduğunu, hardcode
      edilmediğini tekrar kontrol et.
- [ ] Redis rate limit sınırlarının (`/api/events` 60/dk, `/api/leads` 3/dk) gerçek
      kullanımda çok sıkı/gevşek olup olmadığını birkaç gün canlı trafik sonrası gözden
      geçir.

## 🟢 İyi haber — kontrol ettim, doğru

- `@google/design.md` gerçek bir Google paketi, hayali değil — CP-007 iddiası geçerli.
- CP-009'da fingerprint üretiminin "analytics"/"full" onayı SONRASINA gated olduğu
  PROGRESS.md'de açıkça yazılı — mimari kararla tutarlı (yine de yukarıdaki manuel
  testle doğrula, kod okumak farklı, çalıştırıp görmek farklı).
