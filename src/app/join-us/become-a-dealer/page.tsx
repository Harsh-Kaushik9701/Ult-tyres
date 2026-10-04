'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Shield,
  Truck,
  CheckCircle2,
  Building2,
  FileCheck,
  Send,
  AlertCircle,
  HelpCircle,
  Search,
  Sparkles,
} from 'lucide-react';
import TopUtilityRibbon from '@/components/TopUtilityRibbon';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';
import { useApp } from '@/context/AppContext';

export default function BecomeADealerPage() {
  const router = useRouter();
  const { submitDealerApplication, setSession } = useApp();

  // Form states
  const [abn, setAbn] = useState('');
  const [isVerifyingAbn, setIsVerifyingAbn] = useState(false);
  const [abnVerified, setAbnVerified] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const [tradingName, setTradingName] = useState('');
  const [gstRegistered, setGstRegistered] = useState(true);
  const [businessType, setBusinessType] = useState('workshop');
  const [yearsTrading, setYearsTrading] = useState('5');
  const [contactName, setContactName] = useState('');
  const [role, setRole] = useState('Director / Fleet Manager');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [monthlyVolume, setMonthlyVolume] = useState('20–50 tyres / month');
  const [selectedBrands, setSelectedBrands] = useState<string[]>(['Ralson', 'Blacklion']);
  const [creditPref, setCreditPref] = useState<'30-day' | 'pay-per-order'>('30-day');
  const [agreedTerms, setAgreedTerms] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  // Live ABN Lookup Simulator (Australian Business Register)
  const handleAbnChange = (val: string) => {
    const raw = val.replace(/\s+/g, '');
    setAbn(val);

    if (raw.length === 11) {
      setIsVerifyingAbn(true);
      setTimeout(() => {
        setIsVerifyingAbn(false);
        setAbnVerified(true);
        // Pre-fill realistic legal name based on ABN
        if (!businessName) {
          setBusinessName(`${raw.slice(0, 4)} Queensland Transport Pty Ltd`);
          setTradingName(`${raw.slice(0, 4)} Haulage Services`);
          setGstRegistered(true);
        }
      }, 700);
    } else {
      setAbnVerified(false);
    }
  };

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedTerms) return;

    submitDealerApplication({
      businessName: businessName || `${abn} Commercial Pty Ltd`,
      abn: abn || '55 123 456 789',
      abnValid: true,
      gstRegistered,
      tradingName: tradingName || businessName,
      businessType,
      yearsTrading: parseInt(yearsTrading) || 3,
      contactName,
      role,
      email,
      mobile,
      deliveryAddress,
      estimatedMonthlyVolume: monthlyVolume,
      brandsOfInterest: selectedBrands,
      creditPreference: creditPref,
    });

    // Provide immediate pending access as outlined in blueprint Section 8:
    // "Pending access: the applicant can sign in and browse the catalogue with specs and photos, with a banner 'Application under review'; cart and pricing requests stay locked."
    setSession({
      id: `usr-pending-${Date.now()}`,
      name: contactName || 'Applicant Contact',
      email: email || 'dealer@applicant.com.au',
      role: 'buyer',
      dealerName: businessName || 'Applicant Business',
      branch: 'Rocklea HQ',
      tier: 'C',
    });

    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#121416]">
      <TopUtilityRibbon />
      <MainHeader />

      <main className="flex-1 py-14 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#D50000]/20 text-[#FF3B30] text-xs font-condensed font-bold uppercase tracking-wider mb-3 border border-[#D50000]/30">
              <Shield className="w-4 h-4" />
              <span>Gated Commercial Wholesale Network</span>
            </div>

            <h1 className="font-condensed font-black text-4xl sm:text-5xl text-white uppercase tracking-tight">
              BECOME AN ULTIMATE TYRES TRADE DEALER
            </h1>
            <p className="text-xs sm:text-sm text-[#868E96] mt-2 leading-relaxed">
              Unlock quantity-band wholesale pricing on Ralson, Blacklion, and Triangle commercial truck and bus tyres with priority Queensland branch dispatch.
            </p>
          </div>

          {/* Value Props Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 text-xs">
            <div className="bg-[#1C1F22] border border-[#2B3036] p-4 rounded-xl flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-condensed font-bold text-sm">Direct Wholesale Prices</strong>
                <span className="text-[#868E96]">Tiered volume pricing on RFQ quotes returned in minutes.</span>
              </div>
            </div>

            <div className="bg-[#1C1F22] border border-[#2B3036] p-4 rounded-xl flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-condensed font-bold text-sm">Priority Depot Stock</strong>
                <span className="text-[#868E96]">Reserved allocations across Rocklea, Yatala, and Bald Hills.</span>
              </div>
            </div>

            <div className="bg-[#1C1F22] border border-[#2B3036] p-4 rounded-xl flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-condensed font-bold text-sm">1-Business-Day SLA</strong>
                <span className="text-[#868E96]">Fast account review with immediate catalogue preview.</span>
              </div>
            </div>
          </div>

          {submitted ? (
            <div className="bg-[#1C1F22] border-2 border-emerald-500/50 rounded-2xl p-8 sm:p-12 text-center shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/40">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <span className="text-xs font-mono uppercase bg-[#121416] text-amber-400 px-3 py-1 rounded border border-amber-400/30">
                Status: Application Under Staff Review
              </span>

              <h2 className="font-condensed font-black text-3xl sm:text-4xl text-white uppercase mt-4">
                APPLICATION LODGED FOR {businessName.toUpperCase()}
              </h2>

              <p className="text-sm text-[#CED4DA] max-w-xl mx-auto mt-3 leading-relaxed">
                Thank you, <strong>{contactName}</strong>. Your Australian Business details have been verified and submitted to our Commercial Account Desk.
              </p>

              <div className="mt-6 p-4 bg-[#121416] border border-[#2B3036] rounded-xl max-w-lg mx-auto text-xs text-[#868E96] text-left space-y-1.5 font-mono">
                <div>ABN: <strong className="text-white">{abn}</strong></div>
                <div>Entity: <strong className="text-white">{businessName}</strong></div>
                <div>Account Preference: <strong className="text-emerald-400">{creditPref === '30-day' ? '30-Day Commercial Terms' : 'Pay-Per-Order'}</strong></div>
                <div>Assigned Processing Hub: <strong className="text-white">Rocklea Central HQ</strong></div>
              </div>

              <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
                <Link
                  href="/portal"
                  className="bg-[#D50000] hover:bg-[#B30000] text-white px-7 py-3 rounded-lg font-condensed font-bold text-base uppercase tracking-wider transition shadow-lg"
                >
                  Enter Portal Preview &rarr;
                </Link>

                <Link
                  href="/tyres"
                  className="bg-[#25292E] hover:bg-[#343A40] text-white px-6 py-3 rounded-lg font-condensed font-bold text-base uppercase tracking-wider transition"
                >
                  Browse Tyre Specs
                </Link>
              </div>
            </div>
          ) : (
            /* Application Form */
            <form
              onSubmit={handleSubmit}
              className="bg-[#1C1F22] border border-[#2B3036] rounded-2xl p-6 sm:p-10 shadow-2xl space-y-8"
            >
              {/* Section 1: Business Identity & Live ABN Lookup */}
              <div>
                <h3 className="font-condensed font-bold text-xl text-white uppercase flex items-center gap-2 mb-4 border-b border-[#25292E] pb-2">
                  <Building2 className="w-5 h-5 text-[#FF3B30]" />
                  <span>1. Business Identity &amp; ABN Verification</span>
                </h3>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[#868E96] font-bold uppercase mb-1 flex items-center justify-between">
                      <span>Australian Business Number (ABN - 11 Digits) *</span>
                      <span className="text-[10px] text-amber-400 font-normal">
                        Type 11 digits to test live ABR pre-fill
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        maxLength={14}
                        placeholder="e.g. 45 123 456 789"
                        value={abn}
                        onChange={(e) => handleAbnChange(e.target.value)}
                        className="w-full bg-[#121416] border border-[#343A40] text-white rounded-lg pl-3 pr-28 py-2.5 text-sm font-mono focus:border-[#D50000] focus:outline-none"
                      />
                      <div className="absolute right-3 top-2.5 flex items-center gap-1.5 text-xs">
                        {isVerifyingAbn && (
                          <span className="text-amber-400 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                            Verifying...
                          </span>
                        )}
                        {abnVerified && (
                          <span className="text-emerald-400 flex items-center gap-1 font-bold">
                            <CheckCircle2 className="w-4 h-4" />
                            ABN Active
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#868E96] font-bold uppercase mb-1">
                        Legal Business Entity Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Apex Fleet Logistics Pty Ltd"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="w-full bg-[#121416] border border-[#343A40] text-white rounded-lg px-3 py-2.5 focus:border-[#D50000] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[#868E96] font-bold uppercase mb-1">
                        Trading Name / Depot Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Apex Transport"
                        value={tradingName}
                        onChange={(e) => setTradingName(e.target.value)}
                        className="w-full bg-[#121416] border border-[#343A40] text-white rounded-lg px-3 py-2.5 focus:border-[#D50000] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[#868E96] font-bold uppercase mb-1">Business Type</label>
                      <select
                        value={businessType}
                        onChange={(e) => setBusinessType(e.target.value)}
                        className="w-full bg-[#121416] border border-[#343A40] text-white rounded-lg px-3 py-2.5 focus:border-[#D50000] focus:outline-none"
                      >
                        <option value="workshop">Heavy Vehicle Workshop</option>
                        <option value="fleet_operator">Commercial Fleet Operator</option>
                        <option value="tyre_retailer">Tyre Retailer / Fitter</option>
                        <option value="transport_company">Linehaul Transport Company</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#868E96] font-bold uppercase mb-1">Years Trading</label>
                      <input
                        type="number"
                        min="1"
                        max="80"
                        value={yearsTrading}
                        onChange={(e) => setYearsTrading(e.target.value)}
                        className="w-full bg-[#121416] border border-[#343A40] text-white rounded-lg px-3 py-2.5 focus:border-[#D50000] focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[#868E96] font-bold uppercase mb-1">GST Status</label>
                      <div className="h-10 bg-[#121416] border border-[#343A40] rounded-lg px-3 flex items-center text-emerald-400 font-bold">
                        <CheckCircle2 className="w-4 h-4 mr-1.5" />
                        Registered for Australian GST
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Contact Information */}
              <div>
                <h3 className="font-condensed font-bold text-xl text-white uppercase flex items-center gap-2 mb-4 border-b border-[#25292E] pb-2">
                  <FileCheck className="w-5 h-5 text-[#FF3B30]" />
                  <span>2. Authorized Contact Person</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-[#868E96] font-bold uppercase mb-1">Contact Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dave Miller"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full bg-[#121416] border border-[#343A40] text-white rounded-lg px-3 py-2.5 focus:border-[#D50000] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#868E96] font-bold uppercase mb-1">Role / Position *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Managing Director / Workshop Supervisor"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full bg-[#121416] border border-[#343A40] text-white rounded-lg px-3 py-2.5 focus:border-[#D50000] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#868E96] font-bold uppercase mb-1">Email (For Quote Alerts) *</label>
                    <input
                      type="email"
                      required
                      placeholder="dave@apexfleet.com.au"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#121416] border border-[#343A40] text-white rounded-lg px-3 py-2.5 focus:border-[#D50000] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#868E96] font-bold uppercase mb-1">Mobile (For SMS Quote Alerts) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="0412 345 678"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="w-full bg-[#121416] border border-[#343A40] text-white rounded-lg px-3 py-2.5 focus:border-[#D50000] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Operations & Volume */}
              <div>
                <h3 className="font-condensed font-bold text-xl text-white uppercase flex items-center gap-2 mb-4 border-b border-[#25292E] pb-2">
                  <Truck className="w-5 h-5 text-[#FF3B30]" />
                  <span>3. Operations, Delivery &amp; Account Preference</span>
                </h3>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[#868E96] font-bold uppercase mb-1">Primary Workshop Delivery Address *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 88 Logistics Blvd, Crestmead QLD 4132"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full bg-[#121416] border border-[#343A40] text-white rounded-lg px-3 py-2.5 focus:border-[#D50000] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#868E96] font-bold uppercase mb-1">Estimated Monthly Tyre Usage</label>
                      <select
                        value={monthlyVolume}
                        onChange={(e) => setMonthlyVolume(e.target.value)}
                        className="w-full bg-[#121416] border border-[#343A40] text-white rounded-lg px-3 py-2.5 focus:border-[#D50000] focus:outline-none"
                      >
                        <option>10–20 tyres / month</option>
                        <option>20–50 tyres / month</option>
                        <option>50–100 tyres / month (Tier A Bulk)</option>
                        <option>100+ tyres / month (Enterprise Fleet)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#868E96] font-bold uppercase mb-1">Account Terms Preference</label>
                      <select
                        value={creditPref}
                        onChange={(e) => setCreditPref(e.target.value as '30-day' | 'pay-per-order')}
                        className="w-full bg-[#121416] border border-[#343A40] text-white rounded-lg px-3 py-2.5 focus:border-[#D50000] focus:outline-none"
                      >
                        <option value="30-day">30-Day Commercial Credit Terms</option>
                        <option value="pay-per-order">Pay Per Order (Instant EFT / Stripe Card)</option>
                      </select>
                    </div>
                  </div>

                  {/* Brands of Interest */}
                  <div>
                    <label className="block text-[#868E96] font-bold uppercase mb-2">
                      Brands of Primary Interest:
                    </label>
                    <div className="flex items-center gap-3 flex-wrap">
                      {['Ralson (Authorised)', 'Blacklion Commercial', 'Triangle Heavy Fleet'].map(
                        (bName) => {
                          const base = bName.split(' ')[0];
                          const active = selectedBrands.includes(base);
                          return (
                            <button
                              type="button"
                              key={bName}
                              onClick={() => handleBrandToggle(base)}
                              className={`px-3 py-1.5 rounded-lg border text-xs font-condensed font-bold uppercase transition flex items-center gap-1.5 ${
                                active
                                  ? 'bg-[#D50000] text-white border-[#D50000]'
                                  : 'bg-[#121416] text-[#CED4DA] border-[#343A40]'
                              }`}
                            >
                              {active && <CheckCircle2 className="w-3.5 h-3.5" />}
                              <span>{bName}</span>
                            </button>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Agreement */}
              <div className="pt-4 border-t border-[#25292E] text-xs">
                <label className="flex items-start gap-3 cursor-pointer text-[#CED4DA]">
                  <input
                    type="checkbox"
                    required
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="mt-0.5 accent-[#D50000] w-4 h-4 rounded"
                  />
                  <span>
                    I confirm I am an authorized representative of the above entity and agree to Ultimate Tyres Australia Pty Ltd{' '}
                    <Link href="/legal/terms-of-trade" className="text-[#FF3B30] underline" target="_blank">
                      Terms of Trade
                    </Link>{' '}
                    and{' '}
                    <Link href="/legal/privacy" className="text-[#FF3B30] underline" target="_blank">
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={!agreedTerms}
                className="w-full bg-[#D50000] hover:bg-[#B30000] disabled:opacity-50 text-white py-4 rounded-xl font-condensed font-black text-lg uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-2xl shadow-red-950"
              >
                <Send className="w-5 h-5" />
                <span>Submit Dealer Application (24h Review)</span>
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
