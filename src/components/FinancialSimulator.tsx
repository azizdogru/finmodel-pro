'use client';

import React, { useState } from 'react';
import { SectorData } from '@/types';
import {
  TrendingUp,
  DollarSign,
  Percent,
  Sliders,
  Sparkles,
  Download,
  CheckCircle2,
  Lock,
} from 'lucide-react';

interface Props {
  sector: SectorData;
  onUnlock?: () => void;
}

export default function FinancialSimulator({ sector, onUnlock }: Props) {
  const [unitPrice, setUnitPrice] = useState<number>(sector.averageTicketOrRetainer);
  const [volume, setVolume] = useState<number>(sector.defaultCustomerVolume);
  const [cogsPercent, setCogsPercent] = useState<number>(100 - sector.grossMarginBenchmark);
  const [monthlyOpex, setMonthlyOpex] = useState<number>(
    sector.monthlyOpexItems.reduce((acc, curr) => acc + curr.monthlyAmount, 0)
  );

  // Dynamic calculations based on user adjustments
  const isDaily = sector.volumeUnit.toLowerCase().includes('daily');
  const annualMultiplier = isDaily ? 350 : 12;

  const annualRevenueY1 = Math.round(unitPrice * volume * annualMultiplier);
  const annualRevenueY2 = Math.round(annualRevenueY1 * 1.28);
  const annualRevenueY3 = Math.round(annualRevenueY2 * 1.22);

  const directCostPerUnit = unitPrice * (cogsPercent / 100);
  const contributionMargin = unitPrice - directCostPerUnit;
  const grossProfitY1 = Math.round(annualRevenueY1 * ((100 - cogsPercent) / 100));

  const annualOpexY1 = monthlyOpex * 12;
  const ebitdaY1 = grossProfitY1 - annualOpexY1;
  const netIncomeY1 = Math.round(ebitdaY1 > 0 ? ebitdaY1 * 0.79 : ebitdaY1);
  const netMarginPercent = annualRevenueY1 > 0 ? Math.round((netIncomeY1 / annualRevenueY1) * 100) : 0;

  const monthlyBreakEvenUnits = contributionMargin > 0 ? Math.ceil(monthlyOpex / contributionMargin) : 0;

  return (
    <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-b from-zinc-900 to-zinc-950 p-6 shadow-2xl md:p-8">
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between border-b border-zinc-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
            <Sliders className="h-3.5 w-3.5" />
            Interactive Pro Forma Sandbox
          </div>
          <h3 className="mt-2 text-xl font-bold text-white md:text-2xl">
            Live Financial Model Preview ({sector.name})
          </h3>
          <p className="text-sm text-zinc-400">
            Tweak the assumptions below to see instant 3-year cash flow and break-even recalculations.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-zinc-800/60 px-4 py-2 text-xs text-zinc-300">
          <Sparkles className="h-4 w-4 text-emerald-400" />
          <span>Real-time formula recalculation</span>
        </div>
      </div>

      {/* Control Sliders Grid */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Slider 1: Unit Price / Ticket */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Avg. Price / Ticket</span>
            <span className="font-semibold text-emerald-400">
              ${unitPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <input
            type="range"
            min={Math.max(1, Math.round(sector.averageTicketOrRetainer * 0.4))}
            max={Math.round(sector.averageTicketOrRetainer * 2.5)}
            step={sector.averageTicketOrRetainer > 50 ? 5 : 0.25}
            value={unitPrice}
            onChange={(e) => setUnitPrice(parseFloat(e.target.value))}
            className="mt-3 w-full accent-emerald-500 cursor-pointer"
          />
          <div className="mt-1 flex justify-between text-[10px] text-zinc-500">
            <span>Conservative</span>
            <span>Optimistic</span>
          </div>
        </div>

        {/* Slider 2: Volume */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>{sector.volumeUnit}</span>
            <span className="font-semibold text-emerald-400">
              {volume.toLocaleString()} {isDaily ? '/ day' : '/ mo'}
            </span>
          </div>
          <input
            type="range"
            min={Math.max(5, Math.round(sector.defaultCustomerVolume * 0.4))}
            max={Math.round(sector.defaultCustomerVolume * 2.5)}
            step={1}
            value={volume}
            onChange={(e) => setVolume(parseInt(e.target.value, 10))}
            className="mt-3 w-full accent-emerald-500 cursor-pointer"
          />
          <div className="mt-1 flex justify-between text-[10px] text-zinc-500">
            <span>Ramping up</span>
            <span>Full capacity</span>
          </div>
        </div>

        {/* Slider 3: COGS % */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Direct COGS %</span>
            <span className="font-semibold text-emerald-400">{cogsPercent}%</span>
          </div>
          <input
            type="range"
            min={10}
            max={65}
            step={1}
            value={cogsPercent}
            onChange={(e) => setCogsPercent(parseInt(e.target.value, 10))}
            className="mt-3 w-full accent-emerald-500 cursor-pointer"
          />
          <div className="mt-1 flex justify-between text-[10px] text-zinc-500">
            <span>High efficiency (10%)</span>
            <span>Heavy costs (65%)</span>
          </div>
        </div>

        {/* Slider 4: Monthly OPEX */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Monthly Fixed OPEX</span>
            <span className="font-semibold text-emerald-400">${monthlyOpex.toLocaleString()} / mo</span>
          </div>
          <input
            type="range"
            min={Math.round(monthlyOpex * 0.5)}
            max={Math.round(monthlyOpex * 2.0)}
            step={250}
            value={monthlyOpex}
            onChange={(e) => setMonthlyOpex(parseInt(e.target.value, 10))}
            className="mt-3 w-full accent-emerald-500 cursor-pointer"
          />
          <div className="mt-1 flex justify-between text-[10px] text-zinc-500">
            <span>Lean team</span>
            <span>Expanded team</span>
          </div>
        </div>
      </div>

      {/* Output Metrics Matrix */}
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {/* Metric 1 */}
        <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/70 p-4">
          <span className="text-xs text-zinc-400">Year 1 Gross Revenue</span>
          <div className="mt-1 text-2xl font-black text-white">
            ${annualRevenueY1.toLocaleString()}
          </div>
          <div className="mt-1 text-xs text-emerald-400 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            <span>Y2: ${annualRevenueY2.toLocaleString()}</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/70 p-4">
          <span className="text-xs text-zinc-400">Year 1 Net Income</span>
          <div className={`mt-1 text-2xl font-black ${netIncomeY1 >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            ${netIncomeY1.toLocaleString()}
          </div>
          <span className="text-xs text-zinc-400">
            Net Margin: <strong className="text-white">{netMarginPercent}%</strong>
          </span>
        </div>

        {/* Metric 3 */}
        <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/70 p-4">
          <span className="text-xs text-zinc-400">Break-Even Threshold</span>
          <div className="mt-1 text-2xl font-black text-white">
            {monthlyBreakEvenUnits.toLocaleString()}
          </div>
          <span className="text-xs text-zinc-400">
            {sector.volumeUnit.toLowerCase()} / mo
          </span>
        </div>

        {/* Metric 4 */}
        <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/70 p-4">
          <span className="text-xs text-zinc-400">Contribution Margin</span>
          <div className="mt-1 text-2xl font-black text-emerald-400">
            ${contributionMargin.toFixed(2)}
          </div>
          <span className="text-xs text-zinc-400">
            {100 - cogsPercent}% gross margin
          </span>
        </div>
      </div>

      {/* Visual Pro Forma Bar Comparison */}
      <div className="mt-8 rounded-xl border border-zinc-800/80 bg-zinc-950/90 p-5">
        <div className="flex items-center justify-between text-xs text-zinc-400 pb-3 border-b border-zinc-800">
          <span className="font-semibold text-zinc-300">3-Year Scaled Pro Forma Waterfall</span>
          <span className="text-emerald-400">Includes 28% Y2 & 22% Y3 compound expansion</span>
        </div>

        <div className="mt-4 space-y-3">
          {/* Year 1 */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium text-zinc-300">Year 1 Pro Forma</span>
              <span className="font-bold text-white">${annualRevenueY1.toLocaleString()}</span>
            </div>
            <div className="h-3 w-full rounded-full bg-zinc-800 overflow-hidden flex">
              <div
                style={{ width: `${100 - cogsPercent}%` }}
                className="bg-emerald-500 h-full"
                title="Gross Profit"
              />
              <div
                style={{ width: `${cogsPercent}%` }}
                className="bg-zinc-600 h-full"
                title="Cost of Goods"
              />
            </div>
          </div>

          {/* Year 2 */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium text-zinc-300">Year 2 Pro Forma</span>
              <span className="font-bold text-white">${annualRevenueY2.toLocaleString()}</span>
            </div>
            <div className="h-3 w-full rounded-full bg-zinc-800 overflow-hidden flex">
              <div
                style={{ width: `${Math.min(100, (100 - cogsPercent) * 1.15)}%` }}
                className="bg-emerald-500 h-full"
                title="Gross Profit"
              />
              <div
                style={{ width: `${Math.max(0, 100 - (100 - cogsPercent) * 1.15)}%` }}
                className="bg-zinc-600 h-full"
                title="Cost of Goods"
              />
            </div>
          </div>

          {/* Year 3 */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium text-zinc-300">Year 3 Pro Forma</span>
              <span className="font-bold text-white">${annualRevenueY3.toLocaleString()}</span>
            </div>
            <div className="h-3 w-full rounded-full bg-zinc-800 overflow-hidden flex">
              <div
                style={{ width: `${Math.min(100, (100 - cogsPercent) * 1.25)}%` }}
                className="bg-emerald-500 h-full"
                title="Gross Profit"
              />
              <div
                style={{ width: `${Math.max(0, 100 - (100 - cogsPercent) * 1.25)}%` }}
                className="bg-zinc-600 h-full"
                title="Cost of Goods"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-[11px] text-zinc-400 border-t border-zinc-800/80 pt-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Gross Profit Share</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-zinc-600" />
            <span>Direct Cost of Goods (COGS)</span>
          </div>
          <div className="ml-auto text-zinc-500">
            *All calculations auto-export to the unlocked Excel file
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-5 sm:flex-row">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
            <Lock className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">
              Unlock Full 36-Month Model (Excel + Google Sheets)
            </div>
            <div className="text-xs text-zinc-400">
              Get all dynamic formulas, monthly cash flow waterfall, CapEx schedule, and investor pitch deck charts.
            </div>
          </div>
        </div>

        <button
          onClick={onUnlock}
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold text-zinc-950 shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-400 hover:scale-[1.02] active:scale-[0.98]"
        >
          <Download className="h-4 w-4" />
          <span>Download Excel Model ($29)</span>
        </button>
      </div>
    </div>
  );
}
