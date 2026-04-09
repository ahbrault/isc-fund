import type { MetadataRoute } from 'next';
import { prisma } from '@/common';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.iscfund.com';

  const events = await prisma.event.findMany({
    select: { slug: true, date: true },
  });

  const eventUrls: MetadataRoute.Sitemap = events.map(event => ({
    url: `${baseUrl}/events/${event.slug}/book-table`,
    lastModified: event.date,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/donate`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...eventUrls,
  ];
}
