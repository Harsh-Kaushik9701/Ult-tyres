'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { SKUS } from '@/data/mockData';
import type { OrderStatus, PricingRequest, SkuPriceMatrix } from '@/types';
import { Button, inputClass } from '@/components/ui';
import { OrderStatusPill, QuoteStatusPill } from '@/components/StatusPill';
import { money, shortDate, poLabel } from '@/lib/status';
import { getSuggestedPrices, getPriceMatrix } from './actions';

type AdminTab = 'requests' | 'applications' | 'orders' | 'prices';

const BRANCH_NAMES = ['Rocklea', 'Yatala', 'Bald Hills'] as const;

export default function AdminPage() {
  const {
    pricingRequests,
    adminQuoteRfq,
    applications,
    adminApproveApplication,
    adminRejectApplication,
    orders,
    adminUpdateOrderStatus,
  } = useApp();

  const [tab, setTab] = useState<AdminTab>('requests');

  // Quote editor
  const [editing, setEditing] = useState<PricingRequest | null>(null);
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [freight, setFreight] = useState(0);
  const [note, setNote] = useState('');

  // Price list (loaded from the server only when opened)
  const [matrix, setMatrix] = useState<Record<string, SkuPriceMatrix> | null>(null);
  const [matrixError, setMatrixError] = useState<string | null>(null);

  // Application approval settings
  const [tier, setTier] = useState<'A' | 'B' | 'C'>('B');
  const [branch, setBranch] = useState<(typeof BRANCH_NAMES)[number]>('Rocklea');

  const waiting = pricingRequests.filter((r) => r.status === 'submitted').length;
  const pendingApps = applications.filter((a) => a.status === 'pending').length;

  const openTab = (t: AdminTab) => {
    setTab(t);
    setEditing(null);
    if (t === 'prices' && !matrix) {
      getPriceMatrix()
        .then(setMatrix)
        .catch(() => setMatrixError('Couldn’t load the price list. Check you’re signed in as staff.'));
    }
  };

  const openEditor = async (rfq: PricingRequest) => {
    setEditing(rfq);
    setFreight(rfq.freight ?? 0);
    setNote(rfq.pricingStaffNotes ?? '');
    let suggested: Record<string, number> = {};
    try {
      suggested = await getSuggestedPrices(rfq.lines.map((l) => ({ skuId: l.skuId, quantity: l.quantity })));
    } catch {
      // Leave blank for manual pricing.
    }
    setPrices(Object.fromEntries(rfq.lines.map((l) => [l.skuId, l.unitPrice ?? suggested[l.skuId] ?? 0])));
  };

  const sendQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    adminQuoteRfq(
      editing.id,
      editing.lines.map((l) => ({ skuId: l.skuId, unitPrice: prices[l.skuId] || 0 })),
      note,
      freight
    );
    setEditing(null);
  };

  const subtotal = editing ? editing.lines.reduce((sum, l) => sum + (prices[l.skuId] || 0) * l.quantity, 0) : 0;

  const tabs: { id: AdminTab; label: string; count?: number }[] = [
    { id: 'requests', label: 'Pricing requests', count: waiting },
    { id: 'applications', label: 'Dealer applications', count: pendingApps },
    { id: 'orders', label: 'Orders' },
    { id: 'prices', label: 'Price list' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-40 border-b border-line/70 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-[1080px] items-center justify-between px-5">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-ink text-[13px] font-bold text-white">UT</span>
            <span className="text-[15px] font-semibold">Admin</span>
          </div>
          <Link href="/" className="text-[13px] text-ink/75 hover:text-ink">
            Main website
          </Link>
        </div>
        <nav className="mx-auto max-w-[1080px] overflow-x-auto px-3" aria-label="Admin">
          <ul className="flex gap-1 pb-2">
            {tabs.map((t) => (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => openTab(t.id)}
                  aria-current={tab === t.id ? 'page' : undefined}
                  className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[14px] ${
                    tab === t.id ? 'bg-ink text-white' : 'text-ink/75 hover:bg-panel'
                  }`}
                >
                  {t.label}
                  {!!t.count && (
                    <span className="min-w-5 rounded-full bg-brand px-1.5 text-center text-[11px] font-semibold leading-5 text-white">
                      {t.count}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="mx-auto max-w-[1080px] px-5 py-10">
        {/* Pricing requests */}
        {tab === 'requests' && !editing && (
          <section>
            <h1 className="text-3xl font-semibold">Pricing requests</h1>
            <p className="mt-1 text-muted">
              {waiting === 0 ? 'All caught up.' : `${waiting} waiting for a price.`}
            </p>
            <ul className="mt-6 divide-y divide-line overflow-hidden rounded-3xl bg-panel">
              {pricingRequests.map((r) => (
                <li key={r.id} className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-lg font-semibold">
                      {r.quoteNumber} · {r.dealerName}
                    </p>
                    <p className="text-[15px] text-muted">
                      {shortDate(r.createdAt)} · {r.lines.reduce((n, l) => n + l.quantity, 0)} tyres · {poLabel(r.poNumber)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <QuoteStatusPill status={r.status} />
                    {(r.status === 'submitted' || r.status === 'quote_ready') && (
                      <Button type="button" variant={r.status === 'submitted' ? 'primary' : 'secondary'} onClick={() => openEditor(r)}>
                        {r.status === 'submitted' ? 'Price it' : 'Edit'}
                      </Button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {tab === 'requests' && editing && (
          <section className="mx-auto max-w-2xl">
            <button type="button" onClick={() => setEditing(null)} className="text-[15px] font-medium text-brand hover:underline">
              ‹ Back to requests
            </button>
            <h1 className="mt-4 text-3xl font-semibold">Price {editing.quoteNumber}</h1>
            <p className="mt-1 text-muted">
              {editing.dealerName} · {poLabel(editing.poNumber)} · {editing.branchOrAddress}
            </p>

            <form onSubmit={sendQuote} className="mt-8">
              <ul className="divide-y divide-line overflow-hidden rounded-3xl bg-panel">
                {editing.lines.map((l) => (
                  <li key={l.skuId} className="flex items-center justify-between gap-4 px-6 py-4">
                    <div className="min-w-0">
                      <p className="font-semibold">
                        {l.brand} {l.pattern} · {l.size}
                      </p>
                      <p className="text-[15px] text-muted">{l.quantity} tyres</p>
                    </div>
                    <label className="flex shrink-0 items-center gap-2">
                      <span className="text-[14px] text-muted">$ each</span>
                      <input
                        type="number"
                        min={0}
                        step="0.01"
                        value={prices[l.skuId] ?? 0}
                        onChange={(e) => setPrices((p) => ({ ...p, [l.skuId]: parseFloat(e.target.value) || 0 }))}
                        className="w-28 rounded-xl border border-line bg-white px-3 py-2 text-right tabular-nums"
                        aria-label={`Unit price for ${l.pattern} ${l.size}`}
                      />
                    </label>
                  </li>
                ))}
                <li className="flex items-center justify-between gap-4 px-6 py-4">
                  <span className="font-medium">Freight</span>
                  <input
                    type="number"
                    min={0}
                    step="0.01"
                    value={freight}
                    onChange={(e) => setFreight(parseFloat(e.target.value) || 0)}
                    className="w-28 rounded-xl border border-line bg-white px-3 py-2 text-right tabular-nums"
                    aria-label="Freight"
                  />
                </li>
                <li className="space-y-1 px-6 py-5 text-[15px]">
                  <div className="flex justify-between text-muted">
                    <span>GST</span>
                    <span className="tabular-nums">{money(subtotal * 0.1)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-semibold">
                    <span>Total</span>
                    <span className="tabular-nums">{money(subtotal * 1.1 + freight)}</span>
                  </div>
                </li>
              </ul>
              <p className="mt-3 text-[14px] text-muted">Prices are pre-filled from the price list for these quantities. Adjust if needed.</p>

              <label htmlFor="quote-note" className="mt-6 block text-sm font-medium">
                Note to the dealer (optional)
              </label>
              <textarea id="quote-note" rows={2} value={note} onChange={(e) => setNote(e.target.value)} className={`${inputClass} mt-1.5`} />

              <div className="mt-6 flex gap-3">
                <Button type="submit">Send quote</Button>
                <Button type="button" variant="secondary" onClick={() => setEditing(null)}>
                  Cancel
                </Button>
              </div>
            </form>
          </section>
        )}

        {/* Dealer applications */}
        {tab === 'applications' && (
          <section>
            <h1 className="text-3xl font-semibold">Dealer applications</h1>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-[15px]">
              <span className="text-muted">Approve with</span>
              <select value={tier} onChange={(e) => setTier(e.target.value as 'A' | 'B' | 'C')} className="rounded-full bg-panel px-3 py-1.5" aria-label="Price tier">
                <option value="A">Tier A</option>
                <option value="B">Tier B</option>
                <option value="C">Tier C</option>
              </select>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value as (typeof BRANCH_NAMES)[number])}
                className="rounded-full bg-panel px-3 py-1.5"
                aria-label="Home branch"
              >
                {BRANCH_NAMES.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </div>
            <ul className="mt-6 divide-y divide-line overflow-hidden rounded-3xl bg-panel">
              {applications.map((a) => (
                <li key={a.id} className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-lg font-semibold">{a.businessName}</p>
                    <p className="text-[15px] text-muted">
                      ABN {a.abn} · {a.contactName} · {a.mobile} · {a.estimatedMonthlyVolume}
                    </p>
                  </div>
                  {a.status === 'pending' ? (
                    <div className="flex gap-2">
                      <Button type="button" onClick={() => adminApproveApplication(a.id, tier, branch)}>
                        Approve
                      </Button>
                      <Button type="button" variant="secondary" onClick={() => adminRejectApplication(a.id)}>
                        Decline
                      </Button>
                    </div>
                  ) : (
                    <span className="rounded-full bg-white px-3 py-1 text-[13px] font-medium capitalize text-muted">
                      {a.status === 'approved' ? 'Approved' : 'Declined'}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Orders */}
        {tab === 'orders' && (
          <section>
            <h1 className="text-3xl font-semibold">Orders</h1>
            <ul className="mt-6 divide-y divide-line overflow-hidden rounded-3xl bg-panel">
              {orders.map((o) => {
                const next: { status: OrderStatus; label: string; note: string } | null =
                  o.status === 'confirmed'
                    ? o.deliveryType === 'pickup'
                      ? { status: 'ready_for_pickup', label: 'Ready to pick up', note: 'Ready at the branch' }
                      : { status: 'dispatched', label: 'Mark as sent', note: 'On the truck' }
                    : o.status === 'ready_for_pickup' || o.status === 'dispatched'
                      ? { status: 'delivered', label: 'Mark as delivered', note: 'Delivered' }
                      : null;
                return (
                  <li key={o.id} className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-lg font-semibold">
                        {o.orderNumber} · {o.dealerName}
                      </p>
                      <p className="text-[15px] text-muted">
                        {shortDate(o.createdAt)} · {o.lines.reduce((n, l) => n + l.quantity, 0)} tyres · {money(o.total)}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <OrderStatusPill status={o.status} />
                      {next && (
                        <Button type="button" variant="secondary" onClick={() => adminUpdateOrderStatus(o.id, next.status, next.note)}>
                          {next.label}
                        </Button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {/* Price list */}
        {tab === 'prices' && (
          <section>
            <h1 className="text-3xl font-semibold">Price list</h1>
            <p className="mt-1 text-muted">Unit price by quantity. Staff only. Dealers never see this list.</p>
            <div className="mt-6 overflow-x-auto rounded-3xl bg-panel">
              <table className="w-full min-w-[640px] text-left text-[15px]">
                <thead className="text-[13px] text-muted">
                  <tr>
                    <th className="px-6 py-4 font-medium">Tyre</th>
                    <th className="px-4 py-4 text-right font-medium">1–3</th>
                    <th className="px-4 py-4 text-right font-medium">4–7</th>
                    <th className="px-4 py-4 text-right font-medium">8–19</th>
                    <th className="px-4 py-4 text-right font-medium">20–49</th>
                    <th className="px-6 py-4 text-right font-medium">50+</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {matrixError && (
                    <tr>
                      <td colSpan={6} className="px-6 py-5 text-brand">{matrixError}</td>
                    </tr>
                  )}
                  {!matrix && !matrixError && (
                    <tr>
                      <td colSpan={6} className="px-6 py-5 text-muted">Loading…</td>
                    </tr>
                  )}
                  {Object.entries(matrix ?? {}).map(([skuId, item]) => {
                    const sku = SKUS.find((s) => s.id === skuId);
                    return (
                      <tr key={skuId}>
                        <td className="px-6 py-3">
                          <span className="font-medium">
                            {sku?.brandName} {sku?.patternCode}
                          </span>{' '}
                          <span className="text-muted">{sku?.size}</span>
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums">{money(item.baseBands['1-3'])}</td>
                        <td className="px-4 py-3 text-right tabular-nums">{money(item.baseBands['4-7'])}</td>
                        <td className="px-4 py-3 text-right tabular-nums">{money(item.baseBands['8-19'])}</td>
                        <td className="px-4 py-3 text-right tabular-nums">{money(item.baseBands['20-49'])}</td>
                        <td className="px-6 py-3 text-right tabular-nums">{money(item.baseBands['50+'])}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
