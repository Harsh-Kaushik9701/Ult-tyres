'use client';

import { useState } from 'react';
import { JOBS } from '@/data/content';
import { Container, PageHero, Tile } from '@/components/ui';
import EnquiryForm from '@/components/EnquiryForm';

export default function CareersPage() {
  const [role, setRole] = useState<string | null>(null);
  const job = JOBS.find((j) => j.id === role);

  return (
    <>
      <PageHero title="Work with us" subtitle="Good people, good gear, and steady work across Brisbane." />

      <section className="pb-12">
        <Container className="max-w-3xl">
          <ul className="divide-y divide-line border-y border-line">
            {JOBS.map((j) => (
              <li key={j.id} className="flex flex-col gap-3 py-7 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">{j.title}</h2>
                  <p className="mt-1 text-muted">
                    {j.location} · {j.type}
                  </p>
                  <p className="mt-2 text-[17px]">{j.summary}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setRole(j.id);
                    requestAnimationFrame(() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' }));
                  }}
                  className="shrink-0 self-start rounded-full bg-panel px-5 py-2 text-[15px] font-medium hover:bg-line/60 sm:self-center"
                >
                  Apply
                </button>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section id="apply" className="scroll-mt-20 pb-20">
        <Container className="max-w-2xl">
          <Tile className="px-6 py-10 sm:px-10">
            <h2 className="text-center text-3xl font-semibold">{job ? `Apply: ${job.title}` : 'Apply or say g’day'}</h2>
            <p className="mb-8 mt-2 text-center text-muted">Tell us a bit about yourself and we&apos;ll give you a ring.</p>
            <EnquiryForm
              key={role ?? 'general'}
              idPrefix="careers"
              topic={job?.title ?? 'General'}
              submitLabel="Send"
              messagePlaceholder="Your experience, licences and where you’d like to work"
            />
          </Tile>
        </Container>
      </section>
    </>
  );
}
