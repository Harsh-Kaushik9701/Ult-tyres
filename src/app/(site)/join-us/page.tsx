import type { Metadata } from 'next';
import { ChevronLink, Container, PageHero, Tile } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Join us',
  description: 'Become an Ultimate Tyres dealer or come and work with us.',
};

export default function JoinUsPage() {
  return (
    <>
      <PageHero title="Join us" subtitle="Sell our tyres, or come and work with us." />
      <section className="pb-20">
        <Container>
          <div className="grid gap-4 md:grid-cols-2">
            <Tile dark className="px-8 py-14 text-center">
              <h2 className="text-4xl font-semibold">Become a dealer</h2>
              <p className="mt-2 text-lg text-white/70">Trade pricing on Ralson, Blacklion and Triangle.</p>
              <ChevronLink href="/join-us/become-a-dealer" tone="light" className="mt-4">
                Apply now
              </ChevronLink>
            </Tile>
            <Tile className="px-8 py-14 text-center">
              <h2 className="text-4xl font-semibold">Careers</h2>
              <p className="mt-2 text-lg text-muted">Fitters, technicians and sales.</p>
              <ChevronLink href="/join-us/careers" className="mt-4">
                See open roles
              </ChevronLink>
            </Tile>
          </div>
        </Container>
      </section>
    </>
  );
}
