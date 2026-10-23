import { NextResponse } from 'next/server';
import { SECTOR_MAP } from '@/data/sectors';
import { generateSbaChecklistPdf } from '@/lib/pdfGenerator';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sectorSlug = searchParams.get('sector');

    if (!sectorSlug || !SECTOR_MAP[sectorSlug]) {
      return NextResponse.json(
        { error: 'Valid sector slug is required' },
        { status: 400 }
      );
    }

    const sector = SECTOR_MAP[sectorSlug];
    const pdfBytes = generateSbaChecklistPdf(sector);

    const safeFilename = `${sector.slug}-SBA-7a-compliance-checklist.pdf`;

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${safeFilename}"`,
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('PDF Download error:', error);
    return NextResponse.json(
      { error: 'Failed to generate SBA Checklist PDF' },
      { status: 500 }
    );
  }
}
