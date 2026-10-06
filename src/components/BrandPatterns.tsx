'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import type { AxlePosition, Pattern } from '@/types';
import TyreGraphic from '@/components/TyreGraphic';
import { POSITION_LABEL } from '@/lib/tyres';
import { imagesFor } from '@/lib/tyreImages';

type Filter = 'all' | AxlePosition | 'bus';

const POSITION_ORDER: AxlePosition[] = ['steer', 'drive', 'trailer', 'all-position'];

function matches(p: Pattern, f: Filter) {
  if (f === 'all') return true;
  if (f === 'bus') return p.category === 'bus';
  return p.positions.includes(f);
}

function PatternCard({ p }: { p: Pattern }) {
  const photo = imagesFor(p)[0];
  return (
    <Link href={`/tyres/${p.brandId}/${p.code.toLowerCase()}`} className="group flex h-full flex-col">
      <div className="flex aspect-[4/5] items-center justify-center overflow-hidden rounded-3xl bg-panel p-8 transition group-hover:bg-line/40">
        {photo ? (
          <Image
            src={photo.src}
            alt={`${p.brandName} ${p.code}`}
            width={photo.width}
            height={photo.height}
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
            className="h-full w-full object-contain mix-blend-multiply transition duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex flex-col items-center gap-4">
            <TyreGraphic className="w-28 opacity-15" />
            <span className="text-[13px] text-muted">Photo coming soon</span>
          </div>
        )}
      </div>
      <div className="px-1 pt-4">
        <h2 className="text-2xl font-semibold">{p.code}</h2>
        <p className="mt-0.5 text-[15px] text-muted">
          {p.category === 'bus' ? 'Bus · ' : ''}
          {p.positions.map((pos) => POSITION_LABEL[pos]).join(', ')}
          {p.skus.length > 0 && ` · ${p.skus.length === 1 ? '1 size' : `${p.skus.length} sizes`}`}
        </p>
      </div>
    </Link>
  );
}

/** A brand's tyres as a photo grid with simple position filters. */
export default function BrandPatterns({ brandId, brandName }: { brandId: string; brandName: string }) {
  const patterns = useApp().catalogue.visiblePatterns.filter((p) => p.brandId === brandId);
  const [filter, setFilter] = useState<Filter>('all');

  if (patterns.length === 0) {
    return <p className="text-center text-muted">Ring us for the current {brandName} range.</p>;
  }

  const filters: { id: Filter; label: string }[] = [
    { id: 'all', label: 'All' },
    ...POSITION_ORDER.filter((pos) => patterns.some((p) => p.positions.includes(pos))).map((pos) => ({
      id: pos,
      label: POSITION_LABEL[pos],
    })),
    ...(patterns.some((p) => p.category === 'bus') ? [{ id: 'bus' as Filter, label: 'Bus' }] : []),
  ];
  const shown = patterns.filter((p) => matches(p, filter));

  return (
    <div>
      {filters.length > 2 && (
        <div className="mb-10 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter by position">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              aria-pressed={filter === f.id}
              className={`rounded-full px-5 py-2 text-[15px] font-medium transition ${
                filter === f.id ? 'bg-ink text-white' : 'bg-panel text-ink hover:bg-line/60'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}
      <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <li key={p.id}>
            <PatternCard p={p} />
          </li>
        ))}
      </ul>
    </div>
  );
}
