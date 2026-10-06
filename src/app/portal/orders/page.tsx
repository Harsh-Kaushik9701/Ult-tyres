'use client';

import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { ButtonLink } from '@/components/ui';
import { OrderStatusPill } from '@/components/StatusPill';
import { money, shortDate, poLabel } from '@/lib/status';

export default function OrdersPage() {
  const { session, orders } = useApp();
  const mine = orders.filter((o) => !!session?.dealerId && o.dealerId === session.dealerId);

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-4xl font-semibold">Orders</h1>
      <p className="mt-1 text-lg text-muted">Everything you&apos;ve ordered and where it&apos;s up to.</p>

      {mine.length === 0 ? (
        <div className="mt-10 rounded-3xl bg-panel px-6 py-12 text-center">
          <p className="text-lg font-medium">No orders yet.</p>
          <p className="mt-1 text-muted">Accept a quote and it will show up here.</p>
          <div className="mt-6">
            <ButtonLink href="/portal/quotes" variant="secondary">
              View quotes
            </ButtonLink>
          </div>
        </div>
      ) : (
        <ul className="mt-8 divide-y divide-line overflow-hidden rounded-3xl bg-panel">
          {mine.map((o) => (
            <li key={o.id}>
              <Link
                href={`/portal/orders/${o.id}`}
                className="flex flex-col gap-2 px-6 py-5 transition hover:bg-line/30 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-lg font-semibold">{o.orderNumber}</p>
                  <p className="text-[15px] text-muted">
                    {shortDate(o.createdAt)} · {o.lines.reduce((n, l) => n + l.quantity, 0)} tyres · {poLabel(o.poNumber)}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold tabular-nums">{money(o.total)}</span>
                  <OrderStatusPill status={o.status} />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
