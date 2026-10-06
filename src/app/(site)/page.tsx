import Link from 'next/link';
import { Search, Star } from 'lucide-react';
import { BRANDS, BRANCHES } from '@/data/mockData';
import { SITE } from '@/data/site';
import { ButtonLink, ChevronLink, Container, Tile } from '@/components/ui';
import TyreGraphic from '@/components/TyreGraphic';

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white">
        <Container className="pt-16 text-center sm:pt-24">
          <p className="text-[17px] font-semibold text-brand">Truck and bus tyres</p>
          <h1 className="mt-2 text-5xl font-semibold leading-[1.05] sm:text-7xl">{SITE.tagline}</h1>
          <p className="mx-auto mt-4 max-w-xl text-xl text-muted sm:text-2xl">
            Supplied and fitted across South East Queensland.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <ButtonLink href="/tyres">Browse tyres</ButtonLink>
            <ChevronLink href="/join-us/become-a-dealer" className="text-[17px]">
              Become a dealer
            </ChevronLink>
          </div>
          <div className="mx-auto mt-12 flex max-w-md justify-center sm:mt-16">
            <TyreGraphic className="w-64 sm:w-80" />
          </div>
        </Container>
      </section>

      {/* Size search */}
      <section className="bg-white pb-16 pt-12">
        <Container>
          <form action="/tyres/truck" method="get" className="mx-auto flex max-w-xl items-center gap-2 rounded-full bg-panel p-2">
            <label htmlFor="home-size" className="sr-only">
              Tyre size
            </label>
            <Search className="ml-3 h-5 w-5 shrink-0 text-muted" aria-hidden />
            <input
              id="home-size"
              name="size"
              placeholder="Know your size? Try 11R22.5"
              className="min-w-0 flex-1 bg-transparent px-1 py-2 text-[16px] outline-none placeholder:text-muted"
            />
            <button type="submit" className="rounded-full bg-ink px-5 py-2 text-[15px] font-medium text-white hover:bg-black">
              Search
            </button>
          </form>
        </Container>
      </section>

      {/* Brands */}
      <section className="pb-4">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {BRANDS.map((brand) => (
              <Tile key={brand.id} dark={brand.isAuthorisedDistributor} className="flex flex-col items-center px-6 pb-8 pt-10 text-center">
                <p className={`text-[13px] font-semibold ${brand.isAuthorisedDistributor ? 'text-brand-light' : 'text-muted'}`}>
                  {brand.isAuthorisedDistributor ? 'Authorised distributor' : 'In stock'}
                </p>
                <h2 className="mt-1 text-4xl font-semibold">{brand.name}</h2>
                <p className={`mt-2 text-[17px] ${brand.isAuthorisedDistributor ? 'text-on-dark' : 'text-muted'}`}>
                  {brand.tagline}
                </p>
                <ChevronLink href={`/tyres/${brand.slug}`} tone={brand.isAuthorisedDistributor ? 'light' : 'brand'} className="mt-4">
                  See the range
                </ChevronLink>
                <TyreGraphic tone={brand.isAuthorisedDistributor ? 'light' : 'dark'} className="mt-6 w-28 sm:w-40" />
              </Tile>
            ))}
          </div>
        </Container>
      </section>

      {/* Services */}
      <section className="py-4">
        <Container>
          <div className="grid gap-4 md:grid-cols-2">
            <Tile className="px-8 py-12 text-center">
              <h2 className="text-3xl font-semibold sm:text-4xl">Wheel alignment</h2>
              <p className="mt-2 text-[17px] text-muted">Straight wheels, longer tyre life, less fuel.</p>
              <div className="mt-4 flex justify-center gap-6">
                <ChevronLink href="/fleet-services/wheel-alignment">Learn more</ChevronLink>
                <ChevronLink href="/contact">Book in</ChevronLink>
              </div>
            </Tile>
            <Tile className="px-8 py-12 text-center">
              <h2 className="text-3xl font-semibold sm:text-4xl">Ultimate ReadyFit</h2>
              <p className="mt-2 text-[17px] text-muted">Tyres arrive fitted to rims. Just bolt them on.</p>
              <div className="mt-4 flex justify-center gap-6">
                <ChevronLink href="/fleet-services/ultimate-readyfit">Learn more</ChevronLink>
                <ChevronLink href="/fleet-services">All services</ChevronLink>
              </div>
            </Tile>
          </div>
        </Container>
      </section>

      {/* Dealers */}
      <section className="py-4">
        <Container>
          <Tile dark className="px-8 py-16 text-center sm:py-20">
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
        <Container className="text-center">
          <h2 className="text-3xl font-semibold sm:text-5xl">Three branches. One number.</h2>
          <p className="mt-3 text-lg text-muted">
            {BRANCHES.map((b) => b.suburb).join(' · ')}
          </p>
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
