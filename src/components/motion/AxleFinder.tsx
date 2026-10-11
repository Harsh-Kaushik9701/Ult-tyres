'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import MediaImage from '@/components/motion/MediaImage';
import SafeImage from '@/components/SafeImage';
import { MEDIA, TRUCK_HOTSPOTS } from '@/data/media';

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

/** Wheels per axle group, used for the little wheel icons on each button. */
const WHEELS: Record<FinderPosition, number[]> = {
  steer: [1],
  drive: [1, 2],
  trailer: [1, 2, 3],
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
  const hotspots = TRUCK_HOTSPOTS;

  return (
    <div className="grid overflow-hidden rounded-3xl bg-charcoal text-white md:grid-cols-[1.2fr_1fr]">
      <div className="flex min-w-0 flex-col border-b border-white/10 md:border-b-0 md:border-r">
        {/* Real truck photo */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-charcoal-soft">
          <MediaImage photo={MEDIA.truckRig} sizes="(min-width: 768px) 600px, 100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/10 to-transparent" aria-hidden />
          {/* Optional pins sitting on the actual wheels, when positions are set in media.ts */}
          {hotspots &&
            (Object.keys(hotspots) as FinderPosition[]).map((p) =>
              hotspots[p].map(([x, y]) => (
                <button
                  key={`${p}-${x}`}
                  type="button"
                  aria-label={`${p} axle`}
                  onClick={() => setPos(p)}
                  className="absolute h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <span className={`absolute inset-0 rounded-full ring-4 ${p === pos ? 'ring-brand-light' : 'ring-white/50'}`} />
                  {p === pos && <span className="absolute inset-0 animate-ping rounded-full ring-4 ring-brand-light/60" />}
                </button>
              ))
            )}
          <p className="absolute bottom-3 left-4 text-[13px] font-medium uppercase tracking-wider text-white/80">Tap an axle</p>
        </div>

        {/* Axle strip: wheels laid out front to back, like the rig above */}
        <div className="grid grid-cols-[1fr_1.4fr_2fr] gap-2 p-4 sm:gap-3 sm:p-6" role="group" aria-label="Wheel position">
          {POSITIONS.map((p) => {
            const on = p.id === pos;
            return (
              <button
                key={p.id}
                type="button"
                aria-pressed={on}
                onClick={() => setPos(p.id)}
                className={`group flex flex-col items-center gap-2 rounded-2xl px-2 py-3 transition ${
                  on ? 'bg-brand text-white' : 'bg-charcoal-soft text-white hover:bg-[#3d444b]'
                }`}
              >
                <span className="flex gap-1.5" aria-hidden>
                  {WHEELS[p.id].map((x) => (
                    <span
                      key={x}
                      className={`relative block h-7 w-7 rounded-full border-[5px] sm:h-9 sm:w-9 ${
                        on ? 'border-black/70 bg-white' : 'border-black bg-[#868e96] group-hover:bg-white/80'
                      }`}
                    >
                      <span className="absolute inset-[30%] rounded-full bg-black/40" />
                    </span>
                  ))}
                </span>
                <span className="text-[15px] font-semibold">{p.label}</span>
              </button>
            );
          })}
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
                  <TreadIcon pos={pos} />
                  {p.thumb && (
                    <SafeImage src={p.thumb.src} alt="" fill sizes="56px" className="bg-white object-contain p-0.5" />
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
