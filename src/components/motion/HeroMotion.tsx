'use client';

import { useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ButtonLink, ChevronLink, Container } from '@/components/ui';
import TyreGraphic from '@/components/TyreGraphic';
import { MEDIA } from '@/data/media';

/**
 * Home hero: charcoal stage, looping wheel video behind, headline that rises in,
 * and a tyre that rolls as the page scrolls. Everything is readable with motion off.
 */
export default function HeroMotion({ tagline }: { tagline: string }) {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const x = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const trail = useTransform(scrollYProgress, [0, 1], ['25%', '100%']);

  // Respect reduced motion for the video too.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (reduce) v.pause();
    else v.play().catch(() => {});
  }, [reduce]);

  // Split the tagline so each word can rise in turn; the last word goes red.
  const words = tagline.split(' ');

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-charcoal text-white">
      <video
        ref={videoRef}
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-35"
        src={MEDIA.heroVideo.src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-charcoal via-charcoal/85 to-charcoal/30" aria-hidden />

      <Container className="grid grid-cols-1 items-center gap-10 pb-14 pt-14 md:grid-cols-[1.15fr_.85fr] md:pb-20 md:pt-20">
        <div className="min-w-0">
          <p className="text-[15px] font-semibold uppercase tracking-[0.14em] text-brand-light">Truck and bus tyres</p>
          <h1 className="mt-3 text-6xl font-extrabold uppercase leading-[0.86] sm:text-8xl">
            {words.map((w, i) => (
              <span key={i} className="mr-[0.22em] inline-block overflow-hidden align-bottom">
                <span
                  className={`hero-rise inline-block ${i === words.length - 1 ? 'text-brand-light' : ''}`}
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  {w}
                </span>
              </span>
            ))}
          </h1>
          <p className="mt-5 max-w-md text-xl text-on-dark">
            Supplied and fitted from Rocklea, Yatala and Bald Hills. Mobile service across South East Queensland.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <ButtonLink href="#find-your-tyre">Find my tyre</ButtonLink>
            <ChevronLink href="/join-us/become-a-dealer" tone="light" className="text-[17px]">
              Become a dealer
            </ChevronLink>
          </div>
          <form action="/tyres/truck" method="get" className="mt-7 flex max-w-md items-center gap-2 rounded-full bg-white/10 p-1.5 ring-1 ring-white/15 backdrop-blur">
            <label htmlFor="home-size" className="sr-only">
              Tyre size
            </label>
            <Search className="ml-3 h-5 w-5 shrink-0 text-on-dark" aria-hidden />
            <input
              id="home-size"
              name="size"
              placeholder="Know your size? Try 11R22.5"
              className="min-w-0 flex-1 bg-transparent px-1 py-2 text-[16px] text-white outline-none placeholder:text-on-dark/80"
            />
            <button type="submit" className="rounded-full bg-white px-5 py-2 text-[15px] font-medium text-ink hover:bg-steel-100">
              Search
            </button>
          </form>
        </div>

        <motion.div style={reduce ? undefined : { x }} className="mx-auto w-60 sm:w-80 md:w-full md:max-w-[400px]">
          <motion.div style={reduce ? undefined : { rotate }} className="drop-shadow-[0_30px_40px_rgba(0,0,0,0.55)]">
            <TyreGraphic tone="light" className="w-full" />
          </motion.div>
        </motion.div>
      </Container>

      {/* Road strip with a tread mark that lengthens as you scroll */}
      <div className="relative h-12 border-t border-white/10 bg-charcoal-soft" aria-hidden>
        <motion.div className="hero-tread absolute left-0 top-2 h-3" style={{ width: reduce ? '100%' : trail }} />
        <div className="hero-lane absolute inset-x-0 top-[22px] h-1" />
      </div>
    </section>
  );
}
