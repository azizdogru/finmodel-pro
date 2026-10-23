import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import SectorGrid from '@/components/SectorGrid';
import CheckoutButton from '@/components/CheckoutButton';
import {
  LineChart,
  FileSpreadsheet,
  ShieldCheck,
  Sparkles,
  Download,
  CheckCircle2,
  TrendingUp,
  Layers,
  ArrowRight,
  DollarSign,
  HelpCircle,
  Star,
  Users,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'FinModelPro | Sektörel Finansal Modeller & Dashboard Tabloları (Excel & Sheets)',
  description:
    'KOBİ\'ler, girişimciler ve yatırım arayanlar için 48 sektöre özel 3 yıllık P&L, Nakit Akışı, CapEx ve Unit Economics finansal modelleri. Banka & SBA 7(a) formatında, anında Excel ve Google Sheets teslimi.',
  keywords: [
    'finansal model excel şablonu',
    'pro forma excel template',
    'sektörel fizibilite tablosu',
    'kafe finansal model',
    'saas financial model excel',
    'gym business plan spreadsheet',
    'airbnb cash flow projection',
    'sba loan financial projection spreadsheet',
  ],
  openGraph: {
    title: 'FinModelPro | Banka ve Yatırımcı Onaylı Sektörel Finansal Modeller',
    description:
      '48 farklı sektör için 3 yıllık dinamik gelir tablosu, başabaş hesaplayıcı, CapEx dökümü ve Google Sheets şablonu.',
    url: 'https://finmodel-pro.vercel.app',
    siteName: 'FinModelPro',
    type: 'website',
  },
};

