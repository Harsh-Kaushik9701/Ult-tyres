'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import {
  Shield,
  Truck,
  CheckCircle2,
  Plus,
  ArrowRight,
  FileText,
  MapPin,
  Clock,
  ChevronRight,
  Layers,
  Sparkles,
} from 'lucide-react';
import TopUtilityRibbon from '@/components/TopUtilityRibbon';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';
import AxlePositionDiagram from '@/components/AxlePositionDiagram';
import TyreSizeExplainer from '@/components/TyreSizeExplainer';
import { PATTERNS, BRANDS, SKUS } from '@/data/mockData';
import { useApp } from '@/context/AppContext';
import { ProductSku } from '@/types';

export default function PatternDetailPage() {
  const params = useParams();
  const brandSlug = (params?.brand as string)?.toLowerCase();
  const patternParam = (params?.pattern as string)?.toLowerCase();

  const { session, addToCart } = useApp();

  const pattern = PATTERNS.find(
    (p) =>
      p.brandId.toLowerCase() === brandSlug &&
      (p.code.toLowerCase() === patternParam || p.id.toLowerCase() === patternParam)
  );

  if (!pattern) return notFound();

  const brand = BRANDS.find((b) => b.id === pattern.brandId);

  // Selected SKU size in pattern
  const [selectedSkuId, setSelectedSkuId] = useState<string>(
    pattern.skus[0]?.id || ''
  );
  const activeSku = pattern.skus.find((s) => s.id === selectedSkuId) || pattern.skus[0];

  const [quantity, setQuantity] = useState(4); // default 4

  // Cross-brand alternatives at same position/size
  const alternatives = SKUS.filter(
    (s) =>
      s.id !== activeSku?.id &&
      s.brandName.toLowerCase() !== brandSlug &&
      (s.axlePosition === activeSku?.axlePosition || s.axlePosition === 'all-position') &&
      s.size === activeSku?.size
  ).slice(0, 2);

  const totalStock = activeSku
    ? activeSku.inStockBranches.rocklea +
      activeSku.inStockBranches.yatala +
      activeSku.inStockBranches.baldhills
    : 0;

  return (
    <div className="min-h-screen flex flex-col bg-[#121416]">
      <TopUtilityRibbon />
      <MainHeader />

      <main className="flex-1">
        {/* Breadcrumb strip */}
        <div className="bg-[#1C1F22] border-b border-[#25292E] py-3 px-4 text-xs text-[#868E96]">
          <div className="max-w-7xl mx-auto flex items-center gap-1.5 flex-wrap">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#495057]" />
            <Link href="/tyres" className="hover:text-white transition">Tyres</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#495057]" />
            <Link href={`/tyres/${brand?.slug}`} className="hover:text-white transition">
              {brand?.name}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#495057]" />
            <span className="text-white font-bold">{pattern.code}</span>
          </div>
        </div>

        {/* Main Product Showcase Header */}
        <section className="py-12 px-4 bg-[#16181B] border-b border-[#25292E]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Imagery Gallery */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-[#1C1F22] border border-[#2B3036] rounded-2xl overflow-hidden relative group">
                <div
                  className="h-80 sm:h-96 w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${pattern.heroImage})` }}
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {pattern.positions.map((pos) => (
                    <span
                      key={pos}
                      className="bg-[#D50000] text-white text-xs font-condensed font-bold uppercase px-3 py-1 rounded shadow"
                    >
                      {pos} Axle
                    </span>
                  ))}
                  {brand?.isAuthorisedDistributor && (
                    <span className="bg-[#121416]/90 border border-[#D50000] text-[#FF3B30] text-xs font-condensed font-bold uppercase px-2.5 py-1 rounded">
                      Authorised AU
                    </span>
                  )}
                </div>

                <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white font-mono text-xs px-3 py-1.5 rounded border border-[#343A40]">
                  Deep Original Tread: <strong>{pattern.treadDepthMm} mm</strong>
                </div>
              </div>

              {/* Thumbnail strip */}
              <div className="grid grid-cols-3 gap-3">
                <div className="h-24 rounded-lg bg-cover bg-center border-2 border-[#D50000] cursor-pointer" style={{ backgroundImage: `url(${pattern.heroImage})` }} />
                <div className="h-24 rounded-lg bg-cover bg-center border border-[#343A40] cursor-pointer opacity-80 hover:opacity-100 transition" style={{ backgroundImage: `url(${pattern.treadImage})` }} />
                <div className="h-24 rounded-lg bg-[#1C1F22] border border-[#343A40] p-3 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#D50000] transition">
                  <FileText className="w-5 h-5 text-[#FF3B30] mb-1" />
                  <span className="text-[10px] font-condensed font-bold uppercase text-[#CED4DA]">Download Tech Datasheet (PDF)</span>
                </div>
              </div>
            </div>

            {/* Right: Specs, Size Picker & RFQ Add */}
            <div className="lg:col-span-6 bg-[#1C1F22] border border-[#2B3036] rounded-2xl p-6 sm:p-8 shadow-2xl">
              <div className="text-xs font-mono font-bold text-amber-400 uppercase">
                {brand?.name} Commercial TBR
              </div>
              <h1 className="font-condensed font-black text-3xl sm:text-4xl text-white uppercase mt-1">
                {pattern.name}
              </h1>

              {/* Sidewall Marking Banner */}
              <div className="mt-4 p-3 bg-[#121416] rounded-lg border border-[#2B3036] flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold text-[#868E96] uppercase font-condensed">Sidewall Designation</div>
                  <div className="font-mono font-bold text-lg text-white">
                    {activeSku.fullSizeCode}
                  </div>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 font-bold">
                  {activeSku.tubeless} Tubeless
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#868E96] leading-relaxed mt-4">
                {pattern.description}
              </p>

              {/* Size Selector Tabs */}
              <div className="mt-6 pt-4 border-t border-[#25292E]">
                <label className="block text-xs uppercase font-condensed font-bold text-[#CED4DA] mb-2">
                  Select Tyre Size (SKU)
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {pattern.skus.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSkuId(s.id)}
                      className={`px-4 py-2 rounded-lg font-mono text-xs font-bold transition ${
                        selectedSkuId === s.id
                          ? 'bg-[#D50000] text-white shadow-md'
                          : 'bg-[#121416] text-[#CED4DA] hover:bg-[#25292E] border border-[#343A40]'
                      }`}
                    >
                      {s.size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Branch Availability Bands */}
              <div className="mt-6 p-4 bg-[#121416] rounded-xl border border-[#2B3036]">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-[#868E96] font-medium flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#D50000]" />
                    <span>Brisbane Warehouse Availability:</span>
                  </span>
                  <span className="text-emerald-400 font-bold">
                    {totalStock > 0 ? `In Stock (${totalStock} units)` : 'Allocated / On Order'}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                  <div className="bg-[#1C1F22] p-2 rounded border border-[#25292E]">
                    <div className="text-[10px] text-[#868E96]">Rocklea HQ</div>
                    <div className="font-bold text-white mt-0.5">{activeSku.inStockBranches.rocklea} in stock</div>
                  </div>
                  <div className="bg-[#1C1F22] p-2 rounded border border-[#25292E]">
                    <div className="text-[10px] text-[#868E96]">Yatala Depot</div>
                    <div className="font-bold text-white mt-0.5">{activeSku.inStockBranches.yatala} in stock</div>
                  </div>
                  <div className="bg-[#1C1F22] p-2 rounded border border-[#25292E]">
                    <div className="text-[10px] text-[#868E96]">Bald Hills</div>
                    <div className="font-bold text-white mt-0.5">{activeSku.inStockBranches.baldhills} in stock</div>
                  </div>
                </div>

                <div className="mt-2.5 text-[11px] text-[#868E96] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Incoming replenishment: +{activeSku.incomingQty} arriving {activeSku.incomingEta}</span>
                </div>
              </div>

              {/* Quantity Stepper & Add to RFQ Cart */}
              <div className="mt-6 pt-4 border-t border-[#25292E]">
                <div className="text-xs text-[#868E96] mb-2 flex items-center justify-between">
                  <span>Order Quantity (Units):</span>
                  <span className="text-[11px] text-amber-400 font-medium">
                    Quantity-band wholesale discount applies on quote
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Stepper with 44px touch targets */}
                  <div className="flex items-center bg-[#121416] border border-[#343A40] rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 2))}
                      className="w-12 h-12 flex items-center justify-center text-white hover:bg-[#25292E] text-lg font-bold transition"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-mono font-bold text-white text-base">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 2)}
                      className="w-12 h-12 flex items-center justify-center text-white hover:bg-[#25292E] text-lg font-bold transition"
                    >
                      +
                    </button>
                  </div>

                  {session ? (
                    <button
                      onClick={() => addToCart(activeSku, quantity)}
                      className="flex-1 h-12 bg-[#D50000] hover:bg-[#B30000] text-white rounded-lg font-condensed font-bold text-base uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-lg shadow-red-950"
                    >
                      <Plus className="w-5 h-5" />
                      <span>Add {quantity} Tyres to RFQ Cart</span>
                    </button>
                  ) : (
                    <Link
                      href="/dealer/login"
                      className="flex-1 h-12 bg-[#25292E] hover:bg-[#D50000] text-white rounded-lg font-condensed font-bold text-sm uppercase tracking-wider flex items-center justify-center transition border border-[#343A40]"
                    >
                      <span>Dealer Login for Pricing &amp; RFQ</span>
                    </Link>
                  )}
                </div>

                {/* Quick Presets for Truck Sets */}
                <div className="mt-3 flex items-center gap-2 text-xs">
                  <span className="text-[#868E96]">Axle Quick Picks:</span>
                  {[2, 4, 8, 12].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setQuantity(preset)}
                      className="font-mono text-[11px] bg-[#121416] hover:bg-[#25292E] text-[#CED4DA] px-2.5 py-1 rounded border border-[#2B3036] transition"
                    >
                      {preset} units
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Engineering Spec Table Section */}
        <section className="py-12 px-4 bg-[#121416]">
          <div className="max-w-7xl mx-auto">
            <h3 className="font-condensed font-black text-2xl text-white uppercase tracking-wide mb-6">
              Complete Engineering Datasheet: {activeSku.size}
            </h3>

            <div className="bg-[#1C1F22] border border-[#2B3036] rounded-xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#121416] text-[#868E96] font-condensed font-bold uppercase border-b border-[#25292E]">
                    <tr>
                      <th className="py-3 px-4">Tyre Dimension</th>
                      <th className="py-3 px-4">Load / Speed</th>
                      <th className="py-3 px-4">Ply Rating</th>
                      <th className="py-3 px-4">Tread Depth</th>
                      <th className="py-3 px-4">Approved Rim</th>
                      <th className="py-3 px-4">Max Load (Single/Dual)</th>
                      <th className="py-3 px-4">Inflation</th>
                      <th className="py-3 px-4">Net Weight</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#25292E] font-mono text-white">
                    <tr className="bg-[#1C1F22]">
                      <td className="py-3.5 px-4 font-bold text-[#FF3B30]">{activeSku.size}</td>
                      <td className="py-3.5 px-4">{activeSku.loadIndexSingle}/{activeSku.loadIndexDual}{activeSku.speedSymbol}</td>
                      <td className="py-3.5 px-4">{activeSku.plyRating}</td>
                      <td className="py-3.5 px-4">{activeSku.treadDepthMm} mm</td>
                      <td className="py-3.5 px-4">{activeSku.approvedRim}&quot;</td>
                      <td className="py-3.5 px-4">{activeSku.maxLoadSingleKg} / {activeSku.maxLoadDualKg} kg</td>
                      <td className="py-3.5 px-4">{activeSku.maxInflationKpa} kPa</td>
                      <td className="py-3.5 px-4">{activeSku.weightKg} kg</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Axle Diagram & Tyre Size Explainer */}
        <section className="py-12 px-4 bg-[#16181B] border-t border-b border-[#25292E]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AxlePositionDiagram selectedPosition={activeSku.axlePosition} />
            <TyreSizeExplainer sampleCode={activeSku.fullSizeCode} />
          </div>
        </section>

        {/* Cross-Brand Alternatives Section (Blueprint Page 17, 22) */}
        {alternatives.length > 0 && (
          <section className="py-14 px-4 bg-[#121416]">
            <div className="max-w-7xl mx-auto">
              <div className="mb-6">
                <span className="text-xs uppercase font-condensed font-bold text-amber-400 tracking-wider">
                  MATCHING SPEC COMPARISON
                </span>
                <h3 className="font-condensed font-black text-2xl text-white uppercase mt-0.5">
                  Direct Cross-Brand Alternatives at {activeSku.size}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {alternatives.map((alt) => (
                  <div
                    key={alt.id}
                    className="bg-[#1C1F22] border border-[#2B3036] rounded-xl p-5 flex items-center justify-between gap-4 hover:border-[#D50000] transition"
                  >
                    <div>
                      <div className="text-[10px] font-bold text-[#868E96] uppercase font-condensed">
                        {alt.brandName} &bull; {alt.patternCode}
                      </div>
                      <h4 className="font-condensed font-bold text-lg text-white mt-0.5">
                        {alt.fullSizeCode}
                      </h4>
                      <div className="text-xs font-mono text-[#CED4DA] mt-1">
                        Tread: {alt.treadDepthMm} mm &bull; Axle: {alt.axlePosition}
                      </div>
                    </div>

                    <Link
                      href={`/tyres/${alt.brandName.toLowerCase()}/${alt.patternCode.toLowerCase()}`}
                      className="bg-[#25292E] hover:bg-[#D50000] text-white px-4 py-2 rounded text-xs font-condensed font-bold uppercase transition whitespace-nowrap"
                    >
                      Compare
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
