import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Container, PageHero } from '@/components/ui';
import TyreFinder from '@/components/TyreFinder';

export const metadata: Metadata = {
  title: 'Bus tyres',
  description: 'Bus and coach tyres from Ralson, Blacklion and Triangle.',
};

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
