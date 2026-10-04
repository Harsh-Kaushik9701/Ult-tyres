'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShoppingCart,
  Trash2,
  Send,
  Building2,
  Calendar,
  FileText,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Shield,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { BRANCHES } from '@/data/mockData';

export default function CartPage() {
  const router = useRouter();
  const { session, cart, updateCartQuantity, removeFromCart, clearCart, submitPricingRequest } = useApp();

  const [poNumber, setPoNumber] = useState(`PO-${Date.now().toString().slice(-5)}`);
  const [requiredByDate, setRequiredByDate] = useState('2026-10-09');
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [pickupBranch, setPickupBranch] = useState('Rocklea Central HQ');
  const [deliveryAddress, setDeliveryAddress] = useState(
    session?.dealerName ? '88 Logistics Blvd, Crestmead QLD 4132' : '10 Industrial Way, Brisbane QLD'
  );
  const [rfqNotes, setRfqNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = session?.role === 'owner' || session?.role === 'buyer';
  const totalTyres = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || cart.length === 0) return;

    setIsSubmitting(true);
    const destination = deliveryType === 'delivery' ? deliveryAddress : pickupBranch;

    setTimeout(() => {
      const newRfq = submitPricingRequest({
        poNumber,
        requiredByDate,
        deliveryType,
        branchOrAddress: destination,
        notes: rfqNotes,
      });

      router.push(`/portal/quotes/${newRfq.id}`);
    }, 600);
  };

  if (cart.length === 0) {
    return (
      <div className="bg-white border border-[#DEE2E6] rounded-2xl p-12 text-center shadow-sm">
        <div className="w-16 h-16 rounded-full bg-[#F8F9FA] border border-[#DEE2E6] flex items-center justify-center mx-auto mb-4 text-[#ADB5BD]">
          <ShoppingCart className="w-8 h-8" />
        </div>
        <h2 className="font-condensed font-black text-2xl text-[#1C1F22] uppercase">
          Your RFQ Cart is Empty
        </h2>
        <p className="text-xs text-[#6C757D] mt-1 max-w-sm mx-auto">
          Add commercial truck or bus tyre sizes to your basket to request quantity-band pricing.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href="/portal/catalogue"
            className="bg-[#D50000] hover:bg-[#B30000] text-white px-6 py-2.5 rounded-lg font-condensed font-bold text-xs uppercase tracking-wider transition shadow"
          >
            Browse Catalogue
          </Link>
          <Link
            href="/portal/rapid-order"
            className="bg-[#1C1F22] hover:bg-[#343A40] text-white px-6 py-2.5 rounded-lg font-condensed font-bold text-xs uppercase tracking-wider transition"
          >
            SKU Rapid Order
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-condensed font-black text-3xl text-[#1C1F22] uppercase">
            REQUEST-FOR-PRICING (RFQ) BASKET
          </h1>
          <p className="text-xs text-[#6C757D] mt-0.5">
            Review lines and delivery dispatch parameters. Prices are not shown publicly; our commercial desk calculates volume discounts upon submission.
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-[#868E96] hover:text-red-600 transition font-bold font-condensed uppercase flex items-center gap-1 self-start sm:self-auto"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Cart</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Cart Items List */}
        <div className="lg:col-span-7 bg-white border border-[#DEE2E6] rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E9ECEF] text-xs font-condensed font-bold uppercase text-[#6C757D]">
            <span>Selected Commercial Line Items ({cart.length} SKUs)</span>
            <span>Total: {totalTyres} Tyres</span>
          </div>

          <div className="divide-y divide-[#E9ECEF]">
            {cart.map((item) => (
              <div key={item.skuId} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-condensed font-bold text-base text-[#1C1F22]">
                      {item.brandName} &bull; {item.patternName}
                    </span>
                    <span className="text-[10px] font-condensed font-bold uppercase bg-[#E9ECEF] text-[#495057] px-2 py-0.5 rounded">
                      {item.axlePosition}
                    </span>
                  </div>

                  <div className="font-mono font-bold text-sm text-[#D50000] mt-0.5">
                    {item.size}
                  </div>
                  <div className="text-[11px] font-mono text-[#6C757D]">
                    {item.fullSizeCode}
                  </div>

                  <div className="mt-2 text-xs text-emerald-700 font-bold flex items-center gap-1 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>In Stock at Rocklea &bull; Ready for Dispatch</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* Quantity Stepper */}
                  <div className="flex items-center bg-[#F8F9FA] border border-[#CED4DA] rounded-lg">
                    <button
                      onClick={() => updateCartQuantity(item.skuId, item.quantity - 2)}
                      className="w-8 h-8 flex items-center justify-center font-bold text-base hover:bg-[#E9ECEF]"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-mono font-bold text-xs">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.skuId, item.quantity + 2)}
                      className="w-8 h-8 flex items-center justify-center font-bold text-base hover:bg-[#E9ECEF]"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Item */}
                  <button
                    onClick={() => removeFromCart(item.skuId)}
                    className="p-2 text-[#868E96] hover:text-red-600 transition"
                    title="Remove from cart"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: RFQ Submission Parameters & Address Form */}
        <div className="lg:col-span-5 bg-white border border-[#DEE2E6] rounded-2xl p-6 shadow-sm">
          <h2 className="font-condensed font-black text-xl text-[#1C1F22] uppercase mb-4 border-b border-[#E9ECEF] pb-2">
            Dispatch &amp; Order Parameters
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Purchase Order Number */}
            <div>
              <label className="block text-[#6C757D] font-bold uppercase mb-1">
                Customer Purchase Order (PO Number) *
              </label>
              <div className="relative">
                <FileText className="w-4 h-4 text-[#ADB5BD] absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={poNumber}
                  onChange={(e) => setPoNumber(e.target.value)}
                  placeholder="e.g. PO-APX-9821"
                  className="w-full bg-[#F8F9FA] border border-[#CED4DA] rounded-lg pl-9 pr-3 py-2.5 font-mono font-bold text-[#1C1F22] focus:border-[#D50000] focus:outline-none"
                />
              </div>
            </div>

            {/* Required By Date */}
            <div>
              <label className="block text-[#6C757D] font-bold uppercase mb-1">
                Required On-Site Date *
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-[#ADB5BD] absolute left-3 top-3" />
                <input
                  type="date"
                  required
                  value={requiredByDate}
                  onChange={(e) => setRequiredByDate(e.target.value)}
                  className="w-full bg-[#F8F9FA] border border-[#CED4DA] rounded-lg pl-9 pr-3 py-2.5 font-mono text-[#1C1F22] focus:border-[#D50000] focus:outline-none"
                />
              </div>
            </div>

            {/* Delivery Method Choice */}
            <div>
              <label className="block text-[#6C757D] font-bold uppercase mb-1.5">
                Delivery or Customer Bay Collection *
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDeliveryType('delivery')}
                  className={`py-2 px-3 rounded-lg border text-xs font-condensed font-bold uppercase transition ${
                    deliveryType === 'delivery'
                      ? 'bg-[#1C1F22] text-white border-[#1C1F22]'
                      : 'bg-[#F8F9FA] text-[#495057] border-[#CED4DA]'
                  }`}
                >
                  Direct Depot Delivery
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryType('pickup')}
                  className={`py-2 px-3 rounded-lg border text-xs font-condensed font-bold uppercase transition ${
                    deliveryType === 'pickup'
                      ? 'bg-[#1C1F22] text-white border-[#1C1F22]'
                      : 'bg-[#F8F9FA] text-[#495057] border-[#CED4DA]'
                  }`}
                >
                  Collect from Branch
                </button>
              </div>
            </div>

            {/* Address / Branch Pickup input */}
            {deliveryType === 'delivery' ? (
              <div>
                <label className="block text-[#6C757D] font-bold uppercase mb-1">
                  Workshop Delivery Address
                </label>
                <textarea
                  rows={2}
                  required
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full bg-[#F8F9FA] border border-[#CED4DA] rounded-lg p-2.5 text-xs text-[#1C1F22] focus:border-[#D50000] focus:outline-none"
                />
              </div>
            ) : (
              <div>
                <label className="block text-[#6C757D] font-bold uppercase mb-1">
                  Select Pickup Branch Hub
                </label>
                <select
                  value={pickupBranch}
                  onChange={(e) => setPickupBranch(e.target.value)}
                  className="w-full bg-[#F8F9FA] border border-[#CED4DA] rounded-lg px-3 py-2.5 text-xs text-[#1C1F22] focus:border-[#D50000] focus:outline-none"
                >
                  <option>Rocklea Central HQ (1452 Ipswich Rd)</option>
                  <option>Yatala Logistics Depot (28 Enterprise Dr)</option>
                  <option>Bald Hills Northside Depot (2105 Gympie Rd)</option>
                </select>
              </div>
            )}

            {/* Notes to Pricing Desk */}
            <div>
              <label className="block text-[#6C757D] font-bold uppercase mb-1">
                Special Instructions / Urgency Notes
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Need Monday morning 7 AM delivery for trailer turnaround..."
                value={rfqNotes}
                onChange={(e) => setRfqNotes(e.target.value)}
                className="w-full bg-[#F8F9FA] border border-[#CED4DA] rounded-lg p-2.5 text-xs text-[#1C1F22] focus:border-[#D50000] focus:outline-none"
              />
            </div>

            {/* Role permission check */}
            {!canSubmit && (
              <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-lg text-xs flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  You are viewing as <strong>Workshop Staff</strong>. Staff members can build and modify carts, but RFQ submission must be confirmed by an Owner or Buyer role.
                </span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className="w-full bg-[#D50000] hover:bg-[#B30000] disabled:opacity-50 text-white py-3.5 rounded-xl font-condensed font-bold text-base uppercase tracking-wider transition shadow-lg shadow-red-950 flex items-center justify-center gap-2 mt-4"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Transmitting Request...' : 'Submit for Quantity Pricing'}</span>
            </button>

            <div className="text-[11px] text-[#6C757D] text-center pt-2">
              <strong className="text-[#1C1F22]">2-Hour SLA Target:</strong> Quotes calculated by sales desk with SMS &amp; Email notification
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
