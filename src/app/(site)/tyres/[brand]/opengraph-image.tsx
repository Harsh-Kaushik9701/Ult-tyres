import { BRANDS } from '@/data/mockData';
import { brandSeo } from '@/lib/seoDynamic';
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og';

export const alt = 'Ultimate Tyres';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return BRANDS.map((b) => ({ brand: b.slug }));
}

export default async function Image({ params }: { params: Promise<{ brand: string }> }) {
  const { brand } = await params;
  const seo = brandSeo(brand);
  return renderOgImage(seo?.og ?? { eyebrow: 'Ultimate Tyres', title: 'Truck and bus tyres.' });
}
