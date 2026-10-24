import { MetadataRoute } from 'next';
import { ALL_SECTOR_SLUGS } from '@/data/sectors';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://finmodel-pro.vercel.app';
  const lastModified = new Date();

  const sectorRoutes: MetadataRoute.Sitemap = ALL_SECTOR_SLUGS.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

    const vsRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/vs/legalzoom`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/vs/rocket-lawyer`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  return [
    ...vsRoutes,
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...sectorRoutes,
  ];
}
