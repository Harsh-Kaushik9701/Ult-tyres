import React from 'react';
import Link from 'next/link';
import { Shield } from 'lucide-react';
import TopUtilityRibbon from '@/components/TopUtilityRibbon';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#121416]">
      <TopUtilityRibbon />
      <MainHeader />

      <main className="flex-1 py-14 px-4">
        <div className="max-w-4xl mx-auto bg-[#1C1F22] border border-[#2B3036] rounded-2xl p-8 sm:p-12 shadow-2xl">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase mb-3">
            <Shield className="w-4 h-4" />
            <span>Australian Privacy Principles (Privacy Act 1988)</span>
          </div>

          <h1 className="font-condensed font-black text-3xl sm:text-4xl text-white uppercase mb-6">
            PRIVACY POLICY &amp; DATA GOVERNANCE
          </h1>

          <div className="prose prose-invert text-xs sm:text-sm text-[#CED4DA] space-y-4 leading-relaxed">
            <p>
              Ultimate Tyres Australia Pty Ltd (ABN 84 629 114 902) is committed to protecting your privacy in compliance with the Australian Privacy Act 1988 (Cth) and the Notifiable Data Breaches (NDB) scheme.
            </p>

            <h2 className="font-condensed font-bold text-lg text-white uppercase pt-2">
              1. Information We Collect
            </h2>
            <p>
              When applying for a commercial dealer trade account or submitting a Request for Pricing (RFQ), we collect business identity records including Australian Business Numbers (ABN), trading names, workshop delivery addresses, fleet sizes, and authorized representative contact details (names, business emails, and direct mobile phone numbers for SMS quote updates).
            </p>

            <h2 className="font-condensed font-bold text-lg text-white uppercase pt-2">
              2. How Your Commercial Data is Used
            </h2>
            <p>
              Your information is strictly utilized to price bespoke commercial tyre quotes, verify creditworthiness for 30-day trading terms, coordinate heavy vehicle logistics deliveries across Queensland, and notify you via SMS and email when pricing quotes are calculated.
            </p>

            <h2 className="font-condensed font-bold text-lg text-white uppercase pt-2">
              3. Data Sovereignty &amp; Cloud Security
            </h2>
            <p>
              In accordance with Section 16 of our architecture, all dealer account information and pricing requests are stored exclusively on secure Australian servers (Sydney region) with encrypted TLS transit. We do not sell, rent, or trade your fleet commercial information to third-party marketing brokers.
            </p>

            <h2 className="font-condensed font-bold text-lg text-white uppercase pt-2">
              4. Contacting Our Privacy Officer
            </h2>
            <p>
              If you have inquiries regarding how your account records are maintained or wish to update team permissions, contact privacy@ultimatetyres.com.au or write to Ultimate Tyres Australia Pty Ltd, 1452 Ipswich Road, Rocklea QLD 4106.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
