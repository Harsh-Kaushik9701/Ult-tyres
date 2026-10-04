import type { Metadata } from 'next';
import { FLEET_SERVICES } from '@/data/mockData';
import { ChevronLink, Container, PageHero } from '@/components/ui';
import { SITE } from '@/data/site';

export const metadata: Metadata = {
  title: 'Fleet services',
  description: 'Wheel alignment, balancing, tyre fitting, ReadyFit and more, in our bays or at your depot.',
};

export default function FleetServicesPage() {
  return (
    <>
      <PageHero
        title="Fleet services"
        subtitle="Everything your trucks need, in our bays or at your depot."
      />
      <section className="pb-20">
        <Container>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FLEET_SERVICES.map((s) => (
              <li key={s.id} className="flex flex-col rounded-3xl bg-panel p-7">
                <h2 className="text-xl font-semibold">{s.name}</h2>
                <p className="mt-1 flex-1 text-muted">{s.shortDesc}</p>
                <ChevronLink href={`/fleet-services/${s.slug}`} className="mt-4">
                  Learn more
                </ChevronLink>
              </li>
            ))}
          </ul>
          <p className="mt-12 text-center text-lg text-muted">
            Not sure what you need?{' '}
            <a href={SITE.phoneHref} className="font-medium text-ink hover:text-brand">
              Ring {SITE.phone}
            </a>
          </p>
        </Container>
      </section>
    </>
  );
}
