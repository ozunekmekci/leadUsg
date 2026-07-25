import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni | leadUsg",
  description: "leadUsg Medikal Karşılaştırma ve Danışmanlık Platformu Çerez ve Kişisel Verilerin Korunması Kanunu (KVKK) Aydınlatma Metni.",
};

export default function KvkkPage() {
  return (
    <div className="min-h-screen bg-slate-950 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-10 shadow-2xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-100 mb-2">
          KVKK Aydınlatma Metni
        </h1>
        <p className="text-sm text-slate-400 mb-8 border-b border-slate-800 pb-4">
          Son Güncelleme: 24 Temmuz 2026
        </p>

        <div className="space-y-8 text-slate-300 text-sm leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="text-blue-500">1.</span> Veri Sorumlusu
            </h2>
            <p>
              Bu Aydınlatma Metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca, <strong>leadUsg Medikal Karşılaştırma ve Danışmanlık Platformu</strong> (“Platform”) olarak, kullanıcılarımızın kişisel verilerinin işlenmesine ilişkin usul ve esasları açıklamak amacıyla hazırlanmıştır.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="text-blue-500">2.</span> Üç Kademeli Rıza (Consent-Gate) Mimarisi ve İşlenen Veriler
            </h2>
            <p>
              Platformumuzda kullanıcı gizliliğini en üst düzeyde korumak amacıyla tasarlanmış, sıkı kısıtlar içeren <strong>kademeli bir rıza mekanizması</strong> uygulanmaktadır. Verileriniz, verdiğiniz onay seviyesine göre işlenir:
            </p>
            <div className="grid grid-cols-1 gap-4 mt-2">
              <div className="bg-slate-950/60 p-4 border border-slate-800 rounded-lg">
                <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-slate-800 text-slate-400 mb-2 border border-slate-700">
                  SEVİYE 1: Onay Yok (&quot;none&quot;)
                </span>
                <p className="text-xs text-slate-400">
                  Çerez/analitik rızası vermemeniz durumunda, cihazınızda hiçbir çerez, yerel depolama (localStorage) kimliği veya tarayıcı parmak izi (fingerprint) oluşturulmaz. Bu aşamada sunucularımızda yalnızca oturumdan bağımsız, tamamen anonim aggregate sayfa gösterim sayısı sayacı tutulur. Davranışsal hareketleriniz takip edilmez.
                </p>
              </div>

              <div className="bg-slate-950/60 p-4 border border-slate-800 rounded-lg">
                <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-blue-900/40 text-blue-300 mb-2 border border-blue-800/50">
                  SEVİYE 2: Analitik Onayı (&quot;analytics&quot;)
                </span>
                <p className="text-xs text-slate-400">
                  Çerez banner&apos;ında &quot;Kabul Et&quot; seçeneğini tıklamanız durumunda rıza durumunuz <code>analytics</code> seviyesine yükseltilir. Bu seviyede, cihazınızdan tamamen yerel parametreler (ekran çözünürlüğü, tarayıcı bilgisi, canvas özellikleri) kullanılarak tekil bir parmak izi özeti (SHA-256 hash) ve rastgele bir oturum ID&apos;si üretilir. Hangi medikal cihaz sayfalarını gezdiğiniz, filtre tercihleri ve karşılaştırdığınız ürünler anonimleştirilmiş biçimde kaydedilerek ürün yelpazemizi optimize etmek amacıyla işlenir.
                </p>
              </div>

              <div className="bg-slate-950/60 p-4 border border-slate-800 rounded-lg">
                <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-indigo-900/40 text-indigo-300 mb-2 border border-indigo-800/50">
                  SEVİYE 3: Teklif Talebi (&quot;full&quot;)
                </span>
                <p className="text-xs text-slate-400">
                  Platform üzerinden &quot;Teklif Al&quot; formunu doldurarak ad soyad, kurum adı, telefon numarası ve opsiyonel e-posta/mesaj verilerinizi gönderdiğinizde, rıza durumunuz <code>full</code> seviyesine yükseltilir. Bu aşamada, talebinizle en doğru teklifin sunulabilmesi ve klinik ihtiyaçlarınızın analiz edilebilmesi amacıyla, aynı oturumdaki (ve parmak izi eşleşen geçmiş oturumlardaki) karşılaştırma tercihleri gibi davranışsal geçmişiniz, kimliğiniz ile birleştirilerek Account Manager ekibimize lead kartı olarak sunulur.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="text-blue-500">3.</span> Kişisel Veri İşlemenin Hukuki Sebepleri
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-slate-400">
              <li>
                <strong className="text-slate-300">Açık Rıza:</strong> Çerez analitik verilerinin (cihaz parmak izi, oturum hareketleri) toplanması ve teklif alma formunun gönderilmesi kullanıcıların hür iradesiyle verdiği açık rızaya dayanır.
              </li>
              <li>
                <strong className="text-slate-300">Bir Sözleşmenin Kurulması veya İfası:</strong> İlettiğiniz teklif taleplerinin değerlendirilmesi ve size uygun cihaz tekliflerinin hazırlanması sözleşme öncesi süreçlerin yürütülmesi hukuki sebebine dayanır.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="text-blue-500">4.</span> Verilerin Güvenliği ve Maskelenmesi (PII)
            </h2>
            <p>
              Platformumuzda toplanan kişisel olarak tanımlanabilir bilgiler (PII) yüksek güvenlik standartlarında korunmaktadır. IP adresiniz ve hassas cihaz özetleriniz veritabanına doğrudan yazılmayıp, SHA-256 algoritmasıyla maskelenerek saklanır. Sunucu loglarında hiçbir kişisel veri açık metin (plaintext) halinde barındırılmaz. Ayrıca tüm veri aktarımları TLS protokolü üzerinden şifrelenir.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="text-blue-500">5.</span> İlgili Kişi Hakları (KVKK Madde 11)
            </h2>
            <p>
              Kullanıcılarımız Kanun&apos;un 11. maddesi kapsamında aşağıdaki haklara sahiptir:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>
              <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme,</li>
              <li>Kişisel verilerinizin işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
              <li>Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme,</li>
              <li>Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme,</li>
              <li>KVKK Madde 7 çerçevesinde kişisel verilerin silinmesini veya yok edilmesini isteme,</li>
              <li>Rızanızı dilediğiniz an geri çekme ve çerez tercihlerinizi tarayıcınızdan sıfırlama hakkı.</li>
            </ul>
            <p className="mt-2">
              Haklarınızı kullanmak amacıyla, Platform üzerinde yer alan AM iletişim kanalları veya doğrudan veri sorumlusu e-postası (<code>admin@leadusg.com</code>) üzerinden başvuruda bulunabilirsiniz.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
