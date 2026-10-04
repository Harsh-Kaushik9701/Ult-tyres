'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Check, Minus, Plus } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { ProductSku } from '@/types';
import { Button } from '@/components/ui';

/**
 * Quantity stepper + "Add to cart" for signed-in dealers.
 * Everyone else sees a link to log in. No prices are ever shown here.
 */
export default function AddToCart({ sku, compact = false }: { sku: ProductSku; compact?: boolean }) {
  const { session, addToCart } = useApp();
  const [qty, setQty] = useState(4);
  const [added, setAdded] = useState(false);

  if (!session?.dealerId) {
    return (
      <Link href="/dealer/login" className="text-[15px] font-medium text-brand hover:underline">
        Log in to order
      </Link>
    );
  }

  const step = (delta: number) => {
    setAdded(false);
    setQty((q) => Math.min(500, Math.max(1, q + delta)));
  };

  return (
    <div className={`flex items-center gap-3 ${compact ? '' : 'flex-wrap'}`}>
      <div className="flex items-center rounded-full bg-panel">
        <button
          type="button"
          onClick={() => step(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-line/60"
          aria-label="One less"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-8 text-center font-medium tabular-nums" aria-live="polite">
          {qty}
        </span>
        <button
          type="button"
          onClick={() => step(1)}
          className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-line/60"
          aria-label="One more"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <Button
        type="button"
        variant={added ? 'secondary' : 'primary'}
        onClick={() => {
          addToCart(sku, qty);
          setAdded(true);
        }}
      >
        {added ? (
          <>
            <Check className="h-4 w-4" aria-hidden /> Added
          </>
        ) : (
          'Add to cart'
        )}
      </Button>
    </div>
  );
}
