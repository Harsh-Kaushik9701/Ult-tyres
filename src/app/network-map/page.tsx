'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  Shield,
  Search,
  CheckCircle2,
  Wrench,
  Compass,
  Zap,
} from 'lucide-react';
import TopUtilityRibbon from '@/components/TopUtilityRibbon';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';
import { BRANCHES } from '@/data/mockData';

export default function NetworkMapPage() {
  const [selectedService, setSelectedService] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranchId, setSelectedBranchId] = useState('rocklea');

  const filteredBranches = BRANCHES.filter((b) => {
    const matchesSearch =
      !searchQuery ||
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.suburb.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.postcode.includes(searchQuery);
    const matchesService =
      selectedService === 'all' ||
      b.services.some((s) => s.toLowerCase().includes(selectedService.toLowerCase()));
    return matchesSearch && matchesService;
  });

  const activeBranch = BRANCHES.find((b) => b.id === selectedBranchId) || BRANCHES[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#121416]">
      <TopUtilityRibbon />
      <MainHeader />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-[#1C1F22] border-b border-[#25292E] py-12 px-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#D50000]/20 text-[#FF3B30] text-xs font-condensed font-bold uppercase tracking-wider mb-3">
                <MapPin className="w-3.5 h-3.5" />
                <span>South-East Queensland Logistics &amp; Service Backbone</span>
              </div>

              <h1 className="font-condensed font-black text-4xl sm:text-5xl text-white uppercase tracking-tight">
                NETWORK MAP &amp; BRANCH LOCATOR
              </h1>
              <p className="text-sm text-[#CED4DA] max-w-2xl mt-2 leading-relaxed">
                Locate our central wholesale distribution warehouse in Rocklea, our Southern corridor logistics depot in Yatala, or our Northern hub in Bald Hills. 24/7 mobile breakdown vans operate across all SEQ freight corridors.
              </p>
            </div>

            <a
              href="tel:1300110002"
              className="bg-[#D50000] hover:bg-[#B30000] text-white px-6 py-3 rounded-lg font-condensed font-bold text-sm uppercase tracking-wider flex items-center gap-2 transition shrink-0 shadow-lg"
            >
              <Phone className="w-4 h-4" />
              <span>24/7 Emergency Dispatch: 1300 110 002</span>
            </a>
          </div>
        </section>

        {/* Search & Filter Toolbar */}
        <section className="bg-[#16181B] border-b border-[#25292E] py-4 px-4 sticky top-[80px] z-20">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {/* Suburb Search */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#6C757D] absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search Suburb or Postcode..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-[#1C1F22] border border-[#343A40] text-white text-xs rounded-lg pl-8 pr-3 py-1.5 w-56 focus:border-[#D50000] focus:outline-none"
                />
              </div>

              {/* Service Filter */}
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="bg-[#1C1F22] border border-[#343A40] text-white text-xs rounded-lg px-3 py-1.5 focus:border-[#D50000] focus:outline-none"
              >
                <option value="all">All Available Services</option>
                <option value="alignment">Laser Wheel Alignment</option>
                <option value="mobile">24/7 Mobile Breakdown Van</option>
                <option value="readyfit">Ultimate ReadyFit Pre-Mounted</option>
                <option value="wholesale">Wholesale Bulk Warehousing</option>
              </select>
            </div>

            <div className="text-xs text-[#868E96] font-mono">
              3 Direct Hubs + 24/7 On-Road Fleet Coverage
            </div>
          </div>
        </section>

        {/* Map & List Interface */}
        <section className="py-10 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Accessible List View (Page 34 requirement) */}
            <div className="lg:col-span-5 space-y-4">
              <h2 className="font-condensed font-bold text-xl text-white uppercase tracking-wider mb-2">
                Physical Service Depots
              </h2>

              {filteredBranches.map((branch) => {
                const isSelected = branch.id === selectedBranchId;
                return (
                  <div
                    key={branch.id}
                    onClick={() => setSelectedBranchId(branch.id)}
                    className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#1C1F22] border-[#D50000] shadow-xl ring-1 ring-[#D50000]'
                        : 'bg-[#16181B] border-[#25292E] hover:border-[#343A40]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-condensed font-black text-xl text-white">
                        {branch.name}
                      </h3>
                      {branch.isHq && (
                        <span className="text-[10px] bg-[#D50000] text-white font-condensed font-bold uppercase px-2 py-0.5 rounded shadow">
                          HQ Central
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-[#CED4DA] flex items-start gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-[#D50000] shrink-0 mt-0.5" />
                      <span>{branch.address}, {branch.suburb} {branch.state} {branch.postcode}</span>
                    </div>

                    <div className="text-xs text-[#CED4DA] flex items-center gap-2 mb-3">
                      <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{branch.hours}</span>
                    </div>

                    {/* Services Chips */}
                    <div className="pt-3 border-t border-[#25292E] space-y-1">
                      <div className="text-[10px] uppercase font-bold text-[#868E96]">Services in Bay:</div>
                      <div className="flex flex-wrap gap-1">
                        {branch.services.slice(0, 3).map((srv, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-[#121416] text-[#CED4DA] px-2 py-0.5 rounded border border-[#2B3036]"
                          >
                            {srv}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#25292E] flex items-center justify-between">
                      <a
                        href={`tel:${branch.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs font-mono font-bold text-white hover:text-[#FF3B30] flex items-center gap-1.5"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#FF3B30]" />
                        <span>{branch.phone}</span>
                      </a>

                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(
                          `${branch.address}, ${branch.suburb} QLD`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs font-condensed font-bold uppercase text-[#FF3B30] hover:underline flex items-center gap-1"
                      >
                        <span>Directions</span>
                        <Navigation className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Interactive Styled Vector Map Display */}
            <div className="lg:col-span-7 bg-[#1C1F22] border border-[#2B3036] rounded-2xl overflow-hidden shadow-2xl sticky top-[150px]">
              <div className="p-4 bg-[#121416] border-b border-[#25292E] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-condensed font-bold text-sm text-white uppercase tracking-wider">
                    South-East Queensland Interactive Coverage
                  </span>
                </div>
                <span className="text-xs font-mono text-[#868E96]">
                  Lat {activeBranch.coordinates.lat}, Lng {activeBranch.coordinates.lng}
                </span>
              </div>

              {/* Vector SVG Schematic Map representation */}
              <div className="relative h-[450px] bg-[#16181B] overflow-hidden flex items-center justify-center p-6">
                {/* SVG Visual Map */}
                <svg
                  viewBox="0 0 600 450"
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Grid Lines */}
                  <defs>
                    <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#25292E" strokeWidth="0.8" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#mapGrid)" />

                  {/* Coastline / Moreton Bay Outline Schematic */}
                  <path
                    d="M 520 20 Q 480 120 490 200 Q 510 280 540 380 L 600 450 L 600 0 Z"
                    fill="#121416"
                    stroke="#2B3036"
                    strokeWidth="1.5"
                  />

                  {/* Major Highway Corridors */}
                  {/* M1 Pacific Motorway: North to South through Brisbane to Yatala */}
                  <path
                    d="M 280 40 L 300 140 L 320 210 L 360 320 L 390 430"
                    fill="none"
                    stroke="#343A40"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 280 40 L 300 140 L 320 210 L 360 320 L 390 430"
                    fill="none"
                    stroke="#D50000"
                    strokeWidth="2"
                    strokeDasharray="6,4"
                  />

                  {/* Ipswich Motorway */}
                  <path
                    d="M 120 300 L 220 260 L 300 230"
                    fill="none"
                    stroke="#343A40"
                    strokeWidth="4"
                  />

                  {/* Gateway Motorway */}
                  <path
                    d="M 290 120 Q 420 180 340 300"
                    fill="none"
                    stroke="#495057"
                    strokeWidth="3"
                  />

                  {/* Highway Labels */}
                  <text x="370" y="380" fill="#868E96" fontSize="10" fontFamily="monospace">M1 MOTORWAY</text>
                  <text x="140" y="290" fill="#868E96" fontSize="10" fontFamily="monospace">IPSWICH MWY</text>
                  <text x="390" y="190" fill="#868E96" fontSize="10" fontFamily="monospace">GATEWAY</text>

                  {/* BALD HILLS DEPOT PIN (North) */}
                  <g
                    className="cursor-pointer"
                    onClick={() => setSelectedBranchId('baldhills')}
                  >
                    <circle cx="280" cy="90" r="28" fill="#D50000" fillOpacity="0.15" />
                    <circle cx="280" cy="90" r="10" fill={selectedBranchId === 'baldhills' ? '#D50000' : '#495057'} stroke="#fff" strokeWidth="2" />
                    <text x="280" y="70" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
                      BALD HILLS
                    </text>
                    <text x="280" y="115" textAnchor="middle" fill="#CED4DA" fontSize="9" fontFamily="monospace">
                      Northside Depot
                    </text>
                  </g>

                  {/* ROCKLEA HQ PIN (Central) */}
                  <g
                    className="cursor-pointer"
                    onClick={() => setSelectedBranchId('rocklea')}
                  >
                    <circle cx="290" cy="230" r="38" fill="#D50000" fillOpacity="0.2" className="animate-pulse" />
                    <circle cx="290" cy="230" r="14" fill={selectedBranchId === 'rocklea' ? '#D50000' : '#495057'} stroke="#fff" strokeWidth="2.5" />
                    <text x="290" y="210" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold" fontFamily="sans-serif">
                      ROCKLEA HQ
                    </text>
                    <text x="290" y="260" textAnchor="middle" fill="#FF3B30" fontSize="10" fontWeight="bold" fontFamily="monospace">
                      Central Distribution Hub
                    </text>
                  </g>

                  {/* YATALA DEPOT PIN (South) */}
                  <g
                    className="cursor-pointer"
                    onClick={() => setSelectedBranchId('yatala')}
                  >
                    <circle cx="360" cy="340" r="28" fill="#D50000" fillOpacity="0.15" />
                    <circle cx="360" cy="340" r="10" fill={selectedBranchId === 'yatala' ? '#D50000' : '#495057'} stroke="#fff" strokeWidth="2" />
                    <text x="360" y="320" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
                      YATALA
                    </text>
                    <text x="360" y="365" textAnchor="middle" fill="#CED4DA" fontSize="9" fontFamily="monospace">
                      Industrial Logistics
                    </text>
                  </g>
                </svg>

                {/* Selected Hub Floating Information Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#1C1F22]/95 backdrop-blur-md border border-[#343A40] rounded-xl p-4 shadow-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-amber-400 font-condensed">
                        Currently Selected Depot
                      </div>
                      <h4 className="font-condensed font-bold text-lg text-white">
                        {activeBranch.name}
                      </h4>
                      <p className="text-xs text-[#868E96]">
                        {activeBranch.address}, {activeBranch.suburb} &bull; Ph: {activeBranch.phone}
                      </p>
                    </div>

                    <a
                      href={`tel:${activeBranch.phone}`}
                      className="bg-[#D50000] hover:bg-[#B30000] text-white px-4 py-2 rounded-lg text-xs font-condensed font-bold uppercase tracking-wider flex items-center gap-1.5 transition shrink-0"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Depot</span>
                    </a>
                  </div>
                </div>
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
