'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChevronDown,
  Menu,
  X,
  Truck,
  Disc,
  Wrench,
  Shield,
  Compass,
  Zap,
  MapPin,
  CircleDot,
  Gauge,
  Sliders,
  Wind,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';
import { FLEET_SERVICES } from '@/data/mockData';

export default function MainHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tyresDropdownOpen, setTyresDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [joinDropdownOpen, setJoinDropdownOpen] = useState(false);

  const isActive = (path: string) => pathname === path || pathname?.startsWith(`${path}/`);

  return (
    <header className="bg-[#1C1F22] border-b border-[#2B3036] sticky top-[37px] z-30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand Logo & Evolved UT Monogram Mark */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-[#D50000] to-[#990000] rounded flex items-center justify-center font-condensed font-extrabold text-2xl tracking-tighter text-white shadow-md border border-[#FF3B30]/30 group-hover:scale-105 transition transform">
            UT
          </div>
          <div className="flex flex-col">
            <span className="font-condensed font-extrabold text-xl tracking-wider text-white leading-none group-hover:text-[#FF3B30] transition">
              ULTIMATE TYRES
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#CED4DA] mt-0.5">
              Your Fleet. Our Drive.
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 font-condensed tracking-wide text-sm font-semibold text-[#CED4DA]">
          {/* Home */}
          <Link
            href="/"
            className={`px-3 py-2 rounded hover:text-white hover:bg-[#25292E] transition ${
              pathname === '/' ? 'text-[#FF3B30] bg-[#25292E]' : ''
            }`}
          >
            HOME
          </Link>

          {/* About Us */}
          <Link
            href="/about-us"
            className={`px-3 py-2 rounded hover:text-white hover:bg-[#25292E] transition ${
              isActive('/about-us') ? 'text-[#FF3B30] bg-[#25292E]' : ''
            }`}
          >
            ABOUT US
          </Link>

          {/* Products - Tyres Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setTyresDropdownOpen(true)}
            onMouseLeave={() => setTyresDropdownOpen(false)}
          >
            <Link
              href="/tyres"
              className={`px-3 py-2 rounded flex items-center gap-1 hover:text-white hover:bg-[#25292E] transition ${
                isActive('/tyres') ? 'text-[#FF3B30] bg-[#25292E]' : ''
              }`}
            >
              <span>PRODUCTS – TYRES</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#6C757D]" />
            </Link>

            {tyresDropdownOpen && (
              <div className="absolute top-full left-0 w-72 bg-[#1C1F22] border border-[#343A40] rounded-b shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="px-4 py-2 border-b border-[#25292E]">
                  <div className="text-[11px] uppercase font-bold text-[#6C757D] tracking-wider">
                    Commercial Ranges
                  </div>
                </div>
                <Link
                  href="/tyres"
                  className="px-4 py-2 text-white hover:bg-[#25292E] hover:text-[#FF3B30] flex items-center justify-between text-xs transition"
                >
                  <span className="font-bold">Catalogue Overview</span>
                  <ArrowRight className="w-3 h-3 text-[#6C757D]" />
                </Link>
                <Link
                  href="/tyres/truck"
                  className="px-4 py-2 text-[#CED4DA] hover:bg-[#25292E] hover:text-white flex items-center gap-2 text-xs transition"
                >
                  <Truck className="w-4 h-4 text-[#D50000]" />
                  <span>Truck Tyres (Steer, Drive, Trailer)</span>
                </Link>
                <Link
                  href="/tyres/bus"
                  className="px-4 py-2 text-[#CED4DA] hover:bg-[#25292E] hover:text-white flex items-center gap-2 text-xs transition"
                >
                  <Disc className="w-4 h-4 text-amber-500" />
                  <span>Bus & Transit Coach Tyres</span>
                </Link>
                <div className="my-1 border-t border-[#25292E]"></div>
                <div className="px-4 py-1.5 text-[11px] uppercase font-bold text-[#6C757D] tracking-wider">
                  Flagship Brands
                </div>
                <Link
                  href="/tyres/ralson"
                  className="px-4 py-2 text-white hover:bg-[#25292E] flex items-center justify-between text-xs transition group"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#D50000]"></span>
                    <strong className="group-hover:text-[#FF3B30]">Ralson Tyres</strong>
                  </div>
                  <span className="text-[10px] bg-[#D50000]/20 text-[#FF3B30] px-1.5 py-0.5 rounded font-mono font-semibold">
                    Authorised Dist.
                  </span>
                </Link>
                <Link
                  href="/tyres/blacklion"
                  className="px-4 py-2 text-[#CED4DA] hover:bg-[#25292E] hover:text-white flex items-center gap-2 text-xs transition"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span>Blacklion Commercial</span>
                </Link>
                <Link
                  href="/tyres/triangle"
                  className="px-4 py-2 text-[#CED4DA] hover:bg-[#25292E] hover:text-white flex items-center gap-2 text-xs transition"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span>Triangle Fleet Range</span>
                </Link>
              </div>
            )}
          </div>

          {/* Fleet Services 2-Column Mega-Menu (9 Services) */}
          <div
            className="relative"
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
          >
            <Link
              href="/fleet-services"
              className={`px-3 py-2 rounded flex items-center gap-1 hover:text-white hover:bg-[#25292E] transition ${
                isActive('/fleet-services') ? 'text-[#FF3B30] bg-[#25292E]' : ''
              }`}
            >
              <span>FLEET SERVICES</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#6C757D]" />
            </Link>

            {servicesDropdownOpen && (
              <div className="absolute top-full -left-20 w-[600px] bg-[#1C1F22] border border-[#343A40] rounded-b shadow-2xl p-4 z-50 grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="col-span-2 pb-2 mb-1 border-b border-[#25292E] flex items-center justify-between">
                  <span className="text-xs uppercase font-bold text-[#ADB5BD] tracking-wider">
                    Commercial Workshop & Roadside Fleet Solutions
                  </span>
                  <Link
                    href="/fleet-services"
                    className="text-xs text-[#FF3B30] hover:underline flex items-center gap-1 font-semibold"
                  >
                    View All 9 Services &rarr;
                  </Link>
                </div>

                {/* Service 1: Truck Maintenance */}
                <Link
                  href="/fleet-services/truck-maintenance"
                  className="p-2.5 rounded hover:bg-[#25292E] transition group flex items-start gap-2.5"
                >
                  <Wrench className="w-4 h-4 text-[#FF3B30] mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-[#FF3B30] transition">
                      Truck Maintenance
                    </div>
                    <div className="text-[11px] text-[#868E96] leading-tight mt-0.5">
                      Preventative fleet inspections & scheduled checks
                    </div>
                  </div>
                </Link>

                {/* Service 2: Wheel Alignment (Detailed Straight Wheels benchmark) */}
                <Link
                  href="/fleet-services/wheel-alignment"
                  className="p-2.5 rounded bg-[#25292E]/60 hover:bg-[#25292E] border border-[#343A40] transition group flex items-start gap-2.5"
                >
                  <Compass className="w-4 h-4 text-[#D50000] mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-[#FF3B30] transition flex items-center gap-1.5">
                      <span>Wheel Alignment</span>
                      <span className="text-[9px] bg-[#D50000] text-white px-1 rounded font-bold">Featured</span>
                    </div>
                    <div className="text-[11px] text-[#868E96] leading-tight mt-0.5">
                      Multi-axle laser precision, saves up to 30% wear
                    </div>
                  </div>
                </Link>

                {/* Service 3: Wheel Balancing */}
                <Link
                  href="/fleet-services/wheel-balancing"
                  className="p-2.5 rounded hover:bg-[#25292E] transition group flex items-start gap-2.5"
                >
                  <Gauge className="w-4 h-4 text-[#CED4DA] mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-[#FF3B30] transition">
                      Wheel Balancing
                    </div>
                    <div className="text-[11px] text-[#868E96] leading-tight mt-0.5">
                      Dynamic computer balancing for prime movers & buses
                    </div>
                  </div>
                </Link>

                {/* Service 4: Steering & Suspension */}
                <Link
                  href="/fleet-services/steering-suspension-repair"
                  className="p-2.5 rounded hover:bg-[#25292E] transition group flex items-start gap-2.5"
                >
                  <Sliders className="w-4 h-4 text-[#CED4DA] mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-[#FF3B30] transition">
                      Steering & Suspension
                    </div>
                    <div className="text-[11px] text-[#868E96] leading-tight mt-0.5">
                      Kingpin overhauls, tie-rods, and heavy air bags
                    </div>
                  </div>
                </Link>

                {/* Service 5: Nitrogen Tyre Inflation */}
                <Link
                  href="/fleet-services/nitrogen-tyre-inflation"
                  className="p-2.5 rounded hover:bg-[#25292E] transition group flex items-start gap-2.5"
                >
                  <Wind className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-[#FF3B30] transition">
                      Nitrogen Inflation
                    </div>
                    <div className="text-[11px] text-[#868E96] leading-tight mt-0.5">
                      Runs 15°C cooler, zero internal rim oxidation
                    </div>
                  </div>
                </Link>

                {/* Service 6: Puncture Proofing */}
                <Link
                  href="/fleet-services/puncture-proofing"
                  className="p-2.5 rounded hover:bg-[#25292E] transition group flex items-start gap-2.5"
                >
                  <ShieldAlert className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-[#FF3B30] transition">
                      Puncture Proofing & Repair
                    </div>
                    <div className="text-[11px] text-[#868E96] leading-tight mt-0.5">
                      AS 1973 compliant vulcanized radial section seals
                    </div>
                  </div>
                </Link>

                {/* Service 7: Tyre Fitting */}
                <Link
                  href="/fleet-services/tyre-fitting"
                  className="p-2.5 rounded hover:bg-[#25292E] transition group flex items-start gap-2.5"
                >
                  <Disc className="w-4 h-4 text-[#CED4DA] mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-[#FF3B30] transition">
                      Commercial Tyre Fitting
                    </div>
                    <div className="text-[11px] text-[#868E96] leading-tight mt-0.5">
                      Drive-through truck bays & 24/7 mobile vans
                    </div>
                  </div>
                </Link>

                {/* Service 8: Ultimate ReadyFit */}
                <Link
                  href="/fleet-services/ultimate-readyfit"
                  className="p-2.5 rounded bg-[#D50000]/10 hover:bg-[#D50000]/20 border border-[#D50000]/30 transition group flex items-start gap-2.5"
                >
                  <Zap className="w-4 h-4 text-[#FF3B30] mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-[#FF3B30] transition flex items-center gap-1.5">
                      <span>Ultimate ReadyFit</span>
                      <span className="text-[9px] bg-amber-400 text-black px-1 rounded font-bold">Patented</span>
                    </div>
                    <div className="text-[11px] text-[#868E96] leading-tight mt-0.5">
                      Pre-mounted, bolt-on wheel assemblies
                    </div>
                  </div>
                </Link>

                {/* Service 9: U-Wheels */}
                <Link
                  href="/fleet-services/u-wheels"
                  className="p-2.5 rounded hover:bg-[#25292E] transition group flex items-start gap-2.5 col-span-2 border-t border-[#25292E]"
                >
                  <CircleDot className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-[#FF3B30] transition">
                      U-Wheels (Rims & Custom Wheel Solutions)
                    </div>
                    <div className="text-[11px] text-[#868E96] leading-tight mt-0.5">
                      ADR compliant forged alloy & steel 10-stud tubeless rims in stock
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* News & Events */}
          <Link
            href="/news"
            className={`px-3 py-2 rounded hover:text-white hover:bg-[#25292E] transition ${
              isActive('/news') ? 'text-[#FF3B30] bg-[#25292E]' : ''
            }`}
          >
            NEWS & EVENTS
          </Link>

          {/* Network Map */}
          <Link
            href="/network-map"
            className={`px-3 py-2 rounded hover:text-white hover:bg-[#25292E] transition flex items-center gap-1 ${
              isActive('/network-map') ? 'text-[#FF3B30] bg-[#25292E]' : ''
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-[#D50000]" />
            <span>NETWORK MAP</span>
          </Link>

          {/* Contact */}
          <Link
            href="/contact"
            className={`px-3 py-2 rounded hover:text-white hover:bg-[#25292E] transition ${
              isActive('/contact') ? 'text-[#FF3B30] bg-[#25292E]' : ''
            }`}
          >
            CONTACT
          </Link>

          {/* Join Us Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setJoinDropdownOpen(true)}
            onMouseLeave={() => setJoinDropdownOpen(false)}
          >
            <Link
              href="/join-us"
              className={`px-3 py-2 rounded flex items-center gap-1 hover:text-white hover:bg-[#25292E] transition ${
                isActive('/join-us') ? 'text-[#FF3B30] bg-[#25292E]' : ''
              }`}
            >
              <span>JOIN US</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#6C757D]" />
            </Link>

            {joinDropdownOpen && (
              <div className="absolute top-full right-0 w-60 bg-[#1C1F22] border border-[#343A40] rounded-b shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <Link
                  href="/join-us/become-a-dealer"
                  className="px-4 py-2.5 text-white hover:bg-[#25292E] flex flex-col text-xs transition"
                >
                  <strong className="text-[#FF3B30] font-bold">Become a Dealer</strong>
                  <span className="text-[11px] text-[#868E96]">Apply for trade account with ABN verification</span>
                </Link>
                <div className="border-t border-[#25292E] my-1"></div>
                <Link
                  href="/join-us/careers"
                  className="px-4 py-2.5 text-white hover:bg-[#25292E] flex flex-col text-xs transition"
                >
                  <strong className="hover:text-white font-bold">Careers & Fitters</strong>
                  <span className="text-[11px] text-[#868E96]">Join Brisbane commercial service crew</span>
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Action Buttons: 24/7 Mobile Call & Mobile Hamburger */}
        <div className="flex items-center gap-2">
          <a
            href="tel:1300110002"
            className="hidden sm:flex items-center gap-1.5 bg-[#25292E] hover:bg-[#343A40] text-white px-3 py-1.5 rounded border border-[#343A40] text-xs font-condensed font-bold tracking-wider"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            <span>24/7 BREAKDOWN</span>
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:bg-[#25292E] rounded transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#1C1F22] border-t border-[#2B3036] px-4 py-4 space-y-3 max-h-[80vh] overflow-y-auto">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white font-condensed font-bold text-base py-1"
          >
            Home
          </Link>
          <Link
            href="/about-us"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white font-condensed font-bold text-base py-1"
          >
            About Us
          </Link>

          <div className="border-t border-[#2B3036] pt-2">
            <div className="text-xs uppercase font-bold text-[#FF3B30] mb-1 font-condensed">Commercial Tyres</div>
            <Link
              href="/tyres"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[#CED4DA] text-sm py-1 pl-2"
            >
              Tyres Overview
            </Link>
            <Link
              href="/tyres/truck"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[#CED4DA] text-sm py-1 pl-2"
            >
              Truck Tyres (Steer, Drive, Trailer)
            </Link>
            <Link
              href="/tyres/bus"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[#CED4DA] text-sm py-1 pl-2"
            >
              Bus Tyres
            </Link>
            <Link
              href="/tyres/ralson"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[#FF3B30] text-sm py-1 pl-2 font-bold"
            >
              Ralson (Authorised Distributor)
            </Link>
            <Link
              href="/tyres/blacklion"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[#CED4DA] text-sm py-1 pl-2"
            >
              Blacklion Tyres
            </Link>
            <Link
              href="/tyres/triangle"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[#CED4DA] text-sm py-1 pl-2"
            >
              Triangle Tyres
            </Link>
          </div>

          <div className="border-t border-[#2B3036] pt-2">
            <div className="text-xs uppercase font-bold text-[#FF3B30] mb-1 font-condensed">Fleet Services</div>
            <Link
              href="/fleet-services/wheel-alignment"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white font-bold text-sm py-1 pl-2"
            >
              Wheel Alignment (Straight Wheels Format)
            </Link>
            <Link
              href="/fleet-services/ultimate-readyfit"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-amber-400 font-bold text-sm py-1 pl-2"
            >
              Ultimate ReadyFit Pre-Mounted
            </Link>
            <Link
              href="/fleet-services"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[#CED4DA] text-sm py-1 pl-2"
            >
              All 9 Fleet Services
            </Link>
          </div>

          <div className="border-t border-[#2B3036] pt-2">
            <Link
              href="/network-map"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white font-condensed font-bold text-base py-1"
            >
              Network Map & Branches
            </Link>
            <Link
              href="/news"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white font-condensed font-bold text-base py-1"
            >
              News & Events
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white font-condensed font-bold text-base py-1"
            >
              Contact Us
            </Link>
            <Link
              href="/join-us/become-a-dealer"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[#FF3B30] font-condensed font-bold text-base py-1"
            >
              Become a Dealer (ABN Application)
            </Link>
          </div>

          <div className="pt-2">
            <Link
              href="/dealer/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center bg-[#D50000] text-white py-2.5 rounded font-condensed font-bold text-base tracking-wider"
            >
              DEALER LOGIN / JOIN
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
