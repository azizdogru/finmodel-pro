import ExcelJS from 'exceljs';
import { SectorData } from '@/types';

export async function generateSectorWorkbook(sector: SectorData): Promise<Uint8Array> {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'FinModel Pro - Institutional Wall Street Edition';
  wb.lastModifiedBy = 'FinModel Pro Engine';
  wb.created = new Date();
  wb.modified = new Date();

  // Institutional Color Palette
  const colors = {
    primaryNavy: 'FF0F172A',      // Slate 900
    secondaryNavy: 'FF1E293B',    // Slate 800
    brandBlue: 'FF1E40AF',        // Blue 800
    accentEmerald: 'FF059669',    // Emerald 600
    darkEmerald: 'FF065F46',      // Emerald 800
    lightBg: 'FFF8FAFC',          // Slate 50
    zebraBg: 'FFF1F5F9',          // Slate 100
    headerText: 'FFFFFFFF',       // White
    subtleBorder: 'FFE2E8F0',     // Slate 200
    darkBorder: 'FF94A3B8',       // Slate 400
  };

  const headerFont: Partial<ExcelJS.Font> = {
    name: 'Calibri',
    size: 11,
    bold: true,
    color: { argb: colors.headerText },
  };

  const titleFont: Partial<ExcelJS.Font> = {
    name: 'Calibri',
    size: 14,
    bold: true,
    color: { argb: colors.headerText },
  };

  const boldFont: Partial<ExcelJS.Font> = {
    name: 'Calibri',
    size: 11,
    bold: true,
    color: { argb: 'FF0F172A' },
  };

  const regularFont: Partial<ExcelJS.Font> = {
    name: 'Calibri',
    size: 11,
    color: { argb: 'FF1E293B' },
  };

  const italicFont: Partial<ExcelJS.Font> = {
    name: 'Calibri',
    size: 10,
    italic: true,
    color: { argb: 'FF64748B' },
  };

  const thinBorder: Partial<ExcelJS.Borders> = {
    top: { style: 'thin', color: { argb: colors.subtleBorder } },
    bottom: { style: 'thin', color: { argb: colors.subtleBorder } },
    left: { style: 'thin', color: { argb: colors.subtleBorder } },
    right: { style: 'thin', color: { argb: colors.subtleBorder } },
  };

  const summaryDoubleBottomBorder: Partial<ExcelJS.Borders> = {
    top: { style: 'thin', color: { argb: colors.darkBorder } },
    bottom: { style: 'double', color: { argb: 'FF0F172A' } },
    left: { style: 'thin', color: { argb: colors.subtleBorder } },
    right: { style: 'thin', color: { argb: colors.subtleBorder } },
  };

  // Helper: Format Sheet Title
  const applySheetBanner = (ws: ExcelJS.Worksheet, title: string, colSpan: string) => {
    ws.mergeCells(colSpan);
    const titleCell = ws.getCell(colSpan.split(':')[0]);
    titleCell.value = title;
    titleCell.font = titleFont;
    titleCell.alignment = { vertical: 'middle', horizontal: 'center' };
    titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.primaryNavy } };
    ws.getRow(1).height = 36;
  };

  // ==========================================
  // SHEET 1: EXECUTIVE SUMMARY & DASHBOARD
  // ==========================================
  const wsSummary = wb.addWorksheet('Executive Summary', { views: [{ showGridLines: true }] });
  applySheetBanner(wsSummary, '3-YEAR FINANCIAL PRO FORMA & EXECUTIVE DASHBOARD', 'A1:D1');

  const metaItems = [
    ['Business Sector:', sector.name],
    ['Industry Benchmark:', sector.industry],
    ['Underwriting Standard:', sector.badge],
    ['Target Breakeven:', sector.breakevenMonth],
    ['Initial Startup CapEx Range:', sector.initialCapexRange],
  ];

  metaItems.forEach((item, idx) => {
    const rowNum = idx + 2;
    const cellA = wsSummary.getCell(`A${rowNum}`);
    const cellB = wsSummary.getCell(`B${rowNum}`);
    cellA.value = item[0];
    cellA.font = boldFont;
    cellA.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.lightBg } };
    cellB.value = item[1];
    cellB.font = regularFont;
    wsSummary.mergeCells(`B${rowNum}:D${rowNum}`);
    wsSummary.getRow(rowNum).height = 20;
  });

  const tableHeaderRow = 8;
  const headers = ['Financial Line Item', 'Year 1 (Base)', 'Year 2 (Growth)', 'Year 3 (Mature)'];
  headers.forEach((h, idx) => {
    const cell = wsSummary.getRow(tableHeaderRow).getCell(idx + 1);
    cell.value = h;
    cell.font = headerFont;
    cell.alignment = { vertical: 'middle', horizontal: idx === 0 ? 'left' : 'right' };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.secondaryNavy } };
  });
  wsSummary.getRow(tableHeaderRow).height = 26;

  // Connected dynamically to the 36-Month Cash Flow Sheet for Year 1!
  const pnlRows: Array<{ label: string; y1: any; y2: any; y3: any; isTotal?: boolean; format?: string }> = [
    {
      label: 'Gross Revenue',
      y1: { formula: "'36-Month Cash Flow'!N3" }, // Sum of Months 1-12
      y2: sector.proFormaYears[1].revenue,
      y3: sector.proFormaYears[2].revenue,
      format: '$#,##0',
    },
    {
      label: 'Cost of Goods Sold (COGS)',
      y1: { formula: "'36-Month Cash Flow'!N4" }, // Sum of COGS M1-12
      y2: sector.proFormaYears[1].cogs,
      y3: sector.proFormaYears[2].cogs,
      format: '$#,##0',
    },
    {
      label: 'Gross Profit',
      y1: { formula: 'B9-B10' },
      y2: { formula: 'C9-C10' },
      y3: { formula: 'D9-D10' },
      isTotal: true,
      format: '$#,##0',
    },
    {
      label: 'Gross Profit Margin %',
      y1: { formula: 'B11/B9' },
      y2: { formula: 'C11/C9' },
      y3: { formula: 'D11/D9' },
      format: '0.0%',
    },
    {
      label: 'Operating Expenses (Staffing & Fixed Overhead OPEX)',
      y1: { formula: "'36-Month Cash Flow'!N8" }, // Total Operating Expenses M1-12
      y2: sector.proFormaYears[1].operatingExpenses,
      y3: sector.proFormaYears[2].operatingExpenses,
      format: '$#,##0',
    },
    {
      label: 'Operating Income / EBITDA',
      y1: { formula: 'B11-B13' },
      y2: { formula: 'C11-C13' },
      y3: { formula: 'D11-D13' },
      isTotal: true,
      format: '$#,##0',
    },
    {
      label: 'Income Tax Provision (Federal & State ~21%)',
      y1: { formula: 'MAX(0, B14*0.21)' },
      y2: { formula: 'MAX(0, C14*0.21)' },
      y3: { formula: 'MAX(0, D14*0.21)' },
      format: '$#,##0',
    },
    {
      label: 'Net Profit / (Net Cash Flow)',
      y1: { formula: 'B14-B15' },
      y2: { formula: 'C14-C15' },
      y3: { formula: 'D14-D15' },
      isTotal: true,
      format: '$#,##0',
    },
    {
      label: 'Net Profit Margin %',
      y1: { formula: 'B16/B9' },
      y2: { formula: 'C16/C9' },
      y3: { formula: 'D16/D9' },
      format: '0.0%',
    },
  ];

  pnlRows.forEach((r, idx) => {
    const rowNum = 9 + idx;
    const row = wsSummary.getRow(rowNum);
    row.height = 22;

    row.getCell(1).value = r.label;
    row.getCell(2).value = r.y1;
    row.getCell(3).value = r.y2;
    row.getCell(4).value = r.y3;

    for (let c = 1; c <= 4; c++) {
      const cell = row.getCell(c);
      cell.font = r.isTotal ? boldFont : regularFont;
      cell.border = r.isTotal ? summaryDoubleBottomBorder : thinBorder;
      if (c > 1 && r.format) {
        cell.numFmt = r.format;
        cell.alignment = { horizontal: 'right', vertical: 'middle' };
      }
      if (r.isTotal) {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.zebraBg } };
      }
    }
  });

  // Unit Economics
  const ueHeaderRow = 19;
  wsSummary.mergeCells(`A${ueHeaderRow}:D${ueHeaderRow}`);
  const ueHeaderCell = wsSummary.getCell(`A${ueHeaderRow}`);
  ueHeaderCell.value = 'CORE UNIT ECONOMICS & UNDERWRITING BENCHMARKS';
  ueHeaderCell.font = headerFont;
  ueHeaderCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.brandBlue } };
  ueHeaderCell.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
  wsSummary.getRow(ueHeaderRow).height = 24;

  const ueItems = [
    ['Average Price / Retainer Ticket', sector.unitEconomics.pricePerUnit, 'Typical customer transaction value'],
    ['Direct Cost per Unit (COGS)', sector.unitEconomics.directCostPerUnit, 'Variable cost of fulfillment per transaction'],
    ['Contribution Margin per Sale', sector.unitEconomics.contributionMargin, 'Revenue less direct variable cost'],
    ['Monthly Break-Even Volume', sector.unitEconomics.breakevenVolume, 'Minimum transactions to cover fixed burn'],
    ['Est. Capital Payback Period', sector.unitEconomics.paybackPeriod, 'Expected cash investment recovery runway'],
  ];

  ueItems.forEach((item, idx) => {
    const rowNum = ueHeaderRow + 1 + idx;
    const row = wsSummary.getRow(rowNum);
    row.height = 20;
    row.getCell(1).value = item[0];
    row.getCell(1).font = boldFont;
    row.getCell(2).value = item[1];
    row.getCell(2).font = regularFont;
    row.getCell(3).value = item[2];
    row.getCell(3).font = italicFont;
    wsSummary.mergeCells(`C${rowNum}:D${rowNum}`);

    for (let c = 1; c <= 4; c++) {
      row.getCell(c).border = thinBorder;
    }
  });

  wsSummary.columns = [{ width: 44 }, { width: 22 }, { width: 22 }, { width: 24 }];

  // ==========================================
  // SHEET 2: 36-MONTH CASH FLOW STATEMENT (Aylık Nakit Akışı)
  // ==========================================
  const wsCashFlow = wb.addWorksheet('36-Month Cash Flow', { views: [{ showGridLines: true }] });
  applySheetBanner(wsCashFlow, '36-MONTH DETAILED CASH FLOW PROJECTION (YEAR 1 MONTHLY BREAKDOWN & YEARS 2-3)', 'A1:P1');

  // Month Headers: A (Line Item), B..M (Month 1 - Month 12), N (Year 1 Total), O (Year 2), P (Year 3)
  const cfHeaders = [
    'Cash Flow Line Item',
    'M1 (Launch)', 'M2', 'M3', 'M4', 'M5', 'M6 (BE)',
    'M7', 'M8', 'M9', 'M10', 'M11', 'M12',
    'Year 1 Total', 'Year 2 Total', 'Year 3 Total',
  ];

  cfHeaders.forEach((h, idx) => {
    const cell = wsCashFlow.getRow(2).getCell(idx + 1);
    cell.value = h;
    cell.font = headerFont;
    cell.alignment = { vertical: 'middle', horizontal: idx === 0 ? 'left' : 'right' };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: idx >= 13 ? colors.brandBlue : colors.secondaryNavy },
    };
  });
  wsCashFlow.getRow(2).height = 26;

  // Monthly Ramp-up Curve (Month 1 starts at ramp factor, ramp to 100% by month 12)
  const y1Rev = sector.proFormaYears[0].revenue;
  const cogsMargin = sector.proFormaYears[0].cogs / y1Rev;
  const monthlyRampWeights = [0.045, 0.055, 0.065, 0.075, 0.082, 0.088, 0.092, 0.095, 0.098, 0.100, 0.102, 0.103];

  // Cash Flow Lines
  const cfRows = [
    {
      rowNum: 3,
      label: 'Cash Inflow: Gross Revenue',
      formulaGenerator: (colLetter: string) => Math.round(y1Rev * monthlyRampWeights[cfColIndex(colLetter)]),
      format: '$#,##0',
    },
    {
      rowNum: 4,
      label: 'Direct COGS & Merchant Fees',
      formulaGenerator: (colLetter: string) => `ROUND(${colLetter}3*${cogsMargin.toFixed(3)}, 0)`,
      format: '$#,##0',
    },
    {
      rowNum: 5,
      label: 'Gross Cash Profit',
      formulaGenerator: (colLetter: string) => `${colLetter}3-${colLetter}4`,
      isTotal: true,
      format: '$#,##0',
    },
    {
      rowNum: 6,
      label: 'Staffing & Payroll Outflow',
      formulaGenerator: (colLetter: string) => `'Staffing & Payroll'!C10`, // Linked to staffing sheet monthly total!
      format: '$#,##0',
    },
    {
      rowNum: 7,
      label: 'Facility, Marketing & Fixed OPEX',
      formulaGenerator: (colLetter: string) => `'Monthly OPEX'!B${sector.monthlyOpexItems.length + 3}`, // Linked to OPEX sheet
      format: '$#,##0',
    },
    {
      rowNum: 8,
      label: 'Total Monthly Operating Outflows',
      formulaGenerator: (colLetter: string) => `${colLetter}6+${colLetter}7`,
      isTotal: true,
      format: '$#,##0',
    },
    {
      rowNum: 9,
      label: 'SBA Debt Service (Principal & Interest)',
      formulaGenerator: (colLetter: string) => `'SBA Loan Schedule'!B8`, // Linked to SBA schedule monthly payment
      format: '$#,##0',
    },
    {
      rowNum: 10,
      label: 'Net Monthly Operating Cash Flow',
      formulaGenerator: (colLetter: string) => `${colLetter}5-${colLetter}8-${colLetter}9`,
      isTotal: true,
      format: '$#,##0',
    },
  ];

  function cfColIndex(letter: string): number {
    return letter.charCodeAt(0) - 'B'.charCodeAt(0);
  }

  const monthCols = ['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];

  cfRows.forEach((r) => {
    const row = wsCashFlow.getRow(r.rowNum);
    row.height = 22;
    row.getCell(1).value = r.label;
    row.getCell(1).font = r.isTotal ? boldFont : regularFont;

    // Fill Months 1-12
    monthCols.forEach((col) => {
      const cell = row.getCell(col);
      const val = r.formulaGenerator(col);
      if (typeof val === 'number') {
        cell.value = val;
      } else {
        cell.value = { formula: val };
      }
    });

    // Year 1 Total (Sum of B to M)
    const cellY1 = row.getCell('N');
    cellY1.value = { formula: `SUM(B${r.rowNum}:M${r.rowNum})` };

    // Year 2 & Year 3 estimates based on proForma
    const cellY2 = row.getCell('O');
    const cellY3 = row.getCell('P');

    if (r.rowNum === 3) {
      cellY2.value = sector.proFormaYears[1].revenue;
      cellY3.value = sector.proFormaYears[2].revenue;
    } else if (r.rowNum === 4) {
      cellY2.value = sector.proFormaYears[1].cogs;
      cellY3.value = sector.proFormaYears[2].cogs;
    } else if (r.rowNum === 5) {
      cellY2.value = { formula: 'O3-O4' };
      cellY3.value = { formula: 'P3-P4' };
    } else if (r.rowNum === 6) {
      cellY2.value = { formula: 'N6*1.08' }; // 8% staff growth
      cellY3.value = { formula: 'O6*1.08' };
    } else if (r.rowNum === 7) {
      cellY2.value = { formula: 'N7*1.05' }; // 5% inflation
      cellY3.value = { formula: 'O7*1.05' };
    } else if (r.rowNum === 8) {
      cellY2.value = { formula: 'O6+O7' };
      cellY3.value = { formula: 'P6+P7' };
    } else if (r.rowNum === 9) {
      cellY2.value = { formula: 'N9' }; // Fixed loan payment
      cellY3.value = { formula: 'N9' };
    } else if (r.rowNum === 10) {
      cellY2.value = { formula: 'O5-O8-O9' };
      cellY3.value = { formula: 'P5-P8-P9' };
    }

    for (let c = 1; c <= 16; c++) {
      const cell = row.getCell(c);
      cell.border = r.isTotal ? summaryDoubleBottomBorder : thinBorder;
      if (c > 1) {
        cell.numFmt = r.format;
        cell.alignment = { horizontal: 'right', vertical: 'middle' };
      }
      if (r.isTotal) {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.zebraBg } };
      }
    }
  });

  wsCashFlow.columns = [
    { width: 34 },
    ...Array(12).fill({ width: 14 }),
    { width: 16 },
    { width: 16 },
    { width: 16 },
  ];

  // ==========================================
  // SHEET 3: STAFFING & PAYROLL MATRIX (Kadro & Maaşlar)
  // ==========================================
  const wsStaff = wb.addWorksheet('Staffing & Payroll', { views: [{ showGridLines: true }] });
  applySheetBanner(wsStaff, 'ORGANIZATIONAL HEADCOUNT & COMPREHENSIVE PAYROLL MATRIX', 'A1:E1');

  const staffHeaders = ['Role / Position Title', 'Headcount (FTE)', 'Hourly / Base Pay ($)', 'Monthly Total Burden ($)', 'Role Description & Shift Notes'];
  staffHeaders.forEach((h, idx) => {
    const cell = wsStaff.getRow(2).getCell(idx + 1);
    cell.value = h;
    cell.font = headerFont;
    cell.alignment = { vertical: 'middle', horizontal: idx === 1 || idx === 2 || idx === 3 ? 'right' : 'left' };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.secondaryNavy } };
  });
  wsStaff.getRow(2).height = 26;

  // Sector standard staffing assumptions
  const staffingData = [
    { title: 'General Manager / Operating Partner', fte: 1, base: 4500, notes: 'Full operational oversight, inventory ordering, schedule planning' },
    { title: 'Lead Shift Supervisor / Senior Specialist', fte: 1, base: 3200, notes: 'Keyholder, cash reconciliation, quality control & customer service' },
    { title: 'Full-Time Team Members / Core Staff', fte: 2, base: 2600, notes: 'Direct customer service, fulfillment, daily maintenance' },
    { title: 'Part-Time Support / Peak-Hour Staff', fte: 3, base: 1400, notes: 'Weekend rushes, evening shifts, sanitation & restocking' },
  ];

  staffingData.forEach((pos, idx) => {
    const rowNum = 3 + idx;
    const row = wsStaff.getRow(rowNum);
    row.height = 22;

    row.getCell(1).value = pos.title;
    row.getCell(1).font = boldFont;

    row.getCell(2).value = pos.fte;
    row.getCell(2).alignment = { horizontal: 'right', vertical: 'middle' };

    row.getCell(3).value = pos.base;
    row.getCell(3).numFmt = '$#,##0';
    row.getCell(3).alignment = { horizontal: 'right', vertical: 'middle' };

    row.getCell(4).value = { formula: `B${rowNum}*C${rowNum}` };
    row.getCell(4).font = boldFont;
    row.getCell(4).numFmt = '$#,##0';
    row.getCell(4).alignment = { horizontal: 'right', vertical: 'middle' };

    row.getCell(5).value = pos.notes;
    row.getCell(5).font = italicFont;

    for (let c = 1; c <= 5; c++) {
      row.getCell(c).border = thinBorder;
      if (idx % 2 === 1) {
        row.getCell(c).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.lightBg } };
      }
    }
  });

  // Payroll Taxes & Benefits (Taxes ~ 15% burden)
  const taxRowNum = 3 + staffingData.length;
  const taxRow = wsStaff.getRow(taxRowNum);
  taxRow.height = 22;
  taxRow.getCell(1).value = 'Payroll Taxes, FICA, Workers Comp & Benefits (~15%)';
  taxRow.getCell(1).font = boldFont;
  taxRow.getCell(4).value = { formula: `SUM(D3:D${taxRowNum - 1})*0.15` };
  taxRow.getCell(4).font = boldFont;
  taxRow.getCell(4).numFmt = '$#,##0';
  taxRow.getCell(4).alignment = { horizontal: 'right', vertical: 'middle' };
  taxRow.getCell(5).value = 'Employer payroll taxes, state disability & general benefits burden';
  taxRow.getCell(5).font = italicFont;
  for (let c = 1; c <= 5; c++) {
    taxRow.getCell(c).border = thinBorder;
  }

  // Total Staffing Row
  const totalStaffRowNum = taxRowNum + 2;
  const totalStaffRow = wsStaff.getRow(totalStaffRowNum);
  totalStaffRow.height = 26;
  totalStaffRow.getCell(1).value = 'TOTAL MONTHLY FULLY-BURDENED PAYROLL';
  totalStaffRow.getCell(1).font = boldFont;

  totalStaffRow.getCell(2).value = { formula: `SUM(B3:B${taxRowNum - 1})` };
  totalStaffRow.getCell(2).font = boldFont;
  totalStaffRow.getCell(2).alignment = { horizontal: 'right', vertical: 'middle' };

  totalStaffRow.getCell(3).value = 'Monthly:';
  totalStaffRow.getCell(3).font = boldFont;
  totalStaffRow.getCell(3).alignment = { horizontal: 'right', vertical: 'middle' };

  const cellTotalPayroll = totalStaffRow.getCell(4);
  cellTotalPayroll.value = { formula: `SUM(D3:D${taxRowNum})` };
  cellTotalPayroll.font = boldFont;
  cellTotalPayroll.numFmt = '$#,##0';
  cellTotalPayroll.alignment = { horizontal: 'right', vertical: 'middle' };

  totalStaffRow.getCell(5).value = 'Piped dynamically into 36-Month Cash Flow Model';
  totalStaffRow.getCell(5).font = italicFont;

  for (let c = 1; c <= 5; c++) {
    totalStaffRow.getCell(c).border = summaryDoubleBottomBorder;
    totalStaffRow.getCell(c).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.zebraBg } };
  }

  // Annualized Staff Burden
  const annualStaffRowNum = totalStaffRowNum + 1;
  const annualStaffRow = wsStaff.getRow(annualStaffRowNum);
  annualStaffRow.height = 24;
  annualStaffRow.getCell(1).value = 'ANNUALIZED PAYROLL EXPENSE (YEAR 1)';
  annualStaffRow.getCell(1).font = boldFont;
  annualStaffRow.getCell(4).value = { formula: `D${totalStaffRowNum}*12` };
  annualStaffRow.getCell(4).font = boldFont;
  annualStaffRow.getCell(4).numFmt = '$#,##0';
  annualStaffRow.getCell(4).alignment = { horizontal: 'right', vertical: 'middle' };
  annualStaffRow.getCell(5).value = 'Baseline 12-month staffing cost';
  annualStaffRow.getCell(5).font = italicFont;

  for (let c = 1; c <= 5; c++) {
    annualStaffRow.getCell(c).border = summaryDoubleBottomBorder;
    annualStaffRow.getCell(c).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.zebraBg } };
  }

  wsStaff.columns = [
    { width: 42 },
    { width: 18 },
    { width: 22 },
    { width: 26 },
    { width: 56 },
  ];

  // ==========================================
  // SHEET 4: SBA 7(a) LOAN AMORTIZATION SCHEDULE
  // ==========================================
  const wsLoan = wb.addWorksheet('SBA Loan Schedule', { views: [{ showGridLines: true }] });
  applySheetBanner(wsLoan, 'SBA 7(a) COMMERCIAL LOAN UNDERWRITING & AMORTIZATION CALCULATOR', 'A1:D1');

  const loanInputs = [
    ['Total Project Financing Needed ($)', 150000, '$#,##0', 'Total startup capital required'],
    ['Borrower Equity Injection (%)', 0.20, '0.0%', 'Typical required down payment (10%-20%)'],
    ['Net SBA Loan Principal ($)', { formula: 'B2*(1-B3)' }, '$#,##0', 'Financed amount guaranteed by SBA'],
    ['Annual Interest Rate (Prime + Spread)', 0.105, '0.00%', 'WSJ Prime + 2.75% commercial spread'],
    ['Loan Term (Years)', 10, '0', 'Standard SBA working capital & equipment term'],
    ['Total Payments (Months)', { formula: 'B6*12' }, '0', '120 monthly amortization cycles'],
    ['Est. Monthly Payment (P&I)', { formula: 'PMT(B5/12, B7, -B4)' }, '$#,##0', 'Monthly debt service requirement'],
    ['Annual Debt Service ($)', { formula: 'B8*12' }, '$#,##0', 'Annual debt obligation'],
    ['Required DSCR Benchmark', 1.25, '0.00x', 'Minimum Debt Service Coverage Ratio required by lenders'],
  ];

  loanInputs.forEach((item, idx) => {
    const rowNum = 2 + idx;
    const row = wsLoan.getRow(rowNum);
    row.height = 22;

    row.getCell(1).value = item[0];
    row.getCell(1).font = boldFont;

    const cellVal = row.getCell(2);
    cellVal.value = item[1];
    cellVal.font = boldFont;
    cellVal.numFmt = item[2];
    cellVal.alignment = { horizontal: 'right', vertical: 'middle' };

    row.getCell(3).value = item[3];
    row.getCell(3).font = italicFont;
    wsLoan.mergeCells(`C${rowNum}:D${rowNum}`);

    for (let c = 1; c <= 4; c++) {
      row.getCell(c).border = idx === 6 || idx === 7 ? summaryDoubleBottomBorder : thinBorder;
      if (idx === 6 || idx === 7) {
        row.getCell(c).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.zebraBg } };
      }
    }
  });

  wsLoan.columns = [{ width: 38 }, { width: 22 }, { width: 30 }, { width: 30 }];

  // ==========================================
  // SHEET 5: STARTUP CAPEX SCHEDULE
  // ==========================================
  const wsCapex = wb.addWorksheet('CapEx Schedule', { views: [{ showGridLines: true }] });
  applySheetBanner(wsCapex, 'STARTUP CAPITAL EXPENDITURE (CAPEX) & ASSET SCHEDULE', 'A1:D1');

  const capexHeaders = ['Category', 'Line Item / Asset Description', 'Estimated Cost ($)', 'Operational Description & Vendor Specs'];
  capexHeaders.forEach((h, idx) => {
    const cell = wsCapex.getRow(2).getCell(idx + 1);
    cell.value = h;
    cell.font = headerFont;
    cell.alignment = { vertical: 'middle', horizontal: idx === 2 ? 'right' : 'left' };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.secondaryNavy } };
  });
  wsCapex.getRow(2).height = 26;

  sector.capexItems.forEach((item, idx) => {
    const rowNum = 3 + idx;
    const row = wsCapex.getRow(rowNum);
    row.height = 22;

    row.getCell(1).value = item.category;
    row.getCell(1).font = boldFont;

    row.getCell(2).value = item.name;
    row.getCell(2).font = regularFont;

    const cellCost = row.getCell(3);
    cellCost.value = item.estimatedCost;
    cellCost.font = boldFont;
    cellCost.numFmt = '$#,##0';
    cellCost.alignment = { horizontal: 'right', vertical: 'middle' };

    row.getCell(4).value = item.description;
    row.getCell(4).font = italicFont;

    for (let c = 1; c <= 4; c++) {
      row.getCell(c).border = thinBorder;
      if (idx % 2 === 1) {
        row.getCell(c).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.lightBg } };
      }
    }
  });

  const totalCapexRowNum = 3 + sector.capexItems.length;
  const capexTotalRow = wsCapex.getRow(totalCapexRowNum);
  capexTotalRow.height = 26;
  capexTotalRow.getCell(2).value = 'TOTAL INITIAL CAPITAL REQUIRED';
  capexTotalRow.getCell(2).font = boldFont;

  const capexTotalSumCell = capexTotalRow.getCell(3);
  capexTotalSumCell.value = { formula: `SUM(C3:C${totalCapexRowNum - 1})` };
  capexTotalSumCell.font = boldFont;
  capexTotalSumCell.numFmt = '$#,##0';
  capexTotalSumCell.alignment = { horizontal: 'right', vertical: 'middle' };

  capexTotalRow.getCell(4).value = 'Pre-opening capital investment + buffer reserve';
  capexTotalRow.getCell(4).font = italicFont;

  for (let c = 1; c <= 4; c++) {
    capexTotalRow.getCell(c).border = summaryDoubleBottomBorder;
    capexTotalRow.getCell(c).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.zebraBg } };
  }

  wsCapex.columns = [{ width: 26 }, { width: 44 }, { width: 24 }, { width: 60 }];

  // ==========================================
  // SHEET 6: MONTHLY OPERATING EXPENSES (OPEX)
  // ==========================================
  const wsOpex = wb.addWorksheet('Monthly OPEX', { views: [{ showGridLines: true }] });
  applySheetBanner(wsOpex, 'MONTHLY FIXED & RECURRING OVERHEAD BUDGET (OPEX)', 'A1:C1');

  const opexHeaders = ['Expense Category', 'Monthly Allocation ($)', 'Underwriting & Budget Notes'];
  opexHeaders.forEach((h, idx) => {
    const cell = wsOpex.getRow(2).getCell(idx + 1);
    cell.value = h;
    cell.font = headerFont;
    cell.alignment = { vertical: 'middle', horizontal: idx === 1 ? 'right' : 'left' };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.secondaryNavy } };
  });
  wsOpex.getRow(2).height = 26;

  sector.monthlyOpexItems.forEach((item, idx) => {
    const rowNum = 3 + idx;
    const row = wsOpex.getRow(rowNum);
    row.height = 22;

    row.getCell(1).value = item.category;
    row.getCell(1).font = boldFont;

    const cellAmount = row.getCell(2);
    cellAmount.value = item.monthlyAmount;
    cellAmount.font = boldFont;
    cellAmount.numFmt = '$#,##0';
    cellAmount.alignment = { horizontal: 'right', vertical: 'middle' };

    row.getCell(3).value = item.notes;
    row.getCell(3).font = regularFont;

    for (let c = 1; c <= 3; c++) {
      row.getCell(c).border = thinBorder;
      if (idx % 2 === 1) {
        row.getCell(c).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.lightBg } };
      }
    }
  });

  const totalOpexRowNum = 3 + sector.monthlyOpexItems.length;
  const monthlySumRow = wsOpex.getRow(totalOpexRowNum);
  monthlySumRow.height = 24;
  monthlySumRow.getCell(1).value = 'TOTAL MONTHLY NON-PAYROLL OVERHEAD';
  monthlySumRow.getCell(1).font = boldFont;

  const cellMonthlySum = monthlySumRow.getCell(2);
  cellMonthlySum.value = { formula: `SUM(B3:B${totalOpexRowNum - 1})` };
  cellMonthlySum.font = boldFont;
  cellMonthlySum.numFmt = '$#,##0';
  cellMonthlySum.alignment = { horizontal: 'right', vertical: 'middle' };

  monthlySumRow.getCell(3).value = 'Base fixed monthly burn rate excluding staff';
  monthlySumRow.getCell(3).font = italicFont;

  for (let c = 1; c <= 3; c++) {
    monthlySumRow.getCell(c).border = thinBorder;
    monthlySumRow.getCell(c).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.zebraBg } };
  }

  const annualOpexRowNum = totalOpexRowNum + 1;
  const annualSumRow = wsOpex.getRow(annualOpexRowNum);
  annualSumRow.height = 26;
  annualSumRow.getCell(1).value = 'ANNUALIZED OVERHEAD BURDEN';
  annualSumRow.getCell(1).font = boldFont;

  const cellAnnualSum = annualSumRow.getCell(2);
  cellAnnualSum.value = { formula: `B${totalOpexRowNum}*12` };
  cellAnnualSum.font = boldFont;
  cellAnnualSum.numFmt = '$#,##0';
  cellAnnualSum.alignment = { horizontal: 'right', vertical: 'middle' };

  annualSumRow.getCell(3).value = 'Linked dynamically to Executive Dashboard and Cash Flow';
  annualSumRow.getCell(3).font = italicFont;

  for (let c = 1; c <= 3; c++) {
    annualSumRow.getCell(c).border = summaryDoubleBottomBorder;
    annualSumRow.getCell(c).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.zebraBg } };
  }

  wsOpex.columns = [{ width: 38 }, { width: 26 }, { width: 68 }];

  // ==========================================
  // SHEET 7: REVENUE MIX & CHANNELS
  // ==========================================
  const wsRev = wb.addWorksheet('Revenue Mix', { views: [{ showGridLines: true }] });
  applySheetBanner(wsRev, 'REVENUE STREAM ARCHITECTURE & SALES MIX ASSUMPTIONS', 'A1:C1');

  const revHeaders = ['Revenue Stream', 'Sales Mix %', 'Channel Strategy & Pricing Dynamics'];
  revHeaders.forEach((h, idx) => {
    const cell = wsRev.getRow(2).getCell(idx + 1);
    cell.value = h;
    cell.font = headerFont;
    cell.alignment = { vertical: 'middle', horizontal: idx === 1 ? 'right' : 'left' };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.secondaryNavy } };
  });
  wsRev.getRow(2).height = 26;

  sector.revenueStreams.forEach((item, idx) => {
    const rowNum = 3 + idx;
    const row = wsRev.getRow(rowNum);
    row.height = 22;

    row.getCell(1).value = item.name;
    row.getCell(1).font = boldFont;

    const cellMix = row.getCell(2);
    cellMix.value = item.sharePercent / 100;
    cellMix.font = boldFont;
    cellMix.numFmt = '0.0%';
    cellMix.alignment = { horizontal: 'right', vertical: 'middle' };

    row.getCell(3).value = item.description;
    row.getCell(3).font = regularFont;

    for (let c = 1; c <= 3; c++) {
      row.getCell(c).border = thinBorder;
      if (idx % 2 === 1) {
        row.getCell(c).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.lightBg } };
      }
    }
  });

  const totalRevRowNum = 3 + sector.revenueStreams.length;
  const revTotalRow = wsRev.getRow(totalRevRowNum);
  revTotalRow.height = 24;
  revTotalRow.getCell(1).value = 'TOTAL TARGET SALES ALLOCATION';
  revTotalRow.getCell(1).font = boldFont;

  const cellRevTotal = revTotalRow.getCell(2);
  cellRevTotal.value = { formula: `SUM(B3:B${totalRevRowNum - 1})` };
  cellRevTotal.font = boldFont;
  cellRevTotal.numFmt = '0.0%';
  cellRevTotal.alignment = { horizontal: 'right', vertical: 'middle' };

  revTotalRow.getCell(3).value = 'Baseline revenue split percentage';
  revTotalRow.getCell(3).font = italicFont;

  for (let c = 1; c <= 3; c++) {
    revTotalRow.getCell(c).border = summaryDoubleBottomBorder;
    revTotalRow.getCell(c).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.zebraBg } };
  }

  wsRev.columns = [{ width: 42 }, { width: 22 }, { width: 68 }];

  const buffer = await wb.xlsx.writeBuffer();
  return new Uint8Array(buffer);
}
