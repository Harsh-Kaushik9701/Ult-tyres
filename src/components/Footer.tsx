import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Shield, ArrowUpRight } from 'lucide-react';
import { BRANCHES } from '@/data/mockData';

export default function Footer() {
  return (
    <footer className="bg-[#121416] text-[#CED4DA] border-t border-[#25292E] pt-16 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Trust & Value Band */}
        <div className="bg-[#1C1F22] border border-[#2B3036] rounded-xl p-8 mb-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#D50000]/10 border border-[#D50000]/30 flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6 text-[#FF3B30]" />
            </div>
            <div>
              <h4 className="font-condensed font-bold text-lg text-white tracking-wide">
                AUTHORISED RALSON DISTRIBUTOR
              </h4>
              <p className="text-xs text-[#868E96] mt-1 leading-relaxed">
                Direct factory supply chain with 100% multi-life casing guarantee and priority fleet allocations across Australia.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h4 className="font-condensed font-bold text-lg text-white tracking-wide">
                24/7 FLEET BREAKDOWN SERVICE
              </h4>
              <p className="text-xs text-[#868E96] mt-1 leading-relaxed">
                Rapid emergency call-outs with SMS live driver ETAs across greater Brisbane, Ipswich, Gold Coast, and Sunshine Coast.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h4 className="font-condensed font-bold text-lg text-white tracking-wide">
                FRICTIONLESS B2B RFQ PORTAL
              </h4>
              <p className="text-xs text-[#868E96] mt-1 leading-relaxed">
                Add to cart without public price lists. Instant quantity-band pricing quotes returned to your phone and email in minutes.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Physical Branches Grid */}
        <div className="mb-14">
          <h3 className="font-condensed font-bold text-xl text-white tracking-wide uppercase mb-6 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#D50000]" />
            <span>Our 3 South-East Queensland Branch Hubs</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BRANCHES.map((b) => (
              <div
                key={b.id}
                className="bg-[#1C1F22] border border-[#2B3036] rounded-lg p-5 hover:border-[#D50000]/50 transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-condensed font-bold text-base text-white">
                    {b.name}
                  </span>
                  {b.isHq && (
                    <span className="text-[10px] bg-[#D50000] text-white px-2 py-0.5 rounded font-bold uppercase">
                      HQ Central
                    </span>
                  )}
                </div>
                <div className="text-xs text-[#CED4DA] flex items-start gap-1.5 mb-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#6C757D] shrink-0 mt-0.5" />
                  <span>{b.address}, {b.suburb} {b.state} {b.postcode}</span>
                </div>
                <div className="text-xs text-[#CED4DA] flex items-center gap-1.5 mb-2">
                  <Phone className="w-3.5 h-3.5 text-[#6C757D] shrink-0" />
                  <a href={`tel:${b.phone}`} className="hover:text-[#FF3B30] transition font-semibold">
                    {b.phone}
                  </a>
                </div>
                <div className="text-[11px] text-[#868E96] border-t border-[#25292E] pt-2">
                  <strong className="text-[#ADB5BD]">Hours:</strong> {b.hours}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Links Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Col 1: About */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#D50000] rounded flex items-center justify-center font-condensed font-black text-xl text-white">
                UT
              </div>
              <span className="font-condensed font-black text-lg text-white tracking-wider">
                ULTIMATE TYRES
              </span>
            </div>
            <p className="text-xs text-[#868E96] leading-relaxed mb-4">
              Queensland’s trusted commercial truck & bus tyre wholesale distributor and heavy fleet alignment specialists. Over 15 years on the road.
            </p>
            <div className="text-xs text-[#ADB5BD]">
              <div>ABN: 84 629 114 902</div>
              <div>ACN: 629 114 902</div>
            </div>
          </div>

          {/* Col 2: Commercial Tyres */}
          <div>
            <h4 className="font-condensed font-bold text-sm text-white uppercase tracking-wider mb-4">
              Commercial Tyres
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/tyres/truck" className="hover:text-white transition">
                  Truck Tyres (Steer & Drive)
                </Link>
              </li>
              <li>
                <Link href="/tyres/bus" className="hover:text-white transition">
                  Bus & Coach Tyres
                </Link>
              </li>
              <li>
                <Link href="/tyres/ralson" className="hover:text-[#FF3B30] font-semibold transition text-white">
                  Ralson Tyres (Authorised)
                </Link>
              </li>
              <li>
                <Link href="/tyres/blacklion" className="hover:text-white transition">
                  Blacklion TBR Range
                </Link>
              </li>
              <li>
                <Link href="/tyres/triangle" className="hover:text-white transition">
                  Triangle Commercial Tyres
                </Link>
              </li>
              <li>
                <Link href="/tyres" className="text-[#FF3B30] hover:underline font-semibold transition">
                  Browse All Catalogue &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Fleet Services */}
          <div>
            <h4 className="font-condensed font-bold text-sm text-white uppercase tracking-wider mb-4">
              Fleet Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/fleet-services/wheel-alignment" className="hover:text-[#FF3B30] transition font-bold text-white">
                  Laser Wheel Alignment
                </Link>
              </li>
              <li>
                <Link href="/fleet-services/ultimate-readyfit" className="hover:text-amber-400 transition font-bold text-white">
                  Ultimate ReadyFit Assemblies
                </Link>
              </li>
              <li>
                <Link href="/fleet-services/truck-maintenance" className="hover:text-white transition">
                  Truck Fleet Maintenance
                </Link>
              </li>
              <li>
                <Link href="/fleet-services/wheel-balancing" className="hover:text-white transition">
                  Commercial Wheel Balancing
                </Link>
              </li>
              <li>
                <Link href="/fleet-services/nitrogen-tyre-inflation" className="hover:text-white transition">
                  Nitrogen Tyre Inflation
                </Link>
              </li>
              <li>
                <Link href="/fleet-services/u-wheels" className="hover:text-white transition">
                  U-Wheels (Alloy & Rims)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Dealer Hub */}
          <div>
            <h4 className="font-condensed font-bold text-sm text-white uppercase tracking-wider mb-4">
              Dealer Network
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/dealer/login" className="hover:text-[#FF3B30] transition font-semibold text-white">
                  Dealer Login
                </Link>
              </li>
              <li>
                <Link href="/join-us/become-a-dealer" className="hover:text-[#FF3B30] transition text-amber-400 font-bold">
                  Apply for Trade Account (ABN)
                </Link>
              </li>
              <li>
                <Link href="/portal" className="hover:text-white transition">
                  RFQ Ordering System
                </Link>
              </li>
              <li>
                <Link href="/portal/rapid-order" className="hover:text-white transition">
                  SKU-Wise Rapid Order Form
                </Link>
              </li>
              <li>
                <Link href="/network-map" className="hover:text-white transition">
                  Network Service Map
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Company & Legal */}
          <div>
            <h4 className="font-condensed font-bold text-sm text-white uppercase tracking-wider mb-4">
              Company & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about-us" className="hover:text-white transition">
                  About Ultimate Tyres
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-white transition">
                  News & Events
                </Link>
              </li>
              <li>
                <Link href="/join-us/careers" className="hover:text-white transition">
                  Careers & Fitters
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="hover:text-white transition">
                  Privacy Policy (AU 1988)
                </Link>
              </li>
              <li>
                <Link href="/legal/terms-of-trade" className="hover:text-white transition">
                  Terms of Trade & Credit
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip: Copyright & Tagline */}
        <div className="border-t border-[#25292E] pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#868E96] gap-4">
          <div>
            &copy; {new Date().getFullYear()} Ultimate Tyres Australia Pty Ltd. All rights reserved.
          </div>
          <div className="font-condensed tracking-widest text-[#CED4DA] uppercase">
            Your Fleet. Our Drive. &bull; Brisbane &bull; Yatala &bull; Bald Hills
          </div>
          <div className="flex items-center gap-4">
            <Link href="/legal/privacy" className="hover:underline">Privacy</Link>
            <Link href="/legal/terms-of-trade" className="hover:underline">Terms of Trade</Link>
            <a href="tel:1300110002" className="text-white hover:text-[#FF3B30] font-bold">1300 110 002</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
