import Link from 'next/link';
import { SITE } from '@/data/site';
import { BRANCHES } from '@/data/mockData';

const COLUMNS = [
  {
    title: 'Tyres',
    links: [
      ['Truck tyres', '/tyres/truck'],
      ['Bus tyres', '/tyres/bus'],
      ['Ralson', '/tyres/ralson'],
      ['Blacklion', '/tyres/blacklion'],
      ['Triangle', '/tyres/triangle'],
    ],
  },
  {
    title: 'Fleet Services',
    links: [
      ['Wheel alignment', '/fleet-services/wheel-alignment'],
      ['Tyre fitting', '/fleet-services/tyre-fitting'],
      ['Ultimate ReadyFit', '/fleet-services/ultimate-readyfit'],
      ['All services', '/fleet-services'],
    ],
  },
  {
    title: 'Dealers',
    links: [
      ['Dealer login', '/dealer/login'],
      ['Become a dealer', '/join-us/become-a-dealer'],
      ['Terms of trade', '/legal/terms-of-trade'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['About us', '/about-us'],
      ['News & events', '/news'],
      ['Careers', '/join-us/careers'],
      ['Network map', '/network-map'],
      ['Contact', '/contact'],
    ],
  },
] as const;

export default function SiteFooter() {
  return (
    <footer className="mt-auto bg-panel text-[12px] text-muted">
      <div className="mx-auto max-w-[1080px] px-5 py-10">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="mb-2 font-semibold text-ink">{col.title}</h3>
              <ul className="space-y-1.5">
                {col.links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="hover:text-ink hover:underline">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-line pt-6">
          <p>
            Ring us on{' '}
            <a href={SITE.phoneHref} className="text-ink hover:underline">
              {SITE.phone}
            </a>{' '}
            or visit us at {BRANCHES.map((b) => b.suburb).join(', ').replace(/, ([^,]*)$/, ' and $1')}.
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <p>© {new Date().getFullYear()} Ultimate Tyres. All rights reserved.</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/legal/privacy" className="hover:text-ink hover:underline">
                Privacy
              </Link>
              <Link href="/legal/terms-of-trade" className="hover:text-ink hover:underline">
                Terms of trade
              </Link>
              <a href={SITE.facebook} className="hover:text-ink hover:underline" target="_blank" rel="noreferrer">
                Facebook
              </a>
              <a href={SITE.instagram} className="hover:text-ink hover:underline" target="_blank" rel="noreferrer">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
