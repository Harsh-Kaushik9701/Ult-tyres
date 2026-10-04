import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, User, ArrowLeft, ArrowRight, Shield, Share2 } from 'lucide-react';
import TopUtilityRibbon from '@/components/TopUtilityRibbon';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="min-h-screen flex flex-col bg-[#121416]">
      <TopUtilityRibbon />
      <MainHeader />

      <main className="flex-1 py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-xs font-condensed font-bold uppercase tracking-wider text-[#FF3B30] hover:text-white transition mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </Link>

          <div className="bg-[#1C1F22] border border-[#2B3036] rounded-2xl overflow-hidden p-6 sm:p-10 shadow-2xl">
            <div className="flex items-center gap-3 text-xs text-[#868E96] mb-4">
              <span className="bg-[#D50000] text-white px-2.5 py-0.5 rounded text-[10px] font-condensed font-bold uppercase">
                Technical Authority
              </span>
              <span>&bull;</span>
              <span>Published Oct 1, 2026</span>
              <span>&bull;</span>
              <span>By Manjinder Singh</span>
            </div>

            <h1 className="font-condensed font-black text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tight leading-tight">
              Ultimate Tyres Secures Authorised Australian Distributorship for Ralson Commercial Tyres
            </h1>

            <div className="my-8 rounded-xl overflow-hidden border border-[#343A40]">
              <img
                src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80"
                alt="Ralson commercial tyres distribution"
                className="w-full h-auto object-cover max-h-[420px]"
              />
            </div>

            <div className="prose prose-invert max-w-none text-sm leading-relaxed text-[#CED4DA] space-y-4">
              <p className="text-base text-white font-medium">
                Ultimate Tyres is proud to announce its appointment as an Authorised Commercial Distributor for Ralson Tyres across Australia, establishing a robust direct supply chain for heavy truck, tipper, and regional freight operators.
              </p>

              <h2 className="font-condensed font-black text-2xl text-white uppercase pt-4">
                What This Means for Australian Transport Fleets
              </h2>
              <p>
                Ralson is renowned globally for its specialized radial casing engineering, featuring advanced heat-dissipating natural rubber matrices and ultra-high-tensile steel cord belts. Operating in severe Australian highway conditions where surface asphalt routinely exceeds 60°C, commercial casings face extreme shear stress.
              </p>
              <p>
                Under our authorized distribution agreement, Ultimate Tyres maintains dedicated warehouse reserves of the <strong>RAC44 All-Position</strong>, the <strong>RDC55 24mm Deep Drive</strong>, and the <strong>RTC33 Super Single Trailer</strong> across our Rocklea, Yatala, and Bald Hills branches.
              </p>

              <div className="bg-[#121416] border-l-4 border-[#D50000] p-4 rounded-r my-6">
                <div className="font-condensed font-bold text-white uppercase text-base">
                  Industry-Leading 100% Casing Multi-Life Guarantee
                </div>
                <p className="text-xs text-[#868E96] mt-1">
                  Every Ralson commercial TBR casing purchased through Ultimate Tyres is warranted against structural failure throughout its original tread life and up to two retreads or 5 years.
                </p>
              </div>

              <h2 className="font-condensed font-black text-2xl text-white uppercase pt-4">
                Rapid Gated B2B Dealer Access
              </h2>
              <p>
                Registered workshops and fleet operators can now access real-time stock bands and submit RFQs directly through our modernized dealer portal, receiving instant volume pricing returned within standard business hours.
              </p>
            </div>

            <div className="mt-10 pt-6 border-t border-[#25292E] flex items-center justify-between">
              <Link
                href="/tyres/ralson"
                className="bg-[#D50000] hover:bg-[#B30000] text-white px-5 py-2.5 rounded-lg font-condensed font-bold text-xs uppercase tracking-wider transition flex items-center gap-1.5"
              >
                <span>View Ralson Tyre Range</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/join-us/become-a-dealer"
                className="text-xs text-[#868E96] hover:text-white"
              >
                Apply for Trade Account &rarr;
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
