'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { ButtonLink, ChevronLink, Tile } from '@/components/ui';
import { OrderStatusPill } from '@/components/StatusPill';
import { money, shortDate, poLabel } from '@/lib/status';

export default function PortalHomePage() {
  const router = useRouter();
  const { session, pricingRequests, orders, dealerReorder } = useApp();

  const mine = pricingRequests.filter((r) => r.dealerId === session?.dealerId);
  const ready = mine.filter((r) => r.status === 'quote_ready');
  const waiting = mine.filter((r) => r.status === 'submitted').length;
  const recentOrders = orders.filter((o) => o.dealerId === session?.dealerId).slice(0, 3);
  const firstName = session?.name?.split(' ')[0] ?? 'mate';

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-semibold">G&apos;day, {firstName}.</h1>
        <p className="mt-1 text-lg text-muted">
          {waiting > 0 ? `${waiting} ${waiting === 1 ? 'request is' : 'requests are'} waiting for a price.` : 'What do you need today?'}
        </p>
      </div>

      {ready.map((q) => (
        <Tile key={q.id} dark className="flex flex-col gap-4 px-7 py-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[15px] font-semibold text-brand-light">Your price is ready</p>
            <p className="mt-1 text-2xl font-semibold">
              {q.quoteNumber} · {q.total !== undefined ? money(q.total) : ''}
            </p>
            <p className="mt-1 text-on-dark">
              {q.lines.reduce((n, l) => n + l.quantity, 0)} tyres · {poLabel(q.poNumber)}
            </p>
          </div>
          <ButtonLink href={`/portal/quotes/${q.id}`}>Review and accept</ButtonLink>
        </Tile>
      ))}

      <form
        className="flex items-center gap-2 rounded-full bg-panel p-2"
        onSubmit={(e) => {
          e.preventDefault();
          const size = new FormData(e.currentTarget).get('size')?.toString() ?? '';
          router.push(`/portal/catalogue?size=${encodeURIComponent(size)}`);
        }}
      >
        <label htmlFor="portal-size" className="sr-only">
          Tyre size
        </label>
        <Search className="ml-3 h-5 w-5 shrink-0 text-muted" aria-hidden />
        <input
          id="portal-size"
          name="size"
          placeholder="Find a tyre, e.g. 11R22.5"
          className="min-w-0 flex-1 bg-transparent px-1 py-2 text-[16px] outline-none placeholder:text-muted"
        />
        <button type="submit" className="rounded-full bg-ink px-5 py-2 text-[15px] font-medium text-white hover:bg-black">
          Search
        </button>
      </form>

      <section>
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-2xl font-semibold">Recent orders</h2>
          <ChevronLink href="/portal/orders">All orders</ChevronLink>
        </div>
        {recentOrders.length === 0 ? (
          <p className="rounded-3xl bg-panel px-6 py-8 text-center text-muted">No orders yet.</p>
        ) : (
          <ul className="divide-y divide-line overflow-hidden rounded-3xl bg-panel">
            {recentOrders.map((o) => (
              <li key={o.id} className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <Link href={`/portal/orders/${o.id}`} className="text-lg font-semibold hover:text-brand">
                    {o.orderNumber}
                  </Link>
                  <p className="text-[15px] text-muted">
                    {shortDate(o.createdAt)} · {o.lines.reduce((n, l) => n + l.quantity, 0)} tyres
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <OrderStatusPill status={o.status} />
                  <button
                    type="button"
                    onClick={() => {
                      dealerReorder(o.id);
                      router.push('/portal/cart');
                    }}
                    className="rounded-full bg-white px-4 py-1.5 text-[14px] font-medium hover:bg-line/60"
                  >
                    Order again
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
