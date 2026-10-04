'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Briefcase, MapPin, Clock, DollarSign, CheckCircle2, Send } from 'lucide-react';
import TopUtilityRibbon from '@/components/TopUtilityRibbon';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';

const JOBS = [
  {
    id: 'mobile-tyre-fitter',
    title: 'Senior Mobile Commercial Tyre Fitter',
    location: 'Rocklea HQ & Greater Brisbane Corridor',
    type: 'Full-Time (Overtime Available)',
    salary: '$38 – $45 / hr + Penalties + Company Van',
    desc: 'Operate modern, fully-equipped Mercedes-Benz Sprinter service vans responding to fleet depots and roadside breakdowns across Brisbane.',
    reqs: [
      'Current Australian Open Driver License (HR advantageous)',
      'Minimum 2 years experience fitting commercial truck / agricultural tyres',
      'Demonstrated commitment to workplace safety and roadside hazard management',
    ],
  },
  {
    id: 'heavy-wheel-alignment-tech',
    title: 'Heavy Vehicle Laser Wheel Alignment Technician',
    location: 'Rocklea HQ & Yatala Depots',
    type: 'Full-Time',
    salary: '$40 – $48 / hr + Performance Bonuses',
    desc: 'Perform precision multi-axle laser wheel alignments on prime movers, trailers, and transit buses using state-of-the-art optical aligners.',
    reqs: [
      'Strong diagnostic capability across heavy vehicle suspension, kingpins, and steering',
      'Experience operating computerized laser alignment machinery',
      'Trade qualification (Cert III in Heavy Commercial Mechanical or Tyre Servicing)',
    ],
  },
  {
    id: 'b2b-fleet-sales',
    title: 'B2B Fleet Accounts & Wholesale Representative',
    location: 'Brisbane & Gold Coast (Hybrid)',
    type: 'Full-Time',
    salary: '$85,000 – $105,000 Base + Uncapped Commission + Vehicle',
    desc: 'Represent Ralson, Blacklion, and Triangle commercial tyres to transport companies, civil contractors, and workshop networks.',
    reqs: [
      'Proven commercial B2B sales track record in transport, tyres, or logistics',
      'Understanding of fleet cost-per-kilometre (CPK) metrics and commercial tyre casing economics',
      'Strong communication and relationship-building capabilities',
    ],
  },
];

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [applied, setApplied] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#121416]">
      <TopUtilityRibbon />
      <MainHeader />

      <main className="flex-1 py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/20 text-amber-400 text-xs font-condensed font-bold uppercase tracking-wider mb-3">
              <Briefcase className="w-4 h-4" />
              <span>We Are Growing Our Brisbane Team</span>
            </div>

            <h1 className="font-condensed font-black text-4xl sm:text-5xl text-white uppercase tracking-tight">
              COMMERCIAL TYRE &amp; WORKSHOP CAREERS
            </h1>
            <p className="text-xs sm:text-sm text-[#868E96] mt-2 leading-relaxed">
              Work with the best equipment in Queensland. We value honesty, mechanical craft, and taking care of the crews that keep our customers rolling.
            </p>
          </div>

          {/* Job Openings List */}
          <div className="space-y-6">
            {JOBS.map((job) => (
              <div
                key={job.id}
                className="bg-[#1C1F22] border border-[#2B3036] rounded-2xl p-6 sm:p-8 hover:border-[#D50000] transition shadow-xl"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div>
                    <h2 className="font-condensed font-black text-2xl text-white uppercase">
                      {job.title}
                    </h2>
                    <div className="flex items-center gap-4 text-xs text-[#868E96] mt-1.5 flex-wrap">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#D50000]" />
                        <span>{job.location}</span>
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        <span>{job.type}</span>
                      </span>
                      <span>&bull;</span>
                      <span className="font-mono text-emerald-400 font-bold">
                        {job.salary}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedJob(job.title)}
                    className="bg-[#D50000] hover:bg-[#B30000] text-white px-6 py-2.5 rounded-lg font-condensed font-bold text-xs uppercase tracking-wider transition shrink-0"
                  >
                    Apply Now
                  </button>
                </div>

                <p className="text-xs text-[#CED4DA] leading-relaxed mb-4">
                  {job.desc}
                </p>

                <div className="pt-4 border-t border-[#25292E] space-y-1.5">
                  <div className="text-[11px] uppercase font-bold text-[#868E96]">Key Requirements:</div>
                  {job.reqs.map((req, i) => (
                    <div key={i} className="text-xs text-[#868E96] flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Application Modal */}
          {selectedJob && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-[#1C1F22] border border-[#343A40] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
                <button
                  onClick={() => {
                    setSelectedJob(null);
                    setApplied(false);
                  }}
                  className="absolute top-4 right-4 text-[#868E96] hover:text-white"
                >
                  ✕
                </button>

                <h3 className="font-condensed font-black text-2xl text-white uppercase mb-1">
                  Apply for {selectedJob}
                </h3>
                <p className="text-xs text-[#868E96] mb-6">
                  Submit your details directly to our branch operations manager
                </p>

                {applied ? (
                  <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                    <h4 className="font-condensed font-bold text-lg text-white">Application Received!</h4>
                    <p className="text-xs text-[#CED4DA] mt-1">
                      Our hiring manager will review your experience and reach out for an interview.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setApplied(true);
                    }}
                    className="space-y-4 text-xs"
                  >
                    <div>
                      <label className="block text-[#868E96] font-bold uppercase mb-1">Your Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="John Miller"
                        className="w-full bg-[#121416] border border-[#343A40] text-white rounded-lg px-3 py-2.5 focus:border-[#D50000] focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[#868E96] font-bold uppercase mb-1">Phone Number</label>
                        <input
                          type="tel"
                          required
                          placeholder="0400 000 000"
                          className="w-full bg-[#121416] border border-[#343A40] text-white rounded-lg px-3 py-2.5 focus:border-[#D50000] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[#868E96] font-bold uppercase mb-1">Email</label>
                        <input
                          type="email"
                          required
                          placeholder="john@gmail.com"
                          className="w-full bg-[#121416] border border-[#343A40] text-white rounded-lg px-3 py-2.5 focus:border-[#D50000] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#868E96] font-bold uppercase mb-1">Experience / Heavy Vehicle Background</label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Summarise your commercial tyre or alignment experience..."
                        className="w-full bg-[#121416] border border-[#343A40] text-white rounded-lg p-3 focus:border-[#D50000] focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#D50000] hover:bg-[#B30000] text-white py-3 rounded-lg font-condensed font-bold text-sm uppercase tracking-wider transition flex items-center justify-center gap-2 shadow"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Application</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
