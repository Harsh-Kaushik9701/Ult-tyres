'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Shield,
  FileSpreadsheet,
  Users,
  Package,
  Layers,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Search,
  Send,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Truck,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { PRICE_MATRIX, SKUS } from '@/data/mockData';
import { PricingRequest, QuoteLine } from '@/types';

export default function AdminDeskPage() {
  const {
    pricingRequests,
    adminQuoteRfq,
    applications,
    adminApproveApplication,
    adminRejectApplication,
    orders,
    adminUpdateOrderStatus,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'rfqs' | 'applications' | 'matrix' | 'fulfillment'>('rfqs');

  // Currently editing quote in modal
  const [editingRfq, setEditingRfq] = useState<PricingRequest | null>(null);
  const [linePrices, setLinePrices] = useState<
    Record<string, { unitPrice: number; discount: number }>
  >({});
  const [freightAmount, setFreightAmount] = useState(80);
  const [staffNotes, setStaffNotes] = useState('');
  const [suggestAlternative, setSuggestAlternative] = useState(false);
  const [altSkuId, setAltSkuId] = useState('bl-bd175-11r225');

  // Open Quote Editor and automatically pre-fill suggested quantity-band prices!
  const handleOpenQuoteEditor = (rfq: PricingRequest) => {
    setEditingRfq(rfq);

    // Auto-calculate suggested price per line from internal Price Matrix quantity bands
    const calculated: Record<string, { unitPrice: number; discount: number }> = {};
    rfq.lines.forEach((line) => {
      const matrix = PRICE_MATRIX[line.skuId];
      let basePrice = 330;

      if (matrix) {
        if (line.quantity >= 50) basePrice = matrix.baseBands['50+'];
        else if (line.quantity >= 20) basePrice = matrix.baseBands['20-49'];
        else if (line.quantity >= 8) basePrice = matrix.baseBands['8-19'];
        else if (line.quantity >= 4) basePrice = matrix.baseBands['4-7'];
        else basePrice = matrix.baseBands['1-3'];
      }

      calculated[line.skuId] = {
        unitPrice: line.unitPrice || basePrice,
        discount: line.discountPercent || 0,
      };
    });

    setLinePrices(calculated);
    setFreightAmount(rfq.freight || 80);
    setStaffNotes(
      rfq.pricingStaffNotes ||
        'Priced with Tier wholesale discount. Stock reserved at Rocklea Central Hub for immediate dispatch.'
    );
  };

  const handleSendQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRfq) return;

    const formattedLines = editingRfq.lines.map((l) => ({
      skuId: l.skuId,
      unitPrice: linePrices[l.skuId]?.unitPrice || 320,
      discountPercent: linePrices[l.skuId]?.discount || 0,
    }));

    let altData = undefined;
    if (suggestAlternative) {
      const altSku = SKUS.find((s) => s.id === altSkuId);
      if (altSku) {
        altData = {
          skuId: altSku.id,
          brand: altSku.brandName,
          pattern: altSku.patternCode,
          size: altSku.size,
          unitPrice: 315,
          reason: 'Alternative tier 1 option in stock at Yatala with higher cut resistance',
        };
      }
    }

    adminQuoteRfq(editingRfq.id, formattedLines, staffNotes, freightAmount, altData);
    setEditingRfq(null);
  };

  // Applications approval state
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [appTier, setAppTier] = useState<'A' | 'B' | 'C'>('A');
  const [appBranch, setAppBranch] = useState<'Rocklea' | 'Yatala' | 'Bald Hills'>('Rocklea');

  return (
    <div className="min-h-screen bg-[#121416] text-[#CED4DA] font-body flex flex-col">
      {/* Admin Top Ribbon */}
      <header className="bg-[#1C1F22] border-b border-[#25292E] px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-amber-500 flex items-center justify-center font-condensed font-black text-xl text-black">
            UT
          </div>
          <div>
            <span className="font-condensed font-black text-lg text-white tracking-wider block leading-tight">
              ULTIMATE TYRES BACK-OFFICE
            </span>
            <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">
              Commercial Sales &amp; Pricing Desk (Sydney Edge)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/portal"
            className="text-xs font-condensed font-bold uppercase text-[#CED4DA] hover:text-white flex items-center gap-1.5 transition"
          >
            <span>Open Dealer Portal View</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/"
            className="text-xs font-condensed font-bold uppercase bg-[#25292E] text-white px-3 py-1.5 rounded border border-[#343A40] hover:bg-[#D50000] transition"
          >
            Exit to Public Site
          </Link>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="p-6 max-w-7xl mx-auto w-full flex-1 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#25292E] pb-3 overflow-x-auto">
          {[
            {
              id: 'rfqs',
              label: 'RFQ Pricing Queue',
              icon: FileSpreadsheet,
              count: pricingRequests.filter((r) => r.status === 'submitted').length,
              countColor: 'bg-[#D50000] text-white',
            },
            {
              id: 'applications',
              label: 'Dealer ABN Applications',
              icon: Users,
              count: applications.filter((a) => a.status === 'pending').length,
              countColor: 'bg-amber-500 text-black',
            },
            { id: 'fulfillment', label: 'Order Dispatch Desk', icon: Package, count: orders.length },
            { id: 'matrix', label: 'SKU Price Matrix', icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-lg text-xs font-condensed font-bold uppercase tracking-wider transition flex items-center gap-2 whitespace-nowrap ${
                  active
                    ? 'bg-[#D50000] text-white shadow'
                    : 'bg-[#1C1F22] text-[#CED4DA] hover:bg-[#25292E] border border-[#2B3036]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && tab.count > 0 && (
                  <span
                    className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full ${
                      tab.countColor || 'bg-[#343A40] text-white'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: RFQ Pricing Queue (Section 11 & 22) */}
        {activeTab === 'rfqs' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-condensed font-black text-2xl text-white uppercase">
                  RFQ Pricing Queue &bull; 2-Hour SLA Target
                </h2>
                <p className="text-xs text-[#868E96]">
                  Pre-fills quantity-band matrix prices so staff can price requests in 1–2 minutes.
                </p>
              </div>

              <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded border border-emerald-500/20">
                Matrix Auto-Prefill: ACTIVE
              </span>
            </div>

            <div className="bg-[#1C1F22] border border-[#2B3036] rounded-2xl overflow-hidden shadow-xl">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#121416] text-[#868E96] font-condensed font-bold uppercase border-b border-[#25292E]">
                  <tr>
                    <th className="py-3 px-4">Quote #</th>
                    <th className="py-3 px-4">Dealer / Account</th>
                    <th className="py-3 px-4">PO Ref</th>
                    <th className="py-3 px-4">Items / Total Units</th>
                    <th className="py-3 px-4">Status / SLA Timer</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#25292E]">
                  {pricingRequests.map((rfq) => {
                    const isSubmitted = rfq.status === 'submitted';
                    const totalQty = rfq.lines.reduce((a, b) => a + b.quantity, 0);

                    return (
                      <tr key={rfq.id} className="hover:bg-[#25292E] transition">
                        <td className="py-3 px-4 font-mono font-bold text-white">
                          {rfq.quoteNumber}
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-white">{rfq.dealerName}</div>
                          <div className="text-[11px] text-[#868E96]">{rfq.requestedBy}</div>
                        </td>
                        <td className="py-3 px-4 font-mono text-[#CED4DA]">{rfq.poNumber}</td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-white">{totalQty} Tyres</span>
                          <span className="text-[#868E96] block text-[11px]">
                            {rfq.lines.length} Line Items
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {isSubmitted ? (
                            <span className="bg-[#D50000] text-white text-[10px] font-condensed font-bold uppercase px-2 py-0.5 rounded shadow animate-pulse">
                              Pending Quote (1h 42m Left on SLA)
                            </span>
                          ) : (
                            <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-condensed font-bold uppercase px-2 py-0.5 rounded border border-emerald-500/30">
                              {rfq.status.replace('_', ' ')}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => handleOpenQuoteEditor(rfq)}
                            className="bg-[#D50000] hover:bg-[#B30000] text-white px-4 py-1.5 rounded text-xs font-condensed font-bold uppercase tracking-wider transition shadow"
                          >
                            {isSubmitted ? 'Price & Send Quote' : 'Edit Quote'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: Dealer Applications Queue (Section 8 & 22) */}
        {activeTab === 'applications' && (
          <div className="space-y-4">
            <div>
              <h2 className="font-condensed font-black text-2xl text-white uppercase">
                Dealer ABN Trade Applications
              </h2>
              <p className="text-xs text-[#868E96]">
                Verify Australian Business Register (ABR) data, assign wholesale pricing tiers and fulfillment hubs.
              </p>
            </div>

            <div className="space-y-4">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="bg-[#1C1F22] border border-[#2B3036] rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-condensed font-black text-xl text-white">
                        {app.businessName}
                      </span>
                      <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                        ABN {app.abn} (Active)
                      </span>
                      <span className="text-[10px] uppercase font-bold text-amber-400 font-mono">
                        {app.businessType.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-3 text-xs text-[#CED4DA]">
                      <div>
                        <span className="text-[#868E96] block text-[10px] uppercase font-bold">Contact:</span>
                        <span>{app.contactName} ({app.role})</span>
                      </div>
                      <div>
                        <span className="text-[#868E96] block text-[10px] uppercase font-bold">Phone:</span>
                        <span className="font-mono text-white">{app.mobile}</span>
                      </div>
                      <div>
                        <span className="text-[#868E96] block text-[10px] uppercase font-bold">Volume:</span>
                        <span>{app.estimatedMonthlyVolume}</span>
                      </div>
                      <div>
                        <span className="text-[#868E96] block text-[10px] uppercase font-bold">Credit Pref:</span>
                        <span className="text-amber-400">{app.creditPreference}</span>
                      </div>
                    </div>

                    <div className="mt-2 text-xs text-[#868E96]">
                      Delivery Address: {app.deliveryAddress} &bull; Brands: {app.brandsOfInterest.join(', ')}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end md:self-center">
                    {app.status === 'pending' ? (
                      <>
                        <button
                          onClick={() => {
                            adminApproveApplication(app.id, 'A', 'Rocklea');
                          }}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-xs font-condensed font-bold uppercase tracking-wider transition"
                        >
                          Approve (Tier A)
                        </button>
                        <button
                          onClick={() => adminRejectApplication(app.id)}
                          className="bg-[#25292E] hover:bg-rose-950 text-rose-400 px-3 py-2 rounded-lg text-xs font-condensed font-bold uppercase transition border border-[#343A40]"
                        >
                          Decline
                        </button>
                      </>
                    ) : (
                      <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded border border-emerald-500/20">
                        Status: {app.status.toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Order Fulfillment Desk */}
        {activeTab === 'fulfillment' && (
          <div className="space-y-4">
            <div>
              <h2 className="font-condensed font-black text-2xl text-white uppercase">
                Warehouse Order Fulfillment &amp; Dispatch Desk
              </h2>
              <p className="text-xs text-[#868E96]">
                Update consignment status, assign delivery vans, and trigger customer SMS dispatch ETAs.
              </p>
            </div>

            <div className="space-y-4">
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-[#1C1F22] border border-[#2B3036] rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-lg text-white">{ord.orderNumber}</span>
                      <span className="text-xs font-mono text-amber-400">PO: {ord.poNumber}</span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-mono px-2 py-0.5 rounded font-bold uppercase">
                        {ord.status.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="text-xs text-[#CED4DA] mt-2">
                      Customer: <strong>{ord.dealerName}</strong> &bull; Total: ${ord.total.toFixed(2)}
                    </div>
                    <div className="text-xs text-[#868E96] mt-0.5">
                      Destination: {ord.branchOrAddress}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() =>
                        adminUpdateOrderStatus(ord.id, 'ready_for_pickup', 'Order picked & staged at bay')
                      }
                      className="bg-[#25292E] hover:bg-[#343A40] text-white px-3 py-1.5 rounded text-xs font-condensed font-bold uppercase border border-[#343A40]"
                    >
                      Stage at Bay
                    </button>
                    <button
                      onClick={() =>
                        adminUpdateOrderStatus(
                          ord.id,
                          'dispatched',
                          'Loaded on Van #04 with SMS tracking',
                          { trackingNumber: 'UT-EXP-9921', carrier: 'Ultimate Delivery Fleet' }
                        )
                      }
                      className="bg-purple-700 hover:bg-purple-600 text-white px-3 py-1.5 rounded text-xs font-condensed font-bold uppercase"
                    >
                      Dispatch on Van (SMS)
                    </button>
                    <button
                      onClick={() =>
                        adminUpdateOrderStatus(ord.id, 'delivered', 'Signed by yard supervisor POD #442')
                      }
                      className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded text-xs font-condensed font-bold uppercase"
                    >
                      Mark Delivered
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Price Matrix Manager */}
        {activeTab === 'matrix' && (
          <div className="space-y-4">
            <div>
              <h2 className="font-condensed font-black text-2xl text-white uppercase">
                Internal Commercial Quantity Price Matrix
              </h2>
              <p className="text-xs text-[#868E96]">
                Pre-configured volume pricing bands applied when generating quotes for dealers.
              </p>
            </div>

            <div className="bg-[#1C1F22] border border-[#2B3036] rounded-2xl overflow-hidden shadow-xl">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#121416] text-[#868E96] font-condensed font-bold uppercase border-b border-[#25292E]">
                  <tr>
                    <th className="py-3 px-4">SKU / Pattern Code</th>
                    <th className="py-3 px-4 text-center">1–3 Tyres</th>
                    <th className="py-3 px-4 text-center">4–7 Tyres</th>
                    <th className="py-3 px-4 text-center">8–19 Tyres</th>
                    <th className="py-3 px-4 text-center">20–49 Tyres</th>
                    <th className="py-3 px-4 text-center text-emerald-400">50+ Tyres (Bulk)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#25292E] font-mono text-white">
                  {Object.entries(PRICE_MATRIX).map(([skuId, item]) => {
                    const matchedSku = SKUS.find((s) => s.id === skuId);
                    return (
                      <tr key={skuId} className="hover:bg-[#25292E]">
                        <td className="py-3 px-4">
                          <span className="font-bold text-[#FF3B30] font-sans">
                            {matchedSku?.brandName} {matchedSku?.patternCode}
                          </span>
                          <span className="text-[11px] text-[#868E96] block">
                            {matchedSku?.size}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">${item.baseBands['1-3']}</td>
                        <td className="py-3 px-4 text-center">${item.baseBands['4-7']}</td>
                        <td className="py-3 px-4 text-center font-bold">${item.baseBands['8-19']}</td>
                        <td className="py-3 px-4 text-center text-amber-400 font-bold">
                          ${item.baseBands['20-49']}
                        </td>
                        <td className="py-3 px-4 text-center text-emerald-400 font-black">
                          ${item.baseBands['50+']}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Quote Editor Modal (Blueprint Section 10 & 22) */}
      {editingRfq && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1C1F22] border border-[#343A40] rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#25292E] mb-6">
              <div>
                <span className="text-xs font-mono uppercase text-amber-400 font-bold">
                  Commercial Pricing Desk
                </span>
                <h3 className="font-condensed font-black text-2xl text-white uppercase mt-0.5">
                  Price Quote {editingRfq.quoteNumber} for {editingRfq.dealerName}
                </h3>
              </div>
              <button
                onClick={() => setEditingRfq(null)}
                className="text-[#868E96] hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendQuote} className="space-y-6 text-xs">
              {/* Line pricing table */}
              <div className="space-y-3">
                <div className="text-[11px] uppercase font-bold text-[#868E96] font-condensed">
                  Line Items &amp; Quantity-Band Pricing Adjustments:
                </div>

                {editingRfq.lines.map((line) => {
                  const currentPrice = linePrices[line.skuId]?.unitPrice || 320;
                  const discount = linePrices[line.skuId]?.discount || 0;
                  const lineTotal = +(currentPrice * line.quantity * (1 - discount / 100)).toFixed(2);

                  return (
                    <div
                      key={line.skuId}
                      className="bg-[#121416] border border-[#2B3036] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="font-condensed font-bold text-white text-base">
                          {line.quantity}x {line.brand} {line.pattern} ({line.size})
                        </div>
                        <div className="text-[11px] text-[#868E96] font-mono">
                          {line.fullSizeCode} &bull; Matched Matrix Tier applied
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div>
                          <label className="block text-[10px] text-[#868E96] uppercase mb-0.5">
                            Unit Price ($)
                          </label>
                          <input
                            type="number"
                            step="0.5"
                            value={currentPrice}
                            onChange={(e) =>
                              setLinePrices((prev) => ({
                                ...prev,
                                [line.skuId]: {
                                  unitPrice: parseFloat(e.target.value) || 0,
                                  discount,
                                },
                              }))
                            }
                            className="w-24 bg-[#1C1F22] border border-[#343A40] text-white rounded p-1.5 text-xs font-mono font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] text-[#868E96] uppercase mb-0.5">
                            Disc %
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="25"
                            value={discount}
                            onChange={(e) =>
                              setLinePrices((prev) => ({
                                ...prev,
                                [line.skuId]: {
                                  unitPrice: currentPrice,
                                  discount: parseFloat(e.target.value) || 0,
                                },
                              }))
                            }
                            className="w-16 bg-[#1C1F22] border border-[#343A40] text-white rounded p-1.5 text-xs font-mono"
                          />
                        </div>

                        <div className="text-right min-w-[80px]">
                          <span className="block text-[10px] text-[#868E96] uppercase">Line Total</span>
                          <strong className="font-mono text-sm text-[#FF3B30]">${lineTotal}</strong>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Delivery Freight & Alternative Offer */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#868E96] font-bold uppercase mb-1">
                    Courier Freight Fee ($AUD)
                  </label>
                  <input
                    type="number"
                    value={freightAmount}
                    onChange={(e) => setFreightAmount(parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#121416] border border-[#343A40] text-white rounded-lg p-2 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[#868E96] font-bold uppercase mb-1">
                    Suggest Alternative Tyre Line?
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="checkbox"
                      checked={suggestAlternative}
                      onChange={(e) => setSuggestAlternative(e.target.checked)}
                      className="accent-[#D50000] w-4 h-4 rounded"
                    />
                    <span className="text-[#CED4DA]">Include Blacklion BD175 Alternative Line</span>
                  </div>
                </div>
              </div>

              {/* Staff Notes */}
              <div>
                <label className="block text-[#868E96] font-bold uppercase mb-1">
                  Pricing Desk Notes (Visible to Dealer on Quote)
                </label>
                <textarea
                  rows={2}
                  value={staffNotes}
                  onChange={(e) => setStaffNotes(e.target.value)}
                  className="w-full bg-[#121416] border border-[#343A40] text-white rounded-lg p-2.5 focus:border-[#D50000] focus:outline-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#25292E] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setEditingRfq(null)}
                  className="px-4 py-2 font-condensed font-bold uppercase text-[#868E96] hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-[#D50000] hover:bg-[#B30000] text-white px-7 py-3 rounded-lg font-condensed font-bold text-sm uppercase tracking-wider transition flex items-center gap-2 shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Quote to Dealer (Trigger SMS/Email)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
