import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { SECTORS, SECTOR_MAP, ALL_SECTOR_SLUGS } from '@/data/sectors';
import FinancialSimulator from '@/components/FinancialSimulator';
import ExcelPreviewModal from '@/components/ExcelPreviewModal';
import CheckoutButton from '@/components/CheckoutButton';
import {
  CheckCircle2,
  FileSpreadsheet,
  Download,
  ShieldCheck,
  Building2,
  DollarSign,
  TrendingUp,
  Clock,
  HelpCircle,
  ArrowRight,
  Layers,
  Sparkles,
  ChevronRight,
  Lock,
} from 'lucide-react';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return ALL_SECTOR_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const sector = SECTOR_MAP[params.slug];
  if (!sector) return {};

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://finmodel-pro.vercel.app';
  const pageUrl = `${baseUrl}/${sector.slug}`;
  const metaTitle =
    sector.metaTitle ||
    `${sector.name} Financial Model Template (Excel & Sheets) | 3-Year Pro Forma`;
  const metaDescription =
    sector.metaDescription ||
    `Bank-ready 3-year dynamic financial model for ${sector.name.toLowerCase()}. Includes dynamic P&L, CapEx schedules, and instant Excel / Google Sheets delivery.`;

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: pageUrl,
      siteName: 'FinModelPro',
      type: 'website',
    },
  };
}

