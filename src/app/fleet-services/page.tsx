import React from 'react';
import Link from 'next/link';
import {
  Wrench,
  Compass,
  Gauge,
  Sliders,
  Wind,
  ShieldAlert,
  Disc,
  Zap,
  CircleDot,
  ArrowRight,
  Phone,
  CheckCircle2,
  Clock,
  Shield,
} from 'lucide-react';
import TopUtilityRibbon from '@/components/TopUtilityRibbon';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';
import { FLEET_SERVICES } from '@/data/mockData';

export default function FleetServicesOverviewPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#121416]">
      <TopUtilityRibbon />
      <MainHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-[#1C1F22] to-[#121416] py-16 px-4 border-b border-[#25292E]">
          <div className="max-w-7xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#D50000]/20 text-[#FF3B30] text-xs font-condensed font-bold uppercase tracking-wider mb-4">
              <Wrench className="w-4 h-4" />
              <span>Heavy Commercial Vehicle &amp; Fleet Engineering</span>
            </div>

            <h1 className="font-condensed font-black text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight">
              COMMERCIAL FLEET TYRE &amp; MECHANICAL SERVICES
            </h1>
            <p className="text-sm sm:text-base text-[#CED4DA] max-w-3xl mt-3 leading-relaxed">
              Eliminate costly highway breakdowns and premature tyre wear. Ultimate Tyres operates drive-through laser alignment bays in Rocklea, Yatala, and Bald Hills, paired with 24/7 on-site emergency mobile breakdown support.
            </p>

            <div className="mt-8 flex items-center gap-4 flex-wrap">
              <a
                href="tel:1300110002"
                className="bg-[#D50000] hover:bg-[#B30000] text-white px-7 py-3 rounded-lg font-condensed font-bold text-base uppercase tracking-wider transition flex items-center gap-2 shadow-lg"
              >
                <Phone className="w-4 h-4" />
                <span>Call 1300 110 002 for Service Bay</span>
              </a>

              <Link
                href="/contact"
                className="bg-[#25292E] hover:bg-[#343A40] text-white border border-[#495057] px-6 py-3 rounded-lg font-condensed font-bold text-base uppercase tracking-wider transition"
              >
                Book Fleet Audit
              </Link>
            </div>
          </div>
        </section>

        {/* 9 Fleet Services Grid */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs uppercase font-condensed font-bold text-[#D50000] tracking-widest">
                COMPLETE TYRE LIFECYCLE MANAGEMENT
              </span>
              <h2 className="font-condensed font-black text-3xl sm:text-4xl text-white uppercase mt-1">
                OUR 9 SPECIALISED WORKSHOP &amp; MOBILE SERVICES
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {FLEET_SERVICES.map((service) => {
                const isHighlight =
                  service.id === 'wheel-alignment' || service.id === 'ultimate-readyfit';
                return (
                  <div
                    key={service.id}
                    className={`bg-[#1C1F22] border rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#D50000] transition group shadow-xl ${
                      isHighlight
                        ? 'border-[#D50000]/60 ring-1 ring-[#D50000]/20'
                        : 'border-[#2B3036]'
                    }`}
                  >
                    <div className="relative h-48 bg-[#25292E] overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition duration-500"
                        style={{ backgroundImage: `url(${service.heroImage})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1C1F22] via-[#1C1F22]/40 to-transparent" />

                      <div className="absolute top-3 left-3">
                        {isHighlight && (
                          <span className="bg-[#D50000] text-white text-[10px] font-condensed font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
                            Flagship Program
                          </span>
                        )}
                      </div>

                      <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white font-mono text-[11px] px-2.5 py-1 rounded">
                        {service.turnaround}
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-condensed font-black text-2xl text-white uppercase group-hover:text-[#FF3B30] transition">
                          {service.name}
                        </h3>
                        <p className="text-xs text-[#868E96] leading-relaxed mt-2.5">
                          {service.shortDesc}
                        </p>

                        <div className="mt-4 pt-3 border-t border-[#25292E] text-xs text-amber-400 font-semibold flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{service.highlight}</span>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-[#25292E]">
                        <Link
                          href={`/fleet-services/${service.slug}`}
                          className="w-full text-center bg-[#25292E] group-hover:bg-[#D50000] text-white py-2.5 rounded-lg font-condensed font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2"
                        >
                          <span>Explore Service &amp; Pricing</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
