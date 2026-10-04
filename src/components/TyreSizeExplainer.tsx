import React from 'react';

interface Props {
  sampleCode?: string;
  className?: string;
}

export default function TyreSizeExplainer({
  sampleCode = '295 / 80 R 22.5  152/148 M',
  className = '',
}: Props) {
  return (
    <div className={`bg-[#1C1F22] border border-[#2B3036] rounded-xl p-5 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-condensed font-bold text-lg text-white tracking-wide">
            COMMERCIAL TYRE SIZE ANATOMY
          </h4>
          <p className="text-xs text-[#868E96]">
            Understand how commercial tyre markings decode into fitment & axle capacities
          </p>
        </div>
        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#D50000]/20 text-[#FF3B30] border border-[#D50000]/30 font-bold">
          Technical Guide
        </span>
      </div>

      {/* Main Marked Display */}
      <div className="bg-[#121416] border border-[#25292E] rounded-lg p-4 mb-4 text-center overflow-x-auto">
        <div className="inline-flex items-baseline gap-2 font-mono text-xl sm:text-2xl font-bold tracking-wider text-white">
          <span className="text-[#FF3B30] bg-[#FF3B30]/10 px-2 py-1 rounded border border-[#FF3B30]/30">295</span>
          <span className="text-[#6C757D]">/</span>
          <span className="text-amber-400 bg-amber-400/10 px-2 py-1 rounded border border-amber-400/30">80</span>
          <span className="text-blue-400 bg-blue-400/10 px-2 py-1 rounded border border-blue-400/30">R</span>
          <span className="text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded border border-emerald-400/30">22.5</span>
          <span className="text-[#CED4DA] px-2 py-1">|</span>
          <span className="text-purple-400 bg-purple-400/10 px-2 py-1 rounded border border-purple-400/30">152/148</span>
          <span className="text-pink-400 bg-pink-400/10 px-2 py-1 rounded border border-pink-400/30">M</span>
        </div>
      </div>

      {/* Explanatory Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
        <div className="bg-[#25292E] p-2.5 rounded border border-[#343A40]">
          <div className="font-mono text-[#FF3B30] font-bold text-sm">295</div>
          <div className="font-semibold text-white mt-0.5">Section Width</div>
          <div className="text-[11px] text-[#868E96]">295 mm tyre width from sidewall to sidewall</div>
        </div>

        <div className="bg-[#25292E] p-2.5 rounded border border-[#343A40]">
          <div className="font-mono text-amber-400 font-bold text-sm">80</div>
          <div className="font-semibold text-white mt-0.5">Aspect Ratio</div>
          <div className="text-[11px] text-[#868E96]">Sidewall height is 80% of width (236 mm)</div>
        </div>

        <div className="bg-[#25292E] p-2.5 rounded border border-[#343A40]">
          <div className="font-mono text-blue-400 font-bold text-sm">R</div>
          <div className="font-semibold text-white mt-0.5">Construction</div>
          <div className="text-[11px] text-[#868E96]">Radial ply casing (steel wire belt package)</div>
        </div>

        <div className="bg-[#25292E] p-2.5 rounded border border-[#343A40]">
          <div className="font-mono text-emerald-400 font-bold text-sm">22.5&quot;</div>
          <div className="font-semibold text-white mt-0.5">Rim Diameter</div>
          <div className="text-[11px] text-[#868E96]">Fits standard 22.5 inch commercial truck wheel rims</div>
        </div>

        <div className="bg-[#25292E] p-2.5 rounded border border-[#343A40]">
          <div className="font-mono text-purple-400 font-bold text-sm">152/148</div>
          <div className="font-semibold text-white mt-0.5">Load Index</div>
          <div className="text-[11px] text-[#868E96]">Single: 3,550 kg / Dual: 3,150 kg per tyre</div>
        </div>

        <div className="bg-[#25292E] p-2.5 rounded border border-[#343A40]">
          <div className="font-mono text-pink-400 font-bold text-sm">M</div>
          <div className="font-semibold text-white mt-0.5">Speed Rating</div>
          <div className="text-[11px] text-[#868E96]">Max certified highway speed: 130 km/h</div>
        </div>
      </div>
    </div>
  );
}
