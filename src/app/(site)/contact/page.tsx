import type { Metadata } from 'next';
import { MapPin, MessageCircle, Phone } from 'lucide-react';
import { BRANCHES } from '@/data/mockData';
import { SITE } from '@/data/site';
import { Container, PageHero, Tile } from '@/components/ui';
import EnquiryForm from '@/components/EnquiryForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Ring, WhatsApp or send us a message. Branches at Rocklea, Yatala and Bald Hills.',
};

export default function ContactPage() {
  return (
    <>
      <PageHero title="Get in touch" subtitle="Ring us, send a WhatsApp or drop us a line." />

      <section className="pb-12">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2">
            <a href={SITE.phoneHref} className="block">
              <Tile className="flex h-full flex-col items-center px-6 py-10 text-center transition hover:bg-line/40">
                <Phone className="h-7 w-7 text-brand" aria-hidden />
                <p className="mt-3 text-lg font-semibold">Ring us</p>
                <p className="mt-1 text-2xl font-semibold tracking-tight">{SITE.phone}</p>
              </Tile>
            </a>
            <a href={SITE.whatsappHref} target="_blank" rel="noreferrer" className="block">
              <Tile className="flex h-full flex-col items-center px-6 py-10 text-center transition hover:bg-line/40">
                <MessageCircle className="h-7 w-7 text-[#25D366]" aria-hidden />
                <p className="mt-3 text-lg font-semibold">WhatsApp</p>
                <p className="mt-1 text-muted">Quick questions, photos of tyres</p>
              </Tile>
            </a>
          </div>
        </Container>
      </section>

      <section className="pb-12">
        <Container className="max-w-2xl">
          <Tile className="px-6 py-10 sm:px-10">
            <h2 className="text-center text-3xl font-semibold">Send a message</h2>
            <p className="mb-8 mt-2 text-center text-muted">We&apos;ll get back to you during business hours.</p>
            <EnquiryForm idPrefix="contact" />
          </Tile>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <h2 className="mb-6 text-center text-2xl font-semibold">Our branches</h2>
          <ul className="grid gap-4 sm:grid-cols-3">
            {BRANCHES.map((b) => (
              <li key={b.id} className="rounded-3xl bg-panel px-6 py-7">
                <h3 className="text-lg font-semibold">{b.suburb}</h3>
                <p className="mt-1 flex items-start gap-1.5 text-muted">
                  <MapPin className="mt-1 h-4 w-4 shrink-0" aria-hidden />
                  <span>
                    {b.address}, {b.suburb} {b.state} {b.postcode}
                  </span>
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${b.address}, ${b.suburb} ${b.state} ${b.postcode}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-block text-[15px] font-medium text-brand hover:underline"
                >
                  Directions ›
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
