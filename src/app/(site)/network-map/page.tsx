'use client';

import { useState } from 'react';
import { MapPin, Phone } from 'lucide-react';
import { BRANCHES } from '@/data/mockData';
import { SITE } from '@/data/site';
import { PageHero, Container } from '@/components/ui';

// Plot area for South East Queensland (approximate bounds).
const BOUNDS = { north: -27.22, south: -27.82, west: 152.86, east: 153.38 };
const W = 520;
const H = 600;
const x = (lng: number) => ((lng - BOUNDS.west) / (BOUNDS.east - BOUNDS.west)) * W;
const y = (lat: number) => ((BOUNDS.north - lat) / (BOUNDS.north - BOUNDS.south)) * H;
const CBD = { lat: -27.4698, lng: 153.0251 };

function directionsUrl(b: (typeof BRANCHES)[number]) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${b.address}, ${b.suburb} ${b.state} ${b.postcode}`
  )}`;
}

export default function NetworkMapPage() {
  const [selected, setSelected] = useState(BRANCHES[0].id);

  return (
    <>
      <PageHero title="Find us" subtitle="Three branches across South East Queensland, plus mobile vans on the road." />

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
                        <a href={directionsUrl(b)} target="_blank" rel="noreferrer" className="font-medium text-brand hover:underline">
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

            {/* Simple map */}
            <div className="overflow-hidden rounded-3xl bg-panel">
              <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Map of our branches in South East Queensland">
                {Array.from({ length: 9 }, (_, i) => (
                  <line key={`v${i}`} x1={(i * W) / 8} x2={(i * W) / 8} y1="0" y2={H} stroke="#CED4DA" strokeOpacity="0.6" />
                ))}
                {Array.from({ length: 11 }, (_, i) => (
                  <line key={`h${i}`} y1={(i * H) / 10} y2={(i * H) / 10} x1="0" x2={W} stroke="#CED4DA" strokeOpacity="0.6" />
                ))}
                <g>
                  <circle cx={x(CBD.lng)} cy={y(CBD.lat)} r="5" fill="#5C636A" />
                  <text x={x(CBD.lng) + 10} y={y(CBD.lat) + 5} fontSize="15" fill="#5C636A">
                    Brisbane CBD
                  </text>
                </g>
                {BRANCHES.map((b) => {
                  const active = b.id === selected;
                  const cx = x(b.coordinates.lng);
                  const cy = y(b.coordinates.lat);
                  return (
                    <g key={b.id} onClick={() => setSelected(b.id)} className="cursor-pointer">
                      <circle cx={cx} cy={cy} r={active ? 22 : 16} fill="#D50000" opacity={active ? 0.15 : 0.1} />
                      <circle cx={cx} cy={cy} r={active ? 10 : 8} fill={active ? '#D50000' : '#1C1F22'} />
                      <text
                        x={cx + 18}
                        y={cy + 6}
                        fontSize="18"
                        fontWeight={active ? 600 : 500}
                        fill="#1C1F22"
                      >
                        {b.suburb}
                      </text>
                    </g>
                  );
                })}
              </svg>
              <p className="flex items-center gap-1.5 px-6 pb-5 text-[14px] text-muted">
                <MapPin className="h-4 w-4" aria-hidden /> Our mobile vans come to you. Ring us to check your area.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
