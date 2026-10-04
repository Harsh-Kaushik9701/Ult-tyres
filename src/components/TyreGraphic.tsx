/**
 * Simple side-on tyre illustration used as a product visual until real
 * photography is supplied. Purely decorative.
 */
export default function TyreGraphic({
  className = '',
  tone = 'dark',
}: {
  className?: string;
  tone?: 'dark' | 'light';
}) {
  const rubber = tone === 'dark' ? '#1d1d1f' : '#3a3f45';
  const rim = tone === 'dark' ? '#c7c9cc' : '#e5e5ea';
  const hub = tone === 'dark' ? '#8e9196' : '#aeb2b8';
  const lugs = Array.from({ length: 36 }, (_, i) => i * 10);
  const bolts = Array.from({ length: 10 }, (_, i) => i * 36);

  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" focusable="false">
      <circle cx="100" cy="100" r="96" fill={rubber} />
      {lugs.map((deg) => (
        <rect
          key={deg}
          x="97"
          y="2"
          width="6"
          height="11"
          rx="1.5"
          fill="#000"
          opacity="0.55"
          transform={`rotate(${deg} 100 100)`}
        />
      ))}
      <circle cx="100" cy="100" r="80" fill="none" stroke="#000" strokeOpacity="0.35" strokeWidth="2" />
      <circle cx="100" cy="100" r="56" fill={rim} />
      <circle cx="100" cy="100" r="50" fill="none" stroke="#000" strokeOpacity="0.12" strokeWidth="2" />
      <circle cx="100" cy="100" r="24" fill={hub} />
      {bolts.map((deg) => (
        <circle key={deg} cx="100" cy="84" r="3" fill="#5a5e63" transform={`rotate(${deg} 100 100)`} />
      ))}
      <circle cx="100" cy="100" r="9" fill="#5a5e63" />
    </svg>
  );
}
