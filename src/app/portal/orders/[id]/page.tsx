'use client';

import { notFound, useParams, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Button, ChevronLink } from '@/components/ui';
import { OrderStatusPill } from '@/components/StatusPill';
import { ORDER_STATUS, money, shortDate, poLabel } from '@/lib/status';
import type { OrderStatus } from '@/types';

const STEPS: OrderStatus[] = ['confirmed', 'dispatched', 'delivered'];

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params?.id as string;
  const { hydrated, session, orders, dealerReorder } = useApp();

  // Wait for saved orders to load, otherwise a refresh on a new order shows "not found".
  if (!hydrated) {
    return <p className="py-16 text-center text-muted" role="status">Loading order…</p>;
  }

  // A dealer may only open their own orders; anything else is treated as not found.
  const order = orders.find((o) => o.id === orderId && o.dealerId === session?.dealerId);
  if (!order) return notFound();

  const pickup = order.deliveryType === 'pickup';
  const steps = pickup ? (['confirmed', 'ready_for_pickup', 'delivered'] as OrderStatus[]) : STEPS;
  const current = order.status === 'cancelled' ? -1 : Math.max(0, steps.indexOf(order.status));

  return (
    <div className="mx-auto max-w-2xl">
      <ChevronLink href="/portal/orders" className="text-[15px]">
        All orders
      </ChevronLink>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-4xl font-semibold">{order.orderNumber}</h1>
        <OrderStatusPill status={order.status} />
      </div>
      <p className="mt-1 text-lg text-muted">
        Ordered {shortDate(order.createdAt)} · {poLabel(order.poNumber)}
      </p>

      {order.status !== 'cancelled' && (
        <ol className="mt-8 grid grid-cols-3 gap-2" aria-label="Order progress">
          {steps.map((s, i) => (
            <li key={s} className="text-center">
              <div className={`h-1.5 rounded-full ${i <= current ? 'bg-brand' : 'bg-line'}`} />
              <p className={`mt-2 text-[14px] ${i <= current ? 'font-medium text-ink' : 'text-muted'}`}>
                {s === 'delivered' && pickup ? 'Collected' : ORDER_STATUS[s].label}
              </p>
            </li>
          ))}
        </ol>
      )}

      {(order.trackingNumber || order.bayNumber) && (
        <p className="mt-6 rounded-2xl bg-panel px-5 py-4 text-[15px]">
          {order.trackingNumber && (
            <>
              Tracking: <span className="font-medium">{order.carrier ? `${order.carrier} ` : ''}{order.trackingNumber}</span>
            </>
          )}
          {order.bayNumber && (
            <>
              Pick up from bay <span className="font-medium">{order.bayNumber}</span>
            </>
          )}
        </p>
      )}

      <ul className="mt-8 divide-y divide-line overflow-hidden rounded-3xl bg-panel">
        {order.lines.map((l) => (
          <li key={l.skuId} className="flex items-center justify-between gap-4 px-6 py-4">
            <div className="min-w-0">
              <p className="font-semibold">
                {l.brand} {l.pattern}
              </p>
              <p className="text-[15px] text-muted">
                {l.size} · {l.quantity} × {l.unitPrice !== undefined ? money(l.unitPrice) : ''}
              </p>
            </div>
            {l.lineTotal !== undefined && <span className="shrink-0 font-semibold tabular-nums">{money(l.lineTotal)}</span>}
          </li>
        ))}
        <li className="flex justify-between px-6 py-5 text-xl font-semibold">
          <span>Total inc GST</span>
          <span className="tabular-nums">{money(order.total)}</span>
        </li>
      </ul>

      <p className="mt-6 text-[15px] text-muted">
        {pickup ? 'Pick up: ' : 'Delivering to: '}
        <span className="text-ink">{order.branchOrAddress}</span>
      </p>

      <div className="mt-8">
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            dealerReorder(order.id);
            router.push('/portal/cart');
          }}
        >
          Order these again
        </Button>
      </div>
    </div>
  );
}
