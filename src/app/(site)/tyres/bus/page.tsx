import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Container, PageHero } from '@/components/ui';
import TyreFinder from '@/components/TyreFinder';
import { SEO } from '@/data/seo';
import { seoMetadata } from '@/lib/seo';

export const metadata: Metadata = seoMetadata(SEO.busTyres);

export default function BusTyresPage() {
  return (
    <>
      <PageHero title="Bus tyres" subtitle="Tyres for city buses and coaches." />
      <section className="pb-20">
        <Container>
          <Suspense>
            <TyreFinder category="bus" />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
