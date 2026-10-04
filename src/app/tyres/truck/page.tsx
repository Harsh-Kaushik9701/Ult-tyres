'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Truck,
  Filter,
  Search,
  CheckCircle,
  Plus,
  ArrowRight,
  Shield,
  Layers,
  MapPin,
  Clock,
  Sparkles,
} from 'lucide-react';
import TopUtilityRibbon from '@/components/TopUtilityRibbon';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';
import AxlePositionDiagram from '@/components/AxlePositionDiagram';
import { SKUS, PATTERNS, BRANDS } from '@/data/mockData';
import { useApp } from '@/context/AppContext';
import { availabilityBand, totalStock, AVAILABILITY_LABEL, AVAILABILITY_CLASS } from '@/lib/availability';
import { AxlePosition, TyreApplication, ProductSku } from '@/types';

function TruckTyresContent() {
  const searchParams = useSearchParams();
  const { session, addToCart } = useApp();

  const initialSize = searchParams.get('size') || '';
  const initialPos = (searchParams.get('pos') as AxlePosition) || 'all';
  const initialBrand = searchParams.get('brand') || 'all';

  const [sizeInput, setSizeInput] = useState(initialSize);
  const [selectedPos, setSelectedPos] = useState<string>(initialPos);
  const [selectedBrand, setSelectedBrand] = useState<string>(initialBrand);
  const [selectedApp, setSelectedApp] = useState<string>('all');
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  // Clean and normalize size search string
  const normalizeSize = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '');

  const filteredSkus = useMemo(() => {
    return SKUS.filter((sku) => {
      // Must be truck category
      if (sku.category !== 'truck') return false;

      // Axle position filter
      if (selectedPos !== 'all') {
        if (selectedPos === 'all-position') {
          // match all
        } else if (sku.axlePosition !== selectedPos && sku.axlePosition !== 'all-position') {
          return false;
        }
      }

      // Brand filter
      if (selectedBrand !== 'all') {
        if (sku.brandName.toLowerCase() !== selectedBrand.toLowerCase()) return false;
      }

      // Application filter
      if (selectedApp !== 'all') {
        if (sku.application !== selectedApp) return false;
      }

      // Size free-text search (handles 11r22.5, 11r225, 295/80, 29580, etc.)
      if (sizeInput.trim()) {
        const queryNorm = normalizeSize(sizeInput);
        const skuSizeNorm = normalizeSize(sku.size);
        const skuFullNorm = normalizeSize(sku.fullSizeCode);
        const skuPatternNorm = normalizeSize(sku.patternCode);
        if (
          !skuSizeNorm.includes(queryNorm) &&
          !skuFullNorm.includes(queryNorm) &&
          !skuPatternNorm.includes(queryNorm)
        ) {
          return false;
        }
      }

      return true;
    });
  }, [sizeInput, selectedPos, selectedBrand, selectedApp]);

  const handleQtyChange = (skuId: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[skuId] || 4; // default axle set of 4
      const next = Math.max(1, current + delta);
      return { ...prev, [skuId]: next };
    });
  };

  const getPatternForSku = (patternId: string) => {
    return PATTERNS.find((p) => p.id === patternId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#121416]">
      <TopUtilityRibbon />
      <MainHeader />

      <main className="flex-1">
        {/* Header Hero */}
        <section className="bg-[#1C1F22] border-b border-[#25292E] py-10 px-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#D50000]/20 text-[#FF3B30] text-xs font-condensed font-bold uppercase tracking-wider mb-2">
                <Truck className="w-3.5 h-3.5" />
                <span>Heavy Commercial Truck Catalogue</span>
              </div>
              <h1 className="font-condensed font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
                TRUCK TYRES BY AXLE POSITION
              </h1>
              <p className="text-xs sm:text-sm text-[#868E96] mt-1 max-w-2xl">
                Browse our premium truck tyre range classified by Steer, Drive, and Trailer fitments. Real specs, dual load indexes, and live Brisbane warehouse stock.
              </p>
            </div>

            {/* Axle Position Quick Nav (Haulmax benchmark) */}
            <div className="flex items-center gap-1.5 bg-[#121416] p-1.5 rounded-lg border border-[#2B3036] overflow-x-auto">
              {[
                { id: 'all', label: 'All Positions' },
                { id: 'steer', label: 'Steer Axle' },
                { id: 'drive', label: 'Drive Axle' },
                { id: 'trailer', label: 'Trailer Axle' },
              ].map((pos) => (
                <button
                  key={pos.id}
                  onClick={() => setSelectedPos(pos.id)}
                  className={`px-3.5 py-1.5 rounded text-xs font-condensed font-bold uppercase tracking-wider whitespace-nowrap transition ${
                    selectedPos === pos.id
                      ? 'bg-[#D50000] text-white shadow'
                      : 'text-[#CED4DA] hover:text-white hover:bg-[#25292E]'
                  }`}
                >
                  {pos.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Filter Controls Bar */}
        <section className="bg-[#16181B] border-b border-[#25292E] py-4 px-4 sticky top-[80px] z-20 backdrop-blur-md">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {/* Size Search Input */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#6C757D] absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Size (e.g. 11R22.5)..."
                  value={sizeInput}
                  onChange={(e) => setSizeInput(e.target.value)}
                  className="bg-[#1C1F22] border border-[#343A40] text-white text-xs rounded-lg pl-8 pr-3 py-1.5 w-44 sm:w-56 focus:border-[#D50000] focus:outline-none font-mono"
                />
              </div>

              {/* Brand Filter */}
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="bg-[#1C1F22] border border-[#343A40] text-white text-xs rounded-lg px-3 py-1.5 focus:border-[#D50000] focus:outline-none"
              >
                <option value="all">All Brands</option>
                <option value="ralson">Ralson (Authorised)</option>
                <option value="blacklion">Blacklion</option>
                <option value="triangle">Triangle</option>
              </select>

              {/* Application Filter */}
              <select
                value={selectedApp}
                onChange={(e) => setSelectedApp(e.target.value)}
                className="bg-[#1C1F22] border border-[#343A40] text-white text-xs rounded-lg px-3 py-1.5 focus:border-[#D50000] focus:outline-none"
              >
                <option value="all">All Applications</option>
                <option value="long-haul">Long-Haul Highway</option>
                <option value="regional">Regional Distribution</option>
                <option value="mixed">Mixed On/Off-Road</option>
              </select>
            </div>

            <div className="text-xs text-[#868E96] font-mono">
              Showing <strong className="text-white">{filteredSkus.length}</strong> commercial SKUs
            </div>
          </div>
        </section>

        {/* Product SKU Listing Grid */}
        <section className="py-10 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSkus.map((sku) => {
                const pattern = getPatternForSku(sku.patternId);
                const currentQty = quantities[sku.id] || 4;
                const band = availabilityBand(totalStock(sku));

                return (
                  <div
                    key={sku.id}
                    className="bg-[#1C1F22] border border-[#2B3036] rounded-xl overflow-hidden flex flex-col justify-between hover:border-[#D50000]/60 transition shadow-lg group"
                  >
                    <div>
                      {/* Top Bar: Brand, Axle Badge, Pattern Code */}
                      <div className="p-4 pb-3 border-b border-[#25292E] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-condensed font-black text-base text-white">
                            {sku.brandName}
                          </span>
                          <span className="text-xs font-mono font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                            {sku.patternCode}
                          </span>
                        </div>

                        <span className="text-[10px] font-condensed font-bold uppercase bg-[#D50000] text-white px-2 py-0.5 rounded">
                          {sku.axlePosition}
                        </span>
                      </div>

                      {/* Main Size Code Display */}
                      <div className="p-4">
                        <div className="font-mono font-extrabold text-2xl text-white tracking-tight">
                          {sku.size}
                        </div>
                        <div className="text-xs font-mono text-[#868E96] mt-0.5">
                          {sku.fullSizeCode}
                        </div>

                        {/* Engineering Spec Badges */}
                        <div className="grid grid-cols-3 gap-2 mt-4 text-[11px] text-center">
                          <div className="bg-[#121416] p-2 rounded border border-[#2B3036]">
                            <div className="text-[#868E96]">Tread Depth</div>
                            <div className="font-mono font-bold text-white text-xs mt-0.5">
                              {sku.treadDepthMm} mm
                            </div>
                          </div>
                          <div className="bg-[#121416] p-2 rounded border border-[#2B3036]">
                            <div className="text-[#868E96]">Ply Rating</div>
                            <div className="font-mono font-bold text-white text-xs mt-0.5">
                              {sku.plyRating}
                            </div>
                          </div>
                          <div className="bg-[#121416] p-2 rounded border border-[#2B3036]">
                            <div className="text-[#868E96]">Load / Speed</div>
                            <div className="font-mono font-bold text-white text-xs mt-0.5">
                              {sku.loadIndexSingle}/{sku.loadIndexDual}{sku.speedSymbol}
                            </div>
                          </div>
                        </div>

                        {/* Secondary Specs */}
                        <div className="mt-3 text-[11px] text-[#CED4DA] space-y-1 bg-[#16181B] p-2.5 rounded border border-[#25292E]">
                          <div className="flex justify-between">
                            <span className="text-[#868E96]">Max Load (Single):</span>
                            <span className="font-mono font-semibold text-white">{sku.maxLoadSingleKg} kg</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#868E96]">Max Inflation:</span>
                            <span className="font-mono font-semibold text-white">{sku.maxInflationKpa} kPa</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#868E96]">Approved Rim:</span>
                            <span className="font-mono font-semibold text-white">{sku.approvedRim}&quot;</span>
                          </div>
                        </div>

                        {/* Availability band only; exact counts are never shown publicly */}
                        <div className="mt-4 pt-3 border-t border-[#25292E]">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-[#868E96] font-medium flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-[#D50000]" />
                              <span>Brisbane availability:</span>
                            </span>
                            <span className={`font-bold text-[11px] ${AVAILABILITY_CLASS[band]}`}>
                              {AVAILABILITY_LABEL[band]}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action: Quantity & Add to RFQ Cart */}
                    <div className="p-4 pt-0">
                      <div className="pt-3 border-t border-[#25292E] flex items-center gap-2">
                        {session ? (
                          <>
                            {/* Quantity Stepper (44px target) */}
                            <div className="flex items-center bg-[#121416] border border-[#343A40] rounded-lg">
                              <button
                                onClick={() => handleQtyChange(sku.id, -2)}
                                className="w-10 h-10 flex items-center justify-center text-white hover:bg-[#25292E] text-base font-bold transition"
                                title="Decrease quantity"
                              >
                                -
                              </button>
                              <span className="w-10 text-center font-mono font-bold text-white text-sm">
                                {currentQty}
                              </span>
                              <button
                                onClick={() => handleQtyChange(sku.id, 2)}
                                className="w-10 h-10 flex items-center justify-center text-white hover:bg-[#25292E] text-base font-bold transition"
                                title="Increase quantity"
                              >
                                +
                              </button>
                            </div>

                            {/* Add to RFQ Cart Button */}
                            <button
                              onClick={() => addToCart(sku, currentQty)}
                              className="flex-1 h-10 bg-[#D50000] hover:bg-[#B30000] text-white rounded-lg font-condensed font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition shadow"
                            >
                              <Plus className="w-4 h-4" />
                              <span>Add to RFQ Cart</span>
                            </button>
                          </>
                        ) : (
                          <Link
                            href="/dealer/login"
                            className="w-full h-10 bg-[#25292E] hover:bg-[#D50000] text-white rounded-lg font-condensed font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition"
                          >
                            <span>Dealer Login to Request Quote</span>
                          </Link>
                        )}
                      </div>

                      <div className="mt-2 text-center">
                        <Link
                          href={`/tyres/${sku.brandName.toLowerCase()}/${sku.patternCode.toLowerCase()}`}
                          className="text-[11px] font-condensed font-bold text-[#868E96] hover:text-white uppercase tracking-wider transition"
                        >
                          View Pattern Datasheet &amp; Tyre Geometry &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredSkus.length === 0 && (
              <div className="text-center py-16 bg-[#1C1F22] rounded-xl border border-[#2B3036]">
                <Truck className="w-12 h-12 text-[#6C757D] mx-auto mb-3" />
                <h3 className="font-condensed font-bold text-lg text-white">No truck tyres found</h3>
                <p className="text-xs text-[#868E96] mt-1">Try searching for &quot;11R22.5&quot; or resetting your axle position filter</p>
                <button
                  onClick={() => {
                    setSizeInput('');
                    setSelectedPos('all');
                    setSelectedBrand('all');
                    setSelectedApp('all');
                  }}
                  className="mt-4 bg-[#D50000] text-white px-4 py-1.5 rounded text-xs font-condensed font-bold uppercase"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Axle Fitment Schematic Section */}
        <section className="py-12 px-4 bg-[#16181B] border-t border-[#25292E]">
          <div className="max-w-7xl mx-auto">
            <AxlePositionDiagram
              selectedPosition={selectedPos === 'all' ? undefined : (selectedPos as AxlePosition)}
              interactive={true}
              onSelectPosition={(pos) => setSelectedPos(pos)}
            />
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}

export default function TruckTyresPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#121416] text-white p-8">Loading commercial truck tyre catalogue...</div>}>
      <TruckTyresContent />
    </Suspense>
  );
}
