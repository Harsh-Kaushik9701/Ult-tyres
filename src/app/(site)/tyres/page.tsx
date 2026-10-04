import type { Metadata } from 'next';
import { BRANDS } from '@/data/mockData';
import { ChevronLink, Container, PageHero, Tile } from '@/components/ui';
import TyreGraphic from '@/components/TyreGraphic';

export const metadata: Metadata = {
  title: 'Tyres',
  description: 'Ralson, Blacklion and Triangle truck and bus tyres.',
};

export default function TyresPage() {
  return (
    <>
      <PageHero title="Tyres" subtitle="Ralson, Blacklion and Triangle. For trucks and buses." />

      <section className="pb-4">
        <Container>
          <div className="grid gap-4 md:grid-cols-2">
            <Tile dark className="flex flex-col items-center px-8 pb-10 pt-12 text-center">
              <h2 className="text-4xl font-semibold">Truck tyres</h2>
              <p className="mt-2 text-lg text-on-dark">Steer, drive and trailer.</p>
              <ChevronLink href="/tyres/truck" tone="light" className="mt-4">
                Shop truck tyres
              </ChevronLink>
              <TyreGraphic tone="light" className="mt-8 w-40" />
            </Tile>
            <Tile className="flex flex-col items-center px-8 pb-10 pt-12 text-center">
              <h2 className="text-4xl font-semibold">Bus tyres</h2>
              <p className="mt-2 text-lg text-muted">City buses and coaches.</p>
              <ChevronLink href="/tyres/bus" className="mt-4">
                Shop bus tyres
              </ChevronLink>
              <TyreGraphic className="mt-8 w-40" />
            </Tile>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <h2 className="mb-8 text-center text-3xl font-semibold sm:text-4xl">Shop by brand</h2>
          <ul className="grid gap-4 sm:grid-cols-3">
            {BRANDS.map((b) => (
              <li key={b.id} className="rounded-3xl bg-panel px-7 py-8 text-center">
                <h3 className="text-2xl font-semibold">{b.name}</h3>
                <p className="mt-1 text-muted">{b.tagline}</p>
                <ChevronLink href={`/tyres/${b.slug}`} className="mt-3">
                  See the range
                </ChevronLink>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
