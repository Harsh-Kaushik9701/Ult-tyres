import React from 'react';
import Link from 'next/link';
import { Newspaper, Calendar, ArrowRight, User, Tag } from 'lucide-react';
import TopUtilityRibbon from '@/components/TopUtilityRibbon';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';

const ARTICLES = [
  {
    id: 'ralson-australian-distribution',
    slug: 'ralson-australian-distribution',
    title: 'Ultimate Tyres Secures Authorised Australian Distributorship for Ralson Commercial Tyres',
    date: 'Oct 1, 2026',
    author: 'Manjinder Singh',
    category: 'Company Announcement',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80',
    summary: 'Direct factory partnership guarantees South-East Queensland transport operators priority allocation of RAC44 steer and RDC55 deep-tread drive tyres backed by an industry-first 100% casing warranty.',
  },
  {
    id: 'steer-vs-drive-axle-guide',
    slug: 'steer-vs-drive-axle-guide',
    title: 'Commercial Fleet Guide: Why Fitting Steer Tyres on Drive Axles Kills Fuel Economy and Safety',
    date: 'Sep 24, 2026',
    author: 'Commercial Technical Team',
    category: 'Technical Guide',
    image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=800&q=80',
    summary: 'A deep dive into compound saturation, lug block rigidity, and shear forces under high engine torque. How dedicated axle patterns cut total cost-per-kilometre.',
  },
  {
    id: 'laser-alignment-cuts-fuel-drag',
    slug: 'laser-alignment-cuts-fuel-drag',
    title: 'Field Audit: How Multi-Axle Laser Wheel Alignment Saved a 30-Truck Brisbane Fleet $44,000 Annually',
    date: 'Sep 12, 2026',
    author: 'Fleet Engineering Desk',
    category: 'Case Study',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
    summary: 'Real telemetry data demonstrating the compounding financial penalties of 4mm trailer dog-tracking and uncalibrated prime mover steer toe angles.',
  },
];

export default function NewsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#121416]">
      <TopUtilityRibbon />
      <MainHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-[#1C1F22] border-b border-[#25292E] py-14 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#D50000]/20 text-[#FF3B30] text-xs font-condensed font-bold uppercase tracking-wider mb-3">
              <Newspaper className="w-3.5 h-3.5" />
              <span>Industry Insights &amp; Updates</span>
            </div>

            <h1 className="font-condensed font-black text-4xl sm:text-5xl text-white uppercase tracking-tight">
              NEWS, FLEET CASE STUDIES &amp; GUIDES
            </h1>
            <p className="text-sm text-[#CED4DA] max-w-2xl mt-2 leading-relaxed">
              Technical guides, casing maintenance insights, and commercial transport announcements from the Ultimate Tyres engineering team.
            </p>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {ARTICLES.map((article) => (
              <article
                key={article.id}
                className="bg-[#1C1F22] border border-[#2B3036] rounded-2xl overflow-hidden hover:border-[#D50000] transition flex flex-col justify-between shadow-xl group"
              >
                <div>
                  <div className="relative h-48 bg-[#25292E] overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition duration-500"
                      style={{ backgroundImage: `url(${article.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C1F22] via-transparent to-black/30" />

                    <div className="absolute top-3 left-3 bg-[#D50000] text-white text-[10px] font-condensed font-bold uppercase px-2.5 py-0.5 rounded shadow">
                      {article.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-[#868E96] mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-amber-400" />
                        <span>{article.date}</span>
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3 text-[#CED4DA]" />
                        <span>{article.author}</span>
                      </span>
                    </div>

                    <h2 className="font-condensed font-bold text-xl text-white group-hover:text-[#FF3B30] transition leading-snug">
                      {article.title}
                    </h2>

                    <p className="text-xs text-[#868E96] leading-relaxed mt-3">
                      {article.summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/news/${article.slug}`}
                    className="pt-3 border-t border-[#25292E] text-xs font-condensed font-bold uppercase tracking-wider text-[#FF3B30] hover:text-white flex items-center gap-1.5 transition"
                  >
                    <span>Read Full Technical Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
