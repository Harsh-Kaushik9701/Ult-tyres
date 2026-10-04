'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  Phone,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  Shield,
  MapPin,
  Clock,
  ArrowRight,
  Send,
} from 'lucide-react';
import TopUtilityRibbon from '@/components/TopUtilityRibbon';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';

const FAQS = [
  {
    q: 'How often should a linehaul prime mover have a multi-axle laser wheel alignment?',
    a: 'We recommend a precision laser alignment every 50,000 km, or whenever new steer tyres are fitted, suspension bushings are replaced, or an irregular shoulder wear pattern appears. Routine alignment stops tyre rivering before the casing is permanently compromised.',
  },
  {
    q: 'Do you align trailer axles, tri-axles, and quad-axles?',
    a: 'Yes. A misaligned trailer axle constantly crabs along the highway, creating massive drag that scrubs out both the trailer tyres and prime mover drive tyres while burning excess diesel. We align prime mover steers, drives, and semi-trailers in our drive-through bays.',
  },
  {
    q: 'How much fuel and tyre wear does correct heavy alignment save?',
    a: 'Independent transport studies show that misaligned heavy vehicle axles increase rolling drag by up to 10%, adding approximately 2 to 3 litres of diesel per 100 km. Furthermore, correct laser alignment regularly extends steer tyre pull-off mileage by 25% to 35%.',
  },
  {
    q: 'Can you accommodate B-doubles and road trains in your bays?',
    a: 'Yes. Our Rocklea and Yatala facilities feature high-clearance, full-length drive-through alignment bays engineered to handle prime movers, B-doubles, and heavy rigid tippers without uncoupling.',
  },
  {
    q: 'What equipment do your technicians use?',
    a: 'We operate state-of-the-art multi-axle computerised laser wheel aligners with optical target tracking. We measure total toe, individual toe, camber, caster, axle setback, and thrust angle against OEM truck manufacturer specifications.',
  },
  {
    q: 'How long does a commercial truck wheel alignment take?',
    a: 'A standard prime mover steer-and-drive axle alignment takes approximately 45 to 60 minutes. We offer priority morning drop-offs so your truck is back on the road earning revenue with minimal turnaround.',
  },
];

const SUBURBS_COVERED = [
  'Rocklea',
  'Yatala',
  'Bald Hills',
  'Acacia Ridge',
  'Wacol',
  'Crestmead',
  'Lytton & Port of Brisbane',
  'Archerfield',
  'Brendale',
  'Ipswich & Swanbank',
  'Pinkenba',
  'Caboolture',
  'Stapylton',
  'Larapinta',
];

