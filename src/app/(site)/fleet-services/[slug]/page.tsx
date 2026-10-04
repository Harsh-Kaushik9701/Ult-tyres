import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Check } from 'lucide-react';
import { FLEET_SERVICES } from '@/data/mockData';
import { ChevronLink, Container, PageHero, Tile } from '@/components/ui';
import EnquiryForm from '@/components/EnquiryForm';
import { SITE } from '@/data/site';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  // Wheel alignment and ReadyFit have their own pages.
  return FLEET_SERVICES.filter((s) => !['wheel-alignment', 'ultimate-readyfit'].includes(s.slug)).map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = FLEET_SERVICES.find((s) => s.slug === slug);
  return service ? { title: service.name, description: service.shortDesc } : {};
}

export default async function FleetServicePage({ params }: Props) {
  const { slug } = await params;
  const service = FLEET_SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <>
      <PageHero eyebrow="Fleet services" title={service.name} subtitle={service.shortDesc}>
        <a href={SITE.phoneHref} className="rounded-full bg-brand px-5 py-2.5 text-[15px] font-medium text-white hover:bg-brand-dark">
          Ring {SITE.phone}
        </a>
        <ChevronLink href="#enquire" className="text-[17px]">
          Send an enquiry
        </ChevronLink>
      </PageHero>

      <section className="pb-8">
        <Container>
          <ul className="grid gap-4 sm:grid-cols-3">
            {service.points.map((point) => (
              <li key={point} className="flex items-center gap-3 rounded-3xl bg-panel px-6 py-6 text-lg font-medium">
                <Check className="h-5 w-5 shrink-0 text-brand" aria-hidden />
                {point}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section id="enquire" className="scroll-mt-20 pb-20 pt-8">
        <Container className="max-w-2xl">
          <Tile className="px-6 py-10 sm:px-10">
            <h2 className="text-center text-3xl font-semibold">Book in or ask a question</h2>
            <p className="mb-8 mt-2 text-center text-muted">We&apos;ll get back to you during business hours.</p>
            <EnquiryForm idPrefix={`svc-${service.slug}`} topic={service.name} />
          </Tile>
          <div className="mt-8 text-center">
            <ChevronLink href="/fleet-services">All fleet services</ChevronLink>
          </div>
        </Container>
      </section>
    </>
  );
}
