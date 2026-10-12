import { FLEET_SERVICES } from '@/data/mockData';
import { serviceSeo } from '@/lib/seoDynamic';
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og';

export const alt = 'Ultimate Tyres';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return FLEET_SERVICES.filter((s) => !['wheel-alignment', 'ultimate-readyfit'].includes(s.slug)).map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const seo = serviceSeo(slug);
  return renderOgImage(seo?.og ?? { eyebrow: 'Ultimate Tyres', title: 'Truck and bus tyres.' });
}
