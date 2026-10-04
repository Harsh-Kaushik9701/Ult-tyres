import React from 'react';
import Link from 'next/link';
import { FileText } from 'lucide-react';
import TopUtilityRibbon from '@/components/TopUtilityRibbon';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';

export default function TermsOfTradePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#121416]">
      <TopUtilityRibbon />
      <MainHeader />

      <main className="flex-1 py-14 px-4">
        <div className="max-w-4xl mx-auto bg-[#1C1F22] border border-[#2B3036] rounded-2xl p-8 sm:p-12 shadow-2xl">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase mb-3">
            <FileText className="w-4 h-4" />
            <span>Commercial Wholesale Terms of Trade</span>
          </div>

          <h1 className="font-condensed font-black text-3xl sm:text-4xl text-white uppercase mb-6">
            B2B COMMERCIAL TERMS &amp; CREDIT CONDITIONS
          </h1>

          <div className="prose prose-invert text-xs sm:text-sm text-[#CED4DA] space-y-4 leading-relaxed">
            <p>
              These commercial terms govern all quotes, orders, and deliveries issued by Ultimate Tyres Australia Pty Ltd (ABN 84 629 114 902) to registered commercial dealers and fleet operators.
            </p>

            <h2 className="font-condensed font-bold text-lg text-white uppercase pt-2">
              1. Request-for-Pricing (RFQ) &amp; Quotes
            </h2>
            <p>
              Prices shown on quotes generated via the dealer portal are bespoke quantity-band wholesale calculations valid for 7 calendar days from the date of quotation. A quotation does not constitute a legally binding agreement until accepted by the dealer and confirmed by our dispatch controller.
            </p>

            <h2 className="font-condensed font-bold text-lg text-white uppercase pt-2">
              2. 30-Day Credit Accounts &amp; Payment
            </h2>
            <p>
              Approved commercial dealers with established 30-day trading facilities agree to settle statement balances by the 30th day following the end of the trading month. For pay-per-order accounts, dispatch will occur upon clearance of funds via electronic bank transfer or certified payment link.
            </p>

            <h2 className="font-condensed font-bold text-lg text-white uppercase pt-2">
              3. Delivery &amp; Retention of Title
            </h2>
            <p>
              Risk in the goods passes to the buyer upon delivery to the designated workshop address or customer collection at our Rocklea, Yatala, or Bald Hills bays. Title and ownership in tyres remains with Ultimate Tyres until full payment has been received in cleared funds.
            </p>

            <h2 className="font-condensed font-bold text-lg text-white uppercase pt-2">
              4. Casing Warranty &amp; Ultimate ReadyFit Exchange
            </h2>
            <p>
              All Ralson tyres are covered by our Authorised Distributor 100% Casing Warranty against manufacturing structural failure through original tread life and up to 2 retreads. ReadyFit bolt-on assemblies require the return of acceptable sound commercial casings within 14 days of delivery to qualify for full casing credit value.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
