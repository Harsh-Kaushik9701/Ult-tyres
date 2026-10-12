'use client';

import { useState } from 'react';
import { MapPin, Phone } from 'lucide-react';
import { BRANCHES } from '@/data/mockData';
import { SITE, directionsUrl } from '@/data/site';
import GoogleMap from '@/components/GoogleMap';
import { branchQuery } from '@/lib/branches';
import { Container } from '@/components/ui';


/** Branch list and live map. The selected branch drives the map. */
export default function BranchLocator() {
  const [selected, setSelected] = useState(BRANCHES[0].id);
  const current = BRANCHES.find((b) => b.id === selected) ?? BRANCHES[0];

  return (
    <>
      <section className="pb-20">
        <Container>
          <div className="grid gap-6 md:grid-cols-[1fr_1.2fr]">
            {/* Branch list */}
            <ul className="space-y-3" aria-label="Branches">
              {BRANCHES.map((b) => {
                const active = b.id === selected;
                return (
                  <li key={b.id}>
                    <button
                      type="button"
                      onClick={() => setSelected(b.id)}
                      aria-pressed={active}
                      className={`w-full rounded-3xl px-6 py-5 text-left transition ${
                        active ? 'bg-charcoal text-white' : 'bg-panel hover:bg-line/50'
                      }`}
                    >
                      <span className="text-xl font-semibold">{b.suburb}</span>
                      <span className={`mt-1 block ${active ? 'text-on-dark' : 'text-muted'}`}>
                        {b.address}, {b.suburb} {b.state} {b.postcode}
                      </span>
                    </button>
                    {active && (
                      <div className="flex flex-wrap gap-5 px-6 pt-3 text-[15px]">
                        <a href={directionsUrl(branchQuery(b))} target="_blank" rel="noreferrer" className="font-medium text-brand hover:underline">
                          Directions ›
                        </a>
                        <a href={SITE.phoneHref} className="inline-flex items-center gap-1 font-medium text-brand hover:underline">
                          <Phone className="h-4 w-4" aria-hidden /> {SITE.phone}
                        </a>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Live Google Map, follows the selected branch */}
            <div className="overflow-hidden rounded-3xl bg-panel">
              <div className="h-[380px] sm:h-[520px]">
                <GoogleMap query={branchQuery(current)} title={`Map of Ultimate Tyres ${current.suburb}`} zoom={15} />
              </div>
              <p className="flex items-center gap-1.5 px-6 py-4 text-[14px] text-muted">
                <MapPin className="h-4 w-4" aria-hidden /> Our mobile vans come to you, 24/7. Ring us to check your area.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
