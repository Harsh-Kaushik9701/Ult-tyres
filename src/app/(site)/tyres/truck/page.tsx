import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Container, PageHero } from '@/components/ui';
import TyreFinder from '@/components/TyreFinder';

export const metadata: Metadata = {
  title: 'Truck tyres',
  description: 'Ralson, Blacklion and Triangle truck tyres for steer, drive and trailer positions.',
};

export default function TruckTyresPage() {
  return (
    <>
      <PageHero title="Truck tyres" subtitle="Steer, drive and trailer. Search by size or pick a position." />
      <section className="pb-20">
        <Container>
          <Suspense>
            <TyreFinder category="truck" />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
