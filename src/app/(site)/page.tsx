import type { Metadata } from 'next';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { BRANDS, BRANCHES, PATTERNS } from '@/data/mockData';
import { MEDIA, type MediaPhoto } from '@/data/media';
import { SITE, directionsUrl } from '@/data/site';
import { SHOWCASE } from '@/data/flagships';
import { SEO } from '@/data/seo';
import { seoMetadata, SITE_URL } from '@/lib/seo';
import { ButtonLink, ChevronLink, Container, Tile } from '@/components/ui';
import HeroMotion from '@/components/motion/HeroMotion';
import BrandTicker from '@/components/motion/BrandTicker';
import AxleFinder, { type FinderPattern } from '@/components/motion/AxleFinder';
import CountUp from '@/components/motion/CountUp';
import MediaImage from '@/components/motion/MediaImage';
import BrandShowcase, { type ShowcaseBrand } from '@/components/motion/BrandShowcase';
import GoogleMap from '@/components/GoogleMap';
import { branchQuery } from '@/lib/branches';
import { POSITION_LABEL } from '@/lib/tyres';
import { imagesFor } from '@/lib/tyreImages';

export const metadata: Metadata = seoMetadata(SEO.home);

const APPLICATION_LABEL: Record<string, string> = {
  'long-haul': 'long haul',
  regional: 'regional',
  urban: 'urban',
  mixed: 'mixed',
  'on-off-road': 'on and off road',
};

/** Truck patterns for the axle finder, as plain data the client component can receive. */
function finderPatterns(): FinderPattern[] {
  const order = new Set(Object.values(SHOWCASE).flat());
  const truck = PATTERNS.filter((p) => p.active !== false && p.category === 'truck');
  const sorted = [...truck.filter((p) => order.has(p.id)), ...truck.filter((p) => !order.has(p.id))];
  return sorted.map((p) => {
    const photos = imagesFor(p);
    const thumb = photos.find((i) => i.kind === 'tread') ?? photos[0];
    return {
      id: p.id,
      name: `${p.brandName} ${p.code}`,
      brandName: p.brandName,
      href: `/tyres/${p.brandId}/${p.code.toLowerCase()}`,
      positions: p.positions,
      summary: [p.positions.map((x) => POSITION_LABEL[x]).join(', '), p.applications.map((a) => APPLICATION_LABEL[a] ?? a).join(', ')]
        .filter(Boolean)
        .join(' · '),
      thumb: thumb ? { src: thumb.src, width: thumb.width, height: thumb.height } : undefined,
    };
  });
}

/** Flagship patterns per brand for the showcase carousel. */
function showcaseBrands(): ShowcaseBrand[] {
  return BRANDS.filter((b) => b.slug in SHOWCASE).map((b) => ({
    id: b.id,
    name: b.name,
    tagline: b.tagline,
    badge: b.isAuthorisedDistributor ? 'Authorised distributor' : 'In stock',
    href: `/tyres/${b.slug}`,
    tyres: SHOWCASE[b.slug as keyof typeof SHOWCASE]
      .map((id) => PATTERNS.find((p) => p.id === id))
      .filter((p) => p !== undefined)
      .map((p) => ({
        id: p.id,
        code: p.code,
        href: `/tyres/${p.brandId}/${p.code.toLowerCase()}`,
        positions: p.positions.map((x) => POSITION_LABEL[x]).join(' / '),
        application: p.applications.map((a) => APPLICATION_LABEL[a] ?? a).join(', '),
        description: p.description,
        photo: imagesFor(p).find((i) => i.kind === 'side')?.src ?? imagesFor(p)[0]?.src,
      })),
  }));
}

function PhotoTile({
  photo,
  title,
  text,
  href,
  className = '',
  badge,
}: {
  photo: MediaPhoto;
  title: string;
  text: string;
  href: string;
  className?: string;
  badge?: React.ReactNode;
}) {
  return (
    <Link href={href} className={`tile-lift group relative isolate flex min-h-[260px] flex-col justify-end overflow-hidden rounded-3xl bg-charcoal p-6 text-white ${className}`}>
      <MediaImage photo={photo} sizes="(min-width: 768px) 33vw, 100vw" className="-z-20" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/35 to-black/5" aria-hidden />
      {badge && <div className="absolute left-5 top-5">{badge}</div>}
      <h3 className="text-3xl font-bold uppercase">{title}</h3>
      <p className="mt-1 max-w-xs text-[15px] text-white/85">{text}</p>
    </Link>
  );
}

