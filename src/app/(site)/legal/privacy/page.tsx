import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';
import { SITE } from '@/data/site';

export const metadata: Metadata = { title: 'Privacy policy' };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" updated="4 October 2026">
      <p>
        We respect your privacy and handle personal information in line with the Privacy Act 1988 and the Australian
        Privacy Principles.
      </p>
      <h2>What we collect</h2>
      <p>
        Your name, business details, ABN, phone, email and delivery address when you contact us, apply for a dealer
        account or send a pricing request.
      </p>
      <h2>How we use it</h2>
      <p>To reply to you, run your account, prepare quotes, deliver orders and keep our records.</p>
      <h2>Who we share it with</h2>
      <p>
        Only the people who help us run the business, like delivery companies and IT providers, and only when needed.
        We don&apos;t sell your information.
      </p>
      <h2>Your choices</h2>
      <p>
        You can ask to see or correct your information at any time. Email {SITE.email} or ring {SITE.phone}.
      </p>
    </LegalPage>
  );
}
