import type { ReactNode } from 'react';
import { Container } from '@/components/ui';

/** Simple readable layout for legal pages. */
export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <article className="py-16 sm:py-24">
      <Container className="max-w-2xl">
        <h1 className="text-4xl font-semibold sm:text-5xl">{title}</h1>
        <p className="mt-3 text-muted">Last updated {updated}</p>
        <p className="mt-6 rounded-2xl bg-panel px-5 py-4 text-[15px] text-muted">
          Draft for review. This page needs to be checked and approved by Ultimate Tyres before launch.
        </p>
        <div className="mt-10 space-y-6 text-[17px] leading-relaxed [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold">
          {children}
        </div>
      </Container>
    </article>
  );
}
