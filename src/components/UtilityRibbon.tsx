import Link from 'next/link';
import { MessageCircle, Phone, UserRound } from 'lucide-react';
import { SITE } from '@/data/site';

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden>
      <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21h2.9z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * Thin charcoal strip above the main header on every public page (from the brief):
 * toll-free number, WhatsApp, social links and dealer login.
 */
export default function UtilityRibbon({ accountHref, accountLabel }: { accountHref: string; accountLabel: string }) {
  return (
    <div className="bg-charcoal text-[13px] text-on-dark">
      <div className="mx-auto flex h-9 max-w-[1080px] items-center justify-between gap-4 px-5">
        <div className="flex items-center gap-4">
          <a href={SITE.phoneHref} className="flex items-center gap-1.5 font-medium text-white hover:text-brand-light">
            <Phone className="h-3.5 w-3.5" aria-hidden />
            <span>
              <span className="hidden sm:inline">Toll-free </span>
              {SITE.phone}
            </span>
          </a>
          <span className="hidden text-on-dark/80 md:inline">24/7 mobile truck tyre service</span>
        </div>
        <div className="flex items-center gap-1">
          <a
            href={SITE.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-full px-2 py-1 hover:text-white"
          >
            <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" aria-hidden />
            <span>WhatsApp</span>
          </a>
          <a href={SITE.facebook} target="_blank" rel="noreferrer" aria-label="Ultimate Tyres on Facebook" className="hidden rounded-full p-1.5 hover:text-white sm:block">
            <FacebookIcon />
          </a>
          <a href={SITE.instagram} target="_blank" rel="noreferrer" aria-label="Ultimate Tyres on Instagram" className="hidden rounded-full p-1.5 hover:text-white sm:block">
            <InstagramIcon />
          </a>
          <Link href={accountHref} className="ml-1 flex items-center gap-1.5 rounded-full px-2 py-1 font-medium text-white hover:text-brand-light">
            <UserRound className="h-3.5 w-3.5" aria-hidden />
            {accountLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
