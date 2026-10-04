import React from 'react';
import Link from 'next/link';
import {
  Shield,
  Truck,
  CheckCircle2,
  Users,
  Building2,
  Phone,
  ArrowRight,
  Award,
  Clock,
} from 'lucide-react';
import TopUtilityRibbon from '@/components/TopUtilityRibbon';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';
import { BRANCHES } from '@/data/mockData';

export default function AboutUsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#121416]">
      <TopUtilityRibbon />
      <MainHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-20 px-4 bg-[#1C1F22] border-b border-[#25292E] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80")',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1C1F22] via-[#1C1F22]/90 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#D50000]/20 text-[#FF3B30] text-xs font-condensed font-bold uppercase tracking-wider mb-4 border border-[#D50000]/30">
                <Shield className="w-4 h-4" />
                <span>Our Heritage &amp; Commercial Capabilities</span>
              </div>

              <h1 className="font-condensed font-black text-5xl sm:text-6xl text-white uppercase tracking-tight leading-[0.95]">
                BUILT ON CONCRETE, DIESEL, AND DEEP TYRE INTEGRITY
              </h1>

              <p className="text-sm sm:text-base text-[#CED4DA] leading-relaxed mt-4">
                Ultimate Tyres was founded over 15 years ago with a single service van and an unyielding commitment to keep Queensland freight moving. Today, we are proud to be an Authorised Australian Distributor for Ralson Commercial Tyres, operating 3 major branch facilities and a dedicated fleet of 24/7 mobile response vehicles.
              </p>
            </div>
          </div>
        </section>

        {/* Founder Story Section (Manjinder, 15+ years) */}
        <section className="py-16 px-4 bg-[#16181B] border-b border-[#25292E]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-[#2B3036] shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=900&q=80"
                  alt="Manjinder Singh - Founder of Ultimate Tyres"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/70 to-transparent p-6">
                  <div className="font-condensed font-black text-2xl text-white">
                    Manjinder Singh
                  </div>
                  <div className="text-xs text-amber-400 font-mono">
                    Managing Director &amp; Commercial Fleet Specialist
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <span className="text-xs uppercase font-condensed font-bold text-[#D50000] tracking-widest">
                THE FOUNDER&apos;S MISSION
              </span>
              <h2 className="font-condensed font-black text-3xl sm:text-4xl text-white uppercase mt-1">
                &ldquo;WE DON&apos;T JUST SELL RUBBER — WE DELIVER CPK PEACE OF MIND.&rdquo;
              </h2>

              <p className="text-sm text-[#CED4DA] leading-relaxed mt-4">
                &ldquo;When I started fitting truck tyres 15 years ago, I saw first-hand how freight operators were being treated like numbers by multinational tyre suppliers. Fleets were sold cheap tyres with weak casings that blew out on summer highways, leaving trucks stranded and schedules in ruin.
              </p>
              <p className="text-sm text-[#CED4DA] leading-relaxed mt-3">
                Ultimate Tyres was built on the opposite principle: straight-talking technical advice, transparent wholesale pricing for workshops, and tyres like Ralson that deliver verifiable 100% casing guarantees. Whether you manage 2 trucks or 200 B-doubles, my team and I answer your call directly.&rdquo;
              </p>

              <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-[#25292E] text-center">
                <div className="bg-[#1C1F22] p-4 rounded-xl border border-[#2B3036]">
                  <div className="font-condensed font-black text-3xl text-[#FF3B30]">15+</div>
                  <div className="text-xs text-[#868E96] mt-0.5">Years in Commercial Tyres</div>
                </div>
                <div className="bg-[#1C1F22] p-4 rounded-xl border border-[#2B3036]">
                  <div className="font-condensed font-black text-3xl text-white">137</div>
                  <div className="text-xs text-[#868E96] mt-0.5">5-Star Google Reviews</div>
                </div>
                <div className="bg-[#1C1F22] p-4 rounded-xl border border-[#2B3036]">
                  <div className="font-condensed font-black text-3xl text-emerald-400">100%</div>
                  <div className="text-xs text-[#868E96] mt-0.5">Casing Multi-Life Guarantee</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3 Physical Facilities */}
        <section className="py-16 px-4 bg-[#121416]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-xs uppercase font-condensed font-bold text-[#D50000] tracking-widest">
                SCALE YOU CAN COUNT ON
              </span>
              <h2 className="font-condensed font-black text-3xl sm:text-4xl text-white uppercase mt-1">
                3 SOUTH-EAST QUEENSLAND FACILITIES
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {BRANCHES.map((branch) => (
                <div
                  key={branch.id}
                  className="bg-[#1C1F22] border border-[#2B3036] rounded-2xl p-6 hover:border-[#D50000] transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Building2 className="w-6 h-6 text-[#FF3B30]" />
                      {branch.isHq && (
                        <span className="text-[10px] bg-[#D50000] text-white px-2 py-0.5 rounded font-bold uppercase">
                          Central HQ
                        </span>
                      )}
                    </div>

                    <h3 className="font-condensed font-bold text-xl text-white">
                      {branch.name}
                    </h3>
                    <p className="text-xs text-[#868E96] mt-1">
                      {branch.address}, {branch.suburb} {branch.state}
                    </p>

                    <div className="mt-4 pt-3 border-t border-[#25292E] space-y-1.5 text-xs text-[#CED4DA]">
                      {branch.services.map((srv, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{srv}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#25292E] flex items-center justify-between">
                    <a
                      href={`tel:${branch.phone}`}
                      className="font-mono text-xs font-bold text-white hover:text-[#FF3B30]"
                    >
                      {branch.phone}
                    </a>

                    <Link
                      href="/network-map"
                      className="text-xs font-condensed font-bold text-[#FF3B30] hover:underline uppercase flex items-center gap-1"
                    >
                      <span>View On Map</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
