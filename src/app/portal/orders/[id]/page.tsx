'use client';

import React from 'react';
import Link from 'next/link';
import { notFound, useParams, useRouter } from 'next/navigation';
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  FileText,
  Phone,
  MessageSquare,
  ArrowLeft,
  RotateCcw,
  Printer,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params?.id as string;

  const { hydrated, session, orders, dealerReorder } = useApp();

  // Wait for saved orders to load, otherwise a refresh on a new order shows "not found".
  if (!hydrated) {
    return <div className="py-16 text-center text-sm text-[#6C757D]" role="status">Loading order…</div>;
  }

  // A dealer may only open their own orders; anything else is treated as not found.
  const order = orders.find((o) => o.id === orderId && o.dealerId === session?.dealerId);
  if (!order) return notFound();

  const handleReorder = () => {
    dealerReorder(order.id);
    router.push('/portal/cart');
  };

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/portal/orders"
          className="inline-flex items-center gap-1.5 text-xs font-condensed font-bold uppercase tracking-wider text-[#6C757D] hover:text-[#1C1F22] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Orders</span>
        </Link>
      </div>

      <div className="bg-white border border-[#DEE2E6] rounded-2xl p-6 sm:p-10 shadow-sm space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-[#E9ECEF]">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono font-black text-3xl text-[#1C1F22]">
                {order.orderNumber}
              </span>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full uppercase font-condensed">
                {order.status.replace('_', ' ')}
              </span>
            </div>

            <div className="text-xs text-[#6C757D] mt-2 space-y-0.5">
              <div>Associated Quote: <strong className="font-mono text-[#1C1F22]">{order.quoteNumber}</strong></div>
              <div>Customer PO: <strong className="font-mono text-[#1C1F22]">{order.poNumber}</strong></div>
              <div>Date Confirmed: <span className="font-mono text-[#495057]">{new Date(order.createdAt).toLocaleDateString()}</span></div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleReorder}
              className="bg-[#D50000] hover:bg-[#B30000] text-white px-5 py-2.5 rounded-lg text-xs font-condensed font-bold uppercase tracking-wider flex items-center gap-1.5 transition shadow"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reorder This Exact Tyre Set</span>
            </button>

            <button
              onClick={() => window.print()}
              className="bg-[#F8F9FA] hover:bg-[#E9ECEF] border border-[#CED4DA] text-[#1C1F22] px-4 py-2.5 rounded-lg text-xs font-condensed font-bold uppercase tracking-wider transition flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Manifest</span>
            </button>
          </div>
        </div>

        {/* Live Dispatch Timeline (Blueprint Page 40) */}
        <div>
          <h3 className="font-condensed font-bold text-lg text-[#1C1F22] uppercase mb-4 flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#D50000]" />
            <span>Fulfillment &amp; Dispatch Timeline</span>
          </h3>

          <div className="relative pl-6 border-l-2 border-[#E9ECEF] space-y-6 my-2">
            {order.timeline.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-[#D50000] ring-4 ring-white" />
                <div className="font-condensed font-bold text-sm text-[#1C1F22] uppercase">
                  {step.status.replace('_', ' ')}
                </div>
                <div className="text-xs text-[#495057] mt-0.5">{step.note}</div>
                <div className="text-[10px] font-mono text-[#868E96] mt-0.5">{step.timestamp}</div>
              </div>
            ))}
          </div>

          {order.trackingNumber && (
            <div className="mt-6 p-4 bg-[#F8F9FA] border border-[#DEE2E6] rounded-xl flex items-center justify-between text-xs">
              <div>
                <span className="text-[#868E96]">Carrier / Van:</span>{' '}
                <strong className="text-[#1C1F22]">{order.carrier || 'Ultimate Fleet Van #04'}</strong>
                <span className="mx-2 text-[#CED4DA]">&bull;</span>
                <span className="text-[#868E96]">Consignment #:</span>{' '}
                <strong className="font-mono text-[#D50000]">{order.trackingNumber}</strong>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="tel:1300110002"
                  className="text-xs font-bold text-[#D50000] hover:underline flex items-center gap-1 font-condensed uppercase"
                >
                  <Phone className="w-3 h-3" />
                  <span>Call Dispatch</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Items Table */}
        <div>
          <h3 className="font-condensed font-bold text-lg text-[#1C1F22] uppercase mb-3">
            Fitted Tyre Specifications
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#1C1F22] text-[#CED4DA] font-condensed font-bold uppercase">
                <tr>
                  <th className="py-2.5 px-4">Tyre Specification</th>
                  <th className="py-2.5 px-3 text-center">Qty</th>
                  <th className="py-2.5 px-3 text-right">Unit Price</th>
                  <th className="py-2.5 px-4 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E9ECEF] text-[#1C1F22]">
                {order.lines.map((line, i) => (
                  <tr key={i} className="hover:bg-[#F8F9FA]">
                    <td className="py-3 px-4">
                      <div className="font-bold text-[#1C1F22] font-condensed text-sm">
                        {line.brand} &bull; {line.pattern}
                      </div>
                      <div className="font-mono text-[11px] text-[#D50000]">
                        {line.fullSizeCode || line.size}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center font-mono font-bold text-sm">
                      {line.quantity}
                    </td>
                    <td className="py-3 px-3 text-right font-mono">
                      ${line.unitPrice?.toFixed(2) || '-'}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold">
                      ${line.lineTotal?.toFixed(2) || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end pt-4 border-t border-[#E9ECEF]">
            <div className="w-64 space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-[#6C757D]">
                <span>Ex-GST Subtotal:</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#6C757D]">
                <span>Freight:</span>
                <span>${order.freight.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#6C757D]">
                <span>GST:</span>
                <span>${order.gst.toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-[#CED4DA] flex justify-between text-base font-bold text-[#1C1F22]">
                <span>Total Paid / Invoiced:</span>
                <span className="text-[#D50000]">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
