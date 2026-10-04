'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { BRANCHES } from '@/data/mockData';
import { Button, ButtonLink, Tile, inputClass, labelClass } from '@/components/ui';
import { POSITION_LABEL } from '@/lib/tyres';

export default function CartPage() {
  const router = useRouter();
  const { session, cart, updateCartQuantity, removeFromCart, submitPricingRequest } = useApp();

  const [poNumber, setPoNumber] = useState('');
  const [neededBy, setNeededBy] = useState('');
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [address, setAddress] = useState('');
  const [branch, setBranch] = useState(BRANCHES[0].suburb);
  const [notes, setNotes] = useState('');

  const canSubmit = session?.role === 'owner' || session?.role === 'buyer';
  const total = cart.reduce((n, i) => n + i.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="py-16 text-center">
        <h1 className="text-4xl font-semibold">Your cart is empty</h1>
        <p className="mt-2 text-lg text-muted">Find the tyres you need, then send them through for a price.</p>
        <div className="mt-8 flex justify-center gap-3">
          <ButtonLink href="/portal/catalogue">Browse tyres</ButtonLink>
          <ButtonLink href="/portal/rapid-order" variant="secondary">
            Quick order
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-4xl font-semibold">Cart</h1>
      <p className="mt-1 text-lg text-muted">
        {total} tyres. Send it through and we&apos;ll come back with your price.
      </p>

      <ul className="mt-8 divide-y divide-line overflow-hidden rounded-3xl bg-panel">
        {cart.map((item) => (
          <li key={item.skuId} className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-lg font-semibold">
                {item.brandName} {item.patternCode}
              </p>
              <p className="text-[15px] text-muted">
                {item.size} · {POSITION_LABEL[item.axlePosition]}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center rounded-full bg-white">
                <button
                  type="button"
                  onClick={() => updateCartQuantity(item.skuId, item.quantity - 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-line/60"
                  aria-label={`One less ${item.patternCode}`}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-medium tabular-nums">{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => updateCartQuantity(item.skuId, item.quantity + 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-line/60"
                  aria-label={`One more ${item.patternCode}`}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                type="button"
                onClick={() => removeFromCart(item.skuId)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-muted hover:bg-white hover:text-brand"
                aria-label={`Remove ${item.patternCode}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {canSubmit ? (
        <Tile className="mt-8 px-6 py-8 sm:px-8">
          <form
            className="grid gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              const req = submitPricingRequest({
                poNumber: poNumber.trim(),
                requiredByDate: neededBy,
                deliveryType,
                branchOrAddress: deliveryType === 'pickup' ? `Pick up: ${branch}` : address,
                notes: notes.trim() || undefined,
              });
              router.push(`/portal/quotes/${req.id}`);
            }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="po" className={labelClass}>
                  Your PO number (optional)
                </label>
                <input id="po" value={poNumber} onChange={(e) => setPoNumber(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label htmlFor="needed" className={labelClass}>
                  Needed by (optional)
                </label>
                <input id="needed" type="date" value={neededBy} onChange={(e) => setNeededBy(e.target.value)} className={inputClass} />
              </div>
            </div>

            <fieldset>
              <legend className={labelClass}>Delivery or pick up?</legend>
              <div className="flex gap-2">
                {(['delivery', 'pickup'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setDeliveryType(t)}
                    aria-pressed={deliveryType === t}
                    className={`rounded-full border px-4 py-2 text-[15px] ${
                      deliveryType === t ? 'border-ink bg-ink text-white' : 'border-line bg-white hover:border-ink'
                    }`}
                  >
                    {t === 'delivery' ? 'Deliver to me' : 'I’ll pick up'}
                  </button>
                ))}
              </div>
            </fieldset>

            {deliveryType === 'delivery' ? (
              <div>
                <label htmlFor="address" className={labelClass}>
                  Delivery address
                </label>
                <input
                  id="address"
                  autoComplete="street-address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={inputClass}
                  required
                />
              </div>
            ) : (
              <div>
                <label htmlFor="branch" className={labelClass}>
                  Pick up from
                </label>
                <select id="branch" value={branch} onChange={(e) => setBranch(e.target.value)} className={inputClass}>
                  {BRANCHES.map((b) => (
                    <option key={b.id}>{b.suburb}</option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label htmlFor="notes" className={labelClass}>
                Anything else? (optional)
              </label>
              <textarea id="notes" rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} className={inputClass} />
            </div>

            <Button type="submit" className="w-full">
              Send for pricing
            </Button>
            <p className="text-center text-[14px] text-muted">No payment now. You&apos;ll accept the price before anything is ordered.</p>
          </form>
        </Tile>
      ) : (
        <p className="mt-8 rounded-3xl bg-panel px-6 py-6 text-center text-muted">
          Your account can build a cart but can&apos;t send it. Ask your manager to send it through.
        </p>
      )}

      <div className="mt-6 text-center">
        <Link href="/portal/catalogue" className="text-[15px] font-medium text-brand hover:underline">
          Keep shopping
        </Link>
      </div>
    </div>
  );
}
