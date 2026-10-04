import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ARTICLES, formatDate } from '@/data/content';
import { ChevronLink, Container } from '@/components/ui';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = ARTICLES.find((x) => x.slug === slug);
  return a ? { title: a.title, description: a.summary } : {};
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <article className="py-16 sm:py-24">
      <Container className="max-w-2xl">
        <p className="text-[15px] text-muted">
          {article.category} · {formatDate(article.date)}
        </p>
        <h1 className="mt-2 text-4xl font-semibold leading-tight sm:text-5xl">{article.title}</h1>
        <p className="mt-4 text-xl text-muted">{article.summary}</p>
        <div className="mt-10 space-y-5 text-[18px] leading-relaxed">
          {article.body.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>
        <div className="mt-12 border-t border-line pt-6">
          <ChevronLink href="/news">All news</ChevronLink>
        </div>
      </Container>
    </article>
  );
}
