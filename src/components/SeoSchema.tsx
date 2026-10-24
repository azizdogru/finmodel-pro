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
    offers: {
      '@type': 'Offer',
      price: "69.00",
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: "https://finmodel-pro.vercel.app",
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
