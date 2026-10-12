import type { Metadata } from 'next';
import Link from 'next/link';
import { ARTICLES, formatDate } from '@/data/content';
import { Container, PageHero } from '@/components/ui';
import { SEO } from '@/data/seo';
import { seoMetadata } from '@/lib/seo';

export const metadata: Metadata = seoMetadata(SEO.news);

export default function NewsPage() {
  return (
    <>
      <PageHero title="News & events" subtitle="What’s new at Ultimate Tyres, plus handy tyre tips." />
      <section className="pb-20">
        <Container className="max-w-3xl">
          <ul className="divide-y divide-line border-y border-line">
            {ARTICLES.map((a) => (
              <li key={a.slug}>
                <Link href={`/news/${a.slug}`} className="group block py-8">
                  <p className="text-[14px] text-muted">
                    {a.category} · {formatDate(a.date)}
                  </p>
                  <h2 className="mt-1 text-2xl font-semibold group-hover:text-brand">{a.title}</h2>
                  <p className="mt-2 text-[17px] text-muted">{a.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
