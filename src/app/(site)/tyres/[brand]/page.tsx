import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BRANDS, PATTERNS } from '@/data/mockData';
import { ChevronLink, Container, PageHero } from '@/components/ui';
import { POSITION_LABEL } from '@/lib/tyres';

type Props = { params: Promise<{ brand: string }> };

export function generateStaticParams() {
  return BRANDS.map((b) => ({ brand: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand: slug } = await params;
  const brand = BRANDS.find((b) => b.slug === slug);
  return brand ? { title: `${brand.name} tyres`, description: brand.description } : {};
}

export default async function BrandPage({ params }: Props) {
  const { brand: slug } = await params;
  const brand = BRANDS.find((b) => b.slug === slug);
  if (!brand) notFound();

  const patterns = PATTERNS.filter((p) => p.brandId === brand.id);

  return (
    <>
      <PageHero
        eyebrow={brand.isAuthorisedDistributor ? 'Authorised distributor' : undefined}
        title={brand.name}
        subtitle={brand.description}
      />

      <section className="pb-20">
        <Container>
          {patterns.length === 0 ? (
            <p className="text-center text-muted">Ring us for the current {brand.name} range.</p>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {patterns.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/tyres/${brand.slug}/${p.code.toLowerCase()}`}
                    className="flex h-full flex-col rounded-3xl bg-panel p-7 transition hover:bg-line/40"
                  >
                    <p className="text-[13px] font-semibold uppercase tracking-wide text-muted">
                      {p.category === 'bus' ? 'Bus' : 'Truck'} · {p.positions.map((pos) => POSITION_LABEL[pos]).join(', ')}
                    </p>
                    <h2 className="mt-1 text-2xl font-semibold">{p.code}</h2>
                    <p className="mt-1 flex-1 text-muted">
                      {p.skus.length === 1 ? '1 size' : `${p.skus.length} sizes`}
                    </p>
                    <span className="mt-4 text-[15px] font-medium text-brand">View tyre ›</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-10 text-center">
            <ChevronLink href="/tyres">All tyres</ChevronLink>
          </div>
        </Container>
      </section>
    </>
  );
}
