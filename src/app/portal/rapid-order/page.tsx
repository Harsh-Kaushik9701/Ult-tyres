'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Check, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { ProductSku } from '@/types';
import { Button, inputClass } from '@/components/ui';
import { matchesQuery, POSITION_LABEL } from '@/lib/tyres';

interface ParsedLine {
  text: string;
  qty: number;
  sku?: ProductSku;
}

/** "11R22.5 BD175, 8" → { query: "11R22.5 BD175", qty: 8 }. The last number on the line is the quantity. */
function parse(input: string, SKUS: ProductSku[]): ParsedLine[] {
  return input
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const m = line.match(/^(.*?)[\s,;\t]+(\d{1,3})\s*$/);
      const text = (m ? m[1] : line).replace(/[,;\t]+$/, '').trim();
      const qty = m ? Math.min(500, Math.max(1, parseInt(m[2], 10))) : 4;
      // Every word must match (e.g. size + pattern code).
      const words = text.split(/\s+/);
      const sku = SKUS.find((s) => words.every((w) => matchesQuery(s, w)));
      return { text, qty, sku };
    });
}

export default function QuickOrderPage() {
  const { addToCart, catalogue } = useApp();
  const [input, setInput] = useState('');
  const [added, setAdded] = useState(0);
  const lines = useMemo(() => parse(input, catalogue.visibleSkus), [input, catalogue.visibleSkus]);
  const matched = lines.filter((l) => l.sku);

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-center text-4xl font-semibold">Quick order</h1>
      <p className="mb-8 mt-1 text-center text-lg text-muted">Type or paste one tyre per line: size or code, then how many.</p>

      <label htmlFor="quick-order" className="sr-only">
        Tyres and quantities
      </label>
      <textarea
        id="quick-order"
        rows={6}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setAdded(0);
        }}
        placeholder={'11R22.5 BD175, 8\n295/80R22.5 TRS02, 4'}
        className={`${inputClass} font-mono text-[15px]`}
      />

      {lines.length > 0 && (
        <ul className="mt-6 divide-y divide-line overflow-hidden rounded-3xl bg-panel">
          {lines.map((l, i) => (
            <li key={i} className="flex items-center justify-between gap-4 px-6 py-4">
              <div className="min-w-0">
                {l.sku ? (
                  <>
                    <p className="font-semibold">
                      {l.sku.brandName} {l.sku.patternCode} · {l.sku.size}
                    </p>
                    <p className="text-[14px] text-muted">{POSITION_LABEL[l.sku.axlePosition]}</p>
                  </>
                ) : (
                  <>
                    <p className="font-semibold">“{l.text}”</p>
                    <p className="text-[14px] text-brand">Couldn&apos;t find that one. Check the size or code.</p>
                  </>
                )}
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="tabular-nums text-muted">× {l.qty}</span>
                {l.sku ? <Check className="h-5 w-5 text-ok" aria-label="Found" /> : <X className="h-5 w-5 text-brand" aria-label="Not found" />}
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button
          type="button"
          disabled={matched.length === 0}
          onClick={() => {
            matched.forEach((l) => l.sku && addToCart(l.sku, l.qty));
            setAdded(matched.length);
            setInput('');
          }}
        >
          Add {matched.length > 0 ? matched.length : ''} to cart
        </Button>
        {added > 0 && (
          <p className="text-[15px] text-ok" role="status">
            Added. <Link href="/portal/cart" className="font-medium underline">Go to cart</Link>
          </p>
        )}
      </div>
    </div>
  );
}
