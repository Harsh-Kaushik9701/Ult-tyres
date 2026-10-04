import React from 'react';
import Link from 'next/link';
import { UserPlus, Briefcase, Shield, ArrowRight, CheckCircle2, Truck } from 'lucide-react';
import TopUtilityRibbon from '@/components/TopUtilityRibbon';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';

export default function JoinUsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#121416]">
      <TopUtilityRibbon />
      <MainHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-[#1C1F22] to-[#121416] py-16 px-4 border-b border-[#25292E]">
          <div className="max-w-7xl mx-auto text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#D50000]/20 text-[#FF3B30] text-xs font-condensed font-bold uppercase tracking-wider mb-4 border border-[#D50000]/30">
              <UserPlus className="w-4 h-4" />
              <span>Partner With Queensland&apos;s Commercial Tyre Leader</span>
            </div>

            <h1 className="font-condensed font-black text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight">
              JOIN THE ULTIMATE TYRES NETWORK
            </h1>
            <p className="text-sm sm:text-base text-[#CED4DA] mt-3 leading-relaxed">
              Whether you are a commercial workshop looking for wholesale distribution access or an experienced tyre technician ready to advance your career.
            </p>
          </div>
        </section>

        {/* Two Doors */}
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Door 1: Become a Dealer */}
            <div className="bg-[#1C1F22] border-2 border-[#D50000] rounded-2xl p-8 flex flex-col justify-between shadow-2xl relative group">
              <div className="absolute top-4 right-4 bg-[#D50000] text-white text-[10px] font-condensed font-bold uppercase px-2.5 py-0.5 rounded shadow">
                Wholesale Portal
              </div>

              <div>
                <div className="w-14 h-14 rounded-xl bg-[#D50000]/10 border border-[#D50000]/30 flex items-center justify-center text-[#FF3B30] mb-6">
                  <Truck className="w-7 h-7" />
                </div>

                <h2 className="font-condensed font-black text-3xl text-white uppercase group-hover:text-[#FF3B30] transition">
                  Become a Dealer
                </h2>
                <p className="text-xs text-[#868E96] leading-relaxed mt-3">
                  Join our wholesale network to unlock gated quantity-band pricing on Ralson, Blacklion, and Triangle tyres. Enjoy rapid quote turnaround and priority delivery.
                </p>

                <div className="mt-6 space-y-2 text-xs text-[#CED4DA]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Live ABN lookup &amp; 24h approval turnaround</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Zero public price leakage; quotes tailored to your volume</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>30-day commercial credit terms available</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#25292E]">
                <Link
                  href="/join-us/become-a-dealer"
                  className="w-full block text-center bg-[#D50000] hover:bg-[#B30000] text-white py-3.5 rounded-lg font-condensed font-bold text-base uppercase tracking-wider transition shadow-lg"
                >
                  Start Dealer Application &rarr;
                </Link>
              </div>
            </div>

            {/* Door 2: Careers */}
            <div className="bg-[#1C1F22] border border-[#2B3036] hover:border-[#495057] rounded-2xl p-8 flex flex-col justify-between shadow-xl transition group">
              <div>
                <div className="w-14 h-14 rounded-xl bg-[#25292E] flex items-center justify-center text-amber-400 mb-6 border border-[#343A40]">
                  <Briefcase className="w-7 h-7" />
                </div>

                <h2 className="font-condensed font-black text-3xl text-white uppercase group-hover:text-amber-400 transition">
                  Careers &amp; Fitters
                </h2>
                <p className="text-xs text-[#868E96] leading-relaxed mt-3">
                  We are hiring certified commercial truck tyre fitters, mobile breakdown operators, and heavy wheel alignment technicians across our Brisbane branches.
                </p>

                <div className="mt-6 space-y-2 text-xs text-[#CED4DA]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    <span>Above-award competitive hourly rates &amp; overtime</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    <span>Fully-equipped modern mobile service vans</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    <span>Rocklea HQ, Yatala, and Bald Hills base locations</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#25292E]">
                <Link
                  href="/join-us/careers"
                  className="w-full block text-center bg-[#25292E] hover:bg-[#343A40] text-white border border-[#495057] py-3.5 rounded-lg font-condensed font-bold text-base uppercase tracking-wider transition"
                >
                  View Open Positions &rarr;
                </Link>
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