export default function HomePage() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'FinModelPro',
    url: 'https://finmodel-pro.vercel.app',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://finmodel-pro.vercel.app/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 -right-40 h-[400px] w-[400px] rounded-full bg-teal-500/10 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400">
            <Sparkles className="h-4 w-4" />
            <span>2026 Banka & Yatırımcı Standartlarında Sektörel Şablonlar</span>
          </div>

          {/* Main H1 */}
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Sektörel Finansal Modeller &{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Dashboard Tabloları
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-zinc-300 sm:text-xl sm:leading-8">
            KOBİ'ler, yeni girişimciler ve yatırım arayanlar için <strong>48 sektöre özel</strong> 3 yıllık Pro Forma P&L, Nakit Akışı, CapEx bütçesi ve Unit Economics tabloları.
            <br className="hidden sm:inline" />
            Banka & SBA kredi formatına hazır, formülleri açık <strong>Excel ve Google Sheets</strong> teslimatı.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>48 Ticari Sektör Modeli</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>SBA 7(a) ve Banka Kredi Formatı</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>100% Açık Dinamik Formüller</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Anında İndirme + Google Sheets</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CheckoutButton
              plan="bundle"
              variant="bundle"
              label="Tüm 48 Modeli İndir ($49) — Ömür Boyu"
              showGuarantee={true}
            />
            <a
              href="#sectors"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/90 px-6 py-3.5 text-sm font-semibold text-zinc-200 hover:border-zinc-700 hover:bg-zinc-800 transition-all"
            >
              <span>Sektörleri Keşfet</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Trust & Underwriting Standard Section */}
      <section id="features" className="border-y border-zinc-800/80 bg-zinc-900/40 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 mb-4">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">Banka & SBA 7(a) Uyumlu</h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                Ticari bankalar ve SBA kredi uzmanlarının aradığı DSCR (Borç Karşılama Oranı {'>='} 1.25x), işletme sermayesi tamponu ve 36 aylık nakit akışı standartlarına tam uygundur.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 mb-4">
                <FileSpreadsheet className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">Excel + Google Sheets</h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                Tek tıkla Google Sheets'e kopyalayın veya Microsoft Excel (.xlsx) olarak indirin. Sıfır karmaşık makro, tamamen standart ve taşınabilir SUMIFS / XLOOKUP formülleri.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 mb-4">
                <TrendingUp className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">Gerçekçi Sektör Metrikleri</h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                Boş beyaz tablolar yerine; sektörün gerçek ortalama bilet tutarları, COGS marjları, personel maaş matrisleri ve CapEx ekipman fiyatları hazır girilmiş olarak gelir.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 48 Sectors Grid Section */}
      <section id="sectors" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Sektörel pSEO Kütüphanesi
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
              İşinize Özel Finansal Modeli Seçin
            </h2>
            <p className="mt-3 text-sm text-zinc-400">
              Her sektörün dinamik sayfasında canlı simülatör, CapEx dökümü ve birim iktisadı parametreleri mevcuttur.
            </p>
          </div>

          <SectorGrid />
        </div>
      </section>

      {/* Pricing Comparison Section */}
      <section id="pricing" className="border-t border-zinc-800/80 bg-zinc-900/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Şeffaf ve Adil Fiyatlandırma
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
              Aylık Abonelik Yok, Tek Seferlik Ödeme
            </h2>
            <p className="mt-3 text-sm text-zinc-400">
              Bir finansal analiste $2,500 ödemek veya günlerce boş tablolarla uğraşmak yerine; dakikalar içinde banka ve yatırımcıya hazır olun.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 max-w-4xl mx-auto">
            {/* Single Model */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-white">Tekil Sektör Modeli</h3>
                  <span className="rounded bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">Tek Sektör</span>
                </div>
                <p className="mt-2 text-xs text-zinc-400">
                  Yalnızca seçtiğiniz tek bir işletme/sektör için eksiksiz 3 yıllık Pro Forma modeli.
                </p>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-4xl font-black text-white">$29</span>
                  <span className="text-xs text-zinc-500">tek seferlik / KDV dahil</span>
                </div>

                <ul className="mt-6 space-y-3 text-xs text-zinc-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Seçilen sektör için 36 Aylık Dinamik P&L Tablosu</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Detaylı CapEx & Başlangıç Yatırım Dökümü</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Aylık Sabit OPEX ve Maaş Matrisi</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Microsoft Excel (.xlsx) + Google Sheets Tek Tık Erişim</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-800/80">
                <CheckoutButton
                  plan="single"
                  label="Tek Sektör Modelini İndir — $29"
                  className="w-full text-center"
                />
              </div>
            </div>

            {/* Master Bundle (Featured) */}
            <div className="rounded-2xl border-2 border-emerald-500 bg-gradient-to-b from-emerald-950/30 via-zinc-900 to-zinc-950 p-8 flex flex-col justify-between relative shadow-2xl shadow-emerald-500/10">
              <div className="absolute -top-3.5 right-6 rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-zinc-950">
                En Popüler Seçenek
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-black text-white">Tüm 48 Model & Master Bundle</h3>
                  <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-xs font-bold text-emerald-300 border border-emerald-500/30">
                    Sınırsız Lisans
                  </span>
                </div>
                <p className="mt-2 text-xs text-zinc-300">
                  Portföy kurucuları, yatırımcılar, danışmanlar ve ajanslar için 48 sektörün tamamı.
                </p>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-4xl font-black text-white">$49</span>
                  <span className="text-xs text-zinc-400 line-through">$1,392</span>
                  <span className="text-xs text-emerald-400 font-bold">%96 İndirim</span>
                </div>

                <ul className="mt-6 space-y-3 text-xs text-zinc-200">
                  <li className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span><strong>48 Sektörün Tamamı:</strong> Kafe, MedSpa, SaaS, Gym, Airbnb vb.</span>
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span><strong>Yatırımcı Pitch Deck:</strong> Finansal Slayt & Grafik Şablonları</span>
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span><strong>SBA 7(a) & Banka:</strong> Kredi Uyumluluk ve DSCR Şablonu</span>
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Gelecekte Eklenecek Yeni Sektörlere <strong>Ömür Boyu Ücretsiz Erişim</strong></span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-emerald-500/30">
                <CheckoutButton
                  plan="bundle"
                  variant="bundle"
                  label="Tüm 48 Modeli $49'a İndir"
                  className="w-full text-center"
                  showGuarantee={true}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 border-t border-zinc-800/80">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              SSS
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-white">
              Sıkça Sorulan Sorular
            </h2>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
              <h4 className="text-sm font-bold text-white">
                Satın aldıktan sonra dosyayı nasıl teslim alıyorum?
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                Ödemenizi tamamladığınız saniyede doğrudan `/success` sayfasına yönlendirilirsiniz. Bu sayfada tek tıkla Excel (.xlsx) dosyasını indirebilir ve Google Sheets şablonunu doğrudan kendi Google Drive hesabınıza kopyalayabilirsiniz. Ayrıca indirme linkleri e-posta adresinize de gönderilir.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
              <h4 className="text-sm font-bold text-white">
                Tablodaki formüller kilitli mi, kendi rakamlarımı girebilir miyim?
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                Kesinlikle kilitli değildir! Tüm hücreler, formüller ve satırlar 100% düzenlenebilir biçimdedir. Kendi kira bedelinizi, yerel personel ücretlerinizi ve satış hedeflerinizi girebilirsiniz; tüm kâr/zarar, nakit akışı ve başabaş grafikleri anında otomatik güncellenir.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
              <h4 className="text-sm font-bold text-white">
                Banka kredisi ve melek yatırımcı görüşmelerinde bu format geçerli mi?
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                Evet. Tablolarımız ABD Küçük İşletmeler İdaresi (SBA 7a/504) standartları ve kurumsal ticari kredi underwriting esaslarına göre hazırlanmıştır. Borç Karşılama Oranı (DSCR), Brüt & Net Marjlar ve 3 yıllık amortisman çizelgeleri tam olarak bankacıların talep ettiği hiyerarşidedir.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
