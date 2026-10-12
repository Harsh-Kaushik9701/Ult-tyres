import type { Metadata } from 'next';
import PortalShell from './PortalShell';

/** Dealer portal: private, so keep it out of search engines. */
export const metadata: Metadata = {
  title: 'Dealer portal',
  robots: { index: false, follow: false },
};

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return <PortalShell>{children}</PortalShell>;
}
