'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

export type FinderPosition = 'steer' | 'drive' | 'trailer';

export interface FinderPattern {
  id: string;
  name: string;
  brandName: string;
  href: string;
  positions: string[];
  /** Short line under the name, e.g. "Drive · regional, long haul". */
  summary: string;
  thumb?: { src: string; width: number; height: number };
}

const POSITIONS: { id: FinderPosition; label: string; note: string }[] = [
  { id: 'steer', label: 'Steer', note: 'Front axle. Even wear and sharp handling matter most.' },
  { id: 'drive', label: 'Drive', note: 'Traction and deep tread for long life under torque.' },
  { id: 'trailer', label: 'Trailer', note: 'Low scuff and low rolling resistance for free-rolling wheels.' },
];

/** Wheel centres on the truck drawing (x positions), grouped by axle position. */
const WHEELS: Record<FinderPosition, number[]> = {
  steer: [72],
  drive: [236, 290],
  trailer: [470, 524, 578],
};

/** Steer, drive or trailer patterns first, then all-position ones that also fit. */
function forPosition(patterns: FinderPattern[], pos: FinderPosition) {
  const exact = patterns.filter((p) => p.positions.includes(pos));
  const all = patterns.filter((p) => !p.positions.includes(pos) && p.positions.includes('all-position'));
  return [...exact, ...all].slice(0, 6);
}

function TreadIcon({ pos }: { pos: FinderPosition }) {
  return (
    <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden>
      <rect width="48" height="48" fill="#0d0f11" />
      {pos === 'drive' &&
        [0, 1, 2, 3].map((i) => (
          <g key={i} fill="#343a40">
            <path d={`M0 ${i * 13} l18 6 v6 l-18 -6z`} />
            <path d={`M48 ${i * 13 + 6} l-18 6 v6 l18 -6z`} />
          </g>
        ))}
      {pos === 'steer' &&
        [12, 24, 36].map((x) => <path key={x} d={`M${x} 0 l3 6 l-3 6 l3 6 l-3 6 l3 6 l-3 6 l3 6 l-3 6`} stroke="#343a40" strokeWidth="3" fill="none" />)}
      {pos === 'trailer' && [10, 19, 29, 38].map((x) => <rect key={x} x={x - 1.5} width="3" height="48" fill="#343a40" />)}
    </svg>
  );
}

export default function AxleFinder({ patterns }: { patterns: FinderPattern[] }) {
  const [pos, setPos] = useState<FinderPosition>('drive');
  const reduce = useReducedMotion();
  const current = POSITIONS.find((p) => p.id === pos)!;
  const list = forPosition(patterns, pos);

  return (
    <div className="grid overflow-hidden rounded-3xl bg-charcoal text-white md:grid-cols-[1.2fr_1fr]">
      <div className="grid content-center gap-6 border-b border-white/10 p-6 sm:p-8 md:border-b-0 md:border-r">
        <svg viewBox="0 0 620 200" className="h-auto w-full" role="group" aria-label="Truck side view. Choose a wheel position.">
          <rect x="205" y="32" width="400" height="104" rx="6" fill="#2a3036" />
          <rect x="205" y="32" width="400" height="10" fill="#D50000" />
          <rect x="575" y="120" width="30" height="8" fill="#f5c400" opacity="0.85" />
          <rect x="215" y="136" width="380" height="8" fill="#1f2428" />
          <path d="M18 140 V78 Q18 52 44 50 H112 Q128 50 134 66 L150 108 H196 V140 Z" fill="#3a4148" />
          <path d="M40 60 H104 Q114 60 118 70 L128 98 H40 Z" fill="#11161a" />
          <rect x="18" y="128" width="190" height="12" fill="#23282d" />
          <rect x="138" y="22" width="10" height="84" rx="3" fill="#5c636a" />
          <text x="300" y="96" fill="#9aa3ab" fontFamily="var(--font-display)" fontSize="26" fontWeight="700" letterSpacing="2">
            ULTIMATE TYRES
          </text>
          {(Object.keys(WHEELS) as FinderPosition[]).map((p) => {
            const on = p === pos;
            return (
              <g
                key={p}
                role="button"
                tabIndex={0}
                aria-label={`${p} axle`}
                aria-pressed={on}
                className="cursor-pointer outline-none [&:focus-visible_circle:first-child]:stroke-brand-light"
                onClick={() => setPos(p)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setPos(p);
                  }
                }}
              >
                {WHEELS[p].map((x) => (
                  <g key={x}>
                    <circle cx={x} cy={154} r={26} fill="#0d0f11" stroke={on ? '#FF3B30' : '#3a4148'} strokeWidth={on ? 4 : 2} className="transition-[stroke] duration-200 hover:stroke-brand-light" />
                    <circle cx={x} cy={154} r={10} fill={on ? '#FF3B30' : '#5c636a'} className="transition-[fill] duration-200" />
                  </g>
                ))}
              </g>
            );
          })}
          <line x1="0" y1="181" x2="620" y2="181" stroke="#3a4148" strokeWidth="2" />
        </svg>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Wheel position">
          {POSITIONS.map((p) => (
            <button
              key={p.id}
              type="button"
              aria-pressed={p.id === pos}
              onClick={() => setPos(p.id)}
              className={`rounded-full px-4 py-2 text-[15px] font-semibold transition ${
                p.id === pos ? 'bg-brand text-white' : 'text-white ring-1 ring-white/25 hover:ring-white/60'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid content-start gap-3 p-6 sm:p-8" aria-live="polite">
        <h3 className="text-3xl font-bold uppercase">{current.label} tyres</h3>
        <p className="text-[15px] text-on-dark">{current.note}</p>
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((p, i) => (
            <motion.div
              key={`${pos}-${p.id}`}
              initial={reduce ? false : { opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0, x: -12 }}
              transition={{ duration: 0.35, delay: reduce ? 0 : i * 0.05, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <Link href={p.href} className="group grid grid-cols-[56px_1fr_auto] items-center gap-4 rounded-2xl bg-charcoal-soft p-3 transition hover:bg-[#3d444b]">
                <span className="relative block h-14 w-14 overflow-hidden rounded-xl bg-black">
                  {p.thumb ? (
                    <Image src={p.thumb.src} alt="" fill sizes="56px" className="object-cover" />
                  ) : (
                    <TreadIcon pos={pos} />
                  )}
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-xl font-bold uppercase leading-tight">{p.name}</span>
                  <span className="block truncate text-[13px] text-on-dark">{p.summary}</span>
                </span>
                <ChevronRight className="h-5 w-5 text-on-dark transition group-hover:translate-x-1 group-hover:text-white" aria-hidden />
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
        {list.length === 0 && <p className="text-on-dark">No patterns listed for this position yet.</p>}
      </div>
    </div>
  );
}
