'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  LineChart,
  FileSpreadsheet,
  ShieldCheck,
  Sparkles,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';

interface Props {
  onOpenCheckout?: (plan?: string) => void;
}

export default function Navbar({ onOpenCheckout }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <LineChart className="h-5 w-5 text-zinc-950 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-extrabold tracking-tight text-white">
                FinModel<span className="text-emerald-400">Pro</span>
              </span>
              <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                Excel & Sheets
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 -mt-0.5">3-Year Industry Financial Models</p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-300">
          <Link
            href="/#sectors"
            className="hover:text-emerald-400 transition-colors"
          >
            48 Industry Models
          </Link>
          <Link
            href="/#features"
            className="hover:text-emerald-400 transition-colors"
          >
            Bank & SBA Standard
          </Link>
          <Link
            href="/#pricing"
            className="hover:text-emerald-400 transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/#faq"
            className="hover:text-emerald-400 transition-colors"
          >
            FAQ
          </Link>
        </div>

        {/* Desktop CTA Action */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => onOpenCheckout ? onOpenCheckout('single') : (window.location.href = '/#sectors')}
            className="rounded-lg border border-zinc-700/80 bg-zinc-900 px-3.5 py-2 text-xs font-semibold text-zinc-200 hover:border-zinc-500 hover:bg-zinc-800 transition-all"
          >
            Single Model ($29)
          </button>
          <button
            onClick={() => onOpenCheckout ? onOpenCheckout('bundle') : (window.location.href = '/#pricing')}
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-bold text-zinc-950 shadow-md shadow-emerald-500/20 hover:bg-emerald-400 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>All-Access Bundle ($49)</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg border border-zinc-800 p-2 text-zinc-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-zinc-950 px-4 py-4 space-y-3">
          <Link
            href="/#sectors"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-zinc-300 hover:text-emerald-400"
          >
            48 Industry Models
          </Link>
          <Link
            href="/#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-zinc-300 hover:text-emerald-400"
          >
            Bank & SBA Standard
          </Link>
          <Link
            href="/#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-zinc-300 hover:text-emerald-400"
          >
            Pricing
          </Link>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenCheckout) onOpenCheckout('bundle');
              }}
              className="w-full text-center rounded-lg bg-emerald-500 py-2.5 text-xs font-bold text-zinc-950"
            >
              Get All 48 Models Bundle ($49)
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
