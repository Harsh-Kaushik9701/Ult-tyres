import type { MetadataRoute } from 'next';
import { ARTICLES } from '@/data/content';
import { BRANDS, FLEET_SERVICES, PATTERNS } from '@/data/mockData';
import { SEO } from '@/data/seo';
import { SITE_URL } from '@/lib/seo';

/** Every public page, for search engines. Built from the same data as the pages. */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${SITE_URL}${path === '/' ? '' : path}`;
  const fixed = Object.values(SEO)
    .filter((p) => !('noIndex' in p && p.noIndex))
    .map((p) => ({ url: url(p.path), changeFrequency: 'monthly' as const, priority: p.path === '/' ? 1 : 0.7 }));
  const brands = BRANDS.map((b) => ({ url: url(`/tyres/${b.slug}`), changeFrequency: 'monthly' as const, priority: 0.8 }));
  const patterns = PATTERNS.filter((p) => p.active !== false).map((p) => ({
    url: url(`/tyres/${p.brandId}/${p.code.toLowerCase()}`),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));
  const services = FLEET_SERVICES.filter((s) => !['wheel-alignment', 'ultimate-readyfit'].includes(s.slug)).map((s) => ({
    url: url(`/fleet-services/${s.slug}`),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));
  const news = ARTICLES.map((a) => ({ url: url(`/news/${a.slug}`), lastModified: a.date, changeFrequency: 'yearly' as const, priority: 0.5 }));
  return [...fixed, ...brands, ...patterns, ...services, ...news];
}