export default function SectorPseoPage({ params }: Props) {
  const sector = SECTOR_MAP[params.slug];

  if (!sector) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://finmodel-pro.vercel.app';
  const pageUrl = `${baseUrl}/${sector.slug}`;
  const pageDescription = sector.metaDescription || sector.heroSubtitle;

  // Structured Data Schemas
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${sector.name} 3-Year Financial Model Template (Excel & Google Sheets)`,
    description: pageDescription,
    image: `${baseUrl}/icon.png`,
    sku: `FINMODEL-${sector.slug.toUpperCase()}`,
    offers: {
      '@type': 'Offer',
      price: '29.00',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: pageUrl,
      validFrom: '2024-01-01',
      priceValidUntil: '2027-12-31',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '134',
      bestRating: '5',
    },
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `${sector.name} Pro Forma Spreadsheet`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Microsoft Excel, Google Sheets, Apple Numbers',
    offers: {
      '@type': 'Offer',
      price: '29.00',
      priceCurrency: 'USD',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: sector.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Financial Models',
        item: `${baseUrl}/#sectors`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: sector.name,
        item: pageUrl,
      },
    ],
  };

  // Other related sectors for internal linking
  const relatedSectors = SECTORS.filter((s) => s.slug !== sector.slug).slice(0, 6);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Structured Data Script Tags */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Top Breadcrumbs */}
      <div className="border-b border-zinc-800/80 bg-zinc-900/40">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-2.5 text-xs text-zinc-400 sm:px-6 lg:px-8">
          <Link href="/" className="hover:text-zinc-200">
            Home
          </Link>
          <ChevronRight className="h-3 w-3 text-zinc-600" />
          <Link href="/#sectors" className="hover:text-zinc-200">
            Financial Models
          </Link>
          <ChevronRight className="h-3 w-3 text-zinc-600" />
          <span className="text-zinc-200 font-medium truncate">{sector.name}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="pointer-events-none absolute top-40 right-10 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400">
              <ShieldCheck className="h-4 w-4" />
              <span>{sector.badge}</span>
            </div>

            {/* H1 Title */}
            <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {sector.name}{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                Financial Model Template
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 text-base leading-relaxed text-zinc-300 sm:text-lg sm:leading-8">
              {sector.heroSubtitle}
            </p>

            {/* Benchmark Highlights */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3.5 text-center">
                <span className="text-[11px] uppercase tracking-wider text-zinc-400">Y1 Target Revenue</span>
                <div className="mt-1 text-lg font-black text-white">{sector.typicalY1Revenue}</div>
              </div>
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3.5 text-center">
                <span className="text-[11px] uppercase tracking-wider text-zinc-400">Gross Margin</span>
                <div className="mt-1 text-lg font-black text-emerald-400">{sector.grossMarginBenchmark}%</div>
              </div>
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3.5 text-center">
                <span className="text-[11px] uppercase tracking-wider text-zinc-400">Breakeven Timeline</span>
                <div className="mt-1 text-lg font-black text-white">{sector.breakevenMonth}</div>
              </div>
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3.5 text-center">
                <span className="text-[11px] uppercase tracking-wider text-zinc-400">Startup CapEx</span>
                <div className="mt-1 text-sm font-bold text-zinc-200 mt-1.5">{sector.initialCapexRange}</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-9 flex flex-col items-center justify-center gap-4">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
                <CheckoutButton
                  sectorSlug={sector.slug}
                  plan="single"
                  label={`Download Model (Excel & Sheets) — $29`}
                />
                <CheckoutButton
                  sectorSlug={sector.slug}
                  plan="bundle"
                  variant="bundle"
                  label="Unlock All 48 Models Bundle — $49"
                />
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Apple Pay, Google Pay & Cards • Instant Delivery • 100% Unlocked</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20 space-y-16">
        {/* NEW: Interactive Look Inside Excel Preview Component */}
        <section>
          <ExcelPreviewModal sector={sector} />
        </section>

        {/* 1. Interactive Pro Forma Simulator Component */}
        <section>
          <FinancialSimulator sector={sector} />
        </section>

        {/* 2. 3-Year Pro Forma Financial Statement */}
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 md:p-8">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between border-b border-zinc-800 pb-5">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                <TrendingUp className="h-3.5 w-3.5" />
                Standard Income Statement Schedule
              </div>
              <h2 className="mt-2 text-2xl font-bold text-white">
                3-Year Pro Forma Profit & Loss (P&L) and EBITDA Forecast
              </h2>
              <p className="text-sm text-zinc-400">
                All cells and formulas in the Excel (.xlsx) and Google Sheets file are fully dynamic and unlocked.
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-zinc-400">Layout Format:</span>
              <div className="text-xs font-semibold text-emerald-400">SBA 7(a) & Commercial Bank Layout</div>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-800 text-xs uppercase tracking-wider text-zinc-400">
                  <th className="py-3 px-4">Financial Statement Line Items</th>
                  <th className="py-3 px-4 text-right">Year 1 (Y1)</th>
                  <th className="py-3 px-4 text-right">Year 2 (Y2)</th>
                  <th className="py-3 px-4 text-right">Year 3 (Y3)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 font-mono">
                <tr className="bg-zinc-900/80 font-sans font-bold text-white">
                  <td className="py-3 px-4 font-sans">Gross Revenue</td>
                  <td className="py-3 px-4 text-right">${sector.proFormaYears[0].revenue.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right">${sector.proFormaYears[1].revenue.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right">${sector.proFormaYears[2].revenue.toLocaleString()}</td>
                </tr>
                <tr className="text-zinc-400 font-sans">
                  <td className="py-3 px-4 pl-8">Cost of Goods Sold (COGS)</td>
                  <td className="py-3 px-4 text-right font-mono">(${sector.proFormaYears[0].cogs.toLocaleString()})</td>
                  <td className="py-3 px-4 text-right font-mono">(${sector.proFormaYears[1].cogs.toLocaleString()})</td>
                  <td className="py-3 px-4 text-right font-mono">(${sector.proFormaYears[2].cogs.toLocaleString()})</td>
                </tr>
                <tr className="bg-emerald-950/20 font-sans font-bold text-emerald-400 border-t border-emerald-500/30">
                  <td className="py-3 px-4 font-sans">Gross Profit</td>
                  <td className="py-3 px-4 text-right font-mono">${sector.proFormaYears[0].grossProfit.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right font-mono">${sector.proFormaYears[1].grossProfit.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right font-mono">${sector.proFormaYears[2].grossProfit.toLocaleString()}</td>
                </tr>
                <tr className="text-zinc-400 font-sans">
                  <td className="py-3 px-4 pl-8">Operating Expenses (Fixed OPEX)</td>
                  <td className="py-3 px-4 text-right font-mono">(${sector.proFormaYears[0].operatingExpenses.toLocaleString()})</td>
                  <td className="py-3 px-4 text-right font-mono">(${sector.proFormaYears[1].operatingExpenses.toLocaleString()})</td>
                  <td className="py-3 px-4 text-right font-mono">(${sector.proFormaYears[2].operatingExpenses.toLocaleString()})</td>
                </tr>
                <tr className="font-sans font-bold text-white bg-zinc-900/50">
                  <td className="py-3 px-4 font-sans">EBITDA</td>
                  <td className="py-3 px-4 text-right font-mono">${sector.proFormaYears[0].ebitda.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right font-mono">${sector.proFormaYears[1].ebitda.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right font-mono">${sector.proFormaYears[2].ebitda.toLocaleString()}</td>
                </tr>
                <tr className="text-zinc-400 font-sans text-xs">
                  <td className="py-2.5 px-4 pl-8">Income Tax Provision (21% Corporate Tax)</td>
                  <td className="py-2.5 px-4 text-right font-mono">(${sector.proFormaYears[0].tax.toLocaleString()})</td>
                  <td className="py-2.5 px-4 text-right font-mono">(${sector.proFormaYears[1].tax.toLocaleString()})</td>
                  <td className="py-2.5 px-4 text-right font-mono">(${sector.proFormaYears[2].tax.toLocaleString()})</td>
                </tr>
                <tr className="bg-emerald-500/10 font-sans font-black text-emerald-300 text-base border-t-2 border-emerald-500">
                  <td className="py-3.5 px-4 font-sans">Net Income</td>
                  <td className="py-3.5 px-4 text-right font-mono">${sector.proFormaYears[0].netIncome.toLocaleString()}</td>
                  <td className="py-3.5 px-4 text-right font-mono">${sector.proFormaYears[1].netIncome.toLocaleString()}</td>
                  <td className="py-3.5 px-4 text-right font-mono">${sector.proFormaYears[2].netIncome.toLocaleString()}</td>
                </tr>
                <tr className="text-xs text-zinc-400 font-sans">
                  <td className="py-2 px-4 pl-8">Net Profit Margin %</td>
                  <td className="py-2 px-4 text-right font-mono font-bold text-white">%{sector.proFormaYears[0].marginPercent}</td>
                  <td className="py-2 px-4 text-right font-mono font-bold text-white">%{sector.proFormaYears[1].marginPercent}</td>
                  <td className="py-2 px-4 text-right font-mono font-bold text-white">%{sector.proFormaYears[2].marginPercent}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 3. Startup CapEx & Initial Budget */}
        <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* CapEx Schedule */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-2">
              <Building2 className="h-4 w-4" />
              <span>Capital Expenditure (CapEx) Schedule</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">
              Itemized Startup Equipment & Build-Out Budget
            </h3>
            <div className="space-y-3">
              {sector.capexItems.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-3.5 flex items-start justify-between gap-3"
                >
                  <div>
                    <div className="text-sm font-semibold text-zinc-200">{item.name}</div>
                    <div className="text-xs text-zinc-400 mt-0.5">{item.description}</div>
                    <span className="inline-block mt-1 text-[10px] rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-400">
                      {item.category}
                    </span>
                  </div>
                  <div className="font-mono text-sm font-bold text-emerald-400 shrink-0">
                    ${item.estimatedCost.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly OPEX & Revenue Mix */}
          <div className="space-y-8">
            {/* Monthly Fixed OPEX */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-2">
                <DollarSign className="h-4 w-4" />
                <span>Monthly Fixed Operating Overhead (OPEX)</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Rent, Payroll & Operational Fixed Burdens
              </h3>
              <div className="space-y-2.5">
                {sector.monthlyOpexItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-xs py-2 border-b border-zinc-800/60"
                  >
                    <div>
                      <span className="font-medium text-zinc-200">{item.category}</span>
                      <p className="text-[11px] text-zinc-500">{item.notes}</p>
                    </div>
                    <span className="font-mono font-bold text-zinc-300 shrink-0">
                      ${item.monthlyAmount.toLocaleString()} / mo
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Revenue Stream Breakdown */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-2">
                <Layers className="h-4 w-4" />
                <span>Revenue Streams Distribution</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Product & Service Sales Mix
              </h3>
              <div className="space-y-3">
                {sector.revenueStreams.map((stream, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium text-zinc-200">{stream.name}</span>
                      <span className="font-bold text-emerald-400">%{stream.sharePercent}</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
                      <div
                        style={{ width: `${stream.sharePercent}%` }}
                        className="h-full bg-emerald-500 rounded-full"
                      />
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-1">{stream.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. Unit Economics Card */}
        <section className="rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/30 via-zinc-900 to-zinc-950 p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Industry Unit Economics
              </span>
              <h3 className="text-2xl font-bold text-white">
                The Financial Core Behind Profitability
              </h3>
              <p className="text-sm text-zinc-300">
                {sector.primeCostOrGrossMarginNote}. Contribution margins and monthly break-even volumes can be modeled with custom pricing in the spreadsheet.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-3 sm:grid-cols-4 text-xs">
                <div className="rounded-lg bg-zinc-900/80 p-2.5 border border-zinc-800">
                  <span className="text-zinc-500">Avg. Unit Value</span>
                  <div className="font-bold text-white mt-0.5">{sector.unitEconomics.pricePerUnit}</div>
                </div>
                <div className="rounded-lg bg-zinc-900/80 p-2.5 border border-zinc-800">
                  <span className="text-zinc-500">Direct COGS</span>
                  <div className="font-bold text-zinc-300 mt-0.5">{sector.unitEconomics.directCostPerUnit}</div>
                </div>
                <div className="rounded-lg bg-zinc-900/80 p-2.5 border border-zinc-800">
                  <span className="text-zinc-500">Contribution Margin</span>
                  <div className="font-bold text-emerald-400 mt-0.5">{sector.unitEconomics.contributionMargin}</div>
                </div>
                <div className="rounded-lg bg-zinc-900/80 p-2.5 border border-zinc-800">
                  <span className="text-zinc-500">Est. Payback Period</span>
                  <div className="font-bold text-white mt-0.5">{sector.unitEconomics.paybackPeriod}</div>
                </div>
              </div>
            </div>

            <div className="shrink-0 flex flex-col gap-2">
              <CheckoutButton
                sectorSlug={sector.slug}
                plan="single"
                label="Download Single Model ($29)"
              />
              <span className="text-[11px] text-zinc-500 text-center">
                Excel (.xlsx) + Google Sheets One-Click Access
              </span>
            </div>
          </div>
        </section>

        {/* 5. Big Bundle Order Bump Banner */}
        <section className="rounded-2xl border-2 border-emerald-500/50 bg-gradient-to-b from-emerald-950/40 via-zinc-900 to-zinc-950 p-8 text-center relative overflow-hidden">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300 mb-3">
            <Sparkles className="h-4 w-4" />
            <span>Most Popular Option for Founders</span>
          </div>
          <h2 className="text-2xl font-black text-white sm:text-4xl">
            Get All 48 Industry Financial Models for One Price
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-zinc-300 sm:text-base">
            Instead of purchasing just {sector.name} for $29; <strong>unlock all 48 industries, investor pitch deck slides, and lifetime updates for only $49</strong>.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>48 Distinct Excel & Sheets Workbooks</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Investor Pitch Deck Financial Slides</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Free Lifetime Future Model Updates</span>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <CheckoutButton
              sectorSlug={sector.slug}
              plan="bundle"
              variant="bundle"
              label="Download All 48 Models for $49 (Lifetime)"
            />
          </div>
        </section>

        {/* 6. Frequently Asked Questions */}
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 md:p-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-2">
            <HelpCircle className="h-4 w-4" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-6">
            Everything You Need to Know About {sector.name} Financial Model
          </h2>
          <div className="space-y-4">
            {sector.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-4 md:p-5"
              >
                <h4 className="text-sm font-bold text-zinc-100 flex items-start gap-2">
                  <span className="text-emerald-400 font-mono">Q:</span>
                  <span>{faq.question}</span>
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400 pl-5">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Internal Linking / Explore Other Sectors */}
        <section className="border-t border-zinc-800/80 pt-10">
          <h3 className="text-lg font-bold text-white mb-4">
            Explore Other Industry Financial Models
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            {relatedSectors.map((rel) => (
              <Link
                key={rel.slug}
                href={`/${rel.slug}`}
                className="group rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 transition-all hover:border-emerald-500/40 hover:bg-zinc-900"
              >
                <div className="text-xs font-semibold text-emerald-400">{rel.industry}</div>
                <div className="mt-1 text-sm font-bold text-zinc-200 group-hover:text-white flex items-center justify-between">
                  <span>{rel.name}</span>
                  <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-400" />
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] text-zinc-500">
                  <span>Y1 Revenue: {rel.typicalY1Revenue}</span>
                  <span className="font-semibold text-zinc-400">Excel + Sheets</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
