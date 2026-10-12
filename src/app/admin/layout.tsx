import type { Metadata } from 'next';

/** Staff desk: private, so keep it out of search engines. */
export const metadata: Metadata = {
  title: 'Staff desk',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
