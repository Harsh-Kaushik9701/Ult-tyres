import React from 'react';
import Link from 'next/link';
import { Disc, Truck, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ReadyFitVisualExplainer() {
  return (
    <div className="bg-[#1C1F22] border border-[#2B3036] rounded-2xl p-6 sm:p-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Eliminate In-Bay Workshop Downtime</span>
          </div>
          <h3 className="font-condensed font-black text-2xl sm:text-3xl text-white tracking-wide uppercase">
            HOW ULTIMATE READYFIT WORKS
          </h3>
          <p className="text-[#868E96] text-sm mt-1 max-w-2xl">
            Pre-mounted, computer-balanced commercial tyre and rim assemblies delivered directly to your yard. No tyre machines, bead-blasting, or mounting hazards.
          </p>
        </div>

        <Link
          href="/fleet-services/ultimate-readyfit"
          className="inline-flex items-center gap-2 text-xs font-condensed font-bold uppercase tracking-wider text-[#FF3B30] hover:text-white transition"
        >
          <span>Explore ReadyFit Program</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {/* Step 1 */}
        <div className="bg-[#121416] border border-[#25292E] rounded-xl p-6 relative group hover:border-[#D50000]/50 transition">
          <div className="text-4xl font-condensed font-black text-[#343A40] group-hover:text-[#D50000] transition mb-3">
            01
          </div>
          <div className="w-12 h-12 rounded-lg bg-[#25292E] flex items-center justify-center text-white mb-4">
            <Disc className="w-6 h-6 text-[#FF3B30]" />
          </div>
          <h4 className="font-condensed font-bold text-lg text-white uppercase tracking-wide">
            Select Tyre + Rim Combo
          </h4>
          <p className="text-xs text-[#868E96] leading-relaxed mt-2">
            Choose your preferred Ralson, Blacklion, or Triangle pattern fitted to ADR-approved forged alloy or 10-stud steel rims.
          </p>
          <div className="mt-4 text-[11px] font-mono text-[#CED4DA] bg-[#25292E] px-2.5 py-1 rounded inline-block">
            Pre-inflated with Nitrogen
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-[#121416] border border-[#25292E] rounded-xl p-6 relative group hover:border-[#D50000]/50 transition">
          <div className="text-4xl font-condensed font-black text-[#343A40] group-hover:text-amber-500 transition mb-3">
            02
          </div>
          <div className="w-12 h-12 rounded-lg bg-[#25292E] flex items-center justify-center text-white mb-4">
            <Truck className="w-6 h-6 text-amber-400" />
          </div>
          <h4 className="font-condensed font-bold text-lg text-white uppercase tracking-wide">
            Scheduled Route Drop
          </h4>
          <p className="text-xs text-[#868E96] leading-relaxed mt-2">
            Delivered directly to your workshop tyre racks or trailer yard across Brisbane, Yatala, or Bald Hills by our dedicated logistics fleet.
          </p>
          <div className="mt-4 text-[11px] font-mono text-[#CED4DA] bg-[#25292E] px-2.5 py-1 rounded inline-block">
            Palletized & Wrapped
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-[#121416] border border-[#25292E] rounded-xl p-6 relative group hover:border-[#D50000]/50 transition">
          <div className="text-4xl font-condensed font-black text-[#343A40] group-hover:text-emerald-500 transition mb-3">
            03
          </div>
          <div className="w-12 h-12 rounded-lg bg-[#25292E] flex items-center justify-center text-white mb-4">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
          </div>
          <h4 className="font-condensed font-bold text-lg text-white uppercase tracking-wide">
            15-Minute Direct Bolt-On
          </h4>
          <p className="text-xs text-[#868E96] leading-relaxed mt-2">
            Your technicians simply torque onto the truck axle using standard rattle-guns. Old casings are picked up on the return leg for casing credit!
          </p>
          <div className="mt-4 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded inline-block border border-emerald-500/20">
            Zero Fitter Wait Time
          </div>
        </div>
      </div>
    </div>
  );
}
