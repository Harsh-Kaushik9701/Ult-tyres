import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';
import { SITE } from '@/data/site';

export const metadata: Metadata = { title: 'Terms of trade' };

export default function TermsPage() {
  return (
    <LegalPage title="Terms of trade" updated="4 October 2026">
      <p>These terms apply to dealer accounts and orders placed with Ultimate Tyres.</p>
      <h2>Accounts</h2>
      <p>Dealer accounts are for registered Australian businesses with a valid ABN. We may approve or decline any application.</p>
      <h2>Pricing and quotes</h2>
      <p>
        Prices are given on a quote for the quantities you request. A quote is valid until the expiry date shown on it.
        All prices are in Australian dollars and GST is shown separately.
      </p>
      <h2>Orders</h2>
      <p>An order is confirmed when you accept a quote. Stock is reserved once the order is confirmed.</p>
      <h2>Payment</h2>
      <p>Payment is due as set out on your account. Approved credit accounts pay on the agreed terms.</p>
      <h2>Warranty</h2>
      <p>Tyres are covered by the manufacturer&apos;s warranty. Ring us and we&apos;ll help you make a claim.</p>
      <h2>Questions</h2>
      <p>
        Ring {SITE.phone} or email {SITE.email}.
      </p>
    </LegalPage>
  );
}
