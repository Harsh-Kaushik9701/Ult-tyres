'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, KeyRound, Shield, CheckCircle2, ArrowRight, UserCheck } from 'lucide-react';
import TopUtilityRibbon from '@/components/TopUtilityRibbon';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import { useApp, DEMO_MODE } from '@/context/AppContext';

export default function DealerLoginPage() {
  const router = useRouter();
  const { session, setSession, switchRole } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usePasskey, setUsePasskey] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('admin') || email.includes('ultimatetyres')) {
      switchRole('admin');
      router.push('/admin');
    } else {
      switchRole('owner');
      router.push('/portal');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#121416]">
      <TopUtilityRibbon />
      <MainHeader />

      <main className="flex-1 py-16 px-4 flex items-center justify-center">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Door: Existing Dealer Login */}
          <div className="bg-[#1C1F22] border border-[#2B3036] rounded-2xl p-8 sm:p-10 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#D50000]/20 text-[#FF3B30] text-xs font-condensed font-bold uppercase tracking-wider mb-4 border border-[#D50000]/30">
                <Lock className="w-3.5 h-3.5" />
                <span>Gated Dealer Portal Access</span>
              </div>

              <h1 className="font-condensed font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
                DEALER SIGN IN
              </h1>
              <p className="text-xs text-[#868E96] mt-2 leading-relaxed">
                Enter your registered business email and password or passkey to access live availability, RFQ cart, and order tracking.
              </p>

              <form onSubmit={handleLogin} className="mt-6 space-y-4 text-xs">
                <div>
                  <label className="block text-[#868E96] font-bold uppercase mb-1">
                    Business Login Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#6C757D] absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#121416] border border-[#343A40] text-white rounded-lg pl-9 pr-3 py-2.5 focus:border-[#D50000] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[#868E96] font-bold uppercase">Password</label>
                    <span className="text-[11px] text-[#FF3B30] hover:underline cursor-pointer">
                      Forgot?
                    </span>
                  </div>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-[#6C757D] absolute left-3 top-3" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-[#121416] border border-[#343A40] text-white rounded-lg pl-9 pr-3 py-2.5 focus:border-[#D50000] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Passkey option */}
                <div className="p-3 bg-[#121416] rounded-lg border border-[#25292E] flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#CED4DA]">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    <span>Sign in with Passkey / Biometrics</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      switchRole('owner');
                      router.push('/portal');
                    }}
                    className="text-[11px] bg-[#25292E] hover:bg-[#343A40] text-white px-2.5 py-1 rounded font-condensed font-bold uppercase border border-[#343A40]"
                  >
                    Use Passkey
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#D50000] hover:bg-[#B30000] text-white py-3.5 rounded-lg font-condensed font-bold text-base uppercase tracking-wider transition shadow-lg shadow-red-950 flex items-center justify-center gap-2"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Sign In to Dealer Portal</span>
                </button>
              </form>
            </div>

            {/* Quick demo shortcuts: only when NEXT_PUBLIC_DEMO_MODE=true */}
            {DEMO_MODE && (
            <div className="mt-6 pt-4 border-t border-[#25292E] text-xs">
              <div className="text-[10px] uppercase font-bold text-[#868E96] mb-2 font-condensed">
                Quick Evaluation Presets:
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    switchRole('owner');
                    router.push('/portal');
                  }}
                  className="bg-[#121416] hover:bg-[#25292E] text-[#CED4DA] p-2 rounded text-left border border-[#25292E]"
                >
                  <strong className="block text-white text-[11px]">Dealer Owner</strong>
                  <span className="text-[10px] text-[#868E96]">Apex Fleet (Tier A)</span>
                </button>

                <button
                  onClick={() => {
                    switchRole('admin');
                    router.push('/admin');
                  }}
                  className="bg-[#121416] hover:bg-[#25292E] text-amber-400 p-2 rounded text-left border border-[#25292E]"
                >
                  <strong className="block text-amber-400 text-[11px]">Staff Admin</strong>
                  <span className="text-[10px] text-[#868E96]">Pricing &amp; Queue Desk</span>
                </button>
              </div>
            </div>
            )}
          </div>

          {/* Right Door: New Business Apply (Tempe & NTAW pattern) */}
          <div className="bg-gradient-to-br from-[#1C1F22] to-[#25292E] border border-[#2B3036] rounded-2xl p-8 sm:p-10 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-6">
                <Shield className="w-6 h-6" />
              </div>

              <span className="text-xs font-mono uppercase text-amber-400 font-bold">
                New Commercial Customer?
              </span>

              <h2 className="font-condensed font-black text-3xl sm:text-4xl text-white uppercase tracking-tight mt-1">
                APPLY FOR A TRADE DEALER ACCOUNT
              </h2>

              <p className="text-xs text-[#CED4DA] leading-relaxed mt-4">
                Ultimate Tyres provides wholesale supply exclusively to verified transport companies, commercial fleet operators, and certified automotive workshops.
              </p>

              <div className="mt-6 space-y-3 text-xs text-[#868E96]">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Immediate live ABN lookup against Australian Business Register</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Same-day account approval turnaround by our commercial desk</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Dedicated wholesale quantity pricing bands per brand and size</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Instant preview of catalogue specifications while under review</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#343A40]">
              <Link
                href="/join-us/become-a-dealer"
                className="w-full block text-center bg-white hover:bg-slate-100 text-black py-3.5 rounded-lg font-condensed font-bold text-base uppercase tracking-wider transition shadow-lg"
              >
                Apply for Dealership &rarr;
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
