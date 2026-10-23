import React from 'react';
import Link from 'next/link';
import { LineChart, ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';
import { SECTORS } from '@/data/sectors';

export default function Footer() {
  const topSectors = SECTORS.slice(0, 16);

  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Column 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500 text-zinc-950">
                <LineChart className="h-5 w-5 stroke-[2.5]" />
              </div>
              <span className="text-lg font-black text-white">
                FinModel<span className="text-emerald-400">Pro</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-zinc-400">
              KOBİ'ler, yeni girişimciler ve yatırım arayan kurucular için sektöre özel, banka & SBA onay standardında 3 yıllık P&L, Nakit Akışı ve CapEx finansal modelleri.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-zinc-500">
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                Apple & Google Pay
              </span>
              <span className="inline-flex items-center gap-1">
                <Lock className="h-4 w-4 text-emerald-400" />
                256-Bit SSL
              </span>
            </div>
          </div>

          {/* Column 2: Popular Models */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200 mb-4">
              Popüler Sektörel Finansal Modeller
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {topSectors.map((sector) => (
                <Link
                  key={sector.slug}
                  href={`/${sector.slug}`}
                  className="hover:text-emerald-400 transition-colors truncate"
                  title={sector.name}
                >
                  • {sector.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Trust & Format */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200">
              Desteklenen Formatlar
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2 text-zinc-300">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>Microsoft Excel (.xlsx) Formüllü</span>
              </li>
              <li className="flex items-center gap-2 text-zinc-300">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>Google Sheets Tek Tık Kopya</span>
              </li>
              <li className="flex items-center gap-2 text-zinc-300">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>Apple Numbers & LibreOffice Uyumlu</span>
              </li>
              <li className="flex items-center gap-2 text-zinc-300">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>SBA 7(a) & Ticari Kredi Rapor Formatı</span>
              </li>
              <li className="flex items-center gap-2 text-zinc-300">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>Ömür Boyu Ücretsiz Güncelleme</span>
              </li>
            </ul>

            <div className="pt-4 border-t border-zinc-900">
              <span className="text-[11px] text-zinc-500">
                Güvenli Ödeme Altyapısı: <strong>LemonSqueezy</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-800/80 pt-6 text-xs text-zinc-500 sm:flex-row">
          <div>
            © {new Date().getFullYear()} FinModelPro. Tüm hakları saklıdır. Banka ve ticari planlama amacıyla hazırlanmıştır.
          </div>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-zinc-300">Anasayfa</Link>
            <Link href="/#pricing" className="hover:text-zinc-300">Fiyatlandırma</Link>
            <Link href="/#faq" className="hover:text-zinc-300">Sıkça Sorulanlar</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
