import type { Metadata } from 'next';
import { BRANCHES } from '@/data/mockData';
import { ButtonLink, ChevronLink, Container, PageHero, Tile } from '@/components/ui';

export const metadata: Metadata = {
  title: 'About us',
  description: 'A Brisbane truck tyre business built on honest service and fair prices.',
};

const VALUES = [
  { title: 'Honest advice', text: 'We tell you what you need, not what costs the most.' },
  { title: 'Quick service', text: 'In the bay or on the roadside, we get you moving.' },
  { title: 'Fair prices', text: 'Good tyres at prices that make sense for your fleet.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Keeping Queensland trucks moving."
        subtitle="A local truck tyre business built on honest service and fair prices."
      />

      <section className="pb-16">
        <Container className="max-w-2xl text-center text-[19px] leading-relaxed text-ink/85">
          <p>
            Ultimate Tyres was started by Manjinder, who has spent more than 15 years in the truck tyre trade. We supply,
            fit and look after tyres for owner-drivers, fleets and dealers across South East Queensland.
          </p>
          <p className="mt-5">
            Today we run three branches and a fleet of mobile service vans, and we&apos;re the authorised Australian
            distributor for Ralson tyres.
          </p>
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="grid gap-4 sm:grid-cols-3">
            {VALUES.map((v) => (
              <Tile key={v.title} className="px-7 py-10 text-center">
                <h2 className="text-2xl font-semibold">{v.title}</h2>
                <p className="mt-2 text-muted">{v.text}</p>
              </Tile>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <Tile dark className="px-8 py-14 text-center">
            <h2 className="text-3xl font-semibold sm:text-4xl">Come and see us</h2>
            <p className="mt-2 text-lg text-white/70">{BRANCHES.map((b) => b.suburb).join(' · ')}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-6">
              <ButtonLink href="/network-map">Find a branch</ButtonLink>
              <ChevronLink href="/join-us/careers" tone="light" className="self-center">
                Work with us
              </ChevronLink>
            </div>
          </Tile>
        </Container>
      </section>
    </>
  );
}
