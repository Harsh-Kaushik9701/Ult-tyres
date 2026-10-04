'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Package,
  Clock,
  CheckCircle2,
  Truck,
  RotateCcw,
  Search,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { OrderStatus } from '@/types';

export default function OrdersListPage() {
  const router = useRouter();
  const { session, orders, dealerReorder } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const dealerOrders = orders.filter((o) => {
    if (session?.dealerId && o.dealerId !== session.dealerId) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        o.poNumber.toLowerCase().includes(q) ||
        (o.trackingNumber && o.trackingNumber.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full text-[11px] font-condensed font-bold uppercase flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Confirmed &bull; Queued for Pick</span>
          </span>
        );
      case 'ready_for_pickup':
        return (
          <span className="bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full text-[11px] font-condensed font-bold uppercase flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>Ready for Bay Collection</span>
          </span>
        );
      case 'dispatched':
        return (
          <span className="bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-full text-[11px] font-condensed font-bold uppercase flex items-center gap-1">
            <Truck className="w-3 h-3" />
            <span>Dispatched on Delivery Run</span>
          </span>
        );
      case 'delivered':
        return (
          <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full text-[11px] font-condensed font-bold uppercase flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Delivered &amp; Signed</span>
          </span>
        );
      case 'cancelled':
        return (
          <span className="bg-rose-100 text-rose-800 px-2.5 py-0.5 rounded-full text-[11px] font-condensed font-bold uppercase">
            Cancelled
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-[#DEE2E6] rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-condensed font-black text-2xl sm:text-3xl text-[#1C1F22] uppercase">
            ORDER HISTORY &amp; DISPATCH TRACKING
          </h1>
          <p className="text-xs text-[#6C757D] mt-0.5">
            Track confirmed tyre deliveries, review signed POD manifests, and 1-click reorder recurring fleet tyre sets.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-[#ADB5BD] absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search Order# or PO..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#F8F9FA] border border-[#CED4DA] rounded-lg pl-8 pr-3 py-2 text-xs font-mono text-[#1C1F22] focus:border-[#D50000] focus:outline-none"
          />
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {dealerOrders.length === 0 ? (
          <div className="bg-white border border-[#DEE2E6] rounded-2xl p-12 text-center text-[#6C757D] shadow-sm">
            <Package className="w-10 h-10 text-[#ADB5BD] mx-auto mb-3" />
            <h3 className="font-condensed font-bold text-lg text-[#1C1F22] uppercase">
              No orders found
            </h3>
            <p className="text-xs text-[#868E96] mt-1">
              Accepted quotes will be fulfilled here.
            </p>
          </div>
        ) : (
          dealerOrders.map((ord) => (
            <div
              key={ord.id}
              className="bg-white border border-[#DEE2E6] hover:border-[#CED4DA] rounded-2xl p-6 shadow-sm transition flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-mono font-black text-xl text-[#1C1F22]">
                    {ord.orderNumber}
                  </span>
                  {getStatusBadge(ord.status)}
                  <span className="text-xs font-mono text-[#6C757D]">
                    PO: <strong className="text-[#1C1F22]">{ord.poNumber}</strong>
                  </span>
                </div>

                <div className="text-xs text-[#495057] mt-2">
                  <strong>Lines:</strong>{' '}
                  {ord.lines.map((l) => `${l.quantity}x ${l.brand} ${l.size}`).join(', ')}
                </div>

                <div className="text-[11px] text-[#6C757D] mt-1 flex items-center gap-3 flex-wrap">
                  <span>Destination: {ord.branchOrAddress}</span>
                  {ord.trackingNumber && (
                    <span>
                      Carrier Tracking: <strong className="font-mono text-[#1C1F22]">{ord.trackingNumber}</strong>
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 self-end md:self-center">
                <div className="text-right">
                  <div className="text-[10px] uppercase font-bold text-[#6C757D]">Total (Inc GST)</div>
                  <div className="font-mono font-black text-2xl text-[#1C1F22]">
                    ${ord.total.toFixed(2)}
                  </div>
                </div>

                {/* 1-Click Reorder Button (Blueprint Page 20) */}
                <button
                  onClick={() => {
                    dealerReorder(ord.id);
                    router.push('/portal/cart');
                  }}
                  className="bg-[#25292E] hover:bg-[#D50000] text-white px-3.5 py-2.5 rounded-lg text-xs font-condensed font-bold uppercase tracking-wider flex items-center gap-1.5 transition"
                  title="Puts identical lines into the cart for a fresh quote"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reorder</span>
                </button>

                <Link
                  href={`/portal/orders/${ord.id}`}
                  className="bg-[#1C1F22] hover:bg-[#343A40] text-white px-4 py-2.5 rounded-lg text-xs font-condensed font-bold uppercase tracking-wider flex items-center gap-1.5 transition"
                >
                  <span>Track Status</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
