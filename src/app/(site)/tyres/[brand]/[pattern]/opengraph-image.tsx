import { PATTERNS } from '@/data/mockData';
import { patternSeo } from '@/lib/seoDynamic';
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og';

export const alt = 'Ultimate Tyres';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return PATTERNS.filter((p) => p.active !== false).map((p) => ({ brand: p.brandId, pattern: p.code.toLowerCase() }));
}

export default async function Image({ params }: { params: Promise<{ brand: string; pattern: string }> }) {
  const { brand, pattern } = await params;
  const seo = patternSeo(brand, pattern);
  return renderOgImage(seo?.og ?? { eyebrow: 'Ultimate Tyres', title: 'Truck and bus tyres.' });
}
