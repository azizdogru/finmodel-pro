'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { SECTORS } from '@/data/sectors';
import {
  Search,
  Filter,
  ArrowRight,
  Download,
  Building2,
  TrendingUp,
  FileSpreadsheet,
  CheckCircle2,
} from 'lucide-react';

export default function SectorGrid() {
  const [search, setSearch] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');

  // Extract unique industries
  const industries = useMemo(() => {
    const set = new Set<string>();
    SECTORS.forEach((s) => set.add(s.industry));
    return ['All', ...Array.from(set)];
  }, []);

  // Filter sectors
  const filteredSectors = useMemo(() => {
    return SECTORS.filter((s) => {
      const matchesIndustry =
        selectedIndustry === 'All' || s.industry === selectedIndustry;
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.industry.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q));
      return matchesIndustry && matchesSearch;
    });
  }, [search, selectedIndustry]);

  return (
    <div className="space-y-8">
      {/* Search & Category Filter Bar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search industry or model (e.g. Coffee Shop, Gym, MedSpa, SaaS, Airbnb)..."
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 py-2.5 pl-10 pr-4 text-xs text-zinc-100 placeholder-zinc-500 shadow-inner focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-zinc-300"
            >
              Clear
            </button>
          )}
        </div>

        {/* Industry Pill Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {industries.map((ind) => (
            <button
              key={ind}
              onClick={() => setSelectedIndustry(ind)}
              className={`rounded-lg px-3 py-1.5 font-medium transition-all shrink-0 ${
                selectedIndustry === ind
                  ? 'bg-emerald-500 text-zinc-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
              }`}
            >
              {ind === 'All' ? 'All Industries (48)' : ind}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-zinc-500">
        <span>
          Showing <strong>{filteredSectors.length}</strong> financial model templates
        </span>
        <span>Format: Microsoft Excel (.xlsx) + Google Sheets</span>
      </div>

      {/* Grid of Sector Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredSectors.map((sector) => (
          <div
            key={sector.slug}
            className="group relative flex flex-col justify-between rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-5 transition-all hover:border-emerald-500/50 hover:bg-zinc-900/90 hover:shadow-xl hover:shadow-emerald-500/5"
          >
            <div>
              {/* Top Meta */}
              <div className="flex items-center justify-between text-[11px]">
                <span className="rounded bg-emerald-500/10 px-2 py-0.5 font-semibold text-emerald-400 border border-emerald-500/20">
                  {sector.industry}
                </span>
                <span className="text-zinc-500 font-mono text-[10px]">
                  {sector.breakevenMonth} Breakeven
                </span>
              </div>

              {/* Title */}
              <h3 className="mt-3 text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                <Link href={`/${sector.slug}`}>
                  {sector.name}
                </Link>
              </h3>

              {/* Description preview */}
              <p className="mt-2 text-xs leading-relaxed text-zinc-400 line-clamp-2">
                {sector.heroSubtitle}
              </p>

              {/* Key Metrics Grid */}
              <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl bg-zinc-950/70 p-2.5 border border-zinc-800/60 text-center">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-zinc-500">Y1 Target Rev</span>
                  <div className="font-mono text-xs font-bold text-zinc-200">{sector.typicalY1Revenue}</div>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-zinc-500">Gross Margin</span>
                  <div className="font-mono text-xs font-bold text-emerald-400">{sector.grossMarginBenchmark}%</div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-5 flex items-center justify-between border-t border-zinc-800/80 pt-3">
              <span className="text-xs font-bold text-white">
                $29 <span className="text-[10px] font-normal text-zinc-400">/ single model</span>
              </span>

              <Link
                href={`/${sector.slug}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 group-hover:translate-x-0.5 transition-transform"
              >
                <span>View & Download</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
