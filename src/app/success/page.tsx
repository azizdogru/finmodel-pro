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
  }, []);

  const handleClientDownload = (targetSector = sector) => {
    try {
      setDownloading(true);
      const buffer = generateSectorWorkbook(targetSector);
      const blob = new Blob([buffer as unknown as BlobPart], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${targetSector.slug}-financial-model.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download error, falling back to API:', err);
      window.location.href = `/api/download?sector=${targetSector.slug}`;
    } finally {
      setTimeout(() => setDownloading(false), 1000);
    }
  };

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
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={() => handleClientDownload(sector)}
            disabled={downloading}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-bold text-zinc-950 shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-75"
          >
            <Download className="h-4 w-4" />
            <span>
              {downloading ? 'Preparing Excel File...' : `Download Microsoft Excel (.xlsx)`}
            </span>
          </button>

          <a
            href="https://docs.google.com/spreadsheets/create"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800/80 px-6 py-3.5 text-sm font-semibold text-zinc-100 hover:bg-zinc-700 transition-all"
          >
            <FileSpreadsheet className="h-4 w-4 text-emerald-400" />
            <span>Open in Google Sheets</span>
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
