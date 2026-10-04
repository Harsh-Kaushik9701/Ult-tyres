'use client';

import React from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { Shield, CheckCircle2, ArrowRight, Truck, Wrench, Download, Star } from 'lucide-react';
import TopUtilityRibbon from '@/components/TopUtilityRibbon';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';
import { BRANDS, PATTERNS } from '@/data/mockData';

export default function BrandRangePage() {
  const params = useParams();
  const brandSlug = (params?.brand as string)?.toLowerCase();

  const brand = BRANDS.find((b) => b.slug === brandSlug);
  if (!brand) return notFound();

  const brandPatterns = PATTERNS.filter((p) => p.brandId === brand.id);

  return (
    <div className="min-h-screen flex flex-col bg-[#121416]">
      <TopUtilityRibbon />
      <MainHeader />

      <main className="flex-1">
        {/* Brand Hero Banner */}
        <section className="relative py-20 px-4 bg-[#1C1F22] border-b border-[#25292E] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${brand.heroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1C1F22] via-[#1C1F22]/90 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="max-w-2xl">
              {brand.isAuthorisedDistributor ? (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D50000] text-white text-xs font-condensed font-bold uppercase tracking-wider mb-4 shadow-lg">
                  <Shield className="w-4 h-4" />
                  <span>AUTHORISED AUSTRALIAN DISTRIBUTOR</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#25292E] text-amber-400 text-xs font-condensed font-bold uppercase tracking-wider mb-4 border border-[#343A40]">
                  <span>Tier 1 Commercial Transport Partner</span>
                </div>
              )}

              <h1 className="font-condensed font-black text-5xl sm:text-6xl text-white uppercase tracking-tight">
                {brand.name} COMMERCIAL TYRES
              </h1>
              <p className="text-amber-400 font-condensed font-bold text-xl uppercase tracking-wider mt-1">
                {brand.tagline}
              </p>

              <p className="text-sm sm:text-base text-[#CED4DA] leading-relaxed mt-4">
                {brand.description}
              </p>

              <div className="mt-6 flex items-center gap-4 flex-wrap">
                <div className="bg-[#121416]/80 backdrop-blur-sm border border-[#343A40] rounded-lg px-4 py-2 text-xs flex items-center gap-2 text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{brand.warrantySummary}</span>
                </div>
                <div className="bg-[#121416]/80 backdrop-blur-sm border border-[#343A40] rounded-lg px-4 py-2 text-xs text-[#868E96]">
                  Origin: <strong className="text-white">{brand.originCountry}</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Distributor Guarantee / Value Pillar */}
        {brand.isAuthorisedDistributor && (
          <section className="bg-gradient-to-r from-[#D50000]/10 via-[#1C1F22] to-[#121416] border-b border-[#25292E] py-8 px-4">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#D50000] text-white flex items-center justify-center font-black text-xl font-condensed">
                  100%
                </div>
                <div>
                  <h3 className="font-condensed font-bold text-lg text-white uppercase">
                    Guaranteed Casing Multi-Life Assurance
                  </h3>
                  <p className="text-xs text-[#868E96]">
                    Every Ralson commercial tyre supplied by Ultimate Tyres qualifies for full casing compensation if structural failure occurs within original tread life or first 2 retreads.
                  </p>
                </div>
              </div>

              <Link
                href="/join-us/become-a-dealer"
                className="bg-[#D50000] hover:bg-[#B30000] text-white px-5 py-2.5 rounded text-xs font-condensed font-bold uppercase tracking-wider whitespace-nowrap"
              >
                Apply for Ralson Dealership
              </Link>
            </div>
          </section>
        )}

        {/* Brand Patterns Listing */}
        <section className="py-14 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs uppercase font-condensed font-bold text-[#868E96] tracking-wider">
                  COMMERCIAL PATTERN LINEUP
                </span>
                <h2 className="font-condensed font-black text-3xl text-white uppercase">
                  {brand.name} Patterns Available in Queensland
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {brandPatterns.map((pattern) => (
                <div
                  key={pattern.id}
                  className="bg-[#1C1F22] border border-[#2B3036] rounded-2xl overflow-hidden hover:border-[#D50000] transition flex flex-col justify-between shadow-xl group"
                >
                  <div>
                    <div className="relative h-56 bg-[#25292E] overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition duration-500"
                        style={{ backgroundImage: `url(${pattern.heroImage})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1C1F22] via-transparent to-black/30" />

                      <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                        {pattern.positions.map((p) => (
                          <span
                            key={p}
                            className="bg-[#D50000] text-white text-[11px] font-condensed font-bold uppercase px-2.5 py-0.5 rounded shadow"
                          >
                            {p} Axle
                          </span>
                        ))}
                      </div>

                      <div className="absolute bottom-3 right-3 bg-black/80 font-mono text-xs text-white px-2.5 py-1 rounded">
                        Tread: {pattern.treadDepthMm} mm
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="text-xs font-mono font-bold text-amber-400 uppercase">
                        {pattern.code}
                      </div>
                      <h3 className="font-condensed font-black text-2xl text-white uppercase mt-0.5 group-hover:text-[#FF3B30] transition">
                        {pattern.name}
                      </h3>

                      <p className="text-xs text-[#868E96] leading-relaxed mt-3">
                        {pattern.description}
                      </p>

                      <div className="mt-4 space-y-1.5">
                        {pattern.features.slice(0, 2).map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-[11px] text-[#CED4DA]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>

                      {/* Sizes Chips */}
                      <div className="mt-5 pt-3 border-t border-[#25292E]">
                        <div className="text-[10px] uppercase font-bold text-[#868E96] mb-1.5 font-condensed">
                          Available Sizes in Queensland
                        </div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {pattern.skus.map((sku) => (
                            <span
                              key={sku.id}
                              className="font-mono text-[11px] bg-[#121416] text-[#CED4DA] px-2 py-0.5 rounded border border-[#2B3036]"
                            >
                              {sku.size}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <Link
                      href={`/tyres/${brand.slug}/${pattern.code.toLowerCase()}`}
                      className="w-full block text-center bg-[#D50000] hover:bg-[#B30000] text-white py-3 rounded-lg font-condensed font-bold text-sm uppercase tracking-wider transition shadow"
                    >
                      View Detailed Specifications &amp; Stock
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
