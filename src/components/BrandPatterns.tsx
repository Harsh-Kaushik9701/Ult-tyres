'use client';

import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { POSITION_LABEL } from '@/lib/tyres';

/** Grid of a brand's visible tyre patterns, read from the live catalogue. */
export default function BrandPatterns({ brandId, brandName }: { brandId: string; brandName: string }) {
  const patterns = useApp().catalogue.visiblePatterns.filter((p) => p.brandId === brandId);

  if (patterns.length === 0) {
    return <p className="text-center text-muted">Ring us for the current {brandName} range.</p>;
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {patterns.map((p) => (
        <li key={p.id}>
          <Link
            href={`/tyres/${brandId}/${p.code.toLowerCase()}`}
            className="flex h-full flex-col rounded-3xl bg-panel p-7 transition hover:bg-line/40"
          >
            <p className="text-[13px] font-semibold uppercase tracking-wide text-muted">
              {p.category === 'bus' ? 'Bus' : 'Truck'} · {p.positions.map((pos) => POSITION_LABEL[pos]).join(', ')}
            </p>
            <h2 className="mt-1 text-2xl font-semibold">{p.code}</h2>
            <p className="mt-1 flex-1 text-muted">{p.skus.length === 1 ? '1 size' : `${p.skus.length} sizes`}</p>
            <span className="mt-4 text-[15px] font-medium text-brand">View tyre ›</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
