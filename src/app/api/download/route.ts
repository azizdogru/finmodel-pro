import { NextResponse } from 'next/server';
import { SECTOR_MAP } from '@/data/sectors';
import { generateSectorWorkbook } from '@/lib/excelGenerator';

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
    const buffer = await generateSectorWorkbook(sector);

    const safeFilename = `${sector.slug}-financial-model.xlsx`;

    return new NextResponse(Buffer.from(buffer), {
      status: 200,
      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${safeFilename}"`,
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { error: 'Failed to generate Excel model' },
      { status: 500 }
    );
  }
}
