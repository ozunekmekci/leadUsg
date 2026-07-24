# AGENTS.md — Medikal Cihaz Broker Platformu (leadUsg)

Bu klasörde çalışan HERHANGİ BİR agent (Claude Code, Codex, OpenCode CLI, ya da Hermes
Agent üzerinden yönlendirilen bir subagent) ilk iş bu dosyayı okumalı.

## Önce oku (bu sırayla)
1. @Lead-Project.md — iş modelinin ham spesifikasyonu (NOT: dosya adında boşluk varsa
   @-include çalışmayabilir, `Lead Project.md`'yi `Lead-Project.md` olarak yeniden
   adlandırman önerilir — Antigravity rules dosyalarında @dosyaadı referansı boşluksuz
   dosya adlarıyla güvenilir çalışıyor)
2. @ROADMAP.md — faz yapısı, checkpoint durumları
3. @PROGRESS.md — şu ana kadar netleşen kararlar (SWOT, state machine'ler, mimari, veri modeli)
4. @AGENT_PROMPTS.md — CP-005'ten itibaren sırayla uygulanacak görev promptları

## Antigravity notları (%99 bu araçla çalışılıyor, %1 OpenCode fallback)
- Bu dosya (AGENTS.md) hem Antigravity hem OpenCode tarafından cross-tool proje
  bağlamı olarak otomatik okunuyor — tek dosya, iki araç.
- Skills/ klasöründeki SKILL.md dosyaları format olarak Antigravity ile uyumlu,
  yeniden yazmaya gerek yok.
- **Autonomy profilini "Review-driven development" moda al** (Customizations panelinden,
  dosyayla değil). Auto-continue varsayılan açık geliyor — bizim checkpoint disiplinimiz
  ("her CP'de dur, PROGRESS.md'yi güncelle, sonrakine geç") ile "Agent-driven development"
  (minimal insan müdahalesi) modu çelişir.

## Şu an neredeyiz
CP-001–CP-004 tamamlandı (iş modeli, mimari, state machine, kapsam). Henüz tek satır
kod yok. **Sıradaki adım: `AGENT_PROMPTS.md` içindeki CP-005 promptu.**

## Kesin kararlar (sorgulamadan uygula, değiştirme)
- Tech stack: Next.js 14 App Router + TypeScript + Tailwind + shadcn/ui + PostgreSQL
  (Prisma) + Redis
- Consent mimarisi: `sessions.consent_status` üç kademeli (`none`/`analytics`/`full`).
  Onay öncesi fingerprint veya cross-session merge YOK — CP-009 promptunda sert kısıt
  olarak yazılı, atlanmayacak.
- AM state machine: Lead Geldi → İnceleniyor → Arandı → Sıcak/Soğuk → Satış/Kapalı
  (tam tetikleyici/aksiyon tablosu `PROGRESS.md`'de)

## Checkpoint → Skill eşleşmesi
Her checkpoint'e başlamadan önce ilgili skill'i oku. İş bitince genel geçiş skill'iyle gözden geçir, sonra commit at.

| Checkpoint | İçerik-özel skill | Kapanış skill'i |
|---|---|---|
| CP-005 scaffold | `Skills/software-development/plan` | `Skills/github/github-repo-management` |
| CP-006 ürün listeleme | `Skills/frontend-expert`, `Skills/popular-web-designs` (referans: linear.app.md / stripe.md — temiz B2B görünüm), `Skills/humanizer` (seed ürün açıklamaları AI kokmasın) | `Skills/uiux-designer` |
| CP-007 ürün detay | `Skills/frontend-expert`, `Skills/design-md` (DESIGN.md'yi burada başlat) | `Skills/uiux-designer` |
| CP-008 karşılaştırma | `Skills/frontend-expert` | `Skills/software-development/test-driven-development` |
| CP-009 event tracking | — (mimari zaten `AGENT_PROMPTS.md`'de sert kısıtlı) | `Skills/software-development/systematic-debugging`, `test-driven-development` |
| CP-010 lead formu | `Skills/frontend-expert` | `test-driven-development` |
| CP-011 AM panel | `Skills/frontend-expert`, `Skills/uiux-designer` | `Skills/github/github-auth` (env değişkenleri) |
| CP-012 lead kartı | `Skills/frontend-expert`, `Skills/uiux-designer` | `Skills/software-development/requesting-code-review` |

Her checkpoint kapanışında sırayla: `requesting-code-review` → `Skills/github/github-pr-workflow`
(conventional-commits referansına uyarak commit at) → `PROGRESS.md`'yi güncelle.

## Faz 3'e not (şimdi kullanma)
`Skills/web-data-extraction` (özellikle `turkish-ecommerce-price-checks.md`) Faz 3'teki
pazar/fiyat analizi için düşünülmüş olabilir. MVP kapsamında kullanılmayacak.

## Hangi agent çalıştırıyor?
- Hermes Agent üzerinden subagent isen: `Skills/autonomous-ai-agents/hermes-agent/SKILL.md`
  ve `hermes-model-picker-customization` kurallarına uy, model routing'i bozma.
- Doğrudan OpenCode / Claude Code / Codex ile çalışıyorsan ilgili
  `Skills/autonomous-ai-agents/{tool}/SKILL.md` dosyasını oku.

## Safety / Guardrails
Auto-continue açıkken agent uzun adım zincirlerini onay beklemeden çalıştırabiliyor.
Şu durumlarda DUR ve kullanıcıya sor, otomatik devam etme:
- `sessions.consent_status` mantığını, fingerprint zamanlamasını veya cross-session
  merge kurallarını değiştirecek herhangi bir "optimizasyon" — bu mimari kararı
  sadece kullanıcı (Özün) değiştirebilir, agent kendi inisiyatifiyle "daha fazla veri
  toplarız" diye genişletemez.
- Destructive DB migration'lar (DROP, TRUNCATE) — önce staging'de dene.
- `main`/`master` branch'e doğrudan push — her checkpoint kendi branch'inde, PR ile.
- .env veya secret içeren herhangi bir dosyayı commit etmeden önce.

## Kırmızı çizgi
`Lead Project.md`'deki "kullanıcı vermese bile veri toplanır" ifadesi, bu dosyadaki
consent mimarisiyle SINIRLANMIŞ durumda — ham spesifikasyondaki cümleyi değil, buradaki
kesin kararı uygula. Herhangi bir checkpoint'te bu ikisi çelişirse, bu dosya (AGENTS.md)
kazanır.
