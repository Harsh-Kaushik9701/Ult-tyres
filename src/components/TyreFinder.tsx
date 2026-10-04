'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { BRANDS, SKUS } from '@/data/mockData';
import type { AxlePosition, TyreCategory } from '@/types';
import { POSITION_LABEL, matchesQuery, patternHref } from '@/lib/tyres';
import { availabilityBand, totalStock, AVAILABILITY_LABEL } from '@/lib/availability';
import AddToCart from '@/components/AddToCart';

const POSITIONS: ('all' | AxlePosition)[] = ['all', 'steer', 'drive', 'trailer', 'all-position'];

const BAND_DOT = { 'in-stock': 'bg-ok', 'low-stock': 'bg-warn', 'on-order': 'bg-muted' } as const;

/** Search box + position chips + simple result list for one tyre category. */
export default function TyreFinder({ category }: { category?: TyreCategory }) {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get('size') ?? '');
  const [position, setPosition] = useState<'all' | AxlePosition>((params.get('pos') as AxlePosition) || 'all');
  const [brand, setBrand] = useState(params.get('brand') ?? 'all');

  const results = useMemo(
    () =>
      SKUS.filter(
        (s) =>
          (!category || s.category === category) &&
          (position === 'all' || s.axlePosition === position) &&
          (brand === 'all' || s.brandName.toLowerCase() === brand) &&
          matchesQuery(s, query)
      ),
    [category, position, brand, query]
  );

  const availablePositions = POSITIONS.filter(
    (p) => p === 'all' || SKUS.some((s) => (!category || s.category === category) && s.axlePosition === p)
  );

  return (
    <div>
      {/* Controls */}
      <div className="mx-auto max-w-2xl">
        <label htmlFor={`finder-${category ?? 'all'}`} className="sr-only">
          Tyre size or pattern
        </label>
        <div className="flex items-center gap-2 rounded-full bg-panel px-4">
          <Search className="h-5 w-5 shrink-0 text-muted" aria-hidden />
          <input
            id={`finder-${category ?? 'all'}`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a size, e.g. 11R22.5"
            className="min-w-0 flex-1 bg-transparent py-3.5 text-[16px] outline-none placeholder:text-muted"
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {availablePositions.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPosition(p)}
              aria-pressed={position === p}
              className={`rounded-full px-4 py-1.5 text-[14px] transition ${
                position === p ? 'bg-ink text-white' : 'bg-panel text-ink hover:bg-line/60'
              }`}
            >
              {p === 'all' ? 'All' : POSITION_LABEL[p]}
            </button>
          ))}
          <label htmlFor={`brand-${category ?? 'all'}`} className="sr-only">
            Brand
          </label>
          <select
            id={`brand-${category ?? 'all'}`}
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="rounded-full bg-panel px-4 py-1.5 text-[14px] text-ink outline-none"
          >
            <option value="all">All brands</option>
            {BRANDS.map((b) => (
              <option key={b.id} value={b.slug}>
                {b.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results */}
      <p className="mb-4 mt-10 text-center text-[15px] text-muted" aria-live="polite">
        {results.length === 1 ? '1 tyre' : `${results.length} tyres`}
      </p>

      {results.length === 0 ? (
        <div className="rounded-3xl bg-panel px-6 py-12 text-center">
          <p className="text-lg font-medium">No tyres match that search.</p>
          <p className="mt-1 text-muted">Try another size, or ring us and we&apos;ll track it down.</p>
        </div>
      ) : (
        <ul className="divide-y divide-line overflow-hidden rounded-3xl bg-panel">
          {results.map((sku) => {
            const band = availabilityBand(totalStock(sku));
            return (
              <li key={sku.id} className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <Link href={patternHref(sku)} className="text-lg font-semibold hover:text-brand">
                    {sku.brandName} {sku.patternCode}
                  </Link>
                  <p className="mt-0.5 text-[15px] text-muted">
                    <span className="tabular-nums">{sku.size}</span> · {POSITION_LABEL[sku.axlePosition]} ·{' '}
                    <span className="inline-flex items-center gap-1.5">
                      <span className={`inline-block h-2 w-2 rounded-full ${BAND_DOT[band]}`} aria-hidden />
                      {AVAILABILITY_LABEL[band]}
                    </span>
                  </p>
                </div>
                <div className="shrink-0">
                  <AddToCart sku={sku} compact />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
