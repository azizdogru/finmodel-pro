import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://finmodel-pro.vercel.app'),
  alternates: {
    canonical: 'https://finmodel-pro.vercel.app',
  },
  title: 'FinModelPro | Industry Financial Models & 3-Year Pro Forma Spreadsheets',
  description:
    'Bank-ready, investor-approved 3-year P&L, Cash Flow, CapEx schedules, and Unit Economics financial model templates for 48 commercial industries. Instant Microsoft Excel (.xlsx) & Google Sheets delivery.',
  keywords: [
    'financial model excel template',
    'pro forma spreadsheet',
    '3 year financial projection',
    'sba loan financial model',
    'coffee shop financial model',
    'saas financial model excel',
    'gym business plan spreadsheet',
    'airbnb cash flow projection',
    'startup financial model google sheets',
  ],
  authors: [{ name: 'FinModelPro' }],
  openGraph: {
    title: 'FinModelPro | Industry Financial Models & Pro Forma Spreadsheets',
    description:
      '48 industry-specific 3-year dynamic financial models with built-in P&L, break-even calculators, CapEx schedules, and Google Sheets access.',
    url: 'https://finmodel-pro.vercel.app',
    siteName: 'FinModelPro',
    type: 'website',
  },
  verification: {
    google: 'google4a281205e868ab2c',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-zinc-950 text-zinc-100 antialiased selection:bg-emerald-500 selection:text-zinc-950 min-h-screen flex flex-col justify-between">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
