'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Bell,
  Search,
  ShoppingCart,
  Package,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Zap,
  TrendingUp,
  MapPin,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { SKUS, PATTERNS } from '@/data/mockData';

export default function DealerPortalHomePage() {
  const router = useRouter();
  const { session, pricingRequests, orders, dealerReorder, addToCart } = useApp();

  const [searchSize, setSearchSize] = useState('');

  // Quotes ready for action
  const readyQuotes = pricingRequests.filter(
    (r) => r.status === 'quote_ready' && r.dealerId === session?.dealerId
  );

  // Active orders in progress
  const activeOrders = orders.filter(
    (o) => o.dealerId === session?.dealerId && o.status !== 'delivered' && o.status !== 'cancelled'
  );

  // Past completed orders for reorder
  const deliveredOrders = orders.filter(
    (o) => o.dealerId === session?.dealerId && o.status === 'delivered'
  );

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/portal/catalogue?size=${encodeURIComponent(searchSize)}`);
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white border border-[#DEE2E6] rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#6C757D] uppercase mb-1">
            <span>Wholesale Account Active</span>
            <span>&bull;</span>
            <span className="text-[#D50000] font-bold">Tier {session?.tier || 'A'} Pricing</span>
          </div>
          <h1 className="font-condensed font-black text-3xl sm:text-4xl text-[#1C1F22] uppercase">
            WELCOME BACK, {session?.name?.toUpperCase() || 'DAVE'}
          </h1>
          <p className="text-xs sm:text-sm text-[#6C757D] mt-1 max-w-xl">
            {session?.dealerName || 'Apex Fleet Logistics Pty Ltd'} &bull; Primary Hub: <strong>{session?.branch || 'Rocklea Central HQ'}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/portal/rapid-order"
            className="bg-[#1C1F22] hover:bg-[#343A40] text-white px-5 py-2.5 rounded-lg text-xs font-condensed font-bold uppercase tracking-wider flex items-center gap-1.5 transition"
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span>SKU Rapid Order</span>
          </Link>
          <Link
            href="/portal/catalogue"
            className="bg-[#D50000] hover:bg-[#B30000] text-white px-5 py-2.5 rounded-lg text-xs font-condensed font-bold uppercase tracking-wider flex items-center gap-1.5 transition shadow"
          >
            <Search className="w-4 h-4" />
            <span>Search Catalogue</span>
          </Link>
        </div>
      </div>

      {/* "Needs Your Action" Priority Strip (Blueprint Section 9) */}
      {readyQuotes.length > 0 && (
        <div className="bg-[#FFF5F5] border-2 border-[#D50000] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#D50000] animate-ping" />
              <h2 className="font-condensed font-black text-xl text-[#D50000] uppercase tracking-wide">
                NEEDS YOUR ACTION: {readyQuotes.length} QUOTE PRICED &amp; READY TO APPROVE
              </h2>
            </div>
            <span className="text-xs font-mono text-[#6C757D]">Valid for 7 Days</span>
          </div>

          <div className="space-y-3">
            {readyQuotes.map((q) => (
              <div
                key={q.id}
                className="bg-white border border-[#F8D7DA] rounded-xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-base text-[#1C1F22]">
                      {q.quoteNumber}
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded font-mono">
                      Priced with Tier {session?.tier || 'A'} Discount
                    </span>
                  </div>

                  <div className="text-xs text-[#495057] mt-1.5">
                    {q.lines.length} items ({q.lines.reduce((a, b) => a + b.quantity, 0)} tyres total):{' '}
                    {q.lines.map((l) => `${l.quantity}x ${l.brand} ${l.size}`).join(', ')}
                  </div>

                  <div className="text-[11px] text-[#6C757D] mt-1">
                    PO Ref: <strong>{q.poNumber}</strong> &bull; Deliver to: {q.branchOrAddress}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-[10px] uppercase font-bold text-[#6C757D]">Quote Total (Inc GST)</div>
                    <div className="font-mono font-black text-2xl text-[#D50000]">
                      ${q.total?.toFixed(2)}
                    </div>
                  </div>

                  <Link
                    href={`/portal/quotes/${q.id}`}
                    className="bg-[#D50000] hover:bg-[#B30000] text-white px-5 py-2.5 rounded-lg text-xs font-condensed font-bold uppercase tracking-wider flex items-center gap-1.5 transition shadow"
                  >
                    <span>Review &amp; Accept</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Tyre Finder on Portal Dashboard (Blueprint Page 18, 20) */}
      <div className="bg-white border border-[#DEE2E6] rounded-2xl p-6 shadow-sm">
        <h2 className="font-condensed font-bold text-lg text-[#1C1F22] uppercase mb-4 flex items-center gap-2">
          <Search className="w-4 h-4 text-[#D50000]" />
          <span>Quick Tyre Dimension Lookup (Direct from Warehouse)</span>
        </h2>

        <form onSubmit={handleQuickSearch} className="flex items-center gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Enter size e.g. 11R22.5, 295/80R22.5, 385/65, or 11r225..."
              value={searchSize}
              onChange={(e) => setSearchSize(e.target.value)}
              className="w-full bg-[#F8F9FA] border border-[#CED4DA] rounded-lg pl-4 pr-10 py-3 text-sm font-mono text-[#1C1F22] focus:border-[#D50000] focus:outline-none"
            />
            <Search className="w-4 h-4 text-[#6C757D] absolute right-3 top-3.5" />
          </div>

          <button
            type="submit"
            className="bg-[#1C1F22] hover:bg-[#343A40] text-white px-6 py-3 rounded-lg font-condensed font-bold text-sm uppercase tracking-wider transition"
          >
            Check Stock
          </button>
        </form>

        <div className="mt-3 flex items-center gap-2 text-xs text-[#6C757D]">
          <span>Popular Sizes:</span>
          {['11R22.5', '295/80R22.5', '315/80R22.5', '385/65R22.5'].map((s) => (
            <Link
              key={s}
              href={`/portal/catalogue?size=${encodeURIComponent(s)}`}
              className="bg-[#F8F9FA] hover:bg-[#E9ECEF] border border-[#DEE2E6] px-2 py-0.5 rounded font-mono text-[11px] text-[#1C1F22]"
            >
              {s}
            </Link>
          ))}
        </div>
      </div>

      {/* Two Columns: Active Orders in Progress & Past Order Reorder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Orders In Progress */}
        <div className="bg-white border border-[#DEE2E6] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-condensed font-bold text-xl text-[#1C1F22] uppercase flex items-center gap-2">
                <Package className="w-5 h-5 text-[#D50000]" />
                <span>Orders in Progress</span>
              </h2>
              <Link href="/portal/orders" className="text-xs text-[#D50000] hover:underline font-bold font-condensed uppercase">
                View All &rarr;
              </Link>
            </div>

            {activeOrders.length === 0 ? (
              <div className="text-center py-10 text-[#6C757D] bg-[#F8F9FA] rounded-xl border border-[#DEE2E6]">
                <Package className="w-8 h-8 mx-auto mb-2 text-[#ADB5BD]" />
                <p className="text-xs">No pending orders currently being dispatched.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {activeOrders.map((ord) => (
                  <div key={ord.id} className="p-4 rounded-xl border border-[#DEE2E6] bg-[#F8F9FA]">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-sm text-[#1C1F22]">{ord.orderNumber}</span>
                      <span className="text-[10px] font-condensed font-bold uppercase bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                        {ord.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="text-xs text-[#495057] mt-1">
                      PO: {ord.poNumber} &bull; Destination: {ord.branchOrAddress}
                    </div>
                    <div className="mt-2 text-xs font-mono font-bold text-[#1C1F22]">
                      Total: ${ord.total.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 1-Click Reorder from Recent Orders */}
        <div className="bg-white border border-[#DEE2E6] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-condensed font-bold text-xl text-[#1C1F22] uppercase flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-emerald-600" />
                <span>Reorder From Past Purchases</span>
              </h2>
              <span className="text-xs text-[#6C757D]">Repeat Sets</span>
            </div>

            {deliveredOrders.length === 0 ? (
              <div className="text-center py-10 text-[#6C757D] bg-[#F8F9FA] rounded-xl border border-[#DEE2E6]">
                <p className="text-xs">Past completed orders will appear here for instant 1-click reorder.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {deliveredOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-4 rounded-xl border border-[#DEE2E6] hover:border-[#CED4DA] transition bg-white flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="font-mono font-bold text-xs text-[#1C1F22]">
                        {ord.orderNumber} (PO: {ord.poNumber})
                      </div>
                      <div className="text-xs text-[#495057] mt-0.5">
                        {ord.lines.map((l) => `${l.quantity}x ${l.brand} ${l.size}`).join(', ')}
                      </div>
                      <div className="text-[10px] text-[#6C757D] mt-1">
                        Delivered &bull; ${ord.total.toFixed(2)}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        dealerReorder(ord.id);
                        router.push('/portal/cart');
                      }}
                      className="bg-[#25292E] hover:bg-[#D50000] text-white px-3.5 py-2 rounded-lg text-xs font-condensed font-bold uppercase tracking-wider flex items-center gap-1.5 transition shrink-0"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reorder Lines</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* System Notices & Inbound Stock Arrivals */}
      <div className="bg-white border border-[#DEE2E6] rounded-2xl p-6 shadow-sm">
        <h3 className="font-condensed font-bold text-lg text-[#1C1F22] uppercase mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-500" />
          <span>Queensland Warehouse Stock Replenishment Alerts</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-[#F8F9FA] rounded-xl border border-[#DEE2E6]">
            <div className="font-bold text-[#1C1F22] font-condensed text-sm">
              Ralson RDC55 11R22.5 Deep Drive (24mm)
            </div>
            <div className="text-emerald-700 font-mono font-bold mt-1">
              +120 Units Inbound &bull; ETA Oct 15
            </div>
            <div className="text-[11px] text-[#6C757D] mt-1">
              Arriving into Rocklea Central Distribution Hub
            </div>
          </div>

          <div className="p-4 bg-[#F8F9FA] rounded-xl border border-[#DEE2E6]">
            <div className="font-bold text-[#1C1F22] font-condensed text-sm">
              Blacklion BD175 11R22.5 Severe Drive
            </div>
            <div className="text-emerald-700 font-mono font-bold mt-1">
              +90 Units Inbound &bull; ETA Oct 19
            </div>
            <div className="text-[11px] text-[#6C757D] mt-1">
              Allocated for Yatala &amp; Rocklea depots
            </div>
          </div>

          <div className="p-4 bg-[#F8F9FA] rounded-xl border border-[#DEE2E6]">
            <div className="font-bold text-[#1C1F22] font-condensed text-sm">
              Triangle TRS02 295/80R22.5 Steer
            </div>
            <div className="text-emerald-700 font-mono font-bold mt-1">
              +60 Units Inbound &bull; ETA Oct 21
            </div>
            <div className="text-[11px] text-[#6C757D] mt-1">
              Steer fleet replenishment shipment
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