export default function WheelAlignmentPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#121416]">
      <TopUtilityRibbon />
      <MainHeader />

      <main className="flex-1">
        {/* Straight Wheels Format Hero */}
        <section className="relative py-16 px-4 bg-[#1C1F22] border-b border-[#25292E] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1600&q=80")',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1C1F22] via-[#1C1F22]/90 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#D50000]/20 text-[#FF3B30] text-xs font-condensed font-bold uppercase tracking-wider mb-4">
                <Compass className="w-4 h-4 text-[#D50000]" />
                <span>Heavy Commercial Laser Wheel Alignment &bull; Brisbane &bull; Yatala &bull; Bald Hills</span>
              </div>

              <h1 className="font-condensed font-black text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-[0.95]">
                PRECISION MULTI-AXLE TRUCK WHEEL ALIGNMENT
              </h1>

              <p className="text-sm sm:text-base text-[#CED4DA] leading-relaxed mt-4 max-w-xl">
                Eliminate shoulder scrubbing, rivering wear, and highway steering wander. Our computerized laser alignment centers in <strong>Rocklea</strong>, <strong>Yatala</strong>, and <strong>Bald Hills</strong> calibrate prime movers, trailers, and buses to millimetric factory tolerances.
              </p>

              {/* Call-to-action bar */}
              <div className="mt-8 flex items-center gap-4 flex-wrap">
                <a
                  href="tel:1300110002"
                  className="bg-[#D50000] hover:bg-[#B30000] text-white px-7 py-3.5 rounded-lg font-condensed font-bold text-lg uppercase tracking-wider transition flex items-center gap-2 shadow-lg shadow-red-950"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call 1300 110 002 (Book Today)</span>
                </a>

                <div className="text-xs text-[#868E96] font-mono">
                  Drive-through bay access &bull; 45 min turnaround
                </div>
              </div>
            </div>

            {/* Right: Quick Booking & Contact Form */}
            <div className="lg:col-span-5 bg-[#121416] border border-[#2B3036] rounded-2xl p-6 sm:p-8 shadow-2xl">
              <h3 className="font-condensed font-bold text-xl text-white uppercase">
                Fast Alignment Booking &amp; Quote
              </h3>
              <p className="text-xs text-[#868E96] mt-1">
                Same-day booking availability at Rocklea, Yatala, or Bald Hills
              </p>

              {formSubmitted ? (
                <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <div className="font-condensed font-bold text-lg text-white">Booking Request Received</div>
                  <div className="text-xs text-[#CED4DA] mt-1">
                    Our service foreman will call your phone within 30 minutes with available time slots.
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-5 space-y-3.5 text-xs">
                  <div>
                    <label className="block text-[11px] font-bold text-[#868E96] uppercase mb-1">
                      Full Name / Contact Person
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Henderson"
                      className="w-full bg-[#1C1F22] border border-[#343A40] text-white rounded-lg px-3 py-2 text-xs focus:border-[#D50000] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-[#868E96] uppercase mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="0400 000 000"
                        className="w-full bg-[#1C1F22] border border-[#343A40] text-white rounded-lg px-3 py-2 text-xs focus:border-[#D50000] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#868E96] uppercase mb-1">
                        Fleet / Company
                      </label>
                      <input
                        type="text"
                        placeholder="Apex Transport"
                        className="w-full bg-[#1C1F22] border border-[#343A40] text-white rounded-lg px-3 py-2 text-xs focus:border-[#D50000] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#868E96] uppercase mb-1">
                      Service Requirement Dropdown
                    </label>
                    <select className="w-full bg-[#1C1F22] border border-[#343A40] text-white rounded-lg px-3 py-2 text-xs focus:border-[#D50000] focus:outline-none">
                      <option>Prime Mover Steer + Dual Drive Laser Alignment</option>
                      <option>Semi-Trailer / Tri-Axle Laser Alignment</option>
                      <option>Complete B-Double Combination Alignment</option>
                      <option>Heavy Rigid / Bus Alignment &amp; Balancing</option>
                      <option>Fleet Wear Audit &amp; Caster/Camber Inspection</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#868E96] uppercase mb-1">
                      Preferred Branch Depot
                    </label>
                    <select className="w-full bg-[#1C1F22] border border-[#343A40] text-white rounded-lg px-3 py-2 text-xs focus:border-[#D50000] focus:outline-none">
                      <option>Rocklea Central HQ (1452 Ipswich Rd)</option>
                      <option>Yatala Logistics Depot (28 Enterprise Dr)</option>
                      <option>Bald Hills Northside Hub (2105 Gympie Rd)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#D50000] hover:bg-[#B30000] text-white py-3 rounded-lg font-condensed font-bold text-sm uppercase tracking-wider transition flex items-center justify-center gap-2 shadow"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Alignment Booking</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* 100% Satisfaction Trust Block */}
        <section className="bg-[#121416] py-12 px-4 border-b border-[#25292E]">
          <div className="max-w-7xl mx-auto">
            <div className="bg-[#1C1F22] border border-[#2B3036] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#D50000]/10 border border-[#D50000]/30 flex items-center justify-center shrink-0">
                  <Shield className="w-8 h-8 text-[#FF3B30]" />
                </div>
                <div>
                  <h3 className="font-condensed font-black text-2xl text-white uppercase">
                    100% STEERING SATISFACTION GUARANTEE
                  </h3>
                  <p className="text-xs sm:text-sm text-[#868E96] mt-1 max-w-2xl">
                    Every commercial alignment is road-tested and verified with before-and-after computerised angle printouts. If your driver experiences steering pull or irregular wear within 14 days, we re-align at zero charge.
                  </p>
                </div>
              </div>

              <a
                href="tel:1300110002"
                className="bg-[#25292E] hover:bg-[#343A40] text-white border border-[#495057] px-6 py-3 rounded-lg font-condensed font-bold text-sm uppercase tracking-wider whitespace-nowrap transition"
              >
                Direct Call: 1300 110 002
              </a>
            </div>
          </div>
        </section>

        {/* Symptoms of Misalignment Section */}
        <section className="py-14 px-4 bg-[#16181B] border-b border-[#25292E]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-xs uppercase font-condensed font-bold text-amber-400 tracking-wider">
                PREVENT COSTLY SCRAP
              </span>
              <h3 className="font-condensed font-black text-3xl text-white uppercase">
                DOES YOUR TRUCK EXHIBIT THESE WARNING SIGNS?
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#1C1F22] p-6 rounded-xl border border-[#2B3036]">
                <div className="text-amber-400 font-condensed font-bold text-lg uppercase mb-2">
                  1. One-Sided Shoulder Rivering
                </div>
                <p className="text-xs text-[#868E96] leading-relaxed">
                  Rapid diagonal scrubbing on the inside or outside steer shoulder indicates excessive toe-in or camber tilt, destroying a $400 tyre within 20,000 km.
                </p>
              </div>

              <div className="bg-[#1C1F22] p-6 rounded-xl border border-[#2B3036]">
                <div className="text-amber-400 font-condensed font-bold text-lg uppercase mb-2">
                  2. Highway Steering Pull &amp; Wander
                </div>
                <p className="text-xs text-[#868E96] leading-relaxed">
                  If the prime mover pulls toward the shoulder or requires constant steering correction, unequal caster angle causes extreme driver fatigue and mechanical stress.
                </p>
              </div>

              <div className="bg-[#1C1F22] p-6 rounded-xl border border-[#2B3036]">
                <div className="text-amber-400 font-condensed font-bold text-lg uppercase mb-2">
                  3. Dog-Tracking Trailer Crabbing
                </div>
                <p className="text-xs text-[#868E96] leading-relaxed">
                  When a trailer tracks out of line with the tractor, it scrubs all tri-axle tyres sideways continuously and drastically impairs highway stability in wet weather.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Brisbane Suburb Coverage Grid */}
        <section className="py-14 px-4 bg-[#121416] border-b border-[#25292E]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-xs uppercase font-condensed font-bold text-[#D50000] tracking-wider">
                  SOUTH-EAST QUEENSLAND INDUSTRIAL CORRIDORS
                </span>
                <h3 className="font-condensed font-black text-2xl sm:text-3xl text-white uppercase">
                  BRISBANE &amp; REGIONAL SUBURB COVERAGE
                </h3>
              </div>
              <div className="text-xs text-[#868E96]">
                Service bays in Rocklea, Yatala, and Bald Hills with direct heavy vehicle access
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {SUBURBS_COVERED.map((suburb) => (
                <div
                  key={suburb}
                  className="bg-[#1C1F22] border border-[#2B3036] p-3 rounded-lg text-center"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#D50000] mx-auto mb-1" />
                  <span className="text-xs font-condensed font-bold text-white uppercase">
                    {suburb}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6-Question Heavy Alignment FAQ */}
        <section className="py-16 px-4 bg-[#16181B]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-xs uppercase font-condensed font-bold text-[#D50000] tracking-widest">
                FREQUENTLY ASKED QUESTIONS
              </span>
              <h3 className="font-condensed font-black text-3xl text-white uppercase mt-1">
                HEAVY TRUCK WHEEL ALIGNMENT FAQ
              </h3>
            </div>

            <div className="space-y-4">
              {FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-[#1C1F22] border border-[#2B3036] rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-condensed font-bold text-base text-white hover:text-[#FF3B30] transition"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#6C757D] transition transform ${
                        openFaq === idx ? 'rotate-180 text-[#D50000]' : ''
                      }`}
                    />
                  </button>

                  {openFaq === idx && (
                    <div className="px-5 pb-5 text-xs text-[#CED4DA] leading-relaxed border-t border-[#25292E] pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Repeated Call CTA */}
            <div className="mt-12 text-center bg-[#1C1F22] border border-[#2B3036] p-8 rounded-2xl">
              <h4 className="font-condensed font-bold text-2xl text-white uppercase">
                Ready to book your prime mover or trailer alignment?
              </h4>
              <p className="text-xs text-[#868E96] mt-1 mb-6">
                Our technicians are ready at Rocklea HQ, Yatala Industrial, and Bald Hills
              </p>
              <a
                href="tel:1300110002"
                className="inline-flex items-center gap-2 bg-[#D50000] hover:bg-[#B30000] text-white px-8 py-3.5 rounded-lg font-condensed font-bold text-base uppercase tracking-wider transition shadow-lg"
              >
                <Phone className="w-5 h-5" />
                <span>Call 1300 110 002 For Fast Booking</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
