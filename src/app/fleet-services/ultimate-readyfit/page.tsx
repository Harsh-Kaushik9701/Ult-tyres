'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Zap,
  Disc,
  Truck,
  CheckCircle2,
  Phone,
  Shield,
  ArrowRight,
  Send,
  Sparkles,
} from 'lucide-react';
import TopUtilityRibbon from '@/components/TopUtilityRibbon';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';
import ReadyFitVisualExplainer from '@/components/ReadyFitVisualExplainer';

export default function UltimateReadyFitPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#121416]">
      <TopUtilityRibbon />
      <MainHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-16 px-4 bg-[#1C1F22] border-b border-[#25292E] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1600&q=80")',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1C1F22] via-[#1C1F22]/90 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/20 text-amber-400 text-xs font-condensed font-bold uppercase tracking-wider mb-4 border border-amber-500/30">
                <Zap className="w-4 h-4" />
                <span>Patented Pre-Mounted Assembly Exchange Program</span>
              </div>

              <h1 className="font-condensed font-black text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-[0.95]">
                ULTIMATE READYFIT&trade; BOLT-ON WHEEL ASSEMBLIES
              </h1>

              <p className="text-sm sm:text-base text-[#CED4DA] leading-relaxed mt-4">
                Stop paying outside tyre fitters to demount and bead-blast tyres in your yard. We deliver fresh <strong>Ralson</strong>, <strong>Blacklion</strong>, or <strong>Triangle</strong> tyres already mounted onto certified steel or forged alloy rims, pre-balanced and inflated with pure dry nitrogen.
              </p>

              <div className="mt-8 flex items-center gap-4 flex-wrap">
                <a
                  href="tel:1300110002"
                  className="bg-[#D50000] hover:bg-[#B30000] text-white px-7 py-3.5 rounded-lg font-condensed font-bold text-base uppercase tracking-wider transition flex items-center gap-2 shadow-lg"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call 1300 110 002 to Setup ReadyFit</span>
                </a>

                <Link
                  href="#inquiry"
                  className="bg-[#25292E] hover:bg-[#343A40] text-white border border-[#495057] px-6 py-3.5 rounded-lg font-condensed font-bold text-base uppercase tracking-wider transition"
                >
                  Request Assembly Pricing
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 3-Step Visual Explainer Component */}
        <section className="py-14 px-4 bg-[#16181B] border-b border-[#25292E]">
          <div className="max-w-7xl mx-auto">
            <ReadyFitVisualExplainer />
          </div>
        </section>

        {/* Benefits Comparison Grid */}
        <section className="py-16 px-4 bg-[#121416] border-b border-[#25292E]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-xs uppercase font-condensed font-bold text-[#D50000] tracking-widest">
                MEASURABLE FLEET SAVINGS
              </span>
              <h2 className="font-condensed font-black text-3xl sm:text-4xl text-white uppercase mt-1">
                TRADITIONAL FITTING VS ULTIMATE READYFIT
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Old Traditional Way */}
              <div className="bg-[#1C1F22] border border-[#2B3036] rounded-2xl p-6 sm:p-8">
                <div className="text-sm font-condensed font-bold uppercase text-[#868E96] tracking-wider mb-2">
                  Traditional Fitting Hassle
                </div>
                <h3 className="font-condensed font-black text-2xl text-white mb-6">
                  In-Bay Demount &amp; Downtime
                </h3>

                <ul className="space-y-4 text-xs text-[#868E96]">
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold font-mono">✕</span>
                    <span>Truck bay blocked for 2–3 hours waiting for external mobile fitters.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold font-mono">✕</span>
                    <span>Workplace health &amp; safety hazards from high-pressure bead breaking.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold font-mono">✕</span>
                    <span>Worn casings pile up in your yard causing clutter and EPA disposal fees.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold font-mono">✕</span>
                    <span>Inconsistent manual inflation leads to rapid irregular tread wear.</span>
                  </li>
                </ul>
              </div>

              {/* ReadyFit Advantage */}
              <div className="bg-gradient-to-br from-[#1C1F22] to-[#25292E] border-2 border-[#D50000] rounded-2xl p-6 sm:p-8 shadow-2xl relative">
                <div className="text-xs font-condensed font-bold uppercase text-amber-400 tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>The Ultimate Solution</span>
                </div>
                <h3 className="font-condensed font-black text-2xl text-white mb-6">
                  Ultimate ReadyFit Advantage
                </h3>

                <ul className="space-y-4 text-xs text-[#CED4DA]">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong className="text-white">15-minute turnaround:</strong> Your in-house mechanics bolt on pre-mounted assemblies with standard shop tools.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong className="text-white">Pre-Balanced &amp; Nitrogen Inflated:</strong> Eliminates vibration and maintains rock-solid inflation pressure.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong className="text-white">Immediate Casing Credits:</strong> We collect your worn casings on the drop-off run and credit your account directly.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong className="text-white">Guaranteed ADR Certification:</strong> Fitted to heavy-duty 10-stud steel or lightweight forged alloy rims.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Inquiry Form */}
        <section id="inquiry" className="py-16 px-4 bg-[#16181B]">
          <div className="max-w-3xl mx-auto bg-[#1C1F22] border border-[#2B3036] rounded-2xl p-8 shadow-2xl">
            <h3 className="font-condensed font-black text-2xl sm:text-3xl text-white uppercase text-center">
              SETUP YOUR FLEET ON ULTIMATE READYFIT
            </h3>
            <p className="text-xs text-[#868E96] text-center mt-1 mb-8">
              Speak with our commercial technical team to tailor delivery schedules for your depot
            </p>

            {submitted ? (
              <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
                <h4 className="font-condensed font-bold text-xl text-white">Inquiry Submitted Successfully</h4>
                <p className="text-xs text-[#CED4DA] mt-1">
                  Our fleet manager will contact your workshop with our ReadyFit catalog and casing credit schedule.
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
                    <label className="block text-[#868E96] font-bold uppercase mb-1">Company / Fleet Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Moreton Heavy Haulage"
                      className="w-full bg-[#121416] border border-[#343A40] text-white rounded-lg px-3 py-2.5 focus:border-[#D50000] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#868E96] font-bold uppercase mb-1">Contact Name &amp; Role</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Craig (Workshop Foreman)"
                      className="w-full bg-[#121416] border border-[#343A40] text-white rounded-lg px-3 py-2.5 focus:border-[#D50000] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#868E96] font-bold uppercase mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="0400 000 000"
                      className="w-full bg-[#121416] border border-[#343A40] text-white rounded-lg px-3 py-2.5 focus:border-[#D50000] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#868E96] font-bold uppercase mb-1">Estimated Fleet Size</label>
                    <select className="w-full bg-[#121416] border border-[#343A40] text-white rounded-lg px-3 py-2.5 focus:border-[#D50000] focus:outline-none">
                      <option>5–15 Commercial Vehicles</option>
                      <option>15–40 Commercial Vehicles</option>
                      <option>40+ Heavy Vehicles / Road Trains</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[#868E96] font-bold uppercase mb-1">Target Sizes &amp; Rims</label>
                  <input
                    type="text"
                    placeholder="e.g. 11R22.5 Drive sets on 10-stud Steel rims"
                    className="w-full bg-[#121416] border border-[#343A40] text-white rounded-lg px-3 py-2.5 focus:border-[#D50000] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#D50000] hover:bg-[#B30000] text-white py-3.5 rounded-lg font-condensed font-bold text-base uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>Request ReadyFit Fleet Proposal</span>
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
