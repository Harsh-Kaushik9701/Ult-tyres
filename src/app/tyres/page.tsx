'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Shield, Truck, Disc, ArrowRight, Search, CheckCircle2 } from 'lucide-react';
import TopUtilityRibbon from '@/components/TopUtilityRibbon';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';
import AxlePositionDiagram from '@/components/AxlePositionDiagram';
import { BRANDS, PATTERNS } from '@/data/mockData';
import { AxlePosition } from '@/types';

export default function TyresOverviewPage() {
  const [selectedPos, setSelectedPos] = useState<AxlePosition | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPatterns = PATTERNS.filter((p) => {
    const matchesPos =
      selectedPos === 'all' || p.positions.includes(selectedPos as AxlePosition) || p.positions.includes('all-position');
    const matchesQuery =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.skus.some((s) => s.size.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesPos && matchesQuery;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#121416]">
      <TopUtilityRibbon />
      <MainHeader />

      <main className="flex-1">
        {/* Page Hero */}
        <section className="bg-gradient-to-b from-[#1C1F22] to-[#121416] py-14 px-4 border-b border-[#25292E]">
          <div className="max-w-7xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#D50000]/20 border border-[#D50000]/40 text-[#FF3B30] text-xs font-condensed font-bold uppercase tracking-wider mb-4">
              <Shield className="w-4 h-4 text-[#D50000]" />
              <span>Commercial Heavy Tyre Catalogue</span>
            </div>

            <h1 className="font-condensed font-black text-4xl sm:text-5xl text-white uppercase tracking-tight">
              COMMERCIAL TRUCK &amp; BUS TYRES
            </h1>
            <p className="text-sm sm:text-base text-[#CED4DA] max-w-2xl mt-2 leading-relaxed">
              Wholesale distribution of premium commercial radial TBR tyres. Featuring our flagship brands <strong>Ralson</strong>, <strong>Blacklion</strong>, and <strong>Triangle</strong> with guaranteed Australian casing life and lowest cost per kilometre.
            </p>

            {/* Quick Category Switcher */}
            <div className="flex flex-wrap items-center gap-3 mt-6">
              <Link
                href="/tyres/truck"
                className="bg-[#D50000] hover:bg-[#B30000] text-white px-5 py-2.5 rounded-lg font-condensed font-bold text-sm uppercase tracking-wider transition flex items-center gap-2"
              >
                <Truck className="w-4 h-4" />
                <span>Truck Tyres by Axle Position</span>
              </Link>
              <Link
                href="/tyres/bus"
                className="bg-[#25292E] hover:bg-[#343A40] text-white border border-[#495057] px-5 py-2.5 rounded-lg font-condensed font-bold text-sm uppercase tracking-wider transition flex items-center gap-2"
              >
                <Disc className="w-4 h-4 text-amber-400" />
                <span>Bus &amp; Transit Tyres</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 3 Flagship Brands Banner */}
        <section className="py-10 px-4 bg-[#16181B] border-b border-[#25292E]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xs uppercase font-condensed font-bold text-[#868E96] tracking-widest mb-4">
              Direct Wholesale Portfolios
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {BRANDS.map((b) => (
                <Link
                  key={b.id}
                  href={`/tyres/${b.slug}`}
                  className="bg-[#1C1F22] border border-[#2B3036] hover:border-[#D50000] rounded-xl p-5 transition group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-condensed font-black text-2xl text-white group-hover:text-[#FF3B30] transition">
                        {b.name}
                      </span>
                      {b.isAuthorisedDistributor && (
                        <span className="text-[10px] bg-[#D50000] text-white px-2 py-0.5 rounded font-bold uppercase">
                          Authorised Dist.
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-amber-400 font-medium">{b.tagline}</div>
                    <p className="text-xs text-[#868E96] mt-2 line-clamp-2">{b.description}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#25292E] flex items-center justify-between text-xs font-condensed font-bold text-[#FF3B30] uppercase">
                    <span>Explore {b.name} Range</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Filter & Live Patterns Grid */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Filter Bar */}
            <div className="bg-[#1C1F22] border border-[#2B3036] rounded-xl p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Axle Tabs */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs text-[#868E96] uppercase font-bold mr-2">Axle:</span>
                {(['all', 'steer', 'drive', 'trailer'] as const).map((pos) => (
                  <button
                    key={pos}
                    onClick={() => setSelectedPos(pos)}
                    className={`px-3 py-1.5 rounded text-xs font-condensed font-bold uppercase transition ${
                      selectedPos === pos
                        ? 'bg-[#D50000] text-white'
                        : 'bg-[#25292E] text-[#CED4DA] hover:bg-[#343A40]'
                    }`}
                  >
                    {pos}
                  </button>
                ))}
              </div>

              {/* Search box */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-[#6C757D] absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search pattern, size (e.g. 11R22.5)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#121416] border border-[#343A40] text-white text-xs rounded-lg pl-9 pr-3 py-2 focus:border-[#D50000] focus:outline-none"
                />
              </div>
            </div>

            {/* Pattern Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPatterns.map((pattern) => (
                <div
                  key={pattern.id}
                  className="bg-[#1C1F22] border border-[#2B3036] rounded-xl overflow-hidden flex flex-col justify-between hover:border-[#D50000] transition group shadow-lg"
                >
                  <div>
                    <div className="relative h-48 bg-[#25292E] overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition duration-300"
                        style={{ backgroundImage: `url(${pattern.heroImage})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1C1F22] via-transparent to-black/30" />

                      <div className="absolute top-2.5 left-2.5 flex gap-1 flex-wrap">
                        {pattern.positions.map((p) => (
                          <span
                            key={p}
                            className="bg-[#D50000] text-white text-[10px] font-condensed font-bold uppercase px-2 py-0.5 rounded shadow"
                          >
                            {p}
                          </span>
                        ))}
                      </div>

                      <div className="absolute bottom-2 right-2 bg-black/80 font-mono text-[10px] text-white px-2 py-0.5 rounded">
                        {pattern.treadDepthMm} mm Tread
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="text-[11px] font-bold text-[#868E96] uppercase font-condensed">
                        {pattern.brandName}
                      </div>
                      <h3 className="font-condensed font-bold text-lg text-white leading-snug mt-0.5 group-hover:text-[#FF3B30] transition">
                        {pattern.name}
                      </h3>

                      <p className="text-xs text-[#868E96] mt-2 line-clamp-2">
                        {pattern.description}
                      </p>

                      {/* Sizes badges */}
                      <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                        {pattern.skus.map((sku) => (
                          <span
                            key={sku.id}
                            className="text-[10px] font-mono bg-[#121416] text-[#CED4DA] px-2 py-0.5 rounded border border-[#2B3036]"
                          >
                            {sku.size}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <div className="pt-3 border-t border-[#25292E] flex items-center justify-between">
                      <Link
                        href={`/tyres/${pattern.brandId}/${pattern.code.toLowerCase()}`}
                        className="w-full text-center bg-[#25292E] hover:bg-[#D50000] text-white text-xs font-condensed font-bold uppercase py-2 rounded transition tracking-wider"
                      >
                        View Full Specs &amp; Stock
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredPatterns.length === 0 && (
              <div className="text-center py-16 bg-[#1C1F22] rounded-xl border border-[#2B3036]">
                <p className="text-white font-bold">No tyres found matching your filter criteria.</p>
                <p className="text-xs text-[#868E96] mt-1">Try resetting the axle position or searching for 11R22.5</p>
                <button
                  onClick={() => {
                    setSelectedPos('all');
                    setSearchQuery('');
                  }}
                  className="mt-4 bg-[#D50000] text-white px-4 py-1.5 rounded text-xs font-condensed font-bold uppercase"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Axle Fitment Guide Strip */}
        <section className="py-12 px-4 bg-[#16181B] border-t border-[#25292E]">
          <div className="max-w-7xl mx-auto">
            <AxlePositionDiagram
              selectedPosition="all-position"
              interactive={false}
            />
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
