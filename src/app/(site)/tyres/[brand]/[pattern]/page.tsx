import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BRANDS, PATTERNS } from '@/data/mockData';
import { ChevronLink, Container } from '@/components/ui';
import TyreGraphic from '@/components/TyreGraphic';
import PatternSizes from '@/components/PatternSizes';
import { POSITION_LABEL } from '@/lib/tyres';

type Props = { params: Promise<{ brand: string; pattern: string }> };

function findPattern(brand: string, code: string) {
  return PATTERNS.find((p) => p.brandId === brand.toLowerCase() && p.code.toLowerCase() === code.toLowerCase());
}

/** First sentence only: keep the page short. */
function firstSentence(text: string) {
  const m = text.match(/^.*?[.!?](\s|$)/);
  return (m ? m[0] : text).trim();
}

export function generateStaticParams() {
  return PATTERNS.map((p) => ({ brand: p.brandId, pattern: p.code.toLowerCase() }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand, pattern } = await params;
  const p = findPattern(brand, pattern);
  return p ? { title: `${p.brandName} ${p.code}`, description: firstSentence(p.description) } : {};
}

export default async function PatternPage({ params }: Props) {
  const { brand: brandSlug, pattern: code } = await params;
  const pattern = findPattern(brandSlug, code);
  if (!pattern) notFound();
  const brand = BRANDS.find((b) => b.id === pattern.brandId);

  return (
    <section className="py-12 sm:py-20">
      <Container>
        <div className="grid items-start gap-10 md:grid-cols-2 md:gap-16">
          <div className="flex justify-center rounded-3xl bg-panel px-8 py-16 md:sticky md:top-24">
            <TyreGraphic className="w-56 sm:w-72" />
          </div>

          <div className="min-w-0">
            <p className="text-[15px] font-semibold text-brand">{brand?.name}</p>
            <h1 className="mt-1 text-4xl font-semibold sm:text-5xl">
              {pattern.brandName} {pattern.code}
            </h1>
            <p className="mt-3 text-lg text-muted">
              {pattern.category === 'bus' ? 'Bus' : 'Truck'} tyre ·{' '}
              {pattern.positions.map((p) => POSITION_LABEL[p]).join(', ')}
            </p>
            <p className="mt-4 text-[17px]">{firstSentence(pattern.description)}</p>

            <div className="mt-10">
              <PatternSizes pattern={pattern} />
            </div>

            <div className="mt-10 flex flex-wrap gap-6">
              <ChevronLink href={`/tyres/${pattern.brandId}`}>More {pattern.brandName} tyres</ChevronLink>
              <ChevronLink href="/contact">Ask a question</ChevronLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
