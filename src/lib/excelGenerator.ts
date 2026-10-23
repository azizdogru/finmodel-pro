import * as XLSX from 'xlsx';
import { SectorData } from '@/types';

export function generateSectorWorkbook(sector: SectorData): Uint8Array {
  const wb = XLSX.utils.book_new();

  // 1. Sheet: Executive Summary & Dashboard
  const summaryData = [
    ['FINANCIAL MODEL & 3-YEAR PRO FORMA DASHBOARD', '', '', ''],
    ['Business Sector:', sector.name, '', ''],
    ['Industry Benchmark:', sector.industry, '', ''],
    ['Underwriting Standard:', sector.badge, '', ''],
    ['Target Breakeven:', sector.breakevenMonth, '', ''],
    ['Initial Startup CapEx Range:', sector.initialCapexRange, '', ''],
    ['', '', '', ''],
    ['ANNUAL FINANCIAL SUMMARY', 'Year 1', 'Year 2', 'Year 3'],
    [
      'Gross Revenue',
      sector.proFormaYears[0].revenue,
      sector.proFormaYears[1].revenue,
      sector.proFormaYears[2].revenue,
    ],
    [
      'Cost of Goods Sold (COGS)',
      sector.proFormaYears[0].cogs,
      sector.proFormaYears[1].cogs,
      sector.proFormaYears[2].cogs,
    ],
    [
      'Gross Profit',
      { f: 'B9-B10' },
      { f: 'C9-C10' },
      { f: 'D9-D10' },
    ],
    [
      'Gross Margin %',
      { f: 'B11/B9' },
      { f: 'C11/C9' },
      { f: 'D11/D9' },
    ],
    [
      'Operating Expenses (OPEX)',
      sector.proFormaYears[0].operatingExpenses,
      sector.proFormaYears[1].operatingExpenses,
      sector.proFormaYears[2].operatingExpenses,
    ],
    [
      'EBITDA',
      { f: 'B11-B13' },
      { f: 'C11-C13' },
      { f: 'D11-D13' },
    ],
    [
      'Income Tax Provision (21%)',
      { f: 'B14*0.21' },
      { f: 'C14*0.21' },
      { f: 'D14*0.21' },
    ],
    [
      'Net Profit / (Loss)',
      { f: 'B14-B15' },
      { f: 'C14-C15' },
      { f: 'D14-D15' },
    ],
    [
      'Net Profit Margin %',
      { f: 'B16/B9' },
      { f: 'C16/C9' },
      { f: 'D16/D9' },
    ],
    ['', '', '', ''],
    ['CORE UNIT ECONOMICS', 'Benchmark', 'Notes', ''],
    ['Average Price / Retainer', sector.unitEconomics.pricePerUnit, '', ''],
    ['Direct Cost per Unit', sector.unitEconomics.directCostPerUnit, '', ''],
    ['Contribution Margin', sector.unitEconomics.contributionMargin, '', ''],
    ['Monthly Break-Even Volume', sector.unitEconomics.breakevenVolume, '', ''],
    ['Est. Capital Payback Period', sector.unitEconomics.paybackPeriod, '', ''],
  ];

  const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(wb, wsSummary, 'Executive Summary');

  // 2. Sheet: Capital Expenditures (CapEx) Schedule
  const capexRows = [
    ['STARTUP CAPITAL EXPENDITURE (CAPEX) SCHEDULE', '', '', ''],
    ['Category', 'Line Item Name', 'Estimated Cost ($)', 'Operational Description & Specs'],
    ...sector.capexItems.map((item) => [
      item.category,
      item.name,
      item.estimatedCost,
      item.description,
    ]),
    ['', 'Total Initial Startup Capital Required', { f: `SUM(C3:C${sector.capexItems.length + 2})` }, 'Total pre-opening capex and buffer'],
  ];

  const wsCapex = XLSX.utils.aoa_to_sheet(capexRows);
  XLSX.utils.book_append_sheet(wb, wsCapex, 'CapEx Schedule');

  // 3. Sheet: Monthly Operating Expenses (OPEX)
  const opexRows = [
    ['MONTHLY OPERATIONAL OVERHEAD BREAKDOWN', '', ''],
    ['Expense Category', 'Monthly Budget ($)', 'Underwriting Notes'],
    ...sector.monthlyOpexItems.map((item) => [
      item.category,
      item.monthlyAmount,
      item.notes,
    ]),
    ['Total Monthly Fixed OPEX', { f: `SUM(B3:B${sector.monthlyOpexItems.length + 2})` }, 'Total cash outflow per month'],
    ['Annualized Fixed OPEX', { f: `B${sector.monthlyOpexItems.length + 3}*12` }, 'Yearly baseline operational burden'],
  ];

  const wsOpex = XLSX.utils.aoa_to_sheet(opexRows);
  XLSX.utils.book_append_sheet(wb, wsOpex, 'Monthly OPEX');

  // 4. Sheet: Revenue Streams Breakdown
  const revRows = [
    ['REVENUE STREAMS & PRODUCT MIX ASSUMPTIONS', '', ''],
    ['Revenue Stream', 'Sales Mix %', 'Description & Target Channel'],
    ...sector.revenueStreams.map((item) => [
      item.name,
      item.sharePercent / 100,
      item.description,
    ]),
  ];

  const wsRev = XLSX.utils.aoa_to_sheet(revRows);
  XLSX.utils.book_append_sheet(wb, wsRev, 'Revenue Mix');

  // Generate binary buffer
  const out = XLSX.write(wb, { type: 'array', bookType: 'xlsx' });
  return new Uint8Array(out);
}
