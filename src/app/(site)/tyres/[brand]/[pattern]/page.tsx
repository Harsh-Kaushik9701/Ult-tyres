import type { Metadata } from 'next';
import { PATTERNS } from '@/data/mockData';
import PatternView from '@/components/PatternView';

type Props = { params: Promise<{ brand: string; pattern: string }> };

// Pre-render the starting range; tyres added later in admin are rendered on request.
export function generateStaticParams() {
  return PATTERNS.filter((p) => p.active !== false).map((p) => ({ brand: p.brandId, pattern: p.code.toLowerCase() }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand, pattern } = await params;
  const p = PATTERNS.find((x) => x.brandId === brand.toLowerCase() && x.code.toLowerCase() === pattern.toLowerCase());
  const name = p ? `${p.brandName} ${p.code}` : `${brand.charAt(0).toUpperCase()}${brand.slice(1)} ${pattern.toUpperCase()}`;
  return { title: name, description: `${name} truck and bus tyre from Ultimate Tyres.` };
}

export default async function PatternPage({ params }: Props) {
  const { brand, pattern } = await params;
  return <PatternView brandSlug={brand} code={pattern} />;
}
