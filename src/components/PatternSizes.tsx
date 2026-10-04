'use client';

import { useState } from 'react';
import type { Pattern } from '@/types';
import { Spec } from '@/components/ui';
import AddToCart from '@/components/AddToCart';
import { POSITION_LABEL } from '@/lib/tyres';
import { availabilityBand, totalStock, AVAILABILITY_LABEL } from '@/lib/availability';

/** Size picker, key specs and add-to-cart for one tyre pattern. */
export default function PatternSizes({ pattern }: { pattern: Pattern }) {
  const [skuId, setSkuId] = useState(pattern.skus[0]?.id ?? '');
  const sku = pattern.skus.find((s) => s.id === skuId) ?? pattern.skus[0];

  if (!sku) {
    return <p className="text-muted">Ring us for available sizes.</p>;
  }

  const band = availabilityBand(totalStock(sku));

  return (
    <div>
      <fieldset>
        <legend className="mb-3 text-[15px] font-medium">Size</legend>
        <div className="flex flex-wrap gap-2">
          {pattern.skus.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSkuId(s.id)}
              aria-pressed={s.id === sku.id}
              className={`rounded-full border px-4 py-2 text-[15px] tabular-nums transition ${
                s.id === sku.id ? 'border-ink bg-ink text-white' : 'border-line bg-white hover:border-ink'
              }`}
            >
              {s.size}
            </button>
          ))}
        </div>
      </fieldset>

      <dl className="mt-8">
        <Spec label="Full size" value={sku.fullSizeCode} />
        <Spec label="Position" value={POSITION_LABEL[sku.axlePosition]} />
        {sku.loadIndexSingle > 0 && (
          <Spec
            label="Load index"
            value={sku.loadIndexDual > 0 ? `${sku.loadIndexSingle}/${sku.loadIndexDual}` : sku.loadIndexSingle}
          />
        )}
        {sku.treadDepthMm > 0 && <Spec label="Tread depth" value={`${sku.treadDepthMm} mm`} />}
        {sku.plyRating && <Spec label="Ply rating" value={sku.plyRating} />}
        <Spec label="Availability" value={AVAILABILITY_LABEL[band]} />
      </dl>

      <div className="mt-8">
        <AddToCart sku={sku} />
      </div>
    </div>
  );
}
