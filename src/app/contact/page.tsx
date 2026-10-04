'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  CheckCircle2,
  Send,
  Building2,
} from 'lucide-react';
import TopUtilityRibbon from '@/components/TopUtilityRibbon';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';
import { BRANCHES } from '@/data/mockData';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#121416]">
      <TopUtilityRibbon />
      <MainHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-[#1C1F22] border-b border-[#25292E] py-14 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#D50000]/20 text-[#FF3B30] text-xs font-condensed font-bold uppercase tracking-wider mb-3">
              <Phone className="w-3.5 h-3.5" />
              <span>Direct Commercial &amp; Workshop Contact</span>
            </div>

            <h1 className="font-condensed font-black text-4xl sm:text-5xl text-white uppercase tracking-tight">
              SPEAK TO OUR COMMERCIAL TYRE TEAM
            </h1>
            <p className="text-sm text-[#CED4DA] max-w-2xl mt-2 leading-relaxed">
              Whether you need urgent mobile breakdown assistance on the M1, want to book a drive-through laser alignment, or need wholesale truck tyre pallet quotes.
            </p>
          </div>
        </section>

        {/* 3 Branches Summary Grid */}
        <section className="py-12 px-4 bg-[#16181B] border-b border-[#25292E]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {BRANCHES.map((b) => (
              <div
                key={b.id}
                className="bg-[#1C1F22] border border-[#2B3036] rounded-xl p-6 hover:border-[#D50000] transition"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-condensed font-bold text-lg text-white">
                    {b.name}
                  </span>
                  {b.isHq && (
                    <span className="text-[10px] bg-[#D50000] text-white px-2 py-0.5 rounded font-bold uppercase">
                      Central HQ
                    </span>
                  )}
                </div>

                <div className="text-xs text-[#CED4DA] flex items-start gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-[#D50000] shrink-0 mt-0.5" />
                  <span>{b.address}, {b.suburb} QLD {b.postcode}</span>
                </div>

                <div className="text-xs text-[#CED4DA] flex items-center gap-2 mb-3">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a href={`tel:${b.phone}`} className="font-mono font-bold text-white hover:text-[#FF3B30]">
                    {b.phone}
                  </a>
                </div>

                <div className="text-[11px] text-[#868E96] border-t border-[#25292E] pt-3">
                  <Clock className="w-3.5 h-3.5 inline mr-1 text-amber-400" />
                  <span>{b.hours}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form & Direct Channels */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Form */}
            <div className="lg:col-span-7 bg-[#1C1F22] border border-[#2B3036] rounded-2xl p-6 sm:p-8 shadow-2xl">
              <h2 className="font-condensed font-black text-2xl sm:text-3xl text-white uppercase">
                Send an Inquiry or Quote Request
              </h2>
              <p className="text-xs text-[#868E96] mt-1 mb-6">
                Our commercial desk monitors incoming requests continuously during business hours.
              </p>

              {submitted ? (
                <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                  <h3 className="font-condensed font-bold text-xl text-white">Inquiry Received</h3>
                  <p className="text-xs text-[#CED4DA] mt-1">
                    Thank you. A commercial team member from your nearest branch will contact you shortly.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="space-y-4 text-xs"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#868E96] font-bold uppercase mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="John Smith"
                        className="w-full bg-[#121416] border border-[#343A40] text-white rounded-lg px-3 py-2.5 focus:border-[#D50000] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[#868E96] font-bold uppercase mb-1">Business / Fleet</label>
                      <input
                        type="text"
                        placeholder="Smith Transport Pty Ltd"
                        className="w-full bg-[#121416] border border-[#343A40] text-white rounded-lg px-3 py-2.5 focus:border-[#D50000] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#868E96] font-bold uppercase mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="john@smithtransport.com.au"
                        className="w-full bg-[#121416] border border-[#343A40] text-white rounded-lg px-3 py-2.5 focus:border-[#D50000] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[#868E96] font-bold uppercase mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="0400 000 000"
                        className="w-full bg-[#121416] border border-[#343A40] text-white rounded-lg px-3 py-2.5 focus:border-[#D50000] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#868E96] font-bold uppercase mb-1">Department / Inquiry Type</label>
                      <select className="w-full bg-[#121416] border border-[#343A40] text-white rounded-lg px-3 py-2.5 focus:border-[#D50000] focus:outline-none">
                        <option>Wholesale Tyre Pricing (Ralson / Blacklion / Triangle)</option>
                        <option>Heavy Laser Wheel Alignment Booking</option>
                        <option>Ultimate ReadyFit Assembly Inquiry</option>
                        <option>24/7 Mobile Fleet Service Contract</option>
                        <option>Trade Dealer Account Onboarding</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#868E96] font-bold uppercase mb-1">Preferred Hub</label>
                      <select className="w-full bg-[#121416] border border-[#343A40] text-white rounded-lg px-3 py-2.5 focus:border-[#D50000] focus:outline-none">
                        <option>Rocklea Central HQ</option>
                        <option>Yatala Logistics Depot</option>
                        <option>Bald Hills Northside Depot</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#868E96] font-bold uppercase mb-1">Message / Tyres Needed</label>
                    <textarea
                      rows={4}
                      placeholder="Please mention tyre sizes, quantities, or specific vehicle fitment requirements..."
                      className="w-full bg-[#121416] border border-[#343A40] text-white rounded-lg p-3 focus:border-[#D50000] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#D50000] hover:bg-[#B30000] text-white py-3.5 rounded-lg font-condensed font-bold text-base uppercase tracking-wider transition flex items-center justify-center gap-2 shadow"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Commercial Inquiry</span>
                  </button>
                </form>
              )}
            </div>

            {/* Right Information Cards */}
            <div className="lg:col-span-5 space-y-6">
              {/* Toll-Free Equity */}
              <div className="bg-[#1C1F22] border border-[#2B3036] rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#D50000] flex items-center justify-center text-white">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-[#868E96] uppercase font-condensed">Primary Voice Line</div>
                    <div className="font-condensed font-black text-2xl text-white">
                      1300 110 002
                    </div>
                  </div>
                </div>
                <p className="text-xs text-[#868E96] leading-relaxed">
                  Toll-free across Australia. Connects directly to our Brisbane commercial dispatch controller.
                </p>
              </div>

              {/* WhatsApp Quick Link */}
              <div className="bg-[#1C1F22] border border-[#2B3036] rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-[#868E96] uppercase font-condensed">Instant Chat</div>
                    <div className="font-condensed font-black text-xl text-white">
                      WhatsApp Commercial Desk
                    </div>
                  </div>
                </div>
                <p className="text-xs text-[#868E96] leading-relaxed mb-4">
                  Send photos of worn tyres, tire markings, or registration plates directly to our technicians for instant advice.
                </p>
                <a
                  href="https://wa.me/61400000000?text=Hi%20Ultimate%20Tyres,%20I%20have%20an%20inquiry%20regarding%20commercial%20tyres"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-lg font-condensed font-bold text-xs uppercase tracking-wider transition"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Start WhatsApp Chat</span>
                </a>
              </div>

              {/* Australian Business Credentials */}
              <div className="bg-[#121416] border border-[#2B3036] rounded-2xl p-6 text-xs text-[#868E96] space-y-2">
                <div className="font-condensed font-bold text-white uppercase text-sm mb-2">
                  Legal Corporate Entity
                </div>
                <div><strong>Entity:</strong> Ultimate Tyres Australia Pty Ltd</div>
                <div><strong>ABN:</strong> 84 629 114 902</div>
                <div><strong>ACN:</strong> 629 114 902</div>
                <div><strong>GST Status:</strong> Registered for Australian GST</div>
                <div><strong>Head Office:</strong> 1452 Ipswich Road, Rocklea QLD 4106</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
