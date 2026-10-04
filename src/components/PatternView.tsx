'use client';

import { notFound } from 'next/navigation';
import { BRANDS } from '@/data/mockData';
import { useApp } from '@/context/AppContext';
import { ChevronLink, Container } from '@/components/ui';
import TyreGraphic from '@/components/TyreGraphic';
import PatternSizes from '@/components/PatternSizes';
import { POSITION_LABEL } from '@/lib/tyres';

/** First sentence only: keep the page short. */
function firstSentence(text: string) {
  const m = text.match(/^.*?[.!?](\s|$)/);
  return (m ? m[0] : text).trim();
}

/** One tyre pattern, read from the live catalogue (so tyres added in admin work straight away). */
export default function PatternView({ brandSlug, code }: { brandSlug: string; code: string }) {
  const { hydrated, catalogue } = useApp();
  const pattern = catalogue.visiblePatterns.find(
    (p) => p.brandId === brandSlug.toLowerCase() && p.code.toLowerCase() === code.toLowerCase()
  );

  if (!pattern) {
    // A tyre added in admin only exists once saved data has loaded.
    if (!hydrated || !catalogue.catalogueLoaded) {
      return <p className="py-24 text-center text-muted" role="status">Loading…</p>;
    }
    notFound();
  }

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
              {pattern.category === 'bus' ? 'Bus' : 'Truck'} tyre · {pattern.positions.map((p) => POSITION_LABEL[p]).join(', ')}
            </p>
            {pattern.description && <p className="mt-4 text-[17px]">{firstSentence(pattern.description)}</p>}

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
