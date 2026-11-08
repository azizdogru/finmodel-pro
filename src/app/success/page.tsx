'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { SECTOR_MAP, SECTORS } from '@/data/sectors';
import { generateSectorWorkbook } from '@/lib/excelGenerator';
import {
  CheckCircle2,
  Download,
  FileSpreadsheet,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Copy,
  Check,
  Loader2,
} from 'lucide-react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const urlToken = searchParams.get('token') || '';
  const orderParam = searchParams.get('order') || searchParams.get('order_id') || searchParams.get('checkout_id') || '';

  const [activeToken, setActiveToken] = useState(() => {
    if (urlToken) {
      if (typeof window !== 'undefined') {
        try { localStorage.setItem('fmp_download_token', urlToken); } catch {}
      }
      return urlToken;
    }
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('fmp_download_token');
        if (saved) return saved;
      } catch {}
    }
    return '';
  });

  const hasAccess = Boolean(activeToken || orderParam);
  const token = activeToken || orderParam;
  const sectorSlug = searchParams.get('sector') || 'coffee-shop-financial-model-template';
  const plan = searchParams.get('plan') || 'single';

  const sector = SECTOR_MAP[sectorSlug] || SECTORS[0];
  const isBundle = plan === 'bundle';

  const [downloading, setDownloading] = useState(false);
  const [copiedLicense, setCopiedLicense] = useState(false);

  // Generate dynamic license key
  const licenseKey = `FMP-${sectorSlug.substring(0, 4).toUpperCase()}-${Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase()}-2026`;

  useEffect(() => {
    if (token) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10b981', '#14b8a6', '#06b6d4', '#3b82f6'],
        });
      } catch (e) {
        // ignore
      }
    }
  }, [token]);

  const handleStartCheckout = async () => {
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sectorSlug, plan: 'single' }),
      });
      const data = await res.json();
      if (data.url || data.checkoutUrl) {
        window.location.href = data.url || data.checkoutUrl;
      }
    } catch (e) {
      console.error(e);
      window.location.href = '/#pricing';
    }
  };

  const handleClientDownload = async (targetSector = sector) => {
    if (!hasAccess) {
      alert('Valid purchase session required. Please complete checkout to download.');
      return;
    }
    try {
      setDownloading(true);
      const tokenQuery = activeToken ? `&token=${encodeURIComponent(activeToken)}` : '';
      const orderQuery = orderParam ? `&order=${encodeURIComponent(orderParam)}` : '';
      window.location.href = `/api/download?sector=${targetSector.slug}${tokenQuery}${orderQuery}`;
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setTimeout(() => setDownloading(false), 1000);
    }
  };

  if (!hasAccess) {
    return (
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center text-white">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition mb-8"
        >
          <ArrowRight className="h-4 w-4 rotate-180" />
          <span>Back to FinModel Pro</span>
        </Link>

        <div className="rounded-3xl border border-amber-500/30 bg-slate-900/90 p-8 sm:p-12 shadow-2xl space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <ShieldCheck className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Purchase Verification Required
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Financial Model Access Protected
            </h1>
            <p className="text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
              No active purchase authorization was detected in this browser session. If you have already completed checkout, please click the download link in your confirmation email or unlock instant access below.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleStartCheckout}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-emerald-500/25 hover:from-emerald-400 hover:to-teal-500 transition active:scale-95"
            >
              <Download className="h-4 w-4" />
              <span>Unlock Financial Model ($29)</span>
            </button>
            <Link
              href="/#sectors"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:bg-slate-700 transition"
            >
              <span>Explore All 48 Industry Sectors</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const copyLicense = () => {
    navigator.clipboard.writeText(licenseKey);
    setCopiedLicense(true);
    setTimeout(() => setCopiedLicense(false), 2000);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-2xl border border-emerald-500/40 bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-950 p-8 shadow-2xl md:p-12 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
          <CheckCircle2 className="h-9 w-9 stroke-[2.5]" />
        </div>

        <span className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/20">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Payment Confirmed • Instant Access</span>
        </span>

        <h1 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
          Order Complete! Your Model is Ready
        </h1>

        <p className="mt-3 text-sm text-zinc-300">
          {isBundle
            ? 'All 48 Industry Financial Models & Master Dashboard Bundle are unlocked.'
            : `${sector.name} 3-Year Pro Forma Financial Model is ready for download.`}
        </p>

        {/* License Key Box */}
        <div className="mt-6 inline-flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-950/80 px-4 py-2 text-xs">
          <span className="text-zinc-500 font-mono">License Key:</span>
          <span className="font-mono font-bold text-emerald-400">{licenseKey}</span>
          <button
            onClick={copyLicense}
            className="text-zinc-400 hover:text-white transition-colors"
            title="Copy license key"
          >
            {copiedLicense ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>

        {/* Download Action Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row flex-wrap">
          <button
            onClick={() => handleClientDownload(sector)}
            disabled={downloading}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-bold text-zinc-950 shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-75"
          >
            <Download className="h-4 w-4" />
            <span>
              {downloading ? 'Preparing Excel File...' : `Download 7-Sheet Excel (.xlsx)`}
            </span>
          </button>

          <a
            href={`/api/download-checklist?sector=${sector.slug}`}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-950/30 px-6 py-3.5 text-sm font-bold text-emerald-300 hover:bg-emerald-900/40 transition-all shadow-md"
            title="Download the official SBA 7(a) Bank Underwriting Checklist in PDF format"
          >
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Download Bonus SBA 7(a) Checklist (.pdf)</span>
          </a>

          <a
            href="https://sheets.new"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800/80 px-6 py-3.5 text-sm font-semibold text-zinc-100 hover:bg-zinc-700 transition-all group"
            title="Open Google Sheets in 1-click and drag-and-drop the downloaded .xlsx file"
          >
            <FileSpreadsheet className="h-4 w-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span>Open in Google Sheets (sheets.new)</span>
            <ExternalLink className="h-3.5 w-3.5 text-zinc-400" />
          </a>
        </div>

        {/* If Bundle: List of All Sectors for 1-Click Download */}
        {isBundle && (
          <div className="mt-12 text-left border-t border-zinc-800 pt-8">
            <h3 className="text-base font-bold text-white mb-2">
              All 48 Industry Models in Your Bundle (One-Click Downloads):
            </h3>
            <p className="text-xs text-zinc-400 mb-4">
              Each file is pre-loaded with realistic revenue curves, CapEx items, and unlocked formulas:
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 max-h-96 overflow-y-auto pr-2">
              {SECTORS.map((s) => (
                <button
                  key={s.slug}
                  onClick={() => handleClientDownload(s)}
                  className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950/60 p-2.5 text-xs text-zinc-200 hover:border-emerald-500/40 hover:bg-zinc-900 transition-colors text-left"
                >
                  <span className="truncate pr-2 font-medium">{s.name}</span>
                  <Download className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Getting Started Guide */}
        <div className="mt-10 rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-5 text-left text-xs text-zinc-300">
          <h4 className="font-bold text-white mb-2 flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>How to Use Your Financial Model:</span>
          </h4>
          <ol className="list-decimal pl-5 space-y-1.5 text-zinc-400">
            <li>Open the downloaded <code>.xlsx</code> file in Microsoft Excel or import it directly into Google Drive.</li>
            <li>Fill in your custom local lease rates, payroll expectations, and ticket sizes in the Assumptions tab.</li>
            <li>All formulas, charts, P&L schedules, and EBITDA waterfalls will automatically recalculate.</li>
            <li>Export directly to PDF for bank loan applications, SBA 7(a) packages, or investor meetings.</li>
          </ol>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-emerald-400 transition-colors"
          >
            <span>Return to FinModelPro Homepage</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-16 px-4 sm:px-6 lg:px-8">
      <Suspense
        fallback={
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
          </div>
        }
      >
        <SuccessContent />
      </Suspense>
    </div>
  );
}
