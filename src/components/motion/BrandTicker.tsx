import { BRANDS_SUPPLIED } from '@/data/media';

/** High-Vis Red strip of brand names that scrolls sideways. Pure CSS; pauses on hover. */
export default function BrandTicker() {
  const names = [...BRANDS_SUPPLIED, ...BRANDS_SUPPLIED];
  return (
    <section className="overflow-hidden bg-brand py-3.5 text-white" aria-label={`Brands we supply: ${BRANDS_SUPPLIED.join(', ')}`}>
      <div className="ticker-track flex w-max gap-12 pl-12" aria-hidden>
        {names.map((n, i) => (
          <span key={i} className="flex items-center gap-12 font-display text-2xl font-bold uppercase tracking-wide">
            {n}
            <span className="opacity-50">/</span>
          </span>
        ))}
      </div>
    </section>
  );
}
