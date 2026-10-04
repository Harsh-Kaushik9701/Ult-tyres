'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Shield,
  Truck,
  Compass,
  Star,
  ArrowRight,
  Play,
  Pause,
  Search,
  CheckCircle,
  Phone,
  Zap,
  MapPin,
  ChevronRight,
  SlidersHorizontal,
  Clock,
} from 'lucide-react';
import TopUtilityRibbon from '@/components/TopUtilityRibbon';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';
import AxlePositionDiagram from '@/components/AxlePositionDiagram';
import TyreSizeExplainer from '@/components/TyreSizeExplainer';
import ReadyFitVisualExplainer from '@/components/ReadyFitVisualExplainer';
import { BRANDS, PATTERNS, FLEET_SERVICES, BRANCHES } from '@/data/mockData';
import { AxlePosition } from '@/types';

export default function HomePage() {
  const router = useRouter();

  // Video hero controls
  const [isPlaying, setIsPlaying] = useState(true);

  // Size finder state
  const [searchSize, setSearchSize] = useState('');
  const [selectedPosition, setSelectedPosition] = useState<AxlePosition | 'all'>('all');
  const [selectedBrand, setSelectedBrand] = useState('all');

  const handleSizeSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (searchSize) query.set('size', searchSize);
    if (selectedPosition !== 'all') query.set('pos', selectedPosition);
    if (selectedBrand !== 'all') query.set('brand', selectedBrand);
    router.push(`/tyres/truck?${query.toString()}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#121416]">
      <TopUtilityRibbon />
      <MainHeader />

      <main className="flex-1">
        {/* Section 3: Hero Banner Slider (High-contrast, pausable video background) */}
        <section className="relative min-h-[580px] lg:min-h-[660px] flex items-center overflow-hidden border-b border-[#25292E]">
          {/* Background image fallback / video simulation */}
          <div className="absolute inset-0 z-0">
            <div
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1920&q=80")',
              }}
            />
            {/* Dark industrial gradient overlays for readable contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#121416] via-[#121416]/90 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121416] via-transparent to-black/40" />
            <div className="absolute inset-0 bg-tread-pattern opacity-40 mix-blend-overlay pointer-events-none" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 w-full">
            <div className="max-w-2xl">
              {/* Distributorship pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#D50000]/20 border border-[#D50000]/40 text-[#FF3B30] text-xs font-condensed font-bold uppercase tracking-wider mb-6">
                <Shield className="w-4 h-4 text-[#D50000]" />
                <span>Authorised Australian Commercial Tyre Distributor</span>
              </div>

              <h1 className="font-condensed font-black text-5xl sm:text-6xl lg:text-7xl text-white tracking-tight uppercase leading-[0.95] mb-6">
                YOUR FLEET. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D50000] via-[#FF3B30] to-amber-500">
                  OUR DRIVE.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#CED4DA] leading-relaxed mb-8 max-w-xl">
                Rugged commercial truck & bus tyres built for brutal Australian highway loadings. Direct wholesale supply of <strong>Ralson</strong>, <strong>Blacklion</strong>, and <strong>Triangle</strong>, backed by precision laser alignment and 24/7 mobile fleet support.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/tyres/truck"
                  className="bg-[#D50000] hover:bg-[#B30000] text-white px-7 py-3.5 rounded font-condensed font-bold text-lg tracking-wider uppercase transition shadow-lg shadow-red-950 flex items-center gap-2"
                >
                  <span>Explore Tyre Catalogue</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  href="/join-us/become-a-dealer"
                  className="bg-[#25292E] hover:bg-[#343A40] text-white border border-[#495057] px-6 py-3.5 rounded font-condensed font-bold text-lg tracking-wider uppercase transition flex items-center gap-2"
                >
                  <span>Become a Dealer</span>
                </Link>
              </div>

              {/* Quick Size Chips */}
              <div className="mt-8 flex items-center gap-2 flex-wrap text-xs text-[#868E96]">
                <span>Popular Sizes:</span>
                {['11R22.5', '295/80R22.5', '315/80R22.5', '385/65R22.5'].map((size) => (
                  <Link
                    key={size}
                    href={`/tyres/truck?size=${size}`}
                    className="font-mono text-white bg-[#1C1F22] hover:bg-[#D50000] hover:text-white px-2.5 py-1 rounded border border-[#343A40] transition text-[11px]"
                  >
                    {size}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Video pause/play button for WCAG 2.2 AA Compliance */}
          <div className="absolute bottom-6 right-6 z-20">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-[#1C1F22]/80 hover:bg-[#1C1F22] text-[#CED4DA] hover:text-white p-2.5 rounded-full border border-[#343A40] flex items-center gap-2 text-xs font-medium backdrop-blur-sm transition"
              aria-label={isPlaying ? 'Pause background visual loop' : 'Play background visual loop'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isPlaying ? 'Pause Loop' : 'Play'}</span>
            </button>
          </div>
        </section>

        {/* Section 4: Trust Strip (137 reviews, 15+ years, 3 branches, Authorised Ralson distributor) */}
        <section className="bg-[#1C1F22] border-b border-[#25292E] py-6 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {/* 137 Google Reviews */}
            <div className="border-r border-[#2B3036] last:border-0 pr-4">
              <div className="flex items-center justify-center gap-1 text-amber-400 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="font-condensed font-black text-2xl text-white">4.9 / 5.0 RATING</div>
              <div className="text-xs text-[#868E96]">137 Verified Google Reviews</div>
            </div>

            {/* 15+ Years Experience */}
            <div className="border-r border-[#2B3036] last:border-0 pr-4">
              <div className="font-condensed font-black text-3xl text-white tracking-tight">15+ YEARS</div>
              <div className="text-xs text-[#868E96] mt-0.5">Heavy Vehicle Tyre Authority</div>
            </div>

            {/* 3 Physical Branches */}
            <div className="border-r border-[#2B3036] last:border-0 pr-4">
              <div className="font-condensed font-black text-3xl text-[#FF3B30] tracking-tight">3 BRANCHES</div>
              <div className="text-xs text-[#868E96] mt-0.5">Rocklea HQ &bull; Yatala &bull; Bald Hills</div>
            </div>

            {/* Authorised Distributor */}
            <div>
              <div className="inline-flex items-center justify-center gap-1.5 font-condensed font-bold text-lg text-emerald-400">
                <Shield className="w-5 h-5 text-emerald-400" />
                <span>AUTHORISED</span>
              </div>
              <div className="text-xs text-white font-medium">Ralson Commercial Tyres AU</div>
            </div>
          </div>
        </section>

        {/* Section 6: Find a Tyre (Free-text smart size finder + Axle Position filter) */}
        <section className="bg-[#16181B] py-12 px-4 border-b border-[#25292E]">
          <div className="max-w-7xl mx-auto">
            <div className="bg-[#1C1F22] border border-[#2B3036] rounded-2xl p-6 sm:p-8 shadow-2xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="font-condensed font-black text-2xl sm:text-3xl text-white uppercase tracking-wide">
                    COMMERCIAL TYRE FINDER
                  </h2>
                  <p className="text-xs sm:text-sm text-[#868E96] mt-1">
                    Direct size lookup accepting free-text e.g. <span className="text-amber-400 font-mono">11R22.5</span>, <span className="text-amber-400 font-mono">295/80R22.5</span>, or <span className="text-amber-400 font-mono">11r225</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#868E96] uppercase font-bold">Axle:</span>
                  {(['all', 'steer', 'drive', 'trailer'] as const).map((pos) => (
                    <button
                      key={pos}
                      type="button"
                      onClick={() => setSelectedPosition(pos)}
                      className={`px-3 py-1 rounded text-xs font-condensed font-bold uppercase transition ${
                        selectedPosition === pos
                          ? 'bg-[#D50000] text-white'
                          : 'bg-[#25292E] text-[#CED4DA] hover:bg-[#343A40]'
                      }`}
                    >
                      {pos}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSizeSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Free Text Input */}
                <div className="relative">
                  <label className="block text-[11px] uppercase font-bold text-[#868E96] mb-1 font-condensed">
                    Tyre Size / Dimension
                  </label>
                  <div className="relative">
                    <Search className="w-4 h-4 text-[#6C757D] absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. 11R22.5 or 295/80"
                      value={searchSize}
                      onChange={(e) => setSearchSize(e.target.value)}
                      className="w-full bg-[#121416] border border-[#343A40] text-white rounded-lg pl-9 pr-3 py-2.5 text-sm focus:border-[#D50000] focus:outline-none font-mono"
                    />
                  </div>
                </div>

                {/* Brand Selector */}
                <div>
                  <label className="block text-[11px] uppercase font-bold text-[#868E96] mb-1 font-condensed">
                    Brand Range
                  </label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full bg-[#121416] border border-[#343A40] text-white rounded-lg px-3 py-2.5 text-sm focus:border-[#D50000] focus:outline-none"
                  >
                    <option value="all">All Brands (Ralson, Blacklion, Triangle)</option>
                    <option value="ralson">Ralson (Authorised)</option>
                    <option value="blacklion">Blacklion</option>
                    <option value="triangle">Triangle</option>
                  </select>
                </div>

                {/* Application Selector */}
                <div>
                  <label className="block text-[11px] uppercase font-bold text-[#868E96] mb-1 font-condensed">
                    Application / Duty
                  </label>
                  <select className="w-full bg-[#121416] border border-[#343A40] text-white rounded-lg px-3 py-2.5 text-sm focus:border-[#D50000] focus:outline-none">
                    <option value="all">Any Haulage Route</option>
                    <option value="long-haul">Long-Haul Interstate</option>
                    <option value="regional">Regional Distribution</option>
                    <option value="urban">Urban Stop & Go / Bus</option>
                    <option value="mixed">Mixed Service / Tipper</option>
                  </select>
                </div>

                {/* Submit button */}
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full bg-[#D50000] hover:bg-[#B30000] text-white font-condensed font-bold text-base py-2.5 px-4 rounded-lg tracking-wider uppercase transition flex items-center justify-center gap-2 shadow"
                  >
                    <Search className="w-4 h-4" />
                    <span>Search Range</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Section 5: Flagship Brand Showcases (Ralson, Blacklion, Triangle) */}
        <section className="py-16 px-4 bg-[#121416]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <div className="text-xs uppercase font-condensed font-bold text-[#FF3B30] tracking-widest mb-1">
                  DIRECT WHOLESALE DISTRIBUTION
                </div>
                <h2 className="font-condensed font-black text-3xl sm:text-4xl text-white tracking-wide uppercase">
                  OUR FLAGSHIP COMMERCIAL BRANDS
                </h2>
              </div>
              <Link
                href="/tyres"
                className="text-xs font-condensed font-bold text-[#CED4DA] hover:text-[#FF3B30] flex items-center gap-1 uppercase tracking-wider"
              >
                <span>View Full Lineup</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* 3 Brand Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {BRANDS.map((brand) => (
                <div
                  key={brand.id}
                  className="bg-[#1C1F22] border border-[#2B3036] rounded-2xl overflow-hidden flex flex-col group hover:border-[#D50000]/60 transition-all shadow-xl"
                >
                  <div className="relative h-48 overflow-hidden bg-[#25292E]">
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                      style={{ backgroundImage: `url(${brand.heroImage})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C1F22] via-[#1C1F22]/40 to-transparent" />

                    <div className="absolute top-4 left-4">
                      {brand.isAuthorisedDistributor ? (
                        <span className="bg-[#D50000] text-white text-[11px] font-condensed font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow">
                          Authorised AU Distributor
                        </span>
                      ) : (
                        <span className="bg-[#25292E]/90 text-[#CED4DA] text-[11px] font-condensed font-bold uppercase tracking-wider px-2.5 py-1 rounded border border-[#343A40]">
                          Fleet Proven Tier 1
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-condensed font-black text-2xl text-white uppercase group-hover:text-[#FF3B30] transition">
                        {brand.name} Commercial Tyres
                      </h3>
                      <div className="text-xs text-amber-400 font-medium mt-1">
                        {brand.tagline}
                      </div>
                      <p className="text-xs text-[#868E96] leading-relaxed mt-3">
                        {brand.description}
                      </p>

                      <div className="mt-4 pt-3 border-t border-[#25292E] text-[11px] text-[#CED4DA] flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{brand.warrantySummary}</span>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#25292E] flex items-center justify-between">
                      <Link
                        href={`/tyres/${brand.slug}`}
                        className="text-xs font-condensed font-bold text-white group-hover:text-[#FF3B30] flex items-center gap-1 uppercase tracking-wider transition"
                      >
                        <span>Explore {brand.name} Patterns</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <Link
                        href={`/tyres/truck?brand=${brand.slug}`}
                        className="text-[11px] font-mono text-[#868E96] hover:text-white"
                      >
                        View Sizes &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Pattern Showcase (Dense Cards with Axle Badges) */}
        <section className="py-14 px-4 bg-[#16181B] border-t border-b border-[#25292E]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-xs uppercase font-condensed font-bold text-amber-400 tracking-wider">
                  HIGH DEMAND PATTERNS
                </span>
                <h3 className="font-condensed font-black text-2xl sm:text-3xl text-white uppercase tracking-wide">
                  FLAGSHIP COMMERCIAL PATTERNS IN STOCK
                </h3>
              </div>
              <Link
                href="/tyres/truck"
                className="text-xs font-condensed font-bold text-[#CED4DA] hover:text-white uppercase tracking-wider flex items-center gap-1"
              >
                <span>Filter By Axle Position</span>
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PATTERNS.slice(0, 4).map((pattern) => (
                <div
                  key={pattern.id}
                  className="bg-[#1C1F22] border border-[#2B3036] rounded-xl overflow-hidden hover:border-[#D50000] transition flex flex-col"
                >
                  <div className="relative h-44 bg-[#25292E] overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition"
                      style={{ backgroundImage: `url(${pattern.heroImage})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C1F22] via-transparent to-black/30" />

                    <div className="absolute top-3 left-3 flex gap-1 flex-wrap">
                      {pattern.positions.map((p) => (
                        <span
                          key={p}
                          className="bg-[#D50000] text-white text-[10px] font-condensed font-bold uppercase px-2 py-0.5 rounded shadow"
                        >
                          {p}
                        </span>
                      ))}
                    </div>

                    <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white font-mono text-[10px] px-2 py-0.5 rounded">
                      Depth: {pattern.treadDepthMm} mm
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-bold text-[#868E96] uppercase font-condensed">
                        {pattern.brandName} Commercial
                      </div>
                      <h4 className="font-condensed font-bold text-lg text-white leading-snug mt-0.5">
                        {pattern.name}
                      </h4>

                      <div className="mt-3 flex items-center gap-1 flex-wrap">
                        {pattern.skus.map((s) => (
                          <span
                            key={s.id}
                            className="text-[10px] font-mono bg-[#121416] text-[#CED4DA] px-1.5 py-0.5 rounded border border-[#2B3036]"
                          >
                            {s.size}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-[#25292E] flex items-center justify-between">
                      <Link
                        href={`/tyres/${pattern.brandId}/${pattern.code.toLowerCase()}`}
                        className="text-xs font-condensed font-bold text-[#FF3B30] hover:text-white uppercase flex items-center gap-1"
                      >
                        <span>Specs & Stock</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <span className="text-[10px] text-emerald-400 font-medium">
                        Rocklea &bull; Yatala
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 7: Fleet Services (9 tiles with Ultimate ReadyFit and Wheel Alignment highlighted) */}
        <section className="py-16 px-4 bg-[#121416]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs uppercase font-condensed font-bold text-[#D50000] tracking-widest">
                HEAVY WORKSHOP & MOBILE FLEET SUPPORT
              </span>
              <h2 className="font-condensed font-black text-3xl sm:text-4xl text-white tracking-wide uppercase mt-1">
                9 SPECIALISED FLEET SERVICES
              </h2>
              <p className="text-[#868E96] text-xs sm:text-sm mt-2">
                Delivering complete mechanical tyre lifecycle support across South-East Queensland. In-bay high-clearance truck drive-throughs and 24/7 mobile roadside units.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FLEET_SERVICES.map((srv) => {
                const isHighlight = srv.id === 'wheel-alignment' || srv.id === 'ultimate-readyfit';
                return (
                  <Link
                    key={srv.id}
                    href={`/fleet-services/${srv.slug}`}
                    className={`bg-[#1C1F22] border rounded-xl p-6 transition flex flex-col justify-between group hover:-translate-y-1 ${
                      isHighlight
                        ? 'border-[#D50000]/60 bg-gradient-to-b from-[#1C1F22] to-[#25292E]'
                        : 'border-[#2B3036] hover:border-[#495057]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono text-[#868E96]">
                          {srv.turnaround}
                        </span>
                        {isHighlight && (
                          <span className="text-[10px] font-condensed font-bold uppercase bg-[#D50000] text-white px-2 py-0.5 rounded">
                            Featured
                          </span>
                        )}
                      </div>

                      <h3 className="font-condensed font-bold text-xl text-white uppercase group-hover:text-[#FF3B30] transition">
                        {srv.name}
                      </h3>

                      <p className="text-xs text-[#868E96] leading-relaxed mt-2">
                        {srv.shortDesc}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#25292E] flex items-center justify-between text-xs">
                      <span className="text-amber-400 text-[11px] font-medium">
                        {srv.highlight}
                      </span>
                      <span className="font-condensed font-bold text-white group-hover:text-[#FF3B30] flex items-center gap-1 uppercase">
                        <span>Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 8: ReadyFit Explainer Section */}
        <section className="py-12 px-4 bg-[#16181B] border-t border-b border-[#25292E]">
          <div className="max-w-7xl mx-auto">
            <ReadyFitVisualExplainer />
          </div>
        </section>

        {/* Interactive Axle Diagram & Tyre Anatomy Graphic Feature */}
        <section className="py-16 px-4 bg-[#121416]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div>
                <AxlePositionDiagram
                  interactive={true}
                  selectedPosition="drive"
                />
                <p className="text-xs text-[#868E96] mt-2 italic text-center">
                  Click on Steer, Drive, or Trailer axles above to preview vehicle fitment requirements
                </p>
              </div>

              <div>
                <TyreSizeExplainer />
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: Why Ultimate Tyres (Cost Per Kilometre & Contractor Analogy) */}
        <section className="py-16 px-4 bg-[#1C1F22] border-t border-b border-[#25292E]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-xs uppercase font-condensed font-bold text-[#D50000] tracking-widest">
                  THE DEPENDABLE CO-PILOT
                </span>
                <h2 className="font-condensed font-black text-3xl sm:text-4xl text-white tracking-wide uppercase mt-1">
                  COMMERCIAL TYRES AS AN OPERATING ASSET, NOT A THROW-AWAY COST
                </h2>
                <p className="text-sm text-[#CED4DA] leading-relaxed mt-4">
                  For a freight operator, a truck sitting on the side of the M1 isn&apos;t just an inconvenience — it breaks customer SLAs and costs hundreds of dollars per hour. We treat commercial tyres with engineering discipline:
                </p>

                <div className="mt-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded bg-[#D50000]/20 border border-[#D50000]/40 flex items-center justify-center shrink-0 mt-0.5 text-[#FF3B30] font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-condensed font-bold text-base text-white uppercase">
                        Lowest Cost-Per-Kilometre (CPK) Formula
                      </h4>
                      <p className="text-xs text-[#868E96] leading-relaxed mt-0.5">
                        High initial removal mileage paired with virgin casings guaranteed for multiple retread cycles cuts total tyre expenditure by up to 28%.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 mt-0.5 text-amber-400 font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-condensed font-bold text-base text-white uppercase">
                        Frictionless Wholesale Ordering
                      </h4>
                      <p className="text-xs text-[#868E96] leading-relaxed mt-0.5">
                        No endless phone tag for availability. Add to your RFQ cart online, receive tiered quantity quotes within business hours, and confirm with one tap.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0 mt-0.5 text-emerald-400 font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-condensed font-bold text-base text-white uppercase">
                        Nationwide Backbone & Local Brisbane Scale
                      </h4>
                      <p className="text-xs text-[#868E96] leading-relaxed mt-0.5">
                        Three fully equipped service hubs in Rocklea, Yatala, and Bald Hills plus our partner network ensure your fleet is never stranded.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call-to-action Card */}
              <div className="bg-[#121416] border border-[#2B3036] rounded-2xl p-8 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D50000]/10 rounded-bl-full pointer-events-none" />

                <h3 className="font-condensed font-black text-2xl sm:text-3xl text-white uppercase">
                  READY TO ELEVATE YOUR FLEET OPERATIONS?
                </h3>
                <p className="text-xs text-[#868E96] mt-2 leading-relaxed">
                  Join hundreds of transport operators, tipper fleets, and municipal workshops across Queensland who trust Ultimate Tyres.
                </p>

                <div className="mt-8 space-y-3">
                  <Link
                    href="/join-us/become-a-dealer"
                    className="block w-full text-center bg-[#D50000] hover:bg-[#B30000] text-white py-3.5 rounded-lg font-condensed font-bold text-base uppercase tracking-wider transition shadow-lg"
                  >
                    Apply for Dealer Trade Account
                  </Link>
                  <Link
                    href="/contact"
                    className="block w-full text-center bg-[#25292E] hover:bg-[#343A40] text-white py-3 rounded-lg font-condensed font-bold text-sm uppercase tracking-wider transition border border-[#343A40]"
                  >
                    Book Fleet Alignment Inspection
                  </Link>
                </div>

                <div className="mt-6 pt-4 border-t border-[#25292E] flex items-center justify-center gap-2 text-xs text-[#868E96]">
                  <Phone className="w-3.5 h-3.5 text-[#FF3B30]" />
                  <span>Direct Technical Line: </span>
                  <a href="tel:1300110002" className="text-white font-bold hover:underline">
                    1300 110 002
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 9: Network Map Teaser */}
        <section className="py-14 px-4 bg-[#121416]">
          <div className="max-w-7xl mx-auto">
            <div className="bg-[#1C1F22] border border-[#2B3036] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="text-xs uppercase font-condensed font-bold text-amber-400 tracking-wider mb-1">
                  QUEENSLAND SERVICE COVERAGE
                </div>
                <h3 className="font-condensed font-black text-2xl sm:text-3xl text-white uppercase">
                  INTERACTIVE NETWORK MAP &amp; BRANCH LOCATOR
                </h3>
                <p className="text-xs sm:text-sm text-[#868E96] mt-1 max-w-xl">
                  Locate your nearest drive-through fitting bay in Rocklea, Yatala, or Bald Hills, or review our 24/7 mobile breakdown dispatch zones across SEQ.
                </p>
              </div>

              <Link
                href="/network-map"
                className="bg-[#25292E] hover:bg-[#343A40] text-white border border-[#495057] px-6 py-3.5 rounded-lg font-condensed font-bold text-base uppercase tracking-wider flex items-center gap-2 shrink-0 transition"
              >
                <MapPin className="w-4 h-4 text-[#D50000]" />
                <span>Open Network Map</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Section 11: Real Curated Google Reviews */}
        <section className="py-16 px-4 bg-[#16181B] border-t border-[#25292E]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-xl mx-auto mb-10">
              <div className="flex items-center justify-center gap-1 text-amber-400 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <h3 className="font-condensed font-black text-3xl text-white uppercase">
                TRUSTED BY COMMERCIAL FLEETS
              </h3>
              <p className="text-xs text-[#868E96] mt-1">
                Real feedback from Queensland fleet owners, yard supervisors, and owner-drivers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#1C1F22] border border-[#2B3036] rounded-xl p-6 flex flex-col justify-between">
                <p className="text-xs text-[#CED4DA] italic leading-relaxed">
                  &ldquo;Manjinder and the Ultimate Tyres mobile team saved our B-double schedule on the Gateway motorway. Had a mobile van on site in 35 minutes with live SMS tracking. Outstanding service.&rdquo;
                </p>
                <div className="mt-4 pt-3 border-t border-[#25292E] flex items-center justify-between text-xs">
                  <span className="font-bold text-white">Brendan T.</span>
                  <span className="text-[#868E96]">Linehaul Fleet Mgr, Rocklea</span>
                </div>
              </div>

              <div className="bg-[#1C1F22] border border-[#2B3036] rounded-xl p-6 flex flex-col justify-between">
                <p className="text-xs text-[#CED4DA] italic leading-relaxed">
                  &ldquo;We switched our 18 tippers to Ralson RDC55 drives through Ultimate Tyres. We&apos;ve seen over 22% better wear than our previous supplier and the casing warranty gives us complete peace of mind.&rdquo;
                </p>
                <div className="mt-4 pt-3 border-t border-[#25292E] flex items-center justify-between text-xs">
                  <span className="font-bold text-white">Mick Patterson</span>
                  <span className="text-[#868E96]">Earthmoving &amp; Transport, Yatala</span>
                </div>
              </div>

              <div className="bg-[#1C1F22] border border-[#2B3036] rounded-xl p-6 flex flex-col justify-between">
                <p className="text-xs text-[#CED4DA] italic leading-relaxed">
                  &ldquo;Their laser wheel alignment bay at Bald Hills transformed our steer tyre scrub issues. Straight-shooting advice, fair pricing on quotes, and no corporate runaround.&rdquo;
                </p>
                <div className="mt-4 pt-3 border-t border-[#25292E] flex items-center justify-between text-xs">
                  <span className="font-bold text-white">Gary Stevens</span>
                  <span className="text-[#868E96]">Refrigerated Express, Northside</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 12: Dealer CTA Band ("Live availability, fast pricing, zero headaches.") */}
        <section className="bg-gradient-to-r from-[#D50000] to-[#990000] text-white py-12 px-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs uppercase font-condensed font-black tracking-widest text-black/60">
                FRICTIONLESS B2B WHOLESALE
              </span>
              <h2 className="font-condensed font-black text-3xl sm:text-4xl uppercase tracking-wide mt-1">
                LIVE AVAILABILITY. FAST PRICING. ZERO HEADACHES.
              </h2>
              <p className="text-white/90 text-sm mt-1 max-w-xl">
                Build your commercial tyre cart online, submit for tiered quantity pricing, and get quotes returned directly to your phone.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/dealer/login"
                className="bg-black hover:bg-[#1C1F22] text-white px-6 py-3 rounded-lg font-condensed font-bold text-base uppercase tracking-wider transition shadow-lg"
              >
                Dealer Login / Join
              </Link>
              <Link
                href="/portal"
                className="bg-white hover:bg-slate-100 text-black px-6 py-3 rounded-lg font-condensed font-bold text-base uppercase tracking-wider transition shadow-lg"
              >
                Launch Portal
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
