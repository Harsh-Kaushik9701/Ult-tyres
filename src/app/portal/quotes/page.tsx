'use client';

import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { ButtonLink } from '@/components/ui';
import { QuoteStatusPill } from '@/components/StatusPill';
import { money, shortDate, poLabel } from '@/lib/status';

export default function QuotesPage() {
  const { session, pricingRequests } = useApp();
  const mine = pricingRequests.filter((r) => !!session?.dealerId && r.dealerId === session.dealerId);

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-4xl font-semibold">Quotes</h1>
      <p className="mt-1 text-lg text-muted">Your pricing requests and the prices we&apos;ve sent back.</p>

      {mine.length === 0 ? (
        <div className="mt-10 rounded-3xl bg-panel px-6 py-12 text-center">
          <p className="text-lg font-medium">No quotes yet.</p>
          <p className="mt-1 text-muted">Add tyres to your cart and send it for pricing.</p>
          <div className="mt-6">
            <ButtonLink href="/portal/catalogue">Browse tyres</ButtonLink>
          </div>
        </div>
      ) : (
        <ul className="mt-8 divide-y divide-line overflow-hidden rounded-3xl bg-panel">
          {mine.map((q) => (
            <li key={q.id}>
              <Link
                href={`/portal/quotes/${q.id}`}
                className="flex flex-col gap-2 px-6 py-5 transition hover:bg-line/30 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-lg font-semibold">{q.quoteNumber}</p>
                  <p className="text-[15px] text-muted">
                    {shortDate(q.createdAt)} · {q.lines.reduce((n, l) => n + l.quantity, 0)} tyres · {poLabel(q.poNumber)}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  {q.total !== undefined && q.status !== 'submitted' && (
                    <span className="font-semibold tabular-nums">{money(q.total)}</span>
                  )}
                  <QuoteStatusPill status={q.status} />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
