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
  title: 'FinModelPro | Industry Financial Models & 3-Year Pro Forma Spreadsheets',
  description:
    'Bank-ready, SBA 7(a) approved 3-year P&L, Cash Flow, CapEx schedules, and Unit Economics financial model spreadsheets for 48 commercial industries. Instant Microsoft Excel (.xlsx) & Google Sheets delivery.',
  keywords: [
    'financial model excel template',
    'pro forma spreadsheet',
    'sba loan financial projection spreadsheet',
    'coffee shop financial model excel',
    'saas financial model excel',
    'gym business plan spreadsheet',
    'airbnb cash flow projection',
    '3 year financial projection model',
  ],
  openGraph: {
    title: 'FinModelPro | Bank-Ready Industry Financial Models & Pro Forma Templates',
    description:
      '48 industry-specific 3-year dynamic financial models with built-in P&L, break-even calculators, CapEx schedules, and Google Sheets templates.',
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
            <span>2026 Commercial Bank & SBA 7(a) Underwriting Standards</span>
          </div>

          {/* Main H1 */}
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Industry Financial Models &{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Pro Forma Spreadsheets
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-zinc-300 sm:text-xl sm:leading-8">
            Institutional-grade 3-year Pro Forma P&L, Cash Flow, CapEx schedules, and Unit Economics models for <strong>48 commercial industries</strong>.
            <br className="hidden sm:inline" />
            Bank loan and investor ready. 100% unlocked formulas in <strong>Microsoft Excel (.xlsx) and Google Sheets</strong>.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>48 Commercial Industry Templates</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>SBA 7(a) & Commercial Bank Format</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>100% Unlocked Dynamic Formulas</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Instant Excel Download + Google Sheets Copy</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
              <CheckoutButton
                plan="bundle"
                variant="bundle"
                label="Download All 48 Models ($49) — Lifetime Access"
              />
              <a
                href="#sectors"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/90 px-6 py-3.5 text-sm font-semibold text-zinc-200 hover:border-zinc-700 hover:bg-zinc-800 transition-all h-12 whitespace-nowrap"
              >
                <span>Explore All Industries</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Apple Pay, Google Pay & Cards • Instant Delivery • SBA Approved</span>
            </div>
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
              <h3 className="text-base font-bold text-white">SBA 7(a) & Bank Compliant</h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                Satisfies strict commercial lender covenants including Debt Service Coverage Ratios (DSCR {'>='} 1.25x), 3-year cash flow runway, and working capital buffers.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 mb-4">
                <FileSpreadsheet className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">Excel + Google Sheets</h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                One-click copy to your Google Drive or download as Microsoft Excel (.xlsx). Zero proprietary VBA macros, built with standard SUMIFS and XLOOKUP formulas.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 mb-4">
                <TrendingUp className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">Domain-Specific Benchmarks</h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                Pre-populated with real industry benchmarks: food/beverage COGS, staff payroll grids, equipment CapEx lines, and realistic customer ticket sizes.
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
              Industry pSEO Library
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
              Choose Your Industry Financial Model
            </h2>
            <p className="mt-3 text-sm text-zinc-400">
              Each dedicated sector page includes a live interactive sandbox, itemized CapEx breakdown, and unit economics simulator.
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
              Transparent One-Time Pricing
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
              No Subscriptions. Pay Once, Own Forever.
            </h2>
            <p className="mt-3 text-sm text-zinc-400">
              Avoid paying $2,500+ to a financial analyst or spending weeks struggling with blank spreadsheets. Be bank-ready in minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 max-w-4xl mx-auto">
            {/* Single Model */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-white">Single Industry Model</h3>
                  <span className="rounded bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">1 Industry</span>
                </div>
                <p className="mt-2 text-xs text-zinc-400">
                  Complete 3-year Pro Forma financial model for your specific selected business.
                </p>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-4xl font-black text-white">$29</span>
                  <span className="text-xs text-zinc-500">one-time payment / VAT included</span>
                </div>

                <ul className="mt-6 space-y-3 text-xs text-zinc-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>36-Month Dynamic P&L Spreadsheet</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Itemized CapEx & Startup Equipment Schedule</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Monthly Fixed OPEX & Payroll Matrix</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Microsoft Excel (.xlsx) + Google Sheets One-Click Copy</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-800/80">
                <CheckoutButton
                  plan="single"
                  label="Download Single Model — $29"
                  className="w-full text-center"
                />
              </div>
            </div>

            {/* Master Bundle (Featured) */}
            <div className="rounded-2xl border-2 border-emerald-500 bg-gradient-to-b from-emerald-950/30 via-zinc-900 to-zinc-950 p-8 flex flex-col justify-between relative shadow-2xl shadow-emerald-500/10">
              <div className="absolute -top-3.5 right-6 rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-zinc-950">
                Most Popular for Founders
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-black text-white">All-Access 48 Models & Master Bundle</h3>
                  <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-xs font-bold text-emerald-300 border border-emerald-500/30">
                    Unlimited Lifetime License
                  </span>
                </div>
                <p className="mt-2 text-xs text-zinc-300">
                  For portfolio builders, consultants, agencies, and entrepreneurs evaluating multiple ventures.
                </p>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-4xl font-black text-white">$49</span>
                  <span className="text-xs text-zinc-400 line-through">$1,392</span>
                  <span className="text-xs text-emerald-400 font-bold">96% OFF</span>
                </div>

                <ul className="mt-6 space-y-3 text-xs text-zinc-200">
                  <li className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span><strong>All 48 Industries Included:</strong> Cafe, MedSpa, SaaS, Gym, Airbnb, Dental, etc.</span>
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span><strong>Investor Pitch Deck Pack:</strong> Financial Summary Slides & Charts</span>
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span><strong>SBA 7(a) & Bank Ready:</strong> Lender Covenant & DSCR Schedules</span>
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span><strong>Free Lifetime Updates:</strong> All future models added automatically</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-emerald-500/30">
                <CheckoutButton
                  plan="bundle"
                  variant="bundle"
                  label="Get All 48 Models for $49"
                  className="w-full text-center"
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
              FAQ
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
              <h4 className="text-sm font-bold text-white">
                How do I receive the files after checkout?
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                Immediately after completing checkout, you are redirected to the confirmation page where you can download the Microsoft Excel (.xlsx) file with one click and access the official Google Sheets copy template. A backup copy and license key are also sent to your email instantly.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
              <h4 className="text-sm font-bold text-white">
                Are formulas unlocked? Can I enter my own assumptions?
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                Yes, 100% unlocked. There are no password-protected sheets or hidden cells. You can customize your local rent rates, staff hourly wages, pricing tiers, and growth assumptions—every chart, EBITDA metric, and cash flow statement recalculates in real-time.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
              <h4 className="text-sm font-bold text-white">
                Is this accepted by commercial banks and angel investors?
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                Yes. Our spreadsheets follow standard US Small Business Administration (SBA 7a/504) guidelines and commercial underwriting conventions. Debt Service Coverage Ratios (DSCR), gross margins, working capital reserves, and 3-year depreciation schedules are formatted exactly as credit officers expect.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
