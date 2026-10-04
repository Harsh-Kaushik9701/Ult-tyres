'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileSpreadsheet,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ArrowRight,
  Filter,
  Search,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { RfqStatus } from '@/types';

export default function QuotesListPage() {
  const { session, pricingRequests } = useApp();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter requests for active dealer
  const dealerRfqs = pricingRequests.filter((r) => {
    // Only this dealer's requests
    if (!session?.dealerId || r.dealerId !== session.dealerId) return false;

    if (statusFilter !== 'all' && r.status !== statusFilter) return false;

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        r.quoteNumber.toLowerCase().includes(q) ||
        r.poNumber.toLowerCase().includes(q) ||
        r.lines.some((l) => l.brand.toLowerCase().includes(q) || l.size.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const getStatusBadge = (status: RfqStatus) => {
    switch (status) {
      case 'submitted':
        return (
          <span className="bg-amber-100 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded-full text-[11px] font-condensed font-bold uppercase flex items-center gap-1">
            <Clock className="w-3 h-3 animate-spin" />
            <span>Under Pricing Review (2h SLA)</span>
          </span>
        );
      case 'quote_ready':
        return (
          <span className="bg-[#D50000] text-white px-2.5 py-0.5 rounded-full text-[11px] font-condensed font-bold uppercase flex items-center gap-1 shadow animate-pulse">
            <CheckCircle2 className="w-3 h-3" />
            <span>Quote Ready &bull; Action Required</span>
          </span>
        );
      case 'accepted':
        return (
          <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[11px] font-condensed font-bold uppercase flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Accepted (Order Created)</span>
          </span>
        );
      case 'declined':
        return (
          <span className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full text-[11px] font-condensed font-bold uppercase">
            Declined
          </span>
        );
      case 'expired':
        return (
          <span className="bg-rose-100 text-rose-800 px-2.5 py-0.5 rounded-full text-[11px] font-condensed font-bold uppercase">
            Expired
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white border border-[#DEE2E6] rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-condensed font-black text-2xl sm:text-3xl text-[#1C1F22] uppercase">
            PRICING REQUESTS &amp; QUOTES (RFQ)
          </h1>
          <p className="text-xs text-[#6C757D] mt-0.5">
            Review your quantity-discounted commercial quotes, ask technical questions, and accept orders.
          </p>
        </div>

        <Link
          href="/portal/catalogue"
          className="bg-[#D50000] hover:bg-[#B30000] text-white px-5 py-2.5 rounded-lg text-xs font-condensed font-bold uppercase tracking-wider transition shadow shrink-0"
        >
          + New Pricing Request
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-[#DEE2E6] shadow-sm">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {[
            { id: 'all', label: 'All Requests' },
            { id: 'quote_ready', label: 'Ready for Acceptance' },
            { id: 'submitted', label: 'Under Review' },
            { id: 'accepted', label: 'Accepted' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-condensed font-bold uppercase transition whitespace-nowrap ${
                statusFilter === tab.id
                  ? 'bg-[#1C1F22] text-white'
                  : 'bg-[#F8F9FA] text-[#495057] hover:bg-[#E9ECEF]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-[#ADB5BD] absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search RFQ# or PO..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#F8F9FA] border border-[#CED4DA] rounded-lg pl-8 pr-3 py-2 text-xs font-mono text-[#1C1F22] focus:outline-none focus:border-[#D50000]"
          />
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {dealerRfqs.length === 0 ? (
          <div className="bg-white border border-[#DEE2E6] rounded-2xl p-12 text-center text-[#6C757D] shadow-sm">
            <FileSpreadsheet className="w-10 h-10 text-[#ADB5BD] mx-auto mb-3" />
            <h3 className="font-condensed font-bold text-lg text-[#1C1F22] uppercase">
              No matching pricing requests
            </h3>
            <p className="text-xs text-[#868E96] mt-1">
              Submit tyre items from your RFQ cart to receive quotes.
            </p>
          </div>
        ) : (
          dealerRfqs.map((rfq) => {
            const isReady = rfq.status === 'quote_ready';
            const totalUnits = rfq.lines.reduce((a, b) => a + b.quantity, 0);

            return (
              <div
                key={rfq.id}
                className={`bg-white rounded-2xl p-6 border transition-all shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 ${
                  isReady
                    ? 'border-[#D50000] ring-1 ring-[#D50000]/30 hover:shadow-md'
                    : 'border-[#DEE2E6] hover:border-[#CED4DA]'
                }`}
              >
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-mono font-black text-xl text-[#1C1F22]">
                      {rfq.quoteNumber}
                    </span>
                    {getStatusBadge(rfq.status)}
                    <span className="text-xs font-mono text-[#6C757D]">
                      PO: <strong className="text-[#1C1F22]">{rfq.poNumber}</strong>
                    </span>
                  </div>

                  <div className="text-xs text-[#495057] mt-2 space-y-0.5">
                    <div>
                      <strong>Items ({totalUnits} Tyres):</strong>{' '}
                      {rfq.lines.map((l) => `${l.quantity}x ${l.brand} ${l.size}`).join(', ')}
                    </div>
                    <div className="text-[#6C757D]">
                      Deliver to: {rfq.branchOrAddress} &bull; Required By: {rfq.requiredByDate}
                    </div>
                  </div>

                  {rfq.pricingStaffNotes && (
                    <div className="mt-3 p-2.5 bg-[#F8F9FA] rounded-lg border border-[#E9ECEF] text-[11px] text-[#495057] max-w-xl">
                      <strong className="text-[#1C1F22]">Staff Note:</strong> {rfq.pricingStaffNotes}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-6 self-end md:self-center">
                  {rfq.total ? (
                    <div className="text-right">
                      <div className="text-[10px] uppercase font-bold text-[#6C757D]">
                        Quoted Total (Inc GST)
                      </div>
                      <div className="font-mono font-black text-2xl text-[#1C1F22]">
                        ${rfq.total.toFixed(2)}
                      </div>
                      <div className="text-[10px] text-emerald-700 font-mono font-semibold">
                        Ex-GST: ${rfq.subtotal?.toFixed(2)}
                      </div>
                    </div>
                  ) : (
                    <div className="text-right text-xs font-mono text-[#868E96]">
                      Pricing pending
                    </div>
                  )}

                  <Link
                    href={`/portal/quotes/${rfq.id}`}
                    className={`px-5 py-2.5 rounded-lg text-xs font-condensed font-bold uppercase tracking-wider flex items-center gap-1.5 transition shadow ${
                      isReady
                        ? 'bg-[#D50000] hover:bg-[#B30000] text-white shadow-red-950'
                        : 'bg-[#1C1F22] hover:bg-[#343A40] text-white'
                    }`}
                  >
                    <span>{isReady ? 'Review Quote' : 'View Request'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
