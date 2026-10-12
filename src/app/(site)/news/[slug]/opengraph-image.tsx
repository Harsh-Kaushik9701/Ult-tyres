import { ARTICLES } from '@/data/content';
import { articleSeo } from '@/lib/seoDynamic';
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og';

export const alt = 'Ultimate Tyres';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const seo = articleSeo(slug);
  return renderOgImage(seo?.og ?? { eyebrow: 'Ultimate Tyres', title: 'Truck and bus tyres.' });
}
