'use client';

import { useState } from 'react';
import { notFound, useParams, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Button, ChevronLink, Tile, inputClass } from '@/components/ui';
import { QuoteStatusPill } from '@/components/StatusPill';
import { money, shortDate } from '@/lib/status';

const DECLINE_REASONS = ['Price is too high', 'Found it elsewhere', 'Don’t need it any more', 'Other'];

export default function QuoteDetailPage() {
  const params = useParams();
  const router = useRouter();
  const quoteId = params?.id as string;
  const { hydrated, session, pricingRequests, dealerAcceptQuote, dealerDeclineQuote, addRfqThreadMessage } = useApp();

  const [message, setMessage] = useState('');
  const [declining, setDeclining] = useState(false);
  const [reason, setReason] = useState(DECLINE_REASONS[0]);

  // Wait for saved requests to load, otherwise a refresh on a new quote shows "not found".
  if (!hydrated) {
    return <p className="py-16 text-center text-muted" role="status">Loading quote…</p>;
  }

  // A dealer may only open their own requests; anything else is treated as not found.
  const q = pricingRequests.find((r) => r.id === quoteId && r.dealerId === session?.dealerId);
  if (!q) return notFound();

  const priced = q.status !== 'submitted';
  const canRespond = q.status === 'quote_ready' && (session?.role === 'owner' || session?.role === 'buyer');

  return (
    <div className="mx-auto max-w-2xl">
      <ChevronLink href="/portal/quotes" className="text-[15px]">
        All quotes
      </ChevronLink>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-4xl font-semibold">{q.quoteNumber}</h1>
        <QuoteStatusPill status={q.status} />
      </div>
      <p className="mt-1 text-lg text-muted">
        {q.status === 'submitted' && 'Thanks. We’re working out your price and will let you know by SMS and email.'}
        {q.status === 'quote_ready' && `Your price is ready.${q.expiresAt ? ` Valid until ${shortDate(q.expiresAt)}.` : ''}`}
        {q.status === 'accepted' && 'Accepted. Your order is on its way through.'}
        {q.status === 'declined' && 'You declined this quote.'}
        {q.status === 'expired' && 'This quote has expired. Add the tyres to your cart again for a fresh price.'}
      </p>

      <ul className="mt-8 divide-y divide-line overflow-hidden rounded-3xl bg-panel">
        {q.lines.map((l) => (
          <li key={l.skuId} className="flex items-center justify-between gap-4 px-6 py-4">
            <div className="min-w-0">
              <p className="font-semibold">
                {l.brand} {l.pattern}
              </p>
              <p className="text-[15px] text-muted">
                {l.size} · {l.quantity} × {priced && l.unitPrice !== undefined ? money(l.unitPrice) : 'price to come'}
              </p>
            </div>
            {priced && l.lineTotal !== undefined && <span className="shrink-0 font-semibold tabular-nums">{money(l.lineTotal)}</span>}
          </li>
        ))}
        {priced && q.total !== undefined && (
          <li className="space-y-1 px-6 py-5 text-[15px]">
            {q.freight ? (
              <div className="flex justify-between text-muted">
                <span>Freight</span>
                <span className="tabular-nums">{money(q.freight)}</span>
              </div>
            ) : null}
            <div className="flex justify-between text-muted">
              <span>GST</span>
              <span className="tabular-nums">{money(q.gst ?? 0)}</span>
            </div>
            <div className="flex justify-between pt-2 text-xl font-semibold">
              <span>Total</span>
              <span className="tabular-nums">{money(q.total)}</span>
            </div>
          </li>
        )}
      </ul>

      {canRespond && !declining && (
        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            type="button"
            onClick={() => {
              const order = dealerAcceptQuote(q.id);
              if (order) router.push(`/portal/orders/${order.id}`);
            }}
          >
            Accept and order
          </Button>
          <Button type="button" variant="secondary" onClick={() => setDeclining(true)}>
            Decline
          </Button>
        </div>
      )}

      {canRespond && declining && (
        <Tile className="mt-6 px-6 py-6">
          <label htmlFor="decline-reason" className="mb-2 block font-medium">
            What&apos;s the reason?
          </label>
          <select id="decline-reason" value={reason} onChange={(e) => setReason(e.target.value)} className={inputClass}>
            {DECLINE_REASONS.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
          <div className="mt-4 flex gap-3">
            <Button type="button" variant="dark" onClick={() => dealerDeclineQuote(q.id, reason)}>
              Decline quote
            </Button>
            <Button type="button" variant="secondary" onClick={() => setDeclining(false)}>
              Cancel
            </Button>
          </div>
        </Tile>
      )}

      {/* Messages */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold">Messages</h2>
        {(q.threadMessages ?? []).length > 0 && (
          <ul className="mt-4 space-y-3">
            {q.threadMessages!.map((m, i) => (
              <li
                key={i}
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${m.role === 'staff' ? 'bg-panel' : 'ml-auto bg-ink text-white'}`}
              >
                <p className={`text-[13px] ${m.role === 'staff' ? 'text-muted' : 'text-on-dark'}`}>{m.sender}</p>
                <p className="mt-0.5">{m.message}</p>
              </li>
            ))}
          </ul>
        )}
        <form
          className="mt-4 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (!message.trim()) return;
            addRfqThreadMessage(q.id, message.trim());
            setMessage('');
          }}
        >
          <label htmlFor="quote-message" className="sr-only">
            Message
          </label>
          <input
            id="quote-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask us a question about this quote"
            className={inputClass}
          />
          <Button type="submit" variant="dark" className="shrink-0">
            Send
          </Button>
        </form>
      </section>
    </div>
  );
}
