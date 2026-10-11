'use client';

import SafeImage from '@/components/SafeImage';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import TyreGraphic from '@/components/TyreGraphic';

export interface ShowcaseTyre {
  id: string;
  code: string;
  href: string;
  positions: string;
  application: string;
  description: string;
  photo?: string;
}

export interface ShowcaseBrand {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  href: string;
  tyres: ShowcaseTyre[];
}

/** Brand tabs, each with a swipeable row of its flagship patterns (official photos). */
export default function BrandShowcase({ brands }: { brands: ShowcaseBrand[] }) {
  const [active, setActive] = useState(brands[0].id);
  const reduce = useReducedMotion();
  const rowRef = useRef<HTMLDivElement>(null);
  const brand = brands.find((b) => b.id === active) ?? brands[0];

  const scroll = (dir: 1 | -1) => {
    const row = rowRef.current;
    if (!row) return;
    row.scrollBy({ left: dir * row.clientWidth * 0.8, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Brands">
          {brands.map((b) => (
            <button
              key={b.id}
              type="button"
              role="tab"
              aria-selected={b.id === active}
              aria-controls="brand-showcase-panel"
              onClick={() => {
                setActive(b.id);
                rowRef.current?.scrollTo({ left: 0 });
              }}
              className={`rounded-full px-5 py-2.5 font-display text-xl font-bold uppercase tracking-wide transition ${
                b.id === active ? 'bg-ink text-white' : 'bg-panel text-ink hover:bg-line/60'
              }`}
            >
              {b.name}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => scroll(-1)} aria-label="Scroll left" className="rounded-full bg-panel p-2.5 hover:bg-line/60">
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <button type="button" onClick={() => scroll(1)} aria-label="Scroll right" className="rounded-full bg-panel p-2.5 hover:bg-line/60">
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={brand.id}
          id="brand-showcase-panel"
          role="tabpanel"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="mt-6"
        >
          <div className="mb-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <p className="text-[13px] font-semibold uppercase tracking-wider text-brand">{brand.badge}</p>
            <p className="text-[17px] text-muted">{brand.tagline}</p>
            <Link href={brand.href} className="text-[15px] font-medium text-brand hover:underline">
              Full {brand.name} range ›
            </Link>
          </div>

          <div ref={rowRef} className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-4 [scrollbar-width:none]">
            {brand.tyres.map((t) => (
              <Link
                key={t.id}
                href={t.href}
                className="tile-lift group flex w-[78%] shrink-0 snap-start flex-col overflow-hidden rounded-3xl bg-panel sm:w-[46%] lg:w-[31%]"
              >
                <div className="relative flex aspect-square items-center justify-center bg-white p-6">
                  <TyreGraphic className="w-40 opacity-15" />
                  {t.photo && (
                    <SafeImage
                      src={t.photo}
                      alt={`${brand.name} ${t.code}`}
                      fill
                      sizes="(min-width: 1024px) 330px, (min-width: 640px) 45vw, 78vw"
                      className="bg-white object-contain p-6 transition duration-700 group-hover:rotate-3 group-hover:scale-105"
                    />
                  )}
                  <span className="absolute left-4 top-4 rounded-full bg-ink px-3 py-1 text-[12px] font-semibold uppercase tracking-wider text-white">
                    {t.positions}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-1 p-5">
                  <h3 className="text-3xl font-bold uppercase">{t.code}</h3>
                  <p className="text-[13px] font-medium uppercase tracking-wider text-muted">{t.application}</p>
                  <p className="mt-1 line-clamp-3 text-[15px] text-ink/80">{t.description}</p>
                  <span className="mt-auto pt-3 text-[15px] font-medium text-brand">
                    View tyre <span className="inline-block transition group-hover:translate-x-1">›</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
