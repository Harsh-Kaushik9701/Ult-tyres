'use client';

import SafeImage from '@/components/SafeImage';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, Search } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ButtonLink, ChevronLink, Container } from '@/components/ui';
import MediaImage from '@/components/motion/MediaImage';
import { MEDIA, type MediaPhoto } from '@/data/media';
import { SITE } from '@/data/site';

type Slide = {
  id: string;
  eyebrow: string;
  /** Headline words; the last one is drawn in red. */
  title: string;
  text: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
} & ({ video: string } | { photo: MediaPhoto } | { tyre: { src: string; alt: string } });

/** Five banners from the brief: two videos and three stills. */
export const HERO_SLIDES: Slide[] = [
  {
    id: 'fleet',
    eyebrow: 'Truck and bus tyres',
    title: 'Your fleet. Our drive.',
    text: 'Supplied and fitted from Rocklea, Yatala and Bald Hills. Mobile service across South East Queensland.',
    primary: { label: 'Find my tyre', href: '#find-your-tyre' },
    secondary: { label: 'Get a quote', href: '/contact' },
    video: MEDIA.heroVideo.src,
  },
  {
    id: 'cpk',
    eyebrow: 'Cost per kilometre',
    title: 'More kilometres. Less fuel.',
    text: 'Maximise casing life and cut fuel costs with premium tread and total wheel alignment.',
    primary: { label: 'Wheel alignment', href: '/fleet-services/wheel-alignment' },
    secondary: { label: 'All fleet services', href: '/fleet-services' },
    photo: MEDIA.truckRig,
  },
  {
    id: 'mobile',
    eyebrow: '24/7 mobile service',
    title: 'Flat tyre? We’re on standby.',
    text: 'We come to you, day or night, and text you the ETA so you know when we’ll arrive.',
    primary: { label: `Call ${SITE.phone}`, href: SITE.phoneHref },
    secondary: { label: 'WhatsApp us', href: SITE.whatsappHref },
    video: MEDIA.workshopVideo.src,
  },
  {
    id: 'dealers',
    eyebrow: 'For dealers',
    title: 'Live stock. Instant orders.',
    text: 'Check stock on your phone, build a cart and send it through. Trade pricing, zero headaches.',
    primary: { label: 'Dealer login', href: '/dealer/login' },
    secondary: { label: 'Become a dealer', href: '/join-us/become-a-dealer' },
    photo: MEDIA.stackedTyres,
  },
  {
    id: 'ralson',
    eyebrow: 'Authorised distributor',
    title: 'Ralson. Built to go the distance.',
    text: 'Line-haul steer, drive and trailer tyres from Ralson, plus Blacklion and Triangle ranges in stock.',
    primary: { label: 'See the Ralson range', href: '/tyres/ralson' },
    secondary: { label: 'All tyres', href: '/tyres' },
    tyre: { src: 'https://ralsonglobal.com/storage/products/media/01KZ5TGF6Z0XKVK5QD6TY0JJ8A.png', alt: 'Ralson RDL52 drive tyre' },
  },
];

const INTERVAL = 7000;

function isExternal(href: string) {
  return /^(https?:|tel:)/.test(href);
}

