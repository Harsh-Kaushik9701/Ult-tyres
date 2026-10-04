'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  Filter,
  Plus,
  CheckCircle2,
  MapPin,
  Clock,
  Layers,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { SKUS, PATTERNS } from '@/data/mockData';
import { useApp } from '@/context/AppContext';
import { ProductSku, AxlePosition } from '@/types';

function CatalogueContent() {
  const searchParams = useSearchParams();
  const { session, addToCart } = useApp();

  const initialSize = searchParams.get('size') || '';

  const [searchSize, setSearchSize] = useState(initialSize);
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedPos, setSelectedPos] = useState('all');
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const filteredSkus = useMemo(() => {
    return SKUS.filter((sku) => {
      if (selectedBrand !== 'all' && sku.brandName.toLowerCase() !== selectedBrand.toLowerCase()) {
        return false;
      }
      if (selectedPos !== 'all' && sku.axlePosition !== selectedPos && sku.axlePosition !== 'all-position') {
        return false;
      }
      if (searchSize.trim()) {
        const q = searchSize.toLowerCase().replace(/[^a-z0-9]/g, '');
        const sNorm = sku.size.toLowerCase().replace(/[^a-z0-9]/g, '');
        const pNorm = sku.patternCode.toLowerCase();
        if (!sNorm.includes(q) && !pNorm.includes(q)) return false;
      }
      return true;
    });
  }, [searchSize, selectedBrand, selectedPos]);

  const handleQtyChange = (skuId: string, delta: number) => {
    setQuantities((prev) => {
      const cur = prev[skuId] || 4;
      return { ...prev, [skuId]: Math.max(1, cur + delta) };
    });
  };

  return (
    <div className="space-y-6">
      {/* Header & Filter Controls */}
      <div className="bg-white border border-[#DEE2E6] rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="font-condensed font-black text-2xl sm:text-3xl text-[#1C1F22] uppercase">
              COMMERCIAL TYRE CATALOGUE (RFQ PRICING)
            </h1>
            <p className="text-xs text-[#6C757D] mt-1">
              Dense commercial specifications &amp; live Queensland warehouse stock. Add sizes to your RFQ cart for tiered wholesale quote submission.
            </p>
          </div>

          <div className="text-xs font-mono text-[#6C757D]">
            Showing <strong className="text-[#1C1F22]">{filteredSkus.length}</strong> active SKUs
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-[#6C757D] absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Filter by size or pattern (e.g. 11R22.5, RDC55)..."
              value={searchSize}
              onChange={(e) => setSearchSize(e.target.value)}
              className="w-full bg-[#F8F9FA] border border-[#CED4DA] rounded-lg pl-8 pr-3 py-2 text-xs font-mono text-[#1C1F22] focus:border-[#D50000] focus:outline-none"
            />
          </div>

          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="bg-[#F8F9FA] border border-[#CED4DA] rounded-lg px-3 py-2 text-xs text-[#1C1F22] focus:border-[#D50000] focus:outline-none"
          >
            <option value="all">All Brands (Ralson, Blacklion, Triangle)</option>
            <option value="ralson">Ralson (Authorised AU)</option>
            <option value="blacklion">Blacklion</option>
            <option value="triangle">Triangle</option>
          </select>

          <select
            value={selectedPos}
            onChange={(e) => setSelectedPos(e.target.value)}
            className="bg-[#F8F9FA] border border-[#CED4DA] rounded-lg px-3 py-2 text-xs text-[#1C1F22] focus:border-[#D50000] focus:outline-none"
          >
            <option value="all">All Axle Positions</option>
            <option value="steer">Steer Axle</option>
            <option value="drive">Drive Axle</option>
            <option value="trailer">Trailer Axle</option>
          </select>
        </div>
      </div>

      {/* Dense Table View for Desktop (Blueprint Section 9, Page 20: 40px rows, sticky headers) */}
      <div className="hidden lg:block bg-white border border-[#DEE2E6] rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-[#1C1F22] text-[#CED4DA] font-condensed font-bold uppercase sticky top-0 z-10">
              <tr className="h-10">
                <th className="py-2 px-4">Brand / Pattern</th>
                <th className="py-2 px-4">Size Code</th>
                <th className="py-2 px-3">Position</th>
                <th className="py-2 px-3">Depth</th>
                <th className="py-2 px-3">Load/Speed</th>
                <th className="py-2 px-4">Brisbane Depot Stock Bands</th>
                <th className="py-2 px-4 text-center">Qty</th>
                <th className="py-2 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9ECEF] text-[#1C1F22]">
              {filteredSkus.map((sku) => {
                const qty = quantities[sku.id] || 4;
                const totalStock =
                  sku.inStockBranches.rocklea +
                  sku.inStockBranches.yatala +
                  sku.inStockBranches.baldhills;

                return (
                  <tr key={sku.id} className="h-14 hover:bg-[#F8F9FA] transition">
                    <td className="py-2 px-4">
                      <div className="font-condensed font-bold text-sm text-[#1C1F22]">
                        {sku.brandName} &bull; {sku.patternCode}
                      </div>
                      <div className="text-[11px] text-[#6C757D] truncate max-w-[180px]">
                        {sku.category.toUpperCase()} &bull; {sku.application}
                      </div>
                    </td>

                    <td className="py-2 px-4">
                      <div className="font-mono font-bold text-sm text-[#D50000]">
                        {sku.size}
                      </div>
                      <div className="font-mono text-[10px] text-[#6C757D]">
                        {sku.fullSizeCode}
                      </div>
                    </td>

                    <td className="py-2 px-3">
                      <span className="font-condensed font-bold uppercase text-[10px] bg-[#E9ECEF] text-[#495057] px-2 py-0.5 rounded">
                        {sku.axlePosition}
                      </span>
                    </td>

                    <td className="py-2 px-3 font-mono font-semibold">
                      {sku.treadDepthMm} mm
                    </td>

                    <td className="py-2 px-3 font-mono text-[11px]">
                      {sku.loadIndexSingle}/{sku.loadIndexDual}{sku.speedSymbol}
                    </td>

                    <td className="py-2 px-4">
                      <div className="flex items-center gap-1.5 text-[11px] font-mono">
                        <span className="bg-emerald-50 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                          Rocklea: {sku.inStockBranches.rocklea}
                        </span>
                        <span className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded">
                          Yatala: {sku.inStockBranches.yatala}
                        </span>
                        <span className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded">
                          Bald Hills: {sku.inStockBranches.baldhills}
                        </span>
                      </div>
                      <div className="text-[10px] text-[#868E96] mt-0.5">
                        Inbound: +{sku.incomingQty} on {sku.incomingEta}
                      </div>
                    </td>

                    <td className="py-2 px-4">
                      <div className="flex items-center justify-center bg-[#F8F9FA] border border-[#CED4DA] rounded-lg w-24 mx-auto">
                        <button
                          onClick={() => handleQtyChange(sku.id, -2)}
                          className="w-7 h-7 flex items-center justify-center text-[#495057] hover:bg-[#E9ECEF] font-bold text-sm"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-mono font-bold text-xs text-[#1C1F22]">
                          {qty}
                        </span>
                        <button
                          onClick={() => handleQtyChange(sku.id, 2)}
                          className="w-7 h-7 flex items-center justify-center text-[#495057] hover:bg-[#E9ECEF] font-bold text-sm"
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td className="py-2 px-4 text-right">
                      <button
                        onClick={() => addToCart(sku, qty)}
                        className="bg-[#D50000] hover:bg-[#B30000] text-white px-3.5 py-1.5 rounded-lg font-condensed font-bold text-xs uppercase tracking-wider transition inline-flex items-center gap-1 shadow-sm"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cards View for Mobile / Tablet */}
      <div className="lg:hidden space-y-4">
        {filteredSkus.map((sku) => {
          const qty = quantities[sku.id] || 4;
          return (
            <div
              key={sku.id}
              className="bg-white border border-[#DEE2E6] rounded-xl p-4 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-condensed font-bold text-base text-[#1C1F22]">
                    {sku.brandName} &bull; {sku.patternCode}
                  </span>
                  <div className="font-mono font-bold text-base text-[#D50000]">{sku.size}</div>
                </div>
                <span className="text-[10px] font-condensed font-bold uppercase bg-[#E9ECEF] text-[#495057] px-2 py-0.5 rounded">
                  {sku.axlePosition}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-[11px] text-center font-mono bg-[#F8F9FA] p-2 rounded">
                <div>
                  <span className="text-[#868E96] block text-[9px]">Tread</span>
                  <strong>{sku.treadDepthMm}mm</strong>
                </div>
                <div>
                  <span className="text-[#868E96] block text-[9px]">Load/Speed</span>
                  <strong>{sku.loadIndexSingle}/{sku.loadIndexDual}{sku.speedSymbol}</strong>
                </div>
                <div>
                  <span className="text-[#868E96] block text-[9px]">Rocklea</span>
                  <strong className="text-emerald-700">{sku.inStockBranches.rocklea} in stock</strong>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <div className="flex items-center bg-[#F8F9FA] border border-[#CED4DA] rounded-lg">
                  <button
                    onClick={() => handleQtyChange(sku.id, -2)}
                    className="w-9 h-9 flex items-center justify-center font-bold text-base"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-mono font-bold text-xs">{qty}</span>
                  <button
                    onClick={() => handleQtyChange(sku.id, 2)}
                    className="w-9 h-9 flex items-center justify-center font-bold text-base"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => addToCart(sku, qty)}
                  className="flex-1 h-9 bg-[#D50000] text-white rounded-lg font-condensed font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add {qty} to Cart</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function DealerCataloguePage() {
  return (
    <Suspense fallback={<div className="p-8 text-[#1C1F22]">Loading commercial catalogue...</div>}>
      <CatalogueContent />
    </Suspense>
  );
}
