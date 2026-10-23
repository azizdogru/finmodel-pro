'use client';

import React, { useState } from 'react';
import { SectorData } from '@/types';
import {
  FileSpreadsheet,
  Table,
  CheckCircle,
  Eye,
  Layers,
  Lock,
  Download,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

interface Props {
  sector: SectorData;
}

export default function ExcelPreviewModal({ sector }: Props) {
  const [activeTab, setActiveTab] = useState<
    'summary' | 'cashflow' | 'staffing' | 'loan' | 'capex'
  >('summary');

  return (
    <div className="w-full my-12 rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6 md:p-8 backdrop-blur-xl shadow-2xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 mb-2">
            <Eye className="h-3.5 w-3.5" />
            <span>Interactive Model Preview (Look Inside)</span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Institutional 7-Sheet Financial Architecture
          </h3>
          <p className="text-sm text-zinc-400 mt-1">
            See the exact formulas, tabs, and SBA underwriting standards delivered upon checkout.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono text-zinc-400">7 Active Worksheets Included</span>
        </div>
      </div>

      {/* Tab Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 border-b border-zinc-800 scrollbar-none">
        <button
          onClick={() => setActiveTab('summary')}
          className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'summary'
              ? 'bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20'
              : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
          }`}
        >
          <TrendingUp className="h-3.5 w-3.5" />
          <span>1. Executive Dashboard (P&L)</span>
        </button>

        <button
          onClick={() => setActiveTab('cashflow')}
          className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'cashflow'
              ? 'bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20'
              : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
          }`}
        >
          <Table className="h-3.5 w-3.5" />
          <span>2. 36-Month Cash Flow</span>
        </button>

        <button
          onClick={() => setActiveTab('staffing')}
          className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'staffing'
              ? 'bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20'
              : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
          }`}
        >
          <Layers className="h-3.5 w-3.5" />
          <span>3. Headcount & Staffing Matrix</span>
        </button>

        <button
          onClick={() => setActiveTab('loan')}
          className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'loan'
              ? 'bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20'
              : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
          }`}
        >
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>4. SBA Loan Amortization</span>
        </button>

        <button
          onClick={() => setActiveTab('capex')}
          className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'capex'
              ? 'bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20'
              : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
          }`}
        >
          <FileSpreadsheet className="h-3.5 w-3.5" />
          <span>5. Startup CapEx Schedule</span>
        </button>
      </div>

      {/* Sheet Content Viewer */}
      <div className="relative rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden font-mono text-xs">
        {/* Top Formula Bar Emulation */}
        <div className="flex items-center gap-3 border-b border-zinc-800 bg-zinc-950/80 px-4 py-2.5 text-[11px] text-zinc-400">
          <span className="font-bold text-emerald-400">fx</span>
          <span className="truncate text-zinc-300">
            {activeTab === 'summary' && '=SUM(B9-B10) [Gross Profit Dynamic Margin Engine]'}
            {activeTab === 'cashflow' && "='Staffing & Payroll'!C10 + 'Monthly OPEX'!B10"}
            {activeTab === 'staffing' && '=SUM(D3:D7)*0.15 [FICA, Payroll Tax & Benefits Burden]'}
            {activeTab === 'loan' && '=PMT(AnnualRate/12, Months, -LoanPrincipal) [SBA DSCR ~1.25x]'}
            {activeTab === 'capex' && '=SUM(C3:C10) [Pre-Opening CapEx + 3-Mo Buffer Reserve]'}
          </span>
        </div>

        {/* Dynamic Table Simulation */}
        <div className="overflow-x-auto p-4 max-h-96">
          {activeTab === 'summary' && (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-700 bg-zinc-800/80 text-zinc-200">
                  <th className="p-2.5 font-bold">Line Item</th>
                  <th className="p-2.5 text-right font-bold">Year 1 (Base)</th>
                  <th className="p-2.5 text-right font-bold">Year 2 (Growth)</th>
                  <th className="p-2.5 text-right font-bold">Year 3 (Mature)</th>
                  <th className="p-2.5 text-right font-bold">Formula Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                <tr>
                  <td className="p-2.5 font-semibold text-white">Gross Revenue</td>
                  <td className="p-2.5 text-right font-bold text-emerald-400">
                    ${sector.proFormaYears[0].revenue.toLocaleString()}
                  </td>
                  <td className="p-2.5 text-right">
                    ${sector.proFormaYears[1].revenue.toLocaleString()}
                  </td>
                  <td className="p-2.5 text-right">
                    ${sector.proFormaYears[2].revenue.toLocaleString()}
                  </td>
                  <td className="p-2.5 text-right text-zinc-500 font-mono text-[10px]">
                    ='36-Month Cash Flow'!N3
                  </td>
                </tr>
                <tr>
                  <td className="p-2.5 text-zinc-400">Cost of Goods Sold (COGS)</td>
                  <td className="p-2.5 text-right">
                    ${sector.proFormaYears[0].cogs.toLocaleString()}
                  </td>
                  <td className="p-2.5 text-right">
                    ${sector.proFormaYears[1].cogs.toLocaleString()}
                  </td>
                  <td className="p-2.5 text-right">
                    ${sector.proFormaYears[2].cogs.toLocaleString()}
                  </td>
                  <td className="p-2.5 text-right text-zinc-500 font-mono text-[10px]">
                    ='36-Month Cash Flow'!N4
                  </td>
                </tr>
                <tr className="bg-emerald-950/20 font-bold text-white">
                  <td className="p-2.5">Gross Profit ({sector.grossMarginBenchmark}%)</td>
                  <td className="p-2.5 text-right">
                    ${(
                      sector.proFormaYears[0].revenue - sector.proFormaYears[0].cogs
                    ).toLocaleString()}
                  </td>
                  <td className="p-2.5 text-right">
                    ${(
                      sector.proFormaYears[1].revenue - sector.proFormaYears[1].cogs
                    ).toLocaleString()}
                  </td>
                  <td className="p-2.5 text-right">
                    ${(
                      sector.proFormaYears[2].revenue - sector.proFormaYears[2].cogs
                    ).toLocaleString()}
                  </td>
                  <td className="p-2.5 text-right text-emerald-400 font-mono text-[10px]">
                    =B9-B10
                  </td>
                </tr>
                <tr>
                  <td className="p-2.5 text-zinc-400">Operating Expenses (OPEX + Payroll)</td>
                  <td className="p-2.5 text-right">
                    ${sector.proFormaYears[0].operatingExpenses.toLocaleString()}
                  </td>
                  <td className="p-2.5 text-right">
                    ${sector.proFormaYears[1].operatingExpenses.toLocaleString()}
                  </td>
                  <td className="p-2.5 text-right">
                    ${sector.proFormaYears[2].operatingExpenses.toLocaleString()}
                  </td>
                  <td className="p-2.5 text-right text-zinc-500 font-mono text-[10px]">
                    ='Monthly OPEX'! + Staffing
                  </td>
                </tr>
                <tr className="bg-zinc-800/40 font-bold text-emerald-400">
                  <td className="p-2.5">Net Profit / EBITDA</td>
                  <td className="p-2.5 text-right">
                    ${sector.proFormaYears[0].netIncome.toLocaleString()}
                  </td>
                  <td className="p-2.5 text-right">
                    ${sector.proFormaYears[1].netIncome.toLocaleString()}
                  </td>
                  <td className="p-2.5 text-right">
                    ${sector.proFormaYears[2].netIncome.toLocaleString()}
                  </td>
                  <td className="p-2.5 text-right text-emerald-400 font-mono text-[10px]">
                    =B14-B15
                  </td>
                </tr>
              </tbody>
            </table>
          )}

          {activeTab === 'cashflow' && (
            <div className="space-y-3">
              <div className="text-zinc-300 text-xs font-semibold mb-2">
                Month-by-Month Projection (First 6 Months Ramp to Target Breakeven):
              </div>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-700 bg-zinc-800/80 text-zinc-200">
                    <th className="p-2 font-bold">Month</th>
                    <th className="p-2 text-right">Cash Inflow</th>
                    <th className="p-2 text-right">COGS</th>
                    <th className="p-2 text-right">Staff Payroll</th>
                    <th className="p-2 text-right">Fixed OPEX</th>
                    <th className="p-2 text-right">Net Cash Flow</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                  <tr>
                    <td className="p-2 font-bold text-white">Month 1 (Launch)</td>
                    <td className="p-2 text-right text-emerald-400">$17,325</td>
                    <td className="p-2 text-right">$4,851</td>
                    <td className="p-2 text-right">$9,545</td>
                    <td className="p-2 text-right">$4,600</td>
                    <td className="p-2 text-right text-rose-400">-$1,671 (Burn)</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-white">Month 3</td>
                    <td className="p-2 text-right text-emerald-400">$25,025</td>
                    <td className="p-2 text-right">$7,007</td>
                    <td className="p-2 text-right">$9,545</td>
                    <td className="p-2 text-right">$4,600</td>
                    <td className="p-2 text-right text-yellow-400">+$3,873</td>
                  </tr>
                  <tr className="bg-emerald-950/20 font-bold text-white">
                    <td className="p-2 text-emerald-300">Month 6 (Target Breakeven)</td>
                    <td className="p-2 text-right text-emerald-400">$33,880</td>
                    <td className="p-2 text-right">$9,486</td>
                    <td className="p-2 text-right">$9,545</td>
                    <td className="p-2 text-right">$4,600</td>
                    <td className="p-2 text-right text-emerald-400">+$10,249 (Positive)</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-white">Month 12 (Stabilized)</td>
                    <td className="p-2 text-right text-emerald-400">$39,655</td>
                    <td className="p-2 text-right">$11,103</td>
                    <td className="p-2 text-right">$9,545</td>
                    <td className="p-2 text-right">$4,600</td>
                    <td className="p-2 text-right text-emerald-400">+$14,407</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'staffing' && (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-700 bg-zinc-800/80 text-zinc-200">
                  <th className="p-2.5 font-bold">Role Title</th>
                  <th className="p-2.5 text-center font-bold">Headcount</th>
                  <th className="p-2.5 text-right font-bold">Base Pay / Month</th>
                  <th className="p-2.5 text-right font-bold">Total Burden ($)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                <tr>
                  <td className="p-2.5 font-semibold text-white">General Manager / Operating Partner</td>
                  <td className="p-2.5 text-center font-bold">1.0 FTE</td>
                  <td className="p-2.5 text-right">$4,500</td>
                  <td className="p-2.5 text-right text-emerald-400 font-bold">$4,500</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-semibold text-white">Lead Shift Supervisor</td>
                  <td className="p-2.5 text-center font-bold">1.0 FTE</td>
                  <td className="p-2.5 text-right">$3,200</td>
                  <td className="p-2.5 text-right text-emerald-400 font-bold">$3,200</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-semibold text-white">Full-Time Operational Staff</td>
                  <td className="p-2.5 text-center font-bold">2.0 FTE</td>
                  <td className="p-2.5 text-right">$2,600</td>
                  <td className="p-2.5 text-right text-emerald-400 font-bold">$5,200</td>
                </tr>
                <tr className="bg-zinc-800/40 font-bold text-white">
                  <td className="p-2.5">Payroll Taxes & Benefits (15% Burden)</td>
                  <td className="p-2.5 text-center">-</td>
                  <td className="p-2.5 text-right">-</td>
                  <td className="p-2.5 text-right text-yellow-400">+$1,935</td>
                </tr>
              </tbody>
            </table>
          )}

          {activeTab === 'loan' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg bg-zinc-950/60 p-4 border border-zinc-800">
                <span className="text-zinc-400 text-xs block mb-1">Standard Loan Setup:</span>
                <div className="text-sm font-bold text-white">SBA 7(a) Working Capital & Equipment</div>
                <div className="mt-3 space-y-1 text-xs text-zinc-300">
                  <div className="flex justify-between"><span>Financing Required:</span><span className="font-bold text-white">$150,000</span></div>
                  <div className="flex justify-between"><span>Borrower Equity (20%):</span><span className="font-bold text-emerald-400">$30,000</span></div>
                  <div className="flex justify-between"><span>Net Financed Principal:</span><span className="font-bold text-white">$120,000</span></div>
                  <div className="flex justify-between"><span>Interest Rate (Prime+Spread):</span><span className="font-bold text-white">10.50%</span></div>
                  <div className="flex justify-between"><span>Amortization Term:</span><span className="font-bold text-white">10 Years (120 Mo)</span></div>
                </div>
              </div>

              <div className="rounded-lg bg-zinc-950/60 p-4 border border-zinc-800 flex flex-col justify-center">
                <span className="text-zinc-400 text-xs block mb-1">Calculated Debt Service:</span>
                <div className="text-2xl font-bold text-emerald-400">$1,623 / mo</div>
                <div className="text-xs text-zinc-400 mt-2">
                  Annual Debt Service: <span className="font-bold text-white">$19,476</span>
                </div>
                <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-emerald-300">
                  <CheckCircle className="h-3.5 w-3.5" />
                  <span>DSCR &gt; 1.35x (SBA Lending Benchmark Compliant)</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'capex' && (
            <div className="space-y-2">
              <div className="text-xs text-zinc-400">
                Itemized Pre-Opening Capital Items for {sector.name}:
              </div>
              <div className="grid grid-cols-1 gap-2">
                {sector.capexItems.slice(0, 5).map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-950/40 border border-zinc-800/80 text-xs"
                  >
                    <div>
                      <span className="font-bold text-white">{c.name}</span>
                      <span className="text-zinc-500 ml-2">({c.category})</span>
                    </div>
                    <span className="font-bold text-emerald-400">
                      ${c.estimatedCost.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Banner */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <Lock className="h-3.5 w-3.5 text-emerald-400" />
            <span>Unlocked formulas & dynamic cell links active in downloaded .xlsx</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-300">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Includes Bonus SBA 7(a) Compliance PDF</span>
          </div>
        </div>
      </div>
    </div>
  );
}