/** schema.org listing for each branch, so search engines can show the business details. */
function businessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': BRANCHES.map((b) => ({
      '@type': 'TireShop',
      '@id': `${SITE_URL}/network-map#${b.id}`,
      name: b.isHq ? SITE.google.listingName : `Ultimate Tyres ${b.suburb}`,
      url: SITE_URL,
      telephone: '+61 1300 110 002',
      image: `${SITE_URL}/opengraph-image`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: b.address,
        addressLocality: b.suburb,
        addressRegion: b.state,
        postalCode: b.postcode,
        addressCountry: 'AU',
      },
      geo: { '@type': 'GeoCoordinates', latitude: b.coordinates.lat, longitude: b.coordinates.lng },
      areaServed: 'South East Queensland',
      brand: ['Ralson', 'Blacklion', 'Triangle'],
      sameAs: [SITE.facebook, SITE.instagram],
    })),
  };
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // JSON built from our own data, not user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd()).replace(/</g, '\\u003c') }}
      />
      <HeroMotion />
      <BrandTicker />

      {/* Axle finder */}
      <section id="find-your-tyre" className="scroll-mt-28 bg-white py-16 sm:py-24">
        <Container>
          <div className="reveal mb-8 max-w-2xl">
            <p className="text-[15px] font-semibold text-brand">Find your tyre</p>
            <h2 className="mt-1 text-4xl font-bold uppercase sm:text-6xl">Tap a wheel. See what fits.</h2>
            <p className="mt-3 text-lg text-muted">Pick the steer, drive or trailer axle to see the patterns we stock for it.</p>
          </div>
          <div className="reveal">
            <AxleFinder patterns={finderPatterns()} />
          </div>
          <p className="mt-4 text-[15px] text-muted">
            Know your size?{' '}
            <ChevronLink href="/tyres/truck" className="inline-flex">
              Search all truck tyres
            </ChevronLink>
          </p>
        </Container>
      </section>

      {/* Brand showcase */}
      <section className="pb-8">
        <Container>
          <div className="reveal mb-8 max-w-2xl">
            <p className="text-[15px] font-semibold text-brand">Our tyre ranges</p>
            <h2 className="mt-1 text-4xl font-bold uppercase sm:text-6xl">Flagship tyres, in stock.</h2>
            <p className="mt-3 text-lg text-muted">Steer, drive and trailer patterns from Ralson, Blacklion and Triangle.</p>
          </div>
          <div className="reveal">
            <BrandShowcase brands={showcaseBrands()} />
          </div>
        </Container>
      </section>

      {/* Services bento */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="reveal mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[15px] font-semibold text-brand">Fleet services</p>
              <h2 className="mt-1 text-4xl font-bold uppercase sm:text-6xl">We keep you rolling.</h2>
              <p className="mt-3 max-w-xl text-lg text-muted">Downtime costs you money. Straight wheels, the right pressure and the right tread lower your cost per kilometre.</p>
            </div>
            <ChevronLink href="/fleet-services">All services</ChevronLink>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {/* Proof tile */}
            <div className="reveal flex flex-col justify-between gap-8 rounded-3xl bg-charcoal p-7 text-white md:col-span-2">
              <div className="flex flex-wrap gap-x-10 gap-y-6">
                <div>
                  <p className="font-display text-6xl font-extrabold leading-none sm:text-7xl">
                    <CountUp to={SITE.google.reviewCount} />
                  </p>
                  <p className="mt-1 text-[13px] uppercase tracking-wider text-on-dark">Google reviews</p>
                </div>
                <div>
                  <p className="font-display text-6xl font-extrabold leading-none sm:text-7xl">
                    <CountUp to={SITE.google.rating} decimals={1} />
                  </p>
                  <p className="mt-1 flex gap-0.5 text-amber" aria-label={`${SITE.google.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" aria-hidden />
                    ))}
                  </p>
                </div>
                <div>
                  <p className="font-display text-6xl font-extrabold leading-none sm:text-7xl">
                    <CountUp to={BRANCHES.length} />
                  </p>
                  <p className="mt-1 text-[13px] uppercase tracking-wider text-on-dark">Branches in SEQ</p>
                </div>
              </div>
              <p className="max-w-lg text-lg text-on-dark">
                Drivers keep mentioning the same thing: a quick text with how long we&apos;ll be, then we turn up.
              </p>
            </div>

            <PhotoTile
              photo={MEDIA.mobileVan}
              title="Mobile service"
              text="Roadside and on-site puncture repair. We text you the ETA."
              href="/contact"
              badge={
                <span className="flex items-center gap-2 rounded-full bg-black/55 px-3 py-1.5 text-[13px] font-medium backdrop-blur">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-light opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-light" />
                  </span>
                  Call {SITE.phone}
                </span>
              }
              className="reveal"
            />
            <PhotoTile photo={MEDIA.tyreCloseUp} title="Wheel alignment" text="Straight wheels, longer tyre life, less fuel." href="/fleet-services/wheel-alignment" className="reveal" />
            <PhotoTile photo={MEDIA.fitting} title="Tyre fitting" text="Fitted and balanced at three branches." href="/fleet-services/tyre-fitting" className="reveal" />
            <PhotoTile photo={MEDIA.stackedTyres} title="Ultimate ReadyFit" text="Tyres arrive fitted to rims. Just bolt them on." href="/fleet-services/ultimate-readyfit" className="reveal" />
          </div>
        </Container>
      </section>

      {/* Dealers */}
      <section className="py-4">
        <Container>
          <Tile dark className="reveal px-8 py-16 text-center sm:py-20">
            <p className="text-[15px] font-semibold text-brand-light">For dealers</p>
            <h2 className="mt-2 text-4xl font-semibold sm:text-5xl">Trade pricing, made easy.</h2>
            <p className="mx-auto mt-3 max-w-lg text-lg text-on-dark">
              Add tyres to your cart and send it through. We&apos;ll come back with your price, fast.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/dealer/login">Dealer login</ButtonLink>
              <ButtonLink href="/join-us/become-a-dealer" variant="secondary">
                Become a dealer
              </ButtonLink>
            </div>
          </Tile>
        </Container>
      </section>

      {/* Branches + live Google Map */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="reveal grid items-stretch gap-6 md:grid-cols-[.9fr_1.1fr]">
            <div className="flex flex-col justify-center">
              <h2 className="text-4xl font-bold uppercase sm:text-5xl">Three branches. One number.</h2>
              <p className="mt-6">
                <a href={SITE.phoneHref} className="text-4xl font-semibold tracking-tight text-ink hover:text-brand">
                  {SITE.phone}
                </a>
              </p>
              <ul className="mt-6 divide-y divide-line/70 border-y border-line/70">
                {BRANCHES.map((b) => (
                  <li key={b.id} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3">
                    <span>
                      <span className="font-semibold">{b.suburb}</span>
                      {b.isHq && <span className="ml-2 text-[13px] text-muted">Head office</span>}
                      <span className="block text-[15px] text-muted">
                        {b.address}, {b.suburb} {b.state} {b.postcode}
                      </span>
                    </span>
                    <a href={directionsUrl(branchQuery(b))} target="_blank" rel="noreferrer" className="text-[15px] font-medium text-brand hover:underline">
                      Directions ›
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-6 flex flex-wrap items-center gap-1.5 text-[15px] text-muted">
                <span className="flex text-amber" aria-hidden>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </span>
                Rated {SITE.google.rating} from {SITE.google.reviewCount} reviews on{' '}
                <Link href={SITE.google.url} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-ink">
                  Google
                </Link>
              </p>
              <div className="mt-4">
                <ChevronLink href="/network-map">See all branches on the map</ChevronLink>
              </div>
            </div>
            <div className="h-[360px] overflow-hidden rounded-3xl bg-panel md:h-auto md:min-h-[440px]">
              <GoogleMap query={branchQuery(BRANCHES[0])} title="Google Map of Ultimate Tyre Services, Rocklea" zoom={15} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
