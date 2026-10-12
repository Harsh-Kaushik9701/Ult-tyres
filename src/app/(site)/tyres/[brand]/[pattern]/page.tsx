import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { patternSeo } from '@/lib/seoDynamic';
import { PATTERNS } from '@/data/mockData';
import PatternView from '@/components/PatternView';

type Props = { params: Promise<{ brand: string; pattern: string }> };

// Pre-render the starting range; tyres added later in admin are rendered on request.
export function generateStaticParams() {
  return PATTERNS.filter((p) => p.active !== false).map((p) => ({ brand: p.brandId, pattern: p.code.toLowerCase() }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand, pattern } = await params;
  const seo = patternSeo(brand, pattern);
  return seo ? pageMetadata(seo) : {};
}

export default async function PatternPage({ params }: Props) {
  const { brand, pattern } = await params;
  return <PatternView brandSlug={brand} code={pattern} />;
}
