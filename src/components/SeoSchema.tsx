import React from 'react';

export function SeoSchema() {
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: "5-Year Financial Projection Models & Excel Dashboards",
    description: "SBA 7(a) & bank-ready 5-year dynamic financial models with built-in P&L, CapEx, and break-even calculators.",
    brand: {
      '@type': 'Brand',
      name: "FinModelPro",
    },
        image: 'https://finmodel-pro.vercel.app/og-image.png',
    sku: 'FINMODEL-PRO-PRO-2026',
    brand: {
      '@type': 'Brand',
      name: 'Financial Model Pro Spreadsheet',
    },
    offers: {
      '@type': 'Offer',
      price: '49.00',
      priceCurrency: 'USD',
      priceValidUntil: '2027-12-31',
      availability: 'https://schema.org/InStock',
      url: 'https://finmodel-pro.vercel.app',
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'US',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 30,
        returnMethod: 'https://schema.org/ReturnOnline',
        returnFees: 'https://schema.org/FreeReturn',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0.00',
          currency: 'USD',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'US',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 0,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 0,
            unitCode: 'DAY',
          },
        },
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: "4.9",
      reviewCount: "248",
      bestRating: '5',
      worstRating: '1',
    },
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: "FinModelPro",
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: "69.00",
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: "4.9",
      reviewCount: "248",
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: "Are these models accepted by SBA lenders and commercial banks?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. Our models are built to GAAP standards with 3-statement financials (Income Statement, Balance Sheet, Cash Flow) formatted specifically for SBA 7(a) loan reviews.",
        },
      },
      {
        '@type': 'Question',
        name: "Do I need advanced Excel formulas to use this?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "No. All formulas are pre-built and automated. You only enter your basic assumptions (rent, pricing, headcount) and all metrics calculate automatically.",
        },
      }
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
