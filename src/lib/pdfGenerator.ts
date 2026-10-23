import { jsPDF } from 'jspdf';
import { SectorData } from '@/types';

export function generateSbaChecklistPdf(sector: SectorData): Uint8Array {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 36;
  const contentWidth = pageWidth - margin * 2;

  // ----------------------------------------------------
  // PAGE 1: EXECUTIVE UNDERWRITING BRIEF & CORE METRICS
  // ----------------------------------------------------

  // Header Banner
  doc.setFillColor(15, 23, 42); // #0F172A (Navy)
  doc.rect(0, 0, pageWidth, 75, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.text('U.S. SBA 7(a) COMMERCIAL UNDERWRITING DOSSIER', margin, 32);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(148, 163, 184); // Slate 400
  doc.text(
    'STANDARD OPERATING PROCEDURE (SOP 50 10 7.1) | LENDER COMPLIANCE CHECKLIST',
    margin,
    47
  );
  doc.text(
    `Official Credit Submission Package for: ${sector.name} [SIC / NAICS Benchmark]`,
    margin,
    60
  );

  let y = 92;

  // Underwriting Highlights Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, y, contentWidth, 75, 4, 4, 'FD');

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text('1. CREDIT RATIOS & SECTOR UNDERWRITING BENCHMARKS', margin + 12, y + 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);

  doc.text(`• Industry Category: ${sector.industry}`, margin + 12, y + 34);
  doc.text(`• Typical CapEx Range: ${sector.initialCapexRange}`, margin + 12, y + 47);
  doc.text(`• Breakeven Target: ${sector.breakevenMonth}`, margin + 12, y + 60);

  doc.text(`• Target DSCR (Debt Service Coverage): 1.25x - 1.35x`, margin + 270, y + 34);
  doc.text(`• Minimum Equity Injection: 10% - 20% Verified Cash`, margin + 270, y + 47);
  doc.text(`• Benchmark Gross Margin: ${sector.grossMarginBenchmark}%`, margin + 270, y + 60);

  y += 92;

  // Phase 1
  const renderPhaseBox = (
    title: string,
    subtitle: string,
    items: Array<{ code: string; name: string; req: string }>
  ) => {
    doc.setFillColor(30, 41, 59); // Slate 800
    doc.rect(margin, y, contentWidth, 20, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(title.toUpperCase(), margin + 8, y + 14);

    y += 26;

    items.forEach((item) => {
      // Checkbox
      doc.setDrawColor(16, 185, 129);
      doc.setLineWidth(1);
      doc.rect(margin + 6, y - 8, 9, 9, 'D');

      doc.setTextColor(15, 23, 42);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.text(item.code, margin + 22, y);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(51, 65, 85);
      const titleLen = doc.getTextWidth(item.code + ' ');
      doc.text(`- ${item.name}`, margin + 22 + titleLen, y);

      y += 11;

      // Sub-note
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      const splitReq = doc.splitTextToSize(item.req, contentWidth - 30);
      doc.text(splitReq, margin + 22, y);
      y += splitReq.length * 9.5 + 4;
    });

    y += 4;
  };

  renderPhaseBox('Phase 1: Mandatory Federal SBA Documentation', 'Standard Government Forms', [
    {
      code: 'SBA Form 1919',
      name: 'Borrower Information Form',
      req: 'Must be completed and signed by all individuals owning 20% or more equity, including corporate officers and managing members.',
    },
    {
      code: 'SBA Form 413',
      name: 'Personal Financial Statement (PFS)',
      req: 'Detailed balance sheet of assets, real estate, liabilities, and liquid reserves dated within 90 days of application.',
    },
    {
      code: 'SBA Form 148 / 148R',
      name: 'Unconditional Personal Guarantee',
      req: 'Guarantees repayment of the debt obligation by all principal equity owners.',
    },
    {
      code: 'IRS Form 4506-C',
      name: 'Request for Transcript of Tax Return',
      req: 'Signed authorization enabling lender to reconcile filed returns directly with the Internal Revenue Service.',
    },
  ]);

  renderPhaseBox('Phase 2: Financial Projections & Feasibility Models', 'Cash Flow Validation', [
    {
      code: '3-Year Pro Forma P&L',
      name: `${sector.name} Standard Statement`,
      req: 'Annualized Gross Revenue, COGS, EBITDA, and Net Operating Income with written management assumption notes.',
    },
    {
      code: '36-Month Cash Flow',
      name: 'Month-by-Month Liquidity Projection',
      req: 'Demonstrating working capital adequacy through the initial cash-burn curve until Month 6 target breakeven.',
    },
    {
      code: 'DSCR Coverage Analysis',
      name: 'Debt Service Coverage Ratio Schedule',
      req: 'Verifying Net Operating Income / (Annual P&I Debt Service) remains comfortably above the mandatory 1.25x bank hurdle.',
    },
  ]);

  // Page 1 Footer
  doc.setFillColor(241, 245, 249);
  doc.rect(0, 805, pageWidth, 37, 'F');
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7);
  doc.text(
    'FinModel Pro Underwriting Dossier | Page 1 of 2 | Regulated under Federal SBA SOP 50 10 7.1',
    margin,
    822
  );

  // ----------------------------------------------------
  // PAGE 2: ASSET SCHEDULE, LEASES & CLOSING CONDITIONS
  // ----------------------------------------------------
  doc.addPage();

  // Header Banner Page 2
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 55, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('SECTION II: COLLATERAL, REAL ESTATE & CLOSING PROTOCOLS', margin, 32);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text(
    `Pre-Closing Audit Verification Matrix for ${sector.name}`,
    margin,
    45
  );

  y = 75;

  renderPhaseBox('Phase 3: Real Estate, Facility Leases & Permits', 'Physical Location Compliance', [
    {
      code: 'Commercial Lease Agreement',
      name: 'Executed Facility Lease or LOI',
      req: 'Must match or exceed the loan amortization duration (e.g. 10-year term or 5-year initial + multiple 5-year options).',
    },
    {
      code: 'SBA Landlord Waiver',
      name: 'Landlord Subordination Agreement',
      req: 'Required agreement granting the bank access to leased real estate to inspect or liquidate financed assets and equipment.',
    },
    {
      code: 'Local Zoning & Permits',
      name: 'Municipal & Health Department Certifications',
      req: 'Zoning clearance, building occupancy permits, environmental review (Phase 1 ESA), and sector trade licenses.',
    },
  ]);

  renderPhaseBox('Phase 4: CapEx Invoices & Equity Injection Verification', 'Use of Proceeds', [
    {
      code: 'CapEx Equipment Invoices',
      name: 'Vendor Itemized Quotes & Purchase Orders',
      req: `Written invoices verifying itemized CapEx asset purchases matching the ${sector.initialCapexRange} project schedule.`,
    },
    {
      code: 'Proof of Equity Injection',
      name: 'Source of Down Payment Verification',
      req: 'Minimum 2-3 months bank account statements proving unencumbered, seasoned funds (no unapproved secondary debt).',
    },
    {
      code: 'Comprehensive Insurance',
      name: 'Hazard, Liability & Key-Person Life Coverage',
      req: 'Commercial general liability, business interruption insurance, and key-person life policy with Lender Loss Payable endorsement.',
    },
  ]);

  // Closing Sign-Off Box
  y += 10;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, y, contentWidth, 80, 4, 4, 'FD');

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('OFFICER SUBMISSION ACKNOWLEDGMENT', margin + 12, y + 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text(
    'I hereby certify that all financial statements, pro forma forecasts, and statutory attachments submitted herewith',
    margin + 12,
    y + 32
  );
  doc.text(
    'are accurate and comply with federal guidelines. Financial schedules match the FinModel Pro master workbook.',
    margin + 12,
    y + 44
  );

  // Signature Lines
  doc.setDrawColor(148, 163, 184);
  doc.line(margin + 12, y + 68, margin + 180, y + 68);
  doc.text('Managing Principal / Owner Signature', margin + 12, y + 76);

  doc.line(margin + 260, y + 68, margin + 428, y + 68);
  doc.text('Date of Submission', margin + 260, y + 76);

  // Page 2 Footer
  doc.setFillColor(241, 245, 249);
  doc.rect(0, 805, pageWidth, 37, 'F');
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7);
  doc.text(
    'FinModel Pro Underwriting Dossier | Page 2 of 2 | Commercial Credit Evaluation Instrument',
    margin,
    822
  );

  const arrayBuffer = doc.output('arraybuffer');
  return new Uint8Array(arrayBuffer);
}
