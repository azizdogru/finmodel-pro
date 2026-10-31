import { NextResponse } from 'next/server';
import { SECTOR_MAP } from '@/data/sectors';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { sectorSlug, plan = 'single', email } = body;

    const sector = sectorSlug ? SECTOR_MAP[sectorSlug] : null;
    const isBundle = plan === 'bundle';

    const priceCents = isBundle ? 4900 : 2900;
    const productName = isBundle
      ? 'All-Access 48 Industry Financial Models & Master Bundle (Excel & Google Sheets)'
      : sector
      ? `${sector.name} 3-Year Financial Model Template (Excel & Sheets)`
      : '3-Year Financial Model Spreadsheet Template (Excel & Sheets)';

    const productDescription = isBundle
      ? 'Lifetime unlocked access to all 48 commercial industry models, 3-year P&L, Cash Flow, CapEx schedules, and Investor Pitch Deck slides.'
      : sector
      ? `Bank & SBA 7(a) approved 3-year ${sector.name} Pro Forma P&L, CapEx schedule, and Google Sheets copy link.`
      : 'Bank & investor-ready 3-year dynamic financial model and cash flow projection.';

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://finmodel-pro.vercel.app');

    const redirectUrl = `${baseUrl}/success?plan=${plan}${sectorSlug ? `&sector=${sectorSlug}` : ''}`;

    const apiKey = process.env.LEMONSQUEEZY_API_KEY;
    const storeId = process.env.LEMONSQUEEZY_STORE_ID || '502656';
    const variantId = process.env.LEMONSQUEEZY_VARIANT_ID || '2280326';

    // 1. Attempt dynamic LemonSqueezy checkout session creation
    if (apiKey) {
      try {
        const lsRes = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            Accept: 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
          },
          body: JSON.stringify({
            data: {
              type: 'checkouts',
              attributes: {
                custom_price: priceCents,
                product_options: {
                  name: productName,
                  description: productDescription,
                  redirect_url: redirectUrl,
                },
                checkout_data: {
                  email: email || undefined,
                  custom: {
                    sector: sectorSlug || 'all',
                    plan: plan,
                  },
                },
              },
              relationships: {
                store: {
                  data: {
                    type: 'stores',
                    id: String(storeId),
                  },
                },
                variant: {
                  data: {
                    type: 'variants',
                    id: String(variantId),
                  },
                },
              },
            },
          }),
        });

        if (lsRes.ok) {
          const lsData = await lsRes.json();
          const checkoutUrl = lsData?.data?.attributes?.url;
          if (checkoutUrl) {
            return NextResponse.json({ url: checkoutUrl, checkoutUrl });
          }
        } else {
          const errText = await lsRes.text();
          console.warn('LemonSqueezy API checkout session returned error:', lsRes.status, errText);
        }
      } catch (apiErr) {
        console.warn('LemonSqueezy API error, falling back to direct URL:', apiErr);
      }
    }

    // 2. Direct Fallback using LemonSqueezy Buy URL if explicitly configured for this product
    const fallbackBaseUrl = process.env.LEMONSQUEEZY_CHECKOUT_URL;

    if (!fallbackBaseUrl || fallbackBaseUrl.includes('44ba076c-b57d-429b-af3d-6962ccf4dc46')) {
      return NextResponse.json(
        { error: 'Payment gateway temporarily unavailable. Please try again shortly.' },
        { status: 503 }
      );
    }

    const fallbackUrlObj = new URL(fallbackBaseUrl);
    fallbackUrlObj.searchParams.set('checkout[custom][sector]', sectorSlug || 'all');
    fallbackUrlObj.searchParams.set('checkout[custom][plan]', plan);
    fallbackUrlObj.searchParams.set('checkout[success_url]', redirectUrl);
    if (email) {
      fallbackUrlObj.searchParams.set('checkout[email]', email);
    }

    return NextResponse.json({
      url: fallbackUrlObj.toString(),
      checkoutUrl: fallbackUrlObj.toString(),
    });
  } catch (error) {
    console.error('Checkout route error:', error);
    return NextResponse.json(
      { error: 'Failed to initiate checkout session' },
      { status: 500 }
    );
  }
}
