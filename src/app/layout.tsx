import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://finmodel-pro.vercel.app'),
  title: 'FinModelPro | Sektörel Finansal Modeller & Dashboard Tabloları',
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
  authors: [{ name: 'FinModelPro' }],
  openGraph: {
    title: 'FinModelPro | Banka ve Yatırımcı Onaylı Sektörel Finansal Modeller',
    description:
      '48 farklı sektör için 3 yıllık dinamik gelir tablosu, başabaş hesaplayıcı, CapEx dökümü ve Google Sheets şablonu.',
    url: 'https://finmodel-pro.vercel.app',
    siteName: 'FinModelPro',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="dark">
      <body className="bg-zinc-950 text-zinc-100 antialiased selection:bg-emerald-500 selection:text-zinc-950 min-h-screen flex flex-col justify-between">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
