'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { BRANDS } from '@/data/mockData';
import { Button, ButtonLink, Container, PageHero, Tile, inputClass, labelClass } from '@/components/ui';
import { formatAbn, isValidAbn } from '@/lib/abn';

const BENEFITS = ['See what’s in stock', 'Send a cart for pricing', 'Track your orders'];

export default function BecomeDealerPage() {
  const { submitDealerApplication } = useApp();

  const [abn, setAbn] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('workshop');
  const [contactName, setContactName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [volume, setVolume] = useState('Under 20 tyres a month');
  const [brands, setBrands] = useState<string[]>([]);
  const [agreed, setAgreed] = useState(false);
  const [abnTouched, setAbnTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const abnOk = isValidAbn(abn);
  const showAbnError = abnTouched && abn.length > 0 && !abnOk;

  const toggleBrand = (name: string) =>
    setBrands((prev) => (prev.includes(name) ? prev.filter((b) => b !== name) : [...prev, name]));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAbnTouched(true);
    if (!abnOk || !agreed) return;
    submitDealerApplication({
      businessName,
      abn: formatAbn(abn),
      abnValid: true,
      gstRegistered: false,
      tradingName: businessName,
      businessType,
      yearsTrading: 0,
      contactName,
      role: '',
      email,
      mobile,
      deliveryAddress: '',
      estimatedMonthlyVolume: volume,
      brandsOfInterest: brands,
      creditPreference: 'pay-per-order',
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="py-24">
        <Container className="max-w-xl text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-ok" aria-hidden />
          <h1 className="mt-4 text-4xl font-semibold">Thanks, {contactName.split(' ')[0] || 'mate'}.</h1>
          <p className="mt-3 text-lg text-muted">
            We&apos;ll check your details and get back to you within one business day. Once you&apos;re approved,
            we&apos;ll email your login.
          </p>
          <div className="mt-8">
            <ButtonLink href="/tyres" variant="secondary">
              Browse tyres
            </ButtonLink>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <>
      <PageHero eyebrow="For dealers" title="Become a dealer" subtitle="Apply in a couple of minutes. We reply within one business day.">
        {BENEFITS.map((b) => (
          <span key={b} className="flex items-center gap-1.5 text-[15px] text-muted">
            <CheckCircle2 className="h-4 w-4 text-ok" aria-hidden /> {b}
          </span>
        ))}
      </PageHero>

      <section className="pb-20">
        <Container className="max-w-2xl">
          <Tile className="px-6 py-10 sm:px-10">
            <form onSubmit={handleSubmit} className="grid gap-5" noValidate>
              <div>
                <label htmlFor="abn" className={labelClass}>
                  ABN
                </label>
                <input
                  id="abn"
                  inputMode="numeric"
                  autoComplete="off"
                  value={abn}
                  onChange={(e) => setAbn(formatAbn(e.target.value))}
                  onBlur={() => setAbnTouched(true)}
                  placeholder="11 digits"
                  aria-invalid={showAbnError}
                  aria-describedby="abn-help"
                  className={`${inputClass} ${showAbnError ? 'border-brand' : ''}`}
                  required
                />
                <p id="abn-help" className={`mt-1.5 text-sm ${showAbnError ? 'text-brand' : 'text-muted'}`}>
                  {showAbnError ? 'That ABN doesn’t look right. Check the 11 digits.' : abnOk ? 'Looks good.' : ' '}
                </p>
              </div>

              <div>
                <label htmlFor="business" className={labelClass}>
                  Business name
                </label>
                <input
                  id="business"
                  autoComplete="organization"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className={inputClass}
                  required
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="type" className={labelClass}>
                    Type of business
                  </label>
                  <select id="type" value={businessType} onChange={(e) => setBusinessType(e.target.value)} className={inputClass}>
                    <option value="workshop">Workshop</option>
                    <option value="tyre_retailer">Tyre shop</option>
                    <option value="fleet_operator">Fleet operator</option>
                    <option value="transport_company">Transport company</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="volume" className={labelClass}>
                    Tyres per month
                  </label>
                  <select id="volume" value={volume} onChange={(e) => setVolume(e.target.value)} className={inputClass}>
                    <option>Under 20 tyres a month</option>
                    <option>20 to 50 tyres a month</option>
                    <option>50 to 100 tyres a month</option>
                    <option>Over 100 tyres a month</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="name" className={labelClass}>
                  Your name
                </label>
                <input
                  id="name"
                  autoComplete="name"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className={inputClass}
                  required
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="mobile" className={labelClass}>
                    Mobile
                  </label>
                  <input
                    id="mobile"
                    type="tel"
                    autoComplete="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              <fieldset>
                <legend className={labelClass}>Brands you’re after (optional)</legend>
                <div className="flex flex-wrap gap-2">
                  {BRANDS.map((b) => {
                    const on = brands.includes(b.name);
                    return (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => toggleBrand(b.name)}
                        aria-pressed={on}
                        className={`rounded-full border px-4 py-2 text-[15px] transition ${
                          on ? 'border-ink bg-ink text-white' : 'border-line bg-white hover:border-ink'
                        }`}
                      >
                        {b.name}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <label className="flex items-start gap-3 text-[15px]">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 h-4 w-4 accent-brand"
                  required
                />
                <span>
                  I agree to the{' '}
                  <Link href="/legal/terms-of-trade" className="text-brand underline">
                    terms of trade
                  </Link>{' '}
                  and{' '}
                  <Link href="/legal/privacy" className="text-brand underline">
                    privacy policy
                  </Link>
                  .
                </span>
              </label>

              <div>
                <Button
                  type="submit"
                  disabled={!agreed || !abnOk || !businessName || !contactName || !mobile || !email}
                  className="w-full sm:w-auto"
                >
                  Send application
                </Button>
              </div>
            </form>
          </Tile>
          <p className="mt-6 text-center text-[15px] text-muted">
            Already a dealer?{' '}
            <Link href="/dealer/login" className="font-medium text-brand hover:underline">
              Log in
            </Link>
          </p>
        </Container>
      </section>
    </>
  );
}
