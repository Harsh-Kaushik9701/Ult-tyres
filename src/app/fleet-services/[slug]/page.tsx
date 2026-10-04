'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import {
  Wrench,
  CheckCircle2,
  Phone,
  ArrowRight,
  Send,
  MapPin,
  Clock,
  Shield,
  ChevronRight,
} from 'lucide-react';
import TopUtilityRibbon from '@/components/TopUtilityRibbon';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';
import { FLEET_SERVICES, BRANCHES } from '@/data/mockData';

export default function GenericFleetServicePage() {
  const params = useParams();
  const slug = (params?.slug as string)?.toLowerCase();

  const service = FLEET_SERVICES.find((s) => s.slug === slug);
  const [submitted, setSubmitted] = useState(false);

  if (!service) return notFound();

  return (
    <div className="min-h-screen flex flex-col bg-[#121416]">
      <TopUtilityRibbon />
      <MainHeader />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-[#1C1F22] border-b border-[#25292E] py-3 px-4 text-xs text-[#868E96]">
          <div className="max-w-7xl mx-auto flex items-center gap-1.5 flex-wrap">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#495057]" />
            <Link href="/fleet-services" className="hover:text-white transition">Fleet Services</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#495057]" />
            <span className="text-white font-bold">{service.name}</span>
          </div>
        </div>

        {/* Hero */}
        <section className="relative py-16 px-4 bg-[#1C1F22] border-b border-[#25292E] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${service.heroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1C1F22] via-[#1C1F22]/90 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#D50000]/20 text-[#FF3B30] text-xs font-condensed font-bold uppercase tracking-wider mb-4">
                <Wrench className="w-4 h-4" />
                <span>Commercial Fleet Service</span>
              </div>

              <h1 className="font-condensed font-black text-4xl sm:text-5xl text-white uppercase tracking-tight leading-[0.95]">
                {service.name}
              </h1>

              <p className="text-sm sm:text-base text-[#CED4DA] leading-relaxed mt-4 max-w-xl">
                {service.shortDesc} Delivered by accredited commercial tyre technicians across Rocklea, Yatala, and Bald Hills.
              </p>

              <div className="mt-6 flex items-center gap-3">
                <span className="bg-[#121416] border border-[#343A40] text-amber-400 px-3 py-1.5 rounded text-xs font-mono font-bold">
                  Turnaround: {service.turnaround}
                </span>
                <span className="bg-[#121416] border border-[#343A40] text-emerald-400 px-3 py-1.5 rounded text-xs font-mono font-bold">
                  {service.highlight}
                </span>
              </div>

              <div className="mt-8 flex items-center gap-4 flex-wrap">
                <a
                  href="tel:1300110002"
                  className="bg-[#D50000] hover:bg-[#B30000] text-white px-7 py-3 rounded-lg font-condensed font-bold text-base uppercase tracking-wider transition flex items-center gap-2 shadow-lg"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call 1300 110 002</span>
                </a>
              </div>
            </div>

            {/* Right: Booking Box */}
            <div className="lg:col-span-5 bg-[#121416] border border-[#2B3036] rounded-2xl p-6 sm:p-8">
              <h3 className="font-condensed font-bold text-xl text-white uppercase">
                Book This Service
              </h3>
              <p className="text-xs text-[#868E96] mt-1">
                Same-day response for commercial transport accounts
              </p>

              {submitted ? (
                <div className="mt-5 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <div className="font-condensed font-bold text-lg text-white">Booking Inquiry Sent</div>
                  <div className="text-xs text-[#CED4DA] mt-1">
                    Our service desk will contact you to confirm timing.
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="mt-4 space-y-3 text-xs"
                >
                  <div>
                    <label className="block text-[#868E96] font-bold uppercase mb-1">Company / Fleet</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Logistics"
                      className="w-full bg-[#1C1F22] border border-[#343A40] text-white rounded-lg px-3 py-2 text-xs focus:border-[#D50000] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[#868E96] font-bold uppercase mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="0400 000 000"
                      className="w-full bg-[#1C1F22] border border-[#343A40] text-white rounded-lg px-3 py-2 text-xs focus:border-[#D50000] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[#868E96] font-bold uppercase mb-1">Preferred Hub</label>
                    <select className="w-full bg-[#1C1F22] border border-[#343A40] text-white rounded-lg px-3 py-2 text-xs focus:border-[#D50000] focus:outline-none">
                      <option>Rocklea HQ Central Hub</option>
                      <option>Yatala Logistics Depot</option>
                      <option>Bald Hills Northside Depot</option>
                      <option>Mobile On-Site Service Van</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#D50000] hover:bg-[#B30000] text-white py-2.5 rounded-lg font-condensed font-bold text-sm uppercase tracking-wider transition flex items-center justify-center gap-2 shadow"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Service Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* 3 Branches Offering This Service */}
        <section className="py-12 px-4 bg-[#16181B]">
          <div className="max-w-7xl mx-auto">
            <h3 className="font-condensed font-bold text-xl text-white uppercase mb-6">
              Available at Our 3 Brisbane Service Centers
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {BRANCHES.map((b) => (
                <div key={b.id} className="bg-[#1C1F22] border border-[#2B3036] rounded-xl p-5">
                  <h4 className="font-condensed font-bold text-base text-white">{b.name}</h4>
                  <div className="text-xs text-[#868E96] mt-1">{b.address}, {b.suburb}</div>
                  <div className="text-xs text-white font-mono font-bold mt-2">{b.phone}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
