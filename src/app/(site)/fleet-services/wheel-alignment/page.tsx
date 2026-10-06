import type { Metadata } from 'next';
import { ChevronLink, Container, PageHero, SectionHeading, Tile } from '@/components/ui';
import EnquiryForm from '@/components/EnquiryForm';
import { SITE } from '@/data/site';
import { BRANCHES } from '@/data/mockData';

export const metadata: Metadata = {
  title: 'Wheel alignment Brisbane',
  description: 'Truck, trailer and car wheel alignment at Rocklea, Yatala and Bald Hills.',
};

const BENEFITS = [
  { title: 'Longer tyre life', text: 'Straight wheels wear tyres evenly.' },
  { title: 'Less fuel', text: 'Less drag means less diesel.' },
  { title: 'Safer driving', text: 'The truck holds its line.' },
];

const STEPS = [
  { title: 'Book in', text: 'Ring us or send an enquiry.' },
  { title: 'We measure', text: 'Every axle is checked with laser gear.' },
  { title: 'We adjust', text: 'You get a before and after report.' },
];

const FAQS = [
  {
    q: 'How often should I get an alignment?',
    a: 'At least once a year, and whenever you fit new tyres or notice uneven wear.',
  },
  {
    q: 'Do you do trucks and cars?',
    a: 'Yes. Prime movers, rigids, trailers, buses and cars.',
  },
  {
    q: 'How long does it take?',
    a: 'Most trucks are done while you wait. Ring us and we will give you a time.',
  },
  {
    q: 'Which branches do alignments?',
    a: `Ring us and we will book you into the nearest branch: ${BRANCHES.map((b) => b.suburb).join(', ')}.`,
  },
];

export default function WheelAlignmentPage() {
  return (
    <>
      <PageHero
        eyebrow="Fleet services"
        title="Wheel alignment"
        subtitle="Straight wheels, longer tyre life, less fuel."
      >
        <a href={SITE.phoneHref} className="rounded-full bg-brand px-5 py-2.5 text-[15px] font-medium text-white hover:bg-brand-dark">
          Ring {SITE.phone}
        </a>
        <ChevronLink href="#enquire" className="text-[17px]">
          Book online
        </ChevronLink>
      </PageHero>

      <section className="pb-16">
        <Container>
          <div className="grid gap-4 sm:grid-cols-3">
            {BENEFITS.map((b) => (
              <Tile key={b.title} className="px-7 py-10 text-center">
                <h2 className="text-2xl font-semibold">{b.title}</h2>
                <p className="mt-2 text-muted">{b.text}</p>
              </Tile>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-charcoal py-20 text-white">
        <Container>
          <h2 className="mb-12 text-center text-3xl font-semibold sm:text-5xl">How it works</h2>
          <ol className="grid gap-10 sm:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.title} className="text-center">
                <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-lg font-semibold">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
                <p className="mt-1 text-on-dark">{s.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-20">
        <Container className="max-w-2xl">
          <SectionHeading title="Questions" />
          <div className="divide-y divide-line border-y border-line">
            {FAQS.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium">
                  {f.q}
                  <span className="text-2xl font-light text-muted transition group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="mt-2 text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section id="enquire" className="scroll-mt-20 pb-20">
        <Container className="max-w-2xl">
          <Tile className="px-6 py-10 sm:px-10">
            <h2 className="text-center text-3xl font-semibold">Book an alignment</h2>
            <p className="mb-8 mt-2 text-center text-muted">Tell us about your vehicle and we&apos;ll find a time.</p>
            <EnquiryForm
              idPrefix="align"
              topic="Wheel alignment"
              submitLabel="Request a booking"
              messagePlaceholder="Vehicle type, rego, preferred branch and day"
            />
          </Tile>
        </Container>
      </section>
    </>
  );
}
