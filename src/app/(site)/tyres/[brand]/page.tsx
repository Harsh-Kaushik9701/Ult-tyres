import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { brandSeo } from '@/lib/seoDynamic';
import { notFound } from 'next/navigation';
import { BRANDS } from '@/data/mockData';
import { ChevronLink, Container, PageHero } from '@/components/ui';
import BrandPatterns from '@/components/BrandPatterns';

type Props = { params: Promise<{ brand: string }> };

export function generateStaticParams() {
  return BRANDS.map((b) => ({ brand: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand } = await params;
  const seo = brandSeo(brand);
  return seo ? pageMetadata(seo) : {};
}

export default async function BrandPage({ params }: Props) {
  const { brand: slug } = await params;
  const brand = BRANDS.find((b) => b.slug === slug);
  if (!brand) notFound();

  return (
    <>
      <PageHero
        eyebrow={brand.isAuthorisedDistributor ? 'Authorised distributor' : undefined}
        title={brand.name}
        subtitle={brand.description}
      />
      <section className="pb-20">
        <Container>
          <BrandPatterns brandId={brand.id} brandName={brand.name} />
          <div className="mt-10 text-center">
            <ChevronLink href="/tyres">All tyres</ChevronLink>
          </div>
        </Container>
      </section>
    </>
  );
}