export default function HeroMotion() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const slide = HERO_SLIDES[index];
  const running = !reduce && !paused && !hovering;

  const go = useCallback((n: number) => setIndex((n + HERO_SLIDES.length) % HERO_SLIDES.length), []);

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => go(index + 1), INTERVAL);
    return () => clearTimeout(t);
  }, [index, running, go]);

  // Tread mark on the road strip lengthens as the page scrolls.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const trail = useTransform(scrollYProgress, [0, 1], ['25%', '100%']);

  const words = slide.title.split(' ');

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-charcoal text-white"
      aria-roledescription="carousel"
      aria-label="Highlights"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocusCapture={() => setHovering(true)}
      onBlurCapture={() => setHovering(false)}
    >
      {/* Background media, cross-fading between slides */}
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.id}
          className="absolute inset-0 -z-20"
          initial={reduce ? false : { opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          aria-hidden
        >
          {'video' in slide && (
            <video className="h-full w-full object-cover opacity-45" src={slide.video} autoPlay={!reduce} muted loop playsInline preload="metadata" />
          )}
          {'photo' in slide && (
            <div className="relative h-full w-full opacity-55">
              <MediaImage photo={slide.photo} sizes="100vw" priority={index === 1} />
            </div>
          )}
          {'tyre' in slide && <div className="h-full w-full bg-[radial-gradient(circle_at_75%_50%,#3a1a1a,transparent_60%)]" />}
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-charcoal via-charcoal/80 to-charcoal/20" aria-hidden />

      <Container className="grid min-h-[560px] grid-cols-1 content-center gap-8 pb-10 pt-14 sm:min-h-[600px] md:grid-cols-[1.2fr_.8fr]">
        <div className="min-w-0" aria-live={running ? 'off' : 'polite'}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={slide.id}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${HERO_SLIDES.length}`}
            >
              <p className="text-[15px] font-semibold uppercase tracking-[0.14em] text-brand-light">{slide.eyebrow}</p>
              {index === 0 ? (
                <h1 className="mt-3 text-6xl font-extrabold uppercase leading-[0.86] sm:text-8xl">
                  <Words words={words} />
                </h1>
              ) : (
                <h2 className="mt-3 text-5xl font-extrabold uppercase leading-[0.88] sm:text-7xl">
                  <Words words={words} />
                </h2>
              )}
              <p className="mt-5 max-w-md text-xl text-on-dark">{slide.text}</p>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                <ButtonLink href={slide.primary.href}>{slide.primary.label}</ButtonLink>
                {slide.secondary &&
                  (isExternal(slide.secondary.href) ? (
                    <a href={slide.secondary.href} target="_blank" rel="noreferrer" className="text-[17px] font-medium text-brand-light hover:text-white">
                      {slide.secondary.label} ›
                    </a>
                  ) : (
                    <ChevronLink href={slide.secondary.href} tone="light" className="text-[17px]">
                      {slide.secondary.label}
                    </ChevronLink>
                  ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <form action="/tyres/truck" method="get" className="mt-8 flex max-w-md items-center gap-2 rounded-full bg-white/10 p-1.5 ring-1 ring-white/15 backdrop-blur">
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

        {/* Product shot for the tyre slide */}
        <div className="hidden md:block" aria-hidden>
          <AnimatePresence mode="wait">
            {'tyre' in slide && (
              <motion.div
                key={slide.id}
                initial={reduce ? false : { opacity: 0, rotate: -25, x: 60 }}
                animate={{ opacity: 1, rotate: 0, x: 0 }}
                exit={reduce ? undefined : { opacity: 0, x: 40 }}
                transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                className="relative mx-auto aspect-square w-full max-w-[420px]"
              >
                <SafeImage src={slide.tyre.src} alt="" fill sizes="420px" className="object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.6)]" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>

      {/* Controls: dots with progress, prev/next, pause */}
      <Container className="relative flex items-center gap-3 pb-6">
        <div className="flex flex-1 gap-2">
          {HERO_SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show slide ${i + 1}: ${s.eyebrow}`}
              aria-current={i === index}
              className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/20 hover:bg-white/35"
            >
              {i === index && (
                <span
                  key={`${s.id}-${running}`}
                  className={`absolute inset-y-0 left-0 rounded-full bg-brand-light ${running ? 'hero-progress' : 'w-full'}`}
                  style={running ? { animationDuration: `${INTERVAL}ms` } : undefined}
                />
              )}
              {i < index && <span className="absolute inset-0 rounded-full bg-white/50" />}
            </button>
          ))}
        </div>
        <button type="button" onClick={() => go(index - 1)} aria-label="Previous slide" className="rounded-full p-2 ring-1 ring-white/25 hover:ring-white/60">
          <ChevronLeft className="h-4 w-4" aria-hidden />
        </button>
        <button type="button" onClick={() => go(index + 1)} aria-label="Next slide" className="rounded-full p-2 ring-1 ring-white/25 hover:ring-white/60">
          <ChevronRight className="h-4 w-4" aria-hidden />
        </button>
        {!reduce && (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
            className="rounded-full p-2 ring-1 ring-white/25 hover:ring-white/60"
          >
            {paused ? <Play className="h-4 w-4" aria-hidden /> : <Pause className="h-4 w-4" aria-hidden />}
          </button>
        )}
      </Container>

      {/* Road strip with a tread mark that lengthens as you scroll */}
      <div className="relative h-12 border-t border-white/10 bg-charcoal-soft" aria-hidden>
        <motion.div className="hero-tread absolute left-0 top-2 h-3" style={{ width: reduce ? '100%' : trail }} />
        <div className="hero-lane absolute inset-x-0 top-[22px] h-1" />
      </div>
    </section>
  );
}

function Words({ words }: { words: string[] }) {
  return (
    <>
      {words.map((w, i) => (
        <span key={i} className="mr-[0.22em] inline-block overflow-hidden align-bottom">
          <span className={`hero-rise inline-block ${i === words.length - 1 ? 'text-brand-light' : ''}`} style={{ animationDelay: `${i * 80}ms` }}>
            {w}
          </span>
        </span>
      ))}
    </>
  );
}
