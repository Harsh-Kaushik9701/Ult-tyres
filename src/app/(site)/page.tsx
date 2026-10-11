import Link from 'next/link';
import { Star } from 'lucide-react';
import { BRANDS, BRANCHES, PATTERNS } from '@/data/mockData';
import { MEDIA, type MediaPhoto } from '@/data/media';
import { SITE } from '@/data/site';
import { ButtonLink, ChevronLink, Container, Tile } from '@/components/ui';
import TyreGraphic from '@/components/TyreGraphic';
import HeroMotion from '@/components/motion/HeroMotion';
import BrandTicker from '@/components/motion/BrandTicker';
import AxleFinder, { type FinderPattern } from '@/components/motion/AxleFinder';
import CountUp from '@/components/motion/CountUp';
import MediaImage from '@/components/motion/MediaImage';
import { POSITION_LABEL } from '@/lib/tyres';
import { imagesFor } from '@/lib/tyreImages';

const APPLICATION_LABEL: Record<string, string> = {
  'long-haul': 'long haul',
  regional: 'regional',
  urban: 'urban',
  mixed: 'mixed',
  'on-off-road': 'on and off road',
};

/** Truck patterns for the axle finder, as plain data the client component can receive. */
function finderPatterns(): FinderPattern[] {
  return PATTERNS.filter((p) => p.active !== false && p.category === 'truck').map((p) => {
    const photos = imagesFor(p);
    const thumb = photos.find((i) => i.kind === 'tread') ?? photos[0];
    return {
      id: p.id,
      name: p.name,
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

export default function HomePage() {
  return (
    <>
      <HeroMotion tagline={SITE.tagline} />
      <BrandTicker />

      {/* Axle finder */}
      <section id="find-your-tyre" className="scroll-mt-20 bg-white py-16 sm:py-24">
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

      {/* Brands */}
      <section className="pb-4">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {BRANDS.map((brand) => (
              <Tile key={brand.id} dark={brand.isAuthorisedDistributor} className="reveal tile-lift group flex flex-col items-center px-6 pb-8 pt-10 text-center">
                <p className={`text-[13px] font-semibold ${brand.isAuthorisedDistributor ? 'text-brand-light' : 'text-muted'}`}>
                  {brand.isAuthorisedDistributor ? 'Authorised distributor' : 'In stock'}
                </p>
                <h2 className="mt-1 text-4xl font-semibold">{brand.name}</h2>
                <p className={`mt-2 text-[17px] ${brand.isAuthorisedDistributor ? 'text-on-dark' : 'text-muted'}`}>{brand.tagline}</p>
                <ChevronLink href={`/tyres/${brand.slug}`} tone={brand.isAuthorisedDistributor ? 'light' : 'brand'} className="mt-4">
                  See the range
                </ChevronLink>
                <TyreGraphic tone={brand.isAuthorisedDistributor ? 'light' : 'dark'} className="mt-6 w-28 transition-transform duration-700 group-hover:rotate-45 sm:w-40" />
              </Tile>
            ))}
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
            </div>
            <ChevronLink href="/fleet-services">All services</ChevronLink>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {/* Proof tile */}
            <div className="reveal flex flex-col justify-between gap-8 rounded-3xl bg-charcoal p-7 text-white md:col-span-2">
              <div className="flex flex-wrap gap-x-10 gap-y-6">
                <div>
                  <p className="font-display text-6xl font-extrabold leading-none sm:text-7xl">
                    <CountUp to={137} />
                  </p>
                  <p className="mt-1 text-[13px] uppercase tracking-wider text-on-dark">Google reviews</p>
                </div>
                <div>
                  <p className="font-display text-6xl font-extrabold leading-none sm:text-7xl">
                    <CountUp to={5} decimals={1} />
                  </p>
                  <p className="mt-1 flex gap-0.5 text-amber" aria-label="5 out of 5 stars">
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

      {/* Branches */}
      <section className="py-16 sm:py-24">
        <Container className="reveal text-center">
          <h2 className="text-3xl font-semibold sm:text-5xl">Three branches. One number.</h2>
          <p className="mt-3 text-lg text-muted">{BRANCHES.map((b) => b.suburb).join(' · ')}</p>
          <p className="mt-6">
            <a href={SITE.phoneHref} className="text-3xl font-semibold tracking-tight text-ink hover:text-brand sm:text-4xl">
              {SITE.phone}
            </a>
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-6">
            <ChevronLink href="/network-map">Find a branch</ChevronLink>
            <ChevronLink href="/contact">Contact us</ChevronLink>
          </div>
          <p className="mt-10 flex flex-wrap items-center justify-center gap-1.5 text-[15px] text-muted">
            <span className="flex text-amber" aria-hidden>
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </span>
            Rated 5 stars by 137 customers on{' '}
            <Link href="https://www.google.com/maps/search/Ultimate+Tyres+Rocklea" className="underline underline-offset-2 hover:text-ink">
              Google
            </Link>
          </p>
        </Container>
      </section>
    </>
  );
}
