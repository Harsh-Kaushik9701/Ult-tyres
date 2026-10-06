import type { Metadata } from 'next';
import { ButtonLink, ChevronLink, Container, PageHero, Tile } from '@/components/ui';
import EnquiryForm from '@/components/EnquiryForm';
import TyreGraphic from '@/components/TyreGraphic';

export const metadata: Metadata = {
  title: 'Ultimate ReadyFit',
  description: 'Tyres delivered already fitted and balanced on rims, ready to bolt on.',
};

const STEPS = [
  { title: 'Pick your tyre and rim', text: 'Ralson, Blacklion or Triangle on steel or alloy.' },
  { title: 'We fit and balance', text: 'Done in our workshop, ready to go.' },
  { title: 'Bolt it on', text: 'Delivered to your yard. We take the old casings.' },
];

export default function ReadyFitPage() {
  return (
    <>
      <PageHero
        eyebrow="Ultimate ReadyFit"
        title="Just bolt it on."
        subtitle="Tyres arrive fitted and balanced on rims. No tyre machine needed."
      >
        <ButtonLink href="#enquire">Get started</ButtonLink>
        <ChevronLink href="/fleet-services" className="text-[17px]">
          All fleet services
        </ChevronLink>
      </PageHero>

      <section className="pb-16">
        <Container className="flex justify-center">
          <TyreGraphic className="w-56 sm:w-72" />
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <ol className="grid gap-4 sm:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <Tile className="h-full px-7 py-10">
                  <p className="text-[15px] font-semibold text-brand">Step {i + 1}</p>
                  <h2 className="mt-1 text-2xl font-semibold">{s.title}</h2>
                  <p className="mt-2 text-muted">{s.text}</p>
                </Tile>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section id="enquire" className="scroll-mt-20 pb-20">
        <Container className="max-w-2xl">
          <Tile className="px-6 py-10 sm:px-10">
            <h2 className="text-center text-3xl font-semibold">Set up ReadyFit</h2>
            <p className="mb-8 mt-2 text-center text-muted">Tell us your fleet and sizes. We&apos;ll sort the rest.</p>
            <EnquiryForm
              idPrefix="readyfit"
              topic="Ultimate ReadyFit"
              submitLabel="Send"
              messagePlaceholder="Tyre sizes, rims and how many a month"
            />
          </Tile>
        </Container>
      </section>
    </>
  );
}
