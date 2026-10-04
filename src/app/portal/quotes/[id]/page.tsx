'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { notFound, useParams, useRouter } from 'next/navigation';
import {
  FileSpreadsheet,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Printer,
  Download,
  Clock,
  MapPin,
  Calendar,
  AlertTriangle,
  ArrowLeft,
  Send,
  Building2,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function QuoteDetailPage() {
  const params = useParams();
  const router = useRouter();
  const quoteId = params?.id as string;

  const { hydrated, session, pricingRequests, dealerAcceptQuote, dealerDeclineQuote, addRfqThreadMessage } = useApp();

  const [newMessage, setNewMessage] = useState('');
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [declineReason, setDeclineReason] = useState('Price higher than budget');
  const [isAccepting, setIsAccepting] = useState(false);

  // Wait for saved requests to load, otherwise a refresh on a new quote shows "not found".
  if (!hydrated) {
    return <div className="py-16 text-center text-sm text-[#6C757D]" role="status">Loading quote…</div>;
  }

  // A dealer may only open their own requests; anything else is treated as not found.
  const rfq = pricingRequests.find((r) => r.id === quoteId && r.dealerId === session?.dealerId);
  if (!rfq) return notFound();

  const isReady = rfq.status === 'quote_ready';
  const isAccepted = rfq.status === 'accepted';
  const isDeclined = rfq.status === 'declined';

  const handleAccept = () => {
    setIsAccepting(true);
    setTimeout(() => {
      const newOrder = dealerAcceptQuote(rfq.id);
      setIsAccepting(false);
      if (newOrder) {
        router.push(`/portal/orders/${newOrder.id}`);
      }
    }, 600);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    addRfqThreadMessage(rfq.id, newMessage);
    setNewMessage('');
  };

  return (
    <div className="space-y-6">
      {/* Back button */}
      <div>
        <Link
          href="/portal/quotes"
          className="inline-flex items-center gap-1.5 text-xs font-condensed font-bold uppercase tracking-wider text-[#6C757D] hover:text-[#1C1F22] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Quotes</span>
        </Link>
      </div>

      {/* Main Quote Card */}
      <div className="bg-white border border-[#DEE2E6] rounded-2xl p-6 sm:p-10 shadow-sm space-y-8">
        {/* Quote Header / Corporate Masthead */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-[#E9ECEF]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded bg-[#D50000] flex items-center justify-center font-condensed font-black text-lg text-white">
                UT
              </div>
              <span className="font-condensed font-black text-xl text-[#1C1F22] tracking-wider">
                ULTIMATE TYRES AUSTRALIA
              </span>
            </div>

            <div className="text-xs text-[#6C757D] space-y-0.5">
              <div>ABN 84 629 114 902 &bull; Commercial Wholesale Division</div>
              <div>Central Hub: 1452 Ipswich Road, Rocklea QLD 4106</div>
              <div>Phone: 1300 110 002 &bull; quotes@ultimatetyres.com.au</div>
            </div>
          </div>

          <div className="text-left md:text-right">
            <span className="text-xs font-mono font-bold uppercase text-[#6C757D]">
              Official Wholesale Quotation
            </span>
            <div className="font-mono font-black text-3xl text-[#1C1F22] mt-0.5">
              {rfq.quoteNumber}
            </div>

            <div className="mt-2 text-xs space-y-1">
              <div>
                PO Ref: <strong className="font-mono text-[#1C1F22]">{rfq.poNumber}</strong>
              </div>
              <div>
                Date Issued: <span className="font-mono text-[#495057]">{new Date(rfq.createdAt).toLocaleDateString()}</span>
              </div>
              {rfq.expiresAt && (
                <div className="text-amber-800 font-bold font-mono">
                  Valid Until: {new Date(rfq.expiresAt).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Customer Account & Destination Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#F8F9FA] p-4 rounded-xl border border-[#DEE2E6] text-xs">
          <div>
            <div className="text-[10px] uppercase font-bold text-[#868E96]">Quoted To:</div>
            <div className="font-bold text-[#1C1F22] text-sm mt-0.5">{rfq.dealerName}</div>
            <div className="text-[#6C757D]">Authorized Contact: {rfq.requestedBy}</div>
          </div>

          <div>
            <div className="text-[10px] uppercase font-bold text-[#868E96]">
              {rfq.deliveryType === 'delivery' ? 'Dispatch Destination:' : 'Collection Hub:'}
            </div>
            <div className="font-bold text-[#1C1F22] text-sm mt-0.5">{rfq.branchOrAddress}</div>
            <div className="text-[#6C757D]">Required On Site: {rfq.requiredByDate}</div>
          </div>
        </div>

        {/* Status Callout Banner */}
        {isReady && (
          <div className="bg-[#FFF5F5] border-2 border-[#D50000] p-4 rounded-xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-[#D50000]" />
              <div>
                <strong className="text-[#D50000] font-bold text-sm block">
                  Quote Ready for Acceptance
                </strong>
                <span className="text-xs text-[#6C757D]">
                  Priced with your volume tier discount. Ready for warehouse pick and dispatch upon confirmation.
                </span>
              </div>
            </div>

            <button
              onClick={handleAccept}
              disabled={isAccepting}
              className="bg-[#D50000] hover:bg-[#B30000] text-white px-6 py-2.5 rounded-lg font-condensed font-bold text-sm uppercase tracking-wider transition shadow-lg shrink-0 flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isAccepting ? 'Confirming...' : 'Accept Quote & Order'}</span>
            </button>
          </div>
        )}

        {isAccepted && (
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-center gap-3 text-emerald-800 text-xs">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <strong>Quote Accepted!</strong> An active warehouse order has been confirmed and sent to our Brisbane dispatch team.
            </div>
          </div>
        )}

        {isDeclined && (
          <div className="bg-slate-100 border border-slate-200 p-4 rounded-xl text-slate-700 text-xs">
            This quotation was declined. You can re-request updated pricing anytime.
          </div>
        )}

        {/* Line Items Table with Unit Price & Line Totals */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#1C1F22] text-[#CED4DA] font-condensed font-bold uppercase">
              <tr>
                <th className="py-2.5 px-4">Line Description / Specification</th>
                <th className="py-2.5 px-3 text-center">Qty</th>
                <th className="py-2.5 px-3 text-right">Unit Price (Ex-GST)</th>
                <th className="py-2.5 px-3 text-right">Discount</th>
                <th className="py-2.5 px-4 text-right">Line Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9ECEF] text-[#1C1F22]">
              {rfq.lines.map((line, idx) => (
                <tr key={idx} className="hover:bg-[#F8F9FA]">
                  <td className="py-3 px-4">
                    <div className="font-condensed font-bold text-sm text-[#1C1F22]">
                      {line.brand} &bull; {line.pattern}
                    </div>
                    <div className="font-mono text-[11px] text-[#D50000]">
                      {line.fullSizeCode || line.size}
                    </div>

                    {line.alternativeOffered && (
                      <div className="mt-1.5 p-2 bg-amber-50 border border-amber-200 rounded text-[11px] text-amber-900">
                        <strong className="text-amber-800">Alternative Suggested by Staff:</strong>{' '}
                        {line.alternativeOffered.brand} {line.alternativeOffered.pattern} at ${line.alternativeOffered.unitPrice.toFixed(2)}/unit ({line.alternativeOffered.reason})
                      </div>
                    )}
                  </td>

                  <td className="py-3 px-3 text-center font-mono font-bold text-sm">
                    {line.quantity}
                  </td>

                  <td className="py-3 px-3 text-right font-mono">
                    {line.unitPrice ? `$${line.unitPrice.toFixed(2)}` : 'Pending'}
                  </td>

                  <td className="py-3 px-3 text-right font-mono text-emerald-700">
                    {line.discountPercent ? `${line.discountPercent}%` : '-'}
                  </td>

                  <td className="py-3 px-4 text-right font-mono font-bold">
                    {line.lineTotal ? `$${line.lineTotal.toFixed(2)}` : 'Pending'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Calculation Totals */}
        <div className="flex justify-end pt-4 border-t border-[#E9ECEF]">
          <div className="w-72 space-y-2 text-xs font-mono">
            <div className="flex justify-between text-[#6C757D]">
              <span>Subtotal (Ex-GST):</span>
              <span className="font-bold text-[#1C1F22]">${rfq.subtotal?.toFixed(2) || '0.00'}</span>
            </div>
            <div className="flex justify-between text-[#6C757D]">
              <span>Freight / Courier Delivery:</span>
              <span className="font-bold text-[#1C1F22]">${rfq.freight?.toFixed(2) || '0.00'}</span>
            </div>
            <div className="flex justify-between text-[#6C757D]">
              <span>GST (10% Australian Tax):</span>
              <span className="font-bold text-[#1C1F22]">${rfq.gst?.toFixed(2) || '0.00'}</span>
            </div>
            <div className="pt-2 border-t border-[#CED4DA] flex justify-between text-base font-bold text-[#1C1F22]">
              <span>Total Payable (AUD):</span>
              <span className="text-[#D50000] text-xl font-black">${rfq.total?.toFixed(2) || '0.00'}</span>
            </div>
          </div>
        </div>

        {/* Action Controls for Quote */}
        {isReady && (
          <div className="p-4 bg-[#F8F9FA] rounded-xl border border-[#DEE2E6] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={handleAccept}
                disabled={isAccepting}
                className="bg-[#D50000] hover:bg-[#B30000] text-white px-6 py-2.5 rounded-lg font-condensed font-bold text-xs uppercase tracking-wider transition shadow flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Accept Full Quote</span>
              </button>

              <button
                onClick={() => setShowDeclineModal(true)}
                className="bg-white hover:bg-rose-50 text-rose-700 border border-rose-200 px-4 py-2.5 rounded-lg font-condensed font-bold text-xs uppercase tracking-wider transition"
              >
                Decline Quote
              </button>
            </div>

            <button
              onClick={() => window.print()}
              className="bg-white hover:bg-[#E9ECEF] border border-[#CED4DA] text-[#1C1F22] px-4 py-2.5 rounded-lg font-condensed font-bold text-xs uppercase tracking-wider transition flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Download PDF</span>
            </button>
          </div>
        )}

        {/* Discussion Comment Thread (Blueprint Page 22) */}
        <div className="pt-6 border-t border-[#E9ECEF]">
          <h3 className="font-condensed font-bold text-lg text-[#1C1F22] uppercase mb-3 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#D50000]" />
            <span>Discussion Thread with Sales Desk</span>
          </h3>

          <div className="space-y-3 mb-4">
            {rfq.threadMessages && rfq.threadMessages.length > 0 ? (
              rfq.threadMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-3.5 rounded-xl text-xs max-w-xl ${
                    msg.role === 'staff'
                      ? 'bg-amber-50 border border-amber-200 text-amber-950 ml-auto'
                      : 'bg-[#F8F9FA] border border-[#DEE2E6] text-[#1C1F22]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1 font-bold text-[11px]">
                    <span>{msg.sender}</span>
                    <span className="text-[#868E96] font-normal font-mono">{msg.time}</span>
                  </div>
                  <p className="leading-relaxed">{msg.message}</p>
                </div>
              ))
            ) : (
              <div className="text-xs text-[#868E96] italic">
                No discussion messages yet. Use the box below to ask questions about this quote.
              </div>
            )}
          </div>

          {/* New message input */}
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              placeholder="Ask pricing staff a question about this quote or request alternative sizes..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 bg-[#F8F9FA] border border-[#CED4DA] rounded-lg px-4 py-2.5 text-xs text-[#1C1F22] focus:border-[#D50000] focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#1C1F22] hover:bg-[#343A40] text-white px-5 py-2.5 rounded-lg font-condensed font-bold text-xs uppercase tracking-wider transition flex items-center gap-1"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>

      {/* Decline Modal */}
      {showDeclineModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="font-condensed font-black text-xl text-[#1C1F22] uppercase mb-2">
              Decline Quote {rfq.quoteNumber}
            </h3>
            <p className="text-xs text-[#6C757D] mb-4">
              Please let our pricing desk know why you are declining:
            </p>

            <select
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
              className="w-full bg-[#F8F9FA] border border-[#CED4DA] rounded-lg p-2.5 text-xs mb-4 text-[#1C1F22]"
            >
              <option>Price higher than budget</option>
              <option>Delivery timeline too slow</option>
              <option>Customer cancelled requirement</option>
              <option>Purchased alternative stock</option>
            </select>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowDeclineModal(false)}
                className="px-4 py-2 text-xs font-condensed font-bold uppercase text-[#6C757D]"
              >
                Back
              </button>
              <button
                onClick={() => {
                  dealerDeclineQuote(rfq.id, declineReason);
                  setShowDeclineModal(false);
                }}
                className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg text-xs font-condensed font-bold uppercase"
              >
                Confirm Decline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
